'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';
import { AdminUser, getAdminUser, ADMIN_PERMISSIONS } from '@/lib/auth-utils';
import { GalleryItem, GalleryStats, MediaType, MEDIA_TYPE_LABELS, MEDIA_TYPE_COLORS, extractYouTubeVideoId, getYouTubeThumbnail } from '@/types/gallery';
import { Button } from '@/components/ui/button';
import { Card, CardContent} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, Toaster } from 'react-hot-toast';
import {
  Shield,
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  FileText,
  Image as ImageIcon,
  Star,
  GraduationCap,
  LogOut,
  Menu,
  X,
  Plus,
  Edit,
  Trash2,
  Upload,
  Video,
  Newspaper,
  Play,
  Calendar,
  Tag,
  Globe,
  Star as StarIcon,
  Filter,
  Search,
  Loader2,
  ExternalLink,
  UserCheck
} from 'lucide-react';

const gallerySchema = z.object({
  type: z.enum(['image', 'video', 'news']),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  newsDate: z.string().optional(),
  newsSource: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean(),
  isFeatured: z.boolean(),
  order: z.number().min(0, 'Order must be a positive number')
});

type FormData = z.infer<typeof gallerySchema>;

export default function AdminGalleryPage() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [tags, setTags] = useState<string[]>(['']);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { user, logout } = useAuth();
  const router = useRouter();

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      type: 'image',
      title: '',
      description: '',
      videoUrl: '',
      newsDate: '',
      newsSource: '',
      tags: [],
      isPublished: true,
      isFeatured: false,
      order: 0
    }
  });

  const watchedType = watch('type');

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        router.push('/admin');
        return;
      }

      try {
        const admin = await getAdminUser(user);
        if (!admin) {
          router.push('/admin');
          return;
        }
        setAdminUser(admin);
      } catch (error) {
        console.error('Error checking admin access:', error);
        router.push('/admin');
      }
    };

    checkAdminAccess();
  }, [user, router]);

  useEffect(() => {
    if (adminUser) {
      fetchGalleryItems();
    }
  }, [adminUser]);

  useEffect(() => {
    filterItems();
  }, [items, filterType, searchQuery]);

  useEffect(() => {
    if (editingItem) {
      setValue('type', editingItem.type);
      setValue('title', editingItem.title);
      setValue('description', editingItem.description || '');
      setValue('videoUrl', editingItem.videoUrl || '');
      setValue('newsDate', editingItem.newsDate || '');
      setValue('newsSource', editingItem.newsSource || '');
      setValue('isPublished', editingItem.isPublished);
      setValue('isFeatured', editingItem.isFeatured);
      setValue('order', editingItem.order);
      setTags(editingItem.tags || ['']);
      setImagePreview(editingItem.imageUrl || null);
    }
  }, [editingItem, setValue]);

  const fetchGalleryItems = async () => {
    try {
      const q = query(collection(db, 'gallery'), orderBy('order'));
      const querySnapshot = await getDocs(q);
      const itemsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryItem[];
      setItems(itemsList);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast.error('Failed to fetch gallery items');
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = items;

    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.type === filterType);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.newsSource?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredItems(filtered);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;

    setUploading(true);
    try {
      const timestamp = Date.now();
      const fileName = `gallery/${timestamp}-${imageFile.name}`;
      const storageRef = ref(storage, fileName);
      
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);
      
      toast.success('Image uploaded successfully');
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const validateYouTubeUrl = (url: string): boolean => {
    const videoId = extractYouTubeVideoId(url);
    return videoId !== null;
  };

  const onSubmit = async (data: FormData) => {
    if (!adminUser) return;

    try {
      let imageUrl = editingItem?.imageUrl || '';

      // Handle image upload for images and news
      if ((data.type === 'image' || data.type === 'news') && imageFile) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          toast.error('Failed to upload image. Please try again.');
          return;
        }
      }

      // Handle YouTube video processing
      let videoId = '';
      let thumbnailUrl = '';
      if (data.type === 'video' && data.videoUrl) {
        if (!validateYouTubeUrl(data.videoUrl)) {
          toast.error('Please enter a valid YouTube URL');
          return;
        }
        videoId = extractYouTubeVideoId(data.videoUrl) || '';
        thumbnailUrl = getYouTubeThumbnail(videoId);
      }

      // Base item data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const itemData: any = {
        type: data.type,
        title: data.title,
        description: data.description || '',
        tags: tags.filter(tag => tag.trim() !== ''),
        isPublished: data.isPublished,
        isFeatured: data.isFeatured,
        order: data.order,
        updatedAt: Timestamp.now(),
        ...(editingItem ? {} : { 
          createdAt: Timestamp.now(),
          createdBy: adminUser.uid 
        })
      };

      // Add type-specific fields only if they have values
      if (data.type === 'image' || data.type === 'news') {
        if (imageUrl) {
          itemData.imageUrl = imageUrl;
        }
      }

      if (data.type === 'video') {
        if (data.videoUrl) {
          itemData.videoUrl = data.videoUrl;
        }
        if (videoId) {
          itemData.videoId = videoId;
        }
        if (thumbnailUrl) {
          itemData.thumbnailUrl = thumbnailUrl;
        }
      }

      if (data.type === 'news') {
        if (data.newsDate) {
          itemData.newsDate = data.newsDate;
        }
        if (data.newsSource) {
          itemData.newsSource = data.newsSource;
        }
      }

      if (editingItem) {
        await updateDoc(doc(db, 'gallery', editingItem.id), itemData);
        toast.success('Gallery item updated successfully');
      } else {
        await addDoc(collection(db, 'gallery'), itemData);
        toast.success('Gallery item added successfully');
      }
      
      handleCancel();
      fetchGalleryItems();
    } catch (error) {
      console.error('Error saving gallery item:', error);
      toast.error('Failed to save gallery item');
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;

    try {
      await deleteDoc(doc(db, 'gallery', id));
      toast.success('Gallery item deleted successfully');
      fetchGalleryItems();
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      toast.error('Failed to delete gallery item');
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setShowForm(false);
    setImageFile(null);
    setImagePreview(null);
    setTags(['']);
    reset();
  };

  const addTag = () => {
    setTags([...tags, '']);
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const updateTag = (index: number, value: string) => {
    const updated = [...tags];
    updated[index] = value;
    setTags(updated);
  };

  const getStats = (): GalleryStats => {
    return {
      totalItems: items.length,
      publishedItems: items.filter(item => item.isPublished).length,
      featuredItems: items.filter(item => item.isFeatured).length,
      imageCount: items.filter(item => item.type === 'image').length,
      videoCount: items.filter(item => item.type === 'video').length,
      newsCount: items.filter(item => item.type === 'news').length,
    };
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/admin/dashboard', permission: ADMIN_PERMISSIONS.VIEW_DASHBOARD },
    { icon: Users, label: 'User Management', href: '/admin/users', permission: ADMIN_PERMISSIONS.MANAGE_USERS },
    { icon: GraduationCap, label: 'Training Programs', href: '/admin/training-programs', permission: ADMIN_PERMISSIONS.MANAGE_CONTENT },
    { icon: FileText, label: 'Registrations', href: '/admin/registrations', permission: ADMIN_PERMISSIONS.MANAGE_CONTENT },
    { icon: MessageSquare, label: 'Inquiries', href: '/admin/inquiries', permission: ADMIN_PERMISSIONS.MANAGE_INQUIRIES },
    { icon: Star, label: 'Testimonials', href: '/admin/testimonials', permission: ADMIN_PERMISSIONS.MANAGE_TESTIMONIALS },
    { icon: ImageIcon, label: 'Gallery', href: '/admin/gallery', permission: ADMIN_PERMISSIONS.MANAGE_GALLERY, active: true },
    { icon: UserCheck, label: 'Team Management', href: '/admin/team', permission: ADMIN_PERMISSIONS.MANAGE_CONTENT },
    { icon: Settings, label: 'Settings', href: '/admin/settings', permission: ADMIN_PERMISSIONS.MANAGE_SETTINGS },
  ];

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (!adminUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex flex-col w-64 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-green-800">BAF Trust Admin</h2>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              {sidebarItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    item.active 
                      ? 'bg-green-100 text-green-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white shadow-lg">
          <div className="flex items-center px-4 py-6 border-b">
            <Shield className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-xl font-bold text-green-800">BAF Trust Admin</h2>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </a>
            ))}
          </nav>
          <div className="px-4 py-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">{adminUser.email}</p>
                <p className="text-xs text-gray-500 capitalize">{adminUser.role.replace('_', ' ')}</p>
              </div>
              <Button onClick={handleLogout} variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b lg:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-800">Gallery Management</h1>
            <Button onClick={handleLogout} variant="ghost" size="sm">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-green-800">Gallery Management</h1>
              <p className="text-gray-600">Manage images, videos, and news content</p>
            </div>
            <Button onClick={() => setShowForm(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Media Item
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Items</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
                  </div>
                  <ImageIcon className="h-8 w-8 text-gray-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Published</p>
                    <p className="text-2xl font-bold text-green-600">{stats.publishedItems}</p>
                  </div>
                  <Globe className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Featured</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.featuredItems}</p>
                  </div>
                  <StarIcon className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Images</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.imageCount}</p>
                  </div>
                  <ImageIcon className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Videos</p>
                    <p className="text-2xl font-bold text-red-600">{stats.videoCount}</p>
                  </div>
                  <Video className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">News</p>
                    <p className="text-2xl font-bold text-green-600">{stats.newsCount}</p>
                  </div>
                  <Newspaper className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Modal */}
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
                </DialogTitle>
                <DialogDescription>
                  {editingItem ? 'Update the gallery item details' : 'Create a new gallery item for your media collection'}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Type Selection */}
                <div>
                  <Label>Media Type *</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    {(['image', 'video', 'news'] as MediaType[]).map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={type}
                          value={type}
                          {...register('type')}
                          className="w-4 h-4 text-green-600"
                        />
                        <label htmlFor={type} className="flex items-center space-x-2">
                          {type === 'image' && <ImageIcon className="h-4 w-4" />}
                          {type === 'video' && <Video className="h-4 w-4" />}
                          {type === 'news' && <Newspaper className="h-4 w-4" />}
                          <span className="capitalize">{type}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.type && (
                    <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>
                  )}
                </div>

                <Separator />

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      {...register('title')}
                      placeholder="Enter title"
                      className={`mt-2 ${errors.title ? 'border-red-500' : ''}`}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="order">Display Order</Label>
                    <Input
                      id="order"
                      type="number"
                      {...register('order', { valueAsNumber: true })}
                      className={`mt-2 ${errors.order ? 'border-red-500' : ''}`}
                    />
                    {errors.order && (
                      <p className="text-sm text-red-500 mt-1">{errors.order.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    rows={3}
                    placeholder="Enter description"
                    className="mt-2"
                  />
                </div>

                {/* Type-specific fields */}
                {(watchedType === 'image' || watchedType === 'news') && (
                  <div>
                    <Label htmlFor="image">
                      {watchedType === 'image' ? 'Image' : 'News Image'} {!editingItem && '*'}
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="mt-2"
                    />
                    {imagePreview && (
                      <div className="mt-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-32 w-48 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>
                )}

                {watchedType === 'video' && (
                  <div>
                    <Label htmlFor="videoUrl">YouTube URL *</Label>
                    <Input
                      id="videoUrl"
                      {...register('videoUrl')}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className={`mt-2 ${errors.videoUrl ? 'border-red-500' : ''}`}
                    />
                    {errors.videoUrl && (
                      <p className="text-sm text-red-500 mt-1">{errors.videoUrl.message}</p>
                    )}
                  </div>
                )}

                {watchedType === 'news' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="newsDate">News Date</Label>
                      <Input
                        id="newsDate"
                        type="date"
                        {...register('newsDate')}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newsSource">News Source</Label>
                      <Input
                        id="newsSource"
                        {...register('newsSource')}
                        placeholder="e.g., Times of India"
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div>
                  <Label>Tags</Label>
                  {tags.map((tag, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        value={tag}
                        onChange={(e) => updateTag(index, e.target.value)}
                        placeholder="Enter tag"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTag(index)}
                        disabled={tags.length === 1}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTag}
                    className="mt-2 text-green-600 hover:text-green-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Tag
                  </Button>
                </div>

                <Separator />

                {/* Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isPublished"
                      {...register('isPublished')}
                      checked={watch('isPublished')}
                      onCheckedChange={(checked: boolean) => setValue('isPublished', checked)}
                    />
                    <Label htmlFor="isPublished">Published</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isFeatured"
                      {...register('isFeatured')}
                      checked={watch('isFeatured')}
                      onCheckedChange={(checked: boolean) => setValue('isFeatured', checked)}
                    />
                    <Label htmlFor="isFeatured">Featured</Label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={uploading}>
                    {uploading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4 mr-2" />
                    )}
                    {editingItem ? 'Update Item' : 'Add Item'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search gallery items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-3 py-2 border rounded-md"
                      title="Filter gallery items by type"
                    >
                      <option value="all">All Types</option>
                      <option value="image">Images</option>
                      <option value="video">Videos</option>
                      <option value="news">News</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gallery Items */}
          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No gallery items found</p>
                </CardContent>
              </Card>
            ) : (
              filteredItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                          <Badge className={MEDIA_TYPE_COLORS[item.type]}>
                            {MEDIA_TYPE_LABELS[item.type]}
                          </Badge>
                          {item.isPublished ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Published
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                              Draft
                            </Badge>
                          )}
                          {item.isFeatured && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        {item.description && (
                          <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                        )}
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <span>Order: {item.order}</span>
                          {item.newsDate && (
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(item.newsDate).toLocaleDateString()}
                            </span>
                          )}
                          {item.newsSource && (
                            <span>{item.newsSource}</span>
                          )}
                          {item.tags && item.tags.length > 0 && (
                            <span className="flex items-center">
                              <Tag className="h-4 w-4 mr-1" />
                              {item.tags.join(', ')}
                            </span>
                          )}
                        </div>

                        {/* Media Preview */}
                        <div className="mb-4">
                          {item.type === 'image' && item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="h-24 w-32 object-cover rounded border"
                            />
                          )}
                          {item.type === 'video' && item.thumbnailUrl && (
                            <div className="relative h-24 w-32">
                              <img
                                src={item.thumbnailUrl}
                                alt={item.title}
                                className="h-24 w-32 object-cover rounded border"
                              />
                              <Play className="absolute inset-0 m-auto h-8 w-8 text-white bg-red-600 rounded-full p-1" />
                            </div>
                          )}
                          {item.type === 'news' && item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="h-24 w-32 object-cover rounded border"
                            />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {item.type === 'video' && item.videoUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(item.videoUrl, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
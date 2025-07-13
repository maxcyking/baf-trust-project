'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';
import { TeamMember, TeamStats } from '@/types/team';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'react-hot-toast';
import { 
  Users, 
  UserPlus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  BarChart3, 
  GraduationCap, 
  MessageSquare, 
  Star, 
  Settings, 
  FileText,
  ImageIcon,
  Shield,
  LogOut,
  Camera,
  Mail,
  Phone,
  LinkedinIcon,
  Award,
  User,
  Crown,
  UserCheck
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AdminUser, getAdminUser, ADMIN_PERMISSIONS, hasPermission } from '@/lib/auth-utils';

const teamSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  designation: z.string().min(2, 'Designation is required'),
  category: z.enum(['core', 'advisory']),
  specialty: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone: z.string().optional(),
  linkedIn: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  education: z.string().optional(),
  experience: z.string().optional(),
  achievements: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  order: z.number().min(0).default(0)
});

type TeamFormData = z.infer<typeof teamSchema>;

export default function AdminTeamPage() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'core' | 'advisory'>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [achievements, setAchievements] = useState<string[]>(['']);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<TeamFormData>({
    // @ts-expect-error - Complex type mismatch between zod schema and react-hook-form
    resolver: zodResolver(teamSchema),
    defaultValues: {
      achievements: [],
      isActive: true,
      order: 0
    }
  });

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

        if (!hasPermission(admin, ADMIN_PERMISSIONS.MANAGE_CONTENT)) {
          toast.error('You do not have permission to manage team members');
          router.push('/admin/dashboard');
          return;
        }

        setAdminUser(admin);
        await fetchTeamMembers();
      } catch (error) {
        console.error('Error checking admin access:', error);
        router.push('/admin');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [user, router]);

  useEffect(() => {
    filterMembers();
  }, [members, searchQuery, filterCategory]);

  useEffect(() => {
    if (editingMember) {
      setValue('name', editingMember.name);
      setValue('designation', editingMember.designation);
      setValue('category', editingMember.category);
      setValue('specialty', editingMember.specialty || '');
      setValue('bio', editingMember.bio || '');
      setValue('email', editingMember.email || '');
      setValue('phone', editingMember.phone || '');
      setValue('linkedIn', editingMember.linkedIn || '');
      setValue('education', editingMember.education || '');
      setValue('experience', editingMember.experience || '');
      setValue('achievements', editingMember.achievements || []);
      setValue('isActive', editingMember.isActive);
      setValue('order', editingMember.order);
      setAchievements(editingMember.achievements || ['']);
      setImagePreview(editingMember.imageUrl || null);
    } else {
      reset();
      setAchievements(['']);
      setImagePreview(null);
    }
  }, [editingMember, setValue, reset]);

  const fetchTeamMembers = async () => {
    try {
      const q = query(collection(db, 'team'), orderBy('order'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const membersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TeamMember[];
      setMembers(membersList);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast.error('Failed to fetch team members');
    }
  };

  const filterMembers = () => {
    let filtered = members;

    if (filterCategory !== 'all') {
      filtered = filtered.filter(member => member.category === filterCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.specialty?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMembers(filtered);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;

    setUploading(true);
    try {
      const timestamp = Date.now();
      const fileName = `team/${timestamp}-${imageFile.name}`;
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

  const onSubmit = async (data: TeamFormData) => {
    if (!adminUser) return;

    try {
      let imageUrl = editingMember?.imageUrl || '';

      if (imageFile) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          toast.error('Failed to upload image. Please try again.');
          return;
        }
      }

      // Helper function to remove undefined values (Firestore doesn't accept undefined)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cleanData = (obj: any) => {
        return Object.fromEntries(
          Object.entries(obj).filter(([, value]) => value !== undefined)
        );
      };

      const memberData = cleanData({
        name: data.name,
        designation: data.designation,
        category: data.category,
        specialty: data.specialty?.trim() || null,
        bio: data.bio?.trim() || null,
        email: data.email?.trim() || null,
        phone: data.phone?.trim() || null,
        linkedIn: data.linkedIn?.trim() || null,
        education: data.education?.trim() || null,
        experience: data.experience?.trim() || null,
        achievements: achievements.filter(achievement => achievement.trim() !== ''),
        isActive: data.isActive,
        order: data.order,
        imageUrl: imageUrl || null,
        updatedAt: Timestamp.now(),
        ...(editingMember ? {} : { 
          createdAt: Timestamp.now(),
          createdBy: adminUser.uid 
        })
      });

      if (editingMember) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await updateDoc(doc(db, 'team', editingMember.id), memberData as any);
        toast.success('Team member updated successfully');
      } else {
        await addDoc(collection(db, 'team'), memberData);
        toast.success('Team member added successfully');
      }
      
      handleCancel();
      fetchTeamMembers();
    } catch (error) {
      console.error('Error saving team member:', error);
      toast.error('Failed to save team member');
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;

    try {
      await deleteDoc(doc(db, 'team', id));
      toast.success('Team member deleted successfully');
      fetchTeamMembers();
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast.error('Failed to delete team member');
    }
  };

  const handleCancel = () => {
    setEditingMember(null);
    setShowForm(false);
    setImageFile(null);
    setImagePreview(null);
    setAchievements(['']);
    reset();
  };

  const addAchievement = () => {
    setAchievements([...achievements, '']);
  };

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  const updateAchievement = (index: number, value: string) => {
    const updated = [...achievements];
    updated[index] = value;
    setAchievements(updated);
  };

  const getStats = (): TeamStats => {
    return {
      totalMembers: members.length,
      activeMembers: members.filter(member => member.isActive).length,
      coreTeamCount: members.filter(member => member.category === 'core').length,
      advisoryTeamCount: members.filter(member => member.category === 'advisory').length,
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
    { icon: ImageIcon, label: 'Gallery', href: '/admin/gallery', permission: ADMIN_PERMISSIONS.MANAGE_GALLERY },
    { icon: UserCheck, label: 'Team Management', href: '/admin/team', permission: ADMIN_PERMISSIONS.MANAGE_CONTENT, active: true },
    { icon: Settings, label: 'Settings', href: '/admin/settings', permission: ADMIN_PERMISSIONS.MANAGE_SETTINGS },
  ];

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading team members...</p>
        </div>
      </div>
    );
  }

  if (!adminUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">BAF Trust</h1>
              <p className="text-sm text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="mt-8">
          {sidebarItems.map((item) => {
            if (!hasPermission(adminUser, item.permission)) return null;
            
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-green-50 text-green-700 border-r-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{adminUser.email}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
                <p className="text-gray-600">Manage foundation team members and categories</p>
              </div>
              <Button onClick={() => setShowForm(true)} className="bg-green-600 hover:bg-green-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalMembers}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Members</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.activeMembers}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Core Team</CardTitle>
                <Crown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.coreTeamCount}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Advisory Team</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{stats.advisoryTeamCount}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterCategory} onValueChange={(value: 'all' | 'core' | 'advisory') => setFilterCategory(value)}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="core">Core Team</SelectItem>
                  <SelectItem value="advisory">Advisory Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <User className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge className={member.category === 'core' ? 'bg-blue-600' : 'bg-purple-600'}>
                        {member.category === 'core' ? 'Core Team' : 'Advisory Team'}
                      </Badge>
                    </div>
                    {!member.isActive && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary">Inactive</Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{member.designation}</p>
                    {member.specialty && (
                      <p className="text-blue-600 text-sm mb-3">{member.specialty}</p>
                    )}
                    
                    {member.bio && (
                      <p className="text-gray-700 text-sm mb-3 line-clamp-2">{member.bio}</p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {member.email && (
                          <Mail className="h-4 w-4 text-gray-400" />
                        )}
                        {member.phone && (
                          <Phone className="h-4 w-4 text-gray-400" />
                        )}
                        {member.linkedIn && (
                          <LinkedinIcon className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(member)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(member.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
              <p className="text-gray-500">Get started by adding your first team member.</p>
              <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={() => setShowForm(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </div>
          )}
        </main>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingMember ? 'Edit Team Member' : 'Add Team Member'}
            </DialogTitle>
            <DialogDescription>
              {editingMember ? 'Update team member information' : 'Add a new team member to the foundation'}
            </DialogDescription>
          </DialogHeader>

          {/* @ts-expect-error - Complex type mismatch between Zod schema and react-hook-form SubmitHandler */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Profile Image</Label>
              <div className="flex items-center space-x-4">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Upload JPG, PNG or GIF. Max size 10MB.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  {...register('name')}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="designation">Designation *</Label>
                <Input
                  id="designation"
                  {...register('designation')}
                  className={errors.designation ? 'border-red-500' : ''}
                />
                {errors.designation && (
                  <p className="text-red-500 text-sm mt-1">{errors.designation.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select onValueChange={(value: 'core' | 'advisory') => setValue('category', value)}>
                  <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="core">Core Team</SelectItem>
                    <SelectItem value="advisory">Advisory Team</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="specialty">Specialty</Label>
                <Input
                  id="specialty"
                  {...register('specialty')}
                  placeholder="e.g., Agricultural Economics"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                {...register('bio')}
                placeholder="Brief description about the team member..."
                className="h-24"
              />
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="linkedIn">LinkedIn Profile</Label>
              <Input
                id="linkedIn"
                {...register('linkedIn')}
                placeholder="https://linkedin.com/in/username"
                className={errors.linkedIn ? 'border-red-500' : ''}
              />
              {errors.linkedIn && (
                <p className="text-red-500 text-sm mt-1">{errors.linkedIn.message}</p>
              )}
            </div>

            <Separator />

            {/* Professional Information */}
            <div>
              <Label htmlFor="education">Education</Label>
              <Textarea
                id="education"
                {...register('education')}
                placeholder="Educational background..."
                className="h-20"
              />
            </div>

            <div>
              <Label htmlFor="experience">Experience</Label>
              <Textarea
                id="experience"
                {...register('experience')}
                placeholder="Professional experience..."
                className="h-20"
              />
            </div>

            {/* Achievements */}
            <div>
              <Label>Achievements</Label>
              <div className="space-y-2">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={achievement}
                      onChange={(e) => updateAchievement(index, e.target.value)}
                      placeholder="Achievement or award..."
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeAchievement(index)}
                      disabled={achievements.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAchievement}
                >
                  Add Achievement
                </Button>
              </div>
            </div>

            <Separator />

            {/* Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={watch('isActive')}
                  onCheckedChange={(checked) => setValue('isActive', checked)}
                />
                <Label htmlFor="isActive">Active Member</Label>
              </div>

              <div>
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  {...register('order', { valueAsNumber: true })}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={uploading}
                className="bg-green-600 hover:bg-green-700"
              >
                {uploading ? (
                  <>
                    <Upload className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {editingMember ? 'Update' : 'Save'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
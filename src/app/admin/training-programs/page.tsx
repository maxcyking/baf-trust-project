'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';
import { AdminUser, getAdminUser, ADMIN_PERMISSIONS } from '@/lib/auth-utils';
import { TrainingProgram } from '@/types/training';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, Toaster } from 'react-hot-toast';
import {
  Plus,
  Edit,
  Trash2,
  Users,
  Clock,
  MapPin,
  Star,
  BarChart3,
  Menu,
  X,
  LogOut,
  Settings,
  Shield,
  FileText,
  MessageSquare,
  UserCheck,
  GraduationCap,
  DollarSign,
  Users as UsersIcon,
  ImageIcon
} from 'lucide-react';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  fees: z.number().min(0, 'Fees must be a positive number'),
  duration: z.string().min(1, 'Duration is required'),
  location: z.string().min(1, 'Location is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  registrationEndDate: z.string().min(1, 'Registration end date is required'),
  maxParticipants: z.number().min(1, 'Max participants must be at least 1'),
  organizerName: z.string().min(1, 'Organizer name is required'),
  collaboratorName: z.string().optional(),
  paymentDetails: z.object({
    upiId: z.string().min(1, 'UPI ID is required'),
    qrCodeUrl: z.string().min(1, 'QR Code URL is required')
  }),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  isActive: z.boolean(),
  order: z.number().min(0, 'Order must be a positive number')
});

type FormData = z.infer<typeof schema>;

export default function TrainingProgramManager() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProgram, setEditingProgram] = useState<TrainingProgram | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [requirements, setRequirements] = useState<string[]>(['']);
  const [benefits, setBenefits] = useState<string[]>(['']);
  
  // QR Code upload states
  const [qrCodeFile, setQrCodeFile] = useState<File | null>(null);
  const [qrCodePreview, setQrCodePreview] = useState<string | null>(null);
  const [qrCodeUploading, setQrCodeUploading] = useState(false);

  const { user, logout } = useAuth();
  const router = useRouter();

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      fees: 0,
      duration: '',
      location: '',
      startDate: '',
      endDate: '',
      registrationEndDate: '',
      maxParticipants: 50,
      organizerName: 'BAF Trust - Bhartiya Agro Foundation',
      collaboratorName: '',
      paymentDetails: {
        upiId: '8079043733@ybl',
        qrCodeUrl: '/images/qrcode.jpg'
      },
      requirements: [],
      benefits: [],
      isActive: true,
      order: 0
    }
  });

  // Watch the QR code URL to show preview
  const watchedQrCodeUrl = watch('paymentDetails.qrCodeUrl');

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
    fetchPrograms();
  }, []);

  useEffect(() => {
    if (editingProgram) {
      setValue('title', editingProgram.title);
      setValue('description', editingProgram.description);
      setValue('fees', editingProgram.fees);
      setValue('duration', editingProgram.duration);
      setValue('location', editingProgram.location);
      setValue('startDate', editingProgram.startDate);
      setValue('endDate', editingProgram.endDate);
      setValue('registrationEndDate', editingProgram.registrationEndDate);
      setValue('maxParticipants', editingProgram.maxParticipants);
      setValue('organizerName', editingProgram.organizerName);
      setValue('collaboratorName', editingProgram.collaboratorName || '');
      setValue('paymentDetails', editingProgram.paymentDetails);
      setValue('isActive', editingProgram.isActive);
      setValue('order', editingProgram.order);
      setRequirements(editingProgram.requirements || ['']);
      setBenefits(editingProgram.benefits || ['']);
      setQrCodePreview(editingProgram.paymentDetails.qrCodeUrl);
    }
  }, [editingProgram, setValue]);

  const fetchPrograms = async () => {
    try {
      const q = query(collection(db, 'trainingPrograms'), orderBy('order'));
      const querySnapshot = await getDocs(q);
      const programsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TrainingProgram[];
      setPrograms(programsList);
    } catch (error) {
      console.error('Error fetching programs:', error);
      toast.error('Failed to fetch programs');
    } finally {
      setLoading(false);
    }
  };

  const handleQrCodeFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setQrCodeFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setQrCodePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadQrCodeImage = async (): Promise<string | null> => {
    if (!qrCodeFile) return null;

    setQrCodeUploading(true);
    try {
      const timestamp = Date.now();
      const fileName = `qr-codes/${timestamp}-${qrCodeFile.name}`;
      const storageRef = ref(storage, fileName);
      
      await uploadBytes(storageRef, qrCodeFile);
      const downloadURL = await getDownloadURL(storageRef);
      
      toast.success('QR code image uploaded successfully');
      return downloadURL;
    } catch (error) {
      console.error('Error uploading QR code:', error);
      toast.error('Failed to upload QR code image');
      return null;
    } finally {
      setQrCodeUploading(false);
    }
  };

  const removeQrCodeImage = () => {
    setQrCodeFile(null);
    setQrCodePreview(null);
    setValue('paymentDetails.qrCodeUrl', '/images/qrcode.jpg');
  };

  const onSubmit = async (data: FormData) => {
    try {
      let finalQrCodeUrl = data.paymentDetails.qrCodeUrl;

      // Upload QR code image if a new file was selected
      if (qrCodeFile) {
        const uploadedUrl = await uploadQrCodeImage();
        if (uploadedUrl) {
          finalQrCodeUrl = uploadedUrl;
        } else {
          toast.error('Failed to upload QR code. Please try again.');
          return;
        }
      }

      const programData = {
        ...data,
        paymentDetails: {
          ...data.paymentDetails,
          qrCodeUrl: finalQrCodeUrl
        },
        requirements: requirements.filter(req => req.trim() !== ''),
        benefits: benefits.filter(benefit => benefit.trim() !== ''),
        currentParticipants: editingProgram?.currentParticipants || 0,
        createdAt: editingProgram?.createdAt || Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      if (editingProgram) {
        await updateDoc(doc(db, 'trainingPrograms', editingProgram.id), programData);
        toast.success('Program updated successfully');
      } else {
        await addDoc(collection(db, 'trainingPrograms'), programData);
        toast.success('Program added successfully');
      }
      
      handleCancel();
      fetchPrograms();
    } catch (error) {
      console.error('Error saving program:', error);
      toast.error('Failed to save program');
    }
  };

  const handleEdit = (program: TrainingProgram) => {
    setEditingProgram(program);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this program?')) return;

    try {
      await deleteDoc(doc(db, 'trainingPrograms', id));
      toast.success('Program deleted successfully');
      fetchPrograms();
    } catch (error) {
      console.error('Error deleting program:', error);
      toast.error('Failed to delete program');
    }
  };

  const handleCancel = () => {
    setEditingProgram(null);
    setShowForm(false);
    setRequirements(['']);
    setBenefits(['']);
    setQrCodeFile(null);
    setQrCodePreview(null);
    reset();
  };

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const updateRequirement = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  const addBenefit = () => {
    setBenefits([...benefits, '']);
  };

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const updateBenefit = (index: number, value: string) => {
    const updated = [...benefits];
    updated[index] = value;
    setBenefits(updated);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatDate = (timestamp: any) => {
    if (timestamp?.toDate) {
      return timestamp.toDate().toLocaleDateString('en-IN');
    }
    return new Date(timestamp).toLocaleDateString('en-IN');
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
    { icon: GraduationCap, label: 'Training Programs', href: '/admin/training-programs', permission: ADMIN_PERMISSIONS.MANAGE_CONTENT, active: true },
    { icon: FileText, label: 'Registrations', href: '/admin/registrations', permission: ADMIN_PERMISSIONS.MANAGE_CONTENT },
    { icon: MessageSquare, label: 'Inquiries', href: '/admin/inquiries', permission: ADMIN_PERMISSIONS.MANAGE_INQUIRIES },
    { icon: Star, label: 'Testimonials', href: '/admin/testimonials', permission: ADMIN_PERMISSIONS.MANAGE_TESTIMONIALS },
    { icon: ImageIcon, label: 'Gallery', href: '/admin/gallery', permission: ADMIN_PERMISSIONS.MANAGE_GALLERY },
    { icon: UserCheck, label: 'Team Management', href: '/admin/team', permission: ADMIN_PERMISSIONS.MANAGE_CONTENT },
    { icon: Settings, label: 'Settings', href: '/admin/settings', permission: ADMIN_PERMISSIONS.MANAGE_SETTINGS },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading training programs...</p>
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
            <h1 className="text-lg font-semibold text-gray-800">Training Programs</h1>
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
              <h1 className="text-2xl font-bold text-green-800">Training Program Manager</h1>
              <p className="text-gray-600">Manage training programs for BAF Trust</p>
            </div>
            <Button onClick={() => setShowForm(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Program
            </Button>
          </div>

          {/* Form */}
          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-green-800">
                  {editingProgram ? 'Edit Program' : 'Add New Program'}
                </CardTitle>
                <CardDescription>
                  {editingProgram ? 'Update the training program details' : 'Create a new training program for BAF Trust'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Program Title *</Label>
                        <Input
                          id="title"
                          {...register('title')}
                          placeholder="e.g., Advanced Goat Farming Training"
                          className={errors.title ? 'border-red-500' : ''}
                        />
                        {errors.title && (
                          <Alert variant="destructive">
                            <AlertDescription>{errors.title.message}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fees">Program Fees (₹) *</Label>
                        <Input
                          id="fees"
                          type="number"
                          {...register('fees', { valueAsNumber: true })}
                          placeholder="2999"
                          className={errors.fees ? 'border-red-500' : ''}
                        />
                        {errors.fees && (
                          <Alert variant="destructive">
                            <AlertDescription>{errors.fees.message}</AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Program Description *</Label>
                      <Textarea
                        id="description"
                        {...register('description')}
                        rows={3}
                        placeholder="Comprehensive training program for modern agricultural practices..."
                        className={errors.description ? 'border-red-500' : ''}
                      />
                      {errors.description && (
                        <Alert variant="destructive">
                          <AlertDescription>{errors.description.message}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Program Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Program Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration *</Label>
                        <Input
                          id="duration"
                          {...register('duration')}
                          placeholder="e.g., 5 days"
                          className={errors.duration ? 'border-red-500' : ''}
                        />
                        {errors.duration && (
                          <Alert variant="destructive">
                            <AlertDescription>{errors.duration.message}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          {...register('location')}
                          placeholder="Rajgarh, Churu, Rajasthan"
                          className={errors.location ? 'border-red-500' : ''}
                        />
                        {errors.location && (
                          <Alert variant="destructive">
                            <AlertDescription>{errors.location.message}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="maxParticipants">Max Participants *</Label>
                        <Input
                          id="maxParticipants"
                          type="number"
                          {...register('maxParticipants', { valueAsNumber: true })}
                          className={errors.maxParticipants ? 'border-red-500' : ''}
                        />
                        {errors.maxParticipants && (
                          <Alert variant="destructive">
                            <AlertDescription>{errors.maxParticipants.message}</AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Dates */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Schedule</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date *</Label>
                        <Input
                          id="startDate"
                          type="date"
                          {...register('startDate')}
                          className={errors.startDate ? 'border-red-500' : ''}
                        />
                        {errors.startDate && (
                          <Alert variant="destructive">
                            <AlertDescription>{errors.startDate.message}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date *</Label>
                        <Input
                          id="endDate"
                          type="date"
                          {...register('endDate')}
                          className={errors.endDate ? 'border-red-500' : ''}
                        />
                        {errors.endDate && (
                          <Alert variant="destructive">
                            <AlertDescription>{errors.endDate.message}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="registrationEndDate">Registration End Date *</Label>
                        <Input
                          id="registrationEndDate"
                          type="date"
                          {...register('registrationEndDate')}
                          className={errors.registrationEndDate ? 'border-red-500' : ''}
                        />
                        {errors.registrationEndDate && (
                          <Alert variant="destructive">
                            <AlertDescription>{errors.registrationEndDate.message}</AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Organization Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Organization Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="organizerName">Organizer Name *</Label>
                        <Input
                          id="organizerName"
                          {...register('organizerName')}
                          className={errors.organizerName ? 'border-red-500' : ''}
                        />
                        {errors.organizerName && (
                          <Alert variant="destructive">
                            <AlertDescription>{errors.organizerName.message}</AlertDescription>
                          </Alert>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="collaboratorName">Collaborator Name (Optional)</Label>
                        <Input
                          id="collaboratorName"
                          {...register('collaboratorName')}
                          placeholder="Optional collaborator"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID *</Label>
                      <Input
                        id="upiId"
                        {...register('paymentDetails.upiId')}
                        className={errors.paymentDetails?.upiId ? 'border-red-500' : ''}
                      />
                      {errors.paymentDetails?.upiId && (
                        <Alert variant="destructive">
                          <AlertDescription>{errors.paymentDetails.upiId.message}</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-4">
                      <Label>QR Code *</Label>
                      
                      {/* QR Code Preview */}
                      {(qrCodePreview || watchedQrCodeUrl) && (
                        <Card className="p-4">
                          <div className="relative inline-block">
                            <img
                              src={qrCodePreview || watchedQrCodeUrl}
                              alt="QR Code Preview"
                              className="w-48 h-48 object-contain border rounded-lg bg-gray-50"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder-image.jpg';
                              }}
                            />
                            {qrCodePreview && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0"
                                onClick={removeQrCodeImage}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </Card>
                      )}

                      {/* Upload Option */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleQrCodeFileSelect}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                          />
                          {qrCodeUploading && (
                            <div className="flex items-center text-sm text-blue-600">
                              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-600 mr-2"></div>
                              Uploading...
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          Upload an image file (JPG, PNG, etc.) or use the URL field below. Max size: 5MB
                        </p>
                      </div>

                      {/* URL Input (fallback) */}
                      <div className="space-y-2">
                        <Label htmlFor="qrCodeUrl">Or enter QR Code URL</Label>
                        <Input
                          id="qrCodeUrl"
                          {...register('paymentDetails.qrCodeUrl')}
                          placeholder="https://example.com/qr-code.jpg"
                          className={errors.paymentDetails?.qrCodeUrl ? 'border-red-500' : ''}
                        />
                        {errors.paymentDetails?.qrCodeUrl && (
                          <Alert variant="destructive">
                            <AlertDescription>{errors.paymentDetails.qrCodeUrl.message}</AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Requirements */}
                  <div className="space-y-4">
                    <Label>Requirements</Label>
                    {requirements.map((requirement, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={requirement}
                          onChange={(e) => updateRequirement(index, e.target.value)}
                          placeholder="Enter requirement"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeRequirement(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addRequirement}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Requirement
                    </Button>
                  </div>

                  <Separator />

                  {/* Benefits */}
                  <div className="space-y-4">
                    <Label>Benefits</Label>
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={benefit}
                          onChange={(e) => updateBenefit(index, e.target.value)}
                          placeholder="Enter benefit"
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeBenefit(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addBenefit}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Benefit
                    </Button>
                  </div>

                  <Separator />

                  {/* Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isActive"
                          {...register('isActive')}
                          checked={watch('isActive')}
                          onCheckedChange={(checked: boolean) => setValue('isActive', checked)}
                        />
                        <Label htmlFor="isActive">Active Program</Label>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="order">Display Order</Label>
                        <Input
                          id="order"
                          type="number"
                          {...register('order', { valueAsNumber: true })}
                          className={errors.order ? 'border-red-500' : ''}
                        />
                        {errors.order && (
                          <Alert variant="destructive">
                            <AlertDescription>{errors.order.message}</AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      {editingProgram ? 'Update Program' : 'Add Program'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Programs List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Training Programs ({programs.length})</span>
                <Badge variant="outline" className="text-green-600">
                  {programs.filter(p => p.isActive).length} Active
                </Badge>
              </CardTitle>
              <CardDescription>
                Manage all training programs for BAF Trust
              </CardDescription>
            </CardHeader>
            <CardContent>
              {programs.length === 0 ? (
                <div className="text-center py-12">
                  <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No training programs found. Create your first program!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {programs.map((program) => (
                    <Card key={program.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{program.title}</h3>
                              <Badge variant={program.isActive ? "default" : "secondary"}>
                                {program.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                            
                            <p className="text-gray-600 mb-4 line-clamp-2">{program.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center text-gray-600">
                                <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                                <span className="font-semibold text-green-600">₹{program.fees?.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Clock className="w-4 h-4 mr-1" />
                                {program.duration}
                              </div>
                              <div className="flex items-center text-gray-600">
                                <MapPin className="w-4 h-4 mr-1" />
                                {program.location}
                              </div>
                              <div className="flex items-center text-gray-600">
                                <UsersIcon className="w-4 h-4 mr-1" />
                                {program.currentParticipants}/{program.maxParticipants}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                              <div>
                                <span className="text-gray-500">Start:</span>
                                <span className="ml-1 font-medium">{formatDate(program.startDate)}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">End:</span>
                                <span className="ml-1 font-medium">{formatDate(program.endDate)}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Registration End:</span>
                                <span className="ml-1 font-medium">{formatDate(program.registrationEndDate)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(program)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(program.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 
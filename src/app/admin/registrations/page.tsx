'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, query, orderBy, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Registration, REGISTRATION_STATUS_COLORS, REGISTRATION_STATUS_TEXT } from '@/types/registration';
import { useAuth } from '@/lib/auth-context';
import { AdminUser, getAdminUser, ADMIN_PERMISSIONS } from '@/lib/auth-utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  Eye,
  Check,
  X as XIcon,
  Calendar,
  Phone,
  Mail,
  MapPin,
  FileImage,
  Filter,
  Search,
  Download,
  RefreshCw,
  UserCheck
} from 'lucide-react';

export default function AdminRegistrationsPage() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [updating, setUpdating] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  const { user, logout } = useAuth();
  const router = useRouter();

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
      fetchRegistrations();
    }
  }, [adminUser]);

  useEffect(() => {
    filterRegistrations();
  }, [registrations, filterStatus, searchQuery]);

  const fetchRegistrations = async () => {
    try {
      const q = query(
        collection(db, 'registrations'),
        orderBy('registrationDate', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const registrationsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Registration[];
      setRegistrations(registrationsList);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast.error('Failed to fetch registrations');
    } finally {
      setLoading(false);
    }
  };

  const filterRegistrations = () => {
    let filtered = registrations;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(reg => reg.status === filterStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(reg => 
        reg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.mobile.includes(searchQuery) ||
        reg.registrationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.programTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRegistrations(filtered);
  };

  const updateRegistrationStatus = async (registrationId: string, newStatus: 'approved' | 'rejected', adminNotes?: string) => {
    setUpdating(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData: any = {
        status: newStatus,
        lastUpdated: Timestamp.now()
      };

      if (newStatus === 'approved') {
        updateData.approvedBy = adminUser?.email;
        updateData.approvedAt = Timestamp.now();
      }

      if (adminNotes) {
        updateData.adminNotes = adminNotes;
      }

      await updateDoc(doc(db, 'registrations', registrationId), updateData);
      
      // Update local state
      setRegistrations(prev => prev.map(reg => 
        reg.id === registrationId 
          ? { ...reg, ...updateData, status: newStatus }
          : reg
      ));

      toast.success(`Registration ${newStatus} successfully`);
    } catch (error) {
      console.error('Error updating registration:', error);
      toast.error('Failed to update registration');
    } finally {
      setUpdating(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatDate = (timestamp: any) => {
    if (timestamp?.toDate) {
      return timestamp.toDate().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return new Date(timestamp).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const exportRegistrations = () => {
    const csvContent = [
      ['Registration ID', 'Name', 'Email', 'Mobile', 'Program', 'Status', 'Registration Date', 'Amount'].join(','),
      ...filteredRegistrations.map(reg => [
        reg.registrationId,
        reg.name,
        reg.email,
        reg.mobile,
        reg.programTitle,
        reg.status,
        formatDate(reg.registrationDate),
        reg.programFees
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const viewImage = (url: string, title: string) => {
    setSelectedImage({ url, title });
    setShowImageDialog(true);
  };

  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/admin/dashboard', permission: ADMIN_PERMISSIONS.VIEW_DASHBOARD },
    { icon: Users, label: 'User Management', href: '/admin/users', permission: ADMIN_PERMISSIONS.MANAGE_USERS },
    { icon: GraduationCap, label: 'Training Programs', href: '/admin/training-programs', permission: ADMIN_PERMISSIONS.MANAGE_CONTENT },
    { icon: FileText, label: 'Registrations', href: '/admin/registrations', permission: ADMIN_PERMISSIONS.MANAGE_CONTENT, active: true },
    { icon: MessageSquare, label: 'Inquiries', href: '/admin/inquiries', permission: ADMIN_PERMISSIONS.MANAGE_INQUIRIES },
    { icon: Star, label: 'Testimonials', href: '/admin/testimonials', permission: ADMIN_PERMISSIONS.MANAGE_TESTIMONIALS },
    { icon: ImageIcon, label: 'Gallery', href: '/admin/gallery', permission: ADMIN_PERMISSIONS.MANAGE_GALLERY },
    { icon: UserCheck, label: 'Team Management', href: '/admin/team', permission: ADMIN_PERMISSIONS.MANAGE_CONTENT },
    { icon: Settings, label: 'Settings', href: '/admin/settings', permission: ADMIN_PERMISSIONS.MANAGE_SETTINGS },
  ];

  const getStatusStats = () => {
    const stats = {
      total: registrations.length,
      pending: registrations.filter(r => r.status === 'pending').length,
      approved: registrations.filter(r => r.status === 'approved').length,
      rejected: registrations.filter(r => r.status === 'rejected').length,
    };
    return stats;
  };

  const stats = getStatusStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading registrations...</p>
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
            <h1 className="text-lg font-semibold text-gray-800">Registrations</h1>
            <Button onClick={handleLogout} variant="ghost" size="sm">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-green-800">Training Program Registrations</h1>
            <p className="text-gray-600">Manage all training program registrations</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Review</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                  </div>
                  <RefreshCw className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Approved</p>
                    <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                  </div>
                  <Check className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rejected</p>
                    <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                  </div>
                  <XIcon className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search registrations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'approved' | 'rejected')}
                      className="px-3 py-2 border rounded-md"
                      title="Filter registrations by status"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button onClick={fetchRegistrations} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button onClick={exportRegistrations} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registrations List */}
          <div className="space-y-4">
            {filteredRegistrations.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No registrations found</p>
                </CardContent>
              </Card>
            ) : (
              filteredRegistrations.map((registration) => (
                <Card key={registration.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{registration.name}</h3>
                          <Badge className={REGISTRATION_STATUS_COLORS[registration.status]}>
                            {REGISTRATION_STATUS_TEXT[registration.status]}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600">Registration ID</p>
                            <p className="text-sm font-bold text-primary">{registration.registrationId}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Program</p>
                            <p className="text-sm text-gray-900">{registration.programTitle}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600">Amount</p>
                            <p className="text-sm text-gray-900">₹{registration.programFees.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-4 w-4 mr-2" />
                            {registration.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-4 w-4 mr-2" />
                            {registration.mobile}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(registration.registrationDate)}
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <MapPin className="h-4 w-4 mr-2" />
                          {registration.address.city}, {registration.address.state} - {registration.address.pinCode}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Registration Details</DialogTitle>
                              <DialogDescription>
                                Complete information for {registration.name}
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-6">
                              {/* Personal Information */}
                              <div>
                                <h4 className="font-medium mb-3">Personal Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label>Full Name</Label>
                                    <p className="text-sm text-gray-900">{registration.name}</p>
                                  </div>
                                  <div>
                                    <Label>Email</Label>
                                    <p className="text-sm text-gray-900">{registration.email}</p>
                                  </div>
                                  <div>
                                    <Label>Mobile</Label>
                                    <p className="text-sm text-gray-900">{registration.mobile}</p>
                                  </div>
                                  <div>
                                    <Label>Father/Mother/Husband Name</Label>
                                    <p className="text-sm text-gray-900">{registration.fatherMotherHusbandName}</p>
                                  </div>
                                  <div>
                                    <Label>Aadhar Number</Label>
                                    <p className="text-sm text-gray-900">{registration.aadharNumber}</p>
                                  </div>
                                  <div>
                                    <Label>Date of Birth</Label>
                                    <p className="text-sm text-gray-900">{new Date(registration.dateOfBirth).toLocaleDateString('en-IN')}</p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Address Information */}
                              <div>
                                <h4 className="font-medium mb-3">Address Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label>Street Address</Label>
                                    <p className="text-sm text-gray-900">{registration.address.street}</p>
                                  </div>
                                  <div>
                                    <Label>City</Label>
                                    <p className="text-sm text-gray-900">{registration.address.city}</p>
                                  </div>
                                  <div>
                                    <Label>State</Label>
                                    <p className="text-sm text-gray-900">{registration.address.state}</p>
                                  </div>
                                  <div>
                                    <Label>Pin Code</Label>
                                    <p className="text-sm text-gray-900">{registration.address.pinCode}</p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Documents */}
                              <div>
                                <h4 className="font-medium mb-3">Documents</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div>
                                    <Label>Aadhar Front</Label>
                                    <div className="mt-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => viewImage(registration.documents.aadharFront, 'Aadhar Front')}
                                      >
                                        <FileImage className="h-4 w-4 mr-2" />
                                        View Image
                                      </Button>
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Aadhar Back</Label>
                                    <div className="mt-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => viewImage(registration.documents.aadharBack, 'Aadhar Back')}
                                      >
                                        <FileImage className="h-4 w-4 mr-2" />
                                        View Image
                                      </Button>
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Passport Photo</Label>
                                    <div className="mt-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => viewImage(registration.documents.passportPhoto, 'Passport Photo')}
                                      >
                                        <FileImage className="h-4 w-4 mr-2" />
                                        View Image
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Payment Information */}
                              <div>
                                <h4 className="font-medium mb-3">Payment Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label>Transaction ID</Label>
                                    <p className="text-sm text-gray-900">{registration.payment.transactionId}</p>
                                  </div>
                                  <div>
                                    <Label>Amount</Label>
                                    <p className="text-sm text-gray-900">₹{registration.payment.amount.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <Label>Payment Method</Label>
                                    <p className="text-sm text-gray-900 capitalize">{registration.payment.paymentMethod.replace('_', ' ')}</p>
                                  </div>
                                  <div>
                                    <Label>Payment Date</Label>
                                    <p className="text-sm text-gray-900">{new Date(registration.payment.paymentDate).toLocaleDateString('en-IN')}</p>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Admin Actions */}
                              {registration.status === 'pending' && (
                                <div>
                                  <h4 className="font-medium mb-3">Admin Actions</h4>
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="adminNotes">Admin Notes (Optional)</Label>
                                      <Textarea
                                        id="adminNotes"
                                        placeholder="Add any notes for this registration..."
                                        className="mt-1"
                                      />
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button
                                        onClick={() => {
                                          const notes = (document.getElementById('adminNotes') as HTMLTextAreaElement)?.value;
                                          updateRegistrationStatus(registration.id, 'approved', notes);
                                        }}
                                        disabled={updating}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <Check className="h-4 w-4 mr-2" />
                                        Approve
                                      </Button>
                                      <Button
                                        onClick={() => {
                                          const notes = (document.getElementById('adminNotes') as HTMLTextAreaElement)?.value;
                                          updateRegistrationStatus(registration.id, 'rejected', notes);
                                        }}
                                        disabled={updating}
                                        variant="destructive"
                                      >
                                        <XIcon className="h-4 w-4 mr-2" />
                                        Reject
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {/* Admin Notes Display */}
                              {registration.adminNotes && (
                                <div>
                                  <h4 className="font-medium mb-3">Admin Notes</h4>
                                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">{registration.adminNotes}</p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Image Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="text-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 
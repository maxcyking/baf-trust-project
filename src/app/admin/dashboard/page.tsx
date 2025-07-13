'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import { AdminUser, getAdminUser, ADMIN_PERMISSIONS } from '@/lib/auth-utils';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Shield, 
  FileText,
  Image,
  Star,
  Menu,
  X,
  GraduationCap,
  UserCheck
} from 'lucide-react';

export default function AdminDashboard() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [user, router]);

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
    { icon: Image, label: 'Gallery', href: '/admin/gallery', permission: ADMIN_PERMISSIONS.MANAGE_GALLERY },
    { icon: UserCheck, label: 'Team Management', href: '/admin/team', permission: ADMIN_PERMISSIONS.MANAGE_CONTENT },
    { icon: Settings, label: 'Settings', href: '/admin/settings', permission: ADMIN_PERMISSIONS.MANAGE_SETTINGS },
  ];

  const dashboardStats = [
    { title: 'Total Users', value: '1,234', icon: Users, color: 'text-blue-600' },
    { title: 'New Inquiries', value: '45', icon: MessageSquare, color: 'text-green-600' },
    { title: 'Testimonials', value: '89', icon: Star, color: 'text-yellow-600' },
    { title: 'Gallery Items', value: '156', icon: Image, color: 'text-purple-600' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!adminUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex flex-col w-64 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-green-800">BAF Trust Admin</h2>
              <button onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
              {sidebarItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
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
                className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
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
            <button onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
            <Button onClick={handleLogout} variant="ghost" size="sm">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, {adminUser.email}!</h1>
            <p className="text-gray-600 mt-1">Here&apos;s what&apos;s happening with BAF Trust today.</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Inquiries</CardTitle>
                <CardDescription>Latest user inquiries from the contact form</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">User {i}</p>
                        <p className="text-sm text-gray-600">Interested in goat farming training</p>
                      </div>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current system health and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Database</span>
                    <span className="text-sm font-medium text-green-600">Online</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Authentication</span>
                    <span className="text-sm font-medium text-green-600">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Storage</span>
                    <span className="text-sm font-medium text-green-600">Operational</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 
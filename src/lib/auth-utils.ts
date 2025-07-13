import { User } from 'firebase/auth';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface AdminUser {
  uid: string;
  email: string;
  role: 'user' | 'admin' | 'super_admin';
  createdAt: Date;
  lastLoginAt: Date;
  permissions: string[];
}

export const isAdmin = async (user: User): Promise<boolean> => {
  if (!user) {
    return false;
  }
  
  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const role = userData?.role;
      return role === 'admin' || role === 'super_admin';
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

export const isSuperAdmin = async (user: User): Promise<boolean> => {
  if (!user) return false;
  
  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const role = userDoc.data()?.role;
      return role === 'super_admin';
    }
    return false;
  } catch (error) {
    console.error('Error checking super admin status:', error);
    return false;
  }
};

export const getAdminUser = async (user: User): Promise<AdminUser | null> => {
  if (!user) return null;
  
  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      const role = data.role;
      
      // Only return admin users
      if (role === 'admin' || role === 'super_admin') {
        return {
          uid: user.uid,
          email: user.email!,
          role: role,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLoginAt: data.lastLoginAt?.toDate() || new Date(),
          permissions: Array.isArray(data.permissions) ? data.permissions : getDefaultPermissions(role)
        };
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching admin user:', error);
    return null;
  }
};

export const createUserDocument = async (user: User, role: 'user' | 'admin' | 'super_admin' = 'user'): Promise<void> => {
  if (!user) {
    return;
  }
  
  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      const userData = {
        email: user.email,
        role: role,
        permissions: getDefaultPermissions(role),
        createdAt: Timestamp.now(),
        lastLoginAt: Timestamp.now()
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);
    }
  } catch (error) {
    console.error('Error creating user document:', error);
  }
};

export const updateLastLogin = async (user: User): Promise<void> => {
  if (!user) return;
  
  try {
    await setDoc(doc(db, 'users', user.uid), {
      lastLoginAt: Timestamp.now()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating last login:', error);
  }
};

const getDefaultPermissions = (role: string): string[] => {
  switch (role) {
    case 'super_admin':
      return Object.values(ADMIN_PERMISSIONS);
    case 'admin':
      return [
        ADMIN_PERMISSIONS.VIEW_DASHBOARD,
        ADMIN_PERMISSIONS.MANAGE_INQUIRIES,
        ADMIN_PERMISSIONS.MANAGE_TESTIMONIALS,
        ADMIN_PERMISSIONS.MANAGE_GALLERY,
        ADMIN_PERMISSIONS.MANAGE_CONTENT
      ];
    default:
      return [];
  }
};

export const hasPermission = (adminUser: AdminUser, permission: string): boolean => {
  if (!adminUser) return false;
  if (adminUser.role === 'super_admin') return true;
  if (!adminUser.permissions || !Array.isArray(adminUser.permissions)) return false;
  return adminUser.permissions.includes(permission);
};

// Default admin permissions
export const ADMIN_PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  MANAGE_USERS: 'manage_users',
  MANAGE_CONTENT: 'manage_content',
  MANAGE_INQUIRIES: 'manage_inquiries',
  MANAGE_TESTIMONIALS: 'manage_testimonials',
  MANAGE_GALLERY: 'manage_gallery',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_SETTINGS: 'manage_settings'
}; 
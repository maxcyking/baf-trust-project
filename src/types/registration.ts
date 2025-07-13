import { Timestamp } from 'firebase/firestore';

export interface RegistrationFormData {
  // Personal Information
  name: string;
  email: string;
  mobile: string;
  fatherMotherHusbandName: string;
  aadharNumber: string;
  dateOfBirth: string;
  
  // Address Information
  address: {
    street: string;
    city: string;
    state: string;
    pinCode: string;
  };
  
  // Document URLs after upload
  documents: {
    aadharFront: string;
    aadharBack: string;
    passportPhoto: string;
  };
  
  // Payment Information
  payment: {
    transactionId: string;
    amount: number;
    paymentMethod: 'upi' | 'qr_code';
    paymentDate: string;
  };
  
  // Program Information
  programId: string;
  programTitle: string;
  programFees: number;
}

export interface Registration {
  id: string;
  registrationId: string; // Unique ID for tracking
  userId?: string; // Optional if user is logged in
  
  // Personal Information
  name: string;
  email: string;
  mobile: string;
  fatherMotherHusbandName: string;
  aadharNumber: string;
  dateOfBirth: string;
  
  // Address Information
  address: {
    street: string;
    city: string;
    state: string;
    pinCode: string;
  };
  
  // Document URLs
  documents: {
    aadharFront: string;
    aadharBack: string;
    passportPhoto: string;
  };
  
  // Payment Information
  payment: {
    transactionId: string;
    amount: number;
    paymentMethod: 'upi' | 'qr_code';
    paymentDate: string;
  };
  
  // Program Information
  programId: string;
  programTitle: string;
  programFees: number;
  
  // Status and Timestamps
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  registrationDate: Timestamp;
  lastUpdated: Timestamp;
  
  // Admin Notes
  adminNotes?: string;
  approvedBy?: string;
  approvedAt?: Timestamp;
}

export interface RegistrationStats {
  totalRegistrations: number;
  pendingRegistrations: number;
  approvedRegistrations: number;
  rejectedRegistrations: number;
}

// Form validation schemas
export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

export const REGISTRATION_STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800'
};

export const REGISTRATION_STATUS_TEXT = {
  pending: 'Pending Review',
  approved: 'Approved',
  rejected: 'Rejected',
  cancelled: 'Cancelled'
}; 
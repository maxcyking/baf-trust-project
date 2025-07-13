export interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  fees: number;
  duration: string;
  location: string;
  startDate: string;
  endDate: string;
  registrationEndDate: string;
  maxParticipants: number;
  currentParticipants: number;
  organizerName: string;
  collaboratorName?: string;
  paymentDetails: {
    upiId: string;
    qrCodeUrl: string;
  };
  requirements?: string[];
  benefits?: string[];
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface TrainingProgramFormData {
  title: string;
  description: string;
  fees: number;
  duration: string;
  location: string;
  startDate: string;
  endDate: string;
  registrationEndDate: string;
  maxParticipants: number;
  organizerName: string;
  collaboratorName?: string;
  paymentDetails: {
    upiId: string;
    qrCodeUrl: string;
  };
  requirements?: string[];
  benefits?: string[];
  isActive: boolean;
  order: number;
} 
import { Timestamp } from 'firebase/firestore';

export type TeamCategory = 'core' | 'advisory';

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  category: TeamCategory;
  specialty?: string;
  bio?: string;
  imageUrl?: string;
  email?: string;
  phone?: string;
  linkedIn?: string;
  education?: string;
  experience?: string;
  achievements?: string[];
  isActive: boolean;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}

export interface TeamFormData {
  name: string;
  designation: string;
  category: TeamCategory;
  specialty: string;
  bio: string;
  email: string;
  phone: string;
  linkedIn: string;
  education: string;
  experience: string;
  achievements: string[];
  isActive: boolean;
  order: number;
}

export interface TeamStats {
  totalMembers: number;
  activeMembers: number;
  coreTeamCount: number;
  advisoryTeamCount: number;
}

export const TEAM_CATEGORY_LABELS: Record<TeamCategory, string> = {
  core: 'Core Team',
  advisory: 'Advisory Team'
};

export const TEAM_CATEGORIES: { value: TeamCategory; label: string }[] = [
  { value: 'core', label: 'Core Team' },
  { value: 'advisory', label: 'Advisory Team' }
]; 
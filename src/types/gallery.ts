import { Timestamp } from 'firebase/firestore';

export type MediaType = 'image' | 'video' | 'news';

export interface GalleryItem {
  id: string;
  type: MediaType;
  title: string;
  description?: string;
  
  // For images and news
  imageUrl?: string;
  
  // For videos (YouTube)
  videoUrl?: string;
  videoId?: string; // Extracted YouTube video ID
  thumbnailUrl?: string;
  
  // For news items
  newsDate?: string;
  newsSource?: string;
  
  // Common metadata
  tags?: string[];
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string; // Admin user ID
}

export interface GalleryFormData {
  type: MediaType;
  title: string;
  description?: string;
  imageFile?: File;
  videoUrl?: string;
  newsDate?: string;
  newsSource?: string;
  tags?: string[];
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
}

export interface GalleryStats {
  totalItems: number;
  publishedItems: number;
  featuredItems: number;
  imageCount: number;
  videoCount: number;
  newsCount: number;
}

export const MEDIA_TYPE_LABELS = {
  image: 'Images',
  video: 'Videos', 
  news: 'News'
};

export const MEDIA_TYPE_COLORS = {
  image: 'bg-blue-100 text-blue-800',
  video: 'bg-red-100 text-red-800',
  news: 'bg-green-100 text-green-800'
};

// Helper function to extract YouTube video ID
export const extractYouTubeVideoId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Helper function to get YouTube thumbnail URL
export const getYouTubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}; 
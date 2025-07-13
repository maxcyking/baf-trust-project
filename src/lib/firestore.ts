import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

// Collection references
export const COLLECTIONS = {
  USERS: 'users',
  INQUIRIES: 'inquiries',
  TESTIMONIALS: 'testimonials',
  GALLERY: 'gallery',
  CONTENT: 'content',
  SETTINGS: 'settings',
  TRAINING_PROGRAMS: 'trainingPrograms'
} as const;

// Data interfaces
export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  message: string;
  status: 'pending' | 'contacted' | 'resolved';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Testimonial {
  id?: string;
  name: string;
  location: string;
  program: string;
  rating: number;
  message: string;
  imageUrl?: string;
  isPublished: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface GalleryItem {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  isPublished: boolean;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ContentItem {
  id?: string;
  type: 'page' | 'section' | 'config';
  key: string;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Generic CRUD operations
export class FirestoreService {
  // Create
  static async create<T>(
    collectionName: string, 
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  }

  // Read single document
  static async getById<T>(
    collectionName: string, 
    id: string
  ): Promise<T | null> {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  }

  // Get all with optional filtering and sorting
  static async getAll<T>(
    collectionName: string,
    conditions?: { field: string; operator: unknown; value: unknown }[],
    orderByField?: string,
    orderDirection: 'asc' | 'desc' = 'desc',
    limitCount?: number
  ): Promise<T[]> {
    let q = query(collection(db, collectionName));

    // Apply conditions
    if (conditions) {
      conditions.forEach(({ field, operator, value }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        q = query(q, where(field, operator as any, value));
      });
    }

    // Apply ordering
    if (orderByField) {
      q = query(q, orderBy(orderByField, orderDirection));
    }

    // Apply limit
    if (limitCount) {
      q = query(q, limit(limitCount));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T);
  }

  // Update
  static async update<T>(
    collectionName: string, 
    id: string, 
    data: Partial<Omit<T, 'id'>>
  ): Promise<void> {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  }

  // Delete
  static async delete(collectionName: string, id: string): Promise<void> {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  }

  static async batchUpdate(
    collectionName: string,
    updates: { id: string; data: Record<string, unknown> }[]
  ): Promise<void> {
    const promises = updates.map(({ id, data }) => 
      this.update(collectionName, id, data)
    );
    await Promise.all(promises);
  }
}

// Specific service functions
export const InquiryService = {
  async createInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return FirestoreService.create<Inquiry>(COLLECTIONS.INQUIRIES, {
      ...inquiry,
      status: 'pending'
    });
  },

  async getInquiries(status?: Inquiry['status'], limitCount?: number): Promise<Inquiry[]> {
    const conditions = status ? [{ field: 'status', operator: '==', value: status }] : undefined;
    return FirestoreService.getAll<Inquiry>(
      COLLECTIONS.INQUIRIES, 
      conditions, 
      'createdAt', 
      'desc', 
      limitCount
    );
  },

  async updateInquiryStatus(id: string, status: Inquiry['status']): Promise<void> {
    return FirestoreService.update<Inquiry>(COLLECTIONS.INQUIRIES, id, { status });
  }
};

export const TestimonialService = {
  async createTestimonial(testimonial: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return FirestoreService.create<Testimonial>(COLLECTIONS.TESTIMONIALS, testimonial);
  },

  async getPublishedTestimonials(limitCount?: number): Promise<Testimonial[]> {
    return FirestoreService.getAll<Testimonial>(
      COLLECTIONS.TESTIMONIALS,
      [{ field: 'isPublished', operator: '==', value: true }],
      'createdAt',
      'desc',
      limitCount
    );
  },

  async getAllTestimonials(): Promise<Testimonial[]> {
    return FirestoreService.getAll<Testimonial>(
      COLLECTIONS.TESTIMONIALS,
      undefined,
      'createdAt',
      'desc'
    );
  },

  async togglePublish(id: string, isPublished: boolean): Promise<void> {
    return FirestoreService.update<Testimonial>(COLLECTIONS.TESTIMONIALS, id, { isPublished });
  }
};

export const GalleryService = {
  async createGalleryItem(item: Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return FirestoreService.create<GalleryItem>(COLLECTIONS.GALLERY, item);
  },

  async getPublishedGallery(category?: string, limitCount?: number): Promise<GalleryItem[]> {
    const conditions = [
      { field: 'isPublished', operator: '==', value: true },
      ...(category ? [{ field: 'category', operator: '==', value: category }] : [])
    ];
    return FirestoreService.getAll<GalleryItem>(
      COLLECTIONS.GALLERY,
      conditions,
      'order',
      'asc',
      limitCount
    );
  },

  async getAllGallery(): Promise<GalleryItem[]> {
    return FirestoreService.getAll<GalleryItem>(
      COLLECTIONS.GALLERY,
      undefined,
      'order',
      'asc'
    );
  }
};

export const ContentService = {
  async updateContent(key: string, content: string, title?: string): Promise<void> {
    const existing = await FirestoreService.getAll<ContentItem>(
      COLLECTIONS.CONTENT,
      [{ field: 'key', operator: '==', value: key }],
      undefined,
      'desc',
      1
    );

    if (existing.length > 0) {
      await FirestoreService.update<ContentItem>(COLLECTIONS.CONTENT, existing[0].id!, {
        content,
        title: title || existing[0].title,
        isPublished: true
      });
    } else {
      await FirestoreService.create<ContentItem>(COLLECTIONS.CONTENT, {
        type: 'section',
        key,
        title: title || key,
        content,
        isPublished: true
      });
    }
  },

  async getContent(key: string): Promise<ContentItem | null> {
    const items = await FirestoreService.getAll<ContentItem>(
      COLLECTIONS.CONTENT,
      [
        { field: 'key', operator: '==', value: key },
        { field: 'isPublished', operator: '==', value: true }
      ],
      'updatedAt',
      'desc',
      1
    );

    return items.length > 0 ? items[0] : null;
  }
}; 
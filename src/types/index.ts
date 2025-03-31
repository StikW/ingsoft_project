export type UserRole = 'owner' | 'interested';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type PropertyType = 'apartment' | 'house' | 'room' | 'parking' | 'warehouse';

export interface Property {
  id: string;
  ownerId: string;
  type: PropertyType;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  isAvailable: boolean;
  images: string[];
  amenities: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  propertyId: string;
  content: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'message' | 'review' | 'favorite' | 'property_update';
  read: boolean;
  createdAt: Date;
  data?: {
    propertyId?: string;
    messageId?: string;
    reviewId?: string;
  };
}

export interface Chat {
  id: string;
  propertyId: string;
  senderId: string;
  receiverId: string;
  lastMessage?: string;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
} 
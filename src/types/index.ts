export type UserRole = 'owner' | 'interested';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  createdAt: Date;
}

export type PropertyType = 'apartment' | 'house' | 'room' | 'parking' | 'warehouse';

export interface Property {
  id: string;
  ownerId: string;
  type: PropertyType;
  title: string;
  description: string;
  price: number;
  isAvailable: boolean;
  images: string[];
  amenities: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  propertyId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  read: boolean;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
} 

import { Timestamp } from 'firebase/firestore';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  sku: string;
  vatRate: number;
  images: string[];
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
}

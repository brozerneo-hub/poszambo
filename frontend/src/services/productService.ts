import { db } from '../config/firebase.config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  onSnapshot,
  query,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';
import { Product, Category } from '../types/types';

const productsCollection = collection(db, 'products');
const categoriesCollection = collection(db, 'categories');

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product));
  },

  getCategories: async (): Promise<Category[]> => {
    const snapshot = await getDocs(categoriesCollection);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Category));
  },

  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const docRef = await addDoc(productsCollection, {
      ...product,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return { ...product, id: docRef.id };
  },

  updateProduct: async (id: string, product: Partial<Product>): Promise<void> => {
    const productDoc = doc(db, 'products', id);
    await updateDoc(productDoc, {
      ...product,
      updatedAt: Timestamp.now(),
    });
  },

  deleteProduct: async (id: string): Promise<void> => {
    const productDoc = doc(db, 'products', id);
    await deleteDoc(productDoc);
  },

  subscribeToProducts: (
    callback: (products: Product[]) => void
  ): (() => void) => {
    console.log('Subscribing to products...');
    const q = query(productsCollection);
    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      console.log('Received products snapshot:', snapshot.size);
      const products = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product));
      callback(products);
    });
    return unsubscribe;
  },

  subscribeToCategories: (
    callback: (categories: Category[]) => void
  ): (() => void) => {
    const q = query(categoriesCollection);
    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const categories = snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id } as Category));
      callback(categories);
    });
    return unsubscribe;
  },
};
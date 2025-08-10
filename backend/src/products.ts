import { Product } from './types.js';
import * as admin from 'firebase-admin'; // Import admin to use Firestore types



export const getProductById = async (db: FirebaseFirestore.Firestore, productId: string): Promise<Product | undefined> => {
  const doc = await db.collection('products').doc(productId).get();
  if (!doc.exists) {
    return undefined;
  }
  return { id: doc.id, ...doc.data() } as Product;
};

export const getAllProducts = async (db: FirebaseFirestore.Firestore): Promise<Product[]> => {
  const snapshot = await db.collection('products').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

export const addProduct = async (db: FirebaseFirestore.Firestore, newProduct: Omit<Product, 'id'>): Promise<Product> => {
  const docRef = db.collection('products').doc();
  const product = { id: docRef.id, ...newProduct };
  await docRef.set(product);
  return product;
};

export const updateProduct = async (db: FirebaseFirestore.Firestore, productId: string, updatedProductData: Partial<Product>): Promise<Product | undefined> => {
  const productRef = db.collection('products').doc(productId);
  const doc = await productRef.get();
  if (!doc.exists) {
    return undefined;
  }
  await productRef.update(updatedProductData);
  return { id: productId, ...doc.data(), ...updatedProductData } as Product;
};

export const deleteProduct = async (db: FirebaseFirestore.Firestore, productId: string): Promise<boolean> => {
  const productRef = db.collection('products').doc(productId);
  const doc = await productRef.get();
  if (!doc.exists) {
    return false;
  }
  await productRef.delete();
  return true;
};

export const updateProductStock = async (db: FirebaseFirestore.Firestore, productId: string, quantityChange: number): Promise<boolean> => {
  const productRef = db.collection('products').doc(productId);
  const doc = await productRef.get();
  if (!doc.exists) {
    return false;
  }
  const currentStock = doc.data()?.stock || 0;
  await productRef.update({ stock: currentStock + quantityChange });
  return true;
};
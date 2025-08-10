import { calculateTTC, calculateVAT } from './vat.js';
import { Product, Return } from './types.js';
import * as admin from 'firebase-admin'; // Import admin to use Firestore types



export const processReturn = async (db: FirebaseFirestore.Firestore, product: Product, quantity: number): Promise<any> => {
  const returnRecord = {
    productId: product.id,
    productName: product.name,
    quantity,
    date: new Date(),
  };
  await db.collection('returns').add(returnRecord);
  return returnRecord;
};
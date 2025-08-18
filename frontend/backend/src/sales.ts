import { CartItem, PaymentMethod, SaleItem, Sale } from './types.js';
import * as admin from 'firebase-admin'; // Import admin to use Firestore types



// Fonction pour convertir un article du panier en article de vente
export const createSaleItemFromCartItem = (cartItem: CartItem): SaleItem => {
  return {
    productId: cartItem.id,
    name: cartItem.name,
    quantity: cartItem.quantity,
    price: cartItem.price,
    vatRate: cartItem.vatRate,
    totalHT: cartItem.totalHT,
    totalVAT: cartItem.totalVAT,
    totalTTC: cartItem.totalTTC,
  };
};

export const addSale = async (db: FirebaseFirestore.Firestore, newSale: Omit<Sale, 'id'>): Promise<Sale> => {
  const docRef = db.collection('sales').doc();
  const sale = { id: docRef.id, ...newSale };
  await docRef.set(sale);
  return sale;
};

export const getAllSales = async (db: FirebaseFirestore.Firestore): Promise<Sale[]> => {
  const snapshot = await db.collection('sales').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Sale));
};
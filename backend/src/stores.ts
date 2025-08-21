import { Store } from './types.js';

export const getStoreById = async (db: FirebaseFirestore.Firestore, storeId: string): Promise<Store | undefined> => {
  const doc = await db.collection('stores').doc(storeId).get();
  if (!doc.exists) {
    return undefined;
  }
  return { id: doc.id, ...doc.data() } as Store;
};

export const getAllStores = async (db: FirebaseFirestore.Firestore): Promise<Store[]> => {
  const snapshot = await db.collection('stores').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Store));
};

export const addStore = async (db: FirebaseFirestore.Firestore, newStore: Omit<Store, 'id'>): Promise<Store> => {
  const docRef = db.collection('stores').doc();
  const store = { id: docRef.id, ...newStore };
  await docRef.set(store);
  return store;
};

export const updateStore = async (db: FirebaseFirestore.Firestore, storeId: string, updatedStoreData: Partial<Store>): Promise<Store | undefined> => {
  const storeRef = db.collection('stores').doc(storeId);
  const doc = await storeRef.get();
  if (!doc.exists) {
    return undefined;
  }
  await storeRef.update(updatedStoreData);
  return { id: storeId, ...doc.data(), ...updatedStoreData } as Store;
};

export const deleteStore = async (db: FirebaseFirestore.Firestore, storeId: string): Promise<boolean> => {
  const storeRef = db.collection('stores').doc(storeId);
  const doc = await storeRef.get();
  if (!doc.exists) {
    return false;
  }
  await storeRef.delete();
  return true;
};
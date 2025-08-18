import { Client } from './types.js';
import * as admin from 'firebase-admin'; // Import admin to use Firestore types



export const getClientById = async (db: FirebaseFirestore.Firestore, clientId: string): Promise<Client | undefined> => {
  const doc = await db.collection('clients').doc(clientId).get();
  if (!doc.exists) {
    return undefined;
  }
  return { id: doc.id, ...doc.data() } as Client;
};

export const getAllClients = async (db: FirebaseFirestore.Firestore): Promise<Client[]> => {
  const snapshot = await db.collection('clients').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
};

export const addClient = async (db: FirebaseFirestore.Firestore, newClient: Omit<Client, 'id'>): Promise<Client> => {
  const docRef = db.collection('clients').doc();
  const client = { id: docRef.id, ...newClient };
  await docRef.set(client);
  return client;
};

export const updateClient = async (db: FirebaseFirestore.Firestore, clientId: string, updatedClientData: Partial<Client>): Promise<Client | undefined> => {
  const clientRef = db.collection('clients').doc(clientId);
  const doc = await clientRef.get();
  if (!doc.exists) {
    return undefined;
  }
  await clientRef.update(updatedClientData);
  return { id: clientId, ...doc.data(), ...updatedClientData } as Client;
};

export const deleteClient = async (db: FirebaseFirestore.Firestore, clientId: string): Promise<boolean> => {
  const clientRef = db.collection('clients').doc(clientId);
  const doc = await clientRef.get();
  if (!doc.exists) {
    return false;
  }
  await clientRef.delete();
  return true;
};
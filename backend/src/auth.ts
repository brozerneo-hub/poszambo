import bcrypt from 'bcrypt';
import { User } from './types.js';
import * as admin from 'firebase-admin'; // Import admin to use Firestore types



export const getUserByUsername = async (db: FirebaseFirestore.Firestore, username: string): Promise<User | undefined> => {
  const snapshot = await db.collection('users').where('username', '==', username).limit(1).get();
  if (snapshot.empty) {
    return undefined;
  }
  const doc = snapshot.docs[0];
  if (!doc) return undefined;
  const data = doc.data()!;
  return { id: doc.id, ...data } as User;
};

export const addUser = async (db: FirebaseFirestore.Firestore, username: string, passwordHash: string, role: string): Promise<User> => {
  const newUserRef = db.collection('users').doc();
  const newUser: User = { id: newUserRef.id, username, passwordHash, role };
  await newUserRef.set(newUser);
  return newUser;
};

export const updateUserRole = async (db: FirebaseFirestore.Firestore, userId: string, newRole: string): Promise<boolean> => {
  const userRef = db.collection('users').doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    return false;
  }
  await userRef.update({ role: newRole });
  return true;
};

export const updateUserPassword = async (db: FirebaseFirestore.Firestore, userId: string, newPasswordHash: string): Promise<boolean> => {
  const userRef = db.collection('users').doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    return false;
  }
  await userRef.update({ passwordHash: newPasswordHash });
  return true;
};

export const deleteUser = async (db: FirebaseFirestore.Firestore, userId: string): Promise<boolean> => {
  const userRef = db.collection('users').doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    return false;
  }
  await userRef.delete();
  return true;
};

export const getAllUsers = async (db: FirebaseFirestore.Firestore): Promise<User[]> => {
  const snapshot = await db.collection('users').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
};
import { db } from '../../config/firebase.config';
import { logger } from 'firebase-functions';

class FirestoreService {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = db;
    // The connection to emulator or production is handled in firebase.config.ts
    // and the environment variables set by firebase-tools
    logger.info('FirestoreService initialized');
  }

  async getAll(collection: string): Promise<any[]> {
    try {
      const snapshot = await this.db.collection(collection).get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      logger.error(`Error getting all documents from ${collection}`, error);
      throw error;
    }
  }

  async getById(collection: string, id: string): Promise<any> {
    try {
      const doc = await this.db.collection(collection).doc(id).get();
      if (!doc.exists) {
        return null;
      }
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      logger.error(`Error getting document ${id} from ${collection}`, error);
      throw error;
    }
  }

  async create(collection: string, data: any): Promise<any> {
    try {
      const docRef = await this.db.collection(collection).add(data);
      return { id: docRef.id, ...data };
    } catch (error) {
      logger.error(`Error creating document in ${collection}`, error);
      throw error;
    }
  }

  async update(collection: string, id: string, data: any): Promise<any> {
    try {
      await this.db.collection(collection).doc(id).update(data);
      return { id, ...data };
    } catch (error) {
      logger.error(`Error updating document ${id} in ${collection}`, error);
      throw error;
    }
  }

  async delete(collection: string, id: string): Promise<void> {
    try {
      await this.db.collection(collection).doc(id).delete();
    } catch (error) {
      logger.error(`Error deleting document ${id} from ${collection}`, error);
      throw error;
    }
  }
}

export const firestoreService = new FirestoreService();

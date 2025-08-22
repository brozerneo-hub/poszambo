"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestoreService = void 0;
const firebase_config_1 = require("../../config/firebase.config");
const firebase_functions_1 = require("firebase-functions");
class FirestoreService {
    constructor() {
        this.db = firebase_config_1.db;
        // The connection to emulator or production is handled in firebase.config.ts
        // and the environment variables set by firebase-tools
        firebase_functions_1.logger.info('FirestoreService initialized');
    }
    async getAll(collection) {
        try {
            const snapshot = await this.db.collection(collection).get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
        catch (error) {
            firebase_functions_1.logger.error(`Error getting all documents from ${collection}`, error);
            throw error;
        }
    }
    async getById(collection, id) {
        try {
            const doc = await this.db.collection(collection).doc(id).get();
            if (!doc.exists) {
                return null;
            }
            return { id: doc.id, ...doc.data() };
        }
        catch (error) {
            firebase_functions_1.logger.error(`Error getting document ${id} from ${collection}`, error);
            throw error;
        }
    }
    async create(collection, data) {
        try {
            const docRef = await this.db.collection(collection).add(data);
            return { id: docRef.id, ...data };
        }
        catch (error) {
            firebase_functions_1.logger.error(`Error creating document in ${collection}`, error);
            throw error;
        }
    }
    async update(collection, id, data) {
        try {
            await this.db.collection(collection).doc(id).update(data);
            return { id, ...data };
        }
        catch (error) {
            firebase_functions_1.logger.error(`Error updating document ${id} in ${collection}`, error);
            throw error;
        }
    }
    async delete(collection, id) {
        try {
            await this.db.collection(collection).doc(id).delete();
        }
        catch (error) {
            firebase_functions_1.logger.error(`Error deleting document ${id} from ${collection}`, error);
            throw error;
        }
    }
}
exports.firestoreService = new FirestoreService();
//# sourceMappingURL=firestore.service.js.map
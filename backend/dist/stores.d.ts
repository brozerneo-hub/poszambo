import { Store } from './types.js';
export declare const getStoreById: (db: FirebaseFirestore.Firestore, storeId: string) => Promise<Store | undefined>;
export declare const getAllStores: (db: FirebaseFirestore.Firestore) => Promise<Store[]>;
export declare const addStore: (db: FirebaseFirestore.Firestore, newStore: Omit<Store, "id">) => Promise<Store>;
export declare const updateStore: (db: FirebaseFirestore.Firestore, storeId: string, updatedStoreData: Partial<Store>) => Promise<Store | undefined>;
export declare const deleteStore: (db: FirebaseFirestore.Firestore, storeId: string) => Promise<boolean>;
//# sourceMappingURL=stores.d.ts.map
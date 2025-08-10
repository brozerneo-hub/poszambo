import { Client } from './types.js';
export declare const getClientById: (db: FirebaseFirestore.Firestore, clientId: string) => Promise<Client | undefined>;
export declare const getAllClients: (db: FirebaseFirestore.Firestore) => Promise<Client[]>;
export declare const addClient: (db: FirebaseFirestore.Firestore, newClient: Omit<Client, "id">) => Promise<Client>;
export declare const updateClient: (db: FirebaseFirestore.Firestore, clientId: string, updatedClientData: Partial<Client>) => Promise<Client | undefined>;
export declare const deleteClient: (db: FirebaseFirestore.Firestore, clientId: string) => Promise<boolean>;
//# sourceMappingURL=clients.d.ts.map
import { User } from './types.js';
export declare const getUserByUsername: (db: FirebaseFirestore.Firestore, username: string) => Promise<User | undefined>;
export declare const addUser: (db: FirebaseFirestore.Firestore, username: string, passwordHash: string, role: string) => Promise<User>;
export declare const updateUserRole: (db: FirebaseFirestore.Firestore, userId: string, newRole: string) => Promise<boolean>;
export declare const updateUserPassword: (db: FirebaseFirestore.Firestore, userId: string, newPasswordHash: string) => Promise<boolean>;
export declare const deleteUser: (db: FirebaseFirestore.Firestore, userId: string) => Promise<boolean>;
export declare const getAllUsers: (db: FirebaseFirestore.Firestore) => Promise<User[]>;
//# sourceMappingURL=auth.d.ts.map
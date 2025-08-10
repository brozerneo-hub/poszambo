import { Product } from './types.js';
export declare const getProductById: (db: FirebaseFirestore.Firestore, productId: string) => Promise<Product | undefined>;
export declare const getAllProducts: (db: FirebaseFirestore.Firestore) => Promise<Product[]>;
export declare const addProduct: (db: FirebaseFirestore.Firestore, newProduct: Omit<Product, "id">) => Promise<Product>;
export declare const updateProduct: (db: FirebaseFirestore.Firestore, productId: string, updatedProductData: Partial<Product>) => Promise<Product | undefined>;
export declare const deleteProduct: (db: FirebaseFirestore.Firestore, productId: string) => Promise<boolean>;
export declare const updateProductStock: (db: FirebaseFirestore.Firestore, productId: string, quantityChange: number) => Promise<boolean>;
//# sourceMappingURL=products.d.ts.map
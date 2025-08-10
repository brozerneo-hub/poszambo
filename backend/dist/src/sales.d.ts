import { CartItem, SaleItem, Sale } from './types.js';
export declare const createSaleItemFromCartItem: (cartItem: CartItem) => SaleItem;
export declare const addSale: (db: FirebaseFirestore.Firestore, newSale: Omit<Sale, "id">) => Promise<Sale>;
export declare const getAllSales: (db: FirebaseFirestore.Firestore) => Promise<Sale[]>;
//# sourceMappingURL=sales.d.ts.map
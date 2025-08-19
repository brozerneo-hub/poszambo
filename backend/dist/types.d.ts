export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    vatRate: number;
    stock: number;
    reference: string;
    description: string;
    imageUrl: string;
    lastSaleDate?: string;
    lastSaleQuantity?: number;
}
export interface User {
    id: string;
    username: string;
    passwordHash: string;
    role: string;
}
export interface CartItem extends Product {
    quantity: number;
    totalHT: number;
    totalVAT: number;
    totalTTC: number;
}
export interface Cart {
    items: CartItem[];
    totalHT: number;
    totalVAT: number;
    totalTTC: number;
}
export type PaymentMethod = 'cash' | 'card' | 'mobile';
export interface SaleItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    vatRate: number;
    totalHT: number;
    totalVAT: number;
    totalTTC: number;
}
export interface Sale {
    id: string;
    date: Date;
    items: SaleItem[];
    totalHT: number;
    totalVAT: number;
    totalTTC: number;
    paymentMethod: PaymentMethod;
    clientId: string | undefined;
}
export interface Return {
    id: string;
    date: Date;
    productId: string;
    productName: string;
    quantity: number;
    refundAmount: number;
}
export interface Client {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    address?: string;
    dateOfBirth?: string;
    gender?: string;
    loyaltyCardNumber?: string;
    marketingConsent?: boolean;
}
export interface Store {
    id: string;
    name: string;
    address: string;
    salesCount: number;
    stockQuantity: number;
}
//# sourceMappingURL=types.d.ts.map
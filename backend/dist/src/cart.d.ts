import { Product, Cart } from './types.js';
export declare const createCart: () => Cart;
export declare const addToCart: (cart: Cart, product: Product, quantity: number) => Cart;
export declare const removeFromCart: (cart: Cart, productId: string) => Cart;
export declare const updateItemQuantity: (cart: Cart, productId: string, newQuantity: number) => Cart;
//# sourceMappingURL=cart.d.ts.map
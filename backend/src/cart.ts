import { calculateVAT, calculateTTC } from './vat.js';
import { Product, CartItem, Cart } from './types.js';

const round = (num: number): number => Math.round((num + Number.EPSILON) * 100) / 100;

const recalculateCartTotals = (cart: Cart): void => {
  cart.totalHT = round(cart.items.reduce((sum, item) => sum + item.totalHT, 0));
  cart.totalVAT = round(cart.items.reduce((sum, item) => sum + item.totalVAT, 0));
  cart.totalTTC = round(cart.items.reduce((sum, item) => sum + item.totalTTC, 0));
};

export const createCart = (): Cart => ({
  items: [],
  totalHT: 0,
  totalVAT: 0,
  totalTTC: 0,
});

export const addToCart = (cart: Cart, product: Product, quantity: number): Cart => {
  const existingItem = cart.items.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.totalHT = round(existingItem.price * existingItem.quantity);
    existingItem.totalVAT = calculateVAT(existingItem.totalHT, existingItem.vatRate);
    existingItem.totalTTC = calculateTTC(existingItem.totalHT, existingItem.totalVAT);
  } else {
    const totalHT = round(product.price * quantity);
    const totalVAT = calculateVAT(totalHT, product.vatRate);
    const totalTTC = calculateTTC(totalHT, totalVAT);

    cart.items.push({
      ...product,
      quantity,
      totalHT,
      totalVAT,
      totalTTC,
    });
  }

  recalculateCartTotals(cart);
  return cart;
};

export const removeFromCart = (cart: Cart, productId: string): Cart => {
  cart.items = cart.items.filter(item => item.id !== productId);
  recalculateCartTotals(cart);
  return cart;
};

export const updateItemQuantity = (cart: Cart, productId: string, newQuantity: number): Cart => {
  const itemToUpdate = cart.items.find(item => item.id === productId);

  if (itemToUpdate) {
    if (newQuantity > 0) {
      itemToUpdate.quantity = newQuantity;
      itemToUpdate.totalHT = round(itemToUpdate.price * newQuantity);
      itemToUpdate.totalVAT = calculateVAT(itemToUpdate.totalHT, itemToUpdate.vatRate);
      itemToUpdate.totalTTC = calculateTTC(itemToUpdate.totalHT, itemToUpdate.totalVAT);
    } else {
      // Si la quantité est 0 ou moins, on supprime l'article
      cart.items = cart.items.filter(item => item.id !== productId);
    }
  }

  recalculateCartTotals(cart);
  return cart;
};

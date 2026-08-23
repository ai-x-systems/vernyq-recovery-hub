import type { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  getSubtotal: () => number;
  getShippingEstimate: () => string;
}

// Simple in-memory cart store (React state managed in context)
export function createEmptyCart(): CartItem[] {
  return [];
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function calculateItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function calculateShipping(items: CartItem[]): number {
  // Free freight shipping included in product price
  return 0;
}

export function getShippingText(): string {
  return "Freight shipping included";
}

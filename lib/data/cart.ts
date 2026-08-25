import type { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export function createEmptyCart(): CartItem[] {
  return [];
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function calculateItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function calculateShipping(_items: CartItem[]): number {
  return 0;
}

export function getShippingText(): string {
  return "Freight shipping included";
}

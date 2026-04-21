
export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number; // For discounts
  category: string;
  image: string;
  description: string;
  weight?: string;
  brand: string;
  inStock: boolean;
  isNew?: boolean;
  isFlashSale?: boolean;
  rating?: number;
  reviews?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id: string;
  label: string; // e.g., Home, Work
  recipient: string;
  phone: string;
  address: string;
  area: string; // e.g., Kicukiro
  instructions?: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  coordinates: { lat: number; lng: number };
  image: string;
  hours: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  slug: string;
  image?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'out-for-delivery' | 'delivered' | 'cancelled';

export interface TrackingStep {
  status: OrderStatus;
  label: string;
  date: string;
  completed: boolean;
  description?: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: CartItem[];
  deliveryAddress: string;
  paymentMethod: string;
  trackingHistory: TrackingStep[];
  estimatedDelivery?: string;
}

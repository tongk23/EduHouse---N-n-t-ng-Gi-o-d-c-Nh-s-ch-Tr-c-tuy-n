export type Genre = 'Kinh tế' | 'Văn học' | 'Kỹ năng' | 'Thiếu nhi' | 'Ngoại ngữ' | 'Khoa học';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  oldPrice?: number;
  genre: Genre;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem extends Book {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'customer' | 'admin';
  isHost?: boolean;
  avatar?: string;
}

export interface ShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  note?: string;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: 'Pending' | 'Shipping' | 'Completed';
  shippingInfo?: ShippingInfo;
  items?: CartItem[];
}

export interface News {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

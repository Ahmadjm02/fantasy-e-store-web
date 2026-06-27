export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface Item {
  id: number;
  title: string;
  description: string;
  price: string; // decimal string e.g. "260.00"
  location: 'JO' | 'SA';
}

export interface PagedItems {
  items: Item[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface Order {
  orderId: string;
  item: Item;
  unitPrice: string;
  quantity: number;
  total: string;
  purchasedAt: string;
  buyer: string;
}

export type SortDir = 'asc' | 'desc' | '';
export type Country = 'JO' | 'SA' | '';

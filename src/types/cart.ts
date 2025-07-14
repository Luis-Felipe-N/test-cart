export interface Product {
  id: number;
  title: string;
  price: number;
}

export interface CartPayload {
  userId: number;
  date: string;
  products: {
    productId: number;
    quantity: number;
  }[];
}

export interface CartResponse {
  id: number;
  userId: number;
  date: string;
  products: {
    productId: number;
    quantity: number;
  }[];
}

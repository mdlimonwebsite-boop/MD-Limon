export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice: number | null;
  category: string;
  stock: number;
  images: string[];
  featured: boolean;
  trending: boolean;
  newArrival: boolean;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

import { Product } from '../types';

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Golden AirPods Pro 2",
    price: 249.99,
    discountPrice: 199.99,
    category: "Earbuds",
    stock: 15,
    images: ["https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80"],
    featured: true,
    trending: true,
    newArrival: false,
    description: "Premium noise-canceling wireless earbuds with a sleek golden touch."
  },
  {
    id: "2",
    name: "Luxury Carbon Fiber Smartwatch",
    price: 399.00,
    discountPrice: null,
    category: "Smart Watches",
    stock: 5,
    images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80"],
    featured: true,
    trending: false,
    newArrival: true,
    description: "Elegant smartwatch with fitness tracking and carbon fiber finish."
  },
  {
    id: "3",
    name: "Eclipse Wireless Headphones",
    price: 150.00,
    discountPrice: 120.00,
    category: "Headphones",
    stock: 25,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"],
    featured: false,
    trending: true,
    newArrival: false,
    description: "High-fidelity audio with deep bass and premium comfort."
  },
  {
    id: "4",
    name: "Titanium Power Bank 20000mAh",
    price: 89.99,
    discountPrice: 59.99,
    category: "Power Banks",
    stock: 50,
    images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80"],
    featured: false,
    trending: false,
    newArrival: true,
    description: "Fast charging portable charger with titanium finish."
  }
];

const defaultCategories = [
  "Fan", "Ring Light", "Headphone", "Drone", "Mouse & Keyboard", "Gimble", "microphone", "Wardrobe"
];

export function getProducts(): Product[] {
  const data = localStorage.getItem('products');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {}
  }
  return defaultProducts;
}

export function saveProducts(products: Product[]) {
  localStorage.setItem('products', JSON.stringify(products));
}

export function getCategories(): string[] {
  const data = localStorage.getItem('categories');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {}
  }
  return defaultCategories;
}

export function saveCategories(categories: string[]) {
  localStorage.setItem('categories', JSON.stringify(categories));
}

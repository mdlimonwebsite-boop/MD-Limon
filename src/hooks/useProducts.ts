import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { getProducts } from '../lib/store';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      // Simulate network request for realistic loading state
      await new Promise(r => setTimeout(r, 100));
      setProducts(getProducts());
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, refetch: fetchProducts };
}

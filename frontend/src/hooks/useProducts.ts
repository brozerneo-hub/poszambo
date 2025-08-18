
import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import { Product, Category } from '../types/types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribeProducts = productService.subscribeToProducts((products) => {
      setProducts(products);
      setLoading(false);
    });

    const unsubscribeCategories = productService.subscribeToCategories((categories) => {
      setCategories(categories);
    });

    return () => {
      unsubscribeProducts();
      unsubscribeCategories();
    };
  }, []);

  const addProduct = useCallback(async (product: Omit<Product, 'id'>) => {
    try {
      await productService.createProduct(product);
    } catch (err: any) {
      setError(err.message || 'Failed to add product');
    }
  }, []);

  const updateProduct = useCallback(async (id: string, product: Partial<Product>) => {
    try {
      await productService.updateProduct(id, product);
    } catch (err: any) {
      setError(err.message || 'Failed to update product');
    }
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    try {
      await productService.deleteProduct(id);
    } catch (err: any) {
      setError(err.message || 'Failed to delete product');
    }
  }, []);

  return { products, categories, loading, error, addProduct, updateProduct, deleteProduct };
};

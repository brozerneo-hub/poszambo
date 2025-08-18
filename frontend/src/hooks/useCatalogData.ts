// frontend/src/hooks/useCatalogData.ts
import { useState, useEffect } from 'react';
import { db } from '../config/firebase.config'; // Assuming firebase.config.ts exists and exports db
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';

interface CatalogTileData {
  totalProducts: number;
  lowStockItems: number;
  outOfStockItems: number;
  recentlyAdded: number;
  categories: string[];
  totalStockQuantity: number; // New field
}

const useCatalogData = () => {
  const [data, setData] = useState<CatalogTileData>({
    totalProducts: 0,
    lowStockItems: 0,
    outOfStockItems: 0,
    recentlyAdded: 0,
    categories: [],
    totalStockQuantity: 0, // Initialize new field
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch total products
        const productsRef = collection(db, 'products');
        const totalProductsSnapshot = await getDocs(productsRef);
        const totalProducts = totalProductsSnapshot.size;
        const totalStockQuantity = totalProductsSnapshot.docs.reduce((sum, doc) => sum + (doc.data().stock || 0), 0); // Calculate total stock

        // Fetch low stock items (stock <= 5)
        const lowStockQuery = query(productsRef, where('stock', '<=', 5));
        const lowStockSnapshot = await getDocs(lowStockQuery);
        const lowStockItems = lowStockSnapshot.size;

        // Fetch out of stock items (stock === 0)
        const outOfStockQuery = query(productsRef, where('stock', '==', 0));
        const outOfStockSnapshot = await getDocs(outOfStockQuery);
        const outOfStockItems = outOfStockSnapshot.size;

        // Fetch recently added (last 24 hours)
        const twentyFourHoursAgo = Timestamp.fromDate(new Date(Date.now() - 24 * 60 * 60 * 1000));
        const recentlyAddedQuery = query(productsRef, where('createdAt', '>=', twentyFourHoursAgo));
        const recentlyAddedSnapshot = await getDocs(recentlyAddedQuery);
        const recentlyAdded = recentlyAddedSnapshot.size;

        // Fetch categories
        const categoriesRef = collection(db, 'categories');
        const categoriesSnapshot = await getDocs(categoriesRef);
        const categories = categoriesSnapshot.docs.map((doc: any) => doc.data().name as string);

        setData({
          totalProducts,
          lowStockItems,
          outOfStockItems,
          recentlyAdded,
          categories,
          totalStockQuantity, // Add new field
        });
      } catch (err: any) {
        console.error("Error fetching catalog data:", err);
        setError(err.message || "Failed to fetch catalog data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useCatalogData;
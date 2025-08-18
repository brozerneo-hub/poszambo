
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase.config';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import ProductTile from '../components/ProductTile';
import CatalogTile from '../components/CatalogTile';
import './ProductsPage.css';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  sku: string;
  vatRate: number;
  images: string[];
  isActive: boolean;
  createdAt?: any;
  updatedAt?: any;
  createdBy?: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rightPanelView, setRightPanelView] = useState<'list' | 'edit' | 'new'>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    description: '',
    sku: '',
    vatRate: 0,
    images: [],
    isActive: true,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const productsRef = collection(db, 'products');
      const snapshot = await getDocs(productsRef);
      const fetchedProducts: Product[] = snapshot.docs.map((doc: any) => ({
        ...(doc.data() as Product),
        id: doc.id,
      }));
      setProducts(fetchedProducts);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError(err.message || "Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (rightPanelView === 'edit' && selectedProduct) {
      setFormData(selectedProduct);
    } else if (rightPanelView === 'new') {
      setFormData({
        name: '', category: '', price: 0, stock: 0, description: '',
        sku: '', vatRate: 0, images: [], isActive: true,
      });
    }
  }, [rightPanelView, selectedProduct]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setRightPanelView('edit');
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setRightPanelView('new');
  };

  const handleCancel = () => {
    setRightPanelView('list');
    setSelectedProduct(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (rightPanelView === 'edit' && selectedProduct && selectedProduct.id) {
        const productRef = doc(db, 'products', selectedProduct.id);
        await updateDoc(productRef, formData);
      } else if (rightPanelView === 'new') {
        await addDoc(collection(db, 'products'), {
          ...formData,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'admin',
        });
      }
      await fetchProducts();
      setRightPanelView('list');
    } catch (err: any) {
      console.error("Error saving product:", err);
      setError(err.message || "Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderRightPanel = () => {
    switch (rightPanelView) {
      case 'list':
        return (
          <div>
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded bg-slate-700 text-text mb-4"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <ProductTile key={product.id} product={product} onClick={() => handleSelectProduct(product)} />
              ))}
            </div>
          </div>
        );
      case 'new':
      case 'edit':
        return (
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">{rightPanelView === 'new' ? 'Nouveau Produit' : 'Modifier le Produit'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Nom:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Catégorie:</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Prix:</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Stock:</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">SKU:</label>
                <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Taux TVA:</label>
                <input type="number" name="vatRate" value={formData.vatRate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline" step="0.01" />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex justify-end gap-4">
                <button type="button" onClick={handleCancel} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Annuler</button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>
                  {loading ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="products-page-grid">
      {/* Left Column */}
      <div className="left-panel">
        <h1 className="text-2xl font-bold mb-4">Catalogue</h1>
        <div className="space-y-4">
            <CatalogTile title="Tous les produits" icon="view-grid" onClick={() => setRightPanelView('list')} />
            <CatalogTile title="Nouveau Produit" icon="plus" onClick={handleAddNew} />
            <CatalogTile title="Vue Stock" icon="chart-bar" onClick={() => { /* Implement stock view */ }} />
            <CatalogTile title="Catégories" icon="tag" onClick={() => { /* Implement category filter */ }} />
        </div>
      </div>

      {/* Right Column */}
      <div className="right-panel">
        {loading && <p>Chargement...</p>}
        {!loading && renderRightPanel()}
      </div>
    </div>
  );
};

export default ProductsPage;

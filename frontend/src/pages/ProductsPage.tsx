import React, { useState, useMemo, useCallback } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Product, Category } from '../types/types';
import { ProductCard } from '../components/ProductCard';
import { ProductForm } from '../components/ProductForm';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import { useDebounce } from '../hooks/useDebounce';

export const ProductsPage: React.FC = () => {
  const { products, categories, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
      .filter(p => 
        p.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
  }, [products, selectedCategory, debouncedSearchQuery]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteRequest = (product: Product) => {
    setDeletingProduct(product);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingProduct) {
      deleteProduct(deletingProduct.id);
      setShowDeleteConfirm(false);
      setDeletingProduct(null);
    }
  };

  const handleSave = (productData: Partial<Product>) => {
    if (productData.id) {
      updateProduct(productData.id, productData);
    } else {
      addProduct(productData as Omit<Product, 'id'>);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleAddNew = () => {
    setEditingProduct({});
    setShowForm(true);
  };

  return (
    <div className="p-8 bg-bg text-text min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gold">Catalogue Produits</h1>
          <p className="text-slate-400">Gérez vos produits avec efficacité et élégance.</p>
        </div>
        <button onClick={handleAddNew} className="bg-gold text-black font-bold py-2 px-4 rounded hover:bg-yellow-600 transition-colors">
          Ajouter un produit
        </button>
      </header>

      <div className="mb-8 p-4 glass-effect rounded-lg flex items-center gap-4">
        <input
          type="text"
          placeholder="Rechercher par nom ou SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow p-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
        />
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <option value="All">Toutes les catégories</option>
          {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
        </select>
        <span className="text-slate-400">{filteredProducts.length} résultats</span>
      </div>

      {loading && <div className="text-center p-8">Chargement des produits...</div>}
      {error && <div className="text-center p-8 text-red-500">Erreur: {error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onEdit={handleEdit} onDelete={handleDeleteRequest} />
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40">
          <ProductForm 
            product={editingProduct} 
            categories={categories} 
            onSave={handleSave} 
            onCancel={() => setShowForm(false)} 
          />
        </div>
      )}

      <ConfirmationDialog 
        isOpen={showDeleteConfirm}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        title="Confirmer la suppression"
        message={`Êtes-vous sûr de vouloir supprimer le produit "${deletingProduct?.name}" ? Cette action est irréversible.`}
      />
    </div>
  );
};

export default ProductsPage;
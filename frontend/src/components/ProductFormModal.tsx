// frontend/src/components/ProductFormModal.tsx
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase.config';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  product?: any; // Optional product for editing
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, onSave, product }) => {
  const [formData, setFormData] = useState({
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        price: product.price || 0,
        stock: product.stock || 0,
        description: product.description || '',
        sku: product.sku || '',
        vatRate: product.vatRate || 0,
        images: product.images || [],
        isActive: product.isActive || true,
      });
    } else {
      setFormData({
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
    }
  }, [product]);

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
      if (product && product.id) {
        // Update existing product
        const productRef = doc(db, 'products', product.id);
        await updateDoc(productRef, formData);
      } else {
        // Add new product
        await addDoc(collection(db, 'products'), {
          ...formData,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'admin', // Mock user for now
        });
      }
      onSave();
      onClose();
    } catch (err: any) {
      console.error("Error saving product:", err);
      setError(err.message || "Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{product ? 'Modifier le Produit' : 'Nouveau Produit'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nom:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Catégorie:</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Prix:</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Stock:</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">SKU:</label>
            <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Taux TVA:</label>
            <input type="number" name="vatRate" value={formData.vatRate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" step="0.01" />
          </div>
          {/* Add images and isActive fields later */}

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Annuler</button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>
              {loading ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
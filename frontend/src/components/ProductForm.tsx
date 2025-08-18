
import React, { useState, useEffect } from 'react';
import { Product, Category } from '../types/types';

interface ProductFormProps {
  product: Partial<Product> | null;
  categories: Category[];
  onSave: (product: Partial<Product>) => void;
  onCancel: () => void;
}

const validateProduct = (product: Partial<Product>): string[] => {
  const errors: string[] = [];
  if (!product.name?.trim()) errors.push('Le nom est requis');
  if (!product.sku?.trim()) errors.push('Le SKU est requis');
  if (!product.category) errors.push('La catégorie est requise');
  if (!product.price || product.price <= 0) errors.push('Le prix doit être supérieur à 0');
  if (product.stock === undefined || product.stock < 0) errors.push('Le stock ne peut pas être négatif');
  return errors;
};

export const ProductForm: React.FC<ProductFormProps> = ({ product, categories, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Product>>(product || {});
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setFormData(product || {});
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateProduct(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(formData);
  };

  return (
    <div className="glass-effect p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-text">{product?.id ? 'Modifier le Produit' : 'Nouveau Produit'}</h2>
      <form onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <div className="bg-red-900/50 text-red-300 border border-red-500/50 rounded p-3 mb-4">
            <ul className="list-disc pl-5">
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-slate-300">Nom:</label>
            <input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-700 text-white leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-slate-300">Catégorie:</label>
            <select name="category" value={formData.category || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-700 text-white leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Sélectionner une catégorie</option>
              {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-slate-300">Prix:</label>
            <input type="number" name="price" value={formData.price || 0} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-700 text-white leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-slate-300">Stock:</label>
            <input type="number" name="stock" value={formData.stock || 0} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-700 text-white leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4 md:col-span-2">
            <label className="block text-sm font-bold mb-2 text-slate-300">Description:</label>
            <textarea name="description" value={formData.description || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-700 text-white leading-tight focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-slate-300">SKU:</label>
            <input type="text" name="sku" value={formData.sku || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-700 text-white leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-slate-300">Taux TVA:</label>
            <input type="number" name="vatRate" value={formData.vatRate || 0} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-700 text-white leading-tight focus:outline-none focus:shadow-outline" step="0.01" />
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button type="button" onClick={onCancel} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded">
            Annuler
          </button>
          <button type="submit" className="bg-gold hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded">
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
};

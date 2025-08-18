
import React from 'react';
import { Product } from '../types/types';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const getStockStatus = (stock: number) => {
  if (stock === 0) return { text: 'Rupture', color: 'text-red-400 bg-red-400/20 border-red-400/30' };
  if (stock < 10) return { text: 'Stock bas', color: 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30' };
  return { text: 'En stock', color: 'text-green-400 bg-green-400/20 border-green-400/30' };
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="glass-effect rounded-lg p-4 flex flex-col justify-between h-full group hover:border-gold transition-all duration-300">
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-text">{product.name}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.color}`}>
            {stockStatus.text}
          </span>
        </div>
        <p className="text-sm text-slate-400">{product.category}</p>
        <p className="text-2xl font-bold text-gold my-4">{product.price.toFixed(2)} €</p>
        <p className="text-sm text-slate-300 mb-4">{product.description}</p>
      </div>
      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={() => onEdit(product)} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded">
          Modifier
        </button>
        <button onClick={() => onDelete(product)} className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Supprimer
        </button>
      </div>
    </div>
  );
};

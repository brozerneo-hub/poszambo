import React, { useState, useMemo } from 'react';
import { Product } from '../types/types';

interface StockViewProps {
  products: Product[];
}

export const StockView: React.FC<StockViewProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const getStockStatusColor = (stock: number) => {
    if (stock === 0) return 'text-red-400';
    if (stock < 10) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gold">Gestion des Stocks</h1>
        <div className="flex gap-4">
          <button onClick={() => console.log('Ajout manuel de stock')} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded">
            Ajout manuel
          </button>
          <button onClick={() => console.log('Transfert entre magasin')} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded">
            Transfert
          </button>
        </div>
      </div>
      <div className="mb-8 p-4 glass-effect rounded-lg">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </div>
      <div className="glass-effect rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="p-4">Produit</th>
              <th className="p-4">SKU</th>
              <th className="p-4 text-right">Stock</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id} className="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
                <td className="p-4">{product.name}</td>
                <td className="p-4 text-slate-400">{product.sku}</td>
                <td className={`p-4 text-right font-bold ${getStockStatusColor(product.stock)}`}>
                  {product.stock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
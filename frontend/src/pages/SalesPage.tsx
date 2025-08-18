import React, { useState, useMemo } from 'react';
import { Card } from '../ui/components/Card';
import { Button } from '../ui/components/Button';
import { Icon } from '../ui/components/Icon';

// Types
interface Product {
  id: string;
  name: string;
  price: number;
  vatRate: number; // e.g., 0.20 for 20%
  stock: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

// Mock Data
const sampleProducts: Product[] = [
  { id: 'watch01', name: 'Chrono Aviateur', price: 1250, vatRate: 0.2, stock: 5, image: '/assets/watches/watch1.jpg' },
  { id: 'watch02', name: 'Élégance Marine', price: 980, vatRate: 0.2, stock: 8, image: '/assets/watches/watch2.jpg' },
  { id: 'perfume01', name: 'Nuit de Sable', price: 180, vatRate: 0.2, stock: 15, image: '/assets/perfumes/perfume1.jpg' },
  { id: 'jewelry01', name: 'Collier Stellaire', price: 750, vatRate: 0.2, stock: 10, image: '/assets/jewelry/jewelry1.jpg' },
  { id: 'watch03', name: 'Urban Explorer', price: 850, vatRate: 0.2, stock: 12, image: '/assets/watches/watch3.jpg' },
  { id: 'perfume02', name: 'Brise Florale', price: 120, vatRate: 0.2, stock: 25, image: '/assets/perfumes/perfume2.jpg' },
  { id: 'jewelry02', name: 'Bague Aurore', price: 450, vatRate: 0.2, stock: 18, image: '/assets/jewelry/jewelry2.jpg' },
  { id: 'watch04', name: 'Squelette Doré', price: 2800, vatRate: 0.2, stock: 3, image: '/assets/watches/watch4.jpg' },
];

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
};

// Product Card Component
const ProductCard: React.FC<{ product: Product; onAddToCart: () => void }> = ({ product, onAddToCart }) => (
  <Card className="flex flex-col overflow-hidden">
    <div className="relative h-48 w-full bg-slate/30">
      <img src={product.image} alt={product.name} className="h-full w-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'}/>
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="font-serif text-lg text-text flex-grow">{product.name}</h3>
      <div className="flex items-baseline justify-between mt-4">
        <p className="text-xl font-bold text-gold">{formatCurrency(product.price)}</p>
        <Button onClick={onAddToCart} className="px-3 py-1 text-xs">Ajouter</Button>
      </div>
    </div>
  </Card>
);

// Cart Panel Component
const CartPanel: React.FC<{
  cart: CartItem[];
  onInc: (id: string) => void;
  onDec: (id: string) => void;
  onRemove: (id: string) => void;
  totals: { ht: number; tva: number; ttc: number };
}> = ({ cart, onInc, onDec, onRemove, totals }) => (
  <Card className="p-4 flex flex-col h-full">
    <h2 className="font-serif text-2xl text-text mb-4">Panier</h2>
    {cart.length === 0 ? (
      <div className="flex-grow flex items-center justify-center">
        <p className="text-text/60">Votre panier est vide.</p>
      </div>
    ) : (
      <div className="flex-grow overflow-y-auto -mr-2 pr-2">
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-4 mb-3">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover bg-slate/30" onError={(e) => e.currentTarget.style.display = 'none'}/>
            <div className="flex-grow">
              <p className="text-text font-semibold">{item.name}</p>
              <p className="text-sm text-gold">{formatCurrency(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => onDec(item.id)} className="w-8 h-8 p-0"><Icon name="minus" className="w-4 h-4"/></Button>
              <span className="w-6 text-center">{item.quantity}</span>
              <Button variant="ghost" onClick={() => onInc(item.id)} className="w-8 h-8 p-0"><Icon name="plus" className="w-4 h-4"/></Button>
            </div>
            <Button variant="ghost" onClick={() => onRemove(item.id)} className="text-red-500 hover:bg-red-500/10"><Icon name="trash" className="w-5 h-5"/></Button>
          </div>
        ))}
      </div>
    )}
    <div className="border-t border-slate/60 pt-4 mt-4 space-y-2">
      <div className="flex justify-between text-text/80"><span>Total HT</span><span>{formatCurrency(totals.ht)}</span></div>
      <div className="flex justify-between text-text/80"><span>TVA</span><span>{formatCurrency(totals.tva)}</span></div>
      <div className="flex justify-between text-xl font-bold text-text"><span>Total TTC</span><span>{formatCurrency(totals.ttc)}</span></div>
      <Button disabled={cart.length === 0} className="w-full mt-4 text-lg py-3">Encaisser</Button>
    </div>
  </Card>
);


const SalesPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() =>
    sampleProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const computeTotals = useMemo(() => {
    const ht = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tva = cart.reduce((sum, item) => sum + item.price * item.quantity * item.vatRate, 0);
    const ttc = ht + tva;
    return { ht, tva, ttc };
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const incQty = (id: string) => {
    setCart(cart => cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decQty = (id: string) => {
    setCart(cart => {
      const existing = cart.find(item => item.id === id);
      if (existing && existing.quantity > 1) {
        return cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
      }
      return cart.filter(item => item.id !== id);
    });
  };

  const removeItem = (id: string) => {
    setCart(cart => cart.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-bg text-text p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Products */}
        <div className="col-span-12 md:col-span-8">
          <input
            type="search"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate/40 border border-slate/60 rounded-md px-4 py-2 mb-6 focus:ring-gold focus:border-gold"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={() => addToCart(p)} />
            ))}
          </div>
        </div>

        {/* Right Column: Cart */}
        <div className="col-span-12 md:col-span-4">
          <div className="sticky top-6">
             <CartPanel cart={cart} onInc={incQty} onDec={decQty} onRemove={removeItem} totals={computeTotals} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
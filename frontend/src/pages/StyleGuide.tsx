import React from 'react';
import { Button } from '../ui/components/Button';
import { Card } from '../ui/components/Card';
import { Icon } from '../ui/components/Icon';
import { Tile } from '../ui/components/Tile';

const StyleGuidePage: React.FC = () => {
  const mockProduct = { id: 'watch01', name: 'Chrono Aviateur', price: 1250, image: '/assets/watches/watch1.jpg' };
  const mockCart = [
    { id: 'watch01', name: 'Chrono Aviateur', price: 1250, quantity: 1 },
    { id: 'perfume01', name: 'Nuit de Sable', price: 180, quantity: 2 },
  ];

  return (
    <div className="min-h-screen bg-bg text-text p-8 space-y-12">
      <h1 className="font-serif text-4xl text-gold">Style Guide</h1>

      {/* Buttons */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <div className="flex gap-4 items-start">
          <Button>Primary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
          <Button variant="ghost" disabled>Disabled</Button>
        </div>
      </section>

      {/* Icons */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Icons</h2>
        <div className="flex gap-4 flex-wrap">
          <Icon name="sale" />
          <Icon name="clients" />
          <Icon name="inventory" />
          <Icon name="orders" />
          <Icon name="website" />
          <Icon name="catalog" />
          <Icon name="stats" />
          <Icon name="admin" />
        </div>
      </section>

      {/* Card */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Card</h2>
        <Card className="p-6 w-full max-w-sm">
          <h3 className="font-serif text-xl text-gold">Card Title</h3>
          <p className="text-text/80 mt-2">This is a standard card component with a blurred background and a subtle border.</p>
        </Card>
      </section>

      {/* Tiles */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Tiles</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
          <Tile icon="sale" title="Vente" subtitle="Encaisser" />
          <Tile icon="inventory" title="Inventaire" subtitle="Stock" badge={1} />
          <Tile icon="orders" title="Commandes" subtitle="Suivi" badge={3} />
          <Tile icon="clients" title="Clients" subtitle="Gestion" />
        </div>
      </section>

      {/* Product Card */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Product Card (Sales Page)</h2>
        <div className="w-64">
            <Card className="flex flex-col overflow-hidden">
                <div className="relative h-48 w-full bg-slate/30">
                    <img src={mockProduct.image} alt={mockProduct.name} className="h-full w-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'}/>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-serif text-lg text-text flex-grow">{mockProduct.name}</h3>
                    <div className="flex items-baseline justify-between mt-4">
                        <p className="text-xl font-bold text-gold">1 250,00 €</p>
                        <Button className="px-3 py-1 text-xs">Ajouter</Button>
                    </div>
                </div>
            </Card>
        </div>
      </section>

      {/* Cart Panel */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Cart Panel (Sales Page)</h2>
        <div className="max-w-md">
            <Card className="p-4 flex flex-col h-full">
                <h2 className="font-serif text-2xl text-text mb-4">Panier</h2>
                <div className="flex-grow">
                    {mockCart.map(item => (
                        <div key={item.id} className="flex items-center gap-4 mb-3">
                            <div className="w-16 h-16 rounded-md bg-slate/30" />
                            <div className="flex-grow">
                                <p className="text-text font-semibold">{item.name}</p>
                                <p className="text-sm text-gold">{item.price.toFixed(2)} €</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" className="w-8 h-8 p-0"><Icon name="minus" className="w-4 h-4"/></Button>
                                <span className="w-6 text-center">{item.quantity}</span>
                                <Button variant="ghost" className="w-8 h-8 p-0"><Icon name="plus" className="w-4 h-4"/></Button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-t border-slate/60 pt-4 mt-4 space-y-2">
                    <div className="flex justify-between text-text/80"><span>Total HT</span><span>1 525,00 €</span></div>
                    <div className="flex justify-between text-text/80"><span>TVA (20%)</span><span>305,00 €</span></div>
                    <div className="flex justify-between text-xl font-bold text-text"><span>Total TTC</span><span>1 830,00 €</span></div>
                    <Button className="w-full mt-4 text-lg py-3">Encaisser</Button>
                </div>
            </Card>
        </div>
      </section>
    </div>
  );
};

export default StyleGuidePage;

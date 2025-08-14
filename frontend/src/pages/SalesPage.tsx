import { useState } from "react";
import { Card } from "../ui/components/Card";

type Product = {
  id: string;
  name: string;
  price: number;
  vatRate: number;
  stock: number;
  image: string;
};

const sampleProducts: Product[] = [
  { id: "w1", name: "Montre Classique Or", price: 4990, vatRate: 0.2, stock: 8, image: "/assets/watches/watch-classic-gold.jpg" },
  { id: "p1", name: "Parfum Rose 100ml", price: 120, vatRate: 0.2, stock: 25, image: "/assets/perfumes/perfume-rose-100ml.jpg" },
  { id: "j1", name: "Bague Or & Diamant", price: 2990, vatRate: 0.2, stock: 3, image: "/assets/jewelry/ring-gold-diamond.jpg" },
];

export default function SalesPage() {
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [search, setSearch] = useState("");

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const totals = cart.reduce(
    (acc, { product, qty }) => {
      const lineHT = product.price * qty;
      const lineTVA = lineHT * product.vatRate;
      return {
        ht: acc.ht + lineHT,
        tva: acc.tva + lineTVA,
        ttc: acc.ttc + lineHT + lineTVA,
      };
    },
    { ht: 0, tva: 0, ttc: 0 }
  );

  return (
    <div className="min-h-screen bg-[var(--bg)] p-6 grid grid-cols-12 gap-6">
      {/* Colonne Produits */}
      <div className="col-span-8">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 bg-transparent border border-[var(--slate)] rounded-md px-3 py-2 focus:outline-none focus:border-[var(--gold)]"
        />
        <div className="grid grid-cols-3 gap-4">
          {sampleProducts
            .filter((p) =>
              p.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((p) => (
              <Card key={p.id}>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h3 className="text-sm font-semibold text-[var(--text)] text-center">{p.name}</h3>
                  <p className="text-[var(--gold)] font-bold">{p.price.toFixed(2)} €</p>
                  <button
                    onClick={() => addToCart(p)}
                    className="px-3 py-1 bg-[var(--gold)] text-black rounded-md text-sm hover:opacity-90"
                  >
                    Ajouter
                  </button>
                </div>
              </Card>
            ))}
        </div>
      </div>

      {/* Colonne Panier */}
      <div className="col-span-4">
        <Card>
          <h2 className="text-xl font-serif text-[var(--gold)] mb-4">Panier</h2>
          {cart.length === 0 ? (
            <p className="text-sm text-gray-400">Aucun article</p>
          ) : (
            <div className="flex flex-col gap-3">
              {cart.map(({ product, qty }) => (
                <div key={product.id} className="flex justify-between items-center text-sm">
                  <span>{product.name} x{qty}</span>
                  <div className="flex gap-2 items-center">
                    <span>{(product.price * qty).toFixed(2)} €</span>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-red-500 hover:underline"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              ))}
              <hr className="border-[var(--slate)]/50" />
              <div className="text-sm flex justify-between"><span>HT :</span> <span>{totals.ht.toFixed(2)} €</span></div>
              <div className="text-sm flex justify-between"><span>TVA :</span> <span>{totals.tva.toFixed(2)} €</span></div>
              <div className="text-lg font-bold flex justify-between text-[var(--gold)]"><span>TOTAL :</span> <span>{totals.ttc.toFixed(2)} €</span></div>
              <button className="mt-4 w-full bg-[var(--gold)] text-black rounded-md py-2 font-bold hover:opacity-90">
                Encaisser
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
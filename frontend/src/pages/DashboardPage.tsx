import { Card } from "../ui/components/Card";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <h1 className="text-3xl font-serif text-[var(--gold)] mb-6">Tableau de bord</h1>
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-2">Ventes du jour</h2>
          <p className="text-2xl font-bold">1 245 €</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold mb-2">Panier moyen</h2>
          <p className="text-2xl font-bold">83 €</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold mb-2">Top produits</h2>
          <ul className="text-sm list-disc list-inside">
            <li>Montre Classique Or</li>
            <li>Parfum Oud 50ml</li>
            <li>Bague Or & Diamant</li>
          </ul>
        </Card>
      </div>

      <div className="mt-8 flex gap-4">
        <Link to="/sales" className="px-4 py-2 bg-[var(--gold)] text-black rounded-md">Nouvelle vente</Link>
        <Link to="/products" className="px-4 py-2 border border-[var(--gold)] text-[var(--gold)] rounded-md">Produits</Link>
      </div>
    </div>
  );
}
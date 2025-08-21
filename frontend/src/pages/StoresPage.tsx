import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../types/types';
import { Button } from '../ui/components/Button';
import CatalogTile from '../components/CatalogTile';
import { Card } from '../ui/components/Card';

// StoreForm remains a simple component for creating/editing
interface StoreFormProps {
  store?: Partial<Store>;
  onSave: (store: Partial<Store>) => void;
  onCancel: () => void;
}

const StoreForm: React.FC<StoreFormProps> = ({ store = {}, onSave, onCancel }) => {
  const [name, setName] = useState(store.name || '');
  const [address, setAddress] = useState(store.address || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...store, name, address });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-slate-800 rounded-lg">
      <h2 className="text-xl font-bold text-gold">{store.id ? 'Modifier le magasin' : 'Créer un magasin'}</h2>
      <input
        type="text"
        placeholder="Nom du magasin"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-transparent border border-[var(--slate)] rounded-md px-3 py-2 focus:outline-none focus:border-[var(--gold)]"
        required
      />
      <input
        type="text"
        placeholder="Adresse du magasin"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="bg-transparent border border-[var(--slate)] rounded-md px-3 py-2 focus:outline-none focus:border-[var(--gold)]"
        required
      />
      <div className="flex justify-end gap-2">
        <Button type="button" onClick={onCancel} variant="secondary">Annuler</Button>
        <Button type="submit">Enregistrer</Button>
      </div>
    </form>
  );
};

// StoreList component to display stores
const StoreList: React.FC<{ onEdit: (store: Store) => void }> = ({ onEdit }) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStores = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/stores', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data: Store[] = await response.json();
      setStores(data);
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchStores(); }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">Erreur: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stores.map((store) => (
        <Card key={store.id}>
          <h2 className="text-xl font-semibold text-[var(--gold)]">{store.name}</h2>
          <p className="text-gray-400">{store.address}</p>
          <div className="flex gap-2 mt-4">
            <Button onClick={() => onEdit(store)} variant="secondary">Modifier</Button>
          </div>
        </Card>
      ))}
    </div>
  );
};


// Main StoresPage with the new two-column layout
const StoresPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<string | null>(null);
  const [editingStore, setEditingStore] = useState<Partial<Store> | null>(null);

  const handleSaveStore = async (storeData: Partial<Store>) => {
    const method = storeData.id ? 'PUT' : 'POST';
    const url = storeData.id ? `/api/stores/${storeData.id}` : '/api/stores';
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(storeData),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setActiveView('view_stores'); // Go back to the list after saving
    } catch (err: any) {
      alert(`Erreur: ${err.message}`);
    }
  };

  const handleEdit = (store: Store) => {
    setEditingStore(store);
    setActiveView('edit_store');
  };

  const renderRightPanel = () => {
    switch (activeView) {
      case 'view_stores':
        return <StoreList onEdit={handleEdit} />;
      case 'create_store':
        return <StoreForm onSave={handleSaveStore} onCancel={() => setActiveView(null)} />;
      case 'edit_store':
        return editingStore ? <StoreForm store={editingStore} onSave={handleSaveStore} onCancel={() => setActiveView('view_stores')} /> : <p>Sélectionnez un magasin à modifier.</p>;
      case 'import_export':
        return <p>Fonctionnalité d'export/import à venir.</p>;
      default:
        return <div className="flex items-center justify-center h-full"><p className="text-slate-400">Sélectionnez une option dans le menu de gauche.</p></div>;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '280px', padding: '1.5rem', borderRight: '1px solid #2A2B2E', background: '#1a1a1a' }}>
        <button onClick={() => navigate('/dashboard')} className="flex items-center text-sm text-slate-400 hover:text-gold transition-colors mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Accueil
        </button>
        <h1 className="text-2xl font-bold mb-6 text-white">Admin Magasin</h1>
        <div className="space-y-4">
          <CatalogTile title="Visualisation" icon="list" onClick={() => setActiveView('view_stores')} />
          <CatalogTile title="Création" icon="add" onClick={() => setActiveView('create_store')} />
          <CatalogTile title="Modification" icon="edit" onClick={() => setActiveView('view_stores')} />
          <CatalogTile title="Export/Import" icon="import_export" onClick={() => setActiveView('import_export')} />
        </div>
      </div>
      <div style={{ flexGrow: 1, padding: '2rem', overflowY: 'auto' }}>
        {renderRightPanel()}
      </div>
    </div>
  );
};

export default StoresPage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../types/types'; // Adjust path as needed
import { Card } from '../ui/components/Card';
import { Button } from '../ui/components/Button';
import { Modal } from '../ui/components/Modal';

interface StoreFormProps {
  store?: Store;
  onSave: (store: Omit<Store, 'id'>) => void;
  onCancel: () => void;
}

const StoreForm: React.FC<StoreFormProps> = ({ store, onSave, onCancel }) => {
  const [name, setName] = useState(store?.name || '');
  const [address, setAddress] = useState(store?.address || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, address, salesCount: store?.salesCount || 0, stockQuantity: store?.stockQuantity || 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

const StoresPage: React.FC = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStore, setCurrentStore] = useState<Store | undefined>(undefined);

  const fetchStores = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/stores', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Store[] = await response.json();
      setStores(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleAddStore = () => {
    setCurrentStore(undefined);
    setIsModalOpen(true);
  };

  const handleEditStore = (store: Store) => {
    setCurrentStore(store);
    setIsModalOpen(true);
  };

  const handleDeleteStore = async (storeId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce magasin ?')) {
      try {
        const response = await fetch(`/api/stores/${storeId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchStores(); // Refresh list
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const handleSaveStore = async (storeData: Omit<Store, 'id'>) => {
    try {
      const method = currentStore ? 'PUT' : 'POST';
      const url = currentStore ? `/api/stores/${currentStore.id}` : '/api/stores';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(storeData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setIsModalOpen(false);
      fetchStores(); // Refresh list
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center text-white">Chargement des magasins...</div>;
  if (error) return <div className="text-center text-red-500">Erreur: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Gestion des Magasins</h1>
      <Button onClick={handleAddStore} className="mb-4">Ajouter un Magasin</Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map((store) => (
          <Card key={store.id}>
            <h2 className="text-xl font-semibold text-[var(--gold)]">{store.name}</h2>
            <p className="text-gray-400">{store.address}</p>
            <p className="text-gray-300">Ventes: {store.salesCount}</p>
            <p className="text-gray-300">Stock: {store.stockQuantity}</p>
            <div className="flex gap-2 mt-4">
              <Button onClick={() => handleEditStore(store)} variant="secondary">Modifier</Button>
              <Button onClick={() => handleDeleteStore(store.id)} variant="danger">Supprimer</Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentStore ? 'Modifier le Magasin' : 'Ajouter un Magasin'}>
        <StoreForm
          store={currentStore}
          onSave={handleSaveStore}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default StoresPage;

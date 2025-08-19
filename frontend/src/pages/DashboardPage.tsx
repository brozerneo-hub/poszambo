import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderWelcome } from '../ui/components/HeaderWelcome';
import { Tile } from '../ui/components/Tile';
import './DashboardPage.css'; // Import the CSS file
import CatalogTile from '../components/CatalogTile';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const user = { name: 'Sébastien' }; // Mock user

  const handleLogout = () => {
    console.log('Logout');
    navigate('/login');
  };

  const tiles = [
    { icon: 'sale', title: 'Vente', subtitle: 'Encaisser un client', onClick: () => navigate('/sales'), badge: 0 },
    { icon: 'clients', title: 'Clients', subtitle: 'Gérer les fiches', onClick: () => navigate('/clients'), badge: 0 },
    { icon: 'inventory', title: 'Inventaire', subtitle: 'Consulter le stock', onClick: () => navigate('/inventory'), badge: 1 },
    { icon: 'orders', title: 'Commandes', subtitle: 'Suivre les livraisons', onClick: () => navigate('/orders'), badge: 3 },
    { icon: 'website', title: 'Site Web', subtitle: 'Gérer la boutique', onClick: () => navigate('/website'), badge: 0 },
    { icon: 'catalog', title: 'Catalogue', subtitle: 'Modifier les produits', onClick: () => navigate('/products'), badge: 0 },
    { icon: 'stats', title: 'Statistiques', subtitle: 'Analyser les ventes', onClick: () => navigate('/stats'), badge: 0 },
    { icon: 'admin', title: 'Admin Magasin', subtitle: 'Paramètres & Staff', onClick: () => navigate('/stores'), badge: 0 },
  ];

  return (
    <div className="min-h-screen bg-bg text-text p-4 sm:p-6 lg:p-8">
      <HeaderWelcome name={user.name} onLogout={handleLogout} />
      <main>
        <h2 className="text-center text-sm uppercase tracking-widest text-text/60 mb-8">
          QUE SOUHAITEZ-VOUS FAIRE ?
        </h2>
        <div className="dashboard-grid"> {/* Use the new CSS class */}
          {tiles.map((tile) => (
            tile.title === 'Catalogue' ? (
              <CatalogTile
                key={tile.title}
                title={tile.title}
                onClick={tile.onClick} // Pass onClick prop
                icon={tile.icon} // Pass icon prop
              />
            ) : (
              <Tile
                key={tile.title}
                icon={tile.icon as any}
                title={tile.title}
                subtitle={tile.subtitle}
                badge={tile.badge}
                onClick={tile.onClick}
              />
            )
          ))}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;

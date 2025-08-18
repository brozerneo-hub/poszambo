// frontend/src/components/CatalogTile.tsx
import React from 'react';
import { Icon } from '../ui/components/Icon'; // Import Icon component
import '../ui/components/Tile.css'; // Import Tile CSS

interface CatalogTileProps {
  title: string;
  onClick: () => void; // Add onClick prop
  icon: string; // Add icon prop
}

const CatalogTile: React.FC<CatalogTileProps> = ({ title, onClick, icon }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="tile-button"
    >
      <Icon name={icon as any} className="tile-icon" />
      <h3 className="tile-title">{title}</h3>
    </button>
  );
};

export default CatalogTile;

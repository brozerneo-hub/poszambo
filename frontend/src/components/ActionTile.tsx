// frontend/src/components/ActionTile.tsx
import React from 'react';
import '../ui/components/Tile.css'; // Reusing Tile CSS for basic styling

interface ActionTileProps {
  title: string;
  subtitle: string;
  onClick?: () => void;
  children?: React.ReactNode; // For embedding content like input
}

const ActionTile: React.FC<ActionTileProps> = ({ title, subtitle, onClick, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="tile-button" // Reusing the tile-button class
    >
      <h3 className="tile-title">{title}</h3>
      <p className="tile-subtitle">{subtitle}</p>
      {children}
    </button>
  );
};

export default ActionTile;
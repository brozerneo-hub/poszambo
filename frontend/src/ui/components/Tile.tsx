import React from 'react';
import { Icon } from './Icon';
import './Tile.css'; // Import the CSS file

type IconName = 'sale' | 'clients' | 'inventory' | 'orders' | 'website' | 'catalog' | 'stats' | 'admin';

interface TileProps {
  icon: IconName;
  title: string;
  subtitle?: string;
  badge?: number;
  onClick?: () => void;
}

export const Tile: React.FC<TileProps> = ({ icon, title, subtitle, badge, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="tile-button" // Use the new CSS class
    >
      {badge && badge > 0 && (
        <div className="tile-badge"> // Use the new CSS class
          {badge}
        </div>
      )}
      <Icon name={icon} className="tile-icon" /> // Use the new CSS class
      <h3 className="tile-title">{title}</h3> // Use the new CSS class
      {subtitle && <p className="tile-subtitle">{subtitle}</p>} // Use the new CSS class
    </button>
  );
};

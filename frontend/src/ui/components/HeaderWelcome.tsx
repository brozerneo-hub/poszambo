import React from 'react';

interface HeaderWelcomeProps {
  name: string;
  onLogout: () => void;
}

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const HeaderWelcome: React.FC<HeaderWelcomeProps> = ({ name, onLogout }) => {
  return (
    <header className="flex items-center justify-between p-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-teal-800 flex items-center justify-center text-xl font-bold text-white">
          {getInitials(name)}
        </div>
        <div>
          <p className="text-text/70">Bienvenue,</p>
          <h1 className="text-2xl font-bold text-text">{name}</h1>
        </div>
      </div>
      <button onClick={onLogout} className="text-sm text-blue-400 hover:underline">
        Se déconnecter
      </button>
    </header>
  );
};

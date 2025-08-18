import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`rounded-xl border border-slate/60 bg-black/40 backdrop-blur-sm shadow-lg ${
        className || ''
      }`}
    >
      {children}
    </div>
  );
};

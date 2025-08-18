import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg focus:ring-gold disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-gold text-bg hover:opacity-90',
    ghost: 'bg-transparent border border-slate text-text hover:bg-slate/40',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

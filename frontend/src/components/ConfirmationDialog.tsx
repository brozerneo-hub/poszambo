
import React from 'react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onConfirm, onCancel, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="glass-effect rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-xl font-bold text-text mb-4">{title}</h2>
        <p className="text-slate-300 mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button onClick={onCancel} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded">
            Annuler
          </button>
          <button onClick={onConfirm} className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const AuthButtons: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <li>
      <button onClick={handleLogout}>Logout</button>
    </li>
  );
};

export default AuthButtons;

import React, { useState } from 'react';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(''); // Clear previous messages

    try {
      const response = await AuthService.login(username, password);
      if (response.success) {
        setMessage(response.message);
        // In a real app, you'd store the token and user role here (e.g., in localStorage or context)
        // For now, just navigate to dashboard on success
        navigate('/dashboard');
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred during login.');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;

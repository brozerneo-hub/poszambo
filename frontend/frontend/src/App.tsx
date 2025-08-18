import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Removed useNavigate
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SalesPage from './pages/SalesPage';
// Removed AuthService import as it's now in AuthButtons
import AuthButtons from './components/AuthButtons'; // Import AuthButtons
import './App.css';

function App() {
  // Removed navigate and handleLogout

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/sales">Sales</Link>
            </li>
            <AuthButtons /> {/* Render AuthButtons component */}
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/" element={<LoginPage />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

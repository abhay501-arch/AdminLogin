import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoggedIn ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
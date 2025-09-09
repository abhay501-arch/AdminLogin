import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './pages/Dashboard';
import RoomsManagement from './pages/RoomsManagement';
import FoodManagement from './pages/FoodManagement';
import ReceiptDetails from './pages/ReceiptDetails';
import ManageUsers from './pages/ManageUsers';
import LaundryManagement from './pages/LaundryManagement';
import Complaints from './pages/Complaints';
import AdminProfile from './pages/AdminProfile';
import { Menu, X } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'rooms':
        return <RoomsManagement />;
      case 'food':
        return <FoodManagement />;
      case 'receipts':
        return <ReceiptDetails />;
      case 'users':
        return <ManageUsers />;
      case 'laundry':
        return <LaundryManagement />;
      case 'complaints':
        return <Complaints />;
      case 'profile':
        return <AdminProfile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-20 bg-white p-2 rounded-lg shadow-md"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative lg:translate-x-0 transition-transform duration-300 z-40
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onLogout={onLogout}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-0 pt-16 lg:pt-0">
        <main className="p-6 overflow-y-auto h-full">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
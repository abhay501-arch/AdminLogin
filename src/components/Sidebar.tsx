import React from 'react';
import {
  LayoutDashboard,
  Home,
  UtensilsCrossed,
  Receipt,
  Users,
  Shirt,
  MessageSquare,
  User,
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onLogout: () => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, onLogout, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'rooms', label: 'Rooms', icon: Home },
    { id: 'food', label: 'Food', icon: UtensilsCrossed },
    { id: 'receipts', label: 'Receipts', icon: Receipt },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'laundry', label: 'Laundry', icon: Shirt },
    { id: 'complaints', label: 'Complaints', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleItemClick = (pageId: string) => {
    setCurrentPage(pageId);
    onClose();
  };

  return (
    <div className="w-64 bg-white h-full shadow-lg">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">bedd.in Admin</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <nav className="mt-6 px-4">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`
                w-full flex items-center px-4 py-3 mt-2 text-left rounded-lg transition-colors
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }
              `}
            >
              <IconComponent className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
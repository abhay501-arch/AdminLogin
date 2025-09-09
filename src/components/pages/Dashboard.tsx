import React from 'react';
import { Users, Home, AlertCircle, Shirt, DollarSign, TrendingUp, UtensilsCrossed, Receipt } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Total Students', value: '156', icon: Users, color: 'bg-blue-500', change: '+12' },
    { title: 'Occupied Rooms', value: '52/60', icon: Home, color: 'bg-green-500', change: '+3' },
    { title: 'Pending Complaints', value: '8', icon: AlertCircle, color: 'bg-orange-500', change: '-2' },
    { title: 'Laundry Requests', value: '23', icon: Shirt, color: 'bg-purple-500', change: '+7' },
    { title: 'Payment Dues', value: '₹45,200', icon: DollarSign, color: 'bg-red-500', change: '-₹5,000' },
    { title: 'Monthly Revenue', value: '₹2,84,500', icon: TrendingUp, color: 'bg-indigo-500', change: '+₹15,000' },
  ];

  const recentActivities = [
    { action: 'New student registration', student: 'Rahul Kumar', time: '2 hours ago' },
    { action: 'Room allocation updated', student: 'Priya Sharma', time: '4 hours ago' },
    { action: 'Complaint resolved', student: 'Amit Singh', time: '6 hours ago' },
    { action: 'Payment received', student: 'Neha Patel', time: '8 hours ago' },
    { action: 'Laundry completed', student: 'Vikram Gupta', time: '10 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2 sm:mt-0">Welcome back, Admin!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} this month</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.student}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-center">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Add Student</span>
            </button>
            <button className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-center">
              <Home className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Allocate Room</span>
            </button>
            <button className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-center">
              <UtensilsCrossed className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Update Menu</span>
            </button>
            <button className="p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-center">
              <Receipt className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Generate Receipt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Occupancy Chart */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Room Occupancy Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">52</p>
            <p className="text-sm text-gray-600">Occupied Rooms</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">8</p>
            <p className="text-sm text-gray-600">Available Rooms</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">3</p>
            <p className="text-sm text-gray-600">Under Maintenance</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-600">87%</p>
            <p className="text-sm text-gray-600">Occupancy Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
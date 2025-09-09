import React, { useState } from 'react';
import { Search, Filter, Users, MapPin, Edit, Eye } from 'lucide-react';

const RoomsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const rooms = [
    {
      id: 'R101',
      capacity: 3,
      occupancy: 3,
      status: 'occupied',
      floor: 1,
      students: ['Rahul Kumar', 'Amit Singh', 'Vikram Gupta'],
      rent: 8000
    },
    {
      id: 'R102',
      capacity: 3,
      occupancy: 2,
      status: 'partial',
      floor: 1,
      students: ['Priya Sharma', 'Neha Patel', ''],
      rent: 8000
    },
    {
      id: 'R103',
      capacity: 3,
      occupancy: 0,
      status: 'available',
      floor: 1,
      students: ['', '', ''],
      rent: 8000
    },
    {
      id: 'R201',
      capacity: 3,
      occupancy: 3,
      status: 'occupied',
      floor: 2,
      students: ['Arjun Rao', 'Karan Malhotra', 'Suresh Nair'],
      rent: 8500
    },
    {
      id: 'R202',
      capacity: 3,
      occupancy: 1,
      status: 'partial',
      floor: 2,
      students: ['Deepika Verma', '', ''],
      rent: 8500
    },
    {
      id: 'R203',
      capacity: 3,
      occupancy: 0,
      status: 'maintenance',
      floor: 2,
      students: ['', '', ''],
      rent: 8500
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.students.some(student => student.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || room.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Rooms Management</h1>
        <button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Add New Room
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by room number or student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Rooms</option>
              <option value="occupied">Occupied</option>
              <option value="partial">Partially Occupied</option>
              <option value="available">Available</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900">{room.id}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                  {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Floor {room.floor}</span>
                  <span className="text-gray-600">₹{room.rent}/month</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {room.occupancy}/{room.capacity} students
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Students:</p>
                  {room.students.map((student, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      Bed {index + 1}: {student || 'Available'}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </button>
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <Edit className="w-4 h-4 mr-2" />
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Room Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">60</p>
            <p className="text-sm text-gray-600">Total Rooms</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">52</p>
            <p className="text-sm text-gray-600">Occupied</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">5</p>
            <p className="text-sm text-gray-600">Partial</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">8</p>
            <p className="text-sm text-gray-600">Available</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-600">3</p>
            <p className="text-sm text-gray-600">Maintenance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsManagement;
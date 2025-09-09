import React, { useState } from 'react';
import { Search, Filter, Clock, CheckCircle, User, Phone, MapPin, Calendar } from 'lucide-react';

const LaundryManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const laundryRequests = [
    {
      id: 'LAU001',
      student: 'Rahul Kumar',
      phone: '+91 9876543210',
      room: 'R101',
      clothes: ['3 Shirts', '2 Pants', '4 T-shirts'],
      date: '2024-01-15',
      status: 'pending',
      images: ['img1.jpg', 'img2.jpg'],
      pickupTime: '10:00 AM',
      notes: 'Please handle with care'
    },
    {
      id: 'LAU002',
      student: 'Priya Sharma',
      phone: '+91 9876543211',
      room: 'R102',
      clothes: ['2 Kurtas', '1 Jeans', '3 Tops'],
      date: '2024-01-14',
      status: 'completed',
      images: ['img3.jpg'],
      pickupTime: '2:00 PM',
      notes: 'Regular wash'
    },
    {
      id: 'LAU003',
      student: 'Amit Singh',
      phone: '+91 9876543212',
      room: 'R101',
      clothes: ['5 T-shirts', '3 Shorts', '2 Jeans'],
      date: '2024-01-16',
      status: 'in-progress',
      images: ['img4.jpg', 'img5.jpg'],
      pickupTime: '11:30 AM',
      notes: 'Stain removal needed'
    },
    {
      id: 'LAU004',
      student: 'Neha Patel',
      phone: '+91 9876543213',
      room: 'R102',
      clothes: ['2 Dresses', '3 Blouses', '1 Jacket'],
      date: '2024-01-13',
      status: 'completed',
      images: ['img6.jpg'],
      pickupTime: '9:00 AM',
      notes: 'Dry clean jacket'
    },
    {
      id: 'LAU005',
      student: 'Vikram Gupta',
      phone: '+91 9876543214',
      room: 'R101',
      clothes: ['4 Shirts', '2 Formal pants', '5 Undergarments'],
      date: '2024-01-17',
      status: 'pending',
      images: ['img7.jpg'],
      pickupTime: '3:00 PM',
      notes: 'Iron all clothes'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredRequests = laundryRequests.filter(request => {
    const matchesSearch = request.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleStatusUpdate = (requestId: string, newStatus: string) => {
    // In a real app, this would update the database
    console.log(`Updating request ${requestId} to status: ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Laundry Management</h1>
        <div className="mt-4 sm:mt-0 text-sm text-gray-600">
          Total Requests: {laundryRequests.length}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{laundryRequests.length}</p>
            </div>
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {laundryRequests.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {laundryRequests.filter(r => r.status === 'in-progress').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {laundryRequests.filter(r => r.status === 'completed').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by student name, room, or request ID..."
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
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Laundry Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{request.id}</h3>
                  <p className="text-sm text-gray-500">{request.date}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                  {getStatusIcon(request.status)}
                  <span className="ml-1">{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</span>
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  {request.student}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {request.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  Room {request.room}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Pickup: {request.pickupTime}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Clothes Details:</h4>
                <div className="flex flex-wrap gap-2">
                  {request.clothes.map((item, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {request.notes && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Notes:</h4>
                  <p className="text-sm text-gray-600">{request.notes}</p>
                </div>
              )}

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Images ({request.images.length}):</h4>
                <div className="flex space-x-2">
                  {request.images.map((image, index) => (
                    <div key={index} className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-500">IMG</span>
                    </div>
                  ))}
                </div>
              </div>

              {request.status !== 'completed' && (
                <div className="flex space-x-2">
                  {request.status === 'pending' && (
                    <button
                      onClick={() => handleStatusUpdate(request.id, 'in-progress')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      Start Processing
                    </button>
                  )}
                  {request.status === 'in-progress' && (
                    <button
                      onClick={() => handleStatusUpdate(request.id, 'completed')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      Mark Completed
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaundryManagement;
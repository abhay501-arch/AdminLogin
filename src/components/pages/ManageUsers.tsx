import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Eye, Trash2, User, Phone, MapPin } from 'lucide-react';

const ManageUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const students = [
    {
      id: 'STU001',
      name: 'Rahul Kumar',
      email: 'rahul.kumar@email.com',
      phone: '+91 9876543210',
      room: 'R101',
      course: 'B.Tech CSE',
      institute: 'IIT Delhi',
      joinDate: '2024-01-15',
      stayPeriod: '2 years',
      status: 'active',
      idProof: 'Aadhar Card',
      profilePic: null
    },
    {
      id: 'STU002',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 9876543211',
      room: 'R102',
      course: 'MBA',
      institute: 'IIM Bangalore',
      joinDate: '2024-01-10',
      stayPeriod: '1 year',
      status: 'active',
      idProof: 'Driving License',
      profilePic: null
    },
    {
      id: 'STU003',
      name: 'Amit Singh',
      email: 'amit.singh@email.com',
      phone: '+91 9876543212',
      room: 'R101',
      course: 'M.Tech',
      institute: 'NIT Warangal',
      joinDate: '2023-12-01',
      stayPeriod: '2 years',
      status: 'active',
      idProof: 'Passport',
      profilePic: null
    },
    {
      id: 'STU004',
      name: 'Neha Patel',
      email: 'neha.patel@email.com',
      phone: '+91 9876543213',
      room: 'R102',
      course: 'BBA',
      institute: 'Delhi University',
      joinDate: '2024-01-05',
      stayPeriod: '6 months',
      status: 'inactive',
      idProof: 'Aadhar Card',
      profilePic: null
    },
    {
      id: 'STU005',
      name: 'Vikram Gupta',
      email: 'vikram.gupta@email.com',
      phone: '+91 9876543214',
      room: 'R101',
      course: 'CA',
      institute: 'ICAI',
      joinDate: '2023-11-20',
      stayPeriod: '1 year',
      status: 'active',
      idProof: 'Voter ID',
      profilePic: null
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
        <div className="mt-4 sm:mt-0 text-sm text-gray-600">
          Total Students: {students.length}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{students.length}</p>
            </div>
            <User className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{students.filter(s => s.status === 'active').length}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-red-600">{students.filter(s => s.status === 'inactive').length}</p>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Plus className="w-4 h-4 text-blue-600" />
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
              placeholder="Search by name, email, room, or student ID..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-500">{student.id}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {student.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  Room {student.room}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Course:</strong> {student.course}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Institute:</strong> {student.institute}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Stay Period:</strong> {student.stayPeriod}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>ID Proof:</strong> {student.idProof}
                </div>
              </div>

              <div className="flex space-x-2 mt-6 pt-4 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </button>
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button className="px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
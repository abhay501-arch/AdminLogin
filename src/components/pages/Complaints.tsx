import React, { useState } from 'react';
import { Search, Filter, MessageSquare, Calendar, User, MapPin, CheckCircle, Clock } from 'lucide-react';

const Complaints: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const complaints = [
    {
      id: 'CMP001',
      student: 'Rahul Kumar',
      room: 'R101',
      title: 'AC not working properly',
      description: 'The air conditioning in my room has been making strange noises and not cooling effectively for the past 3 days.',
      category: 'Maintenance',
      date: '2024-01-15',
      status: 'unresolved',
      priority: 'high',
      assignedTo: null
    },
    {
      id: 'CMP002',
      student: 'Priya Sharma',
      room: 'R102',
      title: 'Wi-Fi connectivity issues',
      description: 'Internet connection keeps dropping frequently, especially during evening hours. Unable to attend online classes.',
      category: 'Technical',
      date: '2024-01-14',
      status: 'resolved',
      priority: 'medium',
      assignedTo: 'Tech Team'
    },
    {
      id: 'CMP003',
      student: 'Amit Singh',
      room: 'R101',
      title: 'Noise disturbance from adjacent room',
      description: 'Loud music and talking from the next room till late night. Affecting my sleep and study schedule.',
      category: 'Behavioral',
      date: '2024-01-16',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: 'Warden'
    },
    {
      id: 'CMP004',
      student: 'Neha Patel',
      room: 'R102',
      title: 'Water leakage in bathroom',
      description: 'There is continuous water leakage from the shower area. The floor remains wet all the time.',
      category: 'Maintenance',
      date: '2024-01-13',
      status: 'resolved',
      priority: 'high',
      assignedTo: 'Maintenance Team'
    },
    {
      id: 'CMP005',
      student: 'Vikram Gupta',
      room: 'R101',
      title: 'Food quality complaint',
      description: 'The quality of dinner served yesterday was poor. Found hair in the dal and vegetables were not fresh.',
      category: 'Food',
      date: '2024-01-17',
      status: 'unresolved',
      priority: 'low',
      assignedTo: null
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'unresolved':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'unresolved':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || complaint.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleStatusUpdate = (complaintId: string, newStatus: string) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === complaintId 
        ? { ...complaint, status: newStatus }
        : complaint
    ));
    console.log(`Updating complaint ${complaintId} to status: ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Complaints Management</h1>
        <div className="mt-4 sm:mt-0 text-sm text-gray-600">
          Total Complaints: {complaints.length}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Complaints</p>
              <p className="text-2xl font-bold text-gray-900">{complaints.length}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unresolved</p>
              <p className="text-2xl font-bold text-red-600">
                {complaints.filter(c => c.status === 'unresolved').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {complaints.filter(c => c.status === 'in-progress').length}
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
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-green-600">
                {complaints.filter(c => c.status === 'resolved').length}
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
              placeholder="Search by student name, room, title, or complaint ID..."
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
              <option value="unresolved">Unresolved</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.map((complaint) => (
          <div key={complaint.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                      {complaint.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{complaint.id}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                    {getStatusIcon(complaint.status)}
                    <span className="ml-1">{complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  {complaint.student}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  Room {complaint.room}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {complaint.date}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {complaint.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                  <span className="text-sm text-gray-600">
                    <strong>Category:</strong> {complaint.category}
                  </span>
                  {complaint.assignedTo && (
                    <span className="text-sm text-gray-600">
                      <strong>Assigned to:</strong> {complaint.assignedTo}
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  {complaint.status === 'unresolved' && (
                    <button
                      onClick={() => handleStatusUpdate(complaint.id, 'in-progress')}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm"
                    >
                      Start Working
                    </button>
                  )}
                  {complaint.status === 'in-progress' && (
                    <button
                      onClick={() => handleStatusUpdate(complaint.id, 'resolved')}
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm"
                    >
                      Mark Resolved
                    </button>
                  )}
                  {complaint.status === 'resolved' && (
                    <span className="text-sm text-green-600 font-medium">✓ Resolved</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complaints;
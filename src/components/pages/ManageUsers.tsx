import React, { useState } from 'react';
import { Search, Filter, Edit, Eye, Trash2, User, Phone, MapPin, X, Save, Mail, Calendar, Book, FileText, MessageSquare, Shirt } from 'lucide-react';

const ManageUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [editFormData, setEditFormData] = useState<any>({});

  const [students, setStudents] = useState([
    {
      id: 'STU001',
      name: 'Rahul Kumar',
      email: 'rahul.kumar@email.com',
      phone: '+91 9876543210',
      room: 'R101',
      course: 'B.Tech CSE',
      fatherName: 'Mr. Suresh Kumar',
      address: '123 Main Street, Delhi',
      dateOfBirth: '1999-05-15',
      college: 'IIT Delhi',
      receiptsUploaded: 3,
      complaintsMade: 1,
      laundryRequests: 5,
      bloodGroup: 'O+',
      emergencyContact: '+91 9876543211',
      institute: 'IIT Delhi',
      joinDate: '2024-01-15',
      stayPeriod: '2 years',
      status: 'active',
      idProof: 'Aadhar Card',
      profilePic: null,
      address: '123 Main Street, Delhi',
      emergencyContact: '+91 9876543211',
      parentName: 'Mr. Suresh Kumar'
    },
    {
      id: 'STU002',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 9876543211',
      room: 'R102',
      course: 'MBA',
      fatherName: 'Mr. Rajesh Sharma',
      address: '456 Park Avenue, Bangalore',
      dateOfBirth: '1998-08-22',
      college: 'IIM Bangalore',
      receiptsUploaded: 2,
      complaintsMade: 0,
      laundryRequests: 3,
      bloodGroup: 'A+',
      emergencyContact: '+91 9876543212',
      institute: 'IIM Bangalore',
      joinDate: '2024-01-10',
      stayPeriod: '1 year',
      status: 'active',
      idProof: 'Driving License',
      profilePic: null,
      address: '456 Park Avenue, Bangalore',
      emergencyContact: '+91 9876543212',
      parentName: 'Mr. Rajesh Sharma'
    },
    {
      id: 'STU003',
      name: 'Amit Singh',
      email: 'amit.singh@email.com',
      phone: '+91 9876543212',
      room: 'R101',
      course: 'M.Tech',
      fatherName: 'Mrs. Sunita Singh',
      address: '789 College Road, Warangal',
      dateOfBirth: '1997-12-10',
      college: 'NIT Warangal',
      receiptsUploaded: 4,
      complaintsMade: 2,
      laundryRequests: 7,
      bloodGroup: 'B+',
      emergencyContact: '+91 9876543213',
      institute: 'NIT Warangal',
      joinDate: '2023-12-01',
      stayPeriod: '2 years',
      status: 'active',
      idProof: 'Passport',
      profilePic: null,
      address: '789 College Road, Warangal',
      emergencyContact: '+91 9876543213',
      parentName: 'Mrs. Sunita Singh'
    },
    {
      id: 'STU004',
      name: 'Neha Patel',
      email: 'neha.patel@email.com',
      phone: '+91 9876543213',
      room: 'R102',
      course: 'BBA',
      fatherName: 'Mr. Kiran Patel',
      address: '321 University Lane, Delhi',
      dateOfBirth: '2000-03-18',
      college: 'Delhi University',
      receiptsUploaded: 1,
      complaintsMade: 0,
      laundryRequests: 2,
      bloodGroup: 'AB+',
      emergencyContact: '+91 9876543214',
      institute: 'Delhi University',
      joinDate: '2024-01-05',
      stayPeriod: '6 months',
      status: 'inactive',
      idProof: 'Aadhar Card',
      profilePic: null,
      address: '321 University Lane, Delhi',
      emergencyContact: '+91 9876543214',
      parentName: 'Mr. Kiran Patel'
    },
    {
      id: 'STU005',
      name: 'Vikram Gupta',
      email: 'vikram.gupta@email.com',
      phone: '+91 9876543214',
      room: 'R101',
      course: 'CA',
      fatherName: 'Mrs. Kavita Gupta',
      address: '654 Business District, Mumbai',
      dateOfBirth: '1999-11-25',
      college: 'ICAI',
      receiptsUploaded: 2,
      complaintsMade: 1,
      laundryRequests: 4,
      bloodGroup: 'O-',
      emergencyContact: '+91 9876543215',
      institute: 'ICAI',
      joinDate: '2023-11-20',
      stayPeriod: '1 year',
      status: 'active',
      idProof: 'Voter ID',
      profilePic: null,
      address: '654 Business District, Mumbai',
      emergencyContact: '+91 9876543215',
      parentName: 'Mrs. Kavita Gupta'
    },
  ]);

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

  const handleView = (student: any) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  const handleEdit = (student: any) => {
    setSelectedStudent(student);
    setEditFormData({ ...student });
    setShowEditModal(true);
  };

  const handleDelete = (student: any) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const handleSaveEdit = () => {
    setStudents(students.map(student => 
      student.id === selectedStudent.id ? editFormData : student
    ));
    setShowEditModal(false);
    setSelectedStudent(null);
    setEditFormData({});
  };

  const handleConfirmDelete = () => {
    setStudents(students.filter(student => student.id !== selectedStudent.id));
    setShowDeleteModal(false);
    setSelectedStudent(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
        <div className="mt-4 sm:mt-0 text-sm text-gray-600">
          Total Students: {students.length}
        </div>
      </div>

      {/* View Student Modal */}
      {showViewModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Student Profile</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedStudent.name}</h3>
                  <p className="text-gray-600">{selectedStudent.id}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(selectedStudent.status)}`}>
                    {selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Personal Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-gray-900">{selectedStudent.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Father's Name</label>
                      <p className="text-gray-900">{selectedStudent.fatherName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                      <p className="text-gray-900">{selectedStudent.dateOfBirth}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Blood Group</label>
                      <p className="text-gray-900">{selectedStudent.bloodGroup}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone</label>
                      <p className="text-gray-900">{selectedStudent.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Address</label>
                      <p className="text-gray-900">{selectedStudent.address}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
                      <p className="text-gray-900">{selectedStudent.emergencyContact}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Address</label>
                      <p className="text-gray-900">{selectedStudent.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Activity Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-lg font-bold text-blue-600">{selectedStudent.receiptsUploaded}</p>
                    <p className="text-sm text-gray-600">Receipts Uploaded</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <p className="text-lg font-bold text-orange-600">{selectedStudent.complaintsMade}</p>
                    <p className="text-sm text-gray-600">Complaints Made</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Shirt className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-lg font-bold text-purple-600">{selectedStudent.laundryRequests}</p>
                    <p className="text-sm text-gray-600">Laundry Requests</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Calendar className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-lg font-bold text-green-600">{selectedStudent.stayPeriod}</p>
                    <p className="text-sm text-gray-600">Stay Period</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Academic & Hostel Details</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Room Number</label>
                      <p className="text-gray-900">{selectedStudent.room}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">College/Institute</label>
                      <p className="text-gray-900">{selectedStudent.college}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Course</label>
                      <p className="text-gray-900">{selectedStudent.course}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Join Date</label>
                      <p className="text-gray-900">{selectedStudent.joinDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Stay Period</label>
                      <p className="text-gray-900">{selectedStudent.stayPeriod}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">ID Proof</label>
                      <p className="text-gray-900">{selectedStudent.idProof}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Edit Student Details</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={editFormData.name || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email (Read Only)</label>
                    <input
                      type="email"
                      value={editFormData.email || ''}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={editFormData.phone || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={editFormData.address || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                    <input
                      type="tel"
                      value={editFormData.emergencyContact || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, emergencyContact: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Parent/Guardian Name</label>
                    <input
                      type="text"
                      value={editFormData.parentName || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, parentName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Room Number</label>
                    <input
                      type="text"
                      value={editFormData.room || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, room: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                    <input
                      type="text"
                      value={editFormData.course || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, course: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Institute</label>
                    <input
                      type="text"
                      value={editFormData.institute || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, institute: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stay Period</label>
                    <input
                      type="text"
                      value={editFormData.stayPeriod || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, stayPeriod: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={editFormData.status || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Confirm Delete</h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">
                Are you sure you want to delete <strong>{selectedStudent.name}</strong> from the system? 
                This action cannot be undone.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleConfirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                <Trash2 className="w-4 h-4 inline mr-2" />
                Delete Student
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
              <User className="w-4 h-4 text-blue-600" />
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
                <button 
                  onClick={() => handleView(student)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </button>
                <button 
                  onClick={() => handleEdit(student)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(student)}
                  className="px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                >
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
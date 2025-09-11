import React, { useState } from 'react';
import { Search, Filter, Users, MapPin, Edit, Eye, Plus, X, Save, Phone, Mail, UserMinus, UserPlus } from 'lucide-react';

const RoomsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [showViewRoomModal, setShowViewRoomModal] = useState(false);
  const [showManageRoomModal, setShowManageRoomModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [newRoom, setNewRoom] = useState({
    roomNumber: '',
    sharingType: 'triple',
    capacity: 3,
    currentOccupancy: 0,
    status: 'available',
    floor: 1,
    rent: 8000
  });

  const [rooms, setRooms] = useState([
    {
      id: 'R101',
      capacity: 3,
      occupancy: 3,
      status: 'occupied',
      floor: 1,
      students: ['Rahul Kumar', 'Amit Singh', 'Vikram Gupta'],
      studentDetails: [
        { name: 'Rahul Kumar', id: 'STU001', email: 'rahul@email.com', phone: '+91 9876543210', bed: 1 },
        { name: 'Amit Singh', id: 'STU003', email: 'amit@email.com', phone: '+91 9876543212', bed: 2 },
        { name: 'Vikram Gupta', id: 'STU005', email: 'vikram@email.com', phone: '+91 9876543214', bed: 3 }
      ],
      rent: 8000,
      amenities: ['AC', 'Wi-Fi', 'Attached Bathroom', 'Study Table'],
      lastCleaned: '2024-01-15',
      maintenanceStatus: 'Good',
      electricityBill: 1200
    },
    {
      id: 'R102',
      capacity: 3,
      occupancy: 2,
      status: 'partial',
      floor: 1,
      students: ['Priya Sharma', 'Neha Patel', ''],
      studentDetails: [
        { name: 'Priya Sharma', id: 'STU002', email: 'priya@email.com', phone: '+91 9876543211', bed: 1 },
        { name: 'Neha Patel', id: 'STU004', email: 'neha@email.com', phone: '+91 9876543213', bed: 2 },
        { name: '', id: '', email: '', phone: '', bed: 3 }
      ],
      rent: 8000,
      amenities: ['AC', 'Wi-Fi', 'Attached Bathroom', 'Study Table'],
      lastCleaned: '2024-01-14',
      maintenanceStatus: 'Good',
      electricityBill: 1100
    },
    {
      id: 'R103',
      capacity: 3,
      occupancy: 0,
      status: 'available',
      floor: 1,
      students: ['', '', ''],
      studentDetails: [
        { name: '', id: '', email: '', phone: '', bed: 1 },
        { name: '', id: '', email: '', phone: '', bed: 2 },
        { name: '', id: '', email: '', phone: '', bed: 3 }
      ],
      rent: 8000,
      amenities: ['AC', 'Wi-Fi', 'Attached Bathroom', 'Study Table'],
      lastCleaned: '2024-01-13',
      maintenanceStatus: 'Needs Repair',
      electricityBill: 0
    },
    {
      id: 'R201',
      capacity: 3,
      occupancy: 3,
      status: 'occupied',
      floor: 2,
      students: ['Arjun Rao', 'Karan Malhotra', 'Suresh Nair'],
      studentDetails: [
        { name: 'Arjun Rao', id: 'STU006', email: 'arjun@email.com', phone: '+91 9876543215', bed: 1 },
        { name: 'Karan Malhotra', id: 'STU007', email: 'karan@email.com', phone: '+91 9876543216', bed: 2 },
        { name: 'Suresh Nair', id: 'STU008', email: 'suresh@email.com', phone: '+91 9876543217', bed: 3 }
      ],
      rent: 8500,
      amenities: ['AC', 'Wi-Fi', 'Attached Bathroom', 'Study Table', 'Balcony'],
      lastCleaned: '2024-01-16',
      maintenanceStatus: 'Excellent',
      electricityBill: 1350
    },
    {
      id: 'R202',
      capacity: 3,
      occupancy: 1,
      status: 'partial',
      floor: 2,
      students: ['Deepika Verma', '', ''],
      studentDetails: [
        { name: 'Deepika Verma', id: 'STU009', email: 'deepika@email.com', phone: '+91 9876543218', bed: 1 },
        { name: '', id: '', email: '', phone: '', bed: 2 },
        { name: '', id: '', email: '', phone: '', bed: 3 }
      ],
      rent: 8500,
      amenities: ['AC', 'Wi-Fi', 'Attached Bathroom', 'Study Table', 'Balcony'],
      lastCleaned: '2024-01-15',
      maintenanceStatus: 'Good',
      electricityBill: 950
    },
    {
      id: 'R203',
      capacity: 3,
      occupancy: 0,
      status: 'maintenance',
      floor: 2,
      students: ['', '', ''],
      studentDetails: [
        { name: '', id: '', email: '', phone: '', bed: 1 },
        { name: '', id: '', email: '', phone: '', bed: 2 },
        { name: '', id: '', email: '', phone: '', bed: 3 }
      ],
      rent: 8500,
      amenities: ['AC', 'Wi-Fi', 'Attached Bathroom', 'Study Table', 'Balcony'],
      lastCleaned: '2024-01-10',
      maintenanceStatus: 'Under Repair',
      electricityBill: 0
    },
  ]);

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

  const handleViewRoom = (room: any) => {
    setSelectedRoom(room);
    setShowViewRoomModal(true);
  };

  const handleManageRoom = (room: any) => {
    setSelectedRoom(room);
    setShowManageRoomModal(true);
  };

  const handleAddRoom = () => {
    // In a real app, this would save to database
    console.log('Adding new room:', newRoom);
    setShowAddRoomModal(false);
    setNewRoom({
      roomNumber: '',
      sharingType: 'triple',
      capacity: 3,
      currentOccupancy: 0,
      status: 'available',
      floor: 1,
      rent: 8000
    });
  };

  const handleSharingTypeChange = (type: string) => {
    const capacityMap: { [key: string]: number } = {
      single: 1,
      double: 2,
      triple: 3
    };
    setNewRoom({
      ...newRoom,
      sharingType: type,
      capacity: capacityMap[type] || 3
    });
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Rooms Management</h1>
        <button 
          onClick={() => setShowAddRoomModal(true)}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4 inline mr-2" />
          Add Room
        </button>
      </div>

      {/* View Room Modal */}
      {showViewRoomModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Room Details - {selectedRoom.id}</h2>
              <button
                onClick={() => setShowViewRoomModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Room Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Room Number</label>
                      <p className="text-gray-900">{selectedRoom.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Floor</label>
                      <p className="text-gray-900">{selectedRoom.floor}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Monthly Rent</label>
                      <p className="text-gray-900">₹{selectedRoom.rent.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Capacity</label>
                      <p className="text-gray-900">{selectedRoom.capacity} beds</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Current Occupancy</label>
                      <p className="text-gray-900">{selectedRoom.occupancy}/{selectedRoom.capacity}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRoom.status)}`}>
                        {selectedRoom.status.charAt(0).toUpperCase() + selectedRoom.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Maintenance & Amenities</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Maintenance Status</label>
                      <p className="text-gray-900">{selectedRoom.maintenanceStatus}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Last Cleaned</label>
                      <p className="text-gray-900">{selectedRoom.lastCleaned}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Monthly Electricity Bill</label>
                      <p className="text-gray-900">₹{selectedRoom.electricityBill}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Amenities</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedRoom.amenities.map((amenity: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Student Allocation</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedRoom.studentDetails.map((student: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Bed {student.bed}</h4>
                        {student.name ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Occupied</span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Available</span>
                        )}
                      </div>
                      {student.name ? (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-600">ID: {student.id}</p>
                          <p className="text-xs text-gray-600 flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {student.email}
                          </p>
                          <p className="text-xs text-gray-600 flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {student.phone}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No student assigned</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Room Modal */}
      {showManageRoomModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Manage Room - {selectedRoom.id}</h2>
              <button
                onClick={() => setShowManageRoomModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Room Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rent (₹)</label>
                      <input
                        type="number"
                        defaultValue={selectedRoom.rent}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
                      <input
                        type="number"
                        defaultValue={selectedRoom.floor}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        defaultValue={selectedRoom.status}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="available">Available</option>
                        <option value="occupied">Occupied</option>
                        <option value="partial">Partially Occupied</option>
                        <option value="maintenance">Under Maintenance</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Maintenance</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Status</label>
                      <select
                        defaultValue={selectedRoom.maintenanceStatus}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Needs Repair">Needs Repair</option>
                        <option value="Under Repair">Under Repair</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Cleaned</label>
                      <input
                        type="date"
                        defaultValue={selectedRoom.lastCleaned}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Student Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedRoom.studentDetails.map((student: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Bed {student.bed}</h4>
                        {student.name ? (
                          <button className="text-red-600 hover:text-red-800">
                            <UserMinus className="w-4 h-4" />
                          </button>
                        ) : (
                          <button className="text-green-600 hover:text-green-800">
                            <UserPlus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      {student.name ? (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-600">ID: {student.id}</p>
                          <button className="text-xs text-blue-600 hover:text-blue-800">
                            Reassign Bed
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">No student assigned</p>
                          <button className="text-xs text-blue-600 hover:text-blue-800">
                            Assign Student
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t">
                <button
                  onClick={() => setShowManageRoomModal(false)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={() => setShowManageRoomModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Room Modal */}
      {showAddRoomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Add New Room</h2>
              <button
                onClick={() => setShowAddRoomModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Number
                </label>
                <input
                  type="text"
                  value={newRoom.roomNumber}
                  onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., R301"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sharing Type
                </label>
                <select
                  value={newRoom.sharingType}
                  onChange={(e) => handleSharingTypeChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="single">Single Sharing</option>
                  <option value="double">Double Sharing</option>
                  <option value="triple">Triple Sharing</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Floor
                </label>
                <input
                  type="number"
                  value={newRoom.floor}
                  onChange={(e) => setNewRoom({ ...newRoom, floor: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Rent (₹)
                </label>
                <input
                  type="number"
                  value={newRoom.rent}
                  onChange={(e) => setNewRoom({ ...newRoom, rent: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={newRoom.status}
                  onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Under Maintenance</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleAddRoom}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                <Save className="w-4 h-4 inline mr-2" />
                Save Room
              </button>
              <button
                onClick={() => setShowAddRoomModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
                <button 
                  onClick={() => handleViewRoom(room)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </button>
                <button 
                  onClick={() => handleManageRoom(room)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
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
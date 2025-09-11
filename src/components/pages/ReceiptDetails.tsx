import React, { useState } from 'react';
import { Search, Filter, Download, Eye, DollarSign, Calendar, User, X, CheckCircle, XCircle, FileText, Phone, MapPin, CreditCard } from 'lucide-react';

const ReceiptDetails: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);

  const [receipts, setReceipts] = useState([
    {
      id: 'REC001',
      student: 'Rahul Kumar',
      studentId: 'STU001',
      email: 'rahul.kumar@email.com',
      phone: '+91 9876543210',
      room: 'R101',
      amount: 8000,
      type: 'Room Rent',
      status: 'pending',
      uploadDate: '2024-01-15',
      uploadTime: '10:30 AM',
      utrId: 'UTR123456789',
      receiptUrl: '#',
      receiptType: 'image'
    },
    {
      id: 'REC002',
      student: 'Priya Sharma',
      studentId: 'STU002',
      email: 'priya.sharma@email.com',
      phone: '+91 9876543211',
      room: 'R102',
      amount: 4500,
      type: 'Mess Fee',
      status: 'verified',
      uploadDate: '2024-01-14',
      uploadTime: '2:15 PM',
      utrId: 'UTR987654321',
      receiptUrl: '#',
      receiptType: 'pdf'
    },
    {
      id: 'REC003',
      student: 'Amit Singh',
      studentId: 'STU003',
      email: 'amit.singh@email.com',
      phone: '+91 9876543212',
      room: 'R101',
      amount: 500,
      type: 'Laundry',
      status: 'rejected',
      uploadDate: '2024-01-13',
      uploadTime: '4:45 PM',
      utrId: 'UTR456789123',
      receiptUrl: '#',
      receiptType: 'image'
    },
    {
      id: 'REC004',
      student: 'Neha Patel',
      studentId: 'STU004',
      email: 'neha.patel@email.com',
      phone: '+91 9876543213',
      room: 'R102',
      amount: 8000,
      type: 'Room Rent',
      status: 'pending',
      uploadDate: '2024-01-16',
      uploadTime: '11:20 AM',
      utrId: 'UTR789123456',
      receiptUrl: '#',
      receiptType: 'pdf'
    },
    {
      id: 'REC005',
      student: 'Vikram Gupta',
      studentId: 'STU005',
      email: 'vikram.gupta@email.com',
      phone: '+91 9876543214',
      room: 'R101',
      amount: 4500,
      type: 'Mess Fee',
      status: 'verified',
      uploadDate: '2024-01-12',
      uploadTime: '9:10 AM',
      utrId: 'UTR321654987',
      receiptUrl: '#',
      receiptType: 'image'
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = receipt.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.utrId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || receipt.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleVerifyReceipt = (receiptId: string) => {
    setReceipts(receipts.map(receipt => 
      receipt.id === receiptId 
        ? { ...receipt, status: 'verified' }
        : receipt
    ));
  };

  const handleRejectReceipt = (receiptId: string) => {
    setReceipts(receipts.map(receipt => 
      receipt.id === receiptId 
        ? { ...receipt, status: 'rejected' }
        : receipt
    ));
  };

  const handleViewReceipt = (receipt: any) => {
    setSelectedReceipt(receipt);
    setShowReceiptModal(true);
  };

  const handleViewDetails = (receipt: any) => {
    setSelectedReceipt(receipt);
    setShowDetailsModal(true);
  };

  const totalAmount = filteredReceipts.reduce((sum, receipt) => sum + receipt.amount, 0);
  const verifiedAmount = filteredReceipts.filter(r => r.status === 'verified').reduce((sum, receipt) => sum + receipt.amount, 0);
  const pendingAmount = filteredReceipts.filter(r => r.status === 'pending').reduce((sum, receipt) => sum + receipt.amount, 0);
  const rejectedAmount = filteredReceipts.filter(r => r.status === 'rejected').reduce((sum, receipt) => sum + receipt.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Receipt Verification</h1>
        <div className="mt-4 sm:mt-0 text-sm text-gray-600">
          Total Receipts: {receipts.length}
        </div>
      </div>

      {/* Receipt View Modal */}
      {showReceiptModal && selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Receipt Preview</h2>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{selectedReceipt.id}</h3>
                <p className="text-gray-600">Uploaded by: {selectedReceipt.student}</p>
              </div>
              
              {selectedReceipt.receiptType === 'image' ? (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Receipt Image Preview</p>
                  <p className="text-sm text-gray-500 mt-2">
                    In a real application, the actual receipt image would be displayed here
                  </p>
                </div>
              ) : (
                <div className="bg-red-50 rounded-lg p-8 text-center">
                  <FileText className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <p className="text-red-600">PDF Receipt</p>
                  <p className="text-sm text-gray-500 mt-2">
                    In a real application, the PDF would be embedded or downloadable here
                  </p>
                </div>
              )}
              
              <div className="flex space-x-3">
                <button
                  onClick={() => window.open(selectedReceipt.receiptUrl, '_blank')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  <Download className="w-4 h-4 inline mr-2" />
                  Download Receipt
                </button>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Details Modal */}
      {showDetailsModal && selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Receipt Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Student Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Name</label>
                      <p className="text-gray-900">{selectedReceipt.student}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Student ID</label>
                      <p className="text-gray-900">{selectedReceipt.studentId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-gray-900 flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedReceipt.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone</label>
                      <p className="text-gray-900 flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedReceipt.phone}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Room</label>
                      <p className="text-gray-900 flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedReceipt.room}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Payment Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Receipt ID</label>
                      <p className="text-gray-900">{selectedReceipt.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Amount</label>
                      <p className="text-gray-900 flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                        ₹{selectedReceipt.amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Payment Type</label>
                      <p className="text-gray-900">{selectedReceipt.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">UTR ID</label>
                      <p className="text-gray-900 flex items-center">
                        <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedReceipt.utrId}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Upload Date & Time</label>
                      <p className="text-gray-900 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {selectedReceipt.uploadDate} at {selectedReceipt.uploadTime}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Status</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedReceipt.status)}`}>
                        {selectedReceipt.status.charAt(0).toUpperCase() + selectedReceipt.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4 border-t">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalAmount.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-green-600">₹{verifiedAmount.toLocaleString()}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">₹{pendingAmount.toLocaleString()}</p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">₹{rejectedAmount.toLocaleString()}</p>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-4 h-4 text-red-600" />
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
              placeholder="Search by student name, room, receipt ID, or UTR ID..."
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
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Receipts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReceipts.map((receipt) => (
          <div key={receipt.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{receipt.id}</h3>
                  <p className="text-sm text-gray-500">{receipt.uploadDate} at {receipt.uploadTime}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(receipt.status)}`}>
                  {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  {receipt.student}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  Room {receipt.room}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  ₹{receipt.amount.toLocaleString()} - {receipt.type}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CreditCard className="w-4 h-4 mr-2" />
                  UTR: {receipt.utrId}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleViewReceipt(receipt)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </button>
                  <button 
                    onClick={() => handleViewDetails(receipt)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Details
                  </button>
                </div>
                
                {receipt.status === 'pending' && (
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleVerifyReceipt(receipt.id)}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verify
                    </button>
                    <button 
                      onClick={() => handleRejectReceipt(receipt.id)}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </button>
                  </div>
                )}
                
                {receipt.status === 'rejected' && (
                  <button 
                    onClick={() => handleRejectReceipt(receipt.id)}
                    className="w-full flex items-center justify-center px-3 py-2 bg-red-50 text-red-700 rounded-lg"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Rejected
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceiptDetails;
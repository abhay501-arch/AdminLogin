import React, { useState } from 'react';
import { User, Mail, Lock, Edit, Save, X } from 'lucide-react';

const AdminProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@bedd.in',
    phone: '+91 9876543210',
    role: 'Super Admin',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-17 10:30 AM'
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileSave = () => {
    // In a real app, this would update the database
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    // In a real app, this would update the password
    setIsChangingPassword(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Password changed successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Edit className="w-4 h-4 inline mr-2" />
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
              <p className="text-gray-600">{profile.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{profile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  {profile.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{profile.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <p className="text-gray-900">{profile.role}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Join Date
              </label>
              <p className="text-gray-900">{profile.joinDate}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Login
              </label>
              <p className="text-gray-900">{profile.lastLogin}</p>
            </div>

            {isEditing && (
              <div className="flex space-x-2 pt-4">
                <button
                  onClick={handleProfileSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <X className="w-4 h-4 inline mr-2" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
            <button
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Lock className="w-4 h-4 inline mr-2" />
              Change Password
            </button>
          </div>

          {isChangingPassword ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="flex space-x-2 pt-4">
                <button
                  onClick={handlePasswordChange}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Update Password
                </button>
                <button
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <X className="w-4 h-4 inline mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="text-sm font-medium text-green-800 mb-2">Password Security</h4>
                <p className="text-sm text-green-700">Your password was last changed on January 1, 2024</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Security Recommendations:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Use a strong password with at least 8 characters</li>
                  <li>• Include uppercase, lowercase, numbers, and symbols</li>
                  <li>• Change your password regularly</li>
                  <li>• Don't share your password with anyone</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Updated room allocation for student Rahul Kumar', time: '2 hours ago' },
            { action: 'Resolved complaint CMP001', time: '4 hours ago' },
            { action: 'Added new student Priya Sharma', time: '1 day ago' },
            { action: 'Updated food menu for Monday', time: '2 days ago' },
            { action: 'Generated monthly receipt report', time: '3 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">{activity.action}</span>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
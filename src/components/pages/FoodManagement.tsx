import React, { useState } from 'react';
import { Edit, Save, X } from 'lucide-react';

const FoodManagement: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showEntries, setShowEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const [weeklyMenu, setWeeklyMenu] = useState([
    {
      sno: 1,
      day: 'Sunday',
      breakfast: 'ALOO KA PARATHA',
      lunch: 'VEG BIRYANI / TEHRI + RAITA + ACHAR + SALAD',
      dinner: 'MATAR PANEER / CHOLA + PURI + RICE + SWEET + ACHAR + SALAD'
    },
    {
      sno: 2,
      day: 'Monday',
      breakfast: 'FRIED+RICE+CHAI',
      lunch: 'DAL+RICE+ROTI+DRY SEASONAL SABJI',
      dinner: 'RICE+ROTI+ALOO MATAR SABJI'
    },
    {
      sno: 3,
      day: 'Tuesday',
      breakfast: 'HALWA+CHANA+CHAI',
      lunch: 'DAL+RICE+ROTI+SEASONAL DRY SABJI',
      dinner: 'RICE+ROTI+RAAJMA'
    },
    {
      sno: 4,
      day: 'Wednesday',
      breakfast: 'POORI+SABJI+CHAI',
      lunch: 'DAL+RICE+ROTI+SEASONAL DRY SABJI',
      dinner: 'RICE+ROTI+SOYABEAN SABJI'
    },
    {
      sno: 5,
      day: 'Thursday',
      breakfast: 'SANDWITCH-2+CHAI',
      lunch: 'KADHI+RICE+ROTI',
      dinner: 'RICE+ROTI+DAL+MIXEDVEG SABJI'
    },
    {
      sno: 6,
      day: 'Friday',
      breakfast: 'POHA NAMKEEN+CHAI',
      lunch: 'DAL+RICE+ROTI+SEASONAL DRY SABJI',
      dinner: 'RICE+ROTI+SAFED MATAR SABJI'
    },
    {
      sno: 7,
      day: 'Saturday',
      breakfast: 'CHAWMEIN+CHAI',
      lunch: 'DAL+RICE+ROTI+SEASONAL DRY SABJI',
      dinner: 'ROTI+RICE+GRAVY KOFTA'
    }
  ]);

  const handleSaveChanges = () => {
    // In a real app, this would save to database and update student dashboards
    setIsEditing(false);
    console.log('Menu updated:', weeklyMenu);
    // Simulate API call to update student dashboards
    alert('Menu updated successfully! Changes will reflect in student dashboards.');
  };

  const handleMenuChange = (index: number, field: string, value: string) => {
    const updatedMenu = [...weeklyMenu];
    updatedMenu[index] = { ...updatedMenu[index], [field]: value };
    setWeeklyMenu(updatedMenu);
  };

  const filteredMenu = weeklyMenu.filter(item => 
    item.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.breakfast.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.lunch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.dinner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedMenu = filteredMenu.slice(0, showEntries);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Food Menu</h1>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveChanges}
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
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Edit className="w-4 h-4 inline mr-2" />
              Edit Menu
            </button>
          )}
        </div>
      </div>

      {/* Food Menu Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="bg-gray-100 px-4 py-2 rounded-lg mb-4">
            <h2 className="text-lg font-medium text-gray-700">ALL FOODS DETAILS</h2>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Show</span>
              <select
                value={showEntries}
                onChange={(e) => setShowEntries(Number(e.target.value))}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-gray-600">entries</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Search:</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search menu..."
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  Sno. ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  Day ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  (Breakfast 08 To 09 AM) ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  (Lunch 12 TO 02 PM) ↕
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  (Dinner 08 TO 09 PM) ↕
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedMenu.map((item, index) => (
                <tr key={item.sno} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {item.sno}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {item.day}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-200">
                    {isEditing ? (
                      <textarea
                        value={item.breakfast}
                        onChange={(e) => handleMenuChange(index, 'breakfast', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={2}
                      />
                    ) : (
                      <div className="max-w-xs">{item.breakfast}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-r border-gray-200">
                    {isEditing ? (
                      <textarea
                        value={item.lunch}
                        onChange={(e) => handleMenuChange(index, 'lunch', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={2}
                      />
                    ) : (
                      <div className="max-w-xs">{item.lunch}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {isEditing ? (
                      <textarea
                        value={item.dinner}
                        onChange={(e) => handleMenuChange(index, 'dinner', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={2}
                      />
                    ) : (
                      <div className="max-w-xs">{item.dinner}</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing 1 to {Math.min(showEntries, filteredMenu.length)} of {filteredMenu.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 text-sm text-white bg-blue-600 border border-blue-600 rounded">
                1
              </button>
              <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Statistics */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Menu Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">21</p>
            <p className="text-sm text-gray-600">Total Meals/Week</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">156</p>
            <p className="text-sm text-gray-600">Students Enrolled</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">4.2</p>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">₹4,500</p>
            <p className="text-sm text-gray-600">Monthly Cost/Student</p>
          </div>
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedback</h2>
        <div className="space-y-3">
          {[
            { student: 'Rahul Kumar', feedback: 'Great biryani on Sunday!', rating: 5, time: '2 days ago' },
            { student: 'Priya Sharma', feedback: 'Would like more variety in breakfast', rating: 3, time: '3 days ago' },
            { student: 'Amit Singh', feedback: 'Dal quality has improved significantly', rating: 4, time: '5 days ago' },
          ].map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{item.student}</span>
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(item.rating)}{'☆'.repeat(5-item.rating)}
                  </div>
                  <span className="text-sm text-gray-500">{item.time}</span>
                </div>
              </div>
              <p className="text-gray-700">{item.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodManagement;
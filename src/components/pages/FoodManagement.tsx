import React, { useState } from 'react';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';

const FoodManagement: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [isEditing, setIsEditing] = useState(false);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const weeklyMenu = {
    Monday: {
      breakfast: ['Poha', 'Tea/Coffee', 'Banana'],
      lunch: ['Rice', 'Dal', 'Mixed Vegetables', 'Chapati', 'Pickle'],
      dinner: ['Jeera Rice', 'Rajma', 'Aloo Gobi', 'Chapati', 'Curd']
    },
    Tuesday: {
      breakfast: ['Upma', 'Tea/Coffee', 'Boiled Egg'],
      lunch: ['Rice', 'Sambar', 'Cabbage Curry', 'Chapati', 'Papad'],
      dinner: ['Fried Rice', 'Paneer Curry', 'Dal', 'Chapati', 'Salad']
    },
    Wednesday: {
      breakfast: ['Paratha', 'Curd', 'Tea/Coffee', 'Apple'],
      lunch: ['Rice', 'Rasam', 'Bhindi', 'Chapati', 'Pickle'],
      dinner: ['Plain Rice', 'Chicken Curry', 'Dal', 'Chapati', 'Onion']
    },
    Thursday: {
      breakfast: ['Idli/Dosa', 'Sambar', 'Chutney', 'Tea/Coffee'],
      lunch: ['Rice', 'Dal', 'Cauliflower', 'Chapati', 'Buttermilk'],
      dinner: ['Biryani', 'Raita', 'Pickle', 'Boiled Egg']
    },
    Friday: {
      breakfast: ['Sandwich', 'Tea/Coffee', 'Orange'],
      lunch: ['Rice', 'Fish Curry', 'Beans', 'Chapati', 'Dal'],
      dinner: ['Rice', 'Mixed Dal', 'Palak Paneer', 'Chapati', 'Curd']
    },
    Saturday: {
      breakfast: ['Puri Bhaji', 'Tea/Coffee', 'Banana'],
      lunch: ['Rice', 'Chole', 'Aloo Jeera', 'Chapati', 'Pickle'],
      dinner: ['Pulao', 'Paneer Butter Masala', 'Dal', 'Naan', 'Salad']
    },
    Sunday: {
      breakfast: ['Chole Bhature', 'Tea/Coffee', 'Lassi'],
      lunch: ['Rice', 'Mutton Curry', 'Mixed Vegetables', 'Chapati', 'Papad'],
      dinner: ['Rice', 'Dal Makhani', 'Aloo Matar', 'Chapati', 'Ice Cream']
    }
  };

  const currentDayMenu = weeklyMenu[selectedDay as keyof typeof weeklyMenu];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Food Management</h1>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Edit className="w-4 h-4 inline mr-2" />
            {isEditing ? 'Save Changes' : 'Edit Menu'}
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus className="w-4 h-4 inline mr-2" />
            Add Special Menu
          </button>
        </div>
      </div>

      {/* Day Selector */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900">Weekly Menu</h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`p-3 text-center rounded-lg transition-colors ${
                selectedDay === day
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="font-medium text-sm">{day}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Menu for Selected Day */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['breakfast', 'lunch', 'dinner'].map((meal) => (
          <div key={meal} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 capitalize">{meal}</h3>
              <div className="text-sm text-gray-500">{selectedDay}</div>
            </div>
            
            <div className="space-y-3">
              {currentDayMenu[meal as keyof typeof currentDayMenu].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  {isEditing ? (
                    <input
                      type="text"
                      value={item}
                      className="flex-1 bg-white border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <span className="text-gray-700">{item}</span>
                  )}
                  {isEditing && (
                    <button className="ml-2 text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              
              {isEditing && (
                <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Item
                </button>
              )}
            </div>
          </div>
        ))}
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
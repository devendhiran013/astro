import React, { useState } from 'react';
import { 
  Search,
  Mail,
  Bell,
  Download,
  ChevronDown
} from 'lucide-react';

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('12 Months');

  const statsCards = [
    { title: 'TOTAL SALE', value: '₹12,426', change: '+36%', changeType: 'positive' },
    { title: 'TOTAL REQUEST', value: '235', change: '+14%', changeType: 'positive' },
    { title: 'TOTAL ORDERS', value: '382', change: '+36%', changeType: 'positive' },
    { title: 'TOTAL USERS', value: '493', change: '+36%', changeType: 'positive' }
  ];

  const insightsData = [
    { label: 'Total Sales', value: '1,43,382', width: 'w-full' },
    { label: 'Total Request', value: '87,974', width: 'w-3/4' },
    { label: 'Total Orders', value: '45,211', width: 'w-1/2' },
    { label: 'Total customers', value: '21,893', width: 'w-1/4' }
  ];

  const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="w-full">
        {/* Header */}
        <div className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Type to search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Mail className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </div>
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-sm text-gray-500 mb-2">{stat.title}</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-green-500 text-sm font-medium">{stat.change} ↑</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales Report */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Sales Report</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    {['12 Months', '6 Months', '30 Days', '7 Days'].map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-3 py-1 text-sm rounded-md ${
                          selectedPeriod === period
                            ? 'bg-white shadow-sm text-gray-900'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                  <button className="flex items-center space-x-1 px-3 py-1 border rounded-lg text-sm">
                    <Download className="w-4 h-4" />
                    <span>Export PDF</span>
                  </button>
                </div>
              </div>
              
              {/* Chart Area */}
              <div className="h-64 relative">
                <div className="absolute top-4 left-4 text-sm text-gray-500">
                  <div>June 2024</div>
                  <div className="text-lg font-semibold text-gray-900">₹48,491</div>
                </div>
                <svg className="w-full h-full">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 50 150 Q 150 140 250 130 T 450 120 T 650 110"
                    stroke="#ef4444"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M 50 180 Q 150 170 250 160 T 450 150 T 650 140 L 650 200 L 50 200 Z"
                    fill="url(#gradient)"
                  />
                </svg>
                <div className="absolute bottom-4 left-0 right-0 flex justify-between text-xs text-gray-500 px-4">
                  {months.map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Insights</h3>
                <button className="flex items-center space-x-1 text-sm text-gray-600">
                  <span>Last 30 Days</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                {insightsData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`bg-red-500 h-2 rounded-full ${item.width}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Product Sales Report */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Product Sales Report</h4>
                <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs text-gray-600">i</span>
                </div>
              </div>
              <div className="text-2xl font-bold mb-2">₹12,426</div>
              <div className="text-sm text-gray-500 mb-4">Insights</div>
              
              {/* Donut Chart */}
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="16" />
                    <circle cx="64" cy="64" r="56" fill="none" stroke="#8b5cf6" strokeWidth="16" 
                            strokeDasharray="70 280" strokeDashoffset="0" />
                    <circle cx="64" cy="64" r="56" fill="none" stroke="#06b6d4" strokeWidth="16" 
                            strokeDasharray="50 280" strokeDashoffset="-70" />
                    <circle cx="64" cy="64" r="56" fill="none" stroke="#f59e0b" strokeWidth="16" 
                            strokeDasharray="40 280" strokeDashoffset="-120" />
                    <circle cx="64" cy="64" r="56" fill="none" stroke="#10b981" strokeWidth="16" 
                            strokeDasharray="35 280" strokeDashoffset="-160" />
                    <circle cx="64" cy="64" r="56" fill="none" stroke="#ef4444" strokeWidth="16" 
                            strokeDasharray="30 280" strokeDashoffset="-195" />
                    <circle cx="64" cy="64" r="56" fill="none" stroke="#f97316" strokeWidth="16" 
                            strokeDasharray="25 280" strokeDashoffset="-225" />
                  </svg>
                </div>
              </div>
              
              {/* Legend */}
              <div className="space-y-2 text-xs">
                {['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5', 'Product 6'].map((product, index) => {
                  const colors = ['bg-purple-500', 'bg-cyan-500', 'bg-yellow-500', 'bg-green-500', 'bg-red-500', 'bg-orange-500'];
                  return (
                    <div key={index} className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${colors[index]}`}></div>
                      <span className="text-gray-600">{product}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Users Report */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                    <circle cx="48" cy="48" r="40" fill="none" stroke="#f97316" strokeWidth="8" 
                            strokeDasharray="100 251" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">40%</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-2">Active users</div>
                <div className="text-sm font-medium">Active users report</div>
              </div>
            </div>

            {/* Repeated Users Report */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                    <circle cx="48" cy="48" r="40" fill="none" stroke="#8b5cf6" strokeWidth="8" 
                            strokeDasharray="50 251" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">20%</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-2">Repeated users</div>
                <div className="text-sm font-medium">Repeated users report</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
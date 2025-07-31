import React, { useState } from 'react';
import {
  Users,
  Package,
  ShoppingCart,
  FileText,
  Settings,
  LogOut,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Mail,
  Bell,
  Menu
} from 'lucide-react';
import EditUserForm from './EditUser';

export default function UserManagementPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: 'Mathi', phone: '9080585649', date: '10-04-2000', status: 'Gobi', email: 'mathi@gmail.com' },
    { id: 2, name: 'Partha', phone: '9080585649', date: '20-07-2011', status: 'Gobi', email: 'partha@gmail.com' },
    { id: 3, name: 'Aravindh', phone: '9080585649', date: '18-02-2005', status: 'Gobi', email: 'aravindh@gmail.com' },
    { id: 4, name: 'Mathi', phone: '9080585649', date: '10-04-2000', status: 'Gobi', email: 'mathi@gmail.com' },
  ];

  const sidebarItems = [
    { icon: Users, label: 'Dashboard', active: false },
    { icon: Users, label: 'User Management', active: true },
    { icon: Package, label: 'Product Management', active: false },
    { icon: ShoppingCart, label: 'Order Management', active: false },
    { icon: FileText, label: 'Requisition', active: false },
  ];

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="flex-1 flex flex-col">
        <div className=" p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  placeholder="Type to search"
                  className="w-[72em] pl-10 py-2 border border-gray-200 rounded-md text-sm"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-6 h-6  rounded"><Mail className="w-6 h-6 text-gray-600" /></div>
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
              </div>
              <div className="relative">
                <div className="w-6 h-6  rounded"><Bell className="w-6 h-6 text-gray-600" /></div>
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">•</span>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 p-4 lg:p-6">
          <div className="p-4 mb-6 rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-1 max-w-xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    placeholder="Search by card, account number..."
                    className="w-full pl-10 py-2 border border-gray-200 rounded-md text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="bg-white flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center space-x-2 bg-transparent px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download PDF Report</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <div className={`bg-white rounded-lg shadow-sm ${selectedUser ? 'w-[600px]' : 'w-[869px]'}`}>
              <div className="p-4 lg:p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Recent Customers</h2>
                <p className="text-sm text-gray-500 mt-1">User Data</p>
              </div>
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                              <Users className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.date}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-900">{user.phone}</td>
                        <td className="px-6 py-4 text-gray-500">{user.status}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button onClick={() => setSelectedUser(user)} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {selectedUser && (
              <EditUserForm user={selectedUser} onClose={() => setSelectedUser(null)} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

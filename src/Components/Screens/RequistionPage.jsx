import React, { useState } from 'react';
import {
    Search,
    Filter,
    Download,
    Mail,
    Bell,
    BarChart3,
    Users,
    Package,
    ShoppingCart,
    FileText,
    Settings,
    LogOut,
    ChevronDown
} from 'lucide-react';

// Assuming your Form component is in a separate file, e.g., Form.jsx
import Form from './Form'; // Adjust the import path as necessary

const RequisitionPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false); // State to control form visibility

    // Sample requisition data
    const requisitions = [
        {
            id: '5146846548465',
            name: 'Mathi',
            billingDate: '2/19/21',
            status: 'Paid',
            amount: '₹500.00'
        },
        {
            id: '5467319467348',
            name: 'Partha',
            billingDate: '5/7/16',
            status: 'Paid',
            amount: '₹500.00'
        },
        {
            id: '1345705945446',
            name: 'Mani',
            billingDate: '9/18/16',
            status: 'Paid',
            amount: '₹500.00'
        },
        {
            id: '5440754979777',
            name: 'Arun',
            billingDate: '2/11/12',
            status: 'Paid',
            amount: '₹500.00'
        },
        {
            id: '1243467984543',
            name: 'Aravind',
            billingDate: '9/18/16',
            status: 'Paid',
            amount: '₹500.00'
        },
        {
            id: '8454134649707',
            name: 'Sachin',
            billingDate: '1/28/17',
            status: 'Paid',
            amount: '₹500.00'
        },
        {
            id: '2130164040451',
            name: 'Hari',
            billingDate: '5/27/15',
            status: 'Paid',
            amount: '₹500.00'
        },
        {
            id: '0439104645404',
            name: 'Gokul',
            billingDate: '8/2/19',
            status: 'Paid',
            amount: '₹500.00'
        }
    ];

    const menuItems = [
        { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
        { id: 'users', icon: Users, label: 'User Management' },
        { id: 'products', icon: Package, label: 'Product Management' },
        { id: 'orders', icon: ShoppingCart, label: 'Order Management' },
        { id: 'requisition', icon: FileText, label: 'Requisition', active: true },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(requisitions.map(req => req.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id) => {
        setSelectedItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const handleViewClick = () => {
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    return (
        <div className="flex-1 bg-gray -50 p-6 relative"> {/* Added relative for modal positioning */}
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    placeholder="Type to search"
                                    className="w-[75em] pl-10 py-2 border border-gray-200 rounded-md text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <div className="w-6 h-6 rounded"><Mail className="w-6 h-6 text-gray-600" /></div>
                                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
                            </div>
                            <div className="relative">
                                <div className="w-6 h-6 rounded"><Bell className="w-6 h-6 text-gray-600" /></div>
                                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">•</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Requisition Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <div className="bg-white rounded-lg shadow-sm">
                        {/* Page Header */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold text-gray-800">Requisition</h1>
                                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                    <Download className="w-4 h-4" />
                                    Download PDF Report
                                </button>
                            </div>

                            {/* Search and Filter */}
                            <div className="flex gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search by invoice number, name, amount..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                    <Filter className="w-4 h-4" />
                                    Filter
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                                                onChange={handleSelectAll}
                                                checked={selectedItems.length === requisitions.length}
                                            />
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            INVOICE NUMBER
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center gap-1">
                                                BILLING DATE
                                                <ChevronDown className="w-4 h-4" />
                                            </div>
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            STATUS
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            AMOUNT
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ACTION
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {requisitions.map((requisition) => (
                                        <tr key={requisition.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                                                    checked={selectedItems.includes(requisition.id)}
                                                    onChange={() => handleSelectItem(requisition.id)}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {requisition.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {requisition.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {requisition.billingDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                    {requisition.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {requisition.amount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={handleViewClick} // Call the handler here
                                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative">
                        <Form />
                        <button
                            onClick={handleCloseForm}
                            className="absolute top-2 right-2 bg-white rounded-full p-1 text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequisitionPage;
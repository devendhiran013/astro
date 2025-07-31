"use client"

import { useState } from "react"
import { Search, Filter, Download, TrendingUp, MoreHorizontal, Check, Mail, Bell } from "lucide-react";

import { Button } from "../ui/button"

export default function OrderManagementPage() {
    const [activeTab, setActiveTab] = useState("Succeeded")

    const transactions = [
        {
            id: 1,
            type: "Visa card",
            number: "**** 4831",
            amount: "₹182.94",
            date: "Jan 17, 2025",
            day: "Wednesday",
            status: "Completed",
            statusColor: "bg-green-100 text-green-800",
        },
        {
            id: 2,
            type: "Mastercard",
            number: "**** 6442",
            amount: "₹99.00",
            date: "Jan 17, 2025",
            day: "Monday",
            status: "Completed",
            statusColor: "bg-green-100 text-green-800",
        },
        {
            id: 3,
            type: "Account",
            number: "****882",
            amount: "₹249.94",
            date: "Jan 17, 2025",
            day: "Thursday",
            status: "Pending",
            statusColor: "bg-yellow-100 text-yellow-800",
        },
        {
            id: 4,
            type: "Amex card",
            number: "**** 5666",
            amount: "₹199.24",
            date: "Jan 17, 2025",
            day: "Saturday",
            status: "Canceled",
            statusColor: "bg-red-100 text-red-800",
        },
    ]

    const payments = [
        {
            id: 1,
            amount: "₹954",
            description: "Invoice 6B1E73DA-0017",
            customer: "partha08@gmail.com",
            date: "Dec 30, 09:42 PM",
            status: "Succeeded",
        },
        {
            id: 2,
            amount: "₹1283",
            description: "Invoice 6B1E73DA-0017",
            customer: "mathi@gmail.com",
            date: "Dec 29, 09:42 PM",
            status: "Succeeded",
        },
        {
            id: 3,
            amount: "₹129",
            description: "Invoice 6B1E73DA-0017",
            customer: "aravind@gmail.com",
            date: "Dec 28, 11:14 PM",
            status: "Succeeded",
        },
        {
            id: 4,
            amount: "₹2293",
            description: "Invoice 6B1E73DA-0017",
            customer: "sachin@gmail.com",
            date: "Dec 27, 09:42 PM",
            status: "Succeeded",
        },
    ]

    const tabs = ["Succeeded", "Refunded", "Uncaptured", "All"]

    return (
        <div className="flex-1 bg-gray-50 p-6">
            {/* Top Search Bar */}
            
            <div className="  mb-6">
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

            {/* Filter Bar */}
            <div className="p-4 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                placeholder="Search by card, account number..."
                                className="w-[750px] pl-10 py-2 border border-gray-200 rounded-md text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button variant="outline" className="bg-white flex items-center space-x-2 ">
                            <Filter className="w-4 h-4" />
                            <span>Filter</span>
                        </Button>
                        <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                            <Download className="w-4 h-4" />
                            <span>Download PDF Report</span>
                        </Button>
                    </div>
                </div>
            </div>


            {/* Transactions Section */}
            <div className="bg-white rounded-lg shadow-sm w-full p-6 mb-6 mt-0">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Transactions</h2>
                        <p className="text-sm text-gray-500">Transactions History</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4" />
                            <span>Analyze</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                            <span className="text-gray-400">✏️</span>
                            <span className="ml-1 text-sm">Edit</span>
                        </Button>
                        <Button variant="link" className="text-blue-600 text-sm">See All Transactions →</Button>
                    </div>
                </div>

                <div className="space-y-4">
                    {transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                        >
                            {/* Status - aligned left */}
                            <span className={`text-sm px-2 py-1 rounded-full font-medium ${transaction.statusColor} w-24 text-center`}>
                                {transaction.status}
                            </span>

                            {/* Card Info */}
                            <div className="flex flex-col w-48 px-4">
                                <p className="font-medium text-gray-900 whitespace-nowrap">
                                    {transaction.type} {transaction.number}
                                </p>
                                <p className="text-sm text-gray-500 whitespace-nowrap">Card payment</p>
                            </div>

                            {/* Amount & Date */}
                            <div className="text-right w-28 px-4">
                                <p className="font-semibold text-gray-900">{transaction.amount}</p>
                                <p className="text-sm text-gray-500">{transaction.date}</p>
                            </div>

                            {/* Day */}
                            <div className="text-center w-24 px-4">
                                <p
                                    className={`font-medium ${transaction.day === "Wednesday"
                                            ? "text-red-600"
                                            : transaction.day === "Monday"
                                                ? "text-green-600"
                                                : transaction.day === "Thursday"
                                                    ? "text-blue-600"
                                                    : "text-yellow-600"
                                        }`}
                                >
                                    {transaction.day}
                                </p>
                            </div>

                            {/* More Button - aligned right */}
                            <div className="w-12 flex justify-end">
                                <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>


            </div>



            {/* Payments Table */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Payments</h2>
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                                <Filter className="w-4 h-4" />
                                <span>Filter</span>
                            </Button>
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>
                        </div>
                        <Button variant="outline">Export</Button>
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white">Create payment</Button>
                    </div>
                </div>

                <div className="flex space-x-6 mb-6 border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                ? "border-orange-500 text-orange-600"
                                : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">AMOUNT</th>
                                <th className="text-left py-3 px-32 font-medium text-gray-500 text-sm">DESCRIPTION</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">CUSTOMER</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">DATE</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-4">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                    </td>
                                    <td className="py-4 px-4 font-medium text-gray-900">{payment.amount}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center space-x-1">
                                                <Check className="w-4 h-4 text-green-600" />
                                                <span className="text-green-600 text-sm font-medium">Succeeded</span>
                                            </div>
                                            <span className="px-4 text-gray-600">{payment.description}</span>
                                        </div>
                                        
                                    </td>
                                    <td className="py-4 px-4 text-gray-600">{payment.customer}</td>
                                    <td className="py-4 px-4 text-gray-600">{payment.date}</td>
                                    <td className="py-4 px-4">
                                        <Button variant="ghost" size="sm">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

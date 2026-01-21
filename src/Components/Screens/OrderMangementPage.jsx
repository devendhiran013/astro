"use client";

import { useEffect, useState } from "react";
import {
    Search,
    Filter,
    Download,
    MoreHorizontal,
    Check,
    Mail,
    Bell,
} from "lucide-react";

import { Button } from "../ui/button";
import adminApi from "../services/adminApi";

const ITEMS_PER_PAGE = 5;

export default function OrderManagementPage() {
    const [activeTab, setActiveTab] = useState("Succeeded");
    const [payments, setPayments] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    /* =============================
       FETCH ORDERS (FIXED)
    ============================== */
    const fetchOrders = async () => {
        try {
            const res = await adminApi.get("/orders?page=1&limit=200");

            const real = res.data.data.map((o) => {
                let convertedStatus =
                    o.status === "ordered"
                        ? "Succeeded"
                        : o.status === "pending"
                            ? "Pending"
                            : o.status === "failed"
                                ? "Failed"
                                : "Unknown";

                return {
                    id: o._id,
                    amount: `₹${o.totalPrice}`,
                    description: "Order Payment",

                    // FIX: customer name + phone number
                    customer:
                        o.customerId?.name ||
                        o.customerId?.phoneNumber ||
                        "Unknown",

                    date: new Date(o.createdAt).toLocaleDateString(),
                    status: convertedStatus,
                };
            });

            setPayments(real);
            setFiltered(real);
        } catch (err) {
            console.error("Failed to fetch orders", err);
        }
    };

    useEffect(() => {
        const controller = new AbortController();

        const fetchOrdersSafe = async () => {
            try {
                const res = await adminApi.get("/orders?page=1&limit=200", {
                    signal: controller.signal,
                });

                const real = res.data.data.map((o) => {
                    let convertedStatus =
                        o.status === "ordered"
                            ? "Succeeded"
                            : o.status === "pending"
                                ? "Pending"
                                : o.status === "failed"
                                    ? "Failed"
                                    : "Unknown";

                    return {
                        id: o._id,
                        amount: `₹${o.totalPrice}`,
                        description: "Order Payment",
                        customer:
                            o.customerId?.name ||
                            o.customerId?.phoneNumber ||
                            "Unknown",
                        date: new Date(o.createdAt).toLocaleDateString(),
                        status: convertedStatus,
                    };
                });

                setPayments(real);
                setFiltered(real);
            } catch (err) {
                if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
                    return; // ignore aborted request
                }
                console.error("Failed to fetch orders", err);
            }
        };

        fetchOrdersSafe();

        return () => controller.abort();   // 🟢 THIS FIXES MOBILE ERROR
    }, []);


    /* =============================
       SEARCH + FILTER + SORT
    ============================== */
    useEffect(() => {
        let result = payments;

        if (searchTerm.trim() !== "") {
            result = result.filter(
                (p) =>
                    p.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (activeTab !== "All") {
            result = result.filter((p) => p.status === activeTab);
        }

        if (sortType === "amount") {
            result = [...result].sort(
                (a, b) =>
                    parseFloat(a.amount.replace("₹", "")) -
                    parseFloat(b.amount.replace("₹", ""))
            );
        }

        if (sortType === "date") {
            result = [...result].sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
        }

        setFiltered(result);
        setCurrentPage(1);
    }, [searchTerm, activeTab, sortType, payments]);

    /* =============================
       PAGINATION
    ============================== */
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentPayments = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

    /* =============================
       EXPORT CSV
    ============================== */
    const exportCSV = () => {
        const headers = ["Amount,Description,Customer,Date,Status"];
        const rows = filtered.map(
            (p) =>
                `${p.amount},${p.description},${p.customer},${p.date},${p.status}`
        );

        const csvData = [...headers, ...rows].join("\n");
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "orders.csv";
        a.click();
    };

    return (
        <div className="flex-1 bg-gray-50 p-6">

            {/* SEARCH BAR */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1 max-w-md relative">
                        <Search className="absolute left-3 top-1/2 text-gray-400" />
                        <input
                            placeholder="Type to search"
                            className="w-[75em] pl-10 py-2 border rounded-md text-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-4">
                        <Mail className="w-6 h-6 text-gray-600" />
                        <Bell className="w-6 h-6 text-gray-600" />
                    </div>
                </div>
            </div>

            {/* FILTERS */}
            <div className="p-4 mb-6 flex justify-between">
                <div className="relative w-[750px]">
                    <Search className="absolute left-3 top-1/2 text-gray-400" />
                    <input
                        placeholder="Search by description, customer..."
                        className="w-full pl-10 py-2 border rounded-md text-sm"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-3">
                    <Button variant="outline">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </Button>

                    <Button variant="outline" onClick={exportCSV}>
                        <Download className="w-4 h-4" />
                        <span>Export CSV</span>
                    </Button>

                    <select
                        className="border px-3 py-2 rounded-md"
                        onChange={(e) => setSortType(e.target.value)}
                    >
                        <option value="">Sort</option>
                        <option value="amount">Amount ↑</option>
                        <option value="date">Date ↑</option>
                    </select>
                </div>
            </div>

            {/* =======================
                PAYMENTS TABLE
            ======================== */}
            <div className="bg-white rounded-lg shadow-sm p-6">

                {/* HEADER */}
                <div className="flex justify-between mb-6">
                    <h2 className="text-xl font-semibold">Payments</h2>

                    <div className="flex gap-3 relative">
                        <Button variant="outline" className="flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            Filter
                        </Button>
                        <Button variant="outline" onClick={exportCSV}>Export</Button>
                        <Button className="bg-orange-500 text-white">Create Payment</Button>
                    </div>
                </div>

                {/* TABS */}
                <div className="flex space-x-6 mb-6 border-b">
                    {["Succeeded", "Pending", "Failed", "All"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 text-sm font-medium border-b-2 ${activeTab === tab
                                    ? "border-orange-500 text-orange-600"
                                    : "border-transparent text-gray-500"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b text-sm text-gray-500">
                                <th className="py-3 px-4"><input type="checkbox" /></th>
                                <th className="py-3 px-4">AMOUNT</th>
                                <th className="py-3 px-32">DESCRIPTION</th>
                                <th className="py-3 px-4">CUSTOMER</th>
                                <th className="py-3 px-4">DATE</th>
                                <th className="py-3 px-4"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentPayments.map((payment) => (
                                <tr key={payment.id} className="border-b hover:bg-gray-50">

                                    <td className="py-4 px-4">
                                        <input type="checkbox" />
                                    </td>

                                    <td className="py-4 px-4 font-medium">{payment.amount}</td>

                                    <td className="py-4 px-4">
                                        <div className="flex gap-2 items-center">
                                            {/* STATUS BADGE */}
                                            {payment.status === "Succeeded" && (
                                                <Check className="w-4 h-4 text-green-600" />
                                            )}
                                            {payment.status === "Pending" && (
                                                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                                            )}
                                            {payment.status === "Failed" && (
                                                <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                                            )}

                                            <span className="text-sm font-medium">
                                                {payment.status}
                                            </span>

                                            <span className="px-4 text-gray-600">{payment.description}</span>
                                        </div>
                                    </td>

                                    <td className="py-4 px-4 text-gray-600">{payment.customer}</td>

                                    <td className="py-4 px-4 text-gray-600">{payment.date}</td>

                                    <td className="py-4 px-4">
                                        <MoreHorizontal className="cursor-pointer" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                <div className="flex justify-between mt-4 text-sm">
                    <span>Page {currentPage} of {totalPages}</span>

                    <div className="flex gap-2">
                        <button
                            className="px-3 py-1 border rounded"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                        >
                            Previous
                        </button>

                        <button
                            className="px-3 py-1 border rounded"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

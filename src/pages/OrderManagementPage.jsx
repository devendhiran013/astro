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

import adminApi from "../services/adminApi";

const ITEMS_PER_PAGE = 5;

export default function OrderManagementPage() {
    const [payments, setPayments] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    /* ============================= FETCH ============================= */
    useEffect(() => {
        const controller = new AbortController();

        const fetchOrders = async () => {
            try {
                const res = await adminApi.get("/orders?page=1&limit=200", {
                    signal: controller.signal,
                });

                const formatted = res.data.data.map((o) => ({
                    id: o._id,
                    amount: `₹${o.totalPrice}`,
                    description: "Order Payment",
                    customer:
                        o.customerId?.name ||
                        o.customerId?.phoneNumber ||
                        "Unknown",
                    date: new Date(o.createdAt).toLocaleDateString(),

                    // PRODUCT LIST
                    items:
                        o.orderItems?.map((item) => ({
                            name: item.productName,
                            qty: item.quantity,
                        })) || [],
                }));

                setPayments(formatted);
                setFiltered(formatted);
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchOrders();
        return () => controller.abort();
    }, []);

    /* ============================= FILTERS ============================= */
    useEffect(() => {
        let result = payments;

        if (searchTerm.trim()) {
            result = result.filter(
                (p) =>
                    p.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortType === "amount") {
            result = [...result].sort(
                (a, b) =>
                    parseInt(a.amount.replace("₹", "")) -
                    parseInt(b.amount.replace("₹", ""))
            );
        } else if (sortType === "date") {
            result = [...result].sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
        }

        setFiltered(result);
        setCurrentPage(1);
    }, [searchTerm, sortType, payments]);

    /* ============================= PAGINATION ============================= */
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentPayments = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

    /* ============================= EXPORT CSV ============================= */
    // const exportCSV = () => {
    //     const header = "Amount,Description,Customer,Date\n";
    //     const rows = filtered
    //         .map((p) => `${p.amount},${p.description},${p.customer},${p.date}`)
    //         .join("\n");

    //     const blob = new Blob([header + rows], { type: "text/csv" });
    //     const url = URL.createObjectURL(blob);

    //     const a = document.createElement("a");
    //     a.href = url;
    //     a.download = "orders.csv";
    //     a.click();
    // };

    return (
        <div className="flex-1 bg-[#EEF5F9] p-4 md:p-6">
            {/* ============================= TOP SEARCH ============================= */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        placeholder="Type to search"
                        className="w-full pl-10 py-2 border rounded-md text-sm bg-white"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-4">
                    <Mail className="w-6 h-6 text-gray-600" />
                    <Bell className="w-6 h-6 text-gray-600" />
                </div>
            </div>

            {/* ============================= FILTER ROW ============================= */}
            {/* <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 text-gray-400" />
                    <input
                        placeholder="Search by customer, description..."
                        className="w-full pl-10 py-2 border rounded-md text-sm bg-white"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-3">
                    <button className="px-4 py-2 border rounded-md flex items-center gap-2 bg-white">
                        <Filter size={16} /> Filter
                    </button>

                    <button
                        className="px-4 py-2 border rounded-md bg-white"
                        onClick={exportCSV}
                    >
                        Export CSV
                    </button>

                    <select
                        className="border px-3 py-2 rounded-md bg-white"
                        onChange={(e) => setSortType(e.target.value)}
                    >
                        <option value="">Sort</option>
                        <option value="amount">Amount ↑</option>
                        <option value="date">Date ↑</option>
                    </select>
                </div>
            </div> */}

            {/* ============================= TABLE ============================= */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-4">Payments</h2>

                <div className="w-full">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="border-b bg-gray-50 text-gray-500">
                                <th className="py-2 px-4"><input type="checkbox" /></th>
                                <th className="py-2 px-4">Amount</th>
                                <th className="py-2 px-4">Description</th>
                                <th className="py-2 px-4">Customer</th>
                                <th className="py-2 px-4">Product</th>
                                <th className="py-2 px-4">Qty</th>
                                <th className="py-2 px-4">Date</th>
                                <th className="py-2 px-4"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentPayments.map((p) => (
                                <tr key={p.id} className="border-b">
                                    <td className="py-2 px-4">
                                        <input type="checkbox" />
                                    </td>

                                    <td className="py-2 px-4 font-semibold">{p.amount}</td>

                                    <td className="py-2 px-4 text-gray-600">{p.description}</td>

                                    <td className="py-2 px-4 text-gray-600">{p.customer}</td>

                                    <td className="py-2 px-4 text-gray-600">
                                        {p.items.length > 0 ? (
                                            p.items.map((i, idx) => (
                                                <div key={idx} className="text-xs">• {i.name}</div>
                                            ))
                                        ) : (
                                            <span className="text-xs text-gray-400">No products</span>
                                        )}
                                    </td>

                                    <td className="py-2 px-4 text-gray-600">
                                        {p.items.length > 0 ? (
                                            p.items.map((i, idx) => (
                                                <div key={idx} className="text-xs">{i.qty}</div>
                                            ))
                                        ) : (
                                            <span className="text-xs text-gray-400">—</span>
                                        )}
                                    </td>

                                    <td className="py-2 px-4 text-gray-600">{p.date}</td>

                                    <td className="py-2 px-4">
                                        <MoreHorizontal className="cursor-pointer" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                <div className="flex justify-between items-center mt-4 text-sm">
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>

                    <div className="flex gap-2">
                        <button
                            className="px-3 py-1 border rounded bg-white"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                        >
                            Previous
                        </button>

                        <button
                            className="px-3 py-1 border rounded bg-white"
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

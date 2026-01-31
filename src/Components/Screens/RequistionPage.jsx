"use client";

import React, { useEffect, useState } from "react";
import {
    Search,
    Filter,
    Download,
    Mail,
    Bell,
    ChevronDown
} from "lucide-react";

import adminApi from "../services/adminApi";
import Form from "./Form";

export default function RequisitionPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);


    /* ================= FETCH ONLINE SERVICES ================ */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await adminApi.get("/online-services?page=1&limit=200");

                setServices(res.data.data);

            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        fetchData();
    }, []);

    /* ================= HANDLE SELECT ================= */
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedItems(services.map((req) => req._id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const refreshServiceData = async () => {
        if (!selectedService?._id) return;

        const res = await adminApi.get(`/online-services/${selectedService._id}`);
        setSelectedService(res.data.data);
    };

    /* ================= OPEN FORM WITH BACKEND DATA ================= */
    const handleViewClick = async (serviceId) => {
        try {
            const res = await adminApi.get(`/online-services/${serviceId}`);

            setSelectedService(res.data.data);
            setIsFormOpen(true);

        } catch (err) {
            console.error("Failed to fetch details:", err);
        }
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedService(null);
    };

    
    return (
        <div className="flex-1 bg-gray-50 p-6 relative">

            {/* TOP SEARCH */}
            <div className="flex items-center justify-between mb-6">
                <div className="relative w-full max-w-lg">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        placeholder="Type to search"
                        className="w-full pl-10 py-2 border border-gray-300 rounded-md text-sm"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-4">
                    <Mail className="w-6 h-6 text-gray-600" />
                    <Bell className="w-6 h-6 text-gray-600" />
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white shadow rounded-xl p-6">
                <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="px-6 py-3"><input type="checkbox" onChange={handleSelectAll} /></th>
                            <th className="px-6 py-3">Invoice</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {services.map((s) => (
                            <tr key={s._id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(s._id)}
                                        onChange={() => handleSelectItem(s._id)}
                                    />
                                </td>

                                <td className="px-6 py-3">{s.orderID}</td>
                                <td className="px-6 py-3">{s.name}</td>
                                <td className="px-6 py-3">{new Date(s.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-3">
                                    <span className={`px-3 py-1 rounded-full text-xs ${s.status === "ordered"
                                        ? "bg-green-100 text-green-700"
                                        : s.status === "failed"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                        {s.status}
                                    </span>
                                </td>
                                <td className="px-6 py-3">₹{s.totalPrice}</td>

                                <td className="px-6 py-3">
                                    <button
                                        onClick={() => handleViewClick(s._id)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* MODAL */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative">
                        <Form
                            data={selectedService}
                            onClose={handleCloseForm}
                            onDataUpdate={refreshServiceData}
                        />

                        <button
                            onClick={() => setIsFormOpen(false)}
                            className="absolute top-2 right-2 bg-white rounded-full p-1 text-gray-600 hover:text-gray-900"
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

import { useRef } from "react";
import React, { useEffect, useState } from "react";
import {
    Search,
    SlidersHorizontal,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import adminApi from "../services/adminApi";
import NewsEditModal from "./NewsEditModal";
import AddNewsModal from "./AddNewsModal";
const ITEMS_PER_PAGE = 5;
const DESCRIPTION_LIMIT = 60;

const NewsManagementPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [showNewsEditModal, setShowNewsEditModal] = useState(false);
    const [editingNewsItem, setEditingNewsItem] = useState(null);

    const [previewImage, setPreviewImage] = useState(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showAddNewsModal, setShowAddNewsModal] = useState(false);

    /* ============= FETCH NEWS ============= */
    const fetchNews = async () => {
        try {
            const res = await adminApi.get("/news");
            const list = Array.isArray(res.data?.data) ? res.data.data : [];

            // 🔥 Normalize thumbnail → image
            setNews(
                list.map((item) => ({
                    ...item,
                    image: item.thumbnail || "",
                }))
            );

        } catch (err) {
            console.error("Failed to fetch news", err);
        } finally {
            setLoading(false);
        }
    };

    const hasFetched = useRef(false);
    useEffect(() => {
        if (!hasFetched.current) {
            fetchNews();
            hasFetched.current = true;
        }
    }, []);

    /* ============= PREVIEW IMAGE ============= */
    const handlePreviewImage = (url) => {
        setPreviewImage(url);
        setShowPreviewModal(true);
    };

    /* ============= PAGINATION ============= */
    const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentNews = news.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    /* ============= HELPERS ============= */
    const trimText = (text = "") =>
        text.length > DESCRIPTION_LIMIT
            ? text.slice(0, DESCRIPTION_LIMIT) + "..."
            : text;

    /* ============= ACTIONS ============= */
    const handleEditNewsClick = (item) => {
        setEditingNewsItem(item);
        setShowNewsEditModal(true);
    };

    const handleSaveNews = async (updatedItem) => {
        try {
            await adminApi.put(`/news/${updatedItem._id}`, updatedItem);

            // Update UI immediately
            setNews((prev) =>
                prev.map((item) =>
                    item._id === updatedItem._id
                        ? {
                            ...updatedItem,
                            image: updatedItem.image || updatedItem.thumbnail,
                        }
                        : item
                )
            );
        } catch (err) {
            console.error("Update failed", err);
        } finally {
            setShowNewsEditModal(false);
            setEditingNewsItem(null);
        }
    };

    const handleDeleteNews = async (id) => {
        if (!window.confirm("Delete this news?")) return;

        try {
            await adminApi.delete(`/news/${id}`);
            setNews(news.filter((item) => item._id !== id));
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    const handleCloseNewsEditModal = () => {
        setShowNewsEditModal(false);
        setEditingNewsItem(null);
    };

    if (loading) return <div className="p-6">Loading news...</div>;

    return (
        <section className="bg-white p-6 rounded-lg shadow-sm mt-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <h2 className="text-xl font-semibold text-gray-800">News</h2>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">

                    <div className="relative flex-1 w-full sm:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow"
                        onClick={() => setShowAddNewsModal(true)}
                    >
                        + Add News
                    </button>

                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700">
                        <SlidersHorizontal size={18} className="mr-2" /> Filters
                    </button>
                </div>
            </div>

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="space-y-4 md:hidden">
                {currentNews.map((item) => (
                    <div key={item._id} className="bg-gray-50 p-4 rounded-xl shadow-sm">

                        <p className="font-semibold">{item.title}</p>
                        <p className="text-gray-500 text-sm mt-1">{trimText(item.description)}</p>

                        <p
                            className="text-xs text-blue-600 underline mt-1 cursor-pointer"
                            onClick={() => item.image && handlePreviewImage(item.image)}
                        >
                            {item.image ? "View Image" : "—"}
                        </p>

                        <p className="mt-1">
                            <span
                                className={`px-2 py-1 rounded-full text-xs ${item.isEnabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {item.isEnabled ? "Active" : "Disabled"}
                            </span>
                        </p>

                        <div className="flex gap-4 mt-3">
                            <Edit size={18} className="cursor-pointer" onClick={() => handleEditNewsClick(item)} />
                            <Trash2 size={18} className="cursor-pointer text-red-500" onClick={() => handleDeleteNews(item._id)} />
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3"><input type="checkbox" /></th>
                            <th className="px-6 py-3 text-left">Heading</th>
                            <th className="px-6 py-3 text-left">Description</th>
                            <th className="px-6 py-3 text-left">Image</th>
                            <th className="px-6 py-3 text-left">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {currentNews.map((item) => (
                            <tr key={item._id}>
                                <td className="px-6 py-4"><input type="checkbox" /></td>

                                <td className="px-6 py-4 font-medium">{item.title}</td>

                                <td className="px-6 py-4 text-gray-500">{trimText(item.description)}</td>

                                <td
                                    className="px-6 py-4 text-blue-600 underline cursor-pointer"
                                    onClick={() => item.image && handlePreviewImage(item.image)}
                                >
                                    {item.image ? `image${news.indexOf(item) + 1}` : "—"}
                                </td>

                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${item.isEnabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {item.isEnabled ? "Active" : "Disabled"}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-3">
                                        <Edit size={18} className="cursor-pointer" onClick={() => handleEditNewsClick(item)} />
                                        <Trash2 size={18} className="cursor-pointer text-red-500" onClick={() => handleDeleteNews(item._id)} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= PAGINATION ================= */}
            <div className="flex justify-between items-center mt-4 text-sm">
                <span>Page {currentPage} of {totalPages}</span>

                <div className="flex gap-2">
                    <button
                        className="flex items-center gap-1 px-3 py-1 border rounded-lg"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    >
                        <ChevronLeft size={16} /> Previous
                    </button>

                    <button
                        className="flex items-center gap-1 px-3 py-1 border rounded-lg"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    >
                        Next <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* ================= MODAL: EDIT NEWS ================= */}
            {showNewsEditModal && editingNewsItem && (
                <NewsEditModal
                    newsItem={editingNewsItem}
                    onSave={handleSaveNews}
                    onDelete={() => handleDeleteNews(editingNewsItem._id)}
                    onClose={handleCloseNewsEditModal}
                />
            )}

            {/* ================= IMAGE PREVIEW MODAL ================= */}
            {showPreviewModal && previewImage && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]"
                    onClick={() => setShowPreviewModal(false)}
                >
                    <div
                        className="bg-white rounded-xl p-4 max-w-[90%] max-h-[80%] shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="max-w-full max-h-[70vh] rounded-lg"
                        />

                        <button
                            className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg"
                            onClick={() => setShowPreviewModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {showAddNewsModal && (
                <AddNewsModal
                    onClose={() => setShowAddNewsModal(false)}
                    onSaved={(newItem) => {
                        setNews((prev) => [{
                            ...newItem,
                            image: newItem.thumbnail
                        }, ...prev]);
                    }}
                />
            )}

        </section>


    );
};

export default NewsManagementPage;

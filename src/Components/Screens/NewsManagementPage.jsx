import { useRef } from "react";
import React, { useEffect, useState } from "react";
import { Search, SlidersHorizontal, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import adminApi from "../services/adminApi";
import NewsEditModal from "./DeleteConfirmation";

const ITEMS_PER_PAGE = 5;
const DESCRIPTION_LIMIT = 60;

const NewsManagementPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);

    const [showNewsEditModal, setShowNewsEditModal] = useState(false);
    const [editingNewsItem, setEditingNewsItem] = useState(null);

    /* =======================
       FETCH NEWS
    ======================= */
    const fetchNews = async () => {
        try {
            const res = await adminApi.get("/news");
            const newsList = Array.isArray(res.data?.data) ? res.data.data : [];
            setNews(newsList);
        } catch (err) {
            console.error("Failed to fetch news", err);
            
        } finally {
            setLoading(false);
        }
    };
    const hasFetched = useRef(false);
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchNews();
    }, []);
    /* =======
  
  /* =======================
     PAGINATION
  ======================= */
    const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentNews = news.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    /* =======================
       HELPERS
    ======================= */
    const trimText = (text = "") =>
        text.length > DESCRIPTION_LIMIT
            ? text.slice(0, DESCRIPTION_LIMIT) + "..."
            : text;

    /* =======================
       ACTIONS
    ======================= */
    const handleEditNewsClick = (item) => {
        setEditingNewsItem(item);
        setShowNewsEditModal(true);
    };

    const handleSaveNews = async (updatedItem) => {
        try {
            await adminApi.put(`/news/${updatedItem._id}`, updatedItem);
            fetchNews();
        } catch (err) {
            console.error("Update failed", err);
        } finally {
            setShowNewsEditModal(false);
            setEditingNewsItem(null);
        }
    };

    const handleDeleteNews = async (newsId) => {
        if (!window.confirm("Are you sure you want to delete this news?")) return;
        try {
            await adminApi.delete(`/news/${newsId}`);
            setNews(news.filter((item) => item._id !== newsId));
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    const handleCloseNewsEditModal = () => {
        setShowNewsEditModal(false);
        setEditingNewsItem(null);
    };

    if (loading) {
        return <div className="p-6 text-gray-600">Loading news...</div>;
    }

    return (
        <section className="bg-white p-6 rounded-lg shadow-sm">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">News</h2>

                <div className="flex items-center space-x-3">
                    <div className="relative flex items-center">
                        <Search className="absolute left-3 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700">
                        <SlidersHorizontal size={18} className="mr-2" /> Filters
                    </button>
                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">
                                <input type="checkbox" />
                            </th>
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
                                <td className="px-6 py-4">
                                    <input type="checkbox" />
                                </td>

                                <td className="px-6 py-4 font-medium">
                                    {item.title}
                                </td>

                                <td className="px-6 py-4 text-gray-500">
                                    {trimText(item.description)}
                                </td>

                                <td className="px-6 py-4 text-gray-500">
                                    {item.thumbnail || "—"}
                                </td>

                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${item.isEnabled
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {item.isEnabled ? "Active" : "Disabled"}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-3">
                                        <Edit
                                            size={18}
                                            className="cursor-pointer"
                                            onClick={() => handleEditNewsClick(item)}
                                        />
                                        <Trash2
                                            size={18}
                                            className="cursor-pointer"
                                            onClick={() => handleDeleteNews(item._id)}
                                        />
                                    </div>
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
                        className="flex items-center gap-1 px-3 py-1 border rounded-lg"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    >
                        <ChevronLeft size={16} /> Previous
                    </button>

                    <button
                        className="flex items-center gap-1 px-3 py-1 border rounded-lg"
                        disabled={currentPage === totalPages}
                        onClick={() =>
                            setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                    >
                        Next <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {showNewsEditModal && editingNewsItem && (
                <NewsEditModal
                    newsItem={editingNewsItem}
                    onSave={handleSaveNews}
                    onDelete={() => handleDeleteNews(editingNewsItem._id)}
                    onClose={handleCloseNewsEditModal}
                />
            )}
        </section>
    );
};

export default NewsManagementPage;

import React, { useEffect, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Upload,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Mail,
  Bell,
} from "lucide-react";

import adminApi from "../services/adminApi";
import ProductForm from "./modals/EditProductModal";
import NewsManagementPage from "./NewsManagementPage";




const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [showProductEditModal, setShowProductEditModal] = useState(false);
  const [editingProductItem, setEditingProductItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);

    checkScreen(); // run on mount
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const ITEMS_PER_PAGE = isMobile ? 3 : 5;
  /* ======================= FETCH ======================= */
  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await adminApi.get("/products", {
          signal: controller.signal,
        });

        const productList = Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        setProducts(productList);
      } catch (err) {
        if (err.name !== "CanceledError") console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, []);

  /* ======================= PAGINATION ======================= */
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const currentProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  /* ======================= ACTIONS ======================= */
  const handleEditProductClick = (product) => {
    setEditingProductItem(product);
    setShowProductEditModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await adminApi.delete(`/products/${productId}`);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSaveProduct = async (updatedProduct) => {
    try {
      await adminApi.put(`/products/${updatedProduct._id}`, updatedProduct);

      setProducts((prev) =>
        prev.map((p) =>
          p._id === updatedProduct._id ? updatedProduct : p
        )
      );

      setShowProductEditModal(false);
      setEditingProductItem(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleCloseProductEditModal = () => {
    setShowProductEditModal(false);
    setEditingProductItem(null);
  };

  if (loading) return <div className="p-6">Loading products…</div>;

  /* ======================= RENDER ======================= */
  return (
    <div className="flex flex-col min-h-screen bg-[#EEF5F9] p-4 md:p-6">

      {/* ========== TOP SEARCH SECTION ========== */}
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between mb-4">

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            placeholder="Type to search"
            className="w-full pl-10 py-2 rounded-xl bg-white border border-gray-200 text-sm shadow-sm"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <div className="relative bg-white p-2 rounded-xl shadow cursor-pointer">
            <Mail className="w-5 h-5 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] px-[6px] rounded-full border-2 border-white">
              2
            </span>
          </div>

          <div className="relative bg-white p-2 rounded-xl shadow cursor-pointer">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full border-2 border-white" />
          </div>
        </div>
      </div>

      {/* ========== SECOND SEARCH ROW ========== */}
      <div className="flex items-center gap-4 mb-4">

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            placeholder="Search by mobile number, name..."
            className="w-full pl-10 py-2 rounded-xl bg-white border border-gray-200 text-sm shadow-sm"
          />
        </div>

        {/* Filter icon */}
        <button className="bg-white p-3 rounded-xl shadow flex items-center justify-center">
          <SlidersHorizontal size={18} className="text-gray-600" />
        </button>

        {/* Export icon */}
        <button className="bg-white p-3 rounded-xl shadow flex items-center justify-center">
          <Upload size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Add Product Button */}
      <button className="bg-orange-500 text-white w-full py-3 rounded-xl shadow font-semibold flex items-center justify-center gap-2 mb-4 md:hidden">
        <Plus size={18} /> Add Product
      </button>

      {/* ========== PRODUCT LIST ========== */}
      <section className="bg-white p-4 rounded-xl shadow-sm">

        <h2 className="text-lg font-semibold mb-4">Product Details</h2>

        {/* ---------- MOBILE PRODUCT LIST ---------- */}
        <div className="space-y-4 md:hidden">
          {currentProducts.map((product, index) => (
            <div
              key={product._id}
              className="bg-gray-50 p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{product.title}</p>
                <p className="text-sm text-gray-500">
                  ₹{product.discountedPrice ?? product.actualPrice}
                </p>
                <p className="text-xs text-gray-400">{product.discount ? `${product.discount}%` : "—"}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEditProductClick(product)}
                  className="p-2 rounded-full hover:bg-gray-200"
                >
                  <Edit size={18} />
                </button>

                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="p-2 rounded-full bg-red-100 text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ---------- DESKTOP TABLE ---------- */}
        <div className="hidden md:block overflow-x-auto mt-2">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3">
                  <input type="checkbox" />
                </th>
                <th className="px-6 py-3 text-left">Product Name</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Discount</th>
                {/* <th className="px-6 py-3 text-left">Rating</th>
                <th className="px-6 py-3 text-left">Selling Rate</th> */}
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {currentProducts.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4">
                    <input type="checkbox" />
                  </td>

                  <td className="px-6 py-4">{product.title}</td>

                  <td className="px-6 py-4">
                    ₹{product.discountedPrice ?? product.actualPrice}
                  </td>

                  <td className="px-6 py-4">
                    {product.discount ? `${product.discount}%` : "—"}
                  </td>

                  {/* <td className="px-6 py-4">4.3</td> */}

                  {/* <td className="px-6 py-4 text-green-600 font-semibold">
                    ↑ 5%
                  </td> */}

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-4">
                      <Edit
                        size={18}
                        onClick={() => handleEditProductClick(product)}
                        className="cursor-pointer text-gray-700"
                      />

                      <Trash2
                        size={18}
                        onClick={() => handleDeleteProduct(product._id)}
                        className="cursor-pointer text-red-500"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ---------- PAGINATION ---------- */}
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-white border rounded-lg shadow disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-4 py-2 bg-white border rounded-lg shadow disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>

      {/* NEWS SECTION BELOW */}
      <NewsManagementPage />

      {/* ---------- EDIT POPUP ---------- */}
      {showProductEditModal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={handleCloseProductEditModal}
          />

          {/* Centered Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white w-[90%] md:w-[450px] rounded-xl shadow-xl p-6">
              <ProductForm
                product={editingProductItem}
                onSave={handleSaveProduct}
                onDelete={handleDeleteProduct}
                onClose={handleCloseProductEditModal}
              />
            </div>
          </div>
        </>
      )}


    </div>
  );
};

export default ProductManagementPage;

import { useRef } from "react";
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
import ProductForm from "./ProductForm";
import NewsManagementPage from "./NewsManagementPage";
const ITEMS_PER_PAGE = 5;

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const [showProductEditModal, setShowProductEditModal] = useState(false);
  const [editingProductItem, setEditingProductItem] = useState(null);

  /* =======================
     FETCH PRODUCTS
  ======================= */
  const fetchProducts = async () => {
    try {
      const res = await adminApi.get("/products");
      const productList = Array.isArray(res.data?.data)
        ? res.data.data
        : [];
      setProducts(productList);
    } catch (err) {
      console.error("Failed to fetch products", err);

    } finally {
      setLoading(false);
    }
  };

    
  useEffect(() => {
    const controller = new AbortController();

    const fetchProductsSafe = async () => {
      try {
        const res = await adminApi.get("/products", {
          signal: controller.signal,
        });
        const productList = Array.isArray(res.data?.data)
          ? res.data.data
          : [];
        setProducts(productList);
      } catch (err) {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
          return; // Ignore aborted requests
        }
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsSafe();

    return () => controller.abort();  // <-- THIS FIXES THE ERROR COMPLETELY
  }, []);




  /* =======================
     PAGINATION LOGIC
  ======================= */
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /* =======================
     ACTIONS
  ======================= */
  const handleEditProductClick = (product) => {
    setEditingProductItem(product);
    setShowProductEditModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await adminApi.delete(`/products/${productId}`);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      setShowProductEditModal(false);
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

  if (loading) {
    return <div className="p-6 text-gray-600">Loading products...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* =======================
          TOP BAR
      ======================= */}
      <header className="flex items-center justify-between p-4 m-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            placeholder="Type to search"
            className="w-full pl-10 py-2 border border-gray-200 rounded-md text-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          <Mail className="w-6 h-6 text-gray-600" />
          <Bell className="w-6 h-6 text-gray-600" />
        </div>
      </header>

      {/* =======================
          CONTENT
      ======================= */}
      <main className="flex-1 p-4 overflow-y-auto">
        <section className="bg-white p-6 rounded-lg shadow-sm mb-6">
          {/* Header */}
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Product Details</h2>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border rounded-lg text-sm"
                />
              </div>

              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700">
                <SlidersHorizontal size={18} /> Filters
              </button>

              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700">
                <Upload size={18} /> Export
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg">
                <Plus size={18} /> Add Product
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3">
                    <input type="checkbox" />
                  </th>
                  <th className="px-6 py-3 text-left">Product Name</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">Discount</th>
                  <th className="px-6 py-3 text-left">Rating</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {currentProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4">
                      <input type="checkbox" />
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {product.title}
                    </td>

                    <td className="px-6 py-4">
                      ₹{product.discountedPrice ?? product.actualPrice}
                    </td>

                    <td className="px-6 py-4">
                      {product.discount ? `${product.discount}%` : "—"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-400 h-2 rounded-full w-2/3" />
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${product.isEnabled
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {product.isEnabled ? "Active" : "Disabled"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <Edit
                          size={18}
                          className="cursor-pointer"
                          onClick={() =>
                            handleEditProductClick(product)
                          }
                        />
                        <Trash2
                          size={18}
                          className="cursor-pointer"
                          onClick={() =>
                            handleDeleteProduct(product._id)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* =======================
              PAGINATION
          ======================= */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <span>
              Page {currentPage} of {totalPages}
            </span>

            <div className="flex gap-2">
              <button
                className="flex items-center gap-1 px-3 py-1 border rounded-lg"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((p) => Math.max(p - 1, 1))
                }
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <button
                className="flex items-center gap-1 px-3 py-1 border rounded-lg"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(p + 1, totalPages)
                  )
                }
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>
        <NewsManagementPage />
      </main>
      {showProductEditModal && (
        <ProductForm
          product={editingProductItem}
          onSave={handleSaveProduct}          // ✅ REQUIRED
          onDelete={handleDeleteProduct}      // ✅ REQUIRED
          onClose={handleCloseProductEditModal}
        />
      )}



    </div>
  );
};

export default ProductManagementPage;

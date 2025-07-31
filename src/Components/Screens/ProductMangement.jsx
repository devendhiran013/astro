import React, { useState } from 'react';
import { Search, SlidersHorizontal, Upload, Plus, ChevronDown, ChevronUp, Edit, Trash2, ChevronLeft, ChevronRight, Mail, Bell } from 'lucide-react';
import NewsEditModal from './DeleteConfirmation';
import ProductForm from './ProductForm';

const ProductManagementPage = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product A', price: 600, discount: 20, rating: 80, sellingRate: 5, status: 'Active' },
    { id: 2, name: 'Product B', price: 700, discount: 30, rating: 70, sellingRate: 1, status: 'Active' },
    { id: 3, name: 'Product C', price: 1500, discount: 5, rating: 90, sellingRate: 8, status: 'Active' },
    { id: 4, name: 'Product D', price: 800, discount: 20, rating: 60, sellingRate: 2, status: 'Active' },
    { id: 5, name: 'Product E', price: 264, discount: 10, rating: 50, sellingRate: 4, status: 'Sold' },
    // Add more products to make it scrollable for testing
  
  ]);

  const [news, setNews] = useState([
    { id: 1, heading: 'News Item 1', description: 'Description for news item 1', image: 'image1.jpg', status: 'Active' },
    { id: 2, heading: 'News Item 2', description: 'Description for news item 2', image: 'image2.jpg', status: 'Active' },
    { id: 3, heading: 'News Item 3', description: 'Description for news item 3', image: 'image3.jpg', status: 'Active' },
    // Add more news items for testing
    { id: 4, heading: 'News Item 4', description: 'Description for news item 4', image: 'image4.jpg', status: 'Active' },
    { id: 5, heading: 'News Item 5', description: 'Description for news item 5', image: 'image5.jpg', status: 'Active' },
  ]);

  const [showNewsEditModal, setShowNewsEditModal] = useState(false);
  const [editingNewsItem, setEditingNewsItem] = useState(null);

  const [showProductEditModal, setShowProductEditModal] = useState(false);
  const [editingProductItem, setEditingProductItem] = useState(null);

  const renderRatingBar = (rating) => {
    return (
      <div className="w-24 bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-orange-400 h-2.5 rounded-full"
          style={{ width: `${rating}%` }}
        ></div>
      </div>
    );
  };

  const handleEditNewsClick = (item) => {
    setEditingNewsItem(item);
    setShowNewsEditModal(true);
  };

  const handleSaveNews = (updatedItem) => {
    setNews(news.map(item => item.id === updatedItem.id ? updatedItem : item));
    setShowNewsEditModal(false);
    setEditingNewsItem(null);
  };

  const handleDeleteNews = (itemId) => {
    setNews(news.filter(item => item.id !== itemId));
    setShowNewsEditModal(false);
    setEditingNewsItem(null);
  };

  const handleCloseNewsEditModal = () => {
    setShowNewsEditModal(false);
    setEditingNewsItem(null);
  };

  const handleEditProductClick = (product) => {
    setEditingProductItem(product);
    setShowProductEditModal(true);
  };

  const handleSaveProduct = (updatedProduct) => {
    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
    setShowProductEditModal(false);
    setEditingProductItem(null);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
    setShowProductEditModal(false);
    setEditingProductItem(null);
  };

  const handleCloseProductEditModal = () => {
    setShowProductEditModal(false);
    setEditingProductItem(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-inter"> {/* Use flex-col and h-screen here */}
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between p-4 m-4 flex-shrink-0"> {/* Add flex-shrink-0 */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              placeholder="Type to search"
              className="w-[70em] pl-10 py-2 border border-gray-200 rounded-md text-sm"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-8 h-8 rounded"><Mail className="w-6 h-6 text-gray-600" /></div>
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
          </div>
          <div className="relative">
            <div className="w-8 h-8 rounded"><Bell className="w-6 h-6 text-gray-600" /></div>
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">•</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4"> {/* Add overflow-y-auto here */}
        {/* Product Details Section */}
        <section className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Product Details</h2>
            <div className="flex items-center space-x-3">
              <div className="relative flex items-center">
                <Search className="absolute left-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-orange-400"
                />
              </div>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-150">
                <SlidersHorizontal size={18} className="mr-2" /> Filters
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-150">
                <Upload size={18} className="mr-2" /> Export
              </button>
              <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-150 shadow-md">
                <Plus size={18} className="mr-2" /> Add Product
              </button>
            </div>
          </div>

          {/* Product Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-600 rounded" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                    Selling Rate <ChevronUp size={14} className="ml-1" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                    Statistics
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-600 rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.discount}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {renderRatingBar(product.rating)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      {product.sellingRate}%{' '}
                      {product.sellingRate > 0 ? (
                        <ChevronUp size={14} className="ml-1 text-green-500" />
                      ) : (
                        <ChevronDown size={14} className="ml-1 text-red-500" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button className="text-gray-500 hover:text-gray-700">
                          <Trash2 size={18} />
                        </button>
                        <button
                          onClick={() => handleEditProductClick(product)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Edit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
            <span>Page 1 of 10</span>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150 flex items-center">
                <ChevronLeft size={16} className="mr-1" /> Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150 flex items-center">
                Next <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">News</h2>
            <div className="flex items-center space-x-3">
              <div className="relative flex items-center">
                <Search className="absolute left-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus-ring-orange-400"
                />
              </div>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-150">
                <SlidersHorizontal size={18} className="mr-2" /> Filters
              </button>
            </div>
          </div>

          {/* News Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-600 rounded" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Heading
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {news.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-600 rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.heading}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.image}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEditNewsClick(item)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Edit size={18} />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {showNewsEditModal && editingNewsItem && (
        <NewsEditModal
          newsItem={editingNewsItem}
          onSave={handleSaveNews}
          onDelete={handleDeleteNews}
          onClose={handleCloseNewsEditModal}
        />
      )}

      {showProductEditModal && editingProductItem && (
        <ProductForm
          product={editingProductItem}
          onSave={handleSaveProduct}
          onDelete={handleDeleteProduct}
          onClose={handleCloseProductEditModal}
        />
      )}
    </div>
  );
};

export default ProductManagementPage;
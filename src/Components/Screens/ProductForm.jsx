import React, { useState, useEffect } from "react";
import { X } from 'lucide-react'; // Import the X icon

const ProductForm = ({ product, onSave, onDelete, onClose }) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");

  // Populate form fields when product prop changes
  useEffect(() => {
    if (product) {
      setProductName(product.name || "");
      setPrice(product.price || "");
      setDiscount(product.discount || "");
      setDescription(product.description || "");
    }
  }, [product]);

  const handleSave = () => {
    const updatedProduct = {
      ...product, // Keep existing properties
      name: productName,
      price: parseFloat(price), // Convert to number
      discount: parseFloat(discount), // Convert to number
      description: description,
    };
    onSave(updatedProduct);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(product.id);
    }
  };

  return (
    // Modal Overlay:
    // - fixed: Positions the element relative to the viewport.
    // - inset-0: Shorthand for top:0, right:0, bottom:0, left:0, making it cover the entire screen.
    // - bg-gray-600 bg-opacity-50: Creates the semi-transparent dark background.
    // - flex items-center justify-center: Centers the child element (the modal card) both vertically and horizontally.
    // - z-[100]: Ensures it's on top of almost all other content.
    <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex items-center justify-center z-[100] font-inter">
      {/* Modal Card */}
      <div className="w-[327px] h-auto bg-white rounded-[20px] p-[33px] shadow relative">
        {/* Close Button */}
        <button
          onClick={onClose} // Call the onClose prop to close the modal
          className="absolute top-5 left-5 text-gray-500 hover:text-gray-700 rounded-full p-1 transition duration-150"
        >
          <X size={24} />
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="absolute top-5 right-5 bg-red-100 text-red-700 text-sm px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-red-200 transition duration-150"
        >
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          Delete
        </button>

        {/* Form Fields */}
        <div className="space-y-6 mt-2">
          {/* Product Name */}
          <div className="flex items-center justify-between pt-4">
            <label className="text-[13px] text-gray-700 w-[100px] ">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-[138px] flex-1 border-b border-gray-300 outline-none bg-transparent focus:border-orange-500"
            />
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-4">
            <label className="text-sm text-gray-700 w-[100px]">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-[138px] flex-1 border-b border-gray-300 outline-none bg-transparent focus:border-orange-500"
            />
          </div>

          {/* Discount */}
          <div className="flex items-center justify-between pt-4">
            <label className="text-sm text-gray-700 w-[100px]">Discount</label>
            <input
              type="text"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-[138px] flex-1 border-b border-gray-300 outline-none bg-transparent focus:border-orange-500"
            />
          </div>

          {/* Description */}
          <div className="flex items-center justify-between pt-4">
            <label className="text-sm text-gray-700 w-[100px]">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-[138px] flex-1 border-b border-gray-300 outline-none bg-transparent focus:border-orange-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8">
          <button
            onClick={handleSave}
            className="w-full py-2 rounded-lg bg-green-100 text-green-700 text-sm font-semibold hover:bg-green-200 transition duration-150 shadow-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;

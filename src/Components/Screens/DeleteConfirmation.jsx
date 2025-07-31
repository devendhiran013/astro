import React, { useState } from "react";
import { X } from "lucide-react"; // Make sure you have `lucide-react` installed

export default function DeleteConfirmation({ onClose }) {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSave = () => {
    console.log("Saved:", { heading, description, imageFile });
  };

  const handleDelete = () => {
    setHeading("");
    setDescription("");
    setImageFile(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="w-[320px] p-6 rounded-xl bg-white shadow-md space-y-4 relative ">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>

        {/* Delete Button */}
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 text-sm text-red-700 bg-red-100 px-3 py-1.5 rounded-full"
          >
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            Delete
          </button>
        </div>

        {/* Heading Input */}
        <div className="flex items-center gap-3 pt-4">
          <label className="text-sm font-medium text-black w-24">Heading</label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="flex-1 border-b border-black bg-transparent outline-none"
          />
        </div>

        {/* Description Input */}
        <div className="flex items-center gap-3 mt-4 pt-4">
          <label className="text-sm font-medium text-black w-24">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-1 border-b border-black bg-transparent outline-none"
          />
        </div>

        {/* Image Upload */}
        <div className="flex items-center gap-3 mt-6 pt-4">
          <label className="text-sm font-medium text-black w-24">Image</label>
          <label className="min-w-[200px] flex-1 bg-gray-200 text-gray-700 px-5 py-1.5 rounded-[10px] cursor-pointer text-sm text-center">
            Upload File
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            className="w-full py-2 rounded-full bg-green-100 text-green-800 font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

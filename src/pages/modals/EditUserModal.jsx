import React, { useEffect, useState } from "react";

const initialState = {
  name: "",
  dateOfBirth: "",
  phoneNumber: "",
  birthPlace: "",
};

const EditUser = ({ user, onSave, onDelete, onClose }) => {
  const [formData, setFormData] = useState(initialState);

  /* =========================
     SYNC USER → FORM
  ========================= */
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        dateOfBirth: user.dateOfBirth || "",
        phoneNumber: user.phoneNumber || "",
        birthPlace: user.birthPlace || "",
      });
    }
  }, [user]);

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave({
      ...formData,
      _id: user._id,
    });
  };

  const handleDelete = () => {
    onDelete(user._id);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
      >
        ✕
      </button>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Edit User Data</h2>

        <button
          onClick={handleDelete}
          className="flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm"
        >
          <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
          Delete
        </button>
      </div>

      {/* Avatar */}
      <div className="flex items-center mb-6">
        <img
          src="https://placehold.co/60x60/cccccc/ffffff?text=User"
          alt="User"
          className="w-16 h-16 rounded-full"
        />
      </div>

      {/* FORM */}
      <div className="space-y-6">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border-b-2 text-lg outline-none"
        />

        <input
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          placeholder="Date of Birth"
          className="w-full border-b-2 text-lg outline-none"
        />

        <input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border-b-2 text-lg outline-none"
        />

        <input
          name="birthPlace"
          value={formData.birthPlace}
          onChange={handleChange}
          placeholder="Birth Place"
          className="w-full border-b-2 text-lg outline-none"
        />

        <button
          onClick={handleSave}
          className="w-full py-3 bg-green-100 text-green-700 rounded-full font-semibold text-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditUser;

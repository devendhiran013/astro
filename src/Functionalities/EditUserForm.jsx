import React, { useEffect, useState } from "react";

export default function EditUserForm({ user, onSave, onDelete, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    dateOfBirth: "",
    birthPlace: "",
  });

  // ✅ THIS IS THE FIX
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
        dateOfBirth: user.dateOfBirth || "",
        birthPlace: user.birthPlace || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave({
      ...user,
      ...formData,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[420px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Edit User Data</h2>
        <button onClick={onClose}>✕</button>
      </div>

      {/* NAME */}
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border-b mb-4 p-2"
        placeholder="Name"
      />

      {/* DATE OF BIRTH */}
      <input
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        className="w-full border-b mb-4 p-2"
        placeholder="Date of Birth"
      />

      {/* PHONE */}
      <input
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        className="w-full border-b mb-4 p-2"
        placeholder="Phone Number"
      />

      {/* PLACE */}
      <input
        name="birthPlace"
        value={formData.birthPlace}
        onChange={handleChange}
        className="w-full border-b mb-6 p-2"
        placeholder="Birth Place"
      />

      <div className="flex justify-between">
        <button
          onClick={onDelete}
          className="text-red-600"
        >
          Delete
        </button>

        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-6 py-2 rounded-full"
        >
          Save
        </button>
      </div>
    </div>
  );
}

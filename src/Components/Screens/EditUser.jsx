import React, { useState, useEffect } from 'react';

// The EditUserForm component now accepts 'user' data and an 'onClose' prop.
const EditUserForm = ({ user, onClose }) => {
  // State variables for form fields, initialized with user data or empty strings
  const [userName, setUserName] = useState('');
  const [date, setDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  // Use useEffect to update form fields when the 'user' prop changes
  useEffect(() => {
    if (user) {
      setUserName(user.name || '');
      setDate(user.date || '');
      setPhoneNumber(user.phone || '');
      setAdditionalInfo(user.status || ''); // Assuming 'status' maps to 'Gobi'
    }
  }, [user]); // Re-run this effect whenever the 'user' prop changes

  // Handler for Delete button click
  const handleDelete = () => {
    console.log('Delete button clicked for user:', userName);
    // Implement delete logic here (e.g., show confirmation, call API)
    // After deletion, you might want to close the form: onClose();
  };

  // Handler for Save button click
  const handleSave = () => {
    console.log('Save button clicked!');
    console.log('Updated User Data:', { userName, date, phoneNumber, additionalInfo });
    // Implement save logic here (e.g., validate, call API)
    // After saving, you might want to close the form: onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-transparent rounded-full p-1 text-gray-600 hover:text-gray-900 focus:outline-none"
        aria-label="Close form"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Edit User Data</h2>
        <button
          onClick={handleDelete}
          className="flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-full font-medium text-sm
                     hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
        >
          <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
          Delete
        </button>
      </div>

      {/* User Profile Image and Info */}
      <div className="flex items-center mb-6">
        {/* Placeholder for user image */}
        <img
          src="https://placehold.co/60x60/cccccc/ffffff?text=User"
          alt="User Profile"
          className="w-16 h-16 rounded-full mr-4 object-cover"
        />
      </div>

      {/* Form Fields */}
      <form className="space-y-6">
        {/* Name Field */}
        <div>
          <input
            type="text"
            id="userName"
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none pb-1 text-lg font-medium text-gray-900"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            aria-label="User Name"
          />
        </div>

        {/* Date Field */}
        <div>
          <input
            type="text" // Can be type="date" if a date picker is desired
            id="date"
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none pb-1 text-lg font-medium text-gray-900"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Date"
          />
        </div>

        {/* Phone Number Field */}
        <div>
          <input
            type="text" // Can be type="tel" for phone numbers
            id="phoneNumber"
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none pb-1 text-lg font-medium text-gray-900"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            aria-label="Phone Number"
          />
        </div>

        {/* Additional Info Field (labeled "Gobi" in image) */}
        <div>
          <input
            type="text"
            id="additionalInfo"
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none pb-1 text-lg font-medium text-gray-900"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            aria-label="Additional Information"
          />
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3 bg-green-100 text-green-700 rounded-full font-semibold text-lg
                       hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors shadow-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;

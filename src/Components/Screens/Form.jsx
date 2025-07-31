import React, { useState } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import { IoCalendarOutline} from "react-icons/io5";
import { HiMiniMicrophone } from "react-icons/hi2";
export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthMonth: '',
    birthPlace: '',
    motherName: '',
    educationWork: '',
    marriageDetails: '',
    children: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="space-y-4">
        {/* Name */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700 flex-shrink-0">
            பெயர்
          </label>
          <span className="mx-2">:</span>
          <div className="flex-1 border-b-2 border-yellow-400">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full border-none outline-none bg-transparent pb-1"
            />
          </div>
        </div>

        {/* Birth Date */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700 flex-shrink-0">
            பிறந்த தேதி
          </label>
          <span className="mx-2">:</span>
          <div className="flex-1 border-b-2 border-yellow-400">
            <input
              type="text"
              value={formData.birthDate}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
              className="w-full border-none outline-none bg-transparent pb-1"
            />
          </div>
        </div>

        {/* Birth Month */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700 flex-shrink-0">
            பிறந்த மாதம்
          </label>
          <span className="mx-2">:</span>
          <div className="flex-1 border-b-2 border-yellow-400">
            <input
              type="text"
              value={formData.birthMonth}
              onChange={(e) => handleInputChange('birthMonth', e.target.value)}
              className="w-full border-none outline-none bg-transparent pb-1"
            />
          </div>
        </div>

        {/* Birth Place */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700 flex-shrink-0">
            பிறந்த இடம்
          </label>
          <span className="mx-2">:</span>
          <div className="flex-1 border-b-2 border-yellow-400">
            <input
              type="text"
              value={formData.birthPlace}
              onChange={(e) => handleInputChange('birthPlace', e.target.value)}
              className="w-full border-none outline-none bg-transparent pb-1"
            />
          </div>
        </div>

        {/* Mother's Name */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700 flex-shrink-0">
            மொழியல் எண்
          </label>
          <span className="mx-2">:</span>
          <div className="flex-1 border-b-2 border-yellow-400">
            <input
              type="text"
              value={formData.motherName}
              onChange={(e) => handleInputChange('motherName', e.target.value)}
              className="w-full border-none outline-none bg-transparent pb-1"
            />
          </div>
        </div>

        {/* Education/Work */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700 flex-shrink-0">
            ஜாதகம் பார்க்க விருப்பும் நாள்
          </label>
          <span className="mx-2">:</span>
          <div className="flex-1 flex items-center">
            <div className="w-8 h-8 rounded flex items-center justify-center">
              <IoCalendarOutline className=" w-6 h-6 text-yellow-400 b-2" />
            </div>
          </div>
        </div>

        {/* Marriage Details */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700 flex-shrink-0">
            தொனைப்பட்டும் மேஜரம்
          </label>
          <span className="mx-2">:</span>
          <div className="flex-1 flex items-center">
            <div className="w-8 h-8  rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700 flex-shrink-0">
            கேள்விகள்
          </label>
          <span className="mx-2">:</span>
          <div className="flex-1 flex items-center">
            <div className="w-8 h-8  rounded flex items-center justify-center">
              <HiMiniMicrophone className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
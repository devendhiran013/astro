import React, { useState, useEffect } from 'react';
import { IoCalendarOutline } from "react-icons/io5";
import { Clock, Upload, Trash2, SendHorizonal } from "lucide-react";
import { HiMiniMicrophone } from "react-icons/hi2";
import axios from "axios";

export default function Form({ data, onClose, onDataUpdate }) {

  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    birthPlace: "",
    phoneNumber: "",
    serviceDate: "",
    timeslot: "",
    questions: "",
    patilgal: []
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        birthDate: data.dateOfBirth ? data.dateOfBirth.slice(0, 10) : "",
        birthPlace: data.birthPlace || "",
        phoneNumber: data.phoneNumber || "",
        serviceDate: data.serviceDate ? data.serviceDate.slice(0, 10) : "",
        timeslot: data.timeslot ? data.timeslot.join(", ") : "",
        questions: data.questions ? data.questions.join(", ") : "",
        patilgal: data.files || [] // Existing uploaded files from backend
      });
    }
  }, [data]);

  /* ---------------------- FILE UPLOAD ---------------------- */
  const handlePatilgalUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    let uploadedFiles = [];

    for (let file of files) {
      const form = new FormData();
      form.append("file", file);
      form.append("type", "inbox");

      try {
        const uploadRes = await axios.post(
          "http://localhost:5000/admin/file-upload",
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `JWT ${localStorage.getItem("adminToken")}`,
            },
          }
        );

        // 🔥 Save to inbox immediately
        const inboxRes = await axios.post(
          "http://localhost:5000/admin/inbox",
          {
            userId: data.customerId,
            onlineServiceId: data._id,
            title: file.name,
            url: uploadRes.data.url,
            type: file.type
          },
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem("adminToken")}`,
            },
          }
        );

        uploadedFiles.push(inboxRes.data.data);

      } catch (err) {
        console.error("Upload Failed:", err);
      }
    }

    // Update UI with real backend IDs
    setFormData(prev => ({
      ...prev,
      patilgal: [...prev.patilgal, ...uploadedFiles]
    }));

    // refresh parent
    onDataUpdate();
  };


  /* ---------------------- DELETE FILE ---------------------- */
  const deletePatilgalItem = async (index) => {
    const file = formData.patilgal[index];

    if (!file?._id) return;

    try {
      // Delete from backend
      await axios.delete(
        `http://localhost:5000/admin/inbox/${file._id}`,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      // Remove from UI
      setFormData(prev => ({
        ...prev,
        patilgal: prev.patilgal.filter((_, i) => i !== index),
      }));

      // 🔥 Tell parent to refresh service details from backend
      if (onDataUpdate) onDataUpdate();

    } catch (err) {
      console.error("Delete error:", err);
    }
  };




  /* ---------------------- SEND BUTTON CLICK ---------------------- */
  const handleSend = () => {
    onClose();
  };



  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="space-y-4">

        {/* Name */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700">பெயர்</label>
          <span className="mx-2">:</span>
          <div className="flex-1 border-b-2 border-yellow-400">
            <input
              type="text"
              value={formData.name}
              readOnly
              className="w-full border-none outline-none bg-transparent pb-1"
            />
          </div>
        </div>

        {/* Birth Date */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700">பிறந்த தேதி</label>
          <span className="mx-2">:</span>
          <div className="flex-1 border-b-2 border-yellow-400">
            <input
              type="text"
              value={formData.birthDate}
              readOnly
              className="w-full border-none outline-none bg-transparent pb-1"
            />
          </div>
        </div>

        {/* Birth Place */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700">பிறந்த இடம்</label>
          <span className="mx-2">:</span>
          <div className="flex-1 border-b-2 border-yellow-400">
            <input
              type="text"
              value={formData.birthPlace}
              readOnly
              className="w-full border-none outline-none bg-transparent pb-1"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700">மொழியல் எண்</label>
          <span className="mx-2">:</span>
          <div className="flex-1 border-b-2 border-yellow-400">
            <input
              type="text"
              value={formData.phoneNumber}
              readOnly
              className="w-full border-none outline-none bg-transparent pb-1"
            />
          </div>
        </div>

        {/* Service Date */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700">ஜாதகம் பார்க்க விருப்பும் நாள்</label>
          <span className="mx-2">:</span>
          <div className="flex-1 flex items-center gap-2">
            <IoCalendarOutline className="w-6 h-6 text-yellow-400" />
            {formData.serviceDate}
          </div>
        </div>

        {/* Timeslot */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700">தொனைப்பட்டும் மேஜரம்</label>
          <span className="mx-2">:</span>
          <div className="flex-1 flex items-center gap-2">
            <Clock className="w-6 h-6 text-yellow-400" />
            {formData.timeslot}
          </div>
        </div>

        {/* Questions (Audio Player) */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700">கேள்விகள்</label>
          <span className="mx-2">:</span>

          <div className="flex-1 flex flex-col gap-1">
            {Array.isArray(data?.questions) && data.questions.length > 0 ? (
              data.questions.map((q, i) => (
                <audio key={i} controls src={q} className="w-48" />
              ))
            ) : (
              <span className="text-gray-500">No audio found</span>
            )}
          </div>
        </div>

        {/* Pattigal Upload */}
        <div className="flex items-center">
          <label className="w-32 text-sm font-medium text-gray-700">பதில்கள்</label>
          <span className="mx-2">:</span>

          <div className="flex-1">

            {/* Upload Button */}
            <label className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer bg-white shadow-sm hover:bg-gray-50">
              <Upload size={16} />
              <span>Upload</span>
              <input type="file" multiple onChange={handlePatilgalUpload} className="hidden" />
            </label>

            {/* File Names List */}
            <div className="mt-3 space-y-2">
              {formData.patilgal.map((file, index) => {
                const fileName =
                  file?.fileName ||
                  (file?.url ? file.url.split("/").pop() : "Unnamed File");

                return (
                  <div key={index} className="flex items-center gap-3 text-sm">

                    {/* File Name */}
                    <span className="text-gray-700">{fileName}</span>

                    {/* Delete Bin */}
                    <Trash2
                      size={18}
                      onClick={() => deletePatilgalItem(index)}
                      className="text-red-600 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>



          </div>
        </div>

        {/* SEND BUTTON */}
        <button
          onClick={handleSend}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <SendHorizonal size={18} />
          Send
        </button>

      </div>
    </div>
  );
}

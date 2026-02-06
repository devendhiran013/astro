import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

const NewsEditModal = ({ newsItem, onSave, onDelete, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);

  const [imageUrl, setImageUrl] = useState(""); // only URL
  const [uploading, setUploading] = useState(false);

  /* Load existing data */
  useEffect(() => {
    if (newsItem) {
      setTitle(newsItem.title || "");
      setDescription(newsItem.description || "");
      setIsEnabled(newsItem.isEnabled ?? true);
      setImageUrl(newsItem.image || ""); // keep only name
    }
  }, [newsItem]);

  /* Upload new image */
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "news");

      const res = await axios.post(
        "http://localhost:5000/admin/file-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `JWT ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      setImageUrl(res.data.url); // replace with new file URL
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }

    setUploading(false);
  };

  /* Delete Image (UI only) */
  const handleDeleteImage = () => {
    setImageUrl("");
  };

  /* Save Handler */
  const handleSave = () => {
    onSave({
      ...newsItem,
      title,
      description,
      isEnabled,
      image: imageUrl,
      thumbnail: imageUrl, // backend uses thumbnail
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-xl p-6 shadow-lg relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-6">Edit News</h2>

        {/* IMAGE NAME ONLY */}
        <div className="mb-4">
          <label className="block text-sm mb-2 text-gray-600">Image</label>

          {imageUrl ? (
            <div className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
              <span className="text-blue-600 underline">
                {imageUrl.split("/").pop()}
              </span>

              <Trash2
                size={18}
                className="text-red-500 cursor-pointer"
                onClick={handleDeleteImage}
              />
            </div>
          ) : (
            <p className="text-gray-500">No image uploaded</p>
          )}

          {/* Upload Button */}
          <label className="mt-3 inline-block px-4 py-2 border rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            Upload New Image
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>

          {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Heading</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Status */}
        <div className="mb-6 flex items-center gap-2">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => setIsEnabled(e.target.checked)}
          />
          <span className="text-sm">Active</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onDelete}
            className="px-4 py-2 text-red-600 border border-red-200 rounded-lg"
          >
            Delete
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default NewsEditModal;

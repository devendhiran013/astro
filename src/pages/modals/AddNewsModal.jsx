import { useState } from "react";
import axios from "axios";

const AddNewsModal = ({ onClose, onSaved }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  /* Upload image */
  const handleUpload = async (e) => {
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

      setImageUrl(res.data.url);
    } catch (err) {
      alert("Upload Failed!");
      console.error(err);
    }

    setUploading(false);
  };

  /* Save */
  const handleSave = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/admin/news",
        {
          title,
          description,
          thumbnail: imageUrl,
          newsDate: new Date(),
        },
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      onSaved(res.data.data);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create news");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-xl p-6 shadow-lg relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-6">Add News</h2>

        {/* Image Name */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-600">Image</label>

          {imageUrl ? (
            <p className="text-blue-600 underline">{imageUrl.split("/").pop()}</p>
          ) : (
            <p className="text-gray-400">No image uploaded</p>
          )}

          <label className="mt-2 inline-block px-4 py-2 border rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            Upload Image
            <input type="file" className="hidden" onChange={handleUpload} />
          </label>

          {uploading && (
            <p className="text-sm text-gray-500">Uploading...</p>
          )}
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-600">Heading</label>
          <input
            className="w-full border px-3 py-2 rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-600">Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded-lg"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <button
          className="w-full bg-green-600 text-white py-2 rounded-lg"
          onClick={handleSave}
        >
          Save
        </button>

      </div>
    </div>
  );
};

export default AddNewsModal;

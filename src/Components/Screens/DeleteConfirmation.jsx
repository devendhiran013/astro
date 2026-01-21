import { useEffect, useState } from "react";

const NewsEditModal = ({ newsItem, onSave, onDelete, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);

  /* =========================
     SYNC DATA ON OPEN
  ========================= */
  useEffect(() => {
    if (newsItem) {
      setTitle(newsItem.title || "");
      setDescription(newsItem.description || "");
      setIsEnabled(newsItem.isEnabled ?? true);
    }
  }, [newsItem]);

  const handleSave = () => {
    onSave({
      ...newsItem,
      title,
      description,
      isEnabled,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-xl p-6 shadow-lg relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-6">Edit News</h2>

        {/* TITLE */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Heading
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* STATUS */}
        <div className="mb-6 flex items-center gap-2">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => setIsEnabled(e.target.checked)}
          />
          <span className="text-sm">Active</span>
        </div>

        {/* ACTIONS */}
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

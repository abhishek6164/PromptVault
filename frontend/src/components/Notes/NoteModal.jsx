import { useState, useRef } from "react";
import { X, Maximize2, Minimize2, Heart, Upload, Save } from "lucide-react";

export function NoteModal({ note, isOpen, onClose, onUpdate }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.description);
  const [isFavorite, setIsFavorite] = useState(note.isFavorite || false);
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(note.image);

  if (!isOpen) return null;

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleSave = () => {
    onUpdate({
      ...note,
      description: editedContent,
      image: previewImage,
      isFavorite,
    });
    setIsEditing(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isFullscreen ? "" : "bg-black bg-opacity-50"}`}
    >
      <div
        className={`bg-white rounded-lg shadow-xl overflow-hidden ${isFullscreen ? "fixed inset-0" : "w-full max-w-2xl"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Note Details</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Heart
                className={`${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`}
                size={20}
              />
            </button>
            <button
              onClick={handleFullscreenToggle}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              {isFullscreen ? (
                <Minimize2 className="text-gray-500" size={20} />
              ) : (
                <Maximize2 className="text-gray-500" size={20} />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="text-gray-500" size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <span className="text-sm text-gray-500">{note.date}</span>
            {note.duration && (
              <span className="ml-4 text-sm text-gray-500">
                Duration: {note.duration}
              </span>
            )}
          </div>
          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full h-40 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <p className="text-gray-700 whitespace-pre-wrap">
              {note.description}
            </p>
          )}
          {/* Image Preview */}
          {previewImage && (
            <img
              src={previewImage}
              alt="Note attachment"
              className="mt-4 max-w-full h-auto rounded-lg"
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t bg-gray-50">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Upload size={20} />
            <span>Upload Image</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Save size={20} />
                <span>Save</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

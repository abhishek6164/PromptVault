import { useState, useRef, useEffect } from "react";
import { X, Maximize2, Minimize2, Upload, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function NoteModal({ note, isOpen, onClose, onUpdate }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (note) {
      setEditedContent(note.description || "");
      setPreviewImage(note.image || "");
    }
  }, [note]);

  if (!isOpen || !note) return null;

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

 const handleImageUpload = (event) => {
  const file = event.target.files?.[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result); // Base64 string
    };
    reader.readAsDataURL(file);
  }
};
  

  const handleSave = () => {
    const updatedNote = {
      ...note,
      description: editedContent,
      image: previewImage,
    };
    onUpdate(updatedNote);
    setIsEditing(false);
  };

  const handleClose = () => {
    setIsEditing(false);
    setIsFullscreen(false);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300 ${
        isFullscreen ? "" : "bg-black/40"
      }`}
    >
      <div
        className={`bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-in-out ${
          isFullscreen
            ? "fixed inset-0 scale-100"
            : "w-full max-w-3xl scale-95 hover:scale-100"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200/80">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              {note.title || "Untitled Note"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleFullscreenToggle}
              className="p-2.5 hover:bg-gray-100/80 rounded-xl transition-all duration-200"
            >
              {isFullscreen ? (
                <Minimize2
                  className="text-gray-500 transform transition-transform hover:scale-110"
                  size={22}
                />
              ) : (
                <Maximize2
                  className="text-gray-500 transform transition-transform hover:scale-110"
                  size={22}
                />
              )}
            </button>
            <button
              onClick={handleClose}
              className="p-2.5 hover:bg-red-50 rounded-xl transition-all duration-200"
            >
              <X
                className="text-red-500 transform transition-transform hover:scale-110"
                size={22}
              />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="mb-6 flex flex-wrap gap-4">
            {note.duration && (
              <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                Duration: {note.duration}
              </span>
            )}
          </div>
          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full min-h-[200px] p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-y"
              placeholder="Enter your note..."
            />
          ) : (
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {note.description || "No description available."}
            </p>
          )}

          {/* Image Preview */}
          {previewImage && (
            <div className="mt-6 relative group">
              <img
                src={previewImage}
                alt="Note attachment"
                className="transition-transform duration-300 w-[10%] h-[15%] rounded-xl shadow-lg group-hover:scale-[1.02]"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-t border-gray-200/80 bg-gray-50/80">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-gray-700 bg-white hover:bg-gray-100 rounded-xl shadow-sm transition-all duration-200 hover:shadow"
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
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1 sm:flex-none px-5 py-2.5 text-gray-700 bg-white hover:bg-gray-100 rounded-xl shadow-sm transition-all duration-200 hover:shadow"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
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

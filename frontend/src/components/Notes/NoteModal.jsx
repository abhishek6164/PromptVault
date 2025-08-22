import { useState, useEffect } from "react";

export function NoteModal({ note, onClose, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // jab modal open ho tab note data set ho jaaye
  useEffect(() => {
    if (note) {
      setEditedTitle(note.title || "");
      setEditedContent(note.description || "");
      setPreviewImage(note.image || "");
    }
  }, [note]);

  // image change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  // save handler
  const handleSave = async () => {
    try {
      const updatedNote = {
        ...note,
        title: editedTitle,
        description: editedContent,
        image: previewImage,
      };

      const res = await fetch(`http://localhost:5000/api/notes/${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedNote),
      });

      const data = await res.json();

      if (res.ok) {
        onUpdate(data.note); // parent ko updated note bhejna
        setIsEditing(false);
        onClose(); // save ke baad modal band ho jaaye
      } else {
        console.error("❌ Update failed:", data.message);
      }
    } catch (err) {
      console.error("❌ Error updating note:", err);
    }
  };

  if (!note) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl w-[600px] p-6 relative">
        {/* Title */}
        {isEditing ? (
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-3 border rounded-xl mb-4"
            placeholder="Enter title..."
          />
        ) : (
          <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
        )}

        {/* Description */}
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-3 border rounded-xl mb-4"
            placeholder="Enter description..."
            rows="5"
          />
        ) : (
          <p className="mb-4">{note.description}</p>
        )}

        {/* Image */}
        {previewImage && (
          <img
            src={previewImage}
            alt="Note"
            className="w-full h-64 object-cover rounded-xl mb-4"
          />
        )}

        {isEditing && (
          <input type="file" accept="image/*" onChange={handleImageChange} />
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Edit
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

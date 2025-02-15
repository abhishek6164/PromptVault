import React from "react";
import { Play, Clipboard, Trash, Heart } from "lucide-react";

export const AudioNoteCard = React.memo(function AudioNoteCard({
  isNew = false,
  date,
  duration,
  title,
  color = "#000000",
  image,
  isFavorite = false,
  onClick,
  onDelete,
  onToggleFavorite,
}) {
  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard
      .writeText(title)
      .then(() => alert("Note copied to clipboard!"));
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this note?")) {
      onDelete();
    }
  };

  return (
    <div
      className="min-w-[270px] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4 cursor-pointer bg-white"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {isNew && (
            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
              NEW
            </span>
          )}
          <span className="text-gray-500 text-sm">{date}</span>
        </div>

        {duration && (
          <div className="flex items-center gap-2">
            <Play size={16} className="text-gray-600" />
            <span className="font-medium text-sm">{duration}</span>
          </div>
        )}
      </div>

      <h3 className="font-bold mb-2" style={{ color }}>
        {title}
      </h3>

      {image && (
        <img
          src={image}
          alt="Note attachment"
          className="w-full h-40 object-cover rounded-lg"
        />
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2">
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Copy note"
            onClick={handleCopy}
          >
            <Clipboard size={18} className="text-gray-600" />
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Toggle favorite"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
          >
            <Heart
              size={18}
              className={`${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </button>
        </div>

        <button
          className="p-2 hover:bg-red-100 rounded-full transition-colors duration-200"
          aria-label="Delete note"
          onClick={handleDelete}
        >
          <Trash size={18} className="text-red-600" />
        </button>
      </div>
    </div>
  );
});

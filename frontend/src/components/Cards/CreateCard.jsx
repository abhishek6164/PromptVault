import React, { useState, useEffect } from "react";
import { Play, Clipboard, Trash, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CreateCard = React.memo(function CreateCard({
  id, // Add id prop
  isNew = false,
  date,
  duration,
  title,
  description,
  color = "#000000",
  image,
  isFavorite = false,
  onClick,
  onDelete,
  onToggleFavorite,
}) {
  const [isFav, setIsFav] = useState(isFavorite);
  const navigate = useNavigate();

  // Update isFav when isFavorite prop changes
  useEffect(() => {
    setIsFav(isFavorite);
  }, [isFavorite]);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(title);
      alert("Note copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("Failed to copy to clipboard");
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this note?")) {
      if (onDelete) {
        onDelete(id); // Pass id to onDelete
      }
    }
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    const newFavState = !isFav;
    setIsFav(newFavState);

    if (onToggleFavorite) {
      const uniqueKey = newFavState ? `fav-${id}-${Date.now()}` : null;
      onToggleFavorite(id, uniqueKey);
    }
  };

  return (
    <div
      className="min-w-[270px] rounded-xl hover:shadow-md  duration-200 p-4 cursor-pointer  "
      onClick={() => onClick(id)} // Pass id to onClick
      role="button"
      tabIndex={0}
      key={id} // Add key prop
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
        {title || "Untitled Note"}
      </h3>

      {description && (
        <p className="text-gray-600 mb-3 line-clamp-2" style={{ color }}>
          {description}
        </p>
      )}

      {image && (
        <div className="w-full h-40 overflow-hidden rounded-lg">
          <img
            src={image}
            alt="Note attachment"
            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
            onError={(e) => {
              e.target.src = "fallback-image-url"; // Add a fallback image URL
              console.error("Failed to load image");
            }}
          />
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2">
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Copy note"
            onClick={handleCopy}
            type="button"
          >
            <Clipboard size={18} className="text-gray-600" />
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Toggle favorite"
            onClick={handleFavorite}
            type="button"
          >
            <Heart
              size={18}
              className={`${isFav ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </button>
        </div>

        <button
          className="p-2 hover:bg-red-100 rounded-full transition-colors duration-200"
          aria-label="Delete note"
          onClick={handleDelete}
          type="button"
        >
          <Trash size={18} className="text-red-600" />
        </button>
      </div>
    </div>
  );
});

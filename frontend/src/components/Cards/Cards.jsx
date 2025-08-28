import { useState, useEffect } from "react";
import { CreateCard } from "./CreateCard";
import { NoteModal } from "../Notes/NoteModal";

export function Cards({ notes, onUpdateNote, onDeleteNote }) {
  const [selectedNote, setSelectedNote] = useState(null);
  const [displayedNotes, setDisplayedNotes] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");

  // ✅ Logged-in user fetch from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  // ✅ Parent se aaye notes ko sync karo (sirf first time ya jab parent actually change kare)
  useEffect(() => {
    if (notes && notes.length > 0) {
      const notesWithKeys = notes.map((note) => {
        const uniqueId = note._id || note.id;
        return {
          ...note,
          searchKey: `${note.title || "untitled"}-${uniqueId}`.toLowerCase(),
        };
      });
      setDisplayedNotes(notesWithKeys);
    } else {
      setDisplayedNotes([]);

    }
  }, [notes]);

  // ✅ Open modal
  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  // ✅ Close modal
  const handleCloseModal = () => {
    setSelectedNote(null);
  };

  // ✅ Update note without refresh
  const handleUpdateNote = (updatedNote) => {
    const uniqueId = updatedNote._id || updatedNote.id;

    setDisplayedNotes((prev) =>
      prev.map((note) =>
        (note._id || note.id) === uniqueId
          ? {
            ...updatedNote,
            searchKey: `${updatedNote.title || "untitled"}-${uniqueId}`.toLowerCase(),
          }
          : note
      )
    );

    // parent ko bhi notify kar (agar API call karna hai)
    onUpdateNote?.(updatedNote);

    setSelectedNote(null); // modal band
  };

  // ✅ Delete note without refresh
  const handleDeleteNote = (id) => {
    setDisplayedNotes((prev) =>
      prev.filter((note) => (note._id || note.id) !== id)
    );

    onDeleteNote?.(id);
  };

  // ✅ Toggle favorite (local + parent notify)
  const handleToggleFavorite = (noteId) => {
    setDisplayedNotes((prev) =>
      prev.map((note) =>
        (note._id || note.id) === noteId
          ? { ...note, isFavorite: !note.isFavorite }
          : note
      )
    );
    onUpdateNote?.({ id: noteId, toggleFavorite: true }); // parent ko inform
  };

  return (
    <div className="rounded-2xl mt-3 overflow-hidden p-6 sm:p-8 md:p-10 duration-300 scrollbar-hide">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 overflow-y-auto h-[calc(100vh-300px)] min-h-[500px] max-h-[800px] scrollbar-hide pb-20">
        {displayedNotes.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center h-full">
            <h1 className="text-gray-400 text-2xl font-medium animate-pulse font-semibold">
              Welcome,
              <span className="text-gray-800 font-medium">
                {" "}
                {loggedInUser || "Guest"}
              </span>
            </h1>
            <p className="text-gray-400 text-lg font-medium animate-pulse">
              No Prompt available. Start Creating...
            </p>
          </div>
        ) : (
          displayedNotes.map((note) => (
            <div key={note.searchKey} className="relative">
              <CreateCard
                {...note}
                onClick={() => handleNoteClick(note)}
                onDelete={() => handleDeleteNote(note._id || note.id)}
                onToggleFavorite={() => handleToggleFavorite(note._id || note.id)}
              />
            </div>
          ))
        )}
      </div>

      {/* ✅ Modal properly connected */}
      {selectedNote && (
        <NoteModal
          note={selectedNote}
          isOpen={true}
          onClose={handleCloseModal}
          onUpdate={handleUpdateNote}
        />
      )}
    </div>

  )
}
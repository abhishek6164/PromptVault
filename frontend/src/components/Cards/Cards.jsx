import { useState, useEffect } from "react";
import { CreateCard } from "./CreateCard";
import { NoteModal } from "../Notes/NoteModal";

export function Cards({ notes, onUpdateNote, onDeleteNote }) {
  const [selectedNote, setSelectedNote] = useState(null);
  const [displayedNotes, setDisplayedNotes] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");

  // Fetch logged-in user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  // Update displayed notes whenever notes prop changes
  useEffect(() => {
    if (notes && notes.length > 0) {
      const notesWithSearchKeys = notes.map((note) => {
        const uniqueId = note._id || note.id; // ✅ safe unique id
        return {
          ...note,
          searchKey: `${note.title || "untitled"}-${uniqueId}`.toLowerCase(),
        };
      });
      setDisplayedNotes(notesWithSearchKeys);
    } else {
      setDisplayedNotes([]);
    }
  }, [notes]);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleCloseModal = () => {
    setSelectedNote(null);
  };

  const handleUpdateNote = (updatedNote) => {
    const uniqueId = updatedNote._id || updatedNote.id;
    const updatedNoteWithKey = {
      ...updatedNote,
      searchKey: `${updatedNote.title || "untitled"}-${uniqueId}`.toLowerCase(),
    };

    const updatedNotes = displayedNotes.map((note) =>
      (note._id || note.id) === uniqueId ? updatedNoteWithKey : note
    );
    setDisplayedNotes(updatedNotes);
    onUpdateNote && onUpdateNote(updatedNoteWithKey);
    setSelectedNote(null);
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = displayedNotes.filter(
      (note) => (note._id || note.id) !== id
    );
    setDisplayedNotes(updatedNotes);
    onDeleteNote && onDeleteNote(id);
  };

  const handleToggleFavorite = (noteId, uniqueKey) => {
    const updatedNotes = displayedNotes.map((note) => {
      const currentId = note._id || note.id;
      if (currentId === noteId) {
        return {
          ...note,
          isFavorite: !note.isFavorite,
          favoriteKey: uniqueKey || note.favoriteKey,
        };
      }
      return note;
    });

    setDisplayedNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
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
                searchKey={note.searchKey}
                onClick={() => handleNoteClick(note)}
                onDelete={() => handleDeleteNote(note._id || note.id)}
                onToggleFavorite={() => handleToggleFavorite(note._id || note.id)}
              />
            </div>
          ))
        )}
      </div>

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          isOpen={true}
          onClose={handleCloseModal}
          onUpdate={handleUpdateNote}
        />
      )}
    </div>
  );
}

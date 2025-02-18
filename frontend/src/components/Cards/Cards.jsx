import { useState, useEffect } from "react";
import { CreateCard } from "./CreateCard";
import { NoteModal } from "../Notes/NoteModal";

export function Cards({ notes, onUpdateNote, onDeleteNote }) {
  const [selectedNote, setSelectedNote] = useState(null);
  const [displayedNotes, setDisplayedNotes] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(""); // Fixed variable name

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
      const notesWithSearchKeys = notes.map((note) => ({
        ...note,
        searchKey: `${note.title || ""}-${note.id}`.toLowerCase(),
      }));
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
    const newSearchKey =
      `${updatedNote.title || ""}-${updatedNote.id}`.toLowerCase();
    const updatedNoteWithKey = {
      ...updatedNote,
      searchKey: newSearchKey,
    };

    const updatedNotes = displayedNotes.map((note) =>
      note.id === updatedNote.id ? updatedNoteWithKey : note
    );
    setDisplayedNotes(updatedNotes);
    onUpdateNote && onUpdateNote(updatedNoteWithKey);
    setSelectedNote(null);
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = displayedNotes.filter((note) => note.id !== id);
    setDisplayedNotes(updatedNotes);
    onDeleteNote && onDeleteNote(id);
  };

  const handleToggleFavorite = (noteId, uniqueKey) => {
    const updatedNotes = displayedNotes.map((note) => {
      if (note.id === noteId) {
        const updatedNote = {
          ...note,
          isFavorite: !note.isFavorite,
          favoriteKey: uniqueKey || note.favoriteKey,
        };

        return updatedNote;
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
            <h1 className="text-gray-400 text-2xl font-medium animate-pulse font-semibold ">
              Welcome,
              <span className="text-gray-800  font-medium ">
                {" "}
                {loggedInUser || "Guest"}
              </span>
            </h1>
            <p className="text-gray-400 text-lg font-medium animate-pulse">
              No notes available. Start typing...
            </p>
          </div>
        ) : (
          displayedNotes.map((note) => (
            <div key={note.searchKey} className="relative">
              <CreateCard
                {...note}
                searchKey={note.searchKey}
                onClick={() => handleNoteClick(note)}
                onDelete={() => handleDeleteNote(note.id)}
                onToggleFavorite={() => handleToggleFavorite(note.id)}
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

import { useState, useEffect } from "react";
import { CreateCard } from "./CreateCard";
import { NoteModal } from "../Notes/NoteModal";

export function Cards({ notes, onUpdateNote, onDeleteNote }) {
  const [selectedNote, setSelectedNote] = useState(null);
  const [displayedNotes, setDisplayedNotes] = useState([]);

  // Update displayed notes whenever notes prop changes
  useEffect(() => {
    if (notes && notes.length > 0) {
      // Add a unique searchKey to each note that includes title and id
      const notesWithSearchKeys = notes.map((note) => ({
        ...note,
        searchKey: `${note.title || ""}-${note.id}`.toLowerCase(), // Corrected template literal syntax
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
    // Update the searchKey when note is updated
    const newSearchKey =
      `${updatedNote.title || ""}-${updatedNote.id}`.toLowerCase(); // Corrected template literal syntax
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
          favoriteKey: uniqueKey || note.favoriteKey, // Retain existing key if unliking
        };

        return updatedNote;
      }
      return note;
    });

    setDisplayedNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div className=" rounded-2xl mt-3 overflow-hidden p-6 sm:p-8 md:p-10 duration-300 scrollbar-hide ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 overflow-y-auto h-[calc(100vh-300px)] min-h-[500px] max-h-[800px] scrollbar-hide pb-20">
        {displayedNotes.length === 0 ? (
          <div className="col-span-full flex items-center justify-center h-full">
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
                onToggleFavorite={() => handleToggleFavorite(note)}
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

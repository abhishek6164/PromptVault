import { useState, useEffect } from "react";
import LeftPanel from "../Layout/LeftPanel";
import SearchBar from "../Layout/SearchBar";
import { Cards } from "../Cards/Cards";
import InputBar from "../Layout/InputBar";

function Favorites() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    const favoriteNotes = savedNotes.filter((note) => note.isFavorite);
    setNotes(favoriteNotes);
    setFilteredNotes(favoriteNotes);
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add new note
  const addNote = (newNote) => {
    const noteWithFavorite = { ...newNote, isFavorite: true };
    setNotes((prevNotes) => [noteWithFavorite, ...prevNotes]);
  };

  // Update existing note
  const handleUpdateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  // Delete a note
  const handleDeleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  // Search and sort notes
  const handleSearch = (query, sortOrder) => {
    let searchResults = notes.filter((note) => {
      const titleMatch =
        note.title?.toLowerCase().includes(query.toLowerCase()) || false;
      const descriptionMatch =
        note.description?.toLowerCase().includes(query.toLowerCase()) || false;
      return titleMatch || descriptionMatch;
    });

    searchResults.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sortOrder === "oldest") searchResults.reverse();

    setFilteredNotes(searchResults);
  };

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="md:w-64 lg:w-1/5">
        <LeftPanel />
      </div>

      <div className="flex-1 flex flex-col min-h-screen max-h-screen">
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <Cards
              notes={filteredNotes}
              onUpdateNote={handleUpdateNote}
              onDeleteNote={handleDeleteNote}
            />
          </div>
        </div>

        <div className="sticky bottom-0 z-10 bg-white/90 backdrop-blur-md shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <InputBar addNote={addNote} />
        </div>
      </div>
    </div>
  );
}

export default Favorites;

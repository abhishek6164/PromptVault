import { useState, useEffect } from "react";
import LeftPanel from "../Layout/LeftPanel";
import SearchBar from "../Layout/SearchBar";
import { Cards } from "../Cards/Cards";
import InputBar from "../Layout/InputBar";

function NotePad() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(savedNotes);
    setFilteredNotes(savedNotes);
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote) => {
    const noteWithDefaults = {
      ...newNote,
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      isNew: true,
      isFavorite: false,
    };

    setNotes((prevNotes) => [noteWithDefaults, ...prevNotes]);
    setFilteredNotes((prevNotes) => [noteWithDefaults, ...prevNotes]);
  };

  const handleUpdateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setFilteredNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const handleDeleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    setFilteredNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== noteId)
    );
  };

  const handleSearch = (query, sortOrder) => {
    let searchResults = notes.filter((note) => {
      const titleMatch = note.title
        ?.toLowerCase()
        .includes(query.toLowerCase());
      const descriptionMatch = note.description
        ?.toLowerCase()
        .includes(query.toLowerCase());
      return titleMatch || descriptionMatch;
    });

    // Apply sorting
    searchResults.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredNotes(searchResults);
  };

  return (
    <div className="relative flex flex-col scrollbar-hide md:flex-row min-h-screen ">
      <div className="md:w-64 lg:w-1/5">
        <LeftPanel />
      </div>

      <div className="flex-1 flex flex-col min-h-screen max-h-screen">
        <div className="sticky top-0 z-10  ">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide  md:px-6 lg:px-8 ">
          <div className="max-w-7xl mx-auto">
            <Cards
              notes={filteredNotes}
              onUpdateNote={handleUpdateNote}
              onDeleteNote={handleDeleteNote}
            />
          </div>
        </div>

        <div className="sticky bottom-0 z-10 ">
          <InputBar addNote={addNote} />
        </div>
      </div>
    </div>
  );
}

export default NotePad;

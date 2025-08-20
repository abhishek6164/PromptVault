import { useState, useEffect } from "react";
import axios from "axios";
import LeftPanel from "../Layout/LeftPanel";
import SearchBar from "../Layout/SearchBar";
import { Cards } from "../Cards/Cards";
import InputBar from "../Layout/InputBar";

function Favorites() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  // Fetch favorite notes
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/notes/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const safeNotes = Array.isArray(res.data) ? res.data : [];
      setNotes(safeNotes);
      setFilteredNotes(safeNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
      setFilteredNotes([]);
    }
  };

  // Add note
  const addNote = async (newNote) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/notes",
        { ...newNote, isFavorite: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.note) {
        setNotes((prev) => [res.data.note, ...prev]);
        setFilteredNotes((prev) => [res.data.note, ...prev]);
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Toggle favorite
  const toggleFavorite = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `http://localhost:5000/api/notes/${id}/favorite`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedNote = res.data?.note;

      if (!updatedNote.isFavorite) {
        // remove from favorites
        setNotes((prev) => prev.filter((note) => note._id !== id));
        setFilteredNotes((prev) => prev.filter((note) => note._id !== id));
      } else {
        // update if still favorite
        setNotes((prev) =>
          prev.map((note) => (note._id === updatedNote._id ? updatedNote : note))
        );
        setFilteredNotes((prev) =>
          prev.map((note) => (note._id === updatedNote._id ? updatedNote : note))
        );
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // Update note
  const handleUpdateNote = async (updatedNote) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/notes/${updatedNote._id}`,
        updatedNote,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const safeNote = res.data?.note;
      if (!safeNote) return;

      setNotes((prev) =>
        prev.map((note) => (note._id === updatedNote._id ? safeNote : note))
      );
      setFilteredNotes((prev) =>
        prev.map((note) => (note._id === updatedNote._id ? safeNote : note))
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Delete note
  const handleDeleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotes((prev) => prev.filter((note) => note._id !== id));
      setFilteredNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Search notes
  const handleSearch = (query, sortOrder) => {
    const safeNotes = Array.isArray(notes) ? notes : [];

    let searchResults = safeNotes.filter((note) => {
      const titleMatch = note.title?.toLowerCase().includes(query.toLowerCase());
      const descriptionMatch = note.description?.toLowerCase().includes(query.toLowerCase());
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
              onToggleFavorite={toggleFavorite}
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

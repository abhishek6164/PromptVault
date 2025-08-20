import { useState, useEffect } from "react";
import axios from "axios";
import LeftPanel from "../Layout/LeftPanel";
import SearchBar from "../Layout/SearchBar";
import { Cards } from "../Cards/Cards";
import InputBar from "../Layout/InputBar";

function NotePad() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load notes from DB
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("⚠️ No token found in localStorage.");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotes(res.data);
      setFilteredNotes(res.data);
    } catch (error) {
      console.error("❌ Error fetching notes:", error);

      if (error.response?.status === 401) {
        alert("Session expired! Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (newNote) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:5000/api/notes",
      newNote,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // 🔑 yaha res.data.note
    setNotes((prev) => [res.data.note, ...prev]);
    setFilteredNotes((prev) => [res.data.note, ...prev]);
  } catch (error) {
    console.error("❌ Error adding note:", error.response?.data || error.message);
  }
};



  const handleUpdateNote = async (updatedNote) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/notes/${updatedNote._id}`,
        updatedNote,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotes((prev) =>
        prev.map((note) => (note._id === res.data._id ? res.data : note))
      );
      setFilteredNotes((prev) =>
        prev.map((note) => (note._id === res.data._id ? res.data : note))
      );
    } catch (error) {
      console.error("❌ Error updating note:", error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
      setFilteredNotes((prev) => prev.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error("❌ Error deleting note:", error);
    }
  };

  const handleSearch = (query, sortOrder) => {
    let searchResults = notes.filter((note) => {
      const titleMatch = note.title?.toLowerCase().includes(query.toLowerCase());
      const descriptionMatch = note.description?.toLowerCase().includes(query.toLowerCase());
      return titleMatch || descriptionMatch;
    });

    searchResults.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredNotes(searchResults);
  };

  return (
    <div className="relative flex flex-col scrollbar-hide md:flex-row min-h-screen">
      <div className="md:w-64 lg:w-1/5">
        <LeftPanel />
      </div>

      <div className="flex-1 flex flex-col min-h-screen max-h-screen">
        <div className="sticky top-0 z-10">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <p className="text-center text-gray-500 mt-10">Loading notes...</p>
            ) : (
              <Cards
                notes={filteredNotes}
                onUpdateNote={handleUpdateNote}
                onDeleteNote={handleDeleteNote}
              />
            )}
          </div>
        </div>

        <div className="sticky bottom-0 z-10">
          <InputBar addNote={addNote} />
        </div>
      </div>
    </div>
  );
}

export default NotePad;
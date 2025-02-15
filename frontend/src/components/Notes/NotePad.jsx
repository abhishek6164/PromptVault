import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftPanel from "../Layout/LeftPanel";
import SearchBar from "../Layout/SearchBar";
import { Cards } from "../Cards/Cards";
import InputBar from "../Layout/InputBar";
import { useAuth } from "../../context/AuthProvider";
import { handleError, handleSuccess } from "../../utils/index";

function NotePad() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuth(); // Get token from AuthContext

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      fetchNotes();
    }
  }, [token, navigate]);

  // Fetch notes from backend
  const fetchNotes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/notes", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }, // ✅ Corrected syntax
      });
      const result = await response.json();

      if (result.success) {
        setNotes(result.notes);
      } else {
        handleError(result.message);
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
      handleError("Failed to fetch notes.");
    }
  };

  const addNote = async (text, isRecorded = false) => {
    if (!text.trim()) return;

    const newNote = {
      title: `Note ${notes.length + 1}`,
      description: text,
      isRecorded,
    };

    try {
      const response = await fetch("http://127.0.0.1:8080/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Corrected
        },
        body: JSON.stringify(newNote),
      });

      const result = await response.json();
      if (result.success) {
        handleSuccess("Note added successfully!");
        setNotes([result.note, ...notes]);
      } else {
        handleError(result.message);
      }
    } catch (err) {
      console.error("Error adding note:", err);
      handleError("Failed to add note.");
    }
  };

  const handleUpdateNote = async (updatedNote) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/notes/${updatedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Corrected
          },
          body: JSON.stringify(updatedNote),
        }
      );

      const result = await response.json();
      if (result.success) {
        handleSuccess("Note updated successfully!");
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === updatedNote.id ? updatedNote : note
          )
        );
      } else {
        handleError(result.message);
      }
    } catch (err) {
      console.error("Error updating note:", err);
      handleError("Failed to update note.");
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/notes/${noteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }, // ✅ Corrected
      });

      const result = await response.json();
      if (result.success) {
        handleSuccess("Note deleted successfully!");
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      } else {
        handleError(result.message);
      }
    } catch (err) {
      console.error("Error deleting note:", err);
      handleError("Failed to delete note.");
    }
  };

  return (
    <div className="relative flex bg-gray-100">
      <LeftPanel />

      <div className="flex h-[750px] flex-col flex-grow relative">
        <SearchBar />

        <div className="flex-grow overflow-y-auto p-4">
          <Cards
            notes={notes}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
          />
        </div>

        <div className="bg-white shadow-lg">
          <InputBar addNote={addNote} />
        </div>
      </div>
    </div>
  );
}

export default NotePad;

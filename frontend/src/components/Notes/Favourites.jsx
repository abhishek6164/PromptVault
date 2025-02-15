import { useState } from "react";
import LeftPanel from "../Layout/LeftPanel";
import SearchBar from "../Layout/SearchBar";
import { Cards } from "../Cards/Cards";
import InputBar from "../Layout/InputBar";

function NotePad() {
  const [notes, setNotes] = useState([]);

  const addNote = (text, isRecorded = false) => {
    if (!text.trim()) return;

    const date = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const words = text.split(" ").length;
    const readingTime = Math.ceil(words / 200);

    const newNote = {
      id: Date.now(),
      title: `Note ${notes.length + 1}`,
      description: text,
      date,
      duration: isRecorded ? `0${readingTime}:15` : undefined,
      isNew: true,
      isRecorded,
      isFavorite: false,
    };

    setNotes([newNote, ...notes]);
  };

  const handleUpdateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const handleDeleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
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

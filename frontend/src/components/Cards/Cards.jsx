import { useState } from "react";
import { AudioNoteCard } from "./AudioNoteCard";
import { NoteModal } from "../Notes/NoteModal";

export function Cards({ notes, onUpdateNote, onDeleteNote }) {
  const [selectedNote, setSelectedNote] = useState(null);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleCloseModal = () => {
    setSelectedNote(null);
  };

  const handleUpdateNote = (updatedNote) => {
    if (onUpdateNote) {
      onUpdateNote(updatedNote);
    }
    setSelectedNote(null);
  };

  return (
    <div className="bg-gray-50 mt-3 overflow-hidden p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto h-[425px] max-h-[500px] scrollbar-hide pb-20">
        {notes.length === 0 ? (
          <p className="text-gray-400 text-center col-span-full">
            No notes available. Start typing...
          </p>
        ) : (
          notes.map((note) => (
            <AudioNoteCard
              key={note.id}
              isNew={note.isNew}
              date={note.date}
              duration={note.duration}
              title={note.description}
              color={note.color}
              image={note.image}
              onClick={() => handleNoteClick(note)}
              onDelete={() => onDeleteNote(note.id)}
            />
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

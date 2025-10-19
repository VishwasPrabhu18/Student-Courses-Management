import { useState } from "react";
import CustomInput from "../CustomInput";

const NotesPanel = ({ lecture, notes, onAddNote }) => {
  const [note, setNote] = useState("");

  const handleAdd = () => {
    if (note.trim()) {
      onAddNote(lecture.id, note);
      setNote("");
    }
  };

  return (
    <div className="p-4 border-t bg-gray-50">
      <h3 className="font-semibold">Notes for {lecture.title}</h3>
      <CustomInput
        type="textarea"
        placeholder="Write your note..."
        value={note}
        onChange={(value) => setNote(value)}
        minNumRows={3}
      />

      <button
        onClick={handleAdd}
        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
      >
        Add Note
      </button>

      <ul className="mt-3 space-y-2">
        {notes.map((n, idx) => (
          <li
            key={idx}
            className="p-2 bg-white rounded shadow-sm border text-sm"
          >
            {n.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotesPanel;
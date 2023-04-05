import React from "react";
import { useLocation } from "react-router-dom";

const NotesComponent = ({ notes, getNotes }) => {
  const { pathname } = useLocation();
  const deleteNotes = (i) => {
    const deletedNotes = JSON.parse(localStorage.getItem("deletedNotes")) || [];
    localStorage.setItem(
      "deletedNotes",
      JSON.stringify([...deletedNotes, notes[i]])
    );
    const tempNotes = notes;
    tempNotes.splice(i, 1);
    localStorage.setItem("notes", JSON.stringify(tempNotes));
    getNotes();
  };
  const archiveNotes = (i) => {
    const archivedNotes =
      JSON.parse(localStorage.getItem("archivedNotes")) || [];
    localStorage.setItem(
      "archivedNotes",
      JSON.stringify([...archivedNotes, notes[i]])
    );
    const tempNotes = notes;
    tempNotes.splice(i, 1);
    localStorage.setItem("notes", JSON.stringify(tempNotes));
    getNotes();
  };
  return (
    <div className="mt-10 w-4/5 mx-auto flex flex-wrap gap-4">
      {notes.map(({ title, note }, i) => {
        return (
          <div key={i} className="border-2 w-64 p-2 rounded-lg shadow">
            <div className="flex justify-between break-all">
              <h2>{title}</h2>
              {pathname === "/" && (
                <div className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 text-red-400 hover:text-red-300 cursor-pointer"
                    onClick={() => deleteNotes(i)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 text-gray-800 hover:text-gray-600 cursor-pointer"
                    onClick={() => archiveNotes(i)}
                  >
                    <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                    <path
                      fillRule="evenodd"
                      d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            <p>{note}</p>
          </div>
        );
      })}
    </div>
  );
};

export default NotesComponent;

import React, { useEffect, useState } from "react";
import NotesComponent from "./NotesComponent";
import Header from "./Header";

const DeletedNotes = () => {
  const [filteredDeletedNotes, setFilteredDeletedNotes] = useState([]);
  const [deletednotes, setDeletedNotes] = useState([]);
  useEffect(() => {
    getDeletedNotes();
  }, []);
  const getDeletedNotes = () => {
    const tempDeletedNotes = localStorage.getItem("deletedNotes");
    if (tempDeletedNotes) {
      setDeletedNotes(JSON.parse(tempDeletedNotes));
      setFilteredDeletedNotes(JSON.parse(tempDeletedNotes));
    }
  };
  return (
    <div>
      <Header notes={deletednotes} setFilteredNotes={setFilteredDeletedNotes} />
      {deletednotes.length > 0 ? (
        <NotesComponent notes={filteredDeletedNotes} getNotes={deletednotes} />
      ) : (
        <div className="mx-auto w-fit mt-20 text-2xl">
          No deleted notes found!
        </div>
      )}
    </div>
  );
};

export default DeletedNotes;

import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotesComponent from "./NotesComponent";

const ArchivedNotes = () => {
  const [filteredarchivedNotes, setFilteredarchivedNotes] = useState([]);
  const [archivednotes, setarchivedNotes] = useState([]);
  useEffect(() => {
    getarchivedNotes();
  }, []);
  const getarchivedNotes = () => {
    const temparchivedNotes = localStorage.getItem("archivedNotes");
    if (temparchivedNotes) {
      setarchivedNotes(JSON.parse(temparchivedNotes));
      setFilteredarchivedNotes(JSON.parse(temparchivedNotes));
    }
  };
  return (
    <div>
      <Header
        notes={archivednotes}
        setFilteredNotes={setFilteredarchivedNotes}
      />
      {archivednotes.length > 0 ? (
        <NotesComponent
          notes={filteredarchivedNotes}
          getNotes={archivednotes}
        />
      ) : (
        <div className="mx-auto w-fit mt-20 text-2xl">
          No archived notes found!
        </div>
      )}
    </div>
  );
};

export default ArchivedNotes;

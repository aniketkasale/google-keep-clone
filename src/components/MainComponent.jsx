import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import NotesComponent from "./NotesComponent";
import Header from "./Header";

const MainComponent = () => {
  const [isInputBoxOpen, setIsInputBoxOpen] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    const tempNotes = localStorage.getItem("notes");
    if (tempNotes) {
      setNotes(JSON.parse(tempNotes));
      setFilteredNotes(JSON.parse(tempNotes));
    }
  };

  const addNotes = (newNote) => {
    console.log(newNote);
    localStorage.setItem("notes", JSON.stringify([...notes, newNote]));
    getNotes();
    setIsInputBoxOpen(false);
  };
  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Please enter title for your note!";
    }
    if (!values.note) {
      errors.note = "Please enter your note!";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      note: "",
    },
    validate,
    onSubmit: (values) => {
      addNotes(values);
    },
  });

  return (
    <div className="bg-gray-100 h-screen w-screen ">
      <Header notes={notes} setFilteredNotes={setFilteredNotes} />
      <div className="mx-auto w-1/2">
        {!isInputBoxOpen && (
          <input
            type="text"
            placeholder="Take Note..."
            onClick={() => setIsInputBoxOpen(true)}
            className="w-full bg-transparent outline-none rounded-lg p-2 shadow  border-2"
          />
        )}
        {isInputBoxOpen && (
          <form onSubmit={formik.handleSubmit}>
            <div className=" shadow-lg  border-2 rounded-lg p-4">
              <input
                name="title"
                type="text"
                id="title"
                placeholder="Title"
                onChange={formik.handleChange}
                className="w-full bg-transparent outline-none "
              />
              {formik.errors.title ? (
                <div className="text-red-500">{formik.errors.title}</div>
              ) : null}
              <textarea
                name="note"
                id="note"
                onChange={formik.handleChange}
                cols="30"
                rows="10"
                placeholder="Take a note..."
                className="w-full bg-transparent outline-none mt-6 "
              ></textarea>
              {formik.errors.note ? (
                <div className="text-red-500">{formik.errors.note}</div>
              ) : null}

              <div className="flex justify-between mt-3">
                <button
                  type="submit"
                  className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-md "
                >
                  Add Note
                </button>
                <button
                  onClick={() => setIsInputBoxOpen(false)}
                  className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-md "
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      {notes && <NotesComponent notes={filteredNotes} getNotes={getNotes} />}
    </div>
  );
};

export default MainComponent;

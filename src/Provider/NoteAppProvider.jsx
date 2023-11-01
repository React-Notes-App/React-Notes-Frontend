import React, { useState, useContext, createContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getUserNotesCall,
  // getArchivedNotesCall,
  createNoteCall,
  deleteNoteCall,
  archiveNoteCall,
  unarchiveNoteCall,
  createItemCall,
  editNoteTitleCall,
  editNoteColorCall,
  editItemNameCall,
  editItemStatusCall,
  deleteItemCall,
  getUserLabelsCall,
  addLabelToNoteCall,
  createLabelCall,
  editLabelCall,
  removeLabelFromNoteCall,
  deleteLabelCall,
  getNotesByLabelCall,
  // getNotesByLabelCall,
} from "../API-Adapter";

const DEFAULT_NOTE_COLOR = "#eeeee4";

const NoteAppProviderContext = createContext({
  notes: [],
  userLabels: [],
  currentNoteColor: DEFAULT_NOTE_COLOR,
  // eslint-disable-next-line no-unused-vars
  updateNoteColor: (_color) => {
    // no-op
  },
  // eslint-disable-next-line no-unused-vars
  setCurrentNoteId: (_id) => {
    // no-op
  },
  // eslint-disable-next-line no-unused-vars
  addNote: (_text, _title) => {
    // no-op
  },
  // eslint-disable-next-line no-unused-vars
  deleteNote: (_id) => {
    // no-op
  },
  // eslint-disable-next-line no-unused-vars
  filterNotes: (_searchText) => {
    // no-op
  },
});

export const useNoteAppContext = () => useContext(NoteAppProviderContext);

const NoteAppProvider = ({ children }) => {
  NoteAppProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [columnView, setColumnView] = useState(false);

  const [notes, setNotes] = useState([]);
  // const [archivedNotes, setArchivedNotes] = useState([]);
  const [userLabels, setUserLabels] = useState([]);
  const [notesLabels, setNotesLabels] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsLoggedIn(true);
      getUserNotes(
        localStorage.getItem("token"),
        JSON.parse(localStorage.getItem("user")).id
      );
      // getArchivedNotes(
      //   localStorage.getItem("token"),
      //   JSON.parse(localStorage.getItem("user")).id
      // );
      getUserLabels(
        localStorage.getItem("token"),
        JSON.parse(localStorage.getItem("user")).id
      );
      getNotesByLabel(
        localStorage.getItem("token"),
        JSON.parse(localStorage.getItem("user")).id
      );
    }
  }, []);

  const getUserNotes = async (token, id) => {
    try {
      const result = await getUserNotesCall(token, id);
      const notes = result.notes;

      setNotes(notes);
    } catch (error) {
      console.log(error);
    }
  };

  // const getArchivedNotes = async (token, id) => {
  //   try {
  //     const result = await getArchivedNotesCall(token, id);
  //     const notes = result.notes;

  //     setArchivedNotes(notes);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const createNote = async (title, name) => {
    const result = await createNoteCall(token, title, name);
    const newNote = result.note;
    const newNotes = [...notes, newNote];

    setNotes(newNotes);
  };

  const editNoteTitle = async (id, title) => {
    const result = await editNoteTitleCall(token, id, title);
    const newNote = result.note;

    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return newNote;
      }
      return note;
    });
    setNotes(newNotes);
  };

  const editNoteColor = async (id, color) => {
    const result = await editNoteColorCall(token, id, color);
    const newNote = result.note;
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return newNote;
      }
      return note;
    });
    setNotes(newNotes);
  };

  const deleteNote = async (id) => {
    const result = await deleteNoteCall(token, id);
    console.log(result);
    const deletedNote = result.note;
    const newNotes = notes.filter((note) => {
      return note.id !== deletedNote.id;
    });

    setNotes(newNotes);
  };

  const archiveNote = async (id) => {
    const result = await archiveNoteCall(token, id);
    console.log(result);
    const archivedNote = result.note;
    const newNotes = notes.map((note) => {
      if (note.id === archivedNote.id) {
        return archivedNote;
      }
      return note;
    });
    setNotes(newNotes);
  };

  const unarchiveNote = async (id) => {
    const result = await unarchiveNoteCall(token, id);
    console.log(result);
    const unarchivedNote = result.note;
    const newNotes = notes.map((note) => {
      if (note.id === unarchivedNote.id) {
        return unarchivedNote;
      }
      return note;
    });
    setNotes(newNotes);
  };

  const createItem = async (id, name) => {
    const result = await createItemCall(token, id, name);
    console.log(result);
    const newNote = result.note;
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return newNote;
      }
      return note;
    });
    console.log(newNotes);
    setNotes(newNotes);
  };

  const editItemName = async (id, name, noteId) => {
    const result = await editItemNameCall(token, id, name, noteId);
    const newNote = result.note;
    const newNotes = notes.map((note) => {
      if (note.id === noteId) {
        return newNote;
      }
      return note;
    });
    console.log(newNotes);
    setNotes(newNotes);
  };

  const checkItem = async (itemId, completed, noteId) => {
    const result = await editItemStatusCall(token, itemId, completed, noteId);
    const newNote = result.note;
    const newNotes = notes.map((note) => {
      if (note.id === noteId) {
        return newNote;
      }
      return note;
    });
    setNotes(newNotes);
  };

  const deleteItem = async (itemId, noteId) => {
    const result = await deleteItemCall(token, itemId, noteId);
    const newNote = result.note;
    const newNotes = notes.map((note) => {
      if (note.id === noteId) {
        return newNote;
      }
      return note;
    });
    setNotes(newNotes);
  };

  const getUserLabels = async (token, id) => {
    try {
      const result = await getUserLabelsCall(token, id);
      const labels = result.labels;

      setUserLabels(labels);
    } catch (error) {
      console.log(error);
    }
  };

  const addLabelToNote = async (labelId, noteId) => {
    const result = await addLabelToNoteCall(token, labelId, noteId);
    const newNote = result.note;
    console.log(newNote);
    const newNotes = notes.map((note) => {
      if (note.id === noteId) {
        return newNote;
      }
      console.log(note.id, noteId);
      return note;
    });
    console.log(newNotes);
    setNotes(newNotes);
    await getUserLabels(token, user.id);
  };

  const createLabel = async (labelName) => {
    const result = await createLabelCall(token, labelName);
    const newLabel = result.label;
    console.log(newLabel);
    const newLabels = [...userLabels, newLabel];
    console.log(newLabels);
    setUserLabels(newLabels);
  };

  const deleteLabel = async (labelId) => {
    const result = await deleteLabelCall(token, labelId);
    console.log(labelId, "labelId")
    const deletedLabel = result.label;
    console.log(deletedLabel);
    const newLabels = userLabels.filter((label) => {
      return label.id !== deletedLabel.id;
    });
    setUserLabels(newLabels);
  
    console.log(newLabels)
  };

  const editLabel = async (labelId, label_name) => {
    const result = await editLabelCall(token, labelId, label_name);
    console.log(labelId, label_name);
    const newLabel = result.label;
    const newLabels = userLabels.map((label) => {
      if (label.id === labelId) {
        return newLabel;
      }
      return label;
    });
    setUserLabels(newLabels);
  };

  const removeLabelFromNote = async (labelId, noteId) => {
    const result = await removeLabelFromNoteCall(token, labelId, noteId);
    const newNote = result.note;
    const newNotes = notes.map((note) => {
      if (note.id === noteId) {
        return newNote;
      }
      return note;
    });
    setNotes(newNotes);
    await getUserLabels(token, user.id);
  };

  const getNotesByLabel = async ( token, id) => {
    const result = await getNotesByLabelCall(token, id);
    const notes = result.notes;
    console.log(notes);
    setNotesLabels(notes);
    console.log(notesLabels);
  }

  // const getNotesByLabel = async (token, id) => {
  //   const result = await getNotesByLabelCall(token, id);
  //   const notes = result.notes;
  //   setNotesLabels(notes);
  // };
  return (
    <NoteAppProviderContext.Provider
      value={{
        //state
        token,
        setToken,
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        notes,
        searchText,
        setSearchText,
        darkMode,
        setDarkMode,
        columnView,
        setColumnView,
        // archivedNotes,
        // setArchivedNotes,
        userLabels,
        setUserLabels,
        // notesLabels,
        // setNotesLabels,
        //actions
        getUserNotes,
        // getArchivedNotes,
        createNote,
        editNoteTitle,
        createItem,
        editItemName,
        editNoteColor,
        deleteNote,
        archiveNote,
        unarchiveNote,
        deleteItem,
        checkItem,
        getUserLabels,
        addLabelToNote,
        createLabel,
        editLabel,
        removeLabelFromNote,
        deleteLabel,
        getNotesByLabel,
      }}
    >
      {children}
    </NoteAppProviderContext.Provider>
  );
};

export default NoteAppProvider;

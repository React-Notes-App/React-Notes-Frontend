import React, { useState, useContext, createContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getUserNotesCall,
  getArchivedNotesCall,
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
} from "../API-Adapter";

const DEFAULT_NOTE_COLOR = "#eeeee4";

const NoteAppProviderContext = createContext({
  notes: [],
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

  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [columnView, setColumnView] = useState(false);

  const [archivedNotes, setArchivedNotes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsLoggedIn(true);
      getUserNotes(
        localStorage.getItem("token"),
        JSON.parse(localStorage.getItem("user")).id
      );
      getArchivedNotes(
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

  const getArchivedNotes = async (token, id) => {
    try {
      const result = await getArchivedNotesCall(token, id);
      const notes = result.notes;

      setArchivedNotes(notes);
    } catch (error) {
      console.log(error);
    }
  };

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
    const newNotes = notes.filter((note) => {
      return note.id !== archivedNote.id;
    });
    setNotes(newNotes);
  };

  const unarchiveNote = async (id) => {
    const result = await unarchiveNoteCall(token, id);
    console.log(result);
    const unarchivedNote = result.note;
    const newNotes = archivedNotes.filter((note) => {
      return note.id !== unarchivedNote.id;
    });
    setArchivedNotes(newNotes);
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

  const editItemName = async (itemId, text, noteId) => {
    const result = await editItemNameCall(token, itemId, text, noteId);
    const newNote = result.note;
    const newNotes = notes.map((note) => {
      if (note.id === noteId) {
        return newNote;
      }
      return note;
    });
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
        archivedNotes,
        setArchivedNotes,
        //actions
        getUserNotes,
        getArchivedNotes,
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
      }}
    >
      {children}
    </NoteAppProviderContext.Provider>
  );
};

export default NoteAppProvider;

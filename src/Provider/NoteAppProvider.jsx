import React, { useState, useContext, createContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getUserNotesCall,
  createNoteCall,
  deleteNoteCall,
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsLoggedIn(true);
      getUserNotes(
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
    console.log(deletedNote)
    console.log(newNotes);
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

  // const checkTodoItem = (id) => {
  //   const editedNote = notes.map((note) => {
  //     note.todoItems.map((todoItem) => {
  //       if (todoItem.id === id) {
  //         todoItem.completed = !todoItem.completed;
  //       }
  //       return todoItem;
  //     });
  //     return note;
  //   });

  //   setNotes(editedNote);
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
        //actions
        getUserNotes,
        createNote,
        editNoteTitle,
        createItem,
        editItemName,
        editNoteColor,
        deleteNote,
        deleteItem,
        checkItem,
      }}
    >
      {children}
    </NoteAppProviderContext.Provider>
  );
};

export default NoteAppProvider;

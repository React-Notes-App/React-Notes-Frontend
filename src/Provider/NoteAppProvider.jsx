import React, { useState, useContext, createContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
import {
  getUserNotesCall,
  createNoteCall,
  createCopyCall,
  trashNoteCall,
  removeFromTrashCall,  
  deleteNotePermCall,
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
  hideCheckboxesCall,
  showCheckboxesCall,
  updateUserCall,
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

  const [hasLoaded, setHasLoaded] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [columnView, setColumnView] = useState(false);

  const [notes, setNotes] = useState([]);
  const [userLabels, setUserLabels] = useState([]);
  const [notesLabels, setNotesLabels] = useState([]);

  const archivedNotes = notes.filter((note) => note.is_archived === true);

  const trashedNotes = notes.filter((note) => note.is_deleted === true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsLoggedIn(true);
      getUserNotes(
        localStorage.getItem("token"),
        JSON.parse(localStorage.getItem("user")).id
      );

      getUserLabels(
        localStorage.getItem("token"),
        JSON.parse(localStorage.getItem("user")).id
      );
      getNotesByLabel(
        localStorage.getItem("token"),
        JSON.parse(localStorage.getItem("user")).id
      );
    }
    setHasLoaded(true);
  }, []);

  const getUserNotes = async (token, id) => {
    try {
      const result = await getUserNotesCall(token, id);
      const notes = result.notes;
      console.log(notes);

      setNotes(notes);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (newName, newEmail, newPassword, newPicture) => {
    
    const result = await updateUserCall(token, {
      name: newName,
      email: newEmail,
      password: newPassword,
      picture: newPicture,
    });
    console.log(result);
    const newUser = result.user;
    JSON.stringify(localStorage.setItem("user", JSON.stringify(newUser)));
    setUser(newUser);
  };

  const createNote = async (title, itemName, label_name, labelId, param_is_archived) => {
    let color = DEFAULT_NOTE_COLOR;
    let date = new Date();
    let is_archived;
    if (param_is_archived) {
      is_archived = true;
    } else {
      is_archived = false;
    }
    let has_checklist = true;
    let is_deleted = false;
    let labelNameCheck = userLabels.map((label) => label.label_name);
    let noLabel = labelNameCheck.includes("No Label");
    if (noLabel) {
      labelId = userLabels.find((label) => label.label_name === "No Label").id;
    }

    console.log("label name", label_name);
    console.log("labelId", labelId);
   
    const result = await createNoteCall(
      token,
      title,
      itemName,
      color,
      date,
      is_archived,
      has_checklist,
      is_deleted,
      label_name,
      labelId
    );
    const newNote = result.note;
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    await getUserLabels(token, user.id);
  };

  const createCopy = async (id) => {
    const oldNote = notes.find((note) => note.id === id);

    const title = "Copy of " + oldNote.title;
    const color = oldNote.color;
    const date = new Date();
    const is_archived = oldNote.is_archived;
    const has_checklist = oldNote.has_checklist;
    const is_deleted = oldNote.is_deleted;
    const itemNames = oldNote.items.map((item) => item.item_name);
    const itemsCompleted = oldNote.items.map((item) => item.completed);
    const labelIds = oldNote.labels.map((label) => label.id);

    const result = await createCopyCall(
      token,
      title,
      itemNames,
      color,
      date,
      is_archived,
      has_checklist,
      is_deleted,
      itemsCompleted,
      labelIds
    );
    const newNote = result.note;
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    await getUserLabels(token, user.id);
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

  const trashNote = async (id) => {
    const result = await trashNoteCall(token, id);
    console.log(result);
    const trashedNote = result.note;
    const newNotes = notes.map((note) => {
      if (note.id === trashedNote.id) { 
        return trashedNote;
      }
      return note;
    });
    setNotes(newNotes);
  };

  const removeFromTrash = async (id) => {
    const result = await removeFromTrashCall(token, id);
    console.log(result);
    const restoredNote = result.note;
    const newNotes = notes.map((note) => {
      if (note.id === restoredNote.id) {
        return restoredNote;
      }
      return note;
    });
    setNotes(newNotes);
  };

  const deleteNotePerm = async (id) => {
    const result = await deleteNotePermCall(token, id);
    console.log(result);
    const deletedNote = result.note;
    const newNotes = notes.filter((note) => {
      return note.id !== deletedNote.id;
    });

    setNotes(newNotes);
    await getUserLabels(token, user.id);
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

  const createItem = async (id, itemName) => {
    const result = await createItemCall(token, id, itemName);
    console.log(result);
    const newNote = result.note;
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return newNote;
      }
      return note;
    });
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
    const newNotes = notes.map((note) => {
      if (note.id === noteId) {
        return newNote;
      }
      return note;
    });
    setNotes(newNotes);
    await getUserLabels(token, user.id);
  };

  const createLabel = async (labelName) => {
    let oldLabels = userLabels.map((label) => label.label_name);
    if (oldLabels.includes(labelName)) {
      alert("Label already exists!");
      return;
    }
    const result = await createLabelCall(token, labelName);
    const newLabel = result.label;
    const newLabels = [...userLabels, newLabel];
    setUserLabels(newLabels);
  };

  const deleteLabel = async (labelId) => {
    const result = await deleteLabelCall(token, labelId);
    const deletedLabel = result.label;
    const newLabels = userLabels.filter((label) => {
      return label.id !== deletedLabel.id;
    });
    setUserLabels(newLabels);
    const newNotes = notes.map((note) => {
      const newLabels = note.labels.filter((label) => {
        return label.id !== deletedLabel.id;
      });
      note.labels = newLabels;
      return note;
    }
    );
    setNotes(newNotes);

  };

  const editLabel = async (labelId, label_name) => {
    const result = await editLabelCall(token, labelId, label_name);
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

  const getNotesByLabel = async (token, id) => {
    const result = await getNotesByLabelCall(token, id);
    const notes = result.notes;
    setNotesLabels(notes);
  };

  const showCheckBoxes = async (id) => {
    const result = await showCheckboxesCall(token, id);
    const newNote = result.note;
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return newNote;
      }
      return note;
    });
    setNotes(newNotes);
  };

  const hideCheckBoxes = async (id) => {
    const result = await hideCheckboxesCall(token, id);
    const newNote = result.note;
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return newNote;
      }
      return note;
    });
    setNotes(newNotes);
  };
  if (!hasLoaded) {
    return  <div className="d-flex justify-content-center align-items-center">
    <Spinner animation="border" role="status"></Spinner>
    </div>;
  }
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
        trashedNotes,
        archivedNotes,
        userLabels,
        setUserLabels,
        notesLabels,
        setNotesLabels,

        //actions
        getUserNotes,
        createNote,
        editNoteTitle,
        createItem,
        editItemName,
        editNoteColor,
        trashNote,
        removeFromTrash,
        deleteNotePerm,
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
        createCopy,
        hideCheckBoxes,
        showCheckBoxes,
        updateUser,
      }}
    >
      {children}
    </NoteAppProviderContext.Provider>
  );
};

export default NoteAppProvider;

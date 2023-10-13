import React, { useState, useContext, createContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getUserNotesCall,
  createNoteCall,
  createItemCall,
  editNoteCall,
  editItemCall,
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

  const editNoteTitle = async (title, id) => {
    const result = await editNoteCall(token, id, {title: title})
    const newTitle = result.note;
    const editedNote = notes.map((note) => {
      if (note.id === id) {
        note.title = newTitle;
      }
      return note;
    });
    setNotes(editedNote);
  };

const editItem = async (text, id) => {
  const result = await editItemCall(token, id, {item_name: text, completed: false})
  const newItem = result.item;
  const editedNote = notes.map((note) => {
    note.items.map((item) => {
      if (item.id === id) {
        item.item_name = newItem;
      }
      return item;
    });
    return note;
  });
  setNotes(editedNote);
};


  const createItem = async (text, id) => {
    const result = await createItemCall(token, id, text, false)
    if (id) {
      const editedNote = notes.map((note) => {
        if (note.id === id) {
          note.items = [...note.items, result.item];
        }
        return note;
      });

      setNotes(editedNote);
    }
  };

  // const editNoteTitle = (title, id) => {
  //   const newTitle = title;
  //   if (id) {
  //     const editedNote = notes.map((note) => {
  //       if (note.id === id) {
  //         note.title = newTitle;
  //       }
  //       return note;
  //     });

  //     setNotes(editedNote);
  //   }
  // };

  const editTodoItem = (todoItem, id) => {
    const editedItem = todoItem;
    if (id) {
      const editedNote = notes.map((note) => {
        note.todoItems.map((todoItem) => {
          if (todoItem.id === id) {
            todoItem.item = editedItem;
          }
          return todoItem;
        });
        return note;
      });

      setNotes(editedNote);
    }
  };

  const editNoteColor = (color, id) => {
    const editedNote = notes.map((note) => {
      if (note.id === id) {
        note.color = color;
      }
      return note;
    });

    setNotes(editedNote);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const deleteTodoItem = (id) => {
    const editedNote = notes.map((note) => {
      note.todoItems = note.todoItems.filter((todoItem) => todoItem.id !== id);
      return note;
    });
    setNotes(editedNote);
  };

  const checkTodoItem = (id) => {
    const editedNote = notes.map((note) => {
      note.todoItems.map((todoItem) => {
        if (todoItem.id === id) {
          todoItem.completed = !todoItem.completed;
        }
        return todoItem;
      });
      return note;
    });

    setNotes(editedNote);
  };

  return (
    <NoteAppProviderContext.Provider
      value={{
        //login
        token,
        setToken,
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,

        //notes
        getUserNotes,
        createNote,
        editNoteTitle,
        editItem,
        createItem,
        notes,
        editNoteColor,
        // addNote,
        deleteNote,
        searchText,
        setSearchText,
        darkMode,
        setDarkMode,
        editTodoItem,
        deleteTodoItem,
        checkTodoItem,
        columnView,
        setColumnView,
      }}
    >
      {children}
    </NoteAppProviderContext.Provider>
  );
};

export default NoteAppProvider;

// localStorage.setItem("react-notes-app-data", JSON.stringify(notes));

// const [notes, setNotes] = useState([
//   {
//     id: nanoid(),
//     title: "Home",
//     todoItems: [
//       { id: nanoid(), item: "Take out trash", completed: true },
//       { id: nanoid(), item: "Call Ricky", completed: false },
//     ],
//     date: "05/05/2021",
//     color: DEFAULT_NOTE_COLOR,
//     label:[{id: nanoid(), title: "Home"}]
//   },
//   {
//     id: nanoid(),
//     title: "Climbing",
//     todoItems: [
//       { id: nanoid(), item: "Plan trip", completed: false },
//       { id: nanoid(), item: "Buy new shoes", completed: false},
//       { id: nanoid(), item: "Send Yellow", completed: false},
//     ],
//     date: "05/05/2021",
//     color: "#fe3a8a",
//     label:[{id: nanoid(), title: "Climbing"}]
//   },
//   {
//     id: nanoid(),
//     title: "Work",
//     todoItems: [
//       { id: nanoid(), item: "Finish Note App", completed: true },
//       { id: nanoid(), item: "Finish Code Review", completed: true },
//     ],
//     date: "10/05/2021",
//     color: "#8acefe",
//     label:[{id: nanoid(), title: "Work"}]
//   },
//   {
//     id: nanoid(),
//     title: "Running",
//     todoItems: [
//       { id: nanoid(), item: "Threshold Workout", completed: false },
//       { id: nanoid(), item: "Long Run Saturday", completed: false },
//     ],
//     date: "15/05/2021",
//     color: "#8efe8a",
//     label:[{id: nanoid(), title: "Running"}]
//   },
//   {
//     id: nanoid(),
//     title: "Audrey",
//     todoItems: [
//       { id: nanoid(), item: "Field Trip", completed: false },
//       { id: nanoid(), item: "Snorkeling", completed: false },
//     ],
//     date: "15/05/2021",
//     color: "#fe8a8a",
//     label:[{id: nanoid(), title: "Audrey"}]
//   },
// ]);

// const addNote = (title, item) => {
//   const date = new Date();
//   const newNote = {
//     id: nanoid(),
//     title: title,
//     todoItems: [{ id: nanoid(), item: item, completed: false }],
//     date: date.toLocaleDateString(),
//     color: DEFAULT_NOTE_COLOR,
//   };
//   const newNotes = [...notes, newNote];
//   setNotes(newNotes);
// };

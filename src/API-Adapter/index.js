const URL = "https://todo-app-7yv2.onrender.com";
// const URL = "http://localhost:4000";
export { registerCall } from "./registerCall";
export { loginCall } from "./loginCall";

const makeHeaders = (token) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

//User API calls
export const getMeCall = async (token) => {
  try {
    const response = await fetch(`${URL}/api/users/me`, {
      method: "GET",
      headers: makeHeaders(token),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserNotesCall = async (token) => {
  try {
    const response = await fetch(`${URL}/api/notes/user`, {
      method: "GET",
      headers: makeHeaders(token),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getArchivedNotesCall = async (token) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/archived`, {
      method: "GET",
      headers: makeHeaders(token),
    });
    const result = await response.json();
    console.log("Result from getArchivedNotes: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createNoteCall = async (
  token,
  title,
  name,
  color,
  label_name,
  labelId
) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/create_note`, {
      method: "POST",
      headers: makeHeaders(token),
      body: JSON.stringify({
        title: title,
        name: name,
        color: color,
        label_name: label_name,
        labelId: labelId,
      }),
    });
    const result = await response.json();
    console.log("Result from createNote: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editNoteTitleCall = async (token, id, title) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/edit_note`, {
      method: "PATCH",
      headers: makeHeaders(token),
      body: JSON.stringify({
        id: id,
        title: title,
      }),
    });
    const result = await response.json();
    console.log("Result from editNoteCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editNoteColorCall = async (token, id, color) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/edit_note_color`, {
      method: "PATCH",
      headers: makeHeaders(token),
      body: JSON.stringify({
        id: id,
        color: color,
      }),
    });
    const result = await response.json();
    console.log("Result from editNoteColorCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createItemCall = async (token, id, name) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/add_item`, {
      method: "POST",
      headers: makeHeaders(token),
      body: JSON.stringify({
        id: id,
        name: name,
      }),
    });
    const result = await response.json();
    console.log("Result from createItemCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editItemNameCall = async (token, id, name, noteId) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/edit_item`, {
      method: "PATCH",
      headers: makeHeaders(token),
      body: JSON.stringify({
        id: id,
        name: name,
        noteId: noteId,
      }),
    });
    const result = await response.json();
    console.log("Result from editItemNameCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editItemStatusCall = async (token, id, completed, noteId) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/toggle_status`, {
      method: "PATCH",
      headers: makeHeaders(token),
      body: JSON.stringify({
        id: id,
        completed: completed,
        noteId: noteId,
      }),
    });
    const result = await response.json();
    console.log("Result from editItemStatusCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteItemCall = async (token, itemId, noteId) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/delete_item`, {
      method: "DELETE",
      headers: makeHeaders(token),
      body: JSON.stringify({
        itemId: itemId,
        noteId: noteId,
      }),
    });
    const result = await response.json();
    console.log("Result from deleteItemCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteNoteCall = async (token, id) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/delete_note`, {
      method: "DELETE",
      headers: makeHeaders(token),
      body: JSON.stringify({
        id: id,
      }),
    });
    const result = await response.json();
    console.log("Result from deleteNoteCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const archiveNoteCall = async (token, id) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/archive_note`, {
      method: "PATCH",
      headers: makeHeaders(token),
      body: JSON.stringify({
        id: id,
      }),
    });
    const result = await response.json();
    console.log("Result from archiveNoteCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const unarchiveNoteCall = async (token, id) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/unarchive_note`, {
      method: "PATCH",
      headers: makeHeaders(token),
      body: JSON.stringify({
        id: id,
      }),
    });
    const result = await response.json();
    console.log("Result from unarchiveNote: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getActiveLabelsCall = async (token) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/active_labels`, {
      method: "GET",
      headers: makeHeaders(token),
    });
    const result = await response.json();
    console.log("Result from getActiveLabelsCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserLabelsCall = async (token) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/labels`, {
      method: "GET",
      headers: makeHeaders(token),
    });
    const result = await response.json();
    console.log("Result from getUserLabelsCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editLabelCall = async (token, labelId, label_name) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/edit_label`, {
      method: "PATCH",
      headers: makeHeaders(token),
      body: JSON.stringify({
        labelId: labelId,
        label_name: label_name,
      }),
    });
    const result = await response.json();
    console.log("Result from editNoteLabelCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createLabelCall = async (token, label_name) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/create_label`, {
      method: "POST",
      headers: makeHeaders(token),
      body: JSON.stringify({
        label_name: label_name,
      }),
    });
    const result = await response.json();
    console.log("Result from createLabelCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteLabelCall = async (token, labelId) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/delete_label`, {
      method: "DELETE",
      headers: makeHeaders(token),
      body: JSON.stringify({
        labelId: labelId,
      }),
    });
    const result = await response.json();
    console.log("Result from deleteLabelCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addLabelToNoteCall = async (token, labelId, noteId) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/add_label_to_note`, {
      method: "PATCH",
      headers: makeHeaders(token),
      body: JSON.stringify({
        labelId: labelId,
        noteId: noteId,
      }),
    });
    const result = await response.json();
    console.log("Result from addLabelToNoteCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeLabelFromNoteCall = async (token, labelId, noteId) => {
  try {
    const response = await fetch(
      `${URL}/api/notes/user/remove_label_from_note`,
      {
        method: "PATCH",
        headers: makeHeaders(token),
        body: JSON.stringify({
          labelId: labelId,
          noteId: noteId,
        }),
      }
    );
    const result = await response.json();
    console.log("Result from removeLabelFromNoteCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNotesByLabelCall = async (token) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/notes_by_label`, {
      method: "GET",
      headers: makeHeaders(token),
    });
    const result = await response.json();
    console.log("Result from getNotesByLabelCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

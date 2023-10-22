const URL = "http://localhost:4000";

const makeHeaders = (token) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

//User API calls

export const registerCall = async (name, email, password) => {
  try {
    const response = await fetch(`${URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginCall = async (email, password) => {
  try {
    const response = await fetch(`${URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const result = await response.json();
    console.log("Result from loginCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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

export const createNoteCall = async (token, title, name, color, label_name) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/create_note`, {
      method: "POST",
      headers: makeHeaders(token),
      body: JSON.stringify({
        title: title,
        name: name,
        color: color,
        labels: label_name,
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
    console.log("createItemCall: ", id, name);
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

export const editItemNameCall = async (token, id, item_name, noteId) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/edit_item`, {
      method: "PATCH",
      headers: makeHeaders(token),
      body: JSON.stringify({
        id: id,
        item_name: item_name,
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

export const deleteNoteCall = async (token, noteId) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/delete_note`, {
      method: "DELETE",
      headers: makeHeaders(token),
      body: JSON.stringify({
        noteId: noteId,
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

export const archiveNoteCall = async (token, noteId) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/archive_note`, {
      method: "PATCH",
      headers: makeHeaders(token),
      body: JSON.stringify({
        noteId: noteId,
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

export const unarchiveNoteCall = async (token, noteId) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/unarchive_note`, {
      method: "PATCH",
      headers: makeHeaders(token),
      body: JSON.stringify({
        noteId: noteId,
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

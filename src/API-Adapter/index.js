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
    const response = await fetch(`${URL}/api/notes/user/archived`, {});
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

export const editNoteCall = async (token, id, fields) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/edit_note`, {
      method: "PATCH",
      headers: makeHeaders(token),
      body: JSON.stringify({
        id: id,
        ...fields,
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
export const createItemCall = async (token, noteId, name) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/add_item`, {
      method: "POST",
      headers: makeHeaders(token),
      body: JSON.stringify({
        noteId: noteId,
        name: name,
      }),
    });
    const result = await response.json();
    console.log("Result from createNoteItem: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editItemCall = async (token, id, fields) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/edit_item`, {
      method: "PATCH",
      headers: makeHeaders(token),
      body: JSON.stringify({
        id: id,
        ...fields,
      }),
    });
    const result = await response.json();
    console.log("Result from editItemCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteNote = async (token, noteId) => {
  try {
    const response = await fetch(
      `${URL}/api/notes/user/${noteId}/delete_note`,
      {
        body: JSON.stringify({
          noteId: noteId,
        }),
      }
    );
    const result = await response.json();
    console.log("Result from deleteNote: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const archiveNote = async (token, noteId) => {
  try {
    const response = await fetch(
      `${URL}/api/notes/user/${noteId}/archive_note`,
      {
        body: JSON.stringify({
          noteId: noteId,
        }),
      }
    );
    const result = await response.json();
    console.log("Result from archiveNote: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const unarchiveNote = async (token, noteId) => {
  try {
    const response = await fetch(
      `${URL}/api/notes/user/${noteId}/unarchive_note`,
      {
        body: JSON.stringify({
          noteId: noteId,
        }),
      }
    );
    const result = await response.json();
    console.log("Result from unarchiveNote: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

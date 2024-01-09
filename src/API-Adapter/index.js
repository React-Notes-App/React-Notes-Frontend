// const URL = "https://react-notes-app-dy4o.onrender.com";
const URL = "http://localhost:4000";

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
      mode: "cors",
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
      mode: "cors",
      headers: makeHeaders(token),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserCall = async (token, fields) => {
  try {
    const response = await fetch(`${URL}/api/users/me/edit-info`, {
      method: "PATCH",
      mode: "cors",
      headers: makeHeaders(token),
      body: JSON.stringify({
        ...fields,
      }),
    });
    const result = await response.json();
    console.log("Result from updateUserCall: ", result);
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
      mode: "cors",
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
  itemName,
  color,
  date,
  is_archived,
  has_checklist,
  is_deleted,
  label_name,
  labelId
) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/create_note`, {
      method: "POST",
      mode: "cors",
      headers: makeHeaders(token),
      body: JSON.stringify({
        title: title,
        itemName: itemName,
        color: color,
        date,
        is_archived: is_archived,
        has_checklist: has_checklist,
        is_deleted: is_deleted,
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

export const createCopyCall = async (
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
) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/create_note_copy`, {
      method: "POST",
      mode: "cors",
      headers: makeHeaders(token),
      body: JSON.stringify({
        title: title,
        itemNames: itemNames,
        color: color,
        date: date,
        is_archived: is_archived,
        has_checklist: has_checklist,
        is_deleted: is_deleted,
        itemsCompleted: itemsCompleted,
        labelIds: labelIds,
      }),
    });
    const result = await response.json();
    console.log("Result from createCopyCall: ", result);
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
      mode: "cors",
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
      mode: "cors",
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

export const createItemCall = async (token, id, itemName) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/add_item`, {
      method: "POST",
      mode: "cors",
      headers: makeHeaders(token),
      body: JSON.stringify({
        id: id,
        itemName: itemName,
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
      mode: "cors",
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
      mode: "cors",
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
      mode: "cors",
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

export const trashNoteCall = async (token, id) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/trash_note`, {
      method: "PATCH",
      mode: "cors",
      headers: makeHeaders(token),
      body: JSON.stringify({
        id: id,
      }),
    });
    const result = await response.json();
    console.log("Result from trashNoteCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeFromTrashCall = async (token, id) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/remove_from_trash`, {
      method: "PATCH",
      mode: "cors",
      headers: makeHeaders(token),
      body: JSON.stringify({
        id: id,
      }),
    });
    const result = await response.json();
    console.log("Result from removeFromTrashCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteNotePermCall = async (token, id) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/delete_note_perm`, {
      method: "DELETE",
      mode: "cors",
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
      mode: "cors",
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
      mode: "cors",
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

export const hideCheckboxesCall = async (token, id) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/hide_checkboxes`, {
      method: "PATCH",
      mode: "cors",
      headers: makeHeaders(token),
      body: JSON.stringify({
        id: id,
      }),
    });
    const result = await response.json();
    console.log("Result from hideCheckboxesCall: ", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const showCheckboxesCall = async (token, id) => {
  try {
    const response = await fetch(`${URL}/api/notes/user/show_checkboxes`, {
      method: "PATCH",
      mode: "cors",
      headers: makeHeaders(token),
      body: JSON.stringify({
        id: id,
      }),
    });
    const result = await response.json();
    console.log("Result from showCheckboxesCall: ", result);
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
      mode: "cors",
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
      mode: "cors",
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
      mode: "cors",
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
      mode: "cors",
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
      mode: "cors",
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
      mode: "cors",
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
        mode: "cors",
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
      mode: "cors",
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

export const testEmailCall = async () => {
  try {
    const response = await fetch(`${URL}/api/email/test`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Result from testEmailCall: ", response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const sendOTPCall = async (email, OTP) => {
  try {
    const response = await fetch(`${URL}/api/email/sendOTP`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        OTP: OTP,
      }),
    });

    console.log("Result from sendEmailCall: ", response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const resetPasswordCall = async (email, password) => {
  try {
    const response = await fetch(`${URL}/api/users/me/reset-password`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    console.log("Result from updatePasswordCall: ", response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

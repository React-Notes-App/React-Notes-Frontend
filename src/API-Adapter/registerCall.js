const URL = "https://react-notes-app-dy4o.onrender.com";
// const URL = "http://localhost:4000";

export const registerCall = async (name, email, password) => {
  try {
    const response = await fetch(`${URL}/api/users/register`, {
      method: "POST",
      mode: "cors",
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

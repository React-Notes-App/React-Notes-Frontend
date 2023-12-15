// const URL = "https://todo-app-7yv2.onrender.com";
const URL = "http://localhost:4000";

export const loginCall = async (email, password) => {
  try {
    const response = await fetch(`${URL}/api/users/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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

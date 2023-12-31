import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to LogIn");
  }
  const data = await res.data;
  return data;
};

export const signUpUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("user/signup", { name, email, password });
  if (res.status !== 200) {
    throw new Error("Unable to LogIn");
  }
  const data = await res.data;
  return data;
};

// check if the user cookies already exits on the browser. logic is being handled in the backend
export const checkAuthStatus = async () => {
  const res = await axios.get("user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to Authenticate");
  }
  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const token = localStorage.getItem("token");
  const res = await axios.post("/chat/new", { message, token });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};
// Get the chats of user
export const getUserChats = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.post("/chat/all-chats", {
    token: token,
  });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

// DELETE Chats
export const clearConversation = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.post("/chat/delete", { token });
  if (res.status !== 200) {
    throw new Error("Unable to Delete chat");
  }
  const data = await res.data;
  return data;
};

// LogOut uer
export const logOutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to Logout");
  }
  const data = await res.data;
  return data;
};

import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("user/login", { email, password });
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

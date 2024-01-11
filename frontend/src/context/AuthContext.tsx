import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  // checkAuthStatus,
  // logOutUser,
  loginUser,
  signUpUser,
} from "../helpers/api-communicator";

// Defining the types
type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
// Create the context
const AuthContext = createContext<UserAuth | null>(null);

// Provide the context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch if the user's cookies are valid then skip login
    // if the cookies exits then login
    async function checkStatus() {
      // const data = await checkAuthStatus();
      const data = JSON.parse(localStorage.getItem("user") || "");
      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsLoggedIn(true);
      }
    }
    checkStatus();
  }, []);

  // LogIn
  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ email: data.email, name: data.name })
      );
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const data = await signUpUser(name, email, password);
    if (data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ email: data.email, name: data.name })
      );
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  };

  const logout = async () => {
    // await logOutUser();
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
    // window.location.reload();
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };

  // doing this to provide the context provider enclosed in a fun that return provider
  // no need to export multiple packages

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const UseAuth = () => useContext(AuthContext);

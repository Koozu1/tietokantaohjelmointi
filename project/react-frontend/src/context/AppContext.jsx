import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if ((token === null) !== (user === null)) {
      logout();
    }
  });

  const login = ({ token, userData }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", userData);
    setUser(userData);
    setToken(token);
    setCart([]);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart([]);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AppContext.Provider
      value={{ user, setUser, cart, setCart, token, logout, login }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

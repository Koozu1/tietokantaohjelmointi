import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(new Set());
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    let user;
    try {
      user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
    } catch {
      logout();
    }

    if ((token === null) !== (user === null)) {
      logout();
    }
    setUser(user);
  }, []);

  const login = ({ token, userData }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setToken(token);
    setCart(new Set());
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart(new Set());
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

import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(0);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let user;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch {
      console.log("LOGGING OUT2");
      logout();
    }

    if ((token === null) !== (user === null)) {
      console.log("LOGGING OUT");
      logout();
    }
    setToken(token);
    setUser(user);
    setCart(0);
  }, []);

  const login = ({ token, userData }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    console.log("SETTING userdata in context to", userData);
    setToken(token);
    setCart(0);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setCart(0);
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

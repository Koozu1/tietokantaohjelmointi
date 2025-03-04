import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("token");
  };

  return (
    <AppContext.Provider value={{ user, setUser, cart, setCart, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

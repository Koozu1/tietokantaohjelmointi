import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, user } = useAppContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/login", {
        email,
        password,
      });
      const userData = res.data.user;
      login({
        token: res.data.token,
        userData: {
          id: userData.id,
          name: userData.username,
          email: userData.email,
          isAdmin: userData.isAdmin,
        },
      });
    } catch (error) {
      alert("Error logging in: " + error.response.data.error);
    }
  };

  if (user) return <Navigate to="/frontpage" />;

  return (
    <form onSubmit={handleLogin} className="max-w-[800px] w-full mx-auto p-4 space-y-4 bg-[#f9f9f9] shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center">Kirjaudu sisään</h2>
      <input
        type="email"
        placeholder="Sähköposti"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border border-gray-400 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Salasana"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 border border-gray-400 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">Kirjaudu sisään</button>

      <p className="text-center mt-4">
        Ei vielä käyttäjätunnusta?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Rekisteröidy täällä
        </Link>
      </p>
    </form>
  );
};

export default Login;






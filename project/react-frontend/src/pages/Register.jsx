import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/register", {
        username,
        email,
        password,
      });
      setRegistrationSuccess(true);
      alert("Registration successful!");
    } catch (error) {
      alert("Error registering: " + error.response.data.error);
    }
  };

  if (registrationSuccess) {
    return <Navigate to="/login" />;
  }

  return (
    <form onSubmit={handleRegister} className="max-w-[800px] mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Luo käyttäjätunnus ja salasana</h2>
      <input
        type="text"
        placeholder="Käyttäjätunnus"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <input
        type="email"
        placeholder="Sähköposti"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <input
        type="password"
        placeholder="Salasana"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
        Rekisteröidy
      </button>
    </form>
  );
};

export default Register;

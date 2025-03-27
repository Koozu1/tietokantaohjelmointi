import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/register", {
        name,
        address,
        phone,
        email,
        password,
      });
      setRegistrationSuccess(true);
      alert("Rekisteröinti onnistui!");
    } catch (error) {
      alert("Virhe rekisteröinnissä: " + error.response.data.error);
    }
  };

  if (registrationSuccess) {
    return <Navigate to="/login" />;
  }

  return (
    <form 
      onSubmit={handleRegister} 
      className="max-w-[800px] w-full mx-auto p-6 space-y-4 bg-[#f9f9f9] shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-center">Rekisteröidy</h2>

      <input
        type="text"
        placeholder="Nimi"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 bg-white rounded-md"
      />

      <input
        type="text"
        placeholder="Osoite"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 bg-white rounded-md"
      />

      <input
        type="tel"
        placeholder="Puhelinnumero"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 bg-white rounded-md"
      />

      <input
        type="email"
        placeholder="Sähköposti"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 bg-white rounded-md"
      />

      <input
        type="password"
        placeholder="Salasana"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 bg-white rounded-md"
      />

      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Rekisteröidy
      </button>
    </form>
  );
};

export default Register;

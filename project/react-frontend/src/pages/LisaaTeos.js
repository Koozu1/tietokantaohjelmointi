import React, { useState } from "react";
import { Link } from "react-router-dom";
import Notification from "../components/Notification";

const LisaaTeos = () => {
  const [nimi, setNimi] = useState("");
  const [isbn, setIsbn] = useState("");
  const [hinta, setHinta] = useState("");
  const [sisäänostohinta, setSisäänostohinta] = useState("");
  const [paino, setPaino] = useState("");
  const [teostyyppi, setTeostyyppi] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTeos = { nimi, isbn, hinta, sisäänostohinta, paino, teostyyppi };

    try {
      const response = await fetch("http://localhost:3000/lisaateos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeos),
      });

      if (response.ok) {
        setNotification({ message: "Teos lisätty onnistuneesti!", type: "success" });
        setNimi("");
        setIsbn("");
        setHinta("");
        setSisäänostohinta("");
        setPaino("");
        setTeostyyppi("");
      } else {
        setNotification({ message: "Virhe lisättäessä teosta.", type: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({ message: "Virhe lisättäessä teosta.", type: "error" });
    }
  };

  return (
    <div>
      <Link to="/frontpage">Takaisin etusivulle</Link>
      <h1>Lisää Teos</h1>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nimi:</label>
          <input
            type="text"
            value={nimi}
            onChange={(e) => setNimi(e.target.value)}
            required
          />
        </div>
        <div>
          <label>ISBN:</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hinta:</label>
          <input
            type="number"
            step="0.01"
            value={hinta}
            onChange={(e) => setHinta(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sisäänostohinta:</label>
          <input
            type="number"
            step="0.01"
            value={sisäänostohinta}
            onChange={(e) => setSisäänostohinta(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Paino:</label>
          <input
            type="number"
            step="0.01"
            value={paino}
            onChange={(e) => setPaino(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Teostyyppi:</label>
          <input
            type="text"
            value={teostyyppi}
            onChange={(e) => setTeostyyppi(e.target.value)}
            required
          />
        </div>
        <button type="submit">Lisää</button>
      </form>
    </div>
  );
};

export default LisaaTeos;
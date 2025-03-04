import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Notification from "../components/Notification";

const LisaaTeos = () => {
  const [nimi, setNimi] = useState("");
  const [tekijä, setTekijä] = useState("");
  const [isbn, setIsbn] = useState("");
  const [julkaisuvuosi, setJulkaisuvuosi] = useState("");
  const [teostyyppi, setTeostyyppi] = useState("");
  const [paino, setPaino] = useState("");
  const [hinta, setHinta] = useState("");
  const [sisäänostohinta, setSisäänostohinta] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTeos = { nimi, tekijä, isbn, julkaisuvuosi, teostyyppi, paino, hinta, sisäänostohinta };

    try {
      const response = await axios.post("http://localhost:5000/lisaateos", newTeos);

      if (response.status === 201) {
        setNotification({ message: "Teos lisätty onnistuneesti!", type: "success" });
        setNimi("");
        setTekijä("");
        setIsbn("");
        setJulkaisuvuosi("");
        setTeostyyppi("");
        setPaino("");
        setHinta("");
        setSisäänostohinta("");
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
          <label>Tekijä:</label>
          <input
            type="text"
            value={tekijä}
            onChange={(e) => setTekijä(e.target.value)}
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
          <label>Julkaisuvuosi:</label>
          <input
            type="number"
            value={julkaisuvuosi}
            onChange={(e) => setJulkaisuvuosi(e.target.value)}
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
        <button type="submit">Lisää</button>
      </form>
    </div>
  );
};

export default LisaaTeos;
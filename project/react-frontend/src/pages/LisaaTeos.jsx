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
  const [teosluokka, setTeosluokka] = useState("");
  const [paino, setPaino] = useState("");
  const [hinta, setHinta] = useState("");
  const [sisäänostohinta, setSisäänostohinta] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [activeTab, setActiveTab] = useState("d1");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTeos = { nimi, tekijä, isbn, julkaisuvuosi, teostyyppi, teosluokka, paino, hinta, sisäänostohinta };
    const url = activeTab === "d1" ? "http://localhost:5001/lisaateos" : "http://localhost:5001/lisaateoskeskusdivari";

    try {
      const response = await axios.post(url, newTeos);

      if (response.status === 201) {
        setNotification({ message: "Teos lisätty onnistuneesti!", type: "success" });
        setNimi("");
        setTekijä("");
        setIsbn("");
        setJulkaisuvuosi("");
        setTeostyyppi("");
        setTeosluokka("");
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
    <div className="max-w-[800px] w-full mx-auto p-4 space-y-4 bg-[#f9f9f9] shadow-md rounded-lg">
      <Link to="/frontpage" className="text-blue-500 hover:underline">Takaisin etusivulle</Link>
      <h1 className="text-2xl font-bold mb-4">Lisää Teos</h1>
      <Notification message={notification.message} type={notification.type} />
      <div className="mb-4">
        <button
          className={`px-4 py-2 ${activeTab === "d1" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"} rounded-t-lg`}
          onClick={() => setActiveTab("d1")}
        >
          Lassen Lehti (D1)
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "keskusdivari" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"} rounded-t-lg`}
          onClick={() => setActiveTab("keskusdivari")}
        >
          Galleinn Galle (D2)
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nimi:</label>
          <input
            type="text"
            value={nimi}
            onChange={(e) => setNimi(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tekijä:</label>
          <input
            type="text"
            value={tekijä}
            onChange={(e) => setTekijä(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ISBN:</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Julkaisuvuosi:</label>
          <input
            type="number"
            value={julkaisuvuosi}
            onChange={(e) => setJulkaisuvuosi(e.target.value)}
            min="1800"
            max="3000"
            required
            className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Teostyyppi:</label>
          <select
            value={teostyyppi}
            onChange={(e) => setTeostyyppi(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Valitse teostyyppi</option>
            <option value="cd">CD</option>
            <option value="kirja">Kirja</option>
            <option value="lehti">Lehti</option>
            <option value="sarjakuva">Sarjakuva</option>
          </select>
        </div>
        <div>
  <label className="block text-sm font-medium text-gray-700">Teosluokka:</label>
  <select
    value={teosluokka}
    onChange={(e) => setTeosluokka(e.target.value)}
    required
    className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="">Valitse teosluokka</option>
    <option value="romantiikka">Romantiikka</option>
    <option value="seikkailu">Seikkailu</option>
    <option value="toiminta">Toiminta</option>
    <option value="draama">Draama</option>
    <option value="sotakirjallisuus">Sotakirjallisuus</option>
    <option value="historiallinen fiktio">Historiallinen fiktio</option>
    <option value="realismi">Realismi</option>
    <option value="tiede">Tiede</option>
    <option value="luonto">Luonto</option>
    <option value="lasten sarjakuvat">Lasten sarjakuvat</option>
    <option value="historiallinen romaani">Historiallinen romaani</option>
    <option value="feminismi">Feminismi</option>
  </select>
</div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Paino(g):</label>
          <input
            type="number"
            value={paino}
            onChange={(e) => setPaino(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hinta(€):</label>
          <input
            type="number"
            step="0,00"
            value={hinta}
            onChange={(e) => setHinta(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sisäänostohinta(€):</label>
          <input
            type="number"
            step="0,00"
            value={sisäänostohinta}
            onChange={(e) => setSisäänostohinta(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Lisää
        </button>
      </form>
    </div>
  );
};

export default LisaaTeos;

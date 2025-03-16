import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const addToOstoskori = async (teos_id) => {
  console.log("Adding to shopping cart id", teos_id);
};

const Search = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  //const [searchTerm, setSearchTerm] = useState("");

  // Kolme erillistä tilamuuttujaa
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  const [books, setBooks] = useState([]);
  const token = localStorage.getItem("token");

  console.log("TOKEN IS ", token);
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const handleSearch = async () => {
    if (!author.trim() && !title.trim() && !type.trim()) return;
    try {
      const response = await axios.get(
        `http://localhost:5001/search?author=${author}&title=${title}&type=${type}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Jos dataa ei löytynyt:
      if (response.data.length === 0) {
        // Tyhjennetään kentät ja mahdollisesti setBooks
        setAuthor("");
        setTitle("");
        setType("");
        setBooks([]);
        alert("Hakutuloksia ei löytynyt annetuilla kriteereillä.");
      } else {
        // Hakutuloksia löytyi – tallennetaan ne
        setBooks(response.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      // Tyhjennetään kentät ja tuloslista virheen sattuessa
      setAuthor("");
      setTitle("");
      setType("");
      setBooks([]);
      alert("Hakutuloksia ei löytynyt annetuilla kriteereillä.");
    }
  };

  if (isAuthenticated === false) {
    console.log("REDIRECTING TO LOGIN, state ", isAuthenticated);
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <br></br>
      <h1>Haku</h1>
      <p>Voit hakea kirjoja antamalla eri hakukriteerejä:</p>
      {/* Hakukenttä tekijälle */}
      <div>
        <label>Tekijä: </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Esim. J.K. Rowling"
        />
      </div>

      {/* Hakukenttä kirjan nimelle */}
      <div>
        <label>Teoksen nimi: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Esim. Harry Potter"
        />
      </div>

      {/* Hakukenttä teostyypille */}
      <div>
        <label>Teostyyppi: </label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Esim. romaani, dekkari..."
        />
      </div>

      <button onClick={handleSearch}>Etsi</button>
      <div>
      
        {books.length > 0 ? (
          <ul>
            {books.map((book, index) => (
              <div>
                <br></br>
                <h3>
                  {index + 1}: {book.nimi}
                </h3>
                <p>Tekijä: {book.tekijä}</p>
                <p>Julkaisuvuosi: {book.julkaisuvuosi}</p>
                <p>Teostyyppi: {book.teostyyppi}</p>
                <p>Paino: {book.paino} g</p>
                <p>Hinta: {book.hinta} g</p>
                <br></br>
                <button
                  onClick={() => {
                    addToOstoskori(book.teos_id);
                  }}
                >
                  Lisää ostoskoriin
                </button>
                <br></br>
              </div>
            ))}
          </ul>
        ) : (
          <p>Ei hakutuloksia</p>
        )}
      </div>
    </div>
  );
};

export default Search;

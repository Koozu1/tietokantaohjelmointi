import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const addToOstoskori = async (teos_id) => {
  console.log("Adding to shopping cart id", teos_id);
};

const Search = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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
    if (!searchTerm.trim()) return;
    try {
      const response = await axios.get(
        `http://localhost:5000/search?query=${searchTerm}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBooks(response.data);
      console.log(books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  if (isAuthenticated === false) {
    console.log("REDIRECTING TO LOGIN, state ", isAuthenticated);
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Haku</h1>
      <p>Syötä tekstiä hakukenttään, se ei tosin vaikuta hakutuloksiin.</p>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="hakusana"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {books.length > 0 ? (
          <ul>
            {books.map((book, index) => (
              <div>
                <h3>
                  {index + 1}: {book.nimi}
                </h3>
                <p>Tekijä: {book.tekijä}</p>
                <p>Julkaisuvuosi: {book.julkaisuvuosi}</p>
                <p>Teostyyppi: {book.teostyyppi}</p>
                <p>Paino: {book.paino} kg</p>
                <button
                  onClick={() => {
                    addToOstoskori(book.teos_id);
                  }}
                >
                  Lisää ostoskoriin
                </button>
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

import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

  const { cart, setCart, user, token } = useAppContext();

  const addToOstoskori = async (teos_id) => {
    console.log("Adding to shopping cart id", teos_id);
    console.log(cart);
    setCart((cart) => [...cart, teos_id]);
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

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
              <div class="p-4 border rounded-lg shadow-sm">
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
                  class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
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

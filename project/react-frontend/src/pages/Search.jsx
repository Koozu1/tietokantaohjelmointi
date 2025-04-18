import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const Search = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [genre, setGenre] = useState("");
  const [books, setBooks] = useState([]);

  const { cart, setCart, user, token } = useAppContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5001/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.itemIds) {
          setCart(new Set(response.data.itemIds));
        }
      } catch {}
    }
    fetchData();
  }, [token, setCart]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const addToCart = async (itemId) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/cart",
        { itemId: itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.itemIds) {
        setCart(new Set(response.data.itemIds));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFromCart = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/cart?itemId=${itemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setCart((prevCart) => {
          const newCart = new Set(prevCart);
          newCart.delete(itemId);
          return newCart;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    setBooks([]);

    try {
      const response = await axios.get(
        `http://localhost:5001/search?author=${author}&title=${title}&type=${type}&genre=${genre}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Haku</h1>
      <p style={styles.description}>Hae kirjoja eri hakukriteereillä</p>

      <div style={styles.formGroup}>
        <label style={styles.label}>Tekijä:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Esim. J.K. Rowling"
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Teoksen nimi:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Esim. Harry Potter"
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Teostyyppi:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={styles.input} 
          className="hover:cursor-pointer"
        >
        <option value="" >Valitse teostyyppi</option>
        <option value="cd">CD</option>
        <option value="kirja">Kirja</option>
        <option value="lehti">Lehti</option>
        <option value="sarjakuva">Sarjakuva</option>
      </select>
    </div>

    <div style={styles.formGroup}>
        <label style={styles.label}>Teosluokka:</label>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={styles.input}
          className="hover:cursor-pointer"
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

      <button style={styles.searchButton} onClick={handleSearch}>
        Etsi
      </button>

      <div style={styles.resultsContainer}>
        {books.length > 0 ? (
          books.map((book, index) => (
            <div key={book.teos_id} style={styles.bookCard}>
              <h3 style={styles.bookTitle}>
                {index + 1}: {book.nimi}
              </h3>
              <p style={styles.bookDetail}>Tekijä: {book.tekijä}</p>
              <p style={styles.bookDetail}>Julkaisuvuosi: {book.julkaisuvuosi}</p>
              <p style={styles.bookDetail}>Teostyyppi: {book.teostyyppi}</p>
              <p style={styles.bookDetail}>Teosluokka: {book.teosluokka}</p>
              <p style={styles.bookDetail}>Paino: {book.paino} g</p>
              <p style={styles.bookDetail}>Hinta: {book.hinta} €</p>
              {!cart.has(book.nide_id) ? (
                <button
                  style={styles.addButton}
                  onClick={() => {
                    addToCart(book.nide_id);
                  }}
                >
                  Lisää ostoskoriin
                </button>
              ) : (
                <button
                  style={styles.removeButton}
                  onClick={() => {
                    deleteFromCart(book.nide_id);
                  }}
                >
                  Poista ostoskorista
                </button>
              )}
            </div>
          ))
        ) : (
          <p style={styles.noResults}>Ei hakutuloksia</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "10px auto",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    fontSize: "25px",
  },
  description: {
    textAlign: "center",
    color: "#666",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
  },
  searchButton: {
    display: "block",
    width: "100%",
    padding: "12px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "20px",
    fontSize: "16px",
  },
  resultsContainer: {
    marginTop: "20px",
  },
  bookCard: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "4px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    marginBottom: "15px",
  },
  bookTitle: {
    margin: "0 0 10px 0",
    color: "#007BFF",
  },
  bookDetail: {
    margin: "5px 0",
    color: "#555",
  },
  addButton: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  removeButton: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#ff0000",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  noResults: {
    textAlign: "center",
    color: "#888",
  },
};

export default Search;

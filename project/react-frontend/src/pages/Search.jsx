import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const Search = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
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

  const addToOstoskori = async (itemId) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/cart",
        { itemId: itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.itemIds) {
        setCart(new Set(response.data.itemIds));
      }
    } catch {}
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/search?author=${author}&title=${title}&type=${type}`,
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
        <label style={styles.label}>Kirjan nimi:</label>
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
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Esim. romaani, dekkari..."
          style={styles.input}
        />
      </div>

      <button style={styles.searchButton} onClick={handleSearch}>
        Search
      </button>

      <div style={styles.resultsContainer}>
        {books.length > 0 ? (
          books.map((book, index) => (
            <div key={book.teos_id} style={styles.bookCard}>
              <h3 style={styles.bookTitle}>
                {index + 1}: {book.nimi}
              </h3>
              <p style={styles.bookDetail}>Tekijä: {book.tekijä}</p>
              <p style={styles.bookDetail}>
                Julkaisuvuosi: {book.julkaisuvuosi}
              </p>
              <p style={styles.bookDetail}>Teostyyppi: {book.teostyyppi}</p>
              <p style={styles.bookDetail}>Paino: {book.paino} g</p>
              {!cart.has(book.teos_id) ? (
                <button
                  style={styles.addButton}
                  onClick={() => {
                    addToOstoskori(book.teos_id);
                  }}
                >
                  Lisää ostoskoriin
                </button>
              ) : (
                <button
                  style={styles.removeButton}
                  // onClick={removeFromOstoskori(book.teos_id)}
                >
                  Poista ostoskorista (TBA)
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
    margin: "20px auto",
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

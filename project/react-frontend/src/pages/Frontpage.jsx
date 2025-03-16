import React from "react";

const Frontpage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.welcomeMessage}>
        <h2 style={styles.heading}>Tervetuloa Kirjakeitaaseen!</h2>
        <p style={styles.description}>
        Hyvin säilyneet kirjat ja sarjakuvat odottavat sinua! Meiltä löydät vanhat klassikot, unohtuneet helmet ja rakastetut sarjat 
        – kaikki kohtuuhintaan. Tervetuloa tekemään löydöksiä.
        </p>
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
    marginBottom: "1.5rem",
  },
  description: {
    textAlign: "center",
    color: "#666",
  },
  welcomeMessage: {
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    textAlign: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    marginBottom: "1.5rem",
  }
};

export default Frontpage;

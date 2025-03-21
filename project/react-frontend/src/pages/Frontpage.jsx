import React from "react";

const Frontpage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.welcomeMessage}>
        <h2 style={styles.heading}>KirjaKeidas</h2>
        <p style={styles.description}>
          Hyvin säilyneet kirjat ja sarjakuvat odottavat sinua! Meiltä löydät
          vanhat klassikot, unohtuneet helmet ja rakastetut sarjat – kaikki
          kohtuuhintaan. Tervetuloa tekemään löytöjä.
        </p>

        <div style={styles.imageContainer}>
        <img
          src="https://www.suomalainen.com/cdn/shop/files/48f29b0dd97346aa92352ba14024eec19789510098752_1_4d6f0640-9662-4630-86c6-eeda6ad27da7.jpg?v=1716371264" // Korvaa oma kuva URL:llä
          alt="Sinuhe egyptiläinen"
          style={styles.image}
        />

        <img
          src="https://www.suomalainen.com/cdn/shop/files/ee501f61b3be41b1b5af20f98dd7649d9789510365304_1.jpg?v=1714276736&width=950"
          alt="Tuntematon sotilas"
          style={styles.image}
        />

        <img
          src="https://kirjapino.fi/wp-content/uploads/2021/09/y3eywf8xcltfbfp8k6pq_260603b3f49.jpg" 
          alt="Tummien perhosten koti"
          style={styles.image}
        />

        <img
          src="https://www.sofioksanen.fi/media/sofi-oksanen-puhdistus-wsoy.jpg"
          alt="Puhdistus"
          style={styles.image}
        />          

        </div>     
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
    marginBottom: "3rem",
  },
  welcomeMessage: {
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    textAlign: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    marginBottom: "1.5rem",
  },
  imageContainer: {
    display: "flex", // Käytetään Flexboxia
    justifyContent: "center", // Keskitetään kuvat vaakasuunnassa
    gap: "20px", // Lisää väliä kuvien väliin
    marginTop: "20px", // Lisätään hieman tilaa ylhäältä
  },
  image: {
    width: "20%", // Täyttää kuvan vanhemman elementin leveys
    maxWidth: "400px", // Määritellään maksimileveys
    height: "auto", // Kuvan korkeus säädetään automaattisesti
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  }
};


export default Frontpage;

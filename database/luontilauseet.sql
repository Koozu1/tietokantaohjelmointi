--Ryhmä 12: Noora Ahonen, Niina Nevala, Onni Pylvänen


CREATE SCHEMA keskusdivari;
CREATE SCHEMA d1_divari;

-----------------------------------------------------------------------------------

-- KESKUSDIVARI SKEEMAN TAULUT:


-- Käyttäjärekisteri
CREATE TABLE keskusdivari.käyttäjä (
    käyttäjä_id SERIAL PRIMARY KEY,
    nimi VARCHAR(50),
    osoite  VARCHAR(100),
    email VARCHAR(50),
    puhelin VARCHAR(13),
    salasana VARCHAR(60),
    pääkäyttäjä BOOLEAN
);


-- Divari D2 taulu
CREATE TABLE keskusdivari.divari_d2 ( 
    divari_id SERIAL PRIMARY KEY,  
    nimi VARCHAR(255) NOT NULL, 
    osoite VARCHAR(255) NOT NULL, 
    web_sivu VARCHAR(255)
); 

-- Teostyyppi
CREATE TABLE keskusdivari.teostyyppi (
    teostyyppi_id SERIAL PRIMARY KEY,
    tyyppi_nimi VARCHAR(100) NOT NULL
);

-- Yksittäinen teos
CREATE TABLE keskusdivari.teos (
    teos_id SERIAL PRIMARY KEY,
    nimi VARCHAR(255) NOT NULL,
    tekijä VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) NOT NULL,
    hinta DECIMAL(10, 2) NOT NULL,
    sisäänostohinta DECIMAL(10, 2) NOT NULL,
    paino DECIMAL(10, 2) NOT NULL,
    teostyyppi_id INT,
    FOREIGN KEY (teostyyppi_id) REFERENCES keskusdivari.teostyyppi(teostyyppi_id)
);




-- Tilaus D2 divarille
CREATE TABLE keskusdivari.tilaus (
    tilaus_id SERIAL PRIMARY KEY,
    kokonaispaino INT,
    postikulut DECIMAL(10, 2),
    kokonaishinta DECIMAL(10, 2),
    myyntipäivämäärä DATE,
    divari_id INT,
	käyttäjä_id INT,
    FOREIGN KEY (divari_id) REFERENCES keskusdivari.divari_d2(divari_id),
    FOREIGN KEY (käyttäjä_id) REFERENCES keskusdivari.käyttäjä(käyttäjä_id)
);

-- D2 Ostoskori, jossa tuotteet
CREATE TABLE keskusdivari.ostoskori ( 
    teos_id INT,  
    tilaus_id INT,
	PRIMARY KEY (teos_id, tilaus_id),
    FOREIGN KEY (teos_id) REFERENCES keskusdivari.teos(teos_id),
    FOREIGN KEY (tilaus_id) REFERENCES keskusdivari.tilaus(tilaus_id)
); 



-- Kopio taulusta D1_divari.Teos
CREATE TABLE keskusdivari.teos_d1 (
    teos_id INT PRIMARY KEY,
    nimi VARCHAR(255) NOT NULL,
    tekijä VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) NOT NULL,
    hinta DECIMAL(10, 2) NOT NULL,
    sisäänostohinta DECIMAL(10, 2) NOT NULL,
    paino DECIMAL(10, 2),
    teostyyppi_id INT
);


-- Kopio taulusta D1_divari.Teostyyppi
CREATE TABLE keskusdivari.teostyyppi_d1 (
    teostyyppi_id INT PRIMARY KEY,
    tyyppi_nimi VARCHAR(100) NOT NULL
);



-----------------------------------------------------------------------------------


-- D1_DIVARIN SKEEMAN TAULUT:


-- Divari D1 taulu
CREATE TABLE d1_divari.divari_d1 ( 
    divari_id SERIAL PRIMARY KEY, 
    nimi VARCHAR(255) NOT NULL, 
    osoite VARCHAR(255) NOT NULL, 
    web_sivu VARCHAR(255)
); 

-- D1 Teostyypit
CREATE TABLE d1_divari.teostyyppi (
    teostyyppi_id SERIAL PRIMARY KEY,
    tyyppi_nimi VARCHAR(100) NOT NULL
);

-- D1 Yksittäinen teos
CREATE TABLE d1_divari.teos (
    teos_id SERIAL PRIMARY KEY,
    nimi VARCHAR(255) NOT NULL,
    tekijä VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) NOT NULL,
    hinta DECIMAL(10, 2) NOT NULL,
    sisäänostohinta DECIMAL(10, 2) NOT NULL,
    paino DECIMAL(10, 2) NOT NULL,
    teostyyppi_id INT,
    FOREIGN KEY (teostyyppi_id) REFERENCES d1_divari.teostyyppi(teostyyppi_id)
);

-- Tilaus D1 divarille
CREATE TABLE d1_divari.tilaus (
    tilaus_id SERIAL PRIMARY KEY,
    kokonaispaino INT,
    postikulut DECIMAL(10, 2),
    kokonaishinta DECIMAL(10, 2),
    myyntipäivämäärä DATE,
    divari_id INT,
    käyttäjä_id INT,
    FOREIGN KEY (divari_id) REFERENCES d1_divari.divari_d1(divari_id),
	FOREIGN KEY (käyttäjä_id) REFERENCES keskusdivari.käyttäjä(käyttäjä_id)
);


-- D1 Ostoskori, jossa tuotteet
CREATE TABLE d1_divari.ostoskori ( 
    teos_id INT,  
    tilaus_id INT,
	PRIMARY KEY (teos_id, tilaus_id),
    FOREIGN KEY (teos_id) REFERENCES d1_divari.teos(teos_id),
    FOREIGN KEY (tilaus_id) REFERENCES d1_divari.tilaus(tilaus_id)
); 

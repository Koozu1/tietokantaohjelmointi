CREATE SCHEMA Keskusdivari;
CREATE SCHEMA D1_divari;

-----------------------------------------------------------------------------------

-- KESKUSDIVARI SKEEMAN TAULUT:


-- Asiakasrekisteri
CREATE TABLE Keskusdivari.Asiakas (
    asiakas_id SERIAL PRIMARY KEY,
    nimi VARCHAR(50),
    osoite  VARCHAR(100),
    email VARCHAR(50) ,
    puhelin VARCHAR(13)
);


-- Divari D2 taulu
CREATE TABLE Keskusdivari.Divari_D2 ( 
    divari_id SERIAL PRIMARY KEY,  
    nimi VARCHAR(255) NOT NULL, 
    osoite VARCHAR(255) NOT NULL, 
    web_sivu VARCHAR(255)
); 

-- Yksittäinen teos
CREATE TABLE Keskusdivari.Teos (
    teos_id SERIAL PRIMARY KEY,
    nimi VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) NOT NULL,
    hinta DECIMAL(10, 2) NOT NULL,
    sisäänostohinta DECIMAL(10, 2) NOT NULL,
    myyntipäivämäärä DATE,
    paino DECIMAL(10, 2) NOT NULL,
    teostyyppi_id INT,
    FOREIGN KEY (teostyyppi_id) REFERENCES Keskusdivari.Teostyyppi(teostyyppi_id)
);

-- Teostyyppi
CREATE TABLE Keskusdivari.Teostyyppi (
    teostyyppi_id SERIAL PRIMARY KEY,
    tyyppi_nimi VARCHAR(100) NOT NULL
);


-- Tilaus D2 divarille
CREATE TABLE Keskusdivari.Tilaus (
    tilaus_id SERIAL PRIMARY KEY,
    kokonaispaino INT,
    postikulut DECIMAL(10, 2),
    kokonaishinta DECIMAL(10, 2),
    divari_id INT,
	asiakas_id INT,
    FOREIGN KEY (divari_id) REFERENCES Keskusdivari.Divari_D2(divari_id),
    FOREIGN KEY (asiakas_id) REFERENCES Keskusdivari.Asiakas(asiakas_id)
);

-- D2 Ostoskori, jossa tuotteet
CREATE TABLE Keskusdivari.Ostoskori ( 
    teos_id INT,  
    tilaus_id INT,
	PRIMARY KEY (teos_id, tilaus_id),
    FOREIGN KEY (teos_id) REFERENCES Keskusdivari.Teos(teos_id),
    FOREIGN KEY (tilaus_id) REFERENCES Keskusdivari.Tilaus(tilaus_id)
); 



-- Kopio taulusta D1_divari.Teos
CREATE TABLE Keskusdivari.D1_teos_copy (
    teos_id INT PRIMARY KEY,
    nimi VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) NOT NULL,
    hinta DECIMAL(10, 2) NOT NULL,
    sisäänostohinta DECIMAL(10, 2) NOT NULL,
    myyntipäivämäärä DATE,
    paino DECIMAL(10, 2),
    teostyyppi_id INT
);

-- Kopio taulusta D1_divari.Tilaus
CREATE TABLE Keskusdivari.D1_tilaus_copy (
    tilaus_id INT PRIMARY KEY,
    kokonaispaino INT,
    postikulut DECIMAL(10, 2),
    kokonaishinta DECIMAL(10, 2),
    teos_id INT
);



-----------------------------------------------------------------------------------


-- D1_DIVARIN SKEEMAN TAULUT:


-- Divari D1 taulu
CREATE TABLE D1_divari.Divari_D1 ( 
    divari_id SERIAL PRIMARY KEY, 
    nimi VARCHAR(255) NOT NULL, 
    osoite VARCHAR(255) NOT NULL, 
    web_sivu VARCHAR(255)
); 


-- D1 Yksittäinen teos
CREATE TABLE D1_divari.Teos (
    teos_id SERIAL PRIMARY KEY,
    nimi VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) NOT NULL,
    hinta DECIMAL(10, 2) NOT NULL,
    sisäänostohinta DECIMAL(10, 2) NOT NULL,
    myyntipäivämäärä DATE,
    paino DECIMAL(10, 2) NOT NULL,
    teostyyppi_id INT,
    FOREIGN KEY (teostyyppi_id) REFERENCES D1_divari.Teostyyppi(teostyyppi_id)
);


-- D1 Teostyypit
CREATE TABLE D1_divari.Teostyyppi (
    teostyyppi_id SERIAL PRIMARY KEY,
    tyyppi_nimi VARCHAR(100) NOT NULL
);


-- Tilaus D1 divarille
CREATE TABLE D1_divari.Tilaus (
    tilaus_id SERIAL PRIMARY KEY,
    kokonaispaino INT,
    postikulut DECIMAL(10, 2),
    kokonaishinta DECIMAL(10, 2),
    divari_id INT,
    asiakas_id INT,
    FOREIGN KEY (divari_id) REFERENCES D1_divari.Divari_D1(divari_id),
	FOREIGN KEY (asiakas_id) REFERENCES Keskusdivari.Asiakas(asiakas_id)
);


-- D1 Ostoskori, jossa tuotteet
CREATE TABLE D1_divari.Ostoskori ( 
    teos_id INT,  
    tilaus_id INT,
	PRIMARY KEY (teos_id, tilaus_id),
    FOREIGN KEY (teos_id) REFERENCES D1_divari.Teos(teos_id),
    FOREIGN KEY (tilaus_id) REFERENCES D1_divari.Tilaus(tilaus_id)
); 

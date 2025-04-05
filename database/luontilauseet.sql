--Ryhmä 12: Noora Ahonen, Niina Nevala, Onni Pylvänen


CREATE SCHEMA keskusdivari;
CREATE SCHEMA d1_divari;

CREATE TYPE myynnin_tila AS ENUM ('vapaa', 'varattu', 'myyty');
CREATE TYPE tilauksen_tila AS ENUM ('kesken', 'varattu', 'suoritettu', 'keskeytetty');
CREATE TYPE teostyyppi AS ENUM ('cd', 'kirja', 'lehti', 'sarjakuva');
CREATE TYPE teosluokka AS ENUM ('romantiikka', 'seikkailu', 'toiminta', 'draama', 'sotakirjallisuus', 'historiallinen fiktio', 'realismi', 'tiede', 'luonto', 'lasten sarjakuvat', 'historiallinen romaani', 'feminismi');

-----------------------------------------------------------------------------------

-- KESKUSDIVARI SKEEMAN TAULUT:


-- Käyttäjärekisteri
CREATE TABLE keskusdivari.käyttäjä (
    käyttäjä_id SERIAL PRIMARY KEY,
    nimi VARCHAR(50),
    osoite  VARCHAR(100),    
    puhelin VARCHAR(13),
    email VARCHAR(50),
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


-- Abstrakti luokka Teos D2
CREATE TABLE keskusdivari.teos (
    teos_id SERIAL PRIMARY KEY,
    nimi VARCHAR(255) NOT NULL,
    tekijä VARCHAR(255) NOT NULL,
    isbn VARCHAR(50) NOT NULL,
    julkaisuvuosi INT NOT NULL,
    teostyyppi teostyyppi NOT NULL,
    teosluokka teosluokka NOT NULL,
    paino INT NOT NULL,
    lähde_skeema VARCHAR(20), --Tälle aina oletuksena 'keskus'
    divari_id INT,
    FOREIGN KEY (divari_id) REFERENCES keskusdivari.divari_d2(divari_id)
);


-- Yksittäinen fyysinen teos (nide) D2
CREATE TABLE keskusdivari.nide (
    nide_id SERIAL PRIMARY KEY,
    hinta DECIMAL(10,2),
    sisäänostohinta DECIMAL(10,2),
    lähde_skeema VARCHAR(20), --Tälle aina oletuksena 'keskus'
    tila myynnin_tila, -- pakotettu vaihtoehdot ENUM tyypillä(vapaa, varattu, myyty)
    teos_id INT,
	FOREIGN KEY (teos_id) REFERENCES keskusdivari.teos(teos_id)
);

-- Tilaus D1 ja D2 divarille
CREATE TABLE keskusdivari.tilaus (
    tilaus_id SERIAL PRIMARY KEY,
    divari_id INT,
	käyttäjä_id INT,
    tila tilauksen_tila,
    FOREIGN KEY (divari_id) REFERENCES keskusdivari.divari_d2(divari_id),
    FOREIGN KEY (käyttäjä_id) REFERENCES keskusdivari.käyttäjä(käyttäjä_id)
);

-- Ostoskori
CREATE TABLE keskusdivari.ostoskori ( 
    tilaus_id INT,
    nide_id INT,
	PRIMARY KEY (tilaus_id, nide_id),
    FOREIGN KEY (tilaus_id) REFERENCES keskusdivari.tilaus(tilaus_id),
    FOREIGN KEY (nide_id) REFERENCES keskusdivari.nide(nide_id)
); 

-- Lähetys
CREATE TABLE keskusdivari.lähetys ( 
    lähetys_id SERIAL PRIMARY KEY,  
    lähetyksen_paino INT,
    hinta_yht DECIMAL(10,2),
    tilaus_id INT,
    FOREIGN KEY (tilaus_id) REFERENCES keskusdivari.tilaus(tilaus_id)
); 



-----------------------------------------------------------------------------------


-- D1_DIVARIN SKEEMAN TAULUT:


-- Divari D1 taulu
CREATE TABLE d1_divari.divari_d1 ( 
    divari_id SERIAL PRIMARY KEY, 
    nimi VARCHAR(255) NOT NULL, 
    osoite VARCHAR(255) NOT NULL,
    web_sivu VARCHAR(255) NOT NULL
); 


-- Abstrakti luokka Teos D1
CREATE TABLE d1_divari.teos (
    teos_id SERIAL PRIMARY KEY,
    nimi VARCHAR(255) NOT NULL,
    tekijä VARCHAR(255) NOT NULL,
    isbn VARCHAR(50) NOT NULL,
    julkaisuvuosi INT NOT NULL,
    teostyyppi teostyyppi NOT NULL,
    teosluokka teosluokka NOT NULL,
    paino INT NOT NULL,
    lähde_skeema VARCHAR(20), --Tälle aina oletuksena 'd1'
    divari_id INT,
    FOREIGN KEY (divari_id) REFERENCES d1_divari.divari_d1(divari_id)
);


-- Yksittäinen fyysinen teos (nide) D1
CREATE TABLE d1_divari.nide (
    nide_id SERIAL PRIMARY KEY,
    hinta DECIMAL(10,2),
    sisäänostohinta DECIMAL(10,2),
    lähde_skeema VARCHAR(20), --Tälle aina oletuksena 'd1'
    tila myynnin_tila,
    teos_id INT,
	FOREIGN KEY (teos_id) REFERENCES d1_divari.teos(teos_id)
);

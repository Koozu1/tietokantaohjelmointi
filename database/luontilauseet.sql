CREATE TABLE Teostyyppi ( -- Teoksen tyyppi
    teostyyppi_id SERIAL PRIMARY KEY,
    tyyppi_nimi VARCHAR(100) NOT NULL
);

CREATE TABLE Teos ( -- Yksittäinen teos
    teos_id SERIAL PRIMARY KEY,
    isbn VARCHAR(20) NOT NULL,
    hinta DECIMAL(10, 2) NOT NULL,
    sisäänostohinta DECIMAL(10, 2) NOT NULL,
    myyntipäivämäärä DATE,
    paino DECIMAL(10, 2) NOT NULL,
    teostyyppi_id INT,
    CONSTRAINT fk_teostyyppi FOREIGN KEY (teostyyppi_id) REFERENCES Teostyyppi(teostyyppi_id)
);

-- Taulu Asiakkaalle
CREATE TABLE Asiakas (
    asiakasID INT,
    nimi VARCHAR(50),
    osoite  VARCHAR(100),
    email VARCHAR(50) ,
    puhelin VARCHAR(13)
    PRIMARY KEY (asiakasID),
    FOREIGN KEY (tilausID) REFERENCES Tilaus(tilausID)
);
 
-- Taulu Tilaus
CREATE TABLE Tilaus (
    tilausID INT,
    kokonaispaino INT,
    postikulut FLOAT,
    kokonaishinta FLOAT,
    PRIMARY KEY (tilausID),
    FOREIGN KEY (teosID) REFERENCES Teos(teosID)
);

CREATE TABLE KeskusDivari ( 
    keskus_id SERIAL PRIMARY KEY, 
    nimi VARCHAR(255) NOT NULL, 
    osoite VARCHAR(255) NOT NULL, 
    web_sivu VARCHAR(255) 
); 
 
CREATE TABLE Divari ( 
    divari_id SERIAL PRIMARY KEY, 
    keskus_id INT, 
    teos_id INT, 
    teostyyppi_id INT, 
    nimi VARCHAR(255) NOT NULL, 
    osoite VARCHAR(255) NOT NULL, 
    FOREIGN KEY (keskus_id) REFERENCES KeskusDivari(id), 
    FOREIGN KEY (teos_id) REFERENCES Teos(id), 
    FOREIGN KEY (teostyyppi_id) REFERENCES TeosTyyppi(id)  
); 
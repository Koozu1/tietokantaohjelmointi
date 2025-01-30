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
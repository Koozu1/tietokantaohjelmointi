UML MUUNNOS TIETOKANTAKAAVIOKSI:

UML kaavio muutettiin graafiseksi esitykseksi tietokannasta. 
UML-luokat muutettiin tietokannan tauluiksi, 
määriteltiin avaimet (katso alta arvoalueista ja rajoituksista) sekä 
luokkien väliset suhteet.
Asiakas voi tehdä monta tilausta, yhdellä tilauksella on vain yksi asiakas.
Tilauksessa voi olla useampi teos, teos voi olla vain yhdessä tilauksessa.
Divarissa voi olla monta teostyyppiä ja monia teoksia, yksittäinen teos voi olla vain yhdessä divarissa, teostyyppi voi olla monessa divarissa.
Teos voi olla yhtä teostyyppiä, sama teostyyppi voi olla monessa teoksessa.
Yhdellä divarilla voi olla vain yksi keskusdivari,
mutta keskusdivariin voi kuulua monta yksittäistä divaria.


ATTRIBUUTTIEN ARVOALUEET JA RAJOITUKSET:


Keskusdivari Skeeman Taulut:

Käyttäjärekisteri:
käyttäjä_id: SERIAL, PRIMARY KEY
nimi: VARCHAR(50)
osoite: VARCHAR(100)
email: VARCHAR(50)
puhelin: VARCHAR(13)
pääkäyttäjä: BOOLEAN

Divari D2:
divari_id: SERIAL, PRIMARY KEY
nimi: VARCHAR(255), NOT NULL
osoite: VARCHAR(255), NOT NULL
web_sivu: VARCHAR(255)

Teostyyppi:
teostyyppi_id: SERIAL, PRIMARY KEY
tyyppi_nimi: VARCHAR(100), NOT NULL

Yksittäinen Teos:
teos_id: SERIAL, PRIMARY KEY
nimi: VARCHAR(255), NOT NULL
isbn: VARCHAR(20), NOT NULL
hinta: DECIMAL(10, 2), NOT NULL
sisäänostohinta: DECIMAL(10, 2), NOT NULL
paino: DECIMAL(10, 2), NOT NULL
teostyyppi_id: INT, FOREIGN KEY REFERENCES Keskusdivari.Teostyyppi(teostyyppi_id)

Tilaus D2 Divarille:
tilaus_id: SERIAL, PRIMARY KEY
kokonaispaino: INT
postikulut: DECIMAL(10, 2)
kokonaishinta: DECIMAL(10, 2)
myyntipäivämäärä: DATE
divari_id: INT, FOREIGN KEY REFERENCES Keskusdivari.Divari_D2(divari_id)
käyttäjä_id: INT, FOREIGN KEY REFERENCES Keskusdivari.Käyttäjä(käyttäjä_id)

Ostoskori D2:
teos_id: INT, PRIMARY KEY (teos_id, tilaus_id), FOREIGN KEY REFERENCES Keskusdivari.Teos(teos_id)
tilaus_id: INT, PRIMARY KEY (teos_id, tilaus_id), FOREIGN KEY REFERENCES Keskusdivari.Tilaus(tilaus_id)

Teos D1:
teos_id: INT, PRIMARY KEY
nimi: VARCHAR(255), NOT NULL
isbn: VARCHAR(20), NOT NULL
hinta: DECIMAL(10, 2), NOT NULL
sisäänostohinta: DECIMAL(10, 2), NOT NULL
paino: DECIMAL(10, 2)
teostyyppi_id: INT

Teostyyppi D1:
teostyyppi_id: INT, PRIMARY KEY
tyyppi_nimi: VARCHAR(100), NOT NULL



D1_divari Skeeman Taulut

Divari D1:
divari_id: SERIAL, PRIMARY KEY
nimi: VARCHAR(255), NOT NULL
osoite: VARCHAR(255), NOT NULL
web_sivu: VARCHAR(255)

Teostyyppi:
teostyyppi_id: SERIAL, PRIMARY KEY
tyyppi_nimi: VARCHAR(100), NOT NULL

Yksittäinen Teos:
teos_id: SERIAL, PRIMARY KEY
nimi: VARCHAR(255), NOT NULL
isbn: VARCHAR(20), NOT NULL
hinta: DECIMAL(10, 2), NOT NULL
sisäänostohinta: DECIMAL(10, 2), NOT NULL
paino: DECIMAL(10, 2), NOT NULL
teostyyppi_id: INT, FOREIGN KEY REFERENCES D1_divari.Teostyyppi(teostyyppi_id)

Tilaus D1 Divarille:
tilaus_id: SERIAL, PRIMARY KEY
kokonaispaino: INT
postikulut: DECIMAL(10, 2)
kokonaishinta: DECIMAL(10, 2)
myyntipäivämäärä: DATE
divari_id: INT, FOREIGN KEY REFERENCES D1_divari.Divari_D1(divari_id)
käyttäjä_id: INT, FOREIGN KEY REFERENCES Keskusdivari.Käyttäjä(käyttäjä_id)

Ostoskori D1:
teos_id: INT, PRIMARY KEY (teos_id, tilaus_id), FOREIGN KEY REFERENCES D1_divari.Teos(teos_id)
tilaus_id: INT, PRIMARY KEY (teos_id, tilaus_id), FOREIGN KEY REFERENCES D1_divari.Tilaus(tilaus_id)


VALITUT TOTEUTUSVÄLINEET:
Postgres
Docker
Node.js
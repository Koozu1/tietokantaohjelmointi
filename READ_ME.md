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

Teostyyppi
teostyyppi_id: SERIAL, PRIMARY KEY
tyyppi_nimi: VARCHAR(100), NOT NULL

Teos
teos_id: SERIAL, PRIMARY KEY
isbn: VARCHAR(20), NOT NULL
hinta: DECIMAL(10, 2), NOT NULL
sisäänostohinta: DECIMAL(10, 2), NOT NULL
myyntipäivämäärä: DATE
paino: DECIMAL(10, 2), NOT NULL
teostyyppi_id: INT, FOREIGN KEY REFERENCES Teostyyppi(teostyyppi_id)

Asiakas
asiakasID: INT, PRIMARY KEY
nimi: VARCHAR(50)
osoite: VARCHAR(100)
email: VARCHAR(50)
puhelin: VARCHAR(13)
tilausID: INT, FOREIGN KEY REFERENCES Tilaus(tilausID)

Tilaus
tilausID: INT, PRIMARY KEY
kokonaispaino: INT
postikulut: FLOAT
kokonaishinta: FLOAT
teosID: INT, FOREIGN KEY REFERENCES Teos(teosID)

KeskusDivari
keskus_id: SERIAL, PRIMARY KEY
nimi: VARCHAR(255), NOT NULL
osoite: VARCHAR(255), NOT NULL
web_sivu: VARCHAR(255)
Divari
divari_id: SERIAL, PRIMARY KEY
keskus_id: INT, FOREIGN KEY REFERENCES KeskusDivari(id)
teos_id: INT, FOREIGN KEY REFERENCES Teos(id)
teostyyppi_id: INT, FOREIGN KEY REFERENCES TeosTyyppi(id)
nimi: VARCHAR(255), NOT NULL
osoite: VARCHAR(255), NOT NULL


VALITUT TOTEUTUSVÄLINEET:
Postgres
Docker
Node.js
## Projektin asennus ja valmistelu

### Valmistelu

Kloonaa projektin repo githubista
Asenna npm (node package manager), node ja suositellusti myös docker.

### Npm install

Aja npm install projectin backend ja frontend kansiossa asentaaksesi riippuvuudet.

### Postgres tietokanta Docker kontissa

Jos haluat käyttää Dockeria tietokannalle, aja docker-compose up komento kansiossa, josta löytyy docker-compose.yml tiedosto (postres kansio database kansiossa), näin saat lokaalisti postgresin käytiin docker kontissa.

### Testidata

Tee luontilauseilla tietokantataulut ja aja lisäyslauseilla niihin testidataa. Jos et halua tehdä tätä terminaalin kautta, esimerkiksi dbeaver on hyvä ilmainen ohjelma tietokannan tarkasteluun ja hallinnointiin.

### Testisalasana

Loginia varten tietokannan käyttäjälle täytyy luoda hashattu salasana. Luo hash esimerkiksi scriptilla terminaalissa, talleta hashattu salasana kantaan
valitsemallesi käyttäjälle, ja käytä selkomuotoista salasanaa ui:lta kirjauduttaessa.


## Näin ajat node projektit

### Frontend

mene react-frontend kansioon

> npm start

### Backend

mene backend kansioon

> Luo .env tiedosto. example.env tiedostoa voi hyödyntää, vaihda vaan oikeat tilalle.
> npm start

Huom tarvitset postgressin lisäksi.

## Sivut

Frontend:
http://localhost:3000/

lisäksi on reitit /login & /register. login ohjaa /frontpage, mutta sitä ei ole vielä tehty.

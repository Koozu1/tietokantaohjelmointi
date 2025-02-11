T1: Asiakas kirjautuu/rekisteröityy järjestelmään

```sql
INSERT INTO Keskusdivari.Käyttäjä (nimi, osoite, email, puhelin, pääkäyttäjä)
VALUES ('aapo', 'tie 2', 'aapo@aapo.fi', '0445337896', 'false');
```

T2: Lisätään yksittäisen teoksen (jota ei ole aikaisemmin tallennettu) tiedot divarin D1 tietokantaan ja
keskustietokantaan.

```sql
--Lisätään teokset
INSERT INTO D1_divari.Teostyyppi (teostyyppi_id, tyyppi_nimi) VALUES (1, 'Kirja1');
INSERT INTO Keskusdivari.Teostyyppi (teostyyppi_id, tyyppi_nimi) VALUES (1, 'Kirja1');

-- Lisätään teos. Tälle on triggeri T6 joka lisää teoksen myös keskusdivariin.
INSERT INTO D1_divari.Teos (nimi, isbn, hinta, sisäänostohinta, paino, teostyyppi_id)
VALUES ('Kirja1', '1', 10, 7.50, 1, 1);

```

T3: Lisätään yksittäinen teos divarille D2 tietokantaan (siis keskusdivarin tietokantaan), jonka teostiedot jo
löytyvät tietokannasta. (käyttäjäroolina divarin D2 ylläpitäjä)

```sql

INSERT INTO Keskusdivari.Teos (nimi, isbn, hinta, sisäänostohinta, paino, teostyyppi_id)
VALUES ('Kirja3', '3', 10, 7.50, 1, 3);

```

T4: Asiakas tekee yksittäisen kirjan tilauksen

```sql

-- Jos divari puuttuu.
INSERT INTO D1_divari.Divari_D1 (nimi, osoite, web_sivu)
VALUES ('d1', 'tie 1', 'divari.fi');

-- Haetaan kirjan teos_id, paino, hinta. Lisätään uusi tilaus tarvittavilla tiedoilla, luodaan tarvittava Ostoskori.
WITH teos_data AS (
    SELECT teos_id, paino, hinta
    FROM D1_divari.Teos
    WHERE isbn = '1'
), new_order AS (
    INSERT INTO D1_divari.Tilaus (
        kokonaispaino, postikulut, kokonaishinta, myyntipäivämäärä, divari_id, käyttäjä_id
    )
    SELECT paino, 5.00, hinta, NOW(), 1, 1
    FROM teos_data
    RETURNING tilaus_id
)
INSERT INTO D1_divari.Ostoskori (teos_id, tilaus_id)
SELECT teos_id, tilaus_id FROM teos_data, new_order;

```

T5: Asiakas tekee tilauksen, jonka paino ylittää 2000 grammaa (käyttäjäroolina asiakas). Lähetys joudutaan
siis jakamaan useaan erään. Käytännön yksi tilaus voi kohdistua usean divarin teoksiin. Tätä ei kuitenkaan
työssä huomioida vaan lasketaan postituskulut siten, että ne kohdistuisivat saman divarin teoksiin.

T6: Toteuta triggeri, joka päivittää keskusdivarin automaattisesti, kun divarin omaan tietokantaan tuodaan
uusi myyntikappale. Oletetaan, että teoksen yleiset tiedot on talletettu ennen lisäystä molempiin
tietokantoihin. Toteuta tätä varten kolmannen divarin D3 tietokanta, joka voi rakenteellisesti noudattaa
divarin D1 kantaa.

```sql
-- ensin tehdään funktio jonka trigger ajaa
CREATE OR REPLACE FUNCTION insert_into_keskusdivari()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO Keskusdivari.Teos (nimi, isbn, hinta, sisäänostohinta, paino, teostyyppi_id)
    VALUES (NEW.nimi, NEW.isbn, NEW.hinta, NEW.sisäänostohinta, NEW.paino, NEW.teostyyppi_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- lisätään triggeri
CREATE TRIGGER trigger_insert_keskusdivari
AFTER INSERT ON D1_divari.Teos
FOR EACH ROW
EXECUTE FUNCTION insert_into_keskusdivari();

```

T7: Oletetaan, että Divarin tietokantaan on lisätty kirjoja, joita ei löydy keskustietokannasta. (Simuloi
tilannetta lisäämällä D1:n pari uutta teosta.) Päivitä keskusdivarin tiedot. Tässä siis siirretään divarin D1
tietokannasta (kaavioista) uusien teosten tiedot keskustietokantaan. Tämän voi toteuttaa vertaamalla
tietokannoissa olevia tietoja tai esimerkiksi pitämällä yllä tietoa, että minkäkin teoksien tiedot ovat
muuttuneet viimeisen päivityksen jälkeen.

```sql

-- Jos Teostyyppiä ei ole molemmissa divareissa
INSERT INTO D1_divari.Teostyyppi (teostyyppi_id, tyyppi_nimi) VALUES (1, 'Kirja1'), (2, 'Kirja2');
INSERT INTO Keskusdivari.Teostyyppi (teostyyppi_id, tyyppi_nimi) VALUES (1, 'Kirja1'), (2, 'Kirja2');

-- Lisätään pari teosta
INSERT INTO D1_divari.Teos (nimi, isbn, hinta, sisäänostohinta, paino, teostyyppi_id)
VALUES
    ('Kirja1', '1', 15.99, 7.50, 0.8, 1),
    ('Kirja2', '2', 12.50, 5.00, 0.5, 2);

-- Päivitetään koko keskusdivarin Teos-taulu D1-divarin Teoksilla. Voi myös tehdä triggerillä/manuaalisesti.
INSERT INTO Keskusdivari.Teos (nimi, isbn, hinta, sisäänostohinta, paino, teostyyppi_id)
SELECT
    d1.nimi, d1.isbn, d1.hinta, d1.sisäänostohinta, d1.paino, d1.teostyyppi_id
FROM D1_divari.Teos d1
LEFT JOIN Keskusdivari.Teos k ON d1.isbn = k.isbn
WHERE k.teos_id IS NULL;

```

T8: Divari D4 haluaa liittyä keskusdivariin. Heidän datansa on XML-muodossa, jonka rakenne noudattaa
liitteessä 2 annettua DTD:tä. Toteuta toiminto, joka konfiguroi ja siirtää datan keskusdivarin tietokantaan.
Tee esimerkkiaineistoon vähintään kaksi teosta, joissa kaksi nidettä. Muita kuin kuvattuja tietoja ei tarvitse
huomioida.

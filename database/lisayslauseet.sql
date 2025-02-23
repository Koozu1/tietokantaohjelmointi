--Ryhmä 12: Noora Ahonen, Niina Nevala, Onni Pylvänen

-- KESKUSDIVARI SKEEMA
-- Tarvittaessa poista tilaus ja ostoskori lisäyslauseet!


-- Jotta teos_id:t eivät menisi sekaisin eri skeemojen välillä:
ALTER SEQUENCE keskusdivari.teos_teos_id_seq RESTART WITH 1000;



-- 1) Käyttäjä
INSERT INTO Keskusdivari.Käyttäjä
(nimi, osoite, email, puhelin, pääkäyttäjä)
VALUES
('Matti Meikäläinen', 'Keskuskatu 10, Helsinki', 'matti@meikalainen.fi', '0401234567', TRUE),
('Maija Tekijä',       'Kujatie 1, Vantaa',       'maija@tekija.fi',       '0507654321', FALSE),
('Kari Kanta',         'Opintie 5, Espoo',        'kari.k@example.com',    '0450012345', FALSE);

-- 2) Divari_D2
INSERT INTO Keskusdivari.Divari_D2
(nimi, osoite, web_sivu)
VALUES
('Galleinn Galle', 'Torikatu 2, Turku', 'www.galleinn.fi');

-- 3) Teostyyppi
INSERT INTO Keskusdivari.Teostyyppi
(tyyppi_nimi)
VALUES
('Kirja'),
('Lehti'),
('Sarjakuva');

-- 4) Teos
-- Huomaa, että teostyyppi_id viittaa edellä luotuihin riveihin:
-- 1=Kirja, 2=Lehti, 3=Sarjakuva.
INSERT INTO Keskusdivari.Teos
(nimi, tekijä, isbn, hinta, sisäänostohinta, paino, teostyyppi_id)
VALUES
('Sinuhe egyptiläinen', 'Mika Waltari', '978-951-0-34696-8', 24.90, 12.50, 1.20, 1),
('Tuntematon sotilas', 'Väinö Linna', '978-951-0-28088-0', 19.90, 10.00, 1.10, 1),
('Hytti nro 6', 'Rosa Liksom', '978-951-31-5787-5', 18.50, 9.20, 0.95, 1),
('Tiede-lehti 03/2024', 'Tiede-lehden toimitus', '978-1234-5678-90', 8.50, 4.00, 0.30, 2),
('National Geographic 02/2024', 'National Geographic', '978-5678-1234-90', 9.90, 5.50, 0.35, 2),
('Aku Ankka - Kulta-aika', 'Walt Disney', '978-951-32-4043-1', 12.90, 6.50, 0.75, 3),
('Asterix ja Obelix: Kultainen sirppi', 'René Goscinny & Albert Uderzo', '978-951-1-19193-5', 14.90, 7.00, 0.80, 3),
('Auschwitzin tatuoija', 'Heather Morris', '978-952-279-538-0', 20.00, 10.00, 0.95, 1),
('Tummien perhosten koti', 'Leena Lander', '978-951-1-15190-8', 14.00, 6.80, 0.80, 1);



-- 5) Tilaus (D2:n tilaukset)
-- divari_id = 1 (Galleinn Galle, luotu aiemmin)
-- käyttäjä_id viittaa Käyttäjä-tauluun (esim. 1=Matti, 2=Maija, 3=Kari).
INSERT INTO Keskusdivari.Tilaus
(kokonaispaino, postikulut, kokonaishinta, myyntipäivämäärä, divari_id, käyttäjä_id)
VALUES
(45,  5.50, 21.00, '2023-12-01', 1, 1),
(10,  2.90,  7.40, '2023-12-15', 1, 2);

-- 6) Ostoskori (D2)
-- Liittää Teos (teos_id) Tilaus (tilaus_id) -rivit
-- Oletetaan teos_id = 1,2,3 ja tilaus_id = 1,2 luotiin aiemmin.
INSERT INTO Keskusdivari.Ostoskori
(teos_id, tilaus_id)
VALUES
(1, 1),   -- Sinuhe egyptiläinen → Tilaus1
(2, 1),   -- Tuntematon sotilas → Tilaus1
(3, 2);   -- Hytti nro 6 → Tilaus2


-- 7) Teostyyppi_D1 (Kopio D1:n teostyypeistä)
-- Täällä ID:t täytyy vastata D1_divarin Teostyyppi-id:itä.
INSERT INTO Keskusdivari.Teostyyppi_D1
(teostyyppi_id, tyyppi_nimi)
VALUES
(1, 'Kirja'),
(2, 'Lehti'),
(3, 'Sarjakuva');

-- 8) Teos_D1 (Kopio D1:n Teos-taulusta)
-- Käytämme samaa logiikkaa: ID:t, jotka vastaavat D1_divari.Teos
INSERT INTO Keskusdivari.Teos_D1
(nimi, tekijä, isbn, hinta, sisäänostohinta, paino, teostyyppi_id)
VALUES
('Puhdistus', 'Sofi Oksanen', '978-951-31-4500-2', 17.90, 8.00, 0.90, 1),
('Miestä ei voi raiskata', 'Märta Tikkanen', '978-951-1-26019-8', 15.50, 7.50, 0.85, 1),
('Auschwitzin tatuoija', 'Heather Morris', '978-952-279-538-0', 20.00, 10.00, 0.95, 1),
('Tummien perhosten koti', 'Leena Lander', '978-951-1-15190-8', 14.00, 6.80, 0.80, 1),
('Tiede-lehti 05/2024', 'Tiede-lehden toimitus', '978-1234-5678-91', 8.90, 4.20, 0.32, 2),
('Spider-Man: Paluu juurille', 'Stan Lee', '978-951-32-5555-3', 15.50, 8.20, 0.85, 3);



-----------------------------------------------------------------------

-- D1_DIVARI SKEEMA
-- Tarvittaessa poista tilaus ja ostoskori lisäyslauseet!

-- 1) Divari_D1
INSERT INTO D1_divari.Divari_D1
(nimi, osoite, web_sivu)
VALUES
('Lassen lehti', 'Kauppakatu 10, Oulu', 'www.lassenlehti.fi');

-- 2) Teostyyppi
INSERT INTO D1_divari.Teostyyppi
(tyyppi_nimi)
VALUES
('Kirja'),
('Oppikirja'),
('Sarjakuva');

-- 3) Teos
-- teostyyppi_id viittaa juuri luotuihin: 
-- (1=Kirja, 2=Oppikirja, 3=Sarjakuva) D1-skeemassa
INSERT INTO D1_divari.Teos
(nimi, tekijä, isbn, hinta, sisäänostohinta, paino, teostyyppi_id)
VALUES
('Puhdistus', 'Sofi Oksanen', '978-951-31-4500-2', 17.90, 8.00, 0.90, 1),
('Miestä ei voi raiskata', 'Märta Tikkanen', '978-951-1-26019-8', 15.50, 7.50, 0.85, 1),
('Auschwitzin tatuoija', 'Heather Morris', '978-952-279-538-0', 20.00, 10.00, 0.95, 1),
('Tummien perhosten koti', 'Leena Lander', '978-951-1-15190-8', 14.00, 6.80, 0.80, 1),
('Tiede-lehti 05/2024', 'Tiede-lehden toimitus', '978-1234-5678-91', 8.90, 4.20, 0.32, 2),
('Spider-Man: Paluu juurille', 'Stan Lee', '978-951-32-5555-3', 15.50, 8.20, 0.85, 3);




-- 4) Tilaus (D1)
-- divari_id = 1 (Lassen lehti).
-- käyttäjä_id viittaa edelleen KESKUSDIVARI.Käyttäjä -tauluun
INSERT INTO D1_divari.Tilaus
(kokonaispaino, postikulut, kokonaishinta, myyntipäivämäärä, divari_id, käyttäjä_id)
VALUES
(120, 10.50, 45.00, '2024-01-05', 1, 2),
( 60,  5.90, 23.40, '2024-01-06', 1, 3);

-- 5) Ostoskori (D1)
-- Liitetään teos_id ja tilaus_id
(teos_id, tilaus_id)
VALUES
(1, 1),   -- Puhdistus -> Tilaus1
(3, 1),   -- Auschwitzin tatuoija -> Tilaus1
(2, 2);   -- Miestä ei voi raiskata -> Tilaus2

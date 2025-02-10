-- KESKUSDIVARI SKEEMA
-- Tarvittaessa poista tilaus ja ostoskori lisäyslauseet!

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
(nimi, isbn, hinta, sisäänostohinta, paino, teostyyppi_id)
VALUES
('Lumikuningatar',         '9781234567897', 15.50,  8.00, 0.45, 1),
('Aku Ankka - Joulunumero','1112223334445',  4.50,  2.00, 0.10, 2),
('Batman - Year One',      '2223334445556', 12.90,  6.00, 0.35, 3);

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
(1, 1),   -- Lumikuningatar → Tilaus1
(2, 1),   -- Aku Ankka → Tilaus1
(3, 2);   -- Batman → Tilaus2


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
(teos_id, nimi, isbn, hinta, sisäänostohinta, paino, teostyyppi_id)
VALUES
(1, 'Java ohjelmointi', '5566778899001', 34.50, 12.00, 1.20, 2),
(2, 'Hassu Hatsari',    '1122334455667',  8.90,  2.00, 0.30, 3),
(3, 'Muumikirja',       '9988776655443', 15.90,  6.00, 0.45, 1);





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
(nimi, isbn, hinta, sisäänostohinta, paino, teostyyppi_id)
VALUES
('Java ohjelmointi', '5566778899001', 34.50, 12.00, 1.20, 2),
('Hassu Hatsari',    '1122334455667',  8.90,  2.00, 0.30, 3),
('Muumikirja',       '9988776655443', 15.90,  6.00, 0.45, 1);

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
(1, 1),   -- Java ohj. -> Tilaus1
(3, 1),   -- Muumikirja -> Tilaus1
(2, 2);   -- Hassu Hatsari -> Tilaus2

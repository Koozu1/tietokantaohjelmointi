--Ryhmä 12: Noora Ahonen, Niina Nevala, Onni Pylvänen

-- KESKUSDIVARI SKEEMA


-- Jotta teos_id:t eivät menisi sekaisin eri skeemojen välillä:
ALTER SEQUENCE keskusdivari.teos_teos_id_seq RESTART WITH 1000;

-- Jotta nide_id:t eivät menisi sekaisin eri skeemojen välillä:
ALTER SEQUENCE keskusdivari.nide_nide_id_seq RESTART WITH 1000;


-- 1) Käyttäjä
INSERT INTO keskusdivari.käyttäjä
(nimi, osoite, email, puhelin, salasana, pääkäyttäjä)
VALUES
('Matti Meikäläinen', 'Keskuskatu 10, Helsinki', 'matti@meikalainen.fi', '0401234567', 'testi', TRUE),
('Maija Tekijä',       'Kujatie 1, Vantaa',       'maija@tekija.fi',       '0507654321', NULL, FALSE),
('Kari Kanta',         'Opintie 5, Espoo',        'kari.k@example.com',    '0450012345', NULL, FALSE);

-- 2) Divari_D2
INSERT INTO keskusdivari.divari_d2
(nimi, osoite, web_sivu)
VALUES
('Galleinn Galle', 'Torikatu 2, Turku', 'www.galleinn.fi');


-- 3) Teos
INSERT INTO keskusdivari.teos
(nimi, tekijä, isbn, julkaisuvuosi, teostyyppi, paino, lähde_skeema, divari_id)
VALUES
('Sinuhe egyptiläinen', 'Mika Waltari', '978-951-0-34696-8', 1945, 'kirja', 1200, 'keskus', 1),
('Tuntematon sotilas', 'Väinö Linna', '978-951-0-28088-0', 1954, 'kirja', 1100, 'keskus', 1),
('Hytti nro 6', 'Rosa Liksom', '978-951-31-5787-5', 2011, 'kirja', 950, 'keskus', 1),
('Tiede-lehti 03/2024', 'Tiede-lehden toimitus', '978-1234-5678-90', 2024, 'lehti', 300, 'keskus', 1),
('National Geographic 02/2024', 'National Geographic', '978-5678-1234-90', 2024, 'lehti', 350, 'keskus', 1),
('Aku Ankka - Kulta-aika', 'Walt Disney', '978-951-32-4043-1', 2000, 'sarjakuva', 750, 'keskus', 1),
('Asterix ja Obelix: Kultainen sirppi', 'René Goscinny & Albert Uderzo', '978-951-1-19193-5', 1962, 'sarjakuva', 800, 'keskus', 1),
('Auschwitzin tatuoija', 'Heather Morris', '978-952-279-538-0', 2018, 'kirja', 950, 'keskus', 1),
('Tummien perhosten koti', 'Leena Lander', '978-951-1-15190-8', 1991, 'kirja', 800, 'keskus', 1);

-- 4) Nide
INSERT INTO keskusdivari.nide
(hinta, sisäänostohinta, lähde_skeema, tila, teos_id)
VALUES
(24.90, 12.50, 'keskus', 'vapaa', 1000),
(19.90, 10.00, 'keskus', 'vapaa', 1001),
(18.50, 9.20, 'keskus', 'vapaa', 1002),
(8.50, 4.00, 'keskus', 'vapaa', 1003),
(9.90, 5.50, 'keskus', 'vapaa', 1004),
(12.90, 6.50, 'keskus', 'vapaa', 1005),
(14.90, 7.00, 'keskus', 'vapaa', 1006),
(20.00, 10.00, 'keskus', 'vapaa', 1007),
(14.00, 6.80, 'keskus', 'vapaa', 1008);


-----------------------------------------------------------------------

-- D1_DIVARI SKEEMA

-- 1) Divari_D1
INSERT INTO d1_divari.divari_d1
(nimi, osoite, web_sivu)
VALUES
('Lassen lehti', 'Kauppakatu 10, Oulu', 'www.lassenlehti.fi');


-- 2) Teos
INSERT INTO d1_divari.teos
(nimi, tekijä, isbn, julkaisuvuosi, teostyyppi, paino, lähde_skeema, divari_id)
VALUES
('Puhdistus', 'Sofi Oksanen', '978-951-31-4500-2', 2008, 'kirja', 900, 'd1', 1),
('Miestä ei voi raiskata', 'Märta Tikkanen', '978-951-1-26019-8', 1975, 'kirja', 850, 'd1', 1),
('Auschwitzin tatuoija', 'Heather Morris', '978-952-279-538-0', 2018, 'kirja', 950, 'd1', 1),
('Tummien perhosten koti', 'Leena Lander', '978-951-1-15190-8', 1991, 'kirja', 800, 'd1', 1),
('Tiede-lehti 05/2024', 'Tiede-lehden toimitus', '978-1234-5678-91', 2024, 'lehti', 320, 'd1', 1),
('Spider-Man: Paluu juurille', 'Stan Lee', '978-951-32-5555-3', 2002, 'sarjakuva', 850, 'd1', 1);

-- 3) Nide
INSERT INTO d1_divari.nide
(hinta, sisäänostohinta, lähde_skeema, tila, teos_id)
VALUES

(17.90, 8.00, 'd1', 'vapaa', 1),
(15.50, 7.50, 'd1', 'vapaa', 2),
(20.00, 10.00, 'd1', 'vapaa', 3),
(14.00, 6.80, 'd1', 'vapaa', 4),
(8.90, 4.20, 'd1', 'vapaa', 5),
(15.50, 8.20, 'd1', 'vapaa', 6);

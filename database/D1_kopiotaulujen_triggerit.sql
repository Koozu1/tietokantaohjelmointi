-- Kun pääkäyttäjä lisää/muokkaa/poistaa D1_divarin varastosta teoksia, tämä trigger 
-- tekee muutokset automaattisesti myös Keskusdivarin kopiotauluihin D1:stä


CREATE OR REPLACE FUNCTION d1_divari.teos_copy_trigger_func()
RETURNS TRIGGER AS
$$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Kun D1_divari.Teos -tauluun lisätään uusi rivi
        INSERT INTO Keskusdivari.Teos_D1
            (teos_id, nimi, isbn, hinta, sisäänostohinta, paino, teostyyppi_id)
        VALUES
            (NEW.teos_id, NEW.nimi, NEW.isbn, NEW.hinta, NEW.sisäänostohinta,
             NEW.paino, NEW.teostyyppi_id);

        RETURN NEW;

    ELSIF TG_OP = 'UPDATE' THEN
        -- Kun D1_divari.Teos -rivin tietoja päivitetään
        UPDATE Keskusdivari.Teos_D1
           SET nimi = NEW.nimi,
               isbn = NEW.isbn,
               hinta = NEW.hinta,
               sisäänostohinta = NEW.sisäänostohinta,
               paino = NEW.paino,
               teostyyppi_id = NEW.teostyyppi_id
         WHERE teos_id = OLD.teos_id;

        RETURN NEW;
        
    ELSIF TG_OP = 'DELETE' THEN
        -- Kun D1_divari.Teos -rivi poistetaan
        DELETE FROM Keskusdivari.Teos_D1
         WHERE teos_id = OLD.teos_id;

        RETURN OLD;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER teos_copy_trigger
AFTER INSERT OR UPDATE OR DELETE
ON d1_divari.Teos
FOR EACH ROW
EXECUTE PROCEDURE d1_divari.teos_copy_trigger_func();


-----------------------------------------------------------------------------------

-- Toimintalogiikka ei ole selvä tehtävänannossa, mitä pitäisi tehdä teostyypeille kun 
-- divareiden varastotilanne muuttuu. Lisätäänkö uusia teostyyppejä mutta niitä ei ikinä
-- poisteta? Tarvitaanko tätä tietoa raportoimismielessä, esim. millaisia kirjoja on joskus
-- ollut jne. Hankalammaksi menee, jos pitää ylläpitää teostyyppejä sen mukaan, onko kirjaa
-- enää saatavilla vai ei. Tässä tehty trigger, joka vain lisää ja päivittää tarvittaessa
-- Teostyyppi-taulua


CREATE OR REPLACE FUNCTION D1_divari.teostyyppi_copy_trigger_func()
RETURNS TRIGGER AS
$$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Kun D1_divari.Teostyyppi -tauluun lisätään uusi rivi
        INSERT INTO Keskusdivari.Teostyyppi_D1
            (teostyyppi_id, tyyppi_nimi)
        VALUES
            (NEW.teostyyppi_id, NEW.tyyppi_nimi);

        RETURN NEW;

    ELSIF TG_OP = 'UPDATE' THEN
        -- Kun D1_divari.Teostyyppi -rivin tietoja päivitetään
        UPDATE Keskusdivari.Teostyyppi_D1
           SET tyyppi_nimi = NEW.tyyppi_nimi
         WHERE teostyyppi_id = OLD.teostyyppi_id;

        RETURN NEW;
        
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER teostyyppi_copy_trigger
AFTER INSERT OR UPDATE
ON d1_divari.Teostyyppi
FOR EACH ROW
EXECUTE PROCEDURE d1_divari.teostyyppi_copy_trigger_func();

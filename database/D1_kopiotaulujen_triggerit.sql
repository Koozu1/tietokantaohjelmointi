--Ryhmä 12: Noora Ahonen, Niina Nevala, Onni Pylvänen

-- Kun pääkäyttäjä lisää/muokkaa/poistaa D1_divarin varastosta teoksia/niteitä, tämä trigger 
-- tekee muutokset automaattisesti myös Keskusdivarin Teos ja Nide tauluihin


CREATE OR REPLACE FUNCTION d1_divari.teos_copy_trigger_func()
RETURNS TRIGGER AS
$$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Kun D1_divari.Teos -tauluun lisätään uusi rivi
        INSERT INTO keskusdivari.teos
            (teos_id, nimi, tekijä, isbn, julkaisuvuosi, teostyyppi, paino, lähde_skeema, divari_id)
        VALUES
            (NEW.teos_id, NEW.nimi, NEW.tekijä, NEW.isbn, NEW.julkaisuvuosi, NEW.teostyyppi,
             NEW.paino, NEW.lähde_skeema, NEW.divari_id);

        RETURN NEW;

    ELSIF TG_OP = 'UPDATE' THEN
        -- Kun D1_divari.Teos -rivin tietoja päivitetään
        UPDATE keskusdivari.teos
           SET nimi = NEW.nimi,
           	   tekijä = NEW.tekijä,
               isbn = NEW.isbn,
               julkaisuvuosi = NEW.julkaisuvuosi,
               teostyyppi = NEW.teostyyppi,
               paino = NEW.paino,
               lähde_skeema = NEW.lähdeskeema,
               divari_id = NEW.divari_id
         WHERE teos_id = OLD.teos_id;

        RETURN NEW;
        
    ELSIF TG_OP = 'DELETE' THEN
        -- Kun D1_divari.Teos -rivi poistetaan
        DELETE FROM keskusdivari.teos
         WHERE teos_id = OLD.teos_id;

        RETURN OLD;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER teos_copy_trigger
AFTER INSERT OR UPDATE OR DELETE
ON d1_divari.teos
FOR EACH ROW
EXECUTE PROCEDURE d1_divari.teos_copy_trigger_func();


-----------------------------------------------------------------------------------



CREATE OR REPLACE FUNCTION d1_divari.nide_copy_trigger_func()
RETURNS TRIGGER AS
$$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Kun D1_divari.Nide -tauluun lisätään uusi rivi
        INSERT INTO keskusdivari.nide
            (nide_id, hinta, sisäänostohinta, lähde_skeema, tila, teos_id)
        VALUES
            (NEW.nide_id, NEW.hinta, NEW.sisäänostohinta, NEW.lähde_skeema, NEW.tila, NEW.teos_id);

        RETURN NEW;

    ELSIF TG_OP = 'UPDATE' THEN
        -- Kun D1_divari.Nide -rivin tietoja päivitetään
        UPDATE keskusdivari.nide
           SET hinta = NEW.hinta,
           	   sisäänostohinta = NEW.sisäänostohinta,
           	   lähde_skeema = NEW.lähde_skeema,
           	   tila = NEW.tila,
           	   teos_id = NEW.teos_id
         WHERE nide_id = OLD.nide_id;

        RETURN NEW;
        
    ELSIF TG_OP = 'DELETE' THEN
        -- Kun D1_divari.nide -rivi poistetaan
         DELETE FROM keskusdivari.nide
         WHERE nide_id = OLD.nide_id;

        RETURN OLD;
        
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER nide_copy_trigger
AFTER INSERT OR UPDATE
ON d1_divari.nide
FOR EACH ROW
EXECUTE PROCEDURE d1_divari.nide_copy_trigger_func();

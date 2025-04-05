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
            (teos_id, nimi, tekijä, isbn, julkaisuvuosi, teostyyppi, teosluokka, paino, lähde_skeema, divari_id)
        VALUES
            (NEW.teos_id, NEW.nimi, NEW.tekijä, NEW.isbn, NEW.julkaisuvuosi, NEW.teostyyppi,
             NEW.teosluokka, NEW.paino, NEW.lähde_skeema, NEW.divari_id);

    ELSIF TG_OP = 'UPDATE' THEN
        -- Kun D1_divari.Teos -rivin tietoja päivitetään
        UPDATE keskusdivari.teos
           SET nimi = NEW.nimi,
           	   tekijä = NEW.tekijä,
               isbn = NEW.isbn,
               julkaisuvuosi = NEW.julkaisuvuosi,
               teostyyppi = NEW.teostyyppi,
               teosluokka = NEW.teosluokka,
               paino = NEW.paino,
               lähde_skeema = NEW.lähdeskeema,
               divari_id = NEW.divari_id
         WHERE teos_id = OLD.teos_id;

    ELSIF TG_OP = 'DELETE' THEN
        -- Kun D1_divari.Teos -rivi poistetaan
        DELETE FROM keskusdivari.teos
         WHERE teos_id = OLD.teos_id;
        
    END IF;

    -- No need to return anything in AFTER triggers
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
        INSERT INTO keskusdivari.nide
            (nide_id, hinta, sisäänostohinta, lähde_skeema, tila, teos_id)
        VALUES
            (NEW.nide_id, NEW.hinta, NEW.sisäänostohinta, NEW.lähde_skeema, NEW.tila, NEW.teos_id);

    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE keskusdivari.nide
        SET hinta = NEW.hinta,
            sisäänostohinta = NEW.sisäänostohinta,
            tila = NEW.tila,
            teos_id = NEW.teos_id
        WHERE nide_id = OLD.nide_id;
        
    ELSIF TG_OP = 'DELETE' THEN
        DELETE FROM keskusdivari.nide
        WHERE nide_id = OLD.nide_id;
        
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER nide_copy_trigger
AFTER INSERT OR UPDATE OR DELETE
ON d1_divari.nide
FOR EACH ROW
EXECUTE FUNCTION d1_divari.nide_copy_trigger_func();



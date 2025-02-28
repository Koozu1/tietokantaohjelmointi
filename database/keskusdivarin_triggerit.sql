--Ryhmä 12: Noora Ahonen, Niina Nevala, Onni Pylvänen

-- Kun ostoskoriin lisätään yksi fyysinen kirja (nide), sen tila vaihtuu. 
-- Tila täytyy päivittää myös d1_divarin tietokantaan.
-- Tila: vapaa, varattu, myyty. Mikäli kirja on vapaa, sen voi lisätä ostoskoriin,
-- jos se on varattu, silloin kirja on jo jonkun ostoskorissa ja jos kirja on myyty,
-- ei sitä näytetä hakutuloksissa


CREATE OR REPLACE FUNCTION keskusdivari.nide_trigger_func()
RETURNS TRIGGER AS
$$
BEGIN

    IF TG_OP = 'UPDATE' THEN
        -- Kun keskusdivari.nide -rivin tietoja päivitetään
        UPDATE d1_divari.nide
           SET tila = NEW.tila
         WHERE nide_id = OLD.nide_id;

        RETURN NEW;
        
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER nide_trigger
AFTER UPDATE
ON keskusdivari.nide
FOR EACH ROW
EXECUTE PROCEDURE keskusdivari.nide_trigger_func();
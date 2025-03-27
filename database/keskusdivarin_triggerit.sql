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
    IF TG_ARGV[0] = 'triggered' THEN
        RETURN NEW;  -- Estetään looppi
    END IF;

    IF TG_OP = 'UPDATE' THEN
        -- Päivitetään vain, jos lähde on D1
        IF OLD.lähde_skeema = 'd1' THEN
            UPDATE d1_divari.nide
            SET tila = NEW.tila
            WHERE nide_id = OLD.nide_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER nide_trigger
AFTER UPDATE
ON keskusdivari.nide
FOR EACH ROW
EXECUTE FUNCTION keskusdivari.nide_trigger_func('triggered');  -- Annetaan flagiksi 'triggered'

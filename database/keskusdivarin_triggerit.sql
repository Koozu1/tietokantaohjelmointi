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
        IF OLD.lähde_skeema = 'd1' AND NEW.tila IS DISTINCT FROM OLD.tila THEN
            -- Vain tila-kenttä takaisinpäin
            EXECUTE 'SET session_replication_role = replica';

            UPDATE d1_divari.nide
            SET tila = NEW.tila
            WHERE nide_id = OLD.nide_id;

            EXECUTE 'SET session_replication_role = DEFAULT';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER nide_trigger
AFTER UPDATE
ON keskusdivari.nide
FOR EACH ROW
EXECUTE FUNCTION keskusdivari.nide_trigger_func();


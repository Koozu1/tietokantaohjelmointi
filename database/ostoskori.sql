--Ryhmä 12: Noora Ahonen, Niina Nevala, Onni Pylvänen

Lisätään nide ostoskoriin

function addToShoppingBasket(teos_id, tilaus_id, nide_id) {
  let teos = `%${teos_id}%`;
  let tilaus = `%${tilaus_id}%`;
  let nide = `%${nide_id}%`;
  
  const sql = `
	INSERT INTO keskusdivari.ostoskori
	(teos_id, tilaus_id, nide_id)
	VALUES
	($1, $2, $3);
  `;
  
  return db.query(sql, [teos, tilaus, nide]);
}

---------------------------------------------

Muutetaan tila = varattu

function changeTila(nide_id) {
  let nide = `%${nide_id}%`;
  
  const sql = `
	UPDATE Keskusdivari.Nide
   	SET tila = 'varattu'
   	WHERE nide_id = $1
  `;
  
  return db.query(sql, [nide]);
}

---------------------------------------------

Poistetaan ostoskorista

function removeFromShoppingBasket(nide_id) {
  let nide = `%${nide_id}%`;
  
  const sql = `
   	DELETE FROM Keskusdivari.Ostoskori
	WHERE nide_id = $1
   	
  `;
  
  return db.query(sql, [nide]);
}

---------------------------------------------

Muutetaan tila = vapaa

function changeTila(nide_id) {
  let tila = `%${nide_id}%`;
  
  const sql = `
	UPDATE Keskusdivari.Nide
   	SET tila = 'vapaa'
   	WHERE nide_id = $1
  `;
  
  return db.query(sql, [tila]);
}

---------------------------------------------

Lasketaan niteiden yhteishinta

function getPrice() {
  
  const sql = `
	SELECT SUM(n.hinta) AS total_hinta
	FROM Keskusdivari.Ostoskori o
	JOIN Keskusdivari.Nide n ON o.nide_id = n.nide_id;

	
  `;
  
  return db.query(sql);
}

---------------------------------------------

Lasketaan toimituskulut

function calculatePostageCosts() {
  
  const sql = `
	SELECT SUM(t.paino) AS total_paino
	FROM Keskusdivari.Ostoskori o
	JOIN Keskusdivari.Teos t ON o.teos_id = t.teos_id;

	
  `;
  
  if sql <
  	let postageCost = 
  
  return postageCost;
}


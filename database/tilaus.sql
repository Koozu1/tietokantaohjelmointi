--Ryhmä 12: Noora Ahonen, Niina Nevala, Onni Pylvänen


Kun painetaan lopuksi 'Tilaa', muokataan kaikki ostoskorissa olevat tuotteet 'myyty' tilaan,
jonka jälkeen tyhjennetään se.

function purchase() {
  
  const sql = `
	UPDATE Keskusdivari.Nide
	SET tila = 'myyty'
	FROM Keskusdivari.Ostoskori
	WHERE Nide.nide_id = Ostoskori.nide_id

  `;
  
  return db.query(sql);
}

--------------------------------------

Tyhjennetään ostoskori

function clearShoppingBasket() {
  
  const sql = `
	DELETE FROM Keskusdivari.Ostoskori

  `;
  
  return db.query(sql);
}

--------------------------------------

Kuitataan että tilaus onnistui

function confirmOrder() {
  
  const sql = `
	UPDATE Keskusdivari.Tilaus
	SET tila = true

  `;
  
  return db.query(sql);
}

--------------------------------------

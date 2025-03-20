--Ryhmä 12: Noora Ahonen, Niina Nevala, Onni Pylvänen


Hakukenttä Kirjan nimelle
Hakukenttä Kirjan tekijälle
Hakukenttä Kirjan teostyypille


Haetaan kaikki vapaana olevat niteet
Oletetaan, että hakukenttien arvot: title, author, type


function searchTeos(title, author, type) {
  let titlePattern = title ? `%${title}%` : null;
  let authorPattern = author ? `%${author}%` : null;
  let typePattern = type ? `%${type}%` : null;
  
  const sql = `
    SELECT t.*, n.hinta
    FROM Keskusdivari.Teos t
    JOIN Keskusdivari.Nide n ON t.teos_id = n.teos_id
    WHERE ($1 IS NULL OR t.nimi ILIKE $1)
      AND ($2 IS NULL OR t.kirjoittaja ILIKE $2)
      AND ($3 IS NULL OR t.teostyyppi ILIKE $3)   
      AND n.tila = 'vapaa'
      
  `;
  
  return db.query(sql, [titlePattern, authorPattern, typePattern]);
}


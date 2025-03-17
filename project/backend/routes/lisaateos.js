import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.post("/lisaateos", async (req, res) => {
  const { nimi, tekijä, isbn, julkaisuvuosi, teostyyppi, teosluokka, paino, hinta, sisäänostohinta } = req.body;

  try {
    // Check if a teos with the same ISBN already exists
    const existingTeosResult = await pool.query(
      'SELECT teos_id FROM d1_divari.teos WHERE isbn = $1',
      [isbn]
    );

    let teos_id;
    if (existingTeosResult.rows.length > 0) {
      // Use the existing teos_id
      teos_id = existingTeosResult.rows[0].teos_id;
    } else {
      // Insert a new teos and get the new teos_id
      const teosResult = await pool.query(
        'INSERT INTO d1_divari.teos (nimi, tekijä, isbn, julkaisuvuosi, teostyyppi, teosluokka, paino, lähde_skeema, divari_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING teos_id',
        [nimi, tekijä, isbn, julkaisuvuosi, teostyyppi, teosluokka, paino, 'd1', 1]
      );
      teos_id = teosResult.rows[0].teos_id;
    }

    // Insert a new nide with the teos_id
    const nideResult = await pool.query(
      'INSERT INTO d1_divari.nide (hinta, sisäänostohinta, lähde_skeema, tila, teos_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [hinta, sisäänostohinta, 'd1', 'vapaa', teos_id]
    );

    res.status(201).json({ teos_id, nide: nideResult.rows[0] });
  } catch (error) {
    console.error('Error inserting new book or copy:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.post("/lisaateoskeskusdivari", async (req, res) => {
  const { divari_id, nimi, tekijä, isbn, julkaisuvuosi, teostyyppi, paino, hinta, sisäänostohinta } = req.body;
  try {
    console.log('Request body:', req.body);

    // Get the count of existing rows in the teos table
    const countResult = await pool.query('SELECT COUNT(*) AS count FROM keskusdivari.teos');
    const count = parseInt(countResult.rows[0].count, 10);
    const teos_id = count + 1001; // Generate teos_id based on the count
    console.log('Generated teos_id:', teos_id);

    const teosResult = await pool.query(
      'INSERT INTO keskusdivari.teos (teos_id, nimi, tekijä, isbn, julkaisuvuosi, teostyyppi, paino, lähde_skeema, divari_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING teos_id',
      [teos_id, nimi, tekijä, isbn, julkaisuvuosi, teostyyppi, paino, 'keskusdivari', divari_id]
    );
    console.log('Inserted teos:', teosResult.rows[0]);

    const nideResult = await pool.query(
      'INSERT INTO keskusdivari.nide (hinta, sisäänostohinta, lähde_skeema, tila, teos_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [hinta, sisäänostohinta, 'keskusdivari', 'vapaa', teos_id]
    );
    console.log('Inserted nide:', nideResult.rows[0]);

    res.status(201).json({ teos: teosResult.rows[0], nide: nideResult.rows[0] });
  } catch (error) {
    console.error('Error inserting new book or copy:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
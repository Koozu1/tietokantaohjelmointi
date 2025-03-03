import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.post("/lisaateos", async (req, res) => {
  const { nimi, tekijä, isbn, julkaisuvuosi, teostyyppi, paino, hinta, sisäänostohinta } = req.body;
  try {
    const teosResult = await pool.query(
      'INSERT INTO d1_divari.teos (nimi, tekijä, isbn, julkaisuvuosi, teostyyppi, paino, lähde_skeema) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING teos_id',
      [nimi, tekijä, isbn, julkaisuvuosi, teostyyppi, paino, 'd1']
    );
    const teos_id = teosResult.rows[0].teos_id;

    const nideResult = await pool.query(
      'INSERT INTO d1_divari.nide (hinta, sisäänostohinta, lähde_skeema, tila, teos_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [hinta, sisäänostohinta, 'd1', 'available', teos_id]
    );

    res.status(201).json({ teos: teosResult.rows[0], nide: nideResult.rows[0] });
  } catch (error) {
    console.error('Error inserting new book or copy:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
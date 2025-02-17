import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.post("/lisaateos", async (req, res) => {
  const { nimi, isbn, hinta, sisäänostohinta, paino, teostyyppi } = req.body;
  let client;

  try {
    console.log("Received request to add teos:", req.body);

    client = await pool.connect();

    // Check if teostyyppi exists
    let teostyyppiResult = await client.query(
      'SELECT teostyyppi_id FROM Keskusdivari.Teostyyppi WHERE tyyppi_nimi = $1',
      [teostyyppi]
    );
    console.log("Teostyyppi query result:", teostyyppiResult.rows);

    // If teostyyppi does not exist, insert a new record into Teostyyppi table
    let teostyyppi_id;
    if (teostyyppiResult.rows.length === 0) {
      teostyyppiResult = await client.query(
        'INSERT INTO Keskusdivari.Teostyyppi (tyyppi_nimi) VALUES ($1) RETURNING teostyyppi_id',
        [teostyyppi]
      );
      teostyyppi_id = teostyyppiResult.rows[0].teostyyppi_id;
      console.log("Inserted new teostyyppi:", teostyyppi_id);
    } else {
      teostyyppi_id = teostyyppiResult.rows[0].teostyyppi_id;
      console.log("Found existing teostyyppi:", teostyyppi_id);
    }

    // Insert into Teos table
    const result = await client.query(
      'INSERT INTO Keskusdivari.Teos (nimi, isbn, hinta, sisäänostohinta, paino, teostyyppi_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nimi, isbn, hinta, sisäänostohinta, paino, teostyyppi_id]
    );
    console.log("Inserted new teos:", result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (client) {
      client.release();
    }
  }
});

export default router;
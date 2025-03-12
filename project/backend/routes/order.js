import express from "express";
import { pool } from "../db.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/order", verifyToken, async (req, res) => {
  console.log("HIT order");
  console.log(req.body.ids);
  const { teos_id } = req.body;
  try {
    const result = await pool.query(
      "SELECT teos_id, nimi, tekijä, julkaisuvuosi, teostyyppi, paino, divari_id FROM keskusdivari.teos"
    );
    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/cart", verifyToken, async (req, res) => {});

//UTIL TO GET ORDER. Ei käytössä
export const getOrder = async (userId) => {
  const res = await pool.query(
    "SELECT tilaus_id FROM keskusdivari.Tilaus WHERE käyttäjä_id = $1",
    [userId]
  );
  if (res.rowCount > 0) {
    return res.rows[0].tilaus_id;
  }
  console.log("STEP 2");
  const divariId = (
    await pool.query("SELECT divari_id FROM keskusdivari.divari_d2")
  ).rows[0].divari_id;
  console.log("STEP 3");

  const newOrder = await pool.query(
    "INSERT INTO Keskusdivari.Tilaus (divari_id, käyttäjä_id) VALUES ($1, $2) RETURNING tilaus_id",
    [divariId, userId]
  );
  console.log("NEW ORDER IS", newOrder);
  return newOrder.rows[0].tilaus_id;
};

export default router;

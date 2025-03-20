import express from "express";
import { pool } from "../db.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//for reserving
router.post("/order", verifyToken, async (req, res) => {
  const { order_id } = req.body;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const baseQuery = `
    
    `;
    await client.query("");

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
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
  const divariId = (
    await pool.query("SELECT divari_id FROM keskusdivari.divari_d2")
  ).rows[0].divari_id;

  const newOrder = await pool.query(
    "INSERT INTO Keskusdivari.Tilaus (divari_id, käyttäjä_id) VALUES ($1, $2) RETURNING tilaus_id",
    [divariId, userId]
  );
  return newOrder.rows[0].tilaus_id;
};

export default router;

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";
import { verifyToken } from "../verifyToken.js";
import { getOrder } from "./order.js";

const router = express.Router();

router.post("/getCart", verifyToken, async (req, res) => {
  console.log("HIT Cart add");
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
//LISÄYS
router.post("/cart", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { itemId } = req.body;
  try {
    const orderId = await getOrder(userId);
    const cartId = await pool.query(
      "INSERT INTO keskusdivari.ostoskori (teos_id, tilaus_id) VALUES ($1, $2) ON CONFLICT (teos_id, tilaus_id) DO NOTHING",
      [itemId, orderId]
    );
    const countRes = await pool.query(
      "SELECT COUNT(*) FROM keskusdivari.ostoskori WHERE tilaus_id = $1",
      [orderId]
    );
    const count = countRes.rows[0].count;
    console.log("count now", count);
    res.json({ count: count });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
    return;
  }
});

router.get("/cart", verifyToken, async (req, res) => {
  const userId = req.user;
  console.log("USER WITH ID", userId);

  try {
    const result = await pool.query(
      "SELECT tilaus_id, myyntipäivä, divari_id, käyttäjä_id FROM keskusdivari.tilaus WHERE käyttäjä_id = $1",
      [userId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/cart", verifyToken, async (req, res) => {});

export default router;

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";
import { verifyToken } from "../verifyToken.js";
import { getOrder } from "./order.js";

const router = express.Router();

router.post("/cart", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { itemId } = req.body;
  try {
    const orderId = await getOrder(userId);
    const cartId = await pool.query(
      "INSERT INTO keskusdivari.ostoskori (tilaus_id, nide_id) VALUES ($1, $2) ON CONFLICT (tilaus_id, nide_id) DO NOTHING",
      [orderId, itemId]
    );
    const countRes = await pool.query(
      "SELECT nide_id FROM keskusdivari.ostoskori WHERE tilaus_id = $1",
      [orderId]
    );
    const itemIds = countRes.rows.map((item) => item.nide_id);
    res.json({ itemIds: itemIds });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
    return;
  }
});

router.get("/cart", verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const orderId = await getOrder(userId);
    const countRes = await pool.query(
      "SELECT nide_id FROM keskusdivari.ostoskori WHERE tilaus_id = $1",
      [orderId]
    );
    const itemIds = countRes.rows.map((item) => item.nide_id);
    res.json({ itemIds: itemIds });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
    return;
  }
});

router.delete("/cart", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { itemId } = req.query;

  try {
    const orderId = await getOrder(userId);
    const countRes = await pool.query(
      "DELETE FROM keskusdivari.ostoskori WHERE tilaus_id = $1 AND nide_id = $2",
      [orderId, itemId]
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
    return;
  }
});

export default router;

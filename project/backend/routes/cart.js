import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";
import { verifyToken } from "../verifyToken.js";
import { getOrder } from "./order.js";

const router = express.Router();

router.get("/getCart", verifyToken, async (req, res) => {
  console.log("got request to /getCart");
  const { userId } = req.query;
  const orderId = await getOrder(userId);

  const baseQuery = `
  SELECT n.*, t.*
  FROM keskusdivari.ostoskori o
  JOIN keskusdivari.nide n ON o.nide_id = n.nide_id
  JOIN keskusdivari.teos t ON n.teos_id = t.teos_id
  WHERE o.tilaus_id = $1
  `;

  try {
    const result = await pool.query(baseQuery, [orderId]);
    console.log(result);
    const structuredData = result.rows.map((row) => ({
      id: row.nide_id,
      price: row.hinta,
      status: row.tila,
      title: row.nimi,
      author: row.tekijä,
    }));
    res.json(structuredData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error fetching data" });
  }
});

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
    const itemIds = countRes.rows.map((item) => item.teos_id);
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

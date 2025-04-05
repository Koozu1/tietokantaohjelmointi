import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, address, phone, email, password } = req.body;
  let client;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    client = await pool.connect();
    const result = await pool.query(
      "INSERT INTO Keskusdivari.Käyttäjä (nimi, osoite, puhelin, email, salasana, pääkäyttäjä) VALUES ($1, $2, $3, $4, $5, $6) RETURNING käyttäjä_id, nimi, email",
      [name, address, phone, email, hashedPassword, false]
    );
    res.json({ user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (client) {
      client.release();
    }
  }
});

export default router;

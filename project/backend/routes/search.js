import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

const router = express.Router();

const verifyToken = (req, res, next) => {
  console.log("SEARCHING");
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("11111");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("222222");
    console.log(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
  console.log("333");
};

router.get("/search", verifyToken, async (req, res) => {
  console.log("HIT SEARCH");
  const data = req.body;
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

export default router;

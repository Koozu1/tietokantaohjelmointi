import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

const router = express.Router();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

router.get("/search", verifyToken, async (req, res) => {
  console.log("HIT SEARCH");

  const { author, title, type } = req.query;

  let baseQuery = `
  SELECT t.*
  FROM Keskusdivari.Teos t
  JOIN Keskusdivari.Nide n ON t.teos_id = n.teos_id
  WHERE n.tila = 'vapaa'
  `;

  // Taulukko, johon kerätään parametreja
  const params = [];

  // Jos käyttäjä antoi title-hakusanan, lisätään ehto
  if (title) {
    baseQuery += ` AND t.nimi ILIKE $${params.length + 1}`;
    params.push(`%${title}%`); // Villikortit ympärille
  }

  // Jos käyttäjä antoi author-hakusanan, lisätään ehto
  if (author) {
    baseQuery += ` AND t.tekijä ILIKE $${params.length + 1}`;
    params.push(`%${author}%`);
  }

  // Jos käyttäjä antoi type-hakusanan, lisätään ehto
  if (type) {
    baseQuery += ` AND t.teostyyppi = $${params.length + 1}`;
    params.push(type);
  }

  try {
    // Ajetaan kysely: baseQuery + parametrit
    const result = await pool.query(baseQuery, params);

    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

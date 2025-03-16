import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM Keskusdivari.Käyttäjä WHERE email = $1",
      [email]
    );
    if (result.rows.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.salasana);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, isAdmin: user.pääkäyttäjä },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    console.log("USERDATA", user);
    res.json({
      token,
      user: {
        id: user.käyttäjä_id,
        username: user.nimi,
        email: user.email,
        isAdmin: user.pääkäyttäjä,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

import jwt from "jsonwebtoken";
import { pool } from "./db.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const isValidUser = await validateUser(decoded.id);
    if (!isValidUser) {
      console.log("invalid user");
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    next();
  } catch (error) {
    console.log("error in method", req.authHeader, error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const validUsers = [];
const validateUser = async (userId) => {
  try {
    if (validUsers.includes(userId)) {
      return true;
    }
    const result = await pool.query(
      "SELECT käyttäjä_id FROM Keskusdivari.Käyttäjä WHERE käyttäjä_id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      console.log("User not found in database:", userId);
      return false;
    }
    validUsers.push(userId);
    return true;
  } catch (error) {
    console.log("Error validating user", error);
    return false;
  }
};

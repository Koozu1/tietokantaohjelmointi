import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

const connect = async () => {
  try {
    const client = await pool.connect();
    console.log("Successfully connected to the database");
    return client;
  } catch (error) {
    console.error("Database connection error", error);
    throw error;
  }
};

export { connect, pool };

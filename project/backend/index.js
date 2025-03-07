import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import login from "./routes/login.js";
import register from "./routes/register.js";
import { connect } from "./db.js";

dotenv.config();

connect();

const app = express();
app.use(cors());
app.use(express.json());
app.use(login);
app.use(register);

app.listen(5001, () => console.log(`Server running on port 5001`));

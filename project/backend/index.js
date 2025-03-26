import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import login from "./routes/login.js";
import register from "./routes/register.js";
import lisaateos from "./routes/lisaateos.js";
import lisaateoskeskusdivari from "./routes/lisaateoskeskusdivari.js";
import search from "./routes/search.js";
import cart from "./routes/cart.js";
import order from "./routes/order.js";
import { connect } from "./db.js";

dotenv.config();

connect();

const app = express();
app.use(cors());
app.use(express.json());
app.use(login);
app.use(register);
app.use(lisaateos);
app.use(lisaateoskeskusdivari);
app.use(search);
app.use(cart);
app.use(order);

app.listen(5001, () => console.log(`Server running on port 5001`));

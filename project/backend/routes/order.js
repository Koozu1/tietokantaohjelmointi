import express from "express";
import { pool } from "../db.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//for reserving
router.post("/order/reserve", verifyToken, async (req, res) => {
  console.log("started reserve");
  const orderId = await getOrder(req.user.id);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const deleted = await deleteReservedCarts(client, orderId);
    if (deleted) {
      await client.query("COMMIT");
      res.status(409).json({
        message: "Some items were unavailable and were removed from your cart.",
        deletedItems: deleted,
      });
      return;
    }
    const reserved = reserveAllItems(client, orderId);

    await client.query("COMMIT");
    res.status(200).json({ message: "Order successfully reserved" });
  } catch (error) {
    console.log("Error in reserver", error);
    await client.query("ROLLBACK");
    res.status(500).json({ error: "Error reserving order" });
  } finally {
    client.release();
  }
});

router.post("/order/confirm", verifyToken, async (req, res) => {
  console.log("started confirm");
  const orderId = await getOrder(req.user.id);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const weight = await getOrderWeight(client, orderId);
    const price = await getOrderPrice(client, orderId, weight);

    const response = await client.query(
      "INSERT INTO keskusdivari.Lähetys (lähetyksen_paino, tilaus_id, hinta_yht) values ($1, $2, $3)",
      [weight, orderId, price]
    );
    await client.query(
      `UPDATE keskusdivari.tilaus SET tila = 'suoritettu' WHERE tilaus_id = $1`,
      [orderId]
    );

    await client.query("COMMIT");
    console.log("COMMITTED!");
    res.status(200).json({ message: "Order successfully confirmed" });
  } catch (error) {
    console.log("Error in confirm", error);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
});

export const getOrder = async (userId) => {
  const res = await pool.query(
    "SELECT tilaus_id FROM keskusdivari.Tilaus WHERE käyttäjä_id = $1 AND tila = 'kesken'",
    [userId]
  );
  if (res.rowCount > 0) {
    return res.rows[0].tilaus_id;
  }
  const divariId = (
    await pool.query("SELECT divari_id FROM keskusdivari.divari_d2")
  ).rows[0].divari_id;

  const newOrder = await pool.query(
    "INSERT INTO Keskusdivari.Tilaus (divari_id, käyttäjä_id, tila) VALUES ($1, $2, $3) RETURNING tilaus_id",
    [divariId, userId, "kesken"]
  );
  return newOrder.rows[0].tilaus_id;
};

const deleteReservedCarts = async (client, orderId) => {
  //delete all carts that are already reserved or bought. return also info about them to return to frontend
  const baseQuery = `
  WITH deleted AS (
    DELETE FROM keskusdivari.ostoskori
    USING keskusdivari.nide
    WHERE ostoskori.nide_id = nide.nide_id
    AND nide.tila != 'vapaa'
    AND ostoskori.tilaus_id = $1
    RETURNING ostoskori.nide_id, nide.teos_id
  )
  SELECT d.nide_id, t.nimi, t.tekijä
  FROM deleted d
  JOIN keskusdivari.teos t ON d.teos_id = t.teos_id
  `;
  try {
    const result = await client.query(baseQuery, [orderId]);
    if (result.rowCount > 0) {
      return result.rows;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const reserveAllItems = async (client, orderId) => {
  const baseQuery = `
  UPDATE keskusdivari.nide
  SET tila = 'varattu'
  WHERE nide_id IN (
    SELECT nide_id FROM keskusdivari.ostoskori WHERE tilaus_id = $1
  )
  `;
  console.log("WILL DO FOR ID", orderId);
  const result = await client.query(baseQuery, [orderId]);
};

const getOrderWeight = async (client, orderId) => {
  const baseQuery = `
  SELECT SUM(t.paino) AS total_weight
 	FROM keskusdivari.ostoskori o
 	JOIN keskusdivari.nide n ON o.nide_id = n.nide_id
  JOIN keskusdivari.teos t ON n.teos_id = t.teos_id
  WHERE o.tilaus_id = $1;
  `;
  console.log("STARTING weight query.");
  const result = await client.query(baseQuery, [orderId]);
  if (result.rowCount === 1) {
    return result.rows[0].total_weight;
  }
  return null;
};

const getOrderPrice = async (client, orderId, weight) => {
  const baseQuery = `
  SELECT SUM(n.hinta) AS price_sum
  FROM keskusdivari.ostoskori o
  JOIN keskusdivari.nide n ON o.nide_id = n.nide_id
  WHERE o.tilaus_id = $1;
   `;
  const result = await client.query(baseQuery, [orderId]);
  if (result.rowCount !== 1) {
    throw new Error("error fetching sum");
  }
  const itemPrices = parseInt(result.rows[0].price_sum);
  let shippingPrice;
  if (weight <= 50) shippingPrice = 2.5;
  else if (weight <= 250) shippingPrice = 5.0;
  else if (weight <= 1000) shippingPrice = 10.0;
  else shippingPrice = 15.0;
  console.log("item price", itemPrices, ", and shipping:", shippingPrice);

  return itemPrices + shippingPrice;
};

export default router;

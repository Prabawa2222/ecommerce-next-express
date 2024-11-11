import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import UserRoute from "./src/users/userRouter.js";
import ProductRoute from "./src/products/productRouter.js";
import OrderRoute from "./src/orders/orderRouter.js";

import db from "./src/config/db.js";

dotenv.config();

const app = express();
app.use(
  cors({
    methods: "*",
    origin: "*",
  })
);

app.use(express.json());
app.use(UserRoute, ProductRoute, OrderRoute);

const PORT = process.env.PORT || 5000;

// Sync database once when the server starts
(async () => {
  try {
    await db.sync(); // Runs only once on server startup
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Failed to sync database:", error);
  }
})();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

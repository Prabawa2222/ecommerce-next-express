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

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);


// Hanle port in use
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Trying port 8080...`);
    app.listen(8080, () => {
      console.log("Server running on fallback port 8080");
    });
  } else {
    console.error("An error occurred:", error);
  }
});

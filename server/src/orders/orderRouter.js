import express from "express";
import { createOrder, getAllOrders } from "./orderController.js";

const router = express.Router();

router.post("/orders", createOrder);
router.get("/orders", getAllOrders);

export default router;

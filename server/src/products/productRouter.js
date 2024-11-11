import express from "express";

import {
  getAllProduct,
  createProduct,
  updateProductById,
  getProductById,
  deleteProduct,
} from "./productController.js";

const router = express.Router();

router.get("/product", getAllProduct);
router.get("/product/:id", getProductById);
router.post("/product", createProduct);
router.put("/product/:id", updateProductById);
router.delete("/product/:id", deleteProduct);

export default router;

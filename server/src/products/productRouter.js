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
router.patch("/product/:id", updateProductById);          // change to patch for more dynamic
router.delete("/product/:id", deleteProduct);

export default router;

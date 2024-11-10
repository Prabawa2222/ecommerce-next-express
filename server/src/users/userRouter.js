import express from "express";

import {
  createUser,
  deleteUser,
  getUsers,
  getUsersById,
  updateUserById,
} from "./userController.js";

const router = express.Router();

router.post("/user", createUser);
router.get("/user", getUsers);
router.get("/user/:id", getUsersById);
router.patch("/user/:id", updateUserById);
router.delete("/user/:id", deleteUser);

export default router;

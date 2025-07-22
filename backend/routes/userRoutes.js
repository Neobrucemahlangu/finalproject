import express from "express";
import { registerUser, authUser } from "../controllers/userController.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", authUser);

export default router;

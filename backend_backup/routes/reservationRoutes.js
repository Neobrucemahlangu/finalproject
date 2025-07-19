import express from "express";
import {
  createReservation,
  getReservationsByUser,
  getReservationsByHost,
  deleteReservation,
} from "../controllers/reservationController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Create a new reservation 
router.post("/", protect, createReservation);

// Get reservations for logged-in user 
router.get("/user", protect, getReservationsByUser);

// 
router.get("/host", protect, getReservationsByHost);

// Delete a reservation by ID 
router.delete("/:id", protect, deleteReservation);

export default router;


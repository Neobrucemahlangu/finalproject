import express from "express";
import {
  createAccommodation,
  getAccommodations,
  updateAccommodation,
  deleteAccommodation,
} from "../controllers/accommodationController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createAccommodation);
router.get("/", getAccommodations);
router.put("/:id", protect, updateAccommodation);
router.delete("/:id", protect, deleteAccommodation);

export default router;

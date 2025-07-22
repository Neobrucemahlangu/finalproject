import express from "express";
import {
  getAllListings,
  getListingById,
  getListingsByHost,
  getAllLocations,
  searchListingByLocation,
} from "../controllers/listingController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllListings);
router.get("/locations", getAllLocations);
router.get("/search", searchListingByLocation);
router.get("/host", protect, getListingsByHost);
router.get("/:id", getListingById); 

export default router;


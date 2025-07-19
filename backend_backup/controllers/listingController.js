import Listing from "../models/Listing.js";

// GET all listings
export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find({});
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching listings" });
  }
};

// ✅ GET listing by ID (with owner populated)
export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("owner", "_id name email");

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching listing" });
  }
};

// GET listings by host (protected)
export const getListingsByHost = async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.user.id }); // ensure 'owner' matches your schema
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching host listings" });
  }
};


export const getAllLocations = async (req, res) => {
  try {
    const locations = await Listing.find().distinct("location");
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching locations" });
  }
};


export const searchListingByLocation = async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    const listing = await Listing.findOne({
      location: { $regex: location, $options: "i" },
    });

    if (listing) {
      return res.json({ type: "listing", listing });
    } else {
      return res.json({ type: "collection", location });
    }
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Server error during search" });
  }
};



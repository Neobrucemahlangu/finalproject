// getListings.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Listing from "./models/Listing.js";

dotenv.config();

const getListings = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const listings = await Listing.find({});
  console.log("Listings:");
  listings.forEach(listing => console.log(listing._id.toString(), listing.title));
  process.exit();
};

getListings();



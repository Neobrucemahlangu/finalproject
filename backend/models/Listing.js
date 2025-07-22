import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  type: String,
  guests: Number,
  bedrooms: Number,
  bathrooms: Number,
  amenities: [String],
  rating: Number,
  reviews: Number,
  price: Number,
  imageUrls: [String],


  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
   required: true,
  },
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;



import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  description: String,
  type: { type: String, required: true },
  price: { type: Number, required: true },
  guests: Number,
  bedrooms: Number,
  bathrooms: Number,
  amenities: [String],
  images: [String],
  host: String,
  host_id: mongoose.Schema.Types.ObjectId,
  enhancedCleaning: Boolean,
  selfCheckIn: Boolean,
  rating: Number,
  reviews: Number,
  specificRatings: {
    cleanliness: Number,
    communication: Number,
    checkIn: Number,
    accuracy: Number,
    location: Number,
    value: Number,
  },
}, { timestamps: true });

const Accommodation = mongoose.model("Accommodation", accommodationSchema);

export default Accommodation;

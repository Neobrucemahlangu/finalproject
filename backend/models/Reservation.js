import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  listing: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",  
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  guests: { type: Number, required: true },
  startDate: { type: Date, required: true }, // check-in
  endDate: { type: Date, required: true },   // check-out
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;

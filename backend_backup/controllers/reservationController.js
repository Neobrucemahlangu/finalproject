import Reservation from "../models/Reservation.js";
import Listing from "../models/Listing.js";

// Creating  a new reservation
export const createReservation = async (req, res) => {
  const { listing, guests, startDate, endDate, totalPrice } = req.body;

  if (!listing || !guests || !startDate || !endDate || !totalPrice) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({ message: "Check-out date must be after check-in date" });
  }

  try {
    const reservation = new Reservation({
      listing,
      user: req.user._id,
      guests,
      startDate,
      endDate,
      totalPrice,
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Server error creating reservation" });
  }
};

//reservations for logged-in user
export const getReservationsByUser = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id })
      .populate("listing")
      .sort({ createdAt: -1 });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching reservations" });
  }
};


export const getReservationsByHost = async (req, res) => {
  try {
    const hostListings = await Listing.find({ host: req.user._id }).select("_id");
    const listingIds = hostListings.map((listing) => listing._id);

    const reservations = await Reservation.find({ listing: { $in: listingIds } })
      .populate("listing")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(reservations);
  } catch (error) {
    
    res.status(500).json({ message: "Server error fetching host reservations" });
  }
};


export const deleteReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    console.log(" DELETE request for reservation:", reservationId);

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      
      return res.status(404).json({ message: "Reservation not found" });
    }

    c

    if (reservation.user.toString() !== req.user._id.toString()) {
      console.log(" Not authorized to delete this reservation.");
      return res.status(403).json({ message: "Not authorized to delete this reservation" });
    }

    await reservation.deleteOne(); 
    console.log("Reservation deleted.");

    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ message: "Server error deleting reservation" });
  }
};


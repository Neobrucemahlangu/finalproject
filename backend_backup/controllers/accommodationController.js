import Accommodation from "../models/Accommodation.js";

// Create accommodation
export const createAccommodation = async (req, res) => {
  try {
    const accommodation = new Accommodation(req.body);
    const savedAccommodation = await accommodation.save();
    res.status(201).json(savedAccommodation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all accommodations
export const getAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find();
    res.json(accommodations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update accommodation
export const updateAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    Object.assign(accommodation, req.body);
    const updatedAccommodation = await accommodation.save();
    res.json(updatedAccommodation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete accommodation
export const deleteAccommodation = async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    await accommodation.remove();
    res.json({ message: "Accommodation deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

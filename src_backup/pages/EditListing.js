import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrls, setImageUrls] = useState("");
  const [amenities, setAmenities] = useState("");

  useEffect(() => {
    if (!user || user.role !== "host") {
      navigate("/login");
      return;
    }

    const fetchListing = async () => {
      try {
        const res = await axios.get(`/api/listings/${id}`);
        const data = res.data;

        // Debug logs
        console.log("Fetched listing owner:", data.owner);
        console.log("Current user ID:", user._id);

        const ownerId = typeof data.owner === "string" ? data.owner : data.owner?._id;
        console.log("Resolved ownerId:", ownerId);

        if (ownerId !== user._id) {
          alert("You are not authorized to edit this listing.");
          navigate("/admin/dashboard");
          return;
        }

        // Populate form fields
        setListing(data);
        setTitle(data.title);
        setDescription(data.description);
        setLocation(data.location);
        setPrice(data.price);
        setImageUrls(data.imageUrls?.join(", ") || "");
        setAmenities(data.amenities?.join(", ") || "");
        setLoading(false);
      } catch (err) {
        setError("Failed to load listing.");
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.put(`/api/listings/${id}`, {
        title,
        description,
        location,
        price: Number(price),
        imageUrls: imageUrls.split(",").map((url) => url.trim()),
        amenities: amenities.split(",").map((a) => a.trim()),
      });

      navigate("/admin/dashboard");
    } catch (err) {
      setError("Failed to update listing.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: "1rem" }}>
      <h2>Edit Listing</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </label>

        <label>
          Location
          <input value={location} onChange={(e) => setLocation(e.target.value)} required />
        </label>

        <label>
          Price (per night)
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
          />
        </label>

        <label>
          Image URLs (comma separated)
          <input value={imageUrls} onChange={(e) => setImageUrls(e.target.value)} />
        </label>

        <label>
          Amenities (comma separated)
          <input value={amenities} onChange={(e) => setAmenities(e.target.value)} />
        </label>

        <button
          type="submit"
          style={{
            backgroundColor: "#ff385c",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditListing;



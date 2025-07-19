import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Listings.css";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get("/api/listings");
        setListings(response.data);
      } catch (err) {
        setError("Failed to load listings.");
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  if (loading) return <p>Loading listings...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section className="listings-section">
      <h2>Featured Listings</h2>
      <div className="listings-grid">
        {listings.map((listing) => (
          <div key={listing._id || listing.id} className="listing-card">
            <img
              src={listing.image || listing.imageUrl || "https://via.placeholder.com/300x180?text=No+Image"}
              alt={listing.title || "Listing Image"}
              className="listing-image"
            />
            <div className="listing-info">
              <h3>{listing.title || "Untitled"}</h3>
              <p>
                {listing.location || "Unknown location"} &bull; {listing.type || "N/A"}
              </p>
              <p className="price">R{listing.price || "N/A"} / night</p>
              <p className="rating">
                ⭐ {listing.rating || "No rating"} ({listing.reviews || 0} reviews)
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Listings;


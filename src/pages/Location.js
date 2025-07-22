import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Location.css";

const Location = () => {
  const { city } = useParams();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/listings");
        const filtered = res.data.filter((listing) =>
          listing.location.toLowerCase() === city.toLowerCase()
        );
        setListings(filtered);
      } catch (err) {
        console.error("Failed to fetch listings:", err);
      }
    };

    fetchListings();
  }, [city]);

  return (
    <div className="location-page">
      <h2>{listings.length} stays in {city}</h2>

      {listings.length === 0 && <p>No listings found for this location.</p>}

      <div className="listings">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="listing-card"
            onClick={() => window.location.href = `/details/${listing._id}`}
          >
            <img src={listing.imageUrl} alt={listing.title} />
            <div className="info">
              <h3>{listing.title}</h3>
              <p>{listing.type} • {listing.amenities.join(", ")}</p>
              <p>⭐ {listing.rating} ({listing.reviews} reviews)</p>
              <p><strong>R{listing.price}</strong> / night</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Location;


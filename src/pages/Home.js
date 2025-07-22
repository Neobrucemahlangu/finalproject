import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

import HeroBanner from "../components/home/HeroBanner";
import Inspiration from "../components/home/Inspiration";
import Experiences from "../components/home/Experiences";
import ThingsToDo from "../components/home/ThingsToDo";
import ShopAirbnb from "../components/home/ShopAirbnb";
import FutureGetaways from "../components/home/FutureGetaways";
import Footer from "../components/Footer";
import HostQuestionBanner from "../components/home/HostQuestionBanner";

const Home = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await axios.get("/api/listings");
        setListings(data);
      } catch (err) {
        setError("Failed to load listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleClick = (id) => {
    navigate(`/listings/${id}`); 
  };

  return (
    <>
      <HeroBanner />
      <Inspiration />
      <Experiences />
      <ThingsToDo />
      <ShopAirbnb />
      <HostQuestionBanner />
      <FutureGetaways />

      <section className="listings-section">
        <h2>Available Listings</h2>

        {loading && <p>Loading listings...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && listings.length === 0 && (
          <p>No listings available at the moment.</p>
        )}

        <div className="listings-grid">
          {listings.map((listing) => {
            const imageSrc =
              Array.isArray(listing.imageUrls)
                ? listing.imageUrls[0]
                : listing.imageUrl || listing.image || "https://via.placeholder.com/300x180?text=No+Image";

            return (
              <div
                key={listing._id || listing.id}
                className="listing-card"
                onClick={() => handleClick(listing._id || listing.id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={imageSrc}
                  alt={listing.title || "Listing Image"}
                  className="listing-image"
                />
                <h3>{listing.title || "Untitled Listing"}</h3>
                <p>{listing.location || "Unknown location"}</p>
                <p>R{listing.price ?? "N/A"} / night</p>
              </div>
            );
          })}
        </div>
      </section>

      
    </>
  );
};

export default Home;



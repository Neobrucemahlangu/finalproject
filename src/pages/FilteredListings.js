import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

const FilteredListings = () => {
  const { city } = useParams();
  const [searchParams] = useSearchParams();

  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilteredListings = async () => {
      try {
        const res = await axios.get(`/api/listings?location=${city}`);
        setListings(res.data);
      } catch (err) {
        setError("Failed to load listings");
      } finally {
        setLoading(false);
      }
    };
    fetchFilteredListings();
  }, [city]);

  if (loading) return <p>Loading listings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Listings in {city}</h1>
      <p>
        Check-in: {checkIn || "N/A"}, Check-out: {checkOut || "N/A"}, Guests: {guests || "N/A"}
      </p>
      <ul>
        {listings.length === 0 && <li>No listings found.</li>}
        {listings.map((listing) => (
          <li key={listing._id}>
            <h3>{listing.title}</h3>
            <p>{listing.description}</p>
            <p>Price: R{listing.price} per night</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilteredListings;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HostDashboard.css";

const HostDashboard = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // get token from localStorage userInfo 
  const getToken = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo?.token || localStorage.getItem("token");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();

        const [listingsRes, reservationsRes] = await Promise.all([
          axios.get("/api/listings/host", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/api/reservations/host", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setListings(listingsRes.data);
        setReservations(reservationsRes.data);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteListing = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      await axios.delete(`/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setListings((prev) => prev.filter((listing) => listing._id !== id));
    } catch (err) {
      alert("Failed to delete listing.");
    }
  };

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="host-dashboard">
      <h2>Your Listings</h2>
      {listings.length === 0 ? (
        <p>You have no listings yet.</p>
      ) : (
        <div className="listings-list">
          {listings.map((listing) => (
            <div key={listing._id} className="listing-card">
              <img
                src={listing.imageUrls?.[0] || ""}
                alt={listing.title}
                className="listing-image"
              />
              <div className="listing-info">
                <h3>{listing.title}</h3>
                <p>{listing.location}</p>
                <p>R{listing.price} / night</p>
                <div className="listing-actions">
                  <button
                    onClick={() => navigate(`/admin/edit-listing/${listing._id}`)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteListing(listing._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2>Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations on your listings yet.</p>
      ) : (
        <div className="reservations-list">
          {reservations.map((res) => (
            <div key={res._id} className="reservation-card">
              <h3>{res.listing?.title || "Listing Deleted"}</h3>
              <p>Guest: {res.user?.username || "Unknown"}</p>
              <p>
                From <strong>{new Date(res.startDate).toLocaleDateString()}</strong> to{" "}
                <strong>{new Date(res.endDate).toLocaleDateString()}</strong>
              </p>
              <p>Guests: {res.guests}</p>
              <p>Total: R{res.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HostDashboard;


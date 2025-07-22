import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyReservations.css";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getToken = () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      return userInfo?.token || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchReservations = async () => {
      const token = getToken();
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get("/api/reservations/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservations(data);
      } catch (err) {
        setError("Failed to load reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleCancel = async (id) => {
    console.log("Attempting to cancel reservation with ID:", id);

    if (!window.confirm("Are you sure you want to cancel this reservation?")) {
      console.log("Cancellation aborted by user.");
      return;
    }

    const token = getToken();
    if (!token) {
      console.log("No auth token found. User not authenticated.");
      alert("User not authenticated");
      return;
    }

    try {
      console.log("Sending DELETE request to /api/reservations/" + id);
      await axios.delete(`/api/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Reservation cancelled successfully, updating state.");
      setReservations((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Failed to cancel reservation:", err);
      alert("Failed to cancel reservation.");
    }
  };

  if (loading) return <p>Loading reservations...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!reservations.length) return <p>You have no reservations yet.</p>;

  return (
    <div className="my-reservations">
      <h2>My Reservations</h2>
      {reservations.map((res) => {
        const listing = res.listing;
        const img =
          Array.isArray(listing.imageUrls) && listing.imageUrls.length > 0
            ? listing.imageUrls[0]
            : listing.image || listing.imageUrl || "";

        return (
          <div key={res._id} className="reservation-card">
            {img && <img src={img} alt="Listing" />}
            <div className="info">
              <h3>{listing?.title || "Untitled Listing"}</h3>
              <p>📍 {listing?.location || "Unknown location"}</p>
              <p>
                From <strong>{new Date(res.startDate).toLocaleDateString()}</strong> to{" "}
                <strong>{new Date(res.endDate).toLocaleDateString()}</strong>
              </p>
              <p>Guests: {res.guests}</p>
              <p>Total: R{res.totalPrice}</p>
              <button className="cancel-btn" onClick={() => handleCancel(res._id)}>
                Cancel Reservation
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyReservations;



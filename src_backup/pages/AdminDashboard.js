import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "host") {
      navigate("/login");
    } else {
      fetchListings();
    }
  }, [user]);

  const fetchListings = async () => {
    try {
      const res = await axios.get(`/api/listings?owner=${user._id}`);
      setListings(res.data);
    } catch (err) {
      console.error("Failed to fetch listings:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      await axios.delete(`/api/listings/${id}`);
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Your Listings</h2>
        <button onClick={() => navigate("/admin/add-listing")}>+ Add Listing</button>
      </div>

      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <div className="listings-grid">
          {listings.map((listing) => (
            <div className="listing-card" key={listing._id}>
              <img src={listing.imageUrls?.[0]} alt={listing.title} />
              <h3>{listing.title}</h3>
              <p>{listing.location}</p>
              <div className="listing-actions">
                <button onClick={() => navigate(`/admin/edit-listing/${listing._id}`)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(listing._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

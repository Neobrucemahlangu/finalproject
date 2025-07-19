import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGlobe, FaUserCircle, FaSearch } from "react-icons/fa"; // ✅ added FaSearch
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Header.css";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [locations, setLocations] = useState([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const locationDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("/api/listings/locations");
        setLocations(res.data);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target)
      ) {
        setShowLocationDropdown(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = () => navigate("/login");

  const handleLogout = () => {
    logout();
    setShowProfileDropdown(false);
    navigate("/");
  };

  const handleHostClick = () => {
    if (user) {
      navigate("/admin/dashboard");
    } else {
      navigate("/login");
    }
  };

  const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : "";

  const handleSearch = async () => {
    const loc = location.trim().toLowerCase();
    if (!loc) return;

    if (loc === "all locations") {
      navigate(`/`);
      return;
    }

    try {
      const res = await axios.get(`/api/listings/search?location=${loc}`);
      if (res.data.type === "listing") {
        navigate(`/listings/${res.data.listing._id}`);
      } else {
        navigate(
          `/location/${loc}?checkIn=${formatDate(checkIn)}&checkOut=${formatDate(
            checkOut
          )}&guests=${guests}`
        );
      }
    } catch (err) {
      console.error("Search failed:", err);
      alert("Something went wrong during search.");
    }
  };

  const handleSelectLocation = (loc) => {
    setLocation(loc);
    setShowLocationDropdown(false);
  };

  return (
    <header className="header">
      <div className="header-left" onClick={() => navigate("/")}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_Bélo.svg/512px-Airbnb_Logo_Bélo.svg.png"
          alt="Airbnb"
          className="logo"
        />
      </div>

      <div className="header-center" ref={locationDropdownRef}>
        <div className="search-bar">
          <div className="search-field location-field">
            <label>Location</label>
            <input
              type="text"
              placeholder="Select a location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setShowLocationDropdown(true);
              }}
              onFocus={() => setShowLocationDropdown(true)}
              autoComplete="off"
            />
            {showLocationDropdown && locations.length > 0 && (
              <ul className="location-dropdown">
                <li
                  key="all"
                  onClick={() => handleSelectLocation("all locations")}
                  className="dropdown-item"
                >
                  All Locations
                </li>
                {locations
                  .filter((loc) =>
                    loc.toLowerCase().includes(location.toLowerCase())
                  )
                  .map((loc) => (
                    <li
                      key={loc}
                      onClick={() => handleSelectLocation(loc)}
                      className="dropdown-item"
                    >
                      {loc}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div className="search-field">
            <label>Check-in</label>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              placeholderText="Select date"
              className="date-picker-input"
            />
          </div>

          <div className="search-field">
            <label>Check-out</label>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              placeholderText="Select date"
              className="date-picker-input"
            />
          </div>

          <div className="search-field">
            <label>Guests</label>
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>

          <button className="search-button" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="header-right">
        <span className="host-link" onClick={handleHostClick}>
          Host your home
        </span>
        <FaGlobe className="icon" />
        <div
          className="profile-dropdown"
          ref={profileDropdownRef}
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        >
          <FaUserCircle className="icon profile-icon" />
          {showProfileDropdown && (
            <div className="dropdown-content">
              {user ? (
                <>
                  <span
                    onClick={() => {
                      navigate("/my-reservations");
                      setShowProfileDropdown(false);
                    }}
                  >
                    Reservations
                  </span>
                  <span onClick={handleLogout}>Log out</span>
                </>
              ) : (
                <span onClick={handleLogin}>Login</span>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;








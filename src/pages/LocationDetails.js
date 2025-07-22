import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./LocationDetails.css";

const LocationDetails = () => {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await axios.get(`/api/listings/${id}`);
        setListing(data);
      } catch (err) {
        setError("Failed to load listing");
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  const handleReserve = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    const token = storedUser?.token;

    if (!token) {
      alert("You must be logged in to make a reservation.");
      return;
    }

    const days = Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
    );

    if (days <= 0) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    const totalPrice = days * listing.price;

    try {
      await axios.post(
        "/api/reservations",
        {
          listing: listing._id || listing.id, 
          guests,
          startDate: checkIn,
          endDate: checkOut,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Reservation successful!");

      
      setCheckIn("");
      setCheckOut("");
      setGuests(1);

     

    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Reservation failed. Make sure you're logged in.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!listing) return <p>Listing not found</p>;

  const totalPrice =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
        ) * listing.price
      : listing.price;

  const images =
    Array.isArray(listing.imageUrls) && listing.imageUrls.length > 0
      ? listing.imageUrls
      : listing.imageUrl
      ? [listing.imageUrl]
      : listing.image
      ? [listing.image]
      : [];

  return (
    <div className="details-page">
      <div className="main-content">
        <h2>
          {listing.type} in {listing.location}
        </h2>
        <h1>{listing.title}</h1>
        <p>
          ⭐ {listing.rating} · {listing.reviews} reviews · {listing.location}
        </p>

      
        <div className="gallery-grid">
          <div className="main-image">
            {images[0] ? <img src={images[0]} alt="Main" /> : <p>No image</p>}
          </div>
          <div className="side-images">
            {images.slice(1, 5).map((img, i) => (
              <div key={i} className="side-img-wrapper">
                <img src={img} alt={`Side ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

       
        <div className="inline-stats">
          <span>👤 {listing.guests} guests</span>
          <span>🛏️ {listing.bedrooms} bedrooms</span>
          <span>🛁 {listing.bathrooms} bathrooms</span>
        </div>

        
        <div className="amenities-inline">
          {listing.amenities.map((item, i) => (
            <span key={i} className="grey-emoji" data-emoji="✨">
              {item}
            </span>
          ))}
        </div>

       
        <h3>What this place offers</h3>
        <div className="extras">
          <span className="emoji-garden">Garden view</span>
          <span className="emoji-washing-machine">Washing machine</span>
          <span className="emoji-refrigerator">Refrigerator</span>
          <span className="emoji-pets">Pets allowed</span>
          <span className="emoji-camera">Security camera</span>
          <span className="emoji-wifi">WiFi</span>
          <span className="emoji-kitchen">Kitchen</span>
          <span className="emoji-dryer">Dryer</span>
          <span className="emoji-bicycles">Bicycles</span>
          <button className="view-all-btn">View all 37 amenities</button>
        </div>

        <p className="description">{listing.description}</p>

        
        <div className="ratings">
          <h3>Ratings</h3>
          {[
            "Cleanliness",
            "Communication",
            "Check-in",
            "Accuracy",
            "Location",
            "Value",
          ].map((item, i) => (
            <div className="rating-bar" key={i}>
              <span>{item}</span>
              <div className="bar">
                <div className="fill" style={{ width: `${90 - i * 5}%` }}></div>
              </div>
            </div>
          ))}
        </div>

       
        <div className="reviews">
          <h3>Reviews</h3>
          {[1, 2].map((id) => (
            <div className="review" key={id}>
              <img
                src={`https://randomuser.me/api/portraits/men/${id + 10}.jpg`}
                alt="User"
              />
              <p>This place was amazing! Definitely coming back again.</p>
            </div>
          ))}
        </div>

        
        <div className="host">
          <img
            src="https://randomuser.me/api/portraits/men/18.jpg"
            alt="Neo"
          />
          <div>
            <h3>
              Hosted by Neo <span className="badge">Superhost</span>
            </h3>
            <p>
              Superhosts are experienced, highly rated hosts who are committed
              to providing great stays.
            </p>
            <p>Response rate: 100% · Response time: within 1 hour</p>
            <button className="contact-host">Contact host</button>
          </div>
        </div>

        }
        <div className="bottom-info">
          <div>
            <h4>House rules</h4>
            <p>Check-in after 4:00 PM</p>
            <p>Checkout: 10:00 AM</p>
            <p>Self check-in with lockbox</p>
            <p>No parties or events</p>
          </div>
          <div>
            <h4>Health & safety</h4>
            <p>COVID-19 safety practices</p>
            <p>Smoke alarm installed</p>
            <p>Carbon monoxide alarm installed</p>
          </div>
          <div>
            <h4>Cancellation policy</h4>
            <p>Free cancellation for 48 hours</p>
            <p>50% refund before 7 days of check-in</p>
          </div>
        </div>
      </div>

      
      <div className="sticky-box-wrapper">
        <div className="cost-box">
          <h3>R{listing.price} / night</h3>
          <div className="reservation-form">
            <label>
              Check-in:
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </label>
            <label>
              Check-out:
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </label>
            <label>
              Guests:
              <input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              />
            </label>
            <p>Total: R{totalPrice}</p>
            <button onClick={handleReserve}>Reserve</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;







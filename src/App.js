import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LocationDetails from "./pages/LocationDetails";
import FilteredListings from "./pages/FilteredListings";
import MyReservations from "./pages/MyReservations";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer"; 
import AdminDashboard from "./pages/AdminDashboard"; 
import EditListing from "./pages/EditListing"; 

import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="app-layout">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings/:id" element={<LocationDetails />} />
            <Route path="/location/:city" element={<FilteredListings />} />
            <Route path="/my-reservations" element={<MyReservations />} />

          
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-listing" element={<p>Add Listing (Coming Soon)</p>} />
            <Route path="/admin/edit-listing/:id" element={<EditListing />} /> {/* updated route */}

           
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<p>Page not found</p>} />
          </Routes>

          <Footer />  {/*Footer to appear on all pages*/}
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;










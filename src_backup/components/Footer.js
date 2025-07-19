import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div>
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>AirCover</li>
            <li>Cancellation options</li>
            <li>Safety information</li>
          </ul>
        </div>
        <div>
          <h4>Hosting</h4>
          <ul>
            <li>Airbnb your home</li>
            <li>Hosting resources</li>
            <li>Community forum</li>
            <li>Hosting responsibly</li>
          </ul>
        </div>
        <div>
          <h4>Airbnb</h4>
          <ul>
            <li>Newsroom</li>
            <li>Careers</li>
            <li>Investors</li>
            <li>Airbnb Luxe</li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li>Privacy</li>
            <li>Terms</li>
            <li>Sitemap</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Airbnb clone</p>
        <div className="footer-icons">
          <span>🌍 English (ZA)</span>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;

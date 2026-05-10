import React from "react";
import "../styles/Components/Footer.css";

import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2 className="footer-logo-text">ShiftX</h2>
          <p className="footer-description">
            Connecting local talent with businesses for urgent and part-time shifts instantly.
          </p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebook size={20} /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
            <a href="#" aria-label="Twitter"><FaTwitter size={20} /></a>
            <a href="#" aria-label="Instagram"><FaInstagram size={20} /></a>
            <a href="#" aria-label="YouTube"><FaYoutube size={20} /></a>
          </div>
        </div>

        <div className="footer-links-group">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/search-jobs">Search Jobs</a></li>
            <li><a href="/how-it-works">How It Works</a></li>
            <li><a href="/about-us">About Us</a></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h3>For Users</h3>
          <ul>
            <li><a href="/login?role=worker">Worker Login</a></li>
            <li><a href="/login?role=employer">Employer Login</a></li>
            <li><a href="/signup-worker">Join as Worker</a></li>
            <li><a href="/signup-employer">Hire Talent</a></li>
          </ul>
        </div>

        <div className="app-download">
          <h3>Get the App</h3>
          <p>Real-time updates on the go</p>
          <div className="download-badges">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play Store"
              className="playstore-badge"
            />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          <p>© {new Date().getFullYear()} ShiftX. All rights reserved.</p>
        </div>
        <div className="legal-links">
          <a href="#">Privacy Policy</a>
          <span className="separator">•</span>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MainPage/Aboutus.css";
import { Target, Users, Zap, Shield, ArrowRight } from "lucide-react";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="badge">Our Story</div>
          <h1>About ShiftX</h1>
          <p className="subtitle">
            We are revolutionizing the way local talent connects with businesses for urgent and part-time shifts. Our mission is to make work flexible, accessible, and fast for everyone.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section">
        <div className="mission-container">
          <div className="mission-card">
            <div className="icon-wrapper">
              <Target size={32} />
            </div>
            <h2>Our Mission</h2>
            <p>
              To empower workers with instant earning opportunities and provide businesses with a reliable, on-demand workforce to eliminate staffing shortages.
            </p>
          </div>
          <div className="mission-card">
            <div className="icon-wrapper">
              <Zap size={32} />
            </div>
            <h2>Our Vision</h2>
            <p>
              A world where finding a shift or filling a vacancy takes minutes, not days. We envision a seamless, localized gig economy built on trust and efficiency.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="core-values-section">
        <div className="section-header">
          <h2>Our Core Values</h2>
          <p>The principles that guide everything we build at ShiftX.</p>
        </div>
        
        <div className="values-grid">
          <div className="value-card">
            <Zap size={40} className="value-icon" />
            <h3>Speed & Agility</h3>
            <p>We understand that in the modern workforce, time is money. We build tools that make hiring and getting hired incredibly fast.</p>
          </div>
          
          <div className="value-card">
            <Users size={40} className="value-icon" />
            <h3>Community First</h3>
            <p>We focus on local connections, helping local businesses thrive by connecting them with the talent right in their neighborhood.</p>
          </div>
          
          <div className="value-card">
            <Shield size={40} className="value-icon" />
            <h3>Trust & Transparency</h3>
            <p>From verified profiles to transparent hourly rates, we ensure both workers and employers know exactly what to expect.</p>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="about-cta">
        <div className="about-cta-card">
          <h2>Be Part of the Future of Work</h2>
          <p>Whether you're looking to earn extra income or need reliable staff, ShiftX is here for you.</p>
          <div className="cta-buttons">
            <button onClick={() => navigate("/signup-worker")} className="btn-primary">
              Join as a Worker <ArrowRight size={18} />
            </button>
            <button onClick={() => navigate("/signup-employer")} className="btn-secondary">
              Hire Talent <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

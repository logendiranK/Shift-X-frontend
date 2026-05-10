import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChefHat, Truck, Zap, Brush, Wrench, Car, Briefcase, Flame } from 'lucide-react';
import "../styles/MainPage/Home.css";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const navigate = useNavigate();
  const [urgentJobs, setUrgentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUrgentJobs = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/urgentjobs`);
        const urgentJobsData = response.data
          .filter(job => job.jobType === "Urgent")
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .slice(0, 4); 
        setUrgentJobs(urgentJobsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch urgent jobs");
        setLoading(false);
      }
    };

    fetchUrgentJobs();
  }, []);

  const cards = [
    {
      id: 1,
      title: "Urgent Shifts Today",
      image: "https://cdn-icons-png.flaticon.com/512/2331/2331970.png",
      link: "/urgent-jobs",
    },
    {
      id: 2,
      title: "Part-Time Jobs",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      link: "/part-time-jobs",
    },
  ];

  const getJobEmoji = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("cook") || titleLower.includes("chef")) return <ChefHat size={28} color="#2c3e50" />;
    if (titleLower.includes("delivery")) return <Truck size={28} color="#2c3e50" />;
    if (titleLower.includes("electrician")) return <Zap size={28} color="#2c3e50" />;
    if (titleLower.includes("cleaner") || titleLower.includes("cleaning")) return <Brush size={28} color="#2c3e50" />;
    if (titleLower.includes("mechanic")) return <Wrench size={28} color="#2c3e50" />;
    if (titleLower.includes("driver")) return <Car size={28} color="#2c3e50" />;
    return <Briefcase size={28} color="#2c3e50" />;
  };

  return (
    <div className="home-container">

      <section className="hero-section">
        <h1 className="hero-title">Find Work Instantly, Hire in Minutes!</h1>
        <p className="hero-subtitle">
          Connecting businesses with part-time workers for urgent shifts.
        </p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search jobs (e.g., Delivery, Cook, Helper)"
          />
          <button onClick={() => navigate('/search-jobs')}>Find Jobs</button>
        </div>

        <div className="actions">
          <button className="worker-btn" onClick={() => navigate('/search-jobs')}>Find Jobs Now</button>
        </div>
      </section>

      <div className="home">
        <h1 className="home-heading">Trending on ShiftX</h1>
        <div className="card-container">
          {cards.map((card, index) => (
            <div key={card.id} className="job-card">
              <div className="card-rank">Trending at #{index + 1}</div>
              <img src={card.image} alt={card.title} className="card-image" />
              <h2 className="card-title">{card.title}</h2>
              <Link to={card.link} className="view-all-link">
                View all &gt;
              </Link>
            </div>
          ))}
        </div>
      </div>

      <section className="urgent-jobs-section">
        <h2 className="section-title"><Flame color="#e74c3c" size={28} style={{ verticalAlign: 'middle', marginRight: '8px' }} />Workers Needed Urgently</h2>
        {loading ? (
          <div className="loading">Loading urgent jobs...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="urgent-jobs-grid">
            {urgentJobs.map((job) => (
              <div key={job._id} className="unified-job-card">
                <h2>{getJobEmoji(job.title)}</h2>
                
                <div className="unified-job-details">
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Salary:</strong> ₹{job.salary}/hour</p>
                  <p><strong>Phone:</strong> {job.contactPhone || 'N/A'}</p>
                </div>

                <div className="unified-job-badges">
                  {job.status && (
                    <span className={`badge ${job.status.toLowerCase() === 'open' ? 'badge-open' : 'badge-closed'}`}>
                      {job.status}
                    </span>
                  )}
                  <span className="badge badge-urgent">URGENT</span>
                </div>

                <Link className="unified-view-btn" to={`/urgent-time-jobs/${job._id}`}>
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="view-all-container">
        <Link to="/urgent-jobs" className="view-all-button">
          View All Urgent Jobs
        </Link>
      </div>

      <section className="download-section">
        <h2>Download the ShiftX App</h2>
        <p>Get notified about new shifts anytime, anywhere.</p>
        <button>Google Play</button>
        <button>App Store</button>
      </section>
    </div>
  );
};

export default Home;

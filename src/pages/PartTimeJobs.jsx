import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChefHat, Truck, Zap, Brush, Wrench, Car, Briefcase, Search, MapPin, X } from 'lucide-react';
import "../styles/Parttime/PartTimeJobs.css";

const API_URL = "https://shift-x-backend.onrender.com";

const PartTimeJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/part-time-jobs`
      );
      setJobs(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching jobs. Please try again later.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

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

  const filteredJobs = jobs.filter(
    (job) => {
      const matchKeyword = searchTerm === "" || 
        (job.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (job.company?.toLowerCase() || "").includes(searchTerm.toLowerCase());
      
      const matchLocation = searchLocation === "" ||
        (job.location?.toLowerCase() || "").includes(searchLocation.toLowerCase());
        
      return matchKeyword && matchLocation;
    }
  );

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "salary-high":
        return b.salary - a.salary;
      case "salary-low":
        return a.salary - b.salary;
      default:
        return 0;
    }
  });

  return (
    <div className="part-container">
      <div className="jobs-header">
        <h1>Part-Time Jobs</h1>
      </div>
      <div className="advanced-search-container">
        <div className="search-input-group">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Job title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="adv-search-input"
          />
          {searchTerm && <X className="clear-icon" size={16} onClick={() => setSearchTerm('')} />}
        </div>
        
        <div className="search-input-group">
          <MapPin className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="adv-search-input"
          />
          {searchLocation && <X className="clear-icon" size={16} onClick={() => setSearchLocation('')} />}
        </div>

        <div className="search-select-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="adv-search-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="salary-high">Highest Salary</option>
            <option value="salary-low">Lowest Salary</option>
          </select>
        </div>
      </div>
      {jobs.length === 0 ? (
        <div className="no-jobs">
          No part-time jobs available at the moment.
        </div>
      ) : (
        <div className="job-grid">
          {sortedJobs.map((job) => (
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
                <span className="badge badge-parttime">PART-TIME</span>
              </div>

              <Link className="unified-view-btn" to={`/part-time-jobs/${job._id}`}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default PartTimeJobs;

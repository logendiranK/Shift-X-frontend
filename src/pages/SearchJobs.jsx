import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/SearchJobs.css';
import { Link } from 'react-router-dom';
import { ChefHat, Truck, Zap, Brush, Wrench, Car, Briefcase, Search, MapPin, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;
const SearchJobs = () => {
  const [urgentJobs, setUrgentJobs] = useState([]);
  const [partTimeJobs, setPartTimeJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Advanced search states
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    setLoading(true);
    try {
      const [urgentRes, partTimeRes] = await Promise.all([
        axios.get(`${API_URL}/api/urgentjobs`),
        axios.get(`${API_URL}/api/part-time-jobs`),
      ]);
      setUrgentJobs(urgentRes.data);
      setPartTimeJobs(partTimeRes.data);
      setLoading(false);
    } catch {
      setError('Error fetching jobs. Please try again later.');
      setLoading(false);
    }
  };
  
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

  let jobsToShow = [...urgentJobs, ...partTimeJobs];

  // Apply Job Type Filter
  if (jobTypeFilter === 'Urgent') {
    jobsToShow = urgentJobs;
  } else if (jobTypeFilter === 'Part-Time') {
    jobsToShow = partTimeJobs;
  }

  // Apply Keyword Search Filter
  if (searchTerm.trim() !== '') {
    jobsToShow = jobsToShow.filter(
      (job) =>
        (job.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (job.company?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
  }

  // Apply Location Filter
  if (searchLocation.trim() !== '') {
    jobsToShow = jobsToShow.filter(
      (job) => (job.location?.toLowerCase() || '').includes(searchLocation.toLowerCase())
    );
  }

  // Apply Sorting
  jobsToShow.sort((a, b) => {
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
    <div className="search-job-container">
      <div className="search-job-header">
        <h1>Search Jobs</h1>
        <div className="advanced-search-container">
          <div className="search-input-group">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Job title or company..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
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
              onChange={e => setSearchLocation(e.target.value)}
              className="adv-search-input"
            />
            {searchLocation && <X className="clear-icon" size={16} onClick={() => setSearchLocation('')} />}
          </div>

          <div className="search-select-group">
            <select
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value)}
              className="adv-search-select"
            >
              <option value="All">All Types</option>
              <option value="Urgent">Urgent</option>
              <option value="Part-Time">Part-Time</option>
            </select>
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
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : jobsToShow.length === 0 ? (
        <div className="no-jobs">No jobs found.</div>
      ) : (
        <div className="search-job-grid">
          {jobsToShow.map((job) => (
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
                <span className={`badge ${job.jobType === 'Urgent' ? 'badge-urgent' : 'badge-parttime'}`}>
                  {job.jobType === 'Urgent' ? 'URGENT' : 'PART-TIME'}
                </span>
              </div>

              <Link
                className="unified-view-btn"
                to={job.jobType?.toLowerCase() === 'urgent'
                  ? `/urgent-time-jobs/${job._id}`
                  : `/part-time-jobs/${job._id}`}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchJobs;

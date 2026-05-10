import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ChefHat, Truck, Zap, Brush, Wrench, Car, Briefcase, Search, MapPin, X, Flame } from 'lucide-react';
import '../styles/Urgent/UrgentJobs.css';

const UrgentJobs = () => {
    const [urgentJobs, setUrgentJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');   
    const [searchLocation, setSearchLocation] = useState("");
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        const fetchUrgentJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/urgentjobs');
                const urgentJobsData = response.data.filter(job => job.jobType === 'Urgent');
                setUrgentJobs(urgentJobsData);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch urgent jobs');
                setLoading(false);
            }
        };

        fetchUrgentJobs();
    }, []);

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


    const filteredJobs = urgentJobs.filter(job => {
        const matchKeyword = searchTerm === "" || 
            (job.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (job.company?.toLowerCase() || "").includes(searchTerm.toLowerCase());
        
        const matchLocation = searchLocation === "" ||
            (job.location?.toLowerCase() || "").includes(searchLocation.toLowerCase());
            
        return matchKeyword && matchLocation;
    });

    const sortedJobs = [...filteredJobs].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'oldest':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'salary-high':
                return b.salary - a.salary;
            case 'salary-low':
                return a.salary - b.salary;
            default:
                return 0;
        }
    });

    return (
        <div className="urgent-jobs-container">
            <div className="urgent-jobs-header">
                <h1><Flame color="#e74c3c" size={36} style={{ verticalAlign: 'middle', marginRight: '8px' }} />Urgent Jobs Available</h1>
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
            </div>

            {loading ? (
                <div className="loading">Loading urgent jobs...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="urgent-jobs-grid">
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
                                <span className="badge badge-urgent">URGENT</span>
                            </div>

                            <Link className="unified-view-btn" to={`/urgent-time-jobs/${job._id}`}>
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            {!loading && !error && sortedJobs.length === 0 && (
                <div className="no-jobs">
                    <p>No urgent jobs found matching your search criteria.</p>
                </div>
            )}
        </div>
    );
};

export default UrgentJobs; 

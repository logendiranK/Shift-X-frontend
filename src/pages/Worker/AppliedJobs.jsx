import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Calendar, Clock, CheckCircle, XCircle, AlertCircle, ArrowLeft, IndianRupee, X } from 'lucide-react';
import '../../styles/Worker/AppliedJobs.css';

const AppliedJobs = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const workerId = localStorage.getItem('workerId');
    if (!workerId) {
      navigate('/login?role=worker');
      return;
    }
    fetchApplications(workerId);
  }, [navigate]);

  const fetchApplications = async (workerId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/applications/worker/${workerId}`);
      setApplications(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to load your applied jobs.');
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle size={18} />;
      case 'Rejected':
        return <XCircle size={18} />;
      case 'Pending':
      default:
        return <AlertCircle size={18} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Accepted': return 'status-accepted';
      case 'Rejected': return 'status-rejected';
      case 'Pending':
      default: return 'status-pending';
    }
  };

  if (loading) {
    return (
      <div className="applied-jobs-container loading-state">
        <div className="loader"></div>
        <p>Loading your applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="applied-jobs-container error-state">
        <div className="error-card">
          <X size={48} className="error-icon" />
          <h2>Oops!</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="applied-jobs-container">
      <div className="page-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft size={20} /> Back
        </button>
        <h1>My Applied Jobs</h1>
        <p>Track the status of your job applications</p>
      </div>

      <div className="status-filters">
        {['All', 'Pending', 'Accepted', 'Rejected'].map((statusOption) => (
          <button
            key={statusOption}
            className={`filter-btn ${filter === statusOption ? 'active' : ''}`}
            onClick={() => setFilter(statusOption)}
          >
            {statusOption}
          </button>
        ))}
      </div>

      {applications.length === 0 ? (
        <div className="empty-state-card">
          <Briefcase size={48} className="empty-icon" />
          <h2>No Applications Yet</h2>
          <p>You haven't applied to any jobs. Start exploring opportunities!</p>
          <button onClick={() => navigate('/search-jobs')} className="browse-jobs-btn">
            Browse Jobs
          </button>
        </div>
      ) : (
        <>
          {applications.filter(app => filter === 'All' || app.status === filter).length === 0 ? (
            <div className="empty-state-card">
              <Briefcase size={48} className="empty-icon" />
              <h2>No {filter !== 'All' ? filter : ''} Applications Found</h2>
              <p>You don't have any applications with this status.</p>
            </div>
          ) : (
            <div className="applications-list">
              {applications.filter(app => filter === 'All' || app.status === filter).map((app) => (
                <div key={app._id} className="application-card">
                  <div className="app-card-header">
                    <div className="job-title-section">
                      <h2>{app.job?.title || 'Unknown Job Title'}</h2>
                      <span className={`job-type-badge type-${app.jobType.toLowerCase()}`}>
                        {app.jobType}
                      </span>
                    </div>
                    <div className={`status-badge ${getStatusClass(app.status)}`}>
                      {getStatusIcon(app.status)}
                      <span>{app.status}</span>
                    </div>
                  </div>

                  <div className="app-card-body">
                    {app.job?.company && (
                      <div className="job-detail">
                        <Briefcase size={16} />
                        <span>{app.job.company}</span>
                      </div>
                    )}
                    {app.job?.location && (
                      <div className="job-detail">
                        <MapPin size={16} />
                        <span>{app.job.location}</span>
                      </div>
                    )}
                    {app.job?.salary && (
                      <div className="job-detail">
                        <IndianRupee size={16} />
                        <span>{app.job.salary}</span>
                      </div>
                    )}
                    {app.job?.shiftDate && (
                      <div className="job-detail">
                        <Calendar size={16} />
                        <span>{new Date(app.job.shiftDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="app-card-footer">
                    <div className="applied-date">
                      <Clock size={14} /> Applied on {new Date(app.appliedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AppliedJobs;

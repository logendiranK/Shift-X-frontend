import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import '../../styles/Emploer/ViewApplications.css';

const API_URL = import.meta.env.VITE_API_URL;

const ViewApplications = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/applications/job/${id}`);
        setApplications(res.data);
      } catch (err) {
        setError('Failed to fetch applications.');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [id]);

  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      await axios.put(`${API_URL}/api/applications/${appId}/status`, { status: newStatus });
      setApplications(applications.map(app => 
        app._id === appId ? { ...app, status: newStatus } : app
      ));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) return <div className="loading">Loading applications...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="view-applications-container">
      <button className="back-btn" onClick={() => navigate('/manage-jobs')}><ArrowLeft color="#2c3e50" size={16} style={{ verticalAlign: 'text-bottom', marginRight: '4px' }} /> Back to Jobs</button>
      <h2>Job Applications</h2>
      {applications.length === 0 ? (
        <p>No applications received yet.</p>
      ) : (
        <div className="applications-grid">
          {applications.map(app => (
            <div key={app._id} className="application-card">
              <div className="applicant-info">
                <h3>{app.workerId.name}</h3>
                <p><strong>Email:</strong> {app.workerId.email}</p>
                <p><strong>Phone:</strong> {app.workerId.phone}</p>
                <p><strong>Location:</strong> {app.workerId.location}</p>
                <p><strong>Applied On:</strong> {new Date(app.appliedAt).toLocaleDateString()}</p>
                <div className={`status-badge ${app.status.toLowerCase()}`}>Status: {app.status}</div>
              </div>
              <div className="action-buttons">
                {app.status === 'Pending' && (
                  <>
                    <button className="accept-btn" onClick={() => handleStatusUpdate(app._id, 'Accepted')}>Accept</button>
                    <button className="reject-btn" onClick={() => handleStatusUpdate(app._id, 'Rejected')}>Reject</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewApplications;

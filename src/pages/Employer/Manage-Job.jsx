import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Emploer/ManageJobs.css'
const ManageJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const employerId = localStorage.getItem('employerId');

  useEffect(() => {
    if (!employerId) {
      setError('You must be logged in as an employer.');
      setLoading(false);
      return;
    }

    const fetchJobs = async () => {
      try {
        const [partTimeRes, urgentRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/part-time-jobs/employer/${employerId}`),
          axios.get(`http://localhost:5000/api/urgentjobs/employer/${employerId}`)
        ]);

        const partTimeJobs = partTimeRes.data.map(job => ({ ...job, displayType: 'Part-Time' }));
        const urgentJobs = urgentRes.data.map(job => ({ ...job, displayType: 'Urgent' }));

        const allJobs = [...partTimeJobs, ...urgentJobs].sort((a, b) => {
          const dateA = new Date(a.postedDate || a.createdAt);
          const dateB = new Date(b.postedDate || b.createdAt);
          return dateB - dateA;
        });

        setJobs(allJobs);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [employerId]);

  const handleClosePartTimeJob = async (jobId) => {
    try {
      await axios.put(`http://localhost:5000/api/part-time-jobs/${jobId}`, { status: 'Closed' });
      setJobs(jobs.map(job => job._id === jobId ? { ...job, status: 'Closed' } : job));
    } catch (err) {
      alert('Failed to close job');
    }
  };

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="manage-jobs-container">
      <h2>Your Posted Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="manage-jobs-table">
            <thead>
              <tr>
                <th>Posted Date & Time</th>
                <th>Job Role</th>
                <th>Job Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => {
                const dateObj = new Date(job.postedDate || job.createdAt);
                return (
                  <tr key={job._id}>
                    <td>
                      <div>{dateObj.toLocaleDateString()}</div>
                      <div className="time-text">{dateObj.toLocaleTimeString()}</div>
                    </td>
                    <td className="job-role-cell">
                      <strong>{job.title}</strong>
                      <div className="location-text">{job.location}</div>
                    </td>
                    <td>
                      <span className={`type-badge ${job.displayType.toLowerCase()}`}>
                        {job.displayType}
                      </span>
                      {job.status && (
                        <span className={`status-badge ${job.status.toLowerCase()}`} style={{marginLeft: '8px', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85em', fontWeight: 'bold', backgroundColor: job.status === 'Closed' ? '#e74c3c' : '#2ecc71', color: 'white'}}>
                          {job.status}
                        </span>
                      )}
                    </td>
                    <td className="action-buttons">
                      <button className="edit-btn" onClick={() => navigate(`/edit-job/${job.displayType.toLowerCase()}/${job._id}`)}>Edit</button>
                      <button className="view-btn" onClick={() => navigate(`/job-applications/${job._id}`)}>View Applications</button>
                      {job.displayType === 'Part-Time' && job.status !== 'Closed' && (
                        <button className="close-btn" onClick={() => handleClosePartTimeJob(job._id)} style={{backgroundColor: '#e74c3c', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '5px', fontWeight: '600'}}>Close Job</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageJob;

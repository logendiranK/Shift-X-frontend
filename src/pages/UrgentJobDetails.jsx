import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Flame, MapPin, Mail, Phone } from "lucide-react";
import "../styles/Parttime/PartTimeJobDetails.css";
import axios from "axios";

const API_URL = "https://shift-x-2.onrender.com";

const UrgentJobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/urgentjobs/${id}`);
        setJob(response.data);
      } catch {
        setError("Failed to fetch urgent job details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    const userRole = localStorage.getItem("userRole");
    const workerId = localStorage.getItem("workerId");
    
    if (!userRole || userRole !== 'worker') {
      window.alert("Please login as a worker to apply for this job.");
      navigate("/login?role=worker");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/applications`, {
        jobId: job._id,
        jobType: 'Urgent',
        workerId: workerId,
        employerId: job.employerId
      });
      window.alert('Application submitted successfully!');
    } catch (err) {
      window.alert(err.response?.data?.message || 'Failed to submit application. You may have already applied.');
    }
  };

  if (loading) return <div className="details-loading"><div className="spinner"></div></div>;
  if (error) return <div className="details-error">{error}</div>;
  if (!job) return <div className="details-error">Job not found.</div>;

  return (
    <div className="premium-details-wrapper">
      <div className="premium-header urgent-header">
        <div className="header-content">
          <span className="job-badge urgent"><Flame color="#fff" size={16} style={{ verticalAlign: 'text-bottom', marginRight: '4px' }} /> Urgent</span>
          <h1>{job.title}</h1>
          <div className="header-meta">
            <span><MapPin color="#e74c3c" size={16} style={{ verticalAlign: 'text-bottom', marginRight: '4px' }} /> {job.location}</span>
          </div>
        </div>
      </div>

      <div className="premium-body">
        <div className="main-content">
          <section className="detail-section">
            <h3>Job Description</h3>
            <p>{job.description || "No description provided."}</p>
          </section>

          <section className="detail-section">
            <h3>Requirements</h3>
            <ul className="requirements-list">
              {Array.isArray(job.requirements) ? (
                job.requirements.map((req, index) => <li key={index}>{req}</li>)
              ) : (
                <li>{job.requirements || "No specific requirements."}</li>
              )}
            </ul>
          </section>

          <section className="detail-section">
            <h3>Shift Details</h3>
            <ul className="requirements-list" style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li><strong>Amount:</strong> ₹{job.salary}/hour</li>
              <li><strong>Working Hours:</strong> {job.durationHours} hrs</li>
              <li><strong>Shift:</strong> {job.shiftStartTime} - {job.shiftEndTime}</li>
            </ul>
          </section>
        </div>

        <div className="sidebar">
          <div className="summary-card">
            <h3>Shift Schedule</h3>
            <ul>
              <li><strong>Date:</strong> {job.shiftDate ? new Date(job.shiftDate).toLocaleDateString() : 'N/A'}</li>
              <li><strong>Start:</strong> {job.shiftStartTime}</li>
              <li><strong>End:</strong> {job.shiftEndTime}</li>
              <li><strong>Status:</strong> <span className={`status ${job.status?.toLowerCase()}`}>{job.status}</span></li>
            </ul>
          </div>

          <div className="contact-card">
            <h3>Contact Info</h3>
            {job.contactEmail && <p><Mail color="#3498db" size={16} style={{ verticalAlign: 'text-bottom', marginRight: '8px' }} /> {job.contactEmail}</p>}
            {job.contactPhone && <p><Phone color="#2ecc71" size={16} style={{ verticalAlign: 'text-bottom', marginRight: '8px' }} /> {job.contactPhone}</p>}
          </div>

          <button className="premium-apply-btn urgent-apply" onClick={handleApply}>
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrgentJobDetails;

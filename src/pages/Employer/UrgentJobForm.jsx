import React, { useState } from "react";
import axios from "axios";
import { AlertTriangle, Rocket } from "lucide-react";
import "../../styles/Urgent/UrgentJobForm.css";

const API_URL = "https://shift-x-backend.onrender.com";

const UrgentJobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    jobType: "Urgent",
    requirements: "",
    contactEmail: "",
    contactPhone: "",
    durationHours: "",
    shiftDate: "",
    shiftStartTime: "",
    shiftEndTime: "",
    vacancies: 1,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const employerId = localStorage.getItem('employerId');
      if (!employerId) {
        setError("Please login as an employer to post jobs");
        return;
      }

      const jobData = {
        ...formData,
        employerId,
        salary: Number(formData.salary),
        durationHours: Number(formData.durationHours),
        vacancies: Number(formData.vacancies),
        requirements: formData.requirements.split(",").map((req) => req.trim()),
      };

      const response = await axios.post(
        `${API_URL}/api/urgentjobs`,
        jobData
      );
      setMessage("Urgent job posted successfully!");
      setFormData({
        title: "",
        description: "",
        location: "",
        salary: "",
        jobType: "Urgent",
        requirements: "",
        contactEmail: "",
        contactPhone: "",
        durationHours: "",
        shiftDate: "",
        shiftStartTime: "",
        shiftEndTime: "",
        vacancies: 1,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Server error while posting job");
    }
  };

  return (
    <div className="urgent-job-form-container">
      <h2 className="urgent-job-form-container-head"><AlertTriangle color="#e74c3c" size={28} style={{ verticalAlign: 'middle', marginRight: '8px' }} />Post an Urgent Job</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="urgent-job-form">
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Job Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="salary">Salary (₹ per hour)</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="durationHours">Working Duration (in hours)</label>
          <input
            type="number"
            name="durationHours"
            value={formData.durationHours}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shiftDate">Shift Date</label>
          <input
            type="date"
            name="shiftDate"
            value={formData.shiftDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shiftStartTime">Shift Start Time</label>
          <input
            type="time"
            name="shiftStartTime"
            value={formData.shiftStartTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shiftEndTime">Shift End Time</label>
          <input
            type="time"
            name="shiftEndTime"
            value={formData.shiftEndTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="requirements">Requirements (comma-separated)</label>
          <input
            type="text"
            name="requirements"
            placeholder="e.g., punctual, team player"
            value={formData.requirements}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactEmail">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactPhone">Contact Phone</label>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="vacancies">Number of Vacancies</label>
          <input
            type="number"
            name="vacancies"
            value={formData.vacancies}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <button type="submit" className="submit-button">
          <Rocket color="#ffffff" size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Post Urgent Job
        </button>
      </form>
    </div>
  );
};

export default UrgentJobForm;

import React, { useState } from "react";
import axios from "axios";
import { Clock, Send } from "lucide-react";
import "../../styles/Parttime/PartTimeJobForm.css";

const API_URL = "https://shift-x-backend.onrender.com";

const PartTimeJobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: "",
    shiftDate: "",
    salary: "",
    shiftType: "",
    contactEmail: "",
    jobType: "Part-time",
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
        employerId: employerId,
        salary: Number(formData.salary),
        vacancies: Number(formData.vacancies),
        requirements: formData.requirements.split(",").map((req) => req.trim()),
      };

      await axios.post(`${API_URL}/api/part-time-jobs`, jobData);
      setMessage("Part-time job posted successfully!");
      setFormData({
        title: "",
        company: "",
        location: "",
        description: "",
        requirements: "",
        shiftDate: "",
        salary: "",
        shiftType: "",
        contactEmail: "",
        contactPhone: "",
        jobType: "Part-time",
        vacancies: 1,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Server error while posting job");
    }
  };

  return (
    <div className="part-time-job-form-container">
      <h2><Clock color="#2c3e50" size={28} style={{ verticalAlign: 'middle', marginRight: '8px' }} />Post a Part-Time Job</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="part-time-job-form">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="requirements"
          placeholder="Requirements (comma separated)"
          value={formData.requirements}
          onChange={handleChange}
          required
        />
          <input
            type="date"
            name="shiftDate"
            value={formData.shiftDate}
            onChange={handleChange}
            required
          />
        <input
          type="number"
          name="salary"
          placeholder="Salary per Month (₹)"
          value={formData.salary}
          onChange={handleChange}
          required
        />
        <select
          name="shiftType"
          value={formData.shiftType}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Shift Type</option>
          <option value="Morning: 8 AM – 12 PM">Morning: 8 AM – 12 PM</option>
          <option value="Afternoon: 1 PM – 5 PM">Afternoon: 1 PM – 5 PM</option>
          <option value="Evening: 5 PM – 10 PM">Evening: 5 PM – 10 PM</option>
          <option value="Weekend shifts only">Weekend shifts only</option>
        </select>
        <input
          type="email"
          name="contactEmail"
          placeholder="Contact Email"
          value={formData.contactEmail}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="contactPhone"
          placeholder="Contact Phone"
          value={formData.contactPhone}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="vacancies"
          placeholder="Number of Vacancies"
          value={formData.vacancies}
          onChange={handleChange}
          required
          min="1"
        />
        <button type="submit"><Send color="#ffffff" size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Post Job</button>
      </form>
    </div>
  );
};

export default PartTimeJobForm;

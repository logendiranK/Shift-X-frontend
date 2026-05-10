import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../../styles/Worker/WorkerSignup.css";

const API_URL = "https://shift-x-backend.onrender.com";

const SignupWorker = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/auth/signup-worker`, formData);
      console.log('Signup success:', response.data);
      
      
      localStorage.setItem('workerId', response.data.worker._id);
      localStorage.setItem('userRole', 'worker');
      
      alert('Welcome to ShiftX');
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Something went wrong!');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Worker Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
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
        <button type="submit">Sign Up</button>
        <p style={{ textAlign: "center", marginTop: "15px", fontSize: "14px" }}>
          Already have an account? <Link to="/login?role=worker" style={{ color: "#4f46e5", textDecoration: "none", fontWeight: "600" }}>Login as Worker</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupWorker;

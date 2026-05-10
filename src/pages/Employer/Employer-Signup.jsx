import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../../styles/Emploer/EmployerSignup.css"; 

const API_URL = "https://shift-x-backend.onrender.com";

const SignupEmployer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => 
    {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/signup-employer`, formData);
      console.log('Signup success:', res.data);
      
      localStorage.setItem('employerId', res.data.employer._id);
      localStorage.setItem('userRole', 'employer');
      
      alert('Welcome to ShiftX');
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      alert(err.response?.data?.error || 'Something went wrong!');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Employer Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
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
        <button type="submit">Sign Up</button>
        <p style={{ textAlign: "center", marginTop: "15px", fontSize: "14px" }}>
          Already have an account? <Link to="/login?role=employer" style={{ color: "#4f46e5", textDecoration: "none", fontWeight: "600" }}>Login as Employer</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupEmployer;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import '../../styles/Emploer/EditJob.css';

const API_URL = "https://shift-x-2.onrender.com";

const EditJob = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const endpoint = type.toLowerCase() === 'urgent' 
          ? `${API_URL}/api/urgentjobs/${id}`
          : `${API_URL}/api/part-time-jobs/${id}`;
        
        const res = await axios.get(endpoint);
        const data = res.data;
        // Convert requirements array back to comma separated string if needed
        if (Array.isArray(data.requirements)) {
          data.requirements = data.requirements.join(', ');
        }
        setFormData(data);
      } catch (err) {
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [type, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = type.toLowerCase() === 'urgent' 
        ? `${API_URL}/api/urgentjobs/${id}`
        : `${API_URL}/api/part-time-jobs/${id}`;

      const payload = { ...formData };
      if (typeof payload.requirements === 'string') {
        payload.requirements = payload.requirements.split(',').map(req => req.trim());
      }
      
      await axios.put(endpoint, payload);
      alert('Job updated successfully!');
      navigate('/manage-jobs');
    } catch (err) {
      alert('Failed to update job');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="edit-job-container">
      <button className="back-btn" onClick={() => navigate('/manage-jobs')}><ArrowLeft color="#2c3e50" size={16} style={{ verticalAlign: 'text-bottom', marginRight: '4px' }} /> Back</button>
      <h2>Edit {type} Job</h2>
      <form onSubmit={handleSubmit} className="edit-job-form">
        <label>Job Title
          <input type="text" name="title" value={formData.title || ''} onChange={handleChange} required />
        </label>
        <label>Location
          <input type="text" name="location" value={formData.location || ''} onChange={handleChange} required />
        </label>
        <label>Description
          <textarea name="description" value={formData.description || ''} onChange={handleChange} required />
        </label>
        <label>Requirements (comma separated)
          <input type="text" name="requirements" value={formData.requirements || ''} onChange={handleChange} required />
        </label>
        <label>Salary
          <input type="number" name="salary" value={formData.salary || ''} onChange={handleChange} required />
        </label>
        <label>Vacancies
          <input type="number" name="vacancies" value={formData.vacancies || ''} onChange={handleChange} required min="1" />
        </label>
        
        {type.toLowerCase() === 'part-time' ? (
          <>
            <label>Shift Type
              <select name="shiftType" value={formData.shiftType || ''} onChange={handleChange} required>
                <option value="Morning: 8 AM – 12 PM">Morning: 8 AM – 12 PM</option>
                <option value="Afternoon: 1 PM – 5 PM">Afternoon: 1 PM – 5 PM</option>
                <option value="Evening: 5 PM – 10 PM">Evening: 5 PM – 10 PM</option>
                <option value="Weekend shifts only">Weekend shifts only</option>
              </select>
            </label>
            <label>Shift Date
              <input type="date" name="shiftDate" value={formData.shiftDate ? formData.shiftDate.substring(0, 10) : ''} onChange={handleChange} required />
            </label>
          </>
        ) : (
          <>
            <label>Duration (Hours)
              <input type="number" name="durationHours" value={formData.durationHours || ''} onChange={handleChange} required />
            </label>
            <label>Shift Date
              <input type="date" name="shiftDate" value={formData.shiftDate ? formData.shiftDate.substring(0, 10) : ''} onChange={handleChange} required />
            </label>
            <label>Shift Start Time
              <input type="time" name="shiftStartTime" value={formData.shiftStartTime || ''} onChange={handleChange} required />
            </label>
            <label>Shift End Time
              <input type="time" name="shiftEndTime" value={formData.shiftEndTime || ''} onChange={handleChange} required />
            </label>
          </>
        )}
        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditJob;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, 
  Briefcase, Clock, FileText, 
  UploadCloud, Edit2, Save, X, LogOut, 
  CheckCircle, Search, ClipboardList, BriefcaseBusiness, Award
} from 'lucide-react';
import '../../styles/Worker/WorkerProfile.css';

const WorkerProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [workerData, setWorkerData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    skills: '',
    experience: '',
    availability: '',
    bio: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    skills: '',
    experience: '',
    availability: '',
    bio: ''
  });

  const [aadhaarPhoto, setAadhaarPhoto] = useState(null);
  const [aadhaarPhotoUrl, setAadhaarPhotoUrl] = useState('');
  
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');

  useEffect(() => {
    const workerId = localStorage.getItem('workerId');
    if (!workerId) {
      navigate('/login?role=worker');
      return;
    }

    fetchWorkerProfile(workerId);
  }, [navigate]);

  const fetchWorkerProfile = async (workerId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/workers/${workerId}`);
      const worker = response.data;
      
      const parsedData = {
        name: worker.name || '',
        email: worker.email || '',
        phone: worker.phone || '',
        location: worker.location || '',
        skills: Array.isArray(worker.skills) ? worker.skills.join(', ') : worker.skills || '',
        experience: worker.experience || '',
        availability: worker.availability || '',
        bio: worker.bio || ''
      };

      setWorkerData(parsedData);
      setFormData(parsedData);
      setAadhaarPhotoUrl(worker.aadhaarPhotoUrl || '');
      setProfilePhotoUrl(worker.profilePhotoUrl || '');
      setLoading(false);
    } catch (err) {
      console.error('Error fetching worker profile:', err);
      setError('Failed to load profile data.');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(workerData);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      if (!aadhaarPhotoUrl && !aadhaarPhoto) {
        alert('Uploading Aadhaar card photo is compulsory.');
        return;
      }
      const workerId = localStorage.getItem('workerId');
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => form.append(key, value));
      if (aadhaarPhoto) {
        form.append('aadhaarPhoto', aadhaarPhoto);
      }
      if (profilePhoto) {
        form.append('profilePhoto', profilePhoto);
      }
      
      const response = await axios.put(
        `http://localhost:5000/api/workers/${workerId}`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      
      setWorkerData({ ...formData });
      setAadhaarPhoto(null);
      setAadhaarPhotoUrl(response.data.aadhaarPhotoUrl || '');
      setProfilePhoto(null);
      setProfilePhotoUrl(response.data.profilePhotoUrl || '');
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert(err.response?.data?.error || 'Failed to update profile');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="worker-profile-container loading-container">
        <div className="loader"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="worker-profile-container error-container">
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
    <div className="worker-profile-container">
      <div className="profile-header-card">
        <div className="profile-header-content">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              {profilePhotoUrl ? (
                <img src={profilePhotoUrl} alt="Profile" className="avatar-image" />
              ) : (
                <User size={64} className="avatar-icon" />
              )}
            </div>
            {isEditing && (
              <label htmlFor="profile-upload" className="profile-upload-btn">
                <UploadCloud size={16} />
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  className="hidden-input"
                  onChange={(e) => {
                    setProfilePhoto(e.target.files[0]);
                    if (e.target.files[0]) {
                      setProfilePhotoUrl(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
              </label>
            )}
          </div>
          <div className="profile-titles">
            <h1>{workerData.name || 'Worker Profile'}</h1>
            <p className="profile-subtitle">Manage your personal and professional details</p>
          </div>
        </div>
        <div className="profile-actions">
          {!isEditing ? (
            <button onClick={handleEdit} className="btn-primary edit-btn">
              <Edit2 size={18} /> Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button onClick={handleSave} className="btn-success save-btn">
                <Save size={18} /> Save
              </button>
              <button onClick={handleCancel} className="btn-secondary cancel-btn">
                <X size={18} /> Cancel
              </button>
            </div>
          )}
          <button onClick={handleLogout} className="btn-danger logout-btn">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div className="profile-grid-layout">
        <div className="profile-sidebar">
          <div className="profile-card personal-info-card">
            <div className="card-header">
              <h2><User size={20} /> Personal Info</h2>
            </div>
            <div className="card-body">
              <div className="info-item">
                <label><User size={16}/> Full Name</label>
                {isEditing ? (
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" />
                ) : (
                  <p>{workerData.name}</p>
                )}
              </div>
              <div className="info-item">
                <label><Mail size={16}/> Email Address</label>
                {isEditing ? (
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" />
                ) : (
                  <p>{workerData.email}</p>
                )}
              </div>
              <div className="info-item">
                <label><Phone size={16}/> Phone Number</label>
                {isEditing ? (
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter your phone number" />
                ) : (
                  <p>{workerData.phone}</p>
                )}
              </div>
              <div className="info-item">
                <label><MapPin size={16}/> Location</label>
                {isEditing ? (
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Enter your location" />
                ) : (
                  <p>{workerData.location}</p>
                )}
              </div>
            </div>
          </div>

          <div className="profile-card quick-actions-card">
            <div className="card-header">
              <h2><Search size={20} /> Quick Links</h2>
            </div>
            <div className="card-body action-links">
              <button onClick={() => navigate('/applied-jobs')} className="action-link">
                <ClipboardList size={18} /> View Applied Jobs
              </button>
              <button onClick={() => navigate('/urgent-jobs')} className="action-link">
                <BriefcaseBusiness size={18} /> View Urgent Jobs
              </button>
              <button onClick={() => navigate('/part-time-jobs')} className="action-link">
                <Clock size={18} /> View Part-Time Jobs
              </button>
              <button onClick={() => navigate('/search-jobs')} className="action-link action-link-primary">
                <Search size={18} /> Search New Jobs
              </button>
            </div>
          </div>
        </div>

        <div className="profile-main">
          <div className="profile-card professional-info-card">
            <div className="card-header">
              <h2><Briefcase size={20} /> Professional Details</h2>
            </div>
            <div className="card-body">
              <div className="info-item full-width">
                <label><Award size={16}/> Skills & Expertise</label>
                {isEditing ? (
                  <textarea name="skills" value={formData.skills} onChange={handleInputChange} placeholder="E.g., Cooking, Delivery, Cleaning (comma separated)" rows="2" />
                ) : (
                  <div className="skills-container">
                    {workerData.skills ? workerData.skills.split(',').map((skill, index) => (
                      <span key={index} className="skill-badge">{skill.trim()}</span>
                    )) : <p className="empty-state">No skills listed</p>}
                  </div>
                )}
              </div>

              <div className="info-item full-width">
                <label><Briefcase size={16}/> Work Experience</label>
                {isEditing ? (
                  <textarea name="experience" value={formData.experience} onChange={handleInputChange} placeholder="Describe your relevant work experience" rows="3" />
                ) : (
                  <p className={workerData.experience ? "" : "empty-state"}>{workerData.experience || 'No experience listed'}</p>
                )}
              </div>

              <div className="info-item full-width">
                <label><Clock size={16}/> Availability</label>
                {isEditing ? (
                  <textarea name="availability" value={formData.availability} onChange={handleInputChange} placeholder="E.g., Weekdays 9-5, Flexible weekends" rows="2" />
                ) : (
                  <p className={workerData.availability ? "" : "empty-state"}>{workerData.availability || 'No availability listed'}</p>
                )}
              </div>

              <div className="info-item full-width">
                <label><FileText size={16}/> About Me (Bio)</label>
                {isEditing ? (
                  <textarea name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Tell employers a bit about yourself" rows="4" />
                ) : (
                  <p className={workerData.bio ? "" : "empty-state"}>{workerData.bio || 'No bio available'}</p>
                )}
              </div>
            </div>
          </div>

          <div className="profile-card document-card">
            <div className="card-header">
              <h2><CheckCircle size={20} /> Identity Verification</h2>
            </div>
            <div className="card-body">
              <div className="aadhaar-section">
                <label>Aadhaar Card Photo</label>
                {isEditing ? (
                  <div className="upload-zone">
                    <input
                      type="file"
                      id="aadhaar-upload"
                      className="hidden-input"
                      onChange={e => {
                        setAadhaarPhoto(e.target.files[0]);
                        if (e.target.files[0]) {
                          setAadhaarPhotoUrl(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                    />
                    <label htmlFor="aadhaar-upload" className="upload-label">
                      <UploadCloud size={32} className="upload-icon" />
                      <span>Click to upload new Aadhaar document</span>
                      <small>Any format supported (PDF, JPG, PNG, etc.)</small>
                    </label>
                  </div>
                ) : null}

                <div className="aadhaar-display">
                  {aadhaarPhotoUrl ? (
                    <div className="document-preview">
                      {aadhaarPhotoUrl.match(/\.(jpeg|jpg|gif|png)$/i) || (aadhaarPhoto && aadhaarPhoto.type.startsWith('image/')) ? (
                        <img src={aadhaarPhotoUrl} alt="Aadhaar Card" />
                      ) : (
                        <div className="non-image-document">
                          <FileText size={64} className="document-icon" />
                          <a href={aadhaarPhotoUrl} target="_blank" rel="noopener noreferrer" className="view-doc-link">
                            View Uploaded Document
                          </a>
                        </div>
                      )}
                      {!isEditing && (
                        <div className="document-status verified">
                          <CheckCircle size={16} /> Verified Document
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="no-document">
                      <FileText size={48} className="placeholder-icon" />
                      <p>No Aadhaar card uploaded yet</p>
                      {isEditing && <span className="required-text">* Upload is required</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;

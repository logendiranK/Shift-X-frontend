import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import WorkerSignup from './pages/Worker/Worker-Signup';
import EmployerSignup from './pages/Employer/Employer-Signup';
import './App.css';
import Employerhome from'./pages/Employer/Employer-home';
import WorkerProfile from './pages/Worker/WorkerProfile';
import Jobs from './pages/Employer/Employer-postjob';
import UrgentJob from './pages/Employer/UrgentJobForm';
import UrgentJobs from './pages/UrgentJobs';
import ManageJobs from './pages/Employer/Manage-Job';
import PartTimeJobForm from './pages/Employer/PartTimeJobForm';
import PartTimeJobs from './pages/PartTimeJobs';
import SearchJobs from './pages/SearchJobs';
import PartTimeJobDetails from './pages/Parttimejobdetails';
import UrgentJobDetails from './pages/UrgentJobDetails';
import EditJob from './pages/Employer/EditJob';
import ViewApplications from './pages/Employer/ViewApplications';
import AppliedJobs from './pages/Worker/AppliedJobs';
import HowItWorks from './pages/HowItWorks';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup-worker" element={<WorkerSignup />} />
            <Route path="/signup-employer" element={<EmployerSignup />} />
            <Route path="/employer-home" element={<Employerhome/>} />
            <Route path="/worker/:workerId" element={<WorkerProfile />} />
            <Route path="/applied-jobs" element={<AppliedJobs />} />
            <Route path="/job" element={<Jobs />} />
            <Route path="/urgent" element={<UrgentJob/>}/>
            <Route path="/urgent-jobs" element={<UrgentJobs />} />
            <Route path="/part-time" element={<PartTimeJobForm />} />
            <Route path="/part-time-jobs" element={<PartTimeJobs />} />
            <Route path="/manage-jobs" element={<ManageJobs />} />
            <Route path="/search-jobs" element={<SearchJobs />} />
            <Route path="/part-time-jobs/:id" element={<PartTimeJobDetails />} />
            <Route path="/urgent-time-jobs/:id" element={<UrgentJobDetails />} />
            <Route path="/edit-job/:type/:id" element={<EditJob />} />
            <Route path="/job-applications/:id" element={<ViewApplications />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '50px' }}>404 - Page Not Found</h2>} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;

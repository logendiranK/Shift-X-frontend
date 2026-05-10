import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MainPage/Howitworks.css";
import { 
  Search, Briefcase, Bell, CheckCircle, 
  UserPlus, DollarSign, FileText, Users, 
  Zap, ShieldCheck, ArrowRight 
} from "lucide-react";

const HowItWorks = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("worker");

  const workerSteps = [
    {
      icon: <UserPlus size={36} />,
      title: "Create a Profile",
      description: "Sign up and build your profile highlighting your skills, experience, and availability."
    },
    {
      icon: <Search size={36} />,
      title: "Find Shifts",
      description: "Browse urgent and part-time jobs in your area that match your preferences."
    },
    {
      icon: <Briefcase size={36} />,
      title: "Apply Instantly",
      description: "Apply to shifts with a single click. No lengthy resumes or cover letters required."
    },
    {
      icon: <DollarSign size={36} />,
      title: "Work & Get Paid",
      description: "Complete your shift successfully and get paid promptly for your hard work."
    }
  ];

  const employerSteps = [
    {
      icon: <FileText size={36} />,
      title: "Post a Job",
      description: "Create a detailed job listing for your urgent or part-time staffing needs."
    },
    {
      icon: <Bell size={36} />,
      title: "Get Notified",
      description: "Receive instant notifications when qualified workers apply for your shifts."
    },
    {
      icon: <Users size={36} />,
      title: "Review & Hire",
      description: "Review applicant profiles and hire the right candidate instantly."
    },
    {
      icon: <ShieldCheck size={36} />,
      title: "Manage Workforce",
      description: "Easily manage your active shifts and track your temporary workforce."
    }
  ];

  const currentSteps = activeTab === "worker" ? workerSteps : employerSteps;

  return (
    <div className="howitworks-page">
      {/* Hero Section */}
      <section className="hiw-hero">
        <div className="hiw-hero-content">
          <div className="badge">Simple & Fast</div>
          <h1>How ShiftX Works</h1>
          <p className="subtitle">
            The smartest platform connecting local talent with businesses that need them now. Whether you're looking for work or looking to hire, we make it effortless.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="hiw-main">
        <div className="hiw-toggle-container">
          <div className="hiw-toggle">
            <button 
              className={`toggle-btn ${activeTab === "worker" ? "active" : ""}`}
              onClick={() => setActiveTab("worker")}
            >
              For Workers
            </button>
            <button 
              className={`toggle-btn ${activeTab === "employer" ? "active" : ""}`}
              onClick={() => setActiveTab("employer")}
            >
              For Employers
            </button>
          </div>
        </div>

        <div className="hiw-steps-container">
          <div className="steps-path-line"></div>
          {currentSteps.map((step, index) => (
            <div key={index} className="hiw-step-card">
              <div className="step-number">{index + 1}</div>
              <div className="step-icon-wrapper">
                {step.icon}
              </div>
              <div className="step-content">
                <h2>{step.title}</h2>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="hiw-cta">
        <div className="hiw-cta-card">
          <h2>Ready to get started?</h2>
          <p>Join thousands of workers and businesses already using ShiftX today.</p>
          <div className="cta-buttons">
            <button onClick={() => navigate("/search-jobs")} className="btn-primary">
              Find Jobs <ArrowRight size={18} />
            </button>
            <button onClick={() => navigate("/employer-home")} className="btn-secondary">
              Post a Job <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
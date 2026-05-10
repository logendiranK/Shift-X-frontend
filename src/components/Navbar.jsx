import { useState } from "react";
import "../styles/Components/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userRole = localStorage.getItem("userRole");
  const employerId = localStorage.getItem("employerId");
  const workerId = localStorage.getItem("workerId");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload(); 
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo-link">
          <h1 className="logo">ShiftX</h1>
        </Link>

        {/* Mobile menu toggle button */}
        <div className="mobile-menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        <div className={`navbar-menu-group ${isMobileMenuOpen ? "active" : ""}`}>
          <div className="navbar-links">
            <Link to="/" onClick={closeMobileMenu}>Home</Link>
            <Link to="/search-jobs" onClick={closeMobileMenu}>Search Jobs</Link>
            <Link to="/how-it-works" onClick={closeMobileMenu}>How It Works</Link>
            <Link to="/about-us" onClick={closeMobileMenu}>About Us</Link>
          </div>

          <div className="navbar-buttons">
            {userRole === "employer" && employerId ? (
              <>
                <Link to="/employer-home" className="employer-button" onClick={closeMobileMenu}>Employer Profile</Link>
                <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="worker-button">Logout</button>
              </>
            ) : userRole === "worker" && workerId ? (
              <>
                <Link to={`/worker/${workerId}`} className="worker-button" onClick={closeMobileMenu}>Worker Profile</Link>
                <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="employer-button">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login?role=employer" className="employer-button" onClick={closeMobileMenu}>Employer Login</Link>
                <Link to="/login?role=worker" className="worker-button" onClick={closeMobileMenu}>Worker Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

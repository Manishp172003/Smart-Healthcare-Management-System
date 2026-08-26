import { HeartPulse, UserRound } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <a href="/" className="brand">
          <div className="brand-icon">
            <HeartPulse size={24} strokeWidth={2.5} />
          </div>

          <div className="brand-text">
            <span className="brand-name">SmartHealth</span>
            <span className="brand-subtitle">Healthcare System</span>
          </div>
        </a>

        {/* Navigation */}
        <nav className="nav-links">
          <a href="/" className="nav-link active">
            Home
          </a>

          <a href="#about" className="nav-link">
            About Us
          </a>

          <a href="#doctors" className="nav-link">
            Find Doctors
          </a>

          <a href="#services" className="nav-link">
            Services
          </a>

          <a href="#packages" className="nav-link">
            Our Packages
          </a>

          <a href="#contact" className="nav-link">
            Contact Us
          </a>
        </nav>

        {/* Login */}
        <button className="login-button">
          <UserRound size={17} />
          <span>Login / Signup</span>
        </button>

      </div>
    </header>
  );
};

export default Navbar;
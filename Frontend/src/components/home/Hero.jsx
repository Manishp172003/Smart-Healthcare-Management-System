import {
  ShieldCheck,
  CalendarCheck,
  UserRoundCheck,
  FileHeart,
  Search,
  MapPin,
  ChevronDown,
} from "lucide-react";

import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">

        {/* Hero Content */}
        <div className="hero-content">

          <span className="hero-small-title">
            SMART HEALTHCARE PLATFORM
          </span>

          <h1>
            Better Health
            <br />
            <span>Brighter Future</span>
          </h1>

          <p className="hero-description">
            Book appointments, manage your health records,
            and connect with trusted healthcare professionals
            — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <button className="primary-hero-btn">
              <CalendarCheck size={18} />
              Book Appointment
            </button>

            <button className="secondary-hero-btn">
              <UserRoundCheck size={18} />
              Find a Doctor
            </button>
          </div>

          {/* Trust Features */}
          <div className="hero-features">

            <div className="hero-feature">
              <div className="feature-icon">
                <ShieldCheck size={21} />
              </div>

              <div>
                <h4>Trusted & Secure</h4>
                <p>Your health data is protected</p>
              </div>
            </div>

            <div className="hero-feature">
              <div className="feature-icon">
                <CalendarCheck size={21} />
              </div>

              <div>
                <h4>Easy Appointment</h4>
                <p>Book in a few clicks</p>
              </div>
            </div>

            <div className="hero-feature">
              <div className="feature-icon">
                <UserRoundCheck size={21} />
              </div>

              <div>
                <h4>Expert Doctors</h4>
                <p>Trusted healthcare experts</p>
              </div>
            </div>

            <div className="hero-feature">
              <div className="feature-icon">
                <FileHeart size={21} />
              </div>

              <div>
                <h4>Health Records</h4>
                <p>Access them anytime</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Appointment Search */}
      <div className="appointment-search">

        <div className="search-heading">
          <h3>Find & Book an Appointment</h3>

          <p>
            Find the right doctor for your healthcare needs
          </p>
        </div>

        <div className="search-fields">

          {/* Doctor */}
          <div className="search-field">
            <Search size={19} />

            <div>
              <label>Search Doctor</label>

              <input
                type="text"
                placeholder="Doctor or specialty"
              />
            </div>
          </div>

          {/* Category */}
          <div className="search-field">
            <UserRoundCheck size={19} />

            <div>
              <label>Specialty</label>

              <select defaultValue="">
                <option value="" disabled>
                  Select specialty
                </option>

                <option>General Physician</option>
                <option>Cardiology</option>
                <option>Dermatology</option>
                <option>Dental</option>
                <option>Neurology</option>
              </select>
            </div>

            <ChevronDown size={17} />
          </div>

          {/* Location */}
          <div className="search-field">
            <MapPin size={19} />

            <div>
              <label>Location</label>

              <input
                type="text"
                placeholder="Enter location"
              />
            </div>
          </div>

          <button className="find-doctor-btn">
            Find Doctors
          </button>

        </div>
      </div>

    </section>
  );
};

export default Hero;
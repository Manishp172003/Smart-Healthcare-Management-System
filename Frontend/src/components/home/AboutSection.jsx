import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  FileHeart,
} from "lucide-react";

import "./AboutSection.css";

const AboutSection = () => {
  return (
    <section className="about-section" id="about">

      <div className="about-container">

        {/* Image */}
        <div className="about-image-wrapper">
          <img
            src="/images/about-healthcare.png"
            alt="Healthcare professional providing care"
            className="about-image"
          />

          <div className="about-image-badge">
            <ShieldCheck size={20} />

            <div>
              <strong>Trusted Care</strong>
              <span>Your health matters to us</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="about-content">

          <span className="section-label">
            ABOUT SMARTHEALTH
          </span>

          <h2>
            Better Care.
            <br />
            <span>Better Health.</span>
          </h2>

          <p className="about-description">
            SmartHealth makes healthcare simpler, more accessible,
            and more connected. Our platform brings patients and
            healthcare professionals together in one secure place.
          </p>

          <p className="about-description">
            From finding the right doctor to booking appointments
            and managing medical records, everything you need is
            just a few clicks away.
          </p>

          {/* Benefits */}
          <div className="about-benefits">

            <div className="about-benefit">
              <div className="about-benefit-icon">
                <CalendarCheck size={19} />
              </div>

              <div>
                <h4>Easy Appointment Booking</h4>
                <p>Find and book appointments effortlessly.</p>
              </div>
            </div>

            <div className="about-benefit">
              <div className="about-benefit-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h4>Trusted Healthcare</h4>
                <p>Connect with verified healthcare professionals.</p>
              </div>
            </div>

            <div className="about-benefit">
              <div className="about-benefit-icon">
                <FileHeart size={19} />
              </div>

              <div>
                <h4>Secure Health Records</h4>
                <p>Keep your medical information organized.</p>
              </div>
            </div>

          </div>

          <button className="about-button">
            Learn More
            <ArrowRight size={17} />
          </button>

        </div>

      </div>

    </section>
  );
};

export default AboutSection;
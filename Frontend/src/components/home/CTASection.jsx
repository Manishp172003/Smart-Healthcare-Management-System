import {
  CalendarCheck,
  Search,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import "./CTASection.css";

const CTASection = () => {
  return (
    <section className="cta-section">

      <div className="cta-container">

        {/* Decorative background */}
        <div className="cta-circle cta-circle-one" />
        <div className="cta-circle cta-circle-two" />

        <div className="cta-content">

          <span className="cta-label">
            START YOUR HEALTHCARE JOURNEY
          </span>

          <h2>
            Your health deserves
            <span> better care.</span>
          </h2>

          <p>
            Find trusted healthcare professionals, book appointments,
            and manage your healthcare journey with SmartHealth.
          </p>

          <div className="cta-actions">

            <button className="cta-primary-button">
              <CalendarCheck size={18} />
              Book an Appointment
              <ArrowRight size={16} />
            </button>

            <button className="cta-secondary-button">
              <Search size={18} />
              Find a Doctor
            </button>

          </div>

          <div className="cta-trust">

            <div>
              <ShieldCheck size={16} />
              Secure & Private
            </div>

            <div>
              <ShieldCheck size={16} />
              Trusted Doctors
            </div>

            <div>
              <ShieldCheck size={16} />
              Easy Booking
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CTASection;
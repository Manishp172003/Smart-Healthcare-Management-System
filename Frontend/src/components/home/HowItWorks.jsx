import {
  Search,
  CalendarDays,
  ClipboardCheck,
  HeartPulse,
  ArrowRight,
} from "lucide-react";

import "./HowItWorks.css";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find a Doctor",
    description:
      "Search for doctors by specialty, location, or healthcare needs.",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Choose a Time",
    description:
      "View available schedules and choose a date and time that works for you.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Book Appointment",
    description:
      "Confirm your appointment securely and receive instant confirmation.",
  },
  {
    number: "04",
    icon: HeartPulse,
    title: "Get the Care",
    description:
      "Meet your doctor and keep your healthcare journey organized in one place.",
  },
];

const HowItWorks = () => {
  return (
    <section className="how-section">

      <div className="how-container">

        {/* Header */}
        <div className="how-header">

          <span className="section-label">
            HOW IT WORKS
          </span>

          <h2>
            Healthcare in
            <span> four simple steps.</span>
          </h2>

          <p>
            From finding the right doctor to managing your
            appointment, SmartHealth keeps the entire process simple.
          </p>

        </div>

        {/* Steps */}
        <div className="steps-container">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div className="step-wrapper" key={step.number}>

                <div className="step-card">

                  <div className="step-top">
                    <span className="step-number">
                      {step.number}
                    </span>

                    <div className="step-icon">
                      <Icon size={23} />
                    </div>
                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>

                </div>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="step-connector">
                    <ArrowRight size={18} />
                  </div>
                )}

              </div>
            );
          })}

        </div>

        {/* Bottom CTA */}
        <div className="how-cta">

          <div>
            <h3>Ready to take control of your healthcare?</h3>

            <p>
              Find a doctor and book your appointment today.
            </p>
          </div>

          <button className="how-cta-button">
            Book an Appointment
            <ArrowRight size={17} />
          </button>

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;
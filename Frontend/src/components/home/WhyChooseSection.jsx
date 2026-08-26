import {
  ShieldCheck,
  BadgeCheck,
  Smartphone,
  Headphones,
  CheckCircle2,
} from "lucide-react";

import "./WhyChooseSection.css";

const stats = [
  {
    value: "500+",
    label: "Verified Doctors",
  },
  {
    value: "50+",
    label: "Medical Specialties",
  },
  {
    value: "10K+",
    label: "Happy Patients",
  },
  {
    value: "24/7",
    label: "Healthcare Support",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description:
      "Your personal and medical information is protected with secure technology.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Doctors",
    description:
      "Connect with qualified and trusted healthcare professionals.",
  },
  {
    icon: Smartphone,
    title: "Easy to Use",
    description:
      "Book appointments and manage healthcare from any device.",
  },
  {
    icon: Headphones,
    title: "Reliable Support",
    description:
      "Get assistance whenever you need help with your healthcare journey.",
  },
];

const WhyChooseSection = () => {
  return (
    <section className="why-section">

      <div className="why-container">

        {/* Header */}
        <div className="why-header">

          <span className="section-label">
            WHY SMARTHEALTH
          </span>

          <h2>
            Healthcare that
            <span> works for you.</span>
          </h2>

          <p>
            We combine technology, trusted healthcare professionals,
            and a patient-first experience to make healthcare simpler.
          </p>

        </div>

        {/* Statistics */}
        <div className="stats-grid">

          {stats.map((stat) => (
            <div className="stat-item" key={stat.label}>

              <strong>{stat.value}</strong>

              <span>{stat.label}</span>

            </div>
          ))}

        </div>

        {/* Benefits */}
        <div className="benefits-grid">

          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div className="benefit-item" key={benefit.title}>

                <div className="benefit-icon">
                  <Icon size={21} />
                </div>

                <div className="benefit-content">

                  <div className="benefit-title">
                    <CheckCircle2 size={14} />
                    <h3>{benefit.title}</h3>
                  </div>

                  <p>{benefit.description}</p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default WhyChooseSection;
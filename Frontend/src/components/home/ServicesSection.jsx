import {
  Stethoscope,
  CalendarCheck,
  FileHeart,
  Clock3,
  ArrowRight,
} from "lucide-react";

import "./ServicesSection.css";

const services = [
  {
    icon: Stethoscope,
    title: "Find a Doctor",
    description:
      "Discover trusted doctors and healthcare specialists based on your needs.",
    color: "blue",
  },
  {
    icon: CalendarCheck,
    title: "Book Appointments",
    description:
      "Choose a convenient date and time and book your appointment easily.",
    color: "teal",
  },
  {
    icon: FileHeart,
    title: "Health Records",
    description:
      "Keep your medical history, prescriptions, reports, and records organized.",
    color: "purple",
  },
  {
    icon: Clock3,
    title: "Doctor Scheduling",
    description:
      "Doctors can manage availability, appointments, and daily schedules.",
    color: "orange",
  },
];

const ServicesSection = () => {
  return (
    <section className="services-section" id="services">
      <div className="services-container">

        {/* Section Header */}
        <div className="services-header">
          <div>
            <span className="section-label">
              OUR SERVICES
            </span>

            <h2>
              Healthcare made
              <span> simpler.</span>
            </h2>
          </div>

          <p>
            Everything you need to connect with healthcare
            professionals and manage your healthcare journey
            from one convenient platform.
          </p>
        </div>

        {/* Service Cards */}
        <div className="services-grid">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                className={`service-card ${service.color}`}
                key={service.title}
              >
                <div className="service-icon">
                  <Icon size={25} strokeWidth={2} />
                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <button className="service-link">
                  Explore
                  <ArrowRight size={15} />
                </button>
              </article>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
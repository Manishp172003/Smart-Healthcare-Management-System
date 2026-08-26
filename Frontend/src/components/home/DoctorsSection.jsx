import {
  Star,
  MapPin,
  Clock3,
  ArrowRight,
  CalendarCheck,
  BadgeCheck,
} from "lucide-react";

import "./DoctorsSection.css";

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    experience: "12 Years Experience",
    location: "City Care Hospital",
    rating: "4.9",
    reviews: "128",
    fee: "₹500",
    image: "/images/doctor-1.png",
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    experience: "10 Years Experience",
    location: "Apollo Medical Center",
    rating: "4.8",
    reviews: "96",
    fee: "₹700",
    image: "/images/doctor-2.png",
  },
  {
    name: "Dr. Priya Sharma",
    specialty: "Dermatologist",
    experience: "8 Years Experience",
    location: "HealthFirst Clinic",
    rating: "4.9",
    reviews: "114",
    fee: "₹600",
    image: "/images/doctor-3.png",
  },
];

const DoctorsSection = () => {
  return (
    <section className="doctors-section" id="doctors">

      <div className="doctors-container">

        {/* Header */}
        <div className="doctors-header">

          <div>
            <span className="section-label">
              OUR DOCTORS
            </span>

            <h2>
              Meet our trusted
              <span> doctors.</span>
            </h2>
          </div>

          <div className="doctors-header-right">
            <p>
              Connect with experienced healthcare professionals
              and find the right doctor for your needs.
            </p>

            <button className="view-all-doctors">
              View All Doctors
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

        {/* Doctor Cards */}
        <div className="doctors-grid">

          {doctors.map((doctor) => (
            <article
              className="doctor-card"
              key={doctor.name}
            >

              {/* Doctor Image */}
              <div className="doctor-image-wrapper">

                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="doctor-image"
                />

                <div className="availability-badge">
                  <span />
                  Available Today
                </div>

              </div>

              {/* Content */}
              <div className="doctor-content">

                <div className="doctor-name-row">

                  <div>
                    <h3>{doctor.name}</h3>

                    <div className="doctor-specialty">
                      {doctor.specialty}

                      <BadgeCheck size={14} />
                    </div>
                  </div>

                  <div className="doctor-rating">
                    <Star size={13} fill="currentColor" />
                    {doctor.rating}
                  </div>

                </div>

                <div className="doctor-info">

                  <div>
                    <Clock3 size={14} />
                    {doctor.experience}
                  </div>

                  <div>
                    <MapPin size={14} />
                    {doctor.location}
                  </div>

                </div>

                <div className="doctor-bottom">

                  <div className="consultation-fee">
                    <span>Consultation</span>
                    <strong>{doctor.fee}</strong>
                  </div>

                  <button className="book-doctor-button">
                    <CalendarCheck size={15} />
                    Book
                  </button>

                </div>

              </div>

            </article>
          ))}

        </div>

      </div>

    </section>
  );
};

export default DoctorsSection;
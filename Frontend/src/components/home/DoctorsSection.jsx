import { Link } from "react-router-dom";
import {
  Star,
  MapPin,
  Clock3,
  ArrowRight,
  CalendarCheck,
  BadgeCheck,
} from "lucide-react";

// Import real doctor images matching the rest of the application
import doctorImg1 from "../../assets/FindDoctors/Doctor-img-1.png";
import doctorImg3 from "../../assets/FindDoctors/Doctor-img-3.png";
import doctorImg4 from "../../assets/FindDoctors/Doctor-img-4.png";

const doctors = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialty: "Cardiologist",
    experience: "12+ Years Experience",
    location: "Nagpur Heart Institute, Nagpur",
    rating: "4.9",
    reviews: "124",
    fee: "₹1,500",
    image: doctorImg1,
    availability: "Available Today",
  },
  {
    id: 3,
    name: "Dr. Priya Kapoor",
    specialty: "Dermatologist",
    experience: "8+ Years Experience",
    location: "Aura Skin Clinic, Mumbai",
    rating: "4.9",
    reviews: "156",
    fee: "₹1,200",
    image: doctorImg3,
    availability: "Available Tomorrow",
  },
  {
    id: 4,
    name: "Dr. Arjun Verma",
    specialty: "Orthopedic Surgeon",
    experience: "11+ Years Experience",
    location: "Care Ortho Center, Nagpur",
    rating: "4.7",
    reviews: "87",
    fee: "₹1,400",
    image: doctorImg4,
    availability: "Available Today",
  },
];

const DoctorsSection = () => {
  return (
    <div className="w-full px-4 md:px-7 max-w-[1440px] mx-auto" id="doctors">
      <div className="w-full bg-white border border-[#E2E8F0] rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.04)] p-8 md:p-12">

        {/* Header */}
        <div className="flex flex-col gap-6 mb-12 md:flex-row md:items-end md:justify-between md:gap-10">

          <div>
            <span className="text-[#64748B] text-[11px] font-bold tracking-[1.5px] uppercase">
              OUR DOCTORS
            </span>

            <h2 className="mt-1 text-[#0F172A] text-3xl md:text-4xl font-extrabold tracking-tight">
              Meet our trusted
              <span className="text-[#0D9488]"> doctors.</span>
            </h2>
          </div>

          <div className="flex items-center md:items-end mt-4 md:mt-0">
            <Link 
              to="/doctors"
              className="flex-shrink-0 flex items-center gap-1.5 p-2.5 px-5 text-[#2563EB] bg-white border border-[#2563EB] rounded-full text-xs font-bold transition-all hover:bg-[#eff6ff] hover:-translate-y-0.5 shadow-sm"
            >
              <span>View All Doctors</span>
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {doctors.map((doctor, index) => {
            const delayClasses = ['animate-delay-100', 'animate-delay-200', 'animate-delay-300'];

            return (
              <article
                className={`overflow-hidden bg-white border border-[#E2E8F0] rounded-[24px] shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between animate-scale-up ${delayClasses[index % delayClasses.length]}`}
                key={doctor.id}
              >

                {/* Doctor Image - Clickable & Contained */}
                <Link to={`/doctors/${doctor.id}`} className="relative h-[250px] overflow-hidden bg-slate-100 block group/img">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-contain object-center transition-transform duration-500 group-hover/img:scale-105"
                  />

                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 p-1.5 px-3 text-[#047857] bg-white/95 rounded-full text-[10px] font-extrabold shadow-[0_4px_12px_rgba(15,23,42,0.06)] backdrop-blur-sm border border-emerald-100">
                    <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse" />
                    {doctor.availability}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-1 gap-4">

                  {/* Name & Rating */}
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link 
                          to={`/doctors/${doctor.id}`} 
                          className="text-slate-900 hover:text-blue-600 transition-colors text-sm md:text-base font-extrabold leading-tight block"
                        >
                          {doctor.name}
                        </Link>

                        <div className="flex items-center gap-1 mt-1 text-[#0D9488] text-xs font-bold">
                          {doctor.specialty}
                          <BadgeCheck size={16} className="text-[#2563EB]" />
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[#d97706] text-xs font-extrabold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 shrink-0">
                        <Star size={13} fill="currentColor" className="stroke-none text-amber-500" />
                        <span>{doctor.rating}</span>
                      </div>
                    </div>

                    {/* Details List */}
                    <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <Clock3 size={15} className="text-slate-400 shrink-0" />
                        <span>{doctor.experience}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <MapPin size={15} className="text-slate-400 shrink-0" />
                        <span className="truncate">{doctor.location}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Divider & Fee */}
                    <div className="flex items-center justify-between py-2 border-t border-slate-100">
                      <span className="text-slate-400 text-[11px] font-medium">Consultation Fee</span>
                      <strong className="text-slate-900 text-sm md:text-base font-extrabold">{doctor.fee}</strong>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2.5 mt-2">
                      <Link 
                        to={`/doctors/${doctor.id}`}
                        className="w-full py-2.5 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-sm transition-all text-center flex items-center justify-center"
                      >
                        View Profile
                      </Link>
                      <Link 
                        to={`/appointment?doctorId=${doctor.id}`}
                        className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-1 text-center"
                      >
                        <CalendarCheck size={14} />
                        <span>Book Now</span>
                      </Link>
                    </div>
                  </div>

                </div>

              </article>
            );
          })}

        </div>

      </div>
    </div>
  );
};

export default DoctorsSection;
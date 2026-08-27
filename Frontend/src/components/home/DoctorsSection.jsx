import {
  Star,
  MapPin,
  Clock3,
  ArrowRight,
  CalendarCheck,
  BadgeCheck,
} from "lucide-react";

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
            <button className="flex-shrink-0 flex items-center gap-1.5 p-2.5 px-5 text-[#2563EB] bg-white border border-[#2563EB] rounded-full text-xs font-bold transition-all hover:bg-[#eff6ff] hover:-translate-y-0.5 shadow-sm">
              View All Doctors
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {doctors.map((doctor) => (
            <article
              className="overflow-hidden bg-white border border-[#E2E8F0] rounded-[24px] shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5"
              key={doctor.name}
            >

              {/* Doctor Image */}
              <div className="relative h-[240px] overflow-hidden bg-[#e8f1f7]">

                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                />

                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 p-1.5 px-3 text-[#047857] bg-white/94 rounded-full text-[10px] font-extrabold shadow-[0_4px_12px_rgba(15,23,42,0.06)] backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full" />
                  Available Today
                </div>

              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4">

                {/* Name & Rating */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-slate-900 text-sm md:text-base font-extrabold leading-tight">{doctor.name}</h3>

                    <div className="flex items-center gap-1 mt-1.25 text-[#0D9488] text-xs font-bold">
                      {doctor.specialty}
                      <BadgeCheck size={16} className="text-[#2563EB]" />
                    </div>
                  </div>

                  <div className="flex items-center gap-0.75 text-[#d97706] text-xs font-extrabold">
                    <Star size={14} fill="currentColor" className="stroke-none" />
                    {doctor.rating}
                  </div>
                </div>

                {/* Details List */}
                <div className="flex flex-col gap-2 mt-1">
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <Clock3 size={15} className="text-slate-400" />
                    {doctor.experience}
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <MapPin size={15} className="text-slate-400" />
                    {doctor.location}
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1.5px] bg-slate-100/80 my-1" />

                {/* Bottom Row */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Consultation</span>
                    <strong className="text-slate-900 text-base md:text-lg font-extrabold">{doctor.fee}</strong>
                  </div>

                  <button className="flex items-center justify-center gap-1.5 h-10 px-5 text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none rounded-full text-xs font-bold transition-all hover:-translate-y-px shadow-sm cursor-pointer">
                    <CalendarCheck size={15} />
                    Book
                  </button>
                </div>

              </div>

            </article>
          ))}

        </div>

      </div>
    </div>
  );
};

export default DoctorsSection;
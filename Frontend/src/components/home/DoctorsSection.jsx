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
    <section className="px-4.5 py-16 bg-[#f8fbff] md:px-7 md:py-[85px] lg:px-[38px]" id="doctors">

      <div className="max-w-[1240px] mx-auto">

        {/* Header */}
        <div className="flex flex-col items-start gap-6 mb-9.5 md:flex-row md:items-end md:justify-between md:gap-10">

          <div>
            <span className="text-[#64748B] text-[11px] font-bold tracking-[1.5px] uppercase">
              OUR DOCTORS
            </span>

            <h2 className="mt-1 text-[#0F172A] text-[34px] leading-[1.1] tracking-[-1.5px] md:text-[40px]">
              Meet our trusted
              <span className="text-[#0D9488]"> doctors.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start gap-3.75 md:flex-row md:items-end md:gap-6.25">
            <p className="max-w-[360px] text-[#64748B] text-[12px] leading-[1.65]">
              Connect with experienced healthcare professionals
              and find the right doctor for your needs.
            </p>

            <button className="flex-shrink-0 flex items-center gap-1.75 p-2.5 px-3.5 text-[#2563EB] bg-white border border-[rgba(37,99,235,0.2)] rounded-lg text-[10px] font-semibold transition-all hover:bg-[#eff6ff] hover:-translate-y-0.5">
              View All Doctors
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 gap-5.5 md:grid-cols-2 lg:grid-cols-3">

          {doctors.map((doctor) => (
            <article
              className="overflow-hidden bg-white border border-[#E2E8F0] rounded-[18px] shadow-[0_6px_20px_rgba(15,23,42,0.04)] transition-transform hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)]"
              key={doctor.name}
            >

              {/* Doctor Image */}
              <div className="relative h-[280px] overflow-hidden bg-[#e8f1f7] md:h-[245px]">

                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />

                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 p-1.5 px-2.25 text-[#047857] bg-white/94 rounded-lg text-[9px] font-bold shadow-[0_4px_12px_rgba(15,23,42,0.08)] backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full" />
                  Available Today
                </div>

              </div>

              {/* Content */}
              <div className="p-5">

                <div className="flex items-start justify-between gap-3">

                  <div>
                    <h3 className="text-[#0F172A] text-[15px] font-bold">{doctor.name}</h3>

                    <div className="flex items-center gap-1 mt-1.25 text-[#0D9488] text-[10px] font-semibold">
                      {doctor.specialty}

                      <BadgeCheck size={14} className="text-[#2563EB]" />
                    </div>
                  </div>

                  <div className="flex items-center gap-0.75 p-1.25 px-1.75 text-[#d97706] bg-[#fffbeb] rounded-lg text-[10px] font-bold">
                    <Star size={13} fill="currentColor" />
                    {doctor.rating}
                  </div>

                </div>

                <div className="flex flex-col gap-1.75 mt-4.25 pb-4.25 border-b border-[#E2E8F0]">

                  <div className="flex items-center gap-1.75 text-[#64748B] text-[9px]">
                    <Clock3 size={14} className="text-[#94a3b8]" />
                    {doctor.experience}
                  </div>

                  <div className="flex items-center gap-1.75 text-[#64748B] text-[9px]">
                    <MapPin size={14} className="text-[#94a3b8]" />
                    {doctor.location}
                  </div>

                </div>

                <div className="flex items-center justify-between mt-3.75">

                  <div className="flex flex-col gap-0.75">
                    <span className="text-[#64748B] text-[8px]">Consultation</span>
                    <strong className="text-[#0F172A] text-[14px]">{doctor.fee}</strong>
                  </div>

                  <button className="flex items-center gap-1.5 p-2.25 px-3.25 text-white bg-[#2563EB] border-none rounded-lg text-[9px] font-semibold transition-all hover:bg-[#1D4ED8] hover:-translate-y-px">
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
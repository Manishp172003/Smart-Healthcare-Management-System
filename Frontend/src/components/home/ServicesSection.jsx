import {
  Stethoscope,
  CalendarCheck,
  FileHeart,
  Clock3,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Find a Doctor",
    description:
      "Discover trusted doctors and healthcare specialists based on your needs.",
    color: "blue",
    colors: {
      bg: "rgba(37,99,235,0.08)",
      text: "#2563EB",
      border: "#2563EB"
    }
  },
  {
    icon: CalendarCheck,
    title: "Book Appointments",
    description:
      "Choose a convenient date and time and book your appointment easily.",
    color: "teal",
    colors: {
      bg: "rgba(13,148,136,0.09)",
      text: "#0D9488",
      border: "#0D9488"
    }
  },
  {
    icon: FileHeart,
    title: "Health Records",
    description:
      "Keep your medical history, prescriptions, reports, and records organized.",
    color: "purple",
    colors: {
      bg: "rgba(124,58,237,0.08)",
      text: "#7c3aed",
      border: "#7c3aed"
    }
  },
  {
    icon: Clock3,
    title: "Doctor Scheduling",
    description:
      "Doctors can manage availability, appointments, and daily schedules.",
    color: "orange",
    colors: {
      bg: "rgba(245,158,11,0.1)",
      text: "#d97706",
      border: "#f59e0b"
    }
  },
];

const ServicesSection = () => {
  return (
    <div className="w-full px-4 md:px-7 max-w-[1440px] mx-auto" id="services">
      <div className="w-full bg-white border border-[#E2E8F0] rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.04)] p-8 md:p-12">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <span className="text-[#0D9488] text-xs font-bold tracking-[2px] uppercase">
            OUR SPECIALIZED CARE
          </span>
          
          <h2 className="text-[#0F172A] text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight">
            Comprehensive Healthcare Services
          </h2>

          <div className="mt-2 text-[#0D9488] flex items-center justify-center">
            <div className="w-10 h-[1.5px] bg-[#E2E8F0]" />
            <div className="mx-3.5 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
            </div>
            <div className="w-10 h-[1.5px] bg-[#E2E8F0]" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                className="flex flex-col items-center text-center justify-between p-8 bg-white border border-[#E2E8F0] rounded-[28px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_12px_32px_rgba(15,23,42,0.06)] min-h-[300px] group"
                key={service.title}
              >
                <div className="flex flex-col items-center">
                  {/* Icon Wrapper */}
                  <div className="w-14 h-14 bg-[#0D9488] text-white rounded-full flex items-center justify-center mb-5 shadow-sm">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-[#0F172A] text-base md:text-lg font-bold">{service.title}</h3>

                  <p className="mt-3.5 text-[#64748B] text-xs md:text-sm leading-relaxed max-w-[200px]">
                    {service.description}
                  </p>
                </div>

                <a
                  href={service.link}
                  className="flex items-center gap-1.5 text-[#0D9488] text-xs md:text-sm font-bold transition-all hover:text-[#0f766e] mt-6"
                >
                  Learn More <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default ServicesSection;
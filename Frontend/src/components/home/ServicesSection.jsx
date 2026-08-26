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
    <section className="px-4.5 py-15 bg-white md:px-7 md:py-18 lg:px-[38px] lg:py-20" id="services">
      <div className="max-w-[1240px] mx-auto">

        {/* Section Header */}
        <div className="flex flex-col items-start gap-3.75 mb-9.5 md:flex-row md:items-end md:justify-between md:gap-12">
          <div>
            <span className="text-[#64748B] text-[11px] font-bold tracking-[1.5px] uppercase">
              OUR SERVICES
            </span>

            <h2 className="text-[#0F172A] text-[40px] leading-[1.1] tracking-[-1.5px] sm:text-[34px]">
              Healthcare made
              <span className="text-[#2563EB]"> simpler.</span>
            </h2>
          </div>

          <p className="max-w-[470px] text-[#64748B] text-[13px] leading-[1.7]">
            Everything you need to connect with healthcare
            professionals and manage your healthcare journey
            from one convenient platform.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                className="relative min-h-[250px] p-6 bg-white border border-[#E2E8F0] rounded-[18px] overflow-hidden transition-transform hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_18px_40px_rgba(15,23,42,0.09)] md:min-h-[280px]"
                key={service.title}
                style={{
                  borderTop: `4px solid ${service.colors.border}`
                }}
              >
                <div className="w-13 h-13 flex items-center justify-center mb-6.25 rounded-xl" style={{
                  color: service.colors.text,
                  backgroundColor: service.colors.bg
                }}>
                  <Icon size={25} strokeWidth={2} />
                </div>

                <h3 className="text-[#0F172A] text-[17px] font-bold">{service.title}</h3>

                <p className="mt-2.75 text-[#64748B] text-[11px] leading-[1.65]">{service.description}</p>

                <button className="absolute bottom-6 left-6 flex items-center gap-1.5 p-0 text-[#2563EB] bg-transparent border-none text-[11px] font-bold transition-all hover:gap-2.5">
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
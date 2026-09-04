import { Link } from "react-router-dom";
import {
  Stethoscope,
  CalendarCheck,
  FileHeart,
  Clock3,
  ArrowRight,
  Sparkles
} from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Find a Doctor",
    description:
      "Discover verified doctors and medical specialists tailored to your clinical needs.",
    link: "/doctors",
    iconBg: "bg-blue-50 text-[#2563EB] border-blue-100",
    badge: "15+ Specialists"
  },
  {
    icon: CalendarCheck,
    title: "Book Appointments",
    description:
      "Choose a convenient date and time and secure real-time digital consultation slots.",
    link: "/appointment",
    iconBg: "bg-teal-50 text-[#0D9488] border-teal-100",
    badge: "Instant Confirm"
  },
  {
    icon: FileHeart,
    title: "Health Records",
    description:
      "Keep your medical history, prescriptions, lab reports, and vitals organized securely.",
    link: "/patient/dashboard?tab=Medical Records",
    iconBg: "bg-purple-50 text-purple-600 border-purple-100",
    badge: "HIPAA Safe"
  },
  {
    icon: Clock3,
    title: "Doctor Scheduling",
    description:
      "Specialists manage dynamic clinical hours, telehealth sessions, and daily hospital rounds.",
    link: "/login",
    iconBg: "bg-amber-50 text-amber-600 border-amber-100",
    badge: "Live Calendar"
  },
];

const ServicesSection = () => {
  return (
    <div className="w-full px-4 md:px-7 max-w-[1440px] mx-auto" id="services">
      <div className="w-full bg-gradient-to-br from-slate-50/90 via-teal-50/25 to-blue-50/20 border border-slate-200/90 rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.03)] p-8 md:p-12 relative overflow-hidden">
        
        {/* Subtle decorative background ambient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-200/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-12 relative z-1">
          <span className="text-[#0D9488] text-xs font-bold tracking-[2px] uppercase">
            OUR SPECIALIZED CARE
          </span>
          
          <h2 className="text-[#0F172A] text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight">
            Comprehensive Healthcare Services
          </h2>

          <div className="mt-2 text-[#0D9488] flex items-center justify-center">
            <div className="w-10 h-[1.5px] bg-[#CBD5E1]" />
            <div className="mx-3.5 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
            </div>
            <div className="w-10 h-[1.5px] bg-[#CBD5E1]" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-1">
          {services.map((service, index) => {
            const Icon = service.icon;
            const delayClasses = ['animate-delay-100', 'animate-delay-200', 'animate-delay-300', 'animate-delay-400'];

            return (
              <div
                className={`flex flex-col items-center text-center justify-between p-7 md:p-8 bg-white border border-slate-200/80 rounded-[28px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-200 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] min-h-[300px] group animate-on-scroll ${delayClasses[index % delayClasses.length]} relative`}
                key={service.title}
              >
                {/* Micro badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                    {service.badge}
                  </span>
                </div>

                <div className="flex flex-col items-center pt-2">
                  {/* Icon Wrapper */}
                  <div className={`w-14 h-14 ${service.iconBg} border rounded-2xl flex items-center justify-center mb-5 shadow-xs transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={24} />
                  </div>

                  <h3 className="text-[#0F172A] text-base md:text-lg font-bold group-hover:text-[#0D9488] transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-[#64748B] text-xs md:text-sm leading-relaxed max-w-[210px]">
                    {service.description}
                  </p>
                </div>

                <Link
                  to={service.link}
                  className="flex items-center gap-1.5 text-[#0D9488] text-xs md:text-sm font-bold transition-all hover:text-[#0f766e] mt-6"
                >
                  <span>Explore Service</span> 
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default ServicesSection;
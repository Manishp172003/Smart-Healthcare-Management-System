import {
  ShieldCheck,
  BadgeCheck,
  Smartphone,
  Headphones,
  CheckCircle2,
} from "lucide-react";

const stats = [
  {
    value: "500+",
    label: "Verified Doctors",
    color: "#2563EB"
  },
  {
    value: "50+",
    label: "Medical Specialties",
    color: "#0D9488"
  },
  {
    value: "10K+",
    label: "Happy Patients",
    color: "#7c3aed"
  },
  {
    value: "24/7",
    label: "Healthcare Support",
    color: "#d97706"
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description:
      "Your personal and medical information is protected with secure technology.",
    color: {
      bg: "rgba(37,99,235,0.08)",
      text: "#2563EB"
    }
  },
  {
    icon: BadgeCheck,
    title: "Verified Doctors",
    description:
      "Connect with qualified and trusted healthcare professionals.",
    color: {
      bg: "rgba(13,148,136,0.08)",
      text: "#0D9488"
    }
  },
  {
    icon: Smartphone,
    title: "Easy to Use",
    description:
      "Book appointments and manage healthcare from any device.",
    color: {
      bg: "rgba(124,58,237,0.08)",
      text: "#7c3aed"
    }
  },
  {
    icon: Headphones,
    title: "Reliable Support",
    description:
      "Get assistance whenever you need help with your healthcare journey.",
    color: {
      bg: "rgba(245,158,11,0.1)",
      text: "#d97706"
    }
  },
];

const WhyChooseSection = () => {
  return (
    <div className="w-full px-4 md:px-7 max-w-[1440px] mx-auto flex flex-col gap-6" id="why-choose-us">
      
      {/* Teal Statistics Card Banner */}
      <div className="w-full bg-gradient-to-br from-[#0F4C81] via-[#2563EB] to-[#0D9488] rounded-[28px] shadow-[0_8px_30px_rgba(15,23,42,0.06)] p-8 md:p-12 text-white overflow-hidden relative z-2">
        {/* Decorative background shapes */}
        <div className="absolute top-[-100px] left-[-50px] w-[200px] h-[200px] border-[30px] border-white/5 rounded-full pointer-events-none" />
        <div className="absolute right-[-100px] bottom-[-120px] w-[250px] h-[250px] border-[40px] border-white/5 rounded-full pointer-events-none" />

        {/* Header */}
        <div className="max-w-[650px] mx-auto text-center relative z-2">
          <span className="text-[#a7f3d0] text-xs font-bold tracking-[2px] uppercase">
            WHY SMARTHEALTH
          </span>
          <h2 className="mt-1 text-white text-3xl md:text-4xl font-extrabold tracking-tight">
            Healthcare that <span className="text-[#a7f3d0]">works for you.</span>
          </h2>
          <p className="max-w-[590px] mt-4 mx-auto text-blue-100 text-sm leading-relaxed">
            We combine technology, trusted healthcare professionals, and a patient-first experience to make healthcare simpler.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 mt-10 bg-white/10 border border-white/10 rounded-2xl backdrop-blur-sm sm:grid-cols-2 md:grid-cols-4 relative z-2">
          {stats.map((stat) => (
            <div className="relative p-6 px-5 text-center border-b border-white/10 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0" key={stat.label}>
              <strong className="block text-white text-[32px] font-extrabold tracking-[-1px]">
                {stat.value}
              </strong>
              <span className="block mt-1 text-blue-100 text-[10px] font-bold uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Grid (White Cards Below) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <div 
              className="flex gap-4 p-6 bg-white border border-[#E2E8F0] rounded-[22px] shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300 group" 
              key={benefit.title}
            >
              <div 
                className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300"
                style={{ backgroundColor: benefit.color.bg, color: benefit.color.text }}
              >
                <Icon size={22} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-[#0D9488]" />
                  <h3 className="text-slate-900 text-sm font-extrabold leading-tight">{benefit.title}</h3>
                </div>
                <p className="mt-2 text-slate-500 text-xs md:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhyChooseSection;
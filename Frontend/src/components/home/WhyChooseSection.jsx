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
    <section className="px-4.5 py-16 bg-[radial-gradient(circle_at_10%_20%,rgba(37,99,235,0.07),transparent_30%),linear-gradient(135deg,#f8fbff,#f0fdfa)] md:px-7 md:py-[85px] lg:px-[38px]">

      <div className="max-w-[1240px] mx-auto">

        {/* Header */}
        <div className="max-w-[650px] mx-auto text-center">

          <span className="text-[#2563EB] text-[11px] font-bold tracking-[1.5px] uppercase">
            WHY SMARTHEALTH
          </span>

          <h2 className="mt-1 text-[#0F172A] text-[34px] leading-[1.1] tracking-[-1.5px] md:text-[40px]">
            Healthcare that
            <span className="text-[#0D9488]"> works for you.</span>
          </h2>

          <p className="max-w-[590px] mt-4 mx-auto text-[#64748B] text-[13px] leading-[1.7]">
            We combine technology, trusted healthcare professionals,
            and a patient-first experience to make healthcare simpler.
          </p>

        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 mt-12.5 bg-white border border-[#E2E8F0] rounded-[18px] shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:grid-cols-2 md:grid-cols-4">

          {stats.map((stat, index) => (
            <div className="relative p-6.75 px-5 text-center border-b border-[#E2E8F0] last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0" key={stat.label}>

              <strong className="block" style={{ color: stat.color, fontSize: "28px", fontWeight: 800, letterSpacing: "-1px" }}>
                {stat.value}
              </strong>

              <span className="block mt-1.25 text-[#64748B] text-[10px] font-medium">
                {stat.label}
              </span>

            </div>
          ))}

        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 gap-4.5 mt-6.25 sm:grid-cols-2 lg:grid-cols-4">

          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div className="flex gap-3 p-5.5 bg-white/75 border border-[rgba(226,232,240,0.8)] rounded-xl transition-transform hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,0.07)]" key={benefit.title}>

                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl" style={{
                  color: benefit.color.text,
                  backgroundColor: benefit.color.bg
                }}>
                  <Icon size={21} />
                </div>

                <div className="flex-1">

                  <div className="flex items-center gap-1.25">
                    <CheckCircle2 size={14} className="text-[#16A34A]" />
                    <h3 className="text-[#0F172A] text-[12px] font-bold">{benefit.title}</h3>
                  </div>

                  <p className="mt-1.75 text-[#64748B] text-[10px] leading-[1.55]">
                    {benefit.description}
                  </p>

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
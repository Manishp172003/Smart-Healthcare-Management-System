import {
  Search,
  CalendarDays,
  ClipboardCheck,
  HeartPulse,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find a Doctor",
    description:
      "Search for doctors by specialty, location, or healthcare needs.",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Choose a Time",
    description:
      "View available schedules and choose a date and time that works for you.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Book Appointment",
    description:
      "Confirm your appointment securely and receive instant confirmation.",
  },
  {
    number: "04",
    icon: HeartPulse,
    title: "Get the Care",
    description:
      "Meet your doctor and keep your healthcare journey organized in one place.",
  },
];

const HowItWorks = () => {
  return (
    <div className="w-full px-4 md:px-7 max-w-[1440px] mx-auto">
      <div className="w-full bg-white border border-[#E2E8F0] rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.04)] p-8 md:p-12">

        {/* Header */}
        <div className="max-w-[650px] mx-auto text-center">

          <span className="text-[#64748B] text-[11px] font-bold tracking-[1.5px] uppercase">
            HOW IT WORKS
          </span>

          <h2 className="mt-1 text-[#0F172A] text-[34px] leading-[1.1] tracking-[-1.5px] md:text-[40px]">
            Healthcare in
            <span className="text-[#2563EB]"> four simple steps.</span>
          </h2>

          <p className="max-w-[580px] mt-4 mx-auto text-[#64748B] text-[13px] leading-[1.7]">
            From finding the right doctor to managing your
            appointment, SmartHealth keeps the entire process simple.
          </p>

        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-3.75 mt-9 md:grid-cols-2 md:gap-4.5 md:mt-13 lg:grid-cols-4 lg:gap-0">

          {steps.map((step, index) => {
            const Icon = step.icon;
            const iconColors = [
              'text-[#2563EB] bg-[rgba(37,99,235,0.08)]',
              'text-[#0D9488] bg-[rgba(13,148,136,0.09)]',
              'text-[#7c3aed] bg-[rgba(124,58,237,0.08)]',
              'text-[#d97706] bg-[rgba(245,158,11,0.1)]'
            ];

            return (
              <div className="relative flex items-center" key={step.number}>

                <div className="relative w-full min-h-auto p-5.5 bg-white border border-[#E2E8F0] rounded-[17px] transition-transform hover:-translate-y-1.5 hover:border-[rgba(37,99,235,0.18)] hover:shadow-[0_18px_35px_rgba(15,23,42,0.08)] md:min-h-[220px] md:p-6">

                  <div className="flex items-center justify-between mb-6.25">
                    <span className="text-[#cbd5e1] text-[13px] font-extrabold tracking-[1px]">
                      {step.number}
                    </span>

                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${iconColors[index]}`}>
                      <Icon size={23} />
                    </div>
                  </div>

                  <h3 className="text-[#0F172A] text-[15px] font-bold">{step.title}</h3>

                  <p className="mt-2.5 text-[#64748B] text-[11px] leading-[1.65]">{step.description}</p>

                </div>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="absolute right-[-18px] z-3 w-9 h-9 hidden lg:flex items-center justify-center text-[#2563EB] bg-white border border-[#E2E8F0] rounded-full shadow-[0_5px_15px_rgba(15,23,42,0.07)]">
                    <ArrowRight size={18} />
                  </div>
                )}

              </div>
            );
          })}

        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col items-start gap-5.75 mt-11.25 p-5.75 bg-gradient-to-br from-[#eff6ff] to-[#ecfdf5] border border-[#dbeafe] rounded-[17px] md:flex-row md:items-center md:justify-between md:gap-7.5 md:p-6 md:px-7.5">

          <div>
            <h3 className="text-[#0F172A] text-[16px] font-bold">Ready to take control of your healthcare?</h3>

            <p className="mt-1.25 text-[#64748B] text-[11px]">
              Find a doctor and book your appointment today.
            </p>
          </div>

          <button className="flex-shrink-0 flex items-center justify-center gap-2 p-3 px-4.5 text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none rounded-xl text-[11px] font-semibold shadow-[0_7px_18px_rgba(37,99,235,0.2)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(37,99,235,0.28)] w-full md:w-auto">
            Book an Appointment
            <ArrowRight size={17} />
          </button>

        </div>

      </div>
    </div>
  );
};

export default HowItWorks;
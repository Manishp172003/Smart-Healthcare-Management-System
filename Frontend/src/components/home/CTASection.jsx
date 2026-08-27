import {
  CalendarCheck,
  Search,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const CTASection = () => {
  return (
    <div className="w-full px-4 md:px-7 max-w-[1440px] mx-auto">
      <div className="relative w-full min-h-[420px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f4c81] via-[#2563eb] to-[#0d9488] rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.1)] md:min-h-[330px]">

        {/* Decorative background */}
        <div className="absolute top-[-140px] left-[-70px] w-[280px] h-[280px] border-[45px] border-[rgba(255,255,255,0.07)] rounded-full pointer-events-none" />
        <div className="absolute right-[-150px] bottom-[-190px] w-[350px] h-[350px] border-[55px] border-[rgba(255,255,255,0.07)] rounded-full pointer-events-none" />

        <div className="relative z-2 max-w-[700px] p-10 px-5 text-center md:p-12 md:px-7.5">

          <span className="inline-block text-[rgba(255,255,255,0.75)] text-[10px] font-bold tracking-[1.8px]">
            START YOUR HEALTHCARE JOURNEY
          </span>

          <h2 className="mt-2.5 text-white text-[32px] leading-[1.1] tracking-[-1.5px] md:text-[40px]">
            Your health deserves
            <span className="text-[#a7f3d0]"> better care.</span>
          </h2>

          <p className="max-w-[590px] mt-3.75 mx-auto text-[rgba(255,255,255,0.82)] text-[13px] leading-[1.7]">
            Find trusted healthcare professionals, book appointments,
            and manage your healthcare journey with SmartHealth.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 mt-6.25 md:flex-row">

            <button className="flex items-center justify-center gap-2 p-3 px-4.5 text-[#0f4c81] bg-white border-none rounded-lg text-[10px] font-bold shadow-[0_8px_20px_rgba(15,23,42,0.14)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(15,23,42,0.2)] w-full md:w-auto">
              <CalendarCheck size={18} />
              Book an Appointment
              <ArrowRight size={16} />
            </button>

            <button className="flex items-center justify-center gap-2 p-3 px-4.5 text-white bg-white/10 border border-[rgba(255,255,255,0.35)] rounded-lg text-[10px] font-bold transition-transform hover:-translate-y-0.5 hover:bg-white/16 w-full md:w-auto">
              <Search size={18} />
              Find a Doctor
            </button>

          </div>

          <div className="flex flex-col items-center justify-center gap-2.5 mt-6.25 md:flex-row md:gap-6.25">

            <div className="flex items-center gap-1.25 text-[rgba(255,255,255,0.75)] text-[9px]">
              <ShieldCheck size={16} className="text-[#a7f3d0]" />
              Secure & Private
            </div>

            <div className="flex items-center gap-1.25 text-[rgba(255,255,255,0.75)] text-[9px]">
              <ShieldCheck size={16} className="text-[#a7f3d0]" />
              Trusted Doctors
            </div>

            <div className="flex items-center gap-1.25 text-[rgba(255,255,255,0.75)] text-[9px]">
              <ShieldCheck size={16} className="text-[#a7f3d0]" />
              Easy Booking
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CTASection;
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  FileHeart,
} from "lucide-react";

const AboutSection = () => {
  return (
    <div className="w-full px-4 md:px-7 max-w-[1440px] mx-auto" id="about">
      <div className="w-full bg-white border border-[#E2E8F0] rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.04)] p-8 md:p-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[48%_52%] lg:gap-16">

        {/* Image */}
        <div className="relative min-h-[280px] overflow-hidden rounded-[22px] bg-[#e8f4f7] shadow-[0_15px_40px_rgba(15,23,42,0.08)] md:min-h-[350px] lg:min-h-[390px]">
          <img
            src="/images/about-healthcare.png"
            alt="Healthcare professional providing care"
            className="w-full h-full min-h-[280px] object-cover md:min-h-[350px] lg:min-h-[390px]"
          />

          <div className="absolute left-5 bottom-5 flex items-center gap-2.5 p-3 px-3.75 bg-white/94 border border-[rgba(226,232,240,0.8)] rounded-xl shadow-[0_8px_25px_rgba(15,23,42,0.12)] backdrop-blur-md text-[#0D9488]">
            <ShieldCheck size={20} />

            <div className="flex flex-col">
              <strong className="text-[#0F172A] text-[11px]">Trusted Care</strong>
              <span className="mt-0.5 text-[#64748B] text-[9px]">Your health matters to us</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-full lg:max-w-[560px] flex flex-col items-start gap-5">

          <div>
            <span className="inline-block mb-2 text-[#0D9488] text-xs font-bold tracking-[2px] uppercase">
              ABOUT SMARTHEALTH
            </span>

            <h2 className="text-[#0F172A] text-3xl md:text-4xl lg:text-[46px] font-extrabold leading-[1.12] tracking-tight">
              Better Care.
              <br />
              <span className="text-[#0D9488]">Better Health.</span>
            </h2>
          </div>

          <p className="text-[#64748B] text-sm md:text-base leading-relaxed">
            SmartHealth connects you with verified healthcare professionals. Manage appointments, consult expert doctors, and access your secure records—all in one place.
          </p>

          {/* Benefits */}
          <div className="w-full flex flex-col gap-5 mt-3 border-l-2 border-slate-100 pl-4 md:pl-5">

            <div className="flex items-center gap-3.5">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-[#0D9488] bg-[rgba(13,148,136,0.08)] rounded-xl">
                <CalendarCheck size={22} />
              </div>

              <div>
                <h4 className="text-[#0F172A] text-sm md:text-base font-bold">Easy Appointment Booking</h4>
                <p className="mt-0.5 text-[#64748B] text-xs md:text-sm">Find and book appointments with instant slot confirmation.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-[#0D9488] bg-[rgba(13,148,136,0.08)] rounded-xl">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h4 className="text-[#0F172A] text-sm md:text-base font-bold">Trusted Healthcare</h4>
                <p className="mt-0.5 text-[#64748B] text-xs md:text-sm">Consult directly with verified, board-certified medical experts.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-[#0D9488] bg-[rgba(13,148,136,0.08)] rounded-xl">
                <FileHeart size={22} />
              </div>

              <div>
                <h4 className="text-[#0F172A] text-sm md:text-base font-bold">Secure Health Records</h4>
                <p className="mt-0.5 text-[#64748B] text-xs md:text-sm">Keep your prescriptions and reports organized and safe.</p>
              </div>
            </div>

          </div>

          <button className="flex items-center gap-2 mt-2 p-3.5 px-6 text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none rounded-xl text-xs md:text-sm font-bold shadow-[0_7px_18px_rgba(37,99,235,0.18)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(37,99,235,0.25)]">
            Learn More
            <ArrowRight size={17} />
          </button>

        </div>

      </div>
    </div>
  );
};

export default AboutSection;
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  FileHeart,
} from "lucide-react";

const AboutSection = () => {
  return (
    <section className="px-4.5 py-14 bg-[#F8FAFC] md:px-7 md:py-16 lg:px-[38px] lg:py-[75px]" id="about">

      <div className="max-w-[1240px] mx-auto grid grid-cols-1 items-center gap-10 lg:grid-cols-[48%_52%] lg:gap-16">

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
        <div className="max-w-full lg:max-w-[560px]">

          <span className="inline-block mb-3 text-[#0D9488] text-[11px] font-bold tracking-[1.5px]">
            ABOUT SMARTHEALTH
          </span>

          <h2 className="text-[#0F172A] text-[34px] leading-[1.1] tracking-[-1.5px] md:text-[42px] md:leading-[1.08]">
            Better Care.
            <br />
            <span className="text-[#0D9488]">Better Health.</span>
          </h2>

          <p className="mt-4.5 text-[#64748B] text-[13px] leading-[1.7] md:text-[14px]">
            SmartHealth makes healthcare simpler, more accessible,
            and more connected. Our platform brings patients and
            healthcare professionals together in one secure place.
          </p>

          <p className="mt-4.5 text-[#64748B] text-[13px] leading-[1.7] md:text-[14px]">
            From finding the right doctor to booking appointments
            and managing medical records, everything you need is
            just a few clicks away.
          </p>

          {/* Benefits */}
          <div className="flex flex-col gap-4 mt-6.5">

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-9.5 h-9.5 flex items-center justify-center text-[#0D9488] bg-[rgba(13,148,136,0.08)] rounded-xl">
                <CalendarCheck size={19} />
              </div>

              <div>
                <h4 className="text-[#0F172A] text-[12px] font-bold">Easy Appointment Booking</h4>
                <p className="mt-0.75 text-[#64748B] text-[10px]">Find and book appointments effortlessly.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-9.5 h-9.5 flex items-center justify-center text-[#0D9488] bg-[rgba(13,148,136,0.08)] rounded-xl">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h4 className="text-[#0F172A] text-[12px] font-bold">Trusted Healthcare</h4>
                <p className="mt-0.75 text-[#64748B] text-[10px]">Connect with verified healthcare professionals.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-9.5 h-9.5 flex items-center justify-center text-[#0D9488] bg-[rgba(13,148,136,0.08)] rounded-xl">
                <FileHeart size={19} />
              </div>

              <div>
                <h4 className="text-[#0F172A] text-[12px] font-bold">Secure Health Records</h4>
                <p className="mt-0.75 text-[#64748B] text-[10px]">Keep your medical information organized.</p>
              </div>
            </div>

          </div>

          <button className="flex items-center gap-2 mt-7 p-2.75 px-4.25 text-white bg-gradient-to-br from-[#0D9488] to-[#0f766e] border-none rounded-xl text-[11px] font-semibold shadow-[0_7px_18px_rgba(13,148,136,0.2)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(13,148,136,0.28)]">
            Learn More
            <ArrowRight size={17} />
          </button>

        </div>

      </div>

    </section>
  );
};

export default AboutSection;
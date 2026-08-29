import React from "react";
import {
  ShieldCheck,
  CalendarCheck,
  UserRoundCheck,
  FileHeart,
} from "lucide-react";

import heroBg from "../../assets/About-Section/Hero-Section.png";

const Hero = () => {
  return (
    <section 
     className="relative w-full min-h-screen flex items-center bg-no-repeat bg-[length:auto_78%] md:bg-cover pt-20 md:pt-24 pb-20 overflow-hidden mt-0"
            style={{
            backgroundImage: `url(${heroBg})`,
            backgroundPosition: "right 10px"
}}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center">

        {/* Hero Content Box */}
        <div className="w-full max-w-full lg:w-[52%] xl:w-[48%] py-4">

          <span className="inline-block mb-3.5 text-[#0D9488] text-xs font-bold tracking-[2px] uppercase">
            SMART HEALTHCARE PLATFORM
          </span>

          <h1 className="text-[#0F172A] text-4xl font-extrabold tracking-tight leading-[1.1] md:text-5xl lg:text-[56px]">
            Better Health
            <br />
            <span className="text-[#0D9488]">Brighter Future</span>
          </h1>

          

          {/* CTA Buttons */}
          <div className="flex items-center gap-3.5 mt-7 flex-wrap">
            <button className="flex items-center justify-center gap-2 p-3.5 px-6 rounded-xl text-xs font-semibold text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none shadow-[0_7px_18px_rgba(37,99,235,0.22)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(37,99,235,0.3)]">
              <CalendarCheck size={18} />
              Book Appointment
            </button>

            <button className="flex items-center justify-center gap-2 p-3.5 px-6 rounded-xl text-xs font-semibold text-[#2563EB] bg-white border border-[rgba(37,99,235,0.25)] shadow-sm transition-transform hover:-translate-y-0.5 hover:border-[#2563EB]">
              <UserRoundCheck size={18} />
              Find a Doctor
            </button>
          </div>

          {/* Trust Features Grid */}
          <div className="grid grid-cols-2 gap-4 max-w-[500px] mt-10 md:gap-[20px_24px]">

            <div className="flex items-center gap-3 bg-white/85 p-2.5 rounded-xl backdrop-blur-md border border-slate-100/90 shadow-sm">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-[#0D9488] bg-white border border-[rgba(13,148,136,0.14)] rounded-lg shadow-sm">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-[#0F172A] text-xs font-bold md:text-sm">Trusted & Secure</h4>
                <p className="mt-0.5 text-[#64748B] text-[10px] md:text-xs">Data protected</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/85 p-2.5 rounded-xl backdrop-blur-md border border-slate-100/90 shadow-sm">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-[#0D9488] bg-white border border-[rgba(13,148,136,0.14)] rounded-lg shadow-sm">
                <CalendarCheck size={20} />
              </div>
              <div>
                <h4 className="text-[#0F172A] text-xs font-bold md:text-sm">Easy Booking</h4>
                <p className="mt-0.5 text-[#64748B] text-[10px] md:text-xs">Few quick clicks</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/85 p-2.5 rounded-xl backdrop-blur-md border border-slate-100/90 shadow-sm">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-[#0D9488] bg-white border border-[rgba(13,148,136,0.14)] rounded-lg shadow-sm">
                <UserRoundCheck size={20} />
              </div>
              <div>
                <h4 className="text-[#0F172A] text-xs font-bold md:text-sm">Expert Doctors</h4>
                <p className="mt-0.5 text-[#64748B] text-[10px] md:text-xs">Verified specialists</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/85 p-2.5 rounded-xl backdrop-blur-md border border-slate-100/90 shadow-sm">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-[#0D9488] bg-white border border-[rgba(13,148,136,0.14)] rounded-lg shadow-sm">
                <FileHeart size={20} />
              </div>
              <div>
                <h4 className="text-[#0F172A] text-xs font-bold md:text-sm">Health Records</h4>
                <p className="mt-0.5 text-[#64748B] text-[10px] md:text-xs">Access anytime</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
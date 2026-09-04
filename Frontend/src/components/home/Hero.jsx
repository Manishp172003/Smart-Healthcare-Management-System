import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  CalendarCheck,
  UserRoundCheck,
  FileHeart,
} from "lucide-react";

import heroBg1 from "../../assets/About-Section/Hero-Section.png";
import heroBg2 from "../../assets/About-Section/Hero-Section-2.png";
import heroBg3 from "../../assets/About-Section/Hero-Section-3.png";
import heroMobileBg from "../../assets/About-Section/Hero-Mobile.png";

const desktopHeroImages = [heroBg1, heroBg2, heroBg3];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-rotate hero background every 5.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % desktopHeroImages.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center pt-24 md:pt-24 pb-16 md:pb-20 overflow-hidden mt-0">
      
      {/* Mobile Background: Single Portrait Cover */}
      <div 
        className="absolute inset-0 md:hidden z-0"
        style={{
          backgroundImage: `url('${heroMobileBg}')`,
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Desktop Backgrounds: GPU-accelerated Cross-Fade */}
      {desktopHeroImages.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 hidden md:block transition-opacity duration-1000 ease-in-out z-0 pointer-events-none"
          style={{
            backgroundImage: `url('${img}')`,
            backgroundPosition: 'right 10px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity: activeSlide === index ? 1 : 0,
          }}
        />
      ))}

      {/* Subtle dark contrast overlay for desktop readability */}
      <div className="absolute inset-0 bg-slate-900/35 hidden md:block z-0 pointer-events-none" />

      {/* Hero Content Container (Statically Anchored - Zero Layout Jitter) */}
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-6 md:px-12 relative z-10 flex flex-col justify-center pt-[36vh] sm:pt-[40vh] md:pt-0">

        {/* Hero Content Box */}
        <div className="w-full max-w-full lg:w-[52%] xl:w-[48%] py-4">

          <span 
            className="inline-block mb-2.5 sm:mb-3.5 text-[#0D9488] text-[11px] sm:text-xs font-bold tracking-[2px] uppercase animate-fadeInUp" 
            style={{ animationDelay: '0.2s' }}
          >
            SMART HEALTHCARE PLATFORM
          </span>

          <h1 
            className="text-[#0F172A] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.15] md:leading-[1.1] animate-fadeInUp drop-shadow-xs" 
            style={{ animationDelay: '0.4s' }}
          >
            Better Health
            <br />
            <span className="text-[#0D9488]">Brighter Future</span>
          </h1>

          {/* CTA Buttons */}
          <div 
            className="flex items-center gap-3 mt-6 sm:mt-7 flex-wrap sm:flex-nowrap animate-fadeInUp" 
            style={{ animationDelay: '0.6s' }}
          >
            <Link 
              to="/appointment" 
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 p-3 sm:p-3.5 px-4 sm:px-6 rounded-xl text-xs font-bold text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none shadow-[0_7px_18px_rgba(37,99,235,0.22)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(37,99,235,0.3)] whitespace-nowrap"
            >
              <CalendarCheck size={17} />
              <span>Book Appointment</span>
            </Link>

            <Link 
              to="/doctors" 
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 p-3 sm:p-3.5 px-4 sm:px-6 rounded-xl text-xs font-bold text-[#2563EB] bg-white border border-[rgba(37,99,235,0.25)] shadow-sm transition-transform hover:-translate-y-0.5 hover:border-[#2563EB] whitespace-nowrap"
            >
              <UserRoundCheck size={17} />
              <span>Find a Doctor</span>
            </Link>
          </div>

          {/* Trust Features Grid */}
          <div 
            className="grid grid-cols-2 gap-3 sm:gap-4 max-w-[500px] mt-8 sm:mt-10 md:gap-[20px_24px] animate-fadeInUp" 
            style={{ animationDelay: '0.8s' }}
          >

            <div className="flex items-center gap-2.5 sm:gap-3 bg-white/90 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl backdrop-blur-md border border-slate-200/80 shadow-xs">
              <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#0D9488] bg-teal-50 border border-[rgba(13,148,136,0.2)] rounded-lg shadow-xs">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="text-[#0F172A] text-xs font-bold md:text-sm leading-tight">Trusted & Secure</h4>
                <p className="mt-0.5 text-[#64748B] text-[10px] md:text-xs">Data protected</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 bg-white/90 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl backdrop-blur-md border border-slate-200/80 shadow-xs">
              <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#0D9488] bg-teal-50 border border-[rgba(13,148,136,0.2)] rounded-lg shadow-xs">
                <CalendarCheck size={18} />
              </div>
              <div>
                <h4 className="text-[#0F172A] text-xs font-bold md:text-sm leading-tight">Easy Booking</h4>
                <p className="mt-0.5 text-[#64748B] text-[10px] md:text-xs">Few quick clicks</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 bg-white/90 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl backdrop-blur-md border border-slate-200/80 shadow-xs">
              <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#0D9488] bg-teal-50 border border-[rgba(13,148,136,0.2)] rounded-lg shadow-xs">
                <UserRoundCheck size={18} />
              </div>
              <div>
                <h4 className="text-[#0F172A] text-xs font-bold md:text-sm leading-tight">Expert Doctors</h4>
                <p className="mt-0.5 text-[#64748B] text-[10px] md:text-xs">Verified specialists</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 bg-white/90 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl backdrop-blur-md border border-slate-200/80 shadow-xs">
              <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#0D9488] bg-teal-50 border border-[rgba(13,148,136,0.2)] rounded-lg shadow-xs">
                <FileHeart size={18} />
              </div>
              <div>
                <h4 className="text-[#0F172A] text-xs font-bold md:text-sm leading-tight">Health Records</h4>
                <p className="mt-0.5 text-[#64748B] text-[10px] md:text-xs">Access anytime</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Desktop Slide Navigation Dots */}
      <div className="hidden md:flex items-center gap-2.5 absolute bottom-8 right-12 z-20 bg-slate-900/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
        {desktopHeroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeSlide === index 
                ? "w-7 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.6)]" 
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
};

export default Hero;
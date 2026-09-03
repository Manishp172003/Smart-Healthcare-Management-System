import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  FileHeart,
  Users,
  Award,
  Clock,
  Smile,
} from "lucide-react";

// --- COUNTER COMPONENT ---
// A reusable component to handle the smooth count-up animation
const CounterItem = ({ 
  end, 
  duration = 2000, 
  label, 
  icon: Icon, 
  suffix = "+",
  iconColor = "text-blue-600",
  iconBg = "bg-blue-50/90 border-blue-100"
}) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => {
      if (nodeRef.current) observer.unobserve(nodeRef.current);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out expo formula for a smooth finish
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return (
    <div ref={nodeRef} className="flex items-center gap-4 p-5 md:p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300">
      <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl border ${iconColor} ${iconBg}`}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-[#0F172A] text-2xl md:text-3xl font-extrabold tracking-tight">
          {count.toLocaleString()}{suffix}
        </h3>
        <p className="text-[#64748B] text-xs md:text-sm font-medium mt-0.5">{label}</p>
      </div>
    </div>
  );
};

// --- STATS / COUNTER SECTION ---
const StatsSection = () => {
  return (
    <div className="w-full px-4 md:px-7 max-w-[1440px] mx-auto mb-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <CounterItem 
          end={15000} 
          label="Active Patients" 
          icon={Users} 
          suffix="+" 
          iconColor="text-blue-600" 
          iconBg="bg-blue-50/90 border-blue-100" 
        />
        <CounterItem 
          end={250} 
          label="Expert Doctors" 
          icon={Award} 
          suffix="+" 
          iconColor="text-teal-600" 
          iconBg="bg-teal-50/90 border-teal-100" 
        />
        <CounterItem 
          end={98} 
          label="Satisfaction Rate" 
          icon={Smile} 
          suffix="%" 
          iconColor="text-amber-500" 
          iconBg="bg-amber-50/90 border-amber-100" 
        />
        <CounterItem 
          end={24} 
          label="Hours Support" 
          icon={Clock} 
          suffix="/7" 
          iconColor="text-indigo-600" 
          iconBg="bg-indigo-50/90 border-indigo-100" 
        />
      </div>
    </div>
  );
};

// --- ABOUT SECTION ---
const AboutSection = () => {
  return (
    <>
      {/* Counter Section placed right before the About Section */}
      <StatsSection />

      <div className="w-full px-4 md:px-7 max-w-[1440px] mx-auto py-6 md:py-12" id="about">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[48%_52%] lg:gap-16">

          {/* Image */}
          <div className="relative min-h-[300px] overflow-hidden rounded-3xl bg-slate-100 shadow-[0_15px_40px_rgba(15,23,42,0.08)] border border-slate-200/70 md:min-h-[370px] lg:min-h-[420px] group">
            <img
              src="/images/about-healthcare.png"
              alt="Healthcare professional providing care"
              className="w-full h-full min-h-[300px] object-cover md:min-h-[370px] lg:min-h-[420px] group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute left-5 bottom-5 flex items-center gap-2.5 p-3 px-4 bg-white/95 border border-slate-200/80 rounded-2xl shadow-xl backdrop-blur-md text-teal-600">
              <ShieldCheck size={20} />

              <div className="flex flex-col">
                <strong className="text-[#0F172A] text-xs font-bold">Trusted Care</strong>
                <span className="mt-0.5 text-[#64748B] text-[10px]">Your health matters to us</span>
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

            {/* Benefits with Multi-Accent Colors */}
            <div className="w-full flex flex-col gap-4 mt-2 border-l-2 border-slate-100 pl-4 md:pl-5">

              <div className="flex items-center gap-3.5">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-blue-600 bg-blue-50 border border-blue-100 rounded-2xl shadow-sm">
                  <CalendarCheck size={22} />
                </div>

                <div>
                  <h4 className="text-[#0F172A] text-sm md:text-base font-bold">Easy Appointment Booking</h4>
                  <p className="mt-0.5 text-[#64748B] text-xs md:text-sm">Find and book appointments with instant slot confirmation.</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-teal-600 bg-teal-50 border border-teal-100 rounded-2xl shadow-sm">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <h4 className="text-[#0F172A] text-sm md:text-base font-bold">Trusted Healthcare</h4>
                  <p className="mt-0.5 text-[#64748B] text-xs md:text-sm">Consult directly with verified, board-certified medical experts.</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm">
                  <FileHeart size={22} />
                </div>

                <div>
                  <h4 className="text-[#0F172A] text-sm md:text-base font-bold">Secure Health Records</h4>
                  <p className="mt-0.5 text-[#64748B] text-xs md:text-sm">Keep your prescriptions and reports organized and safe.</p>
                </div>
              </div>

            </div>

            <Link 
              to="/about"
              className="inline-flex items-center gap-2 mt-2 p-3.5 px-6 text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none rounded-xl text-xs md:text-sm font-bold shadow-[0_7px_18px_rgba(37,99,235,0.18)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(37,99,235,0.25)]"
            >
              Learn More
              <ArrowRight size={17} />
            </Link>

          </div>

        </div>
      </div>
    </>
  );
};

export default AboutSection;
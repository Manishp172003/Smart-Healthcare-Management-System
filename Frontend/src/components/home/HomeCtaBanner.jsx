import { Link } from "react-router-dom";
import { 
  CalendarCheck, 
  Stethoscope, 
  PhoneCall, 
  ShieldCheck, 
  Zap, 
  Star,
  ArrowRight
} from "lucide-react";

const HomeCtaBanner = () => {
  return (
    <div className="w-full px-4 md:px-7 max-w-[1440px] mx-auto my-2">
      <div className="w-full rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0D9488] p-8 md:p-12 lg:p-14 text-white relative overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.15)] border border-slate-700/60">
        
        {/* Subtle decorative background glow circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-1 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          
          {/* Left Column: Messaging & Trust Badges */}
          <div className="max-w-2xl space-y-4">
            
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-teal-200 text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
              </span>
              <span>24/7 Patient-First Healthcare</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-white leading-[1.15]">
              Your Health Deserves Exceptional Care. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-teal-200 via-teal-300 to-white bg-clip-text text-transparent">
                Get Started Today.
              </span>
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
              Join thousands of patients who trust SmartHealth for verified clinical appointments, real-time schedule tracking, and encrypted digital medical archives.
            </p>

            {/* Micro Trust Indicators */}
            <div className="flex items-center gap-4 sm:gap-6 pt-2 text-xs font-medium text-slate-300 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Zap size={14} className="text-amber-400" />
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-teal-400" />
                <span>HIPAA & ISO Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span>4.9/5 Patient Satisfaction</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Converting Action Buttons & Hotline */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0 lg:w-72">
            
            <Link
              to="/appointment"
              className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#0D9488] hover:from-blue-600 hover:to-teal-600 text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 group"
            >
              <CalendarCheck size={18} />
              <span>Book Appointment</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/doctors"
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              <Stethoscope size={18} className="text-teal-300" />
              <span>Explore Specialists</span>
            </Link>

            {/* Emergency Hotline Strip */}
            <div className="pt-2 border-t border-white/10 text-center lg:text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                Immediate Clinical Assistance
              </span>
              <a 
                href="tel:+919876543210" 
                className="inline-flex items-center gap-2 text-xs font-bold text-teal-300 hover:text-white transition-colors"
              >
                <PhoneCall size={14} className="text-teal-400 animate-pulse" />
                <span>+91 98765 43210 (24/7 Helpline)</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default HomeCtaBanner;

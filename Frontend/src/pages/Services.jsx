import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Calendar,
  FileText,
  Pill,
  HeartPulse,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  UserCheck,
  Lock,
  Activity,
  Sparkles,
  ChevronRight,
  HelpCircle
} from "lucide-react";

// Import your local assets for the Hero and Smart Healthcare sections
import heroServicesImg from "../assets/About-Section/Hero-Services -Img.png";
// Update this path/filename to match your actual local image file in your assets folder:
import smartHealthcareImg from "../assets/About-Section/Hero-Two.png"; 

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Services = () => {
  const navigate = useNavigate();

  // Services data array for Overview section
  const servicesList = [
    {
      id: "find-doctors",
      title: "Find Doctors",
      description: "Discover verified healthcare professionals based on specialty, experience, availability, and patient needs.",
      icon: Stethoscope,
      link: "/doctors",
      badge: "Verified Specialists",
      iconBg: "bg-teal-50 text-[#0D9488] border-teal-100 group-hover:bg-[#0D9488] group-hover:text-white"
    },
    {
      id: "appointment-booking",
      title: "Appointment Booking",
      description: "Schedule appointments with your preferred doctor quickly and conveniently.",
      icon: Calendar,
      link: "/appointment",
      badge: "Instant Confirm",
      iconBg: "bg-blue-50 text-[#2563EB] border-blue-100 group-hover:bg-[#2563EB] group-hover:text-white"
    },
    {
      id: "doctor-consultation",
      title: "Doctor Consultation",
      description: "Connect with healthcare professionals and get personalized medical guidance.",
      icon: HeartPulse,
      link: "/doctors",
      badge: "Expert Care",
      iconBg: "bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-600 group-hover:text-white"
    },
    {
      id: "health-records",
      title: "Health Records",
      description: "Keep important healthcare information organized and accessible in one secure place.",
      icon: FileText,
      link: "/patient/dashboard?tab=Medical Records",
      badge: "HIPAA Safe",
      iconBg: "bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-600 group-hover:text-white"
    },
    {
      id: "medication-support",
      title: "Medication Support",
      description: "Stay organized with medication-related information and healthcare reminders.",
      icon: Pill,
      link: "/patient/dashboard?tab=Profile",
      badge: "Smart Reminders",
      iconBg: "bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-600 group-hover:text-white"
    },
    {
      id: "healthcare-assistance",
      title: "Healthcare Assistance",
      description: "Get support throughout your healthcare journey whenever you need it.",
      icon: HelpCircle,
      link: "/contact",
      badge: "24/7 Support",
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white"
    }
  ];

  // Why choose us blocks enhanced with highlight badges and accent themes
  const whyChooseUs = [
    {
      number: "01",
      title: "Trusted Professionals",
      description: "Connect seamlessly with board-certified, qualified, and thoroughly verified healthcare professionals.",
      icon: UserCheck,
      badge: "Verified Experts",
      gradient: "from-teal-500/10 via-cyan-500/5 to-transparent",
      iconBg: "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
    },
    {
      number: "02",
      title: "Easy Access",
      description: "Find the exact healthcare support you need instantly without any unnecessary complexity or wait times.",
      icon: Clock,
      badge: "24/7 Availability",
      gradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
      iconBg: "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30"
    },
    {
      number: "03",
      title: "Secure & Private",
      description: "Keep your sensitive healthcare records and medical history protected behind state-of-the-art security layers.",
      icon: Lock,
      badge: "HIPAA Compliant",
      gradient: "from-blue-500/10 via-teal-500/5 to-transparent",
      iconBg: "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
    },
    {
      number: "04",
      title: "Patient-Focused",
      description: "An intuitive experience custom-built to make your entire healthcare journey simpler, clearer, and more convenient.",
      icon: Activity,
      badge: "User Centric",
      gradient: "from-teal-600/10 via-emerald-500/5 to-transparent",
      iconBg: "bg-slate-900 text-teal-400 shadow-lg shadow-slate-900/20"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-['Poppins',sans-serif] text-slate-800 antialiased selection:bg-cyan-500 selection:text-white">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >

      {/* 1. HERO SECTION (Full Background Image with Dark Contrast Overlay & Poppins Font) */}
      <section className="relative w-full min-h-[480px] sm:min-h-[560px] lg:h-[85vh] overflow-hidden bg-slate-950 flex items-center justify-center pt-[85px] sm:pt-[95px] pb-12 sm:pb-16 text-white font-['Poppins',sans-serif]">
        {/* Background Image spanning the entire Hero Section */}
        <div className="absolute inset-0 -z-25">
          <img 
            src={heroServicesImg} 
            alt="Healthcare Services Background" 
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
        </div>

        {/* Balanced Dark Overlay so centered text stands out cleanly across the full image */}
        <div className="absolute inset-0 bg-slate-950/65 -z-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/75 -z-20" />

        {/* Subtle background glow accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6 sm:space-y-8 text-center"
          >

            {/* Headline with Responsive Font Size */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2] font-['Poppins',sans-serif]">
              Designed Around <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">You</span> & Your Well-being
            </h1>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2 w-full max-w-sm mx-auto sm:max-w-none">
              <Link 
                to="/doctors" 
                className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-teal-400 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-base font-['Poppins',sans-serif]"
              >
                Find the Right Doctor
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <a 
                href="#services-overview" 
                className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl bg-white/15 border border-white/25 text-white font-medium hover:bg-white/25 transition-all duration-200 shadow-sm backdrop-blur-md text-xs sm:text-base font-['Poppins',sans-serif] flex items-center justify-center"
              >
                Explore Services
              </a>
            </div>

            {/* Trust Indicators / Mini Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 pt-6 sm:pt-8 border-t border-white/10 font-['Poppins',sans-serif] w-full max-w-2xl mx-auto">
              <div className="flex items-center gap-3 bg-white/5 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none border border-white/10 sm:border-0 text-left">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                  <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Verified Experts</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400">Top-rated professionals</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none border border-white/10 sm:border-0 text-left">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Quick Booking</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400">Instant scheduling</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none border border-white/10 sm:border-0 text-left">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">100% Secure</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400">Protected health data</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW (Structured Modern Cards) */}
      <section id="services-overview" className="py-12 sm:py-16 md:py-24 bg-[#F8FAFC] border-b border-slate-200/60 font-['Poppins',sans-serif] scroll-mt-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-[650px] mx-auto mb-10 sm:mb-14 md:mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/70 text-[#0D9488] text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>Healthcare Services</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Everything You Need for <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">Better Healthcare</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
              Access essential healthcare services through one simple and secure platform.
            </p>
          </div>

          {/* Responsive Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {servicesList.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] hover:border-teal-200 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Glow bar on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Card Header: Icon & Micro Badge */}
                    <div className="flex items-center justify-between mb-4 sm:mb-5">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border ${service.iconBg} flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-full">
                        {service.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 group-hover:text-[#0D9488] transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2 sm:mt-2.5 mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0D9488] group-hover:text-[#0f766e] transition-colors"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                    <span className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-teal-50 flex items-center justify-center text-slate-400 group-hover:text-[#0D9488] transition-colors">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
      {/* 4. WHY CHOOSE OUR SERVICES (Redesigned Bento Section) */}
      <section className="relative py-28 overflow-hidden bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-50 font-['Poppins',sans-serif]">
        
        {/* Background ambient glowing shapes */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
              <span>The Platform Advantage</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.2]">
              Why Patients Choose <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">Our Platform</span>
            </h2>
            
            <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
              Designed to offer transparency, safety, and utmost convenience throughout your health journey.
            </p>
          </div>

          {/* Modern Bento Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-[28px] border border-slate-200/80 p-6 sm:p-7 md:p-8 shadow-md shadow-slate-200/40 flex flex-col justify-between overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
                >
                  {/* Soft gradient background fill on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                  {/* Big Background Number watermark */}
                  <div className="absolute top-3 right-5 text-4xl sm:text-5xl font-black text-slate-100 group-hover:text-cyan-100/60 transition-colors select-none">
                    {item.number}
                  </div>

                  <div className="relative z-10 space-y-4 sm:space-y-6">
                    {/* Top Bar: Icon & Small Pill Badge */}
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${item.iconBg}`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-cyan-50 group-hover:text-cyan-700 transition-colors border border-slate-200/60">
                        {item.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2 sm:space-y-3">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom interactive indicator line */}
                  <div className="relative z-10 pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-cyan-600 transition-colors">
                    <span>Learn more</span>
                    <ShieldCheck className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20 font-['Poppins',sans-serif]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl sm:rounded-[32px] overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-blue-950 p-6 sm:p-10 md:p-16 text-white shadow-2xl text-center md:text-left"
        >
          {/* Subtle glowing decorative circles */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4 max-w-xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.2]">
                Take the Next Step Toward Better Healthcare
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                Find trusted doctors, manage appointments, and experience a smarter way to manage your healthcare.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
              <Link 
                to="/doctors" 
                className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-teal-400 transition-all text-center text-xs sm:text-base"
              >
                Find a Doctor
              </Link>
              <a 
                href="#services-overview" 
                className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-white font-medium hover:bg-white/25 transition-all text-center text-xs sm:text-base flex items-center justify-center"
              >
                Explore Services
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>

    <Footer />
    </div>
  );
};

export default Services;
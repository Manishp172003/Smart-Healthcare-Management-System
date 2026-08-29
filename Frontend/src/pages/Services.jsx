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
      link: "/doctors"
    },
    {
      id: "appointment-booking",
      title: "Appointment Booking",
      description: "Schedule appointments with your preferred doctor quickly and conveniently.",
      icon: Calendar,
      link: "/appointments"
    },
    {
      id: "doctor-consultation",
      title: "Doctor Consultation",
      description: "Connect with healthcare professionals and get personalized medical guidance.",
      icon: HeartPulse,
      link: "/consultations"
    },
    {
      id: "health-records",
      title: "Health Records",
      description: "Keep important healthcare information organized and accessible in one secure place.",
      icon: FileText,
      link: "/records"
    },
    {
      id: "medication-support",
      title: "Medication Support",
      description: "Stay organized with medication-related information and healthcare reminders.",
      icon: Pill,
      link: "/medications"
    },
    {
      id: "healthcare-assistance",
      title: "Healthcare Assistance",
      description: "Get support throughout your healthcare journey whenever you need it.",
      icon: HelpCircle,
      link: "/support"
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

      {/* 1. HERO SECTION (Full Background Image with Dark Contrast Overlay & Poppins Font) */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-36 lg:pt-40 lg:pb-48 text-white font-['Poppins',sans-serif]">
        {/* Background Image spanning the entire Hero Section */}
        <div className="absolute inset-0 -z-25">
          <img 
            src={heroServicesImg} 
            alt="Healthcare Services Background" 
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
        </div>

        {/* Strong Dark Gradient Overlay so text stands out perfectly */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-teal-950/60 -z-20" />

        {/* Subtle background glow accents */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-8"
          >
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-inner font-['Poppins',sans-serif]">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Our Services</span>
            </div>

            {/* Headline with Decreased Font Size */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2] font-['Poppins',sans-serif]">
              Designed Around <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">You</span> & Your Well-being
            </h1>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link 
                to="/doctors" 
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-teal-400 transition-all duration-300 flex items-center gap-2.5 text-base font-['Poppins',sans-serif]"
              >
                Find the Right Doctor
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/appointments" 
                className="px-8 py-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-slate-900 transition-all duration-300 text-base shadow-sm font-['Poppins',sans-serif]"
              >
                Explore Services
              </Link>
            </div>

            {/* Trust Indicators / Mini Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10 font-['Poppins',sans-serif]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Verified Experts</h4>
                  <p className="text-xs text-slate-400">Top-rated professionals</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Quick Booking</h4>
                  <p className="text-xs text-slate-400">Instant scheduling</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">100% Secure</h4>
                  <p className="text-xs text-slate-400">Protected health data</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 2. SERVICES OVERVIEW */}
      <section className="py-24 font-['Poppins',sans-serif] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need for Better Healthcare
            </h2>
            <p className="text-slate-500 text-base sm:text-lg">
              Access essential healthcare services through one simple and secure platform.
            </p>
          </div>
        </div>

        {/* Live Infinite Marquee Carousel */}
        <div className="relative w-full overflow-hidden flex [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <motion.div
            className="flex gap-8 py-4 shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {/* Double the array for a completely seamless loop */}
            {[...servicesList, ...servicesList].map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={`${service.id}-${index}`}
                  className="group bg-white rounded-[24px] border border-slate-200/80 p-8 shadow-sm hover:shadow-xl hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between w-[350px] sm:w-[380px] shrink-0"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-6 group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-500 transition-colors duration-300">
                      <Icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 group-hover:text-cyan-700 pt-4 border-t border-slate-100"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURED SERVICE (SMART HEALTHCARE) */}
      <section className="py-20 bg-gradient-to-b from-slate-100/60 via-teal-50/20 to-slate-100/60 border-y border-slate-200/60 font-['Poppins',sans-serif]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT: Local Image Replacement */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-[2.5rem] blur-xl -z-10" />
              <div className="rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl bg-white aspect-[4/3] relative">
                <img 
                  src={smartHealthcareImg} 
                  alt="Connected Healthcare Platform" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* RIGHT: Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SMART HEALTHCARE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Everything Connected in One Place
              </h2>

              <p className="text-slate-600 text-base leading-relaxed">
                Our platform brings doctors, appointments, healthcare information, and essential services together to create a smoother and more connected healthcare experience.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">Easy Appointment Management</span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">Trusted Healthcare Professionals</span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">Secure Patient Information</span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-800">Simple & Convenient Access</span>
                </div>
              </div>

              <div className="pt-4">
                <Link 
                  to="/doctors" 
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-lg shadow-slate-900/10 transition-all duration-200 text-sm sm:text-base"
                >
                  Get Started
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

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
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold tracking-wider uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
              <span>The Platform Advantage</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
              Why Patients Choose <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">Our Platform</span>
            </h2>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Designed to offer transparency, safety, and utmost convenience throughout your health journey.
            </p>
          </div>

          {/* Modern Bento Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-white/80 backdrop-blur-xl rounded-[28px] border border-slate-200/80 p-8 shadow-xl shadow-slate-200/50 flex flex-col justify-between overflow-hidden hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300"
                >
                  {/* Soft gradient background fill on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                  {/* Big Background Number watermark */}
                  <div className="absolute top-4 right-6 text-5xl font-black text-slate-100 group-hover:text-cyan-100/60 transition-colors select-none">
                    {item.number}
                  </div>

                  <div className="relative z-10 space-y-6">
                    {/* Top Bar: Icon & Small Pill Badge */}
                    <div className="flex items-center justify-between">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${item.iconBg}`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-cyan-50 group-hover:text-cyan-700 transition-colors border border-slate-200/60">
                        {item.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom interactive indicator line */}
                  <div className="relative z-10 pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-cyan-600 transition-colors">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 font-['Poppins',sans-serif]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-blue-950 p-10 sm:p-16 text-white shadow-2xl text-center md:text-left"
        >
          {/* Subtle glowing decorative circles */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Take the Next Step Toward Better Healthcare
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Find trusted doctors, manage appointments, and experience a smarter way to manage your healthcare.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Link 
                to="/doctors" 
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-teal-400 transition-all text-center text-sm sm:text-base"
              >
                Find a Doctor
              </Link>
              <Link 
                to="/doctors" 
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 transition-all text-center text-sm sm:text-base"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
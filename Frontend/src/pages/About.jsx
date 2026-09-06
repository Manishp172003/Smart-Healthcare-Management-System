import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

import AboutSectionSmart from '/images/about_us heroIllustration.png';
import PlatformMissionImg from '../assets/About-Section/Platform-mission-img.png';
import WhyChooseUs from '../assets/About-Section/Why-choose-section.png';

import {
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  Activity,
  MessageSquare,
  Search,
  CheckCircle2,
  ArrowRight,
  FileText,
  Sparkles,
  Zap,
  Smile,
  Target,
  Eye,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function AboutUsPage() {
  // State for Mission, Vision, and Values carousel slider
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselCards = [
    {
      title: "Our Mission",
      description: "To make quality healthcare more accessible, efficient, and convenient for everyone through smart digital healthcare solutions.",
      icon: <Target className="w-6 h-6 text-teal-600" />,
      bgIconContainer: "bg-teal-50 border border-teal-100"
    },
    {
      title: "Our Vision",
      description: "To become a trusted digital healthcare platform that connects patients and healthcare professionals through technology and innovation.",
      icon: <Eye className="w-6 h-6 text-blue-600" />,
      bgIconContainer: "bg-blue-50 border border-blue-100"
    },
    {
      title: "Our Values",
      description: "We believe in compassion, trust, innovation, accessibility, and putting patients at the center of everything we do.",
      icon: <Heart className="w-6 h-6 text-teal-600" />,
      bgIconContainer: "bg-teal-50 border border-teal-100"
    }
  ];

  // Handlers for Carousel Navigation
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? carouselCards.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === carouselCards.length - 1 ? 0 : prev + 1));
  };

  // Original list of objectives cards
  const objectivesCards = [
    { 
      icon: <Calendar className="w-6 h-6 text-blue-600" />, 
      badgeBg: "bg-blue-50 border-blue-100",
      title: "Easy Appointment Booking", 
      desc: "Allow patients to conveniently search for doctors and book appointments.",
      pillar: "Pillar 01"
    },
    { 
      icon: <Clock className="w-6 h-6 text-teal-600" />, 
      badgeBg: "bg-teal-50 border-teal-100",
      title: "Efficient Doctor Scheduling", 
      desc: "Help doctors manage their availability and appointments effectively.",
      pillar: "Pillar 02"
    },
    { 
      icon: <Users className="w-6 h-6 text-blue-600" />, 
      badgeBg: "bg-blue-50 border-blue-100",
      title: "Better Patient Management", 
      desc: "Keep patient-related information and appointments organized.",
      pillar: "Pillar 03"
    },
    { 
      icon: <ShieldCheck className="w-6 h-6 text-teal-600" />, 
      badgeBg: "bg-teal-50 border-teal-100",
      title: "Improved Healthcare Access", 
      desc: "Make healthcare services easier and more accessible for users.",
      pillar: "Pillar 04"
    },
    { 
      icon: <MessageSquare className="w-6 h-6 text-blue-600" />, 
      badgeBg: "bg-blue-50 border-blue-100",
      title: "Better Coordination", 
      desc: "Improve communication and coordination between patients and healthcare providers.",
      pillar: "Pillar 05"
    },
    { 
      icon: <Zap className="w-6 h-6 text-teal-600" />, 
      badgeBg: "bg-teal-50 border-teal-100",
      title: "Simplified Healthcare Experience", 
      desc: "Reduce unnecessary complexity and save valuable time.",
      pillar: "Pillar 06"
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased overflow-hidden min-h-screen flex flex-col">
      
      {/* Existing Navbar Integration */}
      <Navbar />

      {/* Main Content Wrapper - no top padding to let hero start from top */}
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex-grow"
      >

        {/* 1. HERO SECTION: Full width container with cover background */}
        <section className="relative w-full h-[60vh] sm:h-[75vh] lg:h-[90vh] overflow-hidden flex items-center justify-center pt-[76px]">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${AboutSectionSmart})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {/* Enhanced dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-slate-950/60 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-blue-950/40"></div>
          </div>

          {/* Centered Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-3 sm:mb-6 drop-shadow-md">
              About Our <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                Healthcare Platform
              </span>
            </h1>
            <p className="text-xs sm:text-base md:text-lg lg:text-xl text-slate-100 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow">
              Making healthcare simpler, smarter, and more accessible by connecting patients and healthcare professionals through one digital platform.
            </p>
          </div>
        </section>

        {/* 2. ABOUT THE PLATFORM SECTION (Smarter Healthcare, Better Connections) */}
        <section id="platform" className="py-10 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Professional Image with Floating Badge */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-teal-500/20 rounded-3xl opacity-70 blur-2xl"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white group">
                <img 
                  src={PlatformMissionImg} 
                  alt="Platform Mission" 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
              </div>

              {/* Floating Modern Trust Badge */}
              <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 sm:px-6 sm:py-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-inner shrink-0">
                  <Smile className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Trusted Community</p>
                  <p className="text-sm sm:text-lg font-extrabold text-slate-900">10k+ Active Patients</p>
                </div>
              </div>
            </div>

            {/* Right Side: Content & Clean List (Non-card style) */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6 pt-4 sm:pt-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wider uppercase shadow-sm">
                <Activity className="w-3.5 h-3.5 text-blue-600" /> ABOUT US
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Smarter Healthcare, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">Better Connections</span>
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Our digital platform seamlessly unites patients and medical professionals, eliminating friction through intuitive doctor discovery, automated scheduling, and streamlined care.
              </p>

              <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
                {[
                  { title: "Instant Discovery:", desc: "Quick doctor search and seamless online booking." },
                  { title: "Optimized Scheduling:", desc: "Effortless schedule management and organized patient flows." },
                  { title: "Secure Access:", desc: "Safe and convenient connection to essential health services." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 sm:gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm md:text-base">{item.title} </span>
                      <span className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* MISSION, VISION, AND VALUES CAROUSEL SECTION */}
        <section className="py-10 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-100 via-blue-50/40 to-slate-100 border-y border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-100 text-blue-600 text-xs font-bold tracking-wider uppercase shadow-sm mb-2 sm:mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" /> CORE PRINCIPLES
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                  Our Purpose & Direction
                </h2>
              </div>
              
              {/* Carousel Arrow Controls */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-md hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-md hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Carousel Viewport Container */}
            <div className="relative overflow-hidden py-2 sm:py-4">
              <div 
                className="flex transition-transform duration-500 ease-out gap-4 sm:gap-6"
                style={{
                  transform: `translateX(-${currentIndex * (100 / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1))}%)`
                }}
              >
                {carouselCards.map((card, index) => (
                  <div 
                    key={index} 
                    className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-1"
                  >
                    <div className="h-full bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group">
                      <div className="space-y-4 sm:space-y-6">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${card.bgIconContainer} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                          {card.icon}
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">{card.title}</h3>
                        <p className="text-slate-600 leading-relaxed text-xs sm:text-sm md:text-base">
                          {card.description}
                        </p>
                      </div>
                      <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-slate-100 flex items-center text-xs sm:text-sm font-semibold text-blue-600 group-hover:text-teal-600 transition-colors">
                        <span>Smart Healthcare System</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Pagination Dots */}
            <div className="flex justify-center items-center gap-2 mt-6 sm:mt-8">
              {carouselCards.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? 'w-6 sm:w-8 bg-blue-600' : 'w-2 sm:w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE OUR PLATFORM (Placed below Our Purpose & Direction) */}
        {/* 6. WHY CHOOSE OUR PLATFORM (Medium Light Background) */}
        <section className="py-10 sm:py-16 md:py-20 bg-slate-200/70 border-y border-slate-300/60 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
              
              {/* Left Side: Concise Content */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" /> WHY CHOOSE US
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                    Why Choose Our Platform
                  </h2>
                  <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                    Discover what makes our digital platform the preferred option for modern care. Access essential healthcare services anytime and anywhere seamlessly while eliminating long wait times with instant digital scheduling. Our intuitive user interface is built for effortless navigation, helping you keep all medical appointments neatly structured. We ensure clear communication channels between patients and providers, leveraging cutting-edge web technology to deliver a reliable, secure, and time-saving healthcare experience for everyone.
                  </p>
                </div>
              </div>

              {/* Right Side: Professional Image / Visual Card Container */}
              <div className="lg:col-span-5 relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-teal-500/20 to-blue-600/20 rounded-3xl opacity-70 blur-2xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-300/80 bg-white group">
                  <img 
                   src={WhyChooseUs} 
                  alt="Why Choose Our Platform" 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end p-5 sm:p-8">
                    <div className="text-white space-y-1.5 sm:space-y-2">
                      <p className="text-[10px] sm:text-xs font-semibold tracking-wider text-teal-400 uppercase">Next-Gen Care</p>
                      <h4 className="text-base sm:text-xl font-bold">Built for Patients & Providers</h4>
                      <p className="text-xs sm:text-sm text-slate-200">Streamlining the healthcare ecosystem with reliability and trust.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. OUR OBJECTIVES: Continuous Left-to-Right Horizontal Marquee Carousel */}
        <section className="py-10 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Our Objectives
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              The foundational pillars guiding our commitment to superior healthcare technology.
            </p>
          </div>

          {/* Marquee Container with Hover Pause & Gradient Edge Masks */}
          <div className="relative w-full overflow-hidden group py-2 sm:py-4">
            {/* Left & Right Shadow Gradients for Professional Fade Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

            {/* Moving Track */}
            <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
              
              {/* Render Original Set + Duplicate Set for Infinite Seamless Looping */}
              {[...objectivesCards, ...objectivesCards].map((obj, index) => (
                <div 
                  key={index} 
                  className="w-[270px] sm:w-[340px] flex-shrink-0 mx-2 sm:mx-3 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between transition-all duration-300 hover:shadow-md"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${obj.badgeBg} border flex items-center justify-center shadow-sm`}>
                        {obj.icon}
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 bg-slate-100 text-slate-600 rounded-full">
                        {obj.pillar}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900">{obj.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{obj.desc}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* Global CSS for Continuous Left-to-Right Marquee Animation */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 35s linear infinite;
          }
        `}} />

        
        {/* 5. HOW IT WORKS (Medium Light Background) */}
        <section className="py-10 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-200/70 border-y border-slate-300/60 relative">
          
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-teal-200 text-teal-700 text-xs font-bold tracking-wider uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" /> SEAMLESS JOURNEY
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Healthcare Made Simple
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Your care journey completed efficiently in four clear steps.
              </p>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
              
              {[
                { 
                  step: "01", 
                  title: "Find a Doctor", 
                  desc: "Search and explore suitable healthcare professionals matching your specific needs.", 
                  icon: <Search className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
                  gradient: "from-blue-500/10 to-blue-600/5",
                  badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
                },
                { 
                  step: "02", 
                  title: "Choose a Time", 
                  desc: "Select an available and convenient appointment slot directly from live schedules.", 
                  icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />,
                  gradient: "from-teal-500/10 to-teal-600/5",
                  badgeColor: "bg-teal-50 text-teal-700 border-teal-200"
                },
                { 
                  step: "03", 
                  title: "Book Appointment", 
                  desc: "Confirm your appointment securely and instantly with zero friction or wait times.", 
                  icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />,
                  gradient: "from-blue-500/10 to-blue-600/5",
                  badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
                },
                { 
                  step: "04", 
                  title: "Manage Care", 
                  desc: "Keep track of active appointments and health records all in one structured dashboard.", 
                  icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />,
                  gradient: "from-teal-500/10 to-teal-600/5",
                  badgeColor: "bg-teal-50 text-teal-700 border-teal-200"
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="group relative bg-white p-6 sm:p-8 rounded-3xl border border-slate-300/70 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle Background Glow on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                  {/* Top Header inside Card */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6 relative z-10">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <span className={`text-[10px] sm:text-xs font-black px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border ${item.badgeColor} tracking-wider`}>
                      STEP {item.step}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-2 sm:space-y-3 relative z-10">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Decorative Indicator Bar */}
                  <div className="w-full h-1 bg-slate-100 rounded-full mt-6 sm:mt-8 overflow-hidden">
                    <div className="w-0 h-full bg-gradient-to-r from-blue-600 to-teal-500 group-hover:w-full transition-all duration-700 ease-out"></div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* 7. FINAL CTA SECTION */}
        <section className="py-10 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-10 md:p-16 shadow-2xl relative overflow-hidden text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.15),transparent_50%)] pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15]">
                Ready to Experience Smarter Healthcare?
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                Join thousands of patients and healthcare professionals improving their care journey today.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Link 
                  to="/doctors" 
                  className="px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 text-xs sm:text-sm md:text-base font-bold shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  Find a Doctor <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <Link 
                  to="/contact" 
                  className="px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm md:text-base font-bold backdrop-blur-md border border-white/20 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

      </motion.main>

      {/* Existing Footer Integration */}
      <Footer />

    </div>
  );
}
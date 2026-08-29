import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

// Import your local asset
import doctorHeroImg from "../assets/About-Section/Doctor-Hero-Img.png";

import {
  Search,
  Stethoscope,
  MapPin,
  Calendar,
  SlidersHorizontal,
  Star,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Heart,
  User,
  Brain,
  Bone,
  Baby,
  Award,
  Clock,
} from "lucide-react";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const FindDoctors = () => {
  const navigate = useNavigate();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [availability, setAvailability] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');

  // Specialties Data Array
  const specialties = [
    {
      name: 'Cardiology',
      desc: 'Heart & cardiovascular care',
      count: 24,
      icon: Heart,
      color: 'text-rose-500 bg-rose-50 border-rose-100'
    },
    {
      name: 'Dermatology',
      desc: 'Skin, hair & nail treatments',
      count: 18,
      icon: User,
      color: 'text-amber-500 bg-amber-50 border-amber-100'
    },
    {
      name: 'Neurology',
      desc: 'Brain, spine & nervous system',
      count: 15,
      icon: Brain,
      color: 'text-purple-500 bg-purple-50 border-purple-100'
    },
    {
      name: 'Orthopedics',
      desc: 'Bones, joints & muscle care',
      count: 20,
      icon: Bone,
      color: 'text-blue-500 bg-blue-50 border-blue-100'
    },
    {
      name: 'Pediatrics',
      desc: 'Specialized infant & child care',
      count: 22,
      icon: Baby,
      color: 'text-teal-500 bg-teal-50 border-teal-100'
    },
    {
      name: 'General Medicine',
      desc: 'Comprehensive primary healthcare',
      count: 30,
      icon: Stethoscope,
      color: 'text-indigo-500 bg-indigo-50 border-indigo-100'
    }
  ];

  // Doctors Data Array (6 realistic doctor profiles)
  const doctors = [
    {
      id: 1,
      name: 'Dr. Ananya Sharma',
      specialty: 'Cardiology',
      location: 'Nagpur, Maharashtra',
      rating: 4.9,
      reviews: 124,
      experience: '12+ Years Experience',
      availabilityStatus: 'Available Today',
      nextSlot: 'Today • 06:30 PM',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
      description: 'Experienced healthcare professional focused on personalized and compassionate patient care.'
    },
    {
      id: 2,
      name: 'Dr. Rohan Mehta',
      specialty: 'Neurology',
      location: 'Pune, Maharashtra',
      rating: 4.8,
      reviews: 98,
      experience: '10+ Years Experience',
      availabilityStatus: 'Available Today',
      nextSlot: 'Today • 04:00 PM',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
      description: 'Specialized in diagnosing and treating complex neurological and spinal disorders with precision.'
    },
    {
      id: 3,
      name: 'Dr. Priya Kapoor',
      specialty: 'Dermatology',
      location: 'Mumbai, Maharashtra',
      rating: 4.9,
      reviews: 156,
      experience: '8+ Years Experience',
      availabilityStatus: 'Available Tomorrow',
      nextSlot: 'Tomorrow • 10:00 AM',
      image: 'https://images.unsplash.com/photo-1594824813576-905a9687e35b?auto=format&fit=crop&q=80&w=600',
      description: 'Expert in clinical dermatology and advanced cosmetic skin treatments using modern technologies.'
    },
    {
      id: 4,
      name: 'Dr. Arjun Verma',
      specialty: 'Orthopedics',
      location: 'Delhi, India',
      rating: 4.7,
      reviews: 87,
      experience: '11+ Years Experience',
      availabilityStatus: 'Available Today',
      nextSlot: 'Today • 05:15 PM',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
      description: 'Dedicated orthopedic specialist focused on joint replacements, sports injuries, and rehabilitation.'
    },
    {
      id: 5,
      name: 'Dr. Neha Joshi',
      specialty: 'Pediatrics',
      location: 'Nagpur, Maharashtra',
      rating: 4.9,
      reviews: 142,
      experience: '9+ Years Experience',
      availabilityStatus: 'Available Today',
      nextSlot: 'Today • 03:00 PM',
      image: 'https://images.unsplash.com/photo-1594824813244-672540f324c4?auto=format&fit=crop&q=80&w=600',
      description: 'Providing gentle, expert pediatric healthcare, developmental tracking, and vaccination programs.'
    },
    {
      id: 6,
      name: 'Dr. Kabir Malhotra',
      specialty: 'General Medicine',
      location: 'Bangalore, India',
      rating: 4.8,
      reviews: 113,
      experience: '7+ Years Experience',
      availabilityStatus: 'Available Tomorrow',
      nextSlot: 'Tomorrow • 11:30 AM',
      image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80&w=600',
      description: 'Comprehensive general health assessments, lifestyle counseling, and chronic illness management.'
    }
  ];

  // Unique locations for filter dropdown
  const locations = ['All', 'Nagpur, Maharashtra', 'Pune, Maharashtra', 'Mumbai, Maharashtra', 'Delhi, India', 'Bangalore, India'];

  // Filter and Sort Logic
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesSearch = 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialty = selectedSpecialty === 'All' || doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
      const matchesLocation = selectedLocation === 'All' || doctor.location === selectedLocation;
      
      let matchesAvailability = true;
      if (availability === 'Available Today') {
        matchesAvailability = doctor.availabilityStatus === 'Available Today';
      } else if (availability === 'Available Tomorrow') {
        matchesAvailability = doctor.availabilityStatus === 'Available Tomorrow';
      }

      return matchesSearch && matchesSpecialty && matchesLocation && matchesAvailability;
    }).sort((a, b) => {
      if (sortBy === 'highest-rated') return b.rating - a.rating;
      if (sortBy === 'most-experienced') return parseInt(b.experience) - parseInt(a.experience);
      return 0; // recommended default
    });
  }, [searchTerm, selectedSpecialty, selectedLocation, availability, sortBy]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('All');
    setSelectedLocation('All');
    setAvailability('All');
    setSortBy('recommended');
  };

  const handleBookAppointment = (doctorId) => {
    navigate(`/book-appointment?doctorId=${doctorId}`);
  };

  const handleViewProfile = (doctorId) => {
    navigate(`/doctors/${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-teal-500 selection:text-white">
      {/* Inline styles for infinite sliding marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <Navbar />

      {/* 1. PAGE HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-slate-50 to-teal-50/30 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 border border-blue-200/60 text-blue-700 text-xs font-bold tracking-wider uppercase shadow-sm">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>FIND DOCTORS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Find the <span className="bg-gradient-to-r from-blue-600 via-teal-600 to-teal-500 bg-clip-text text-transparent">Right Doctor</span> for Your Care
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 max-w-xl">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 border border-slate-200/60 shadow-sm hover:border-blue-200 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">Verified Doctors</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 border border-slate-200/60 shadow-sm hover:border-blue-200 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">Easy Appointment Booking</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 border border-slate-200/60 shadow-sm hover:border-blue-200 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">Trusted Healthcare</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 border border-slate-200/60 shadow-sm hover:border-blue-200 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shrink-0">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">Highly Rated Specialists</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a 
                  href="#doctor-listings" 
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-200 flex items-center gap-2 text-sm sm:text-base"
                >
                  Find a Doctor
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="#specialties" 
                  className="px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm text-sm sm:text-base"
                >
                  Browse Specialties
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-[2.5rem] blur-2xl -z-10" />
                <div className="rounded-[2.5rem] overflow-hidden border border-slate-200/80 shadow-2xl bg-white aspect-[4/5] relative">
                  <img 
                    src={doctorHeroImg} 
                    alt="Professional Healthcare Provider" 
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SEARCH DOCTOR PANEL */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 mb-16">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-8 backdrop-blur-xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">Search for a Doctor</h2>
            <p className="text-sm text-slate-500">Find doctors by specialty, name, or location instantly.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </span>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Doctor name, specialty or condition" 
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50/80 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              />
            </div>

            <div className="w-full lg:w-52 relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Stethoscope className="w-5 h-5" />
              </span>
              <select 
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full pl-11 pr-8 py-3.5 bg-slate-50/80 border border-slate-200 rounded-2xl text-slate-800 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
              >
                <option value="All">All Specialties</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="General Medicine">General Medicine</option>
              </select>
            </div>

            <div className="w-full lg:w-52 relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-5 h-5" />
              </span>
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-11 pr-8 py-3.5 bg-slate-50/80 border border-slate-200 rounded-2xl text-slate-800 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
              >
                {locations.map((loc, idx) => (
                  <option key={idx} value={loc}>{loc === 'All' ? 'All Locations' : loc}</option>
                ))}
              </select>
            </div>

            <div className="w-full lg:w-48 relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Calendar className="w-5 h-5" />
              </span>
              <select 
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full pl-11 pr-8 py-3.5 bg-slate-50/80 border border-slate-200 rounded-2xl text-slate-800 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer"
              >
                <option value="All">Availability</option>
                <option value="Available Today">Available Today</option>
                <option value="Available Tomorrow">Available Tomorrow</option>
              </select>
            </div>

            <button 
              onClick={() => {}}
              className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 shrink-0"
            >
              <Search className="w-4 h-4" />
              Search Doctors
            </button>

          </div>
        </div>
      </section>

      {/* 3. TRUST STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 lg:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            
            <div className="space-y-1 pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                10K+
              </p>
              <p className="text-sm sm:text-base font-medium text-slate-600">Patients Served</p>
            </div>

            <div className="space-y-1 pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                250+
              </p>
              <p className="text-sm sm:text-base font-medium text-slate-600">Verified Doctors</p>
            </div>

            <div className="space-y-1 pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                50+
              </p>
              <p className="text-sm sm:text-base font-medium text-slate-600">Medical Specialties</p>
            </div>

            <div className="space-y-1 pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                4.9/5
              </p>
              <p className="text-sm sm:text-base font-medium text-slate-600">Patient Rating</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. BROWSE BY SPECIALTY (CONTINUOUSLY MOVING INFINITE CAROUSEL) */}
      <section id="specialties" className="bg-gradient-to-b from-slate-100/60 via-blue-50/20 to-slate-100/60 py-20 border-y border-slate-200/60 scroll-mt-24 mb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Browse Doctors by Specialty</h2>
              <p className="text-slate-500 mt-1">Choose a specialty and find experienced healthcare professionals.</p>
            </div>
          </div>
        </div>

        {/* Infinite Sliding Marquee Wrapper */}
        <div className="relative w-full overflow-hidden">
          {/* Fading left & right edges for a polished look */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-slate-100/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-slate-100/80 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex gap-6 py-4">
            {/* Render items twice to create a seamless infinite loop */}
            {[...specialties, ...specialties].map((spec, index) => {
              const IconComponent = spec.icon;
              const isSelected = selectedSpecialty === spec.name;
              return (
                <div 
                  key={index}
                  onClick={() => setSelectedSpecialty(isSelected ? 'All' : spec.name)}
                  className={`group w-72 sm:w-80 shrink-0 p-6 rounded-3xl border transition-all duration-300 cursor-pointer bg-white hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between ${
                    isSelected ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md' : 'border-slate-200/80 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${spec.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        {spec.count} Doctors
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {spec.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {spec.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs font-semibold text-blue-600">Explore specialists</span>
                    <ArrowRight className="w-4 h-4 text-blue-600 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5 & 6. DOCTOR LISTING & CARDS */}
      <section id="doctor-listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 scroll-mt-24">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Recommended Doctors</h2>
            <p className="text-slate-500 mt-1">Meet experienced healthcare professionals trusted by our patients.</p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-medium text-slate-500">
              Showing <strong className="text-slate-900">{filteredDoctors.length}</strong> doctors
            </span>

            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-4 py-2 shadow-sm">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="recommended">Sort by: Recommended</option>
                <option value="highest-rated">Sort by: Highest Rated</option>
                <option value="most-experienced">Sort by: Most Experienced</option>
              </select>
            </div>
          </div>
        </div>

        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc) => (
              <div 
                key={doc.id}
                className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6 pb-0">
                  <div className="flex gap-4 items-start">
                    
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-inner">
                      <img 
                        src={doc.image} 
                        alt={doc.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md mb-1 border border-teal-100">
                        <CheckCircle2 className="w-3 h-3 text-teal-600" />
                        Verified
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                        {doc.name}
                      </h3>
                      <p className="text-sm font-medium text-blue-600">{doc.specialty}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-slate-600 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1 font-semibold text-slate-800">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{doc.rating}</span>
                      <span className="text-slate-400 font-normal">({doc.reviews} Reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Award className="w-3.5 h-3.5 text-blue-500" />
                      <span>{doc.experience}</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{doc.location}</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    "{doc.description}"
                  </p>
                </div>

                <div className="p-6 pt-4 mt-4 bg-slate-50/60 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {doc.availabilityStatus}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{doc.nextSlot}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => handleViewProfile(doc.id)}
                      className="w-full py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-sm transition-all text-center"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={() => handleBookAppointment(doc.id)}
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-1 text-center"
                    >
                      Book Appointment
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No doctors found</h3>
            <p className="text-sm text-slate-500 mb-6">
              Try adjusting your search or filters to find available healthcare professionals.
            </p>
            <button 
              onClick={clearAllFilters}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl shadow transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* 13. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Still Looking for the Right Specialist?
            </h2>
            <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
              Explore our complete network of healthcare professionals and find the right care for your needs.
            </p>
            <div className="pt-2">
              <a 
                href="#doctor-listings" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-lg hover:bg-blue-50 transition-all duration-200"
              >
                Explore All Doctors
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FindDoctors;
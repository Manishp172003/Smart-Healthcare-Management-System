import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

// Import your local asset
import doctorHeroImg from "../assets/About-Section/FindDoctors-Hero.png";

// Import local doctor assets
import doctorImg1 from "../assets/FindDoctors/Doctor-img-1.png";
import doctorImg2 from "../assets/FindDoctors/Doctor-img-2.png";
import doctorImg3 from "../assets/FindDoctors/Doctor-img-3.png";
import doctorImg4 from "../assets/FindDoctors/Doctor-img-4.png";
import doctorImg5 from "../assets/FindDoctors/Doctor-img-5.png";
import doctorImg6 from "../assets/FindDoctors/New-Doctor-img.png";
import doctorImg7 from "../assets/FindDoctors/Doctor-img-7.png";
import doctorImg8 from "../assets/FindDoctors/New-2 -Doctor-img.png";

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
  X,
  RotateCcw,
} from "lucide-react";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { motion } from "framer-motion";

const FindDoctors = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSpecialty = searchParams.get('specialty') || 'All';

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [availability, setAvailability] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');

  // Sync state if URL query parameter changes (e.g. from Navbar or Universal Search)
  useEffect(() => {
    const specFromUrl = searchParams.get('specialty');
    if (specFromUrl) {
      setSelectedSpecialty(specFromUrl);
      setTimeout(() => {
        const resultsElement = document.getElementById("doctor-listings");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  }, [searchParams]);

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
    },
    {
      name: 'Gynecology',
      desc: 'Women\'s health & maternity care',
      count: 16,
      icon: Award,
      color: 'text-pink-500 bg-pink-50 border-pink-100'
    }
  ];

  // Doctors Data Array with all specialties represented
  const doctors = [
    {
      id: 1,
      name: 'Dr. Ananya Sharma',
      specialty: 'Cardiology',
      location: 'Nagpur, Maharashtra',
      rating: 4.9,
      reviews: 124,
      experience: '12+ Years Experience',
      fee: 1500,
      availabilityStatus: 'Available Today',
      nextSlot: 'Today • 06:30 PM',
      image: doctorImg1,
      description: 'Experienced healthcare professional focused on personalized and compassionate patient care.'
    },
    {
      id: 2,
      name: 'Dr. Vikram Shenoy',
      specialty: 'Neurology',
      location: 'Nagpur, Maharashtra',
      rating: 4.9,
      reviews: 148,
      experience: '15+ Years Experience',
      fee: 1800,
      availabilityStatus: 'Available Today',
      nextSlot: 'Today • 04:30 PM',
      image: doctorImg2,
      description: 'Senior Neurologist and Spine specialist specializing in stroke recovery, migraine management, and brain health.'
    },
    {
      id: 3,
      name: 'Dr. Priya Kapoor',
      specialty: 'Dermatology',
      location: 'Mumbai, Maharashtra',
      rating: 4.9,
      reviews: 156,
      experience: '8+ Years Experience',
      fee: 1200,
      availabilityStatus: 'Available Tomorrow',
      nextSlot: 'Tomorrow • 10:00 AM',
      image: doctorImg3,
      description: 'Expert in clinical dermatology and advanced cosmetic skin treatments using modern technologies.'
    },
    {
      id: 4,
      name: 'Dr. Arjun Verma',
      specialty: 'Orthopedics',
      location: 'Nagpur, Maharashtra',
      rating: 4.7,
      reviews: 87,
      experience: '11+ Years Experience',
      fee: 1400,
      availabilityStatus: 'Available Today',
      nextSlot: 'Today • 05:15 PM',
      image: doctorImg4,
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
      fee: 900,
      availabilityStatus: 'Available Today',
      nextSlot: 'Today • 03:00 PM',
      image: doctorImg5,
      description: 'Providing gentle, expert pediatric healthcare, developmental tracking, and vaccination programs.'
    },
    {
      id: 6,
      name: 'Dr. Kabir Malhotra',
      specialty: 'General Medicine',
      location: 'Pune, Maharashtra',
      rating: 4.8,
      reviews: 113,
      experience: '14+ Years Experience',
      fee: 800,
      availabilityStatus: 'Available Today',
      nextSlot: 'Today • 03:00 PM',
      image: doctorImg6,
      description: 'Providing expert internal and general medicine care focusing on chronic disease prevention and management.'
    },
    {
      id: 7,
      name: 'Dr. Sneha Kulkarni',
      specialty: 'Gynecology',
      location: 'Mumbai, Maharashtra',
      rating: 4.9,
      reviews: 178,
      experience: '13+ Years Experience',
      fee: 1600,
      availabilityStatus: 'Available Tomorrow',
      nextSlot: 'Tomorrow • 02:00 PM',
      image: doctorImg7,
      description: 'Dedicated gynecologist specializing in women\'s health, prenatal care, and minimally invasive procedures.'
    },
    {
      id: 8,
      name: 'Dr. Rohan Mehra',
      specialty: 'Neurology',
      location: 'Pune, Maharashtra',
      rating: 4.8,
      reviews: 95,
      experience: '10+ Years Experience',
      fee: 1400,
      availabilityStatus: 'Available Tomorrow',
      nextSlot: 'Tomorrow • 11:30 AM',
      image: doctorImg8,
      description: 'Consultant Neurologist specializing in neuro-rehabilitation, peripheral nerve disorders, and epilepsy treatment.'
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

  const handleSpecialtyClick = (specName) => {
    const isCurrentlySelected = selectedSpecialty.toLowerCase() === specName.toLowerCase();
    const newSpecialty = isCurrentlySelected ? 'All' : specName;
    setSelectedSpecialty(newSpecialty);

    if (newSpecialty !== 'All') {
      setSearchParams({ specialty: newSpecialty });
    } else {
      setSearchParams({});
    }

    setTimeout(() => {
      const resultsElement = document.getElementById("doctor-listings");
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('All');
    setSelectedLocation('All');
    setAvailability('All');
    setSortBy('recommended');
    setSearchParams({});
  };

  const isFiltered = Boolean(searchTerm || selectedSpecialty !== 'All' || selectedLocation !== 'All' || availability !== 'All');

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const resultsElement = document.getElementById("doctor-listings");
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBookAppointment = (doctorId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.setItem("redirectAfterLogin", `/appointment?doctorId=${doctorId}`);
      navigate("/login");
    } else {
      navigate(`/appointment?doctorId=${doctorId}`);
    }
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

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >

      {/* 1. PAGE HERO */}
      <section 
        className="relative w-full h-[60vh] sm:h-[75vh] lg:h-[90vh] min-h-[480px] overflow-hidden bg-cover bg-center bg-no-repeat flex items-center justify-center pt-[76px]"
        style={{ backgroundImage: `url(${doctorHeroImg})` }}
      >
        {/* Balanced contrast overlay - sweet spot between clarity and text contrast */}
        <div className="absolute inset-0 bg-slate-950/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/50 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="max-w-3xl mx-auto space-y-6">

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.14] drop-shadow-md">
              Find the <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-teal-400 bg-clip-text text-transparent">Right Doctor</span> for Your Care
            </h1>

            {/* Short Supporting Description */}
            <p className="text-slate-200 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto drop-shadow">
              Connect with verified medical specialists, check live availability, and book appointments instantly with trusted healthcare professionals.
            </p>

            {/* Streamlined Minimal CTAs Centered */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <a
                href="#doctor-listings"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white font-medium shadow-lg shadow-blue-600/30 hover:shadow-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-200 flex items-center gap-2 text-sm sm:text-base"
              >
                Find a Doctor
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/appointment"
                className="px-8 py-3.5 rounded-xl bg-white/15 border border-white/25 text-white font-medium hover:bg-white/25 transition-all duration-200 shadow-sm backdrop-blur-md text-sm sm:text-base"
              >
                Book Appointment
              </Link>
            </div>

          </div>
        </div>
      </section>
    

      {/* 2. SEARCH DOCTOR PANEL */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 mb-16">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Search for a Doctor</h2>
              <p className="text-sm text-slate-500">Find doctors by specialty, name, or location instantly.</p>
            </div>
            {isFiltered && (
              <button 
                type="button"
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-semibold rounded-xl transition-all self-start sm:self-auto cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <form onSubmit={handleSearchSubmit} className="flex flex-col lg:flex-row gap-4">
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
                <option value="Gynecology">Gynecology</option>
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
              type="submit"
              className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Search Doctors
            </button>

          </form>
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
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-slate-100/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-slate-100/80 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex gap-6 py-4">
            {[...specialties, ...specialties].map((spec, index) => {
              const IconComponent = spec.icon;
              const isSelected = selectedSpecialty.toLowerCase() === spec.name.toLowerCase();
              const matchingCount = doctors.filter(d => d.specialty.toLowerCase() === spec.name.toLowerCase()).length;
              return (
                <div 
                  key={index}
                  onClick={() => handleSpecialtyClick(spec.name)}
                  className={`group w-72 sm:w-80 shrink-0 p-6 rounded-3xl border transition-all duration-300 cursor-pointer bg-white hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between ${
                    isSelected ? 'border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/20 shadow-md' : 'border-slate-200/80 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${spec.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        {matchingCount > 0 ? `${matchingCount} Verified Doctors` : `${spec.count} Doctors`}
                      </span>
                    </div>

                    <h3 className={`text-lg font-bold transition-colors ${isSelected ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>
                      {spec.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {spec.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs font-semibold text-blue-600">
                      {isSelected ? 'Viewing specialists ↓' : 'Explore specialists'}
                    </span>
                    <ArrowRight className={`w-4 h-4 text-blue-600 transform transition-transform ${isSelected ? 'rotate-90 text-teal-600' : 'group-hover:translate-x-1'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5 & 6. DOCTOR LISTING & NON-CROPPED CONTAINED CARDS */}
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

        {/* Active Filter Chips */}
        {isFiltered && (
          <div className="flex items-center gap-2 flex-wrap mb-6 p-3 bg-blue-50/60 rounded-2xl border border-blue-100/80">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">Filtered by:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 shadow-sm">
                Keyword: <strong>"{searchTerm}"</strong>
                <button type="button" onClick={() => setSearchTerm('')} className="text-slate-400 hover:text-rose-600 ml-0.5 cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {selectedSpecialty !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 shadow-sm">
                Specialty: <strong>{selectedSpecialty}</strong>
                <button type="button" onClick={() => setSelectedSpecialty('All')} className="text-slate-400 hover:text-rose-600 ml-0.5 cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {selectedLocation !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 shadow-sm">
                Location: <strong>{selectedLocation}</strong>
                <button type="button" onClick={() => setSelectedLocation('All')} className="text-slate-400 hover:text-rose-600 ml-0.5 cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {availability !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 shadow-sm">
                Timing: <strong>{availability}</strong>
                <button type="button" onClick={() => setAvailability('All')} className="text-slate-400 hover:text-rose-600 ml-0.5 cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 ml-auto px-2 py-1 transition-colors cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div 
                key={doc.id}
                className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Image Section - Fully Contained with No Cropping */}
                <div className="w-full h-[280px] flex items-center justify-center overflow-hidden rounded-t-2xl bg-slate-100 relative">
                  <img 
                    src={doc.image} 
                    alt={doc.name} 
                    className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Verified Badge overlay top-left */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-teal-700 text-xs font-semibold shadow-sm border border-teal-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      Verified
                    </span>
                  </div>
                </div>

                {/* Bottom Content Section */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    {/* Header info: Name & Specialization */}
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {doc.name}
                        </h3>
                        <p className="text-xs font-semibold text-blue-600">{doc.specialty}</p>
                      </div>
                    </div>

                    {/* Rating, Experience & Location badges */}
                    <div className="flex items-center justify-between text-xs text-slate-600 py-2.5 my-2 border-y border-slate-100">
                      <div className="flex items-center gap-1 font-bold text-slate-800">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{doc.rating}</span>
                        <span className="text-slate-400 font-normal">({doc.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600 font-medium">
                        <Award className="w-3.5 h-3.5 text-blue-500" />
                        <span>{doc.experience}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{doc.location}</span>
                    </div>

                    <p className="text-xs text-slate-600 mb-3.5 line-clamp-2 leading-relaxed">
                      "{doc.description}"
                    </p>
                  </div>

                  <div>
                    {/* Consultation Fee */}
                    <div className="flex items-center justify-between text-xs py-1.5 px-3 bg-slate-50 rounded-xl border border-slate-200/70 mb-3">
                      <span className="text-slate-500 font-medium">Consultation Fee</span>
                      <span className="font-extrabold text-slate-900 text-xs sm:text-sm">₹{doc.fee.toLocaleString()}</span>
                    </div>

                    {/* Availability Status & Next Slot */}
                    <div className="flex items-center justify-between text-xs mb-4 pt-1">
                      <div className="flex items-center gap-1.5 font-medium text-emerald-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{doc.availabilityStatus}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{doc.nextSlot}</span>
                      </div>
                    </div>

                    {/* Side-by-Side Action Buttons */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <button 
                        onClick={() => handleViewProfile(doc.id)}
                        className="w-full py-2.5 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-sm transition-all text-center"
                      >
                        View Profile
                      </button>
                      <button 
                        onClick={() => handleBookAppointment(doc.id)}
                        className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-1 text-center"
                      >
                        <span>Book Appointment</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
    </motion.div>

    <Footer />
    </div>
  );
};

export default FindDoctors;
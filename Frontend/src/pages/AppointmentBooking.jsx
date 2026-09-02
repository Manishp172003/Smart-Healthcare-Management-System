import React, { useState, useEffect } from 'react';
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { motion } from "framer-motion";
import { 
  Search, Calendar, Clock, User, Phone, Mail, FileText, 
  CheckCircle, AlertCircle, ChevronRight, ArrowLeft, ShieldCheck, 
  Star, MapPin, Award, Stethoscope, CalendarCheck, Loader2, 
  Edit3, Trash2, Eye, X, Check, Activity, HeartPulse, UserCheck 
} from 'lucide-react';

// --- MOCK DOCTORS DATABASE ---
const MOCK_DOCTORS = [
  {
    id: 'doc_1',
    name: 'Dr. Sarah Jenkins',
    specialization: 'Cardiologist',
    concern: 'Heart-related problems',
    qualification: 'MBBS, MD - Cardiology (FACC)',
    experienceYears: 12,
    rating: 4.9,
    reviewsCount: 142,
    fee: 120,
    availabilityStatus: 'Available Today',
    nextSlot: '09:30 AM',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    hospital: 'City General Medical Center, Heart Wing, Suite 402'
  },
  {
    id: 'doc_2',
    name: 'Dr. Michael Chen',
    specialization: 'Dermatologist',
    concern: 'Skin problems',
    qualification: 'MBBS, DDVL, FRCP',
    experienceYears: 8,
    rating: 4.8,
    reviewsCount: 98,
    fee: 90,
    availabilityStatus: 'Available Tomorrow',
    nextSlot: '10:00 AM',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    hospital: 'Aura Skin & Aesthetic Clinic, Downtown'
  },
  {
    id: 'doc_3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrician',
    concern: 'Child health',
    qualification: 'MBBS, DCH, MRCPCH',
    experienceYears: 10,
    rating: 4.9,
    reviewsCount: 215,
    fee: 100,
    availabilityStatus: 'Available Today',
    nextSlot: '11:00 AM',
    imageUrl: 'https://images.unsplash.com/photo-1594824813567-33d994334341?auto=format&fit=crop&q=80&w=300',
    hospital: 'Sunshine Childrens Hospital, Block B'
  },
  {
    id: 'doc_4',
    name: 'Dr. Robert Fox',
    specialization: 'Orthopedic',
    concern: 'Bone & joint pain',
    qualification: 'MBBS, MS - Orthopedics, DNB',
    experienceYears: 15,
    rating: 4.7,
    reviewsCount: 110,
    fee: 130,
    availabilityStatus: 'Available Today',
    nextSlot: '02:00 PM',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    hospital: 'Metro Spine & Joint Institute'
  },
  {
    id: 'doc_5',
    name: 'Dr. Jessica Taylor',
    specialization: 'General Physician',
    concern: 'Fever & infections',
    qualification: 'MBBS, MRCP (UK)',
    experienceYears: 7,
    rating: 4.8,
    reviewsCount: 178,
    fee: 75,
    availabilityStatus: 'Available Today',
    nextSlot: '08:30 AM',
    imageUrl: 'https://images.unsplash.com/photo-1594824813567-33d994334341?auto=format&fit=crop&q=80&w=300',
    hospital: 'PrimeCare Community Health Center'
  },
  {
    id: 'doc_6',
    name: 'Dr. David Vance',
    specialization: 'Neurologist',
    concern: 'Mental wellness',
    qualification: 'MBBS, DM - Neurology',
    experienceYears: 14,
    rating: 4.9,
    reviewsCount: 89,
    fee: 150,
    availabilityStatus: 'Available Tomorrow',
    nextSlot: '01:30 PM',
    imageUrl: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80&w=300',
    hospital: 'Advanced Neuroscience & Brain Center'
  }
];

const HEALTH_CONCERNS = [
  "Heart-related problems",
  "Skin problems",
  "Fever & infections",
  "Stomach & digestion",
  "Bone & joint pain",
  "Child health",
  "Women's health",
  "Mental wellness"
];

const SPECIALIZATIONS = [
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedic",
  "General Physician",
  "Pediatrician"
];

const AVAILABLE_TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:15 AM",
  "02:00 PM",
  "03:30 PM",
  "04:30 PM"
];

export default function AppointmentBooking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedConcern, setSelectedConcern] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const [patientForm, setPatientForm] = useState({
    fullName: 'Piyush Dahiwale',
    email: 'piyush@healthcare.com',
    phoneNumber: '+91 98765 43210',
    age: '26',
    gender: 'Male',
    address: 'Pune, Maharashtra, India',
    symptoms: 'Mild chest discomfort and fatigue over the past 3 days',
    notes: 'Please keep previous blood report history in mind.'
  });
  const [formErrors, setFormErrors] = useState({});

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('smarthealth_appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeDetailsModal, setActiveDetailsModal] = useState(null);

  useEffect(() => {
    localStorage.setItem('smarthealth_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const filteredDoctors = MOCK_DOCTORS.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpec = selectedSpecialization ? doc.specialization === selectedSpecialization : true;
    const matchesConcern = selectedConcern ? doc.concern === selectedConcern : true;
    return matchesSearch && matchesSpec && matchesConcern;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientForm(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateStep = () => {
    const errors = {};
    if (currentStep === 1 && (!selectedDoctor || !selectedDate || !selectedTimeSlot)) {
      alert("Please select a doctor, appointment date, and time slot to proceed.");
      return false;
    }
    if (currentStep === 2) {
      if (!patientForm.fullName.trim()) errors.fullName = 'Full Name is required';
      if (!patientForm.email.trim() || !/\S+@\S+\.\S+/.test(patientForm.email)) errors.email = 'Valid email is required';
      if (!patientForm.phoneNumber.trim()) errors.phoneNumber = 'Phone number is required';
      if (!patientForm.age || patientForm.age <= 0) errors.age = 'Valid age is required';
      if (!patientForm.symptoms.trim()) errors.symptoms = 'Please enter your symptoms';
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleConfirmBooking = () => {
    const newAppointment = {
      appointmentId: 'SH-' + Math.floor(100000 + Math.random() * 900000),
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTimeSlot,
      patient: { ...patientForm },
      concern: selectedConcern || selectedDoctor.concern,
      status: 'Pending',
      bookingDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setAppointments([newAppointment, ...appointments]);
    setCurrentStep(4);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const simulateApproval = (appointmentId) => {
    setAppointments(prev => prev.map(apt => {
      if (apt.appointmentId === appointmentId) {
        return { ...apt, status: 'Approved' };
      }
      return apt;
    }));
  };

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      setAppointments(prev => prev.filter(apt => apt.appointmentId !== appointmentId));
    }
  };

  // Custom Calendar Generator Logic
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(currentYear, currentMonth, day));
  }

  const isToday = (date) => {
    const today = new Date();
    return date && date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    return date && date < today;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-['Poppins'] text-slate-800">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* --- PREMIUM HERO SECTION --- */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-teal-950 text-white overflow-hidden py-16 lg:py-24 mb-10 shadow-lg">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-400/30 px-3.5 py-1.5 rounded-full text-blue-300 text-xs font-semibold tracking-wider uppercase">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>Smart Healthcare Management</span>
                </div>
                
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                  Book Your Doctor Appointment <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent">Seamlessly</span>
                </h1>
                
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
                  Connect with world-class specialists, schedule consultations in real-time, and manage your clinical appointments with high security and clinical precision.
                </p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
                  <div className="flex items-center space-x-2 text-xs text-slate-300">
                    <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Verified Doctors</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-300">
                    <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Secure Booking</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-300">
                    <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Easy Scheduling</span>
                  </div>
                </div>
              </div>

              {/* Premium Appointment Preview Card */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-teal-400 rounded-3xl blur-md opacity-30 animate-pulse"></div>
                  <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl space-y-5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-white font-bold shadow-md shrink-0">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">Easy Appointment Scheduling</h4>
                          <p className="text-xs text-teal-300">Secure & Verified System</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs text-slate-300">
                      <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="text-slate-400">Specialist:</span>
                        <span className="font-semibold text-white">Dr. Sarah Jenkins (Cardiologist)</span>
                      </div>
                      <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="text-slate-400">Schedule:</span>
                        <span className="font-semibold text-teal-300">Today, 09:30 AM</span>
                      </div>
                    </div>

                    <div>
                      <a 
                        href="#booking-wizard" 
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById('booking-wizard').scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full py-3.5 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 hover:opacity-95 text-white font-bold rounded-2xl text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-teal-500/25"
                      >
                        <span>Start Booking</span>
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <main id="booking-wizard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          
          {/* --- 4-STEP HORIZONTAL STEPPER --- */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {[
                { num: 1, title: "Doctor & Schedule" },
                { num: 2, title: "Patient Details" },
                { num: 3, title: "Review & Submit" },
                { num: 4, title: "Confirmation" }
              ].map(step => {
                const isCompleted = currentStep > step.num;
                const isCurrent = currentStep === step.num;
                return (
                  <div 
                    key={step.num} 
                    onClick={() => { if (step.num < currentStep) setCurrentStep(step.num); }}
                    className={`flex items-center space-x-3 p-3 rounded-2xl transition ${
                      step.num < currentStep ? 'cursor-pointer hover:bg-slate-50' : ''
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-xs shrink-0 ${
                      isCompleted ? 'bg-emerald-600 text-white' :
                      isCurrent ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white ring-4 ring-blue-100' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {isCompleted ? <Check className="w-5 h-5" /> : `0${step.num}`}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wider">Step 0{step.num}</span>
                      <span className={`text-xs sm:text-sm font-bold block truncate ${isCurrent ? 'text-blue-950' : 'text-slate-600'}`}>
                        {step.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- STEP 1: DOCTOR + CALENDAR INTERACTIVE UI --- */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT SIDE: Doctor Selection */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Find Your Specialist</h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">Choose a trusted healthcare professional for your consultation.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search doctor or specialty..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-xs sm:text-sm text-slate-800"
                      />
                    </div>

                    <select
                      value={selectedSpecialization}
                      onChange={(e) => setSelectedSpecialization(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-xs sm:text-sm text-slate-800"
                    >
                      <option value="">All Specializations</option>
                      {SPECIALIZATIONS.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>

                  {/* Health Concerns Quick Filter Pills */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Filter by Health Concern</span>
                    <div className="flex flex-wrap gap-2">
                      {HEALTH_CONCERNS.map(concern => (
                        <button
                          key={concern}
                          onClick={() => setSelectedConcern(selectedConcern === concern ? '' : concern)}
                          className={`text-xs px-3.5 py-1.5 rounded-xl font-medium transition border ${
                            selectedConcern === concern ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white border-transparent shadow-xs' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {concern}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Doctor Cards List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Available Specialists ({filteredDoctors.length})</h3>
                  </div>

                  {filteredDoctors.length === 0 ? (
                    <div className="bg-white p-10 rounded-3xl border border-slate-200 text-center space-y-3">
                      <Stethoscope className="w-10 h-10 text-slate-300 mx-auto" />
                      <h4 className="font-bold text-slate-800 text-base">No specialists found</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">Try another doctor name, specialization, or health concern filter.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {filteredDoctors.map(doc => {
                        const isSelected = selectedDoctor?.id === doc.id;
                        return (
                          <div 
                            key={doc.id}
                            onClick={() => setSelectedDoctor(doc)}
                            className={`bg-white rounded-3xl border transition cursor-pointer p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md ${
                              isSelected ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/10' : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-start space-x-4">
                              <img src={doc.imageUrl} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover shadow-xs shrink-0" />
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-bold text-slate-900 text-base">{doc.name}</h4>
                                  {isSelected && <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1"><Check className="w-3 h-3"/><span>Selected</span></span>}
                                </div>
                                <p className="text-xs font-semibold text-blue-600">{doc.specialization} <span className="text-slate-400 font-normal">• {doc.experienceYears} yrs exp</span></p>
                                <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold">
                                  <Star className="w-3.5 h-3.5 fill-current" />
                                  <span>{doc.rating}</span>
                                  <span className="text-slate-400 font-normal">({doc.reviewsCount} reviews)</span>
                                </div>
                                <p className="text-[11px] text-slate-500 flex items-center space-x-1 pt-0.5">
                                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                                  <span className="truncate max-w-xs">{doc.hospital}</span>
                                </p>
                              </div>
                            </div>

                            <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                              <span className="text-sm font-black text-slate-900">${doc.fee} <span className="text-[11px] font-normal text-slate-400">/ visit</span></span>
                              <button className={`mt-2 text-xs font-bold px-4 py-2 rounded-xl transition ${
                                isSelected ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}>
                                {isSelected ? 'Selected' : 'Select Doctor'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT SIDE: Custom Calendar & Time Slots Panel */}
              <div className="lg:col-span-5 lg:sticky lg:top-6 space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Select Date & Time</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Choose your preferred consultation slot</p>
                  </div>

                  {/* Custom Calendar Widget */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-800">{monthNames[currentMonth]} {currentYear}</span>
                      <div className="flex space-x-1">
                        <button onClick={handlePrevMonth} className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-600 transition"><ArrowLeft className="w-4 h-4"/></button>
                        <button onClick={handleNextMonth} className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-600 transition"><ChevronRight className="w-4 h-4"/></button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400">
                      <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                      {calendarDays.map((dateObj, index) => {
                        if (!dateObj) return <div key={`empty-${index}`}></div>;
                        const dateString = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                        const isSelected = selectedDate === dateString;
                        const disabled = isPastDate(dateObj);
                        const today = isToday(dateObj);

                        return (
                          <button
                            key={dateString}
                            disabled={disabled}
                            onClick={() => setSelectedDate(dateString)}
                            className={`h-9 rounded-xl flex items-center justify-center font-medium transition ${
                              disabled ? 'text-slate-300 cursor-not-allowed bg-transparent' :
                              isSelected ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold shadow-md shadow-blue-500/20' :
                              today ? 'border border-blue-500 text-blue-600 font-bold bg-blue-50/50' :
                              'text-slate-700 hover:bg-slate-200/70 bg-white border border-slate-100'
                            }`}
                          >
                            {dateObj.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots Selection */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Available Time Slots</span>
                    <div className="grid grid-cols-3 gap-2">
                      {AVAILABLE_TIME_SLOTS.map(slot => {
                        const isSelected = selectedTimeSlot === slot;
                        return (
                          <button
                            key={slot}
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition border text-center ${
                              isSelected ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white border-transparent shadow-sm' :
                              'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected Appointment Preview box */}
                  <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2 text-xs">
                    <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest block">Selected Summary</span>
                    <div className="flex justify-between"><span className="text-slate-400">Doctor:</span> <span className="font-bold">{selectedDoctor ? selectedDoctor.name : 'Not selected'}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Date:</span> <span className="font-bold">{selectedDate || 'Not selected'}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Time:</span> <span className="font-bold">{selectedTimeSlot || 'Not selected'}</span></div>
                    <div className="flex justify-between pt-2 border-t border-white/10"><span className="text-slate-400">Consultation Fee:</span> <span className="font-bold text-teal-300">{selectedDoctor ? `$${selectedDoctor.fee}` : '$0'}</span></div>
                  </div>

                  {/* Continue CTA Button */}
                  <button
                    disabled={!selectedDoctor || !selectedDate || !selectedTimeSlot}
                    onClick={handleNext}
                    className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 transition shadow-lg ${
                      (!selectedDoctor || !selectedDate || !selectedTimeSlot)
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                        : 'bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 text-white hover:opacity-95 shadow-teal-500/25'
                    }`}
                  >
                    <span>Continue to Patient Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* --- STEP 2: PATIENT DETAILS --- */}
          {currentStep === 2 && (
            <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
              <div className="border-b border-slate-100 pb-5">
                <h2 className="text-xl font-bold text-slate-900">Tell Us About the Patient</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Provide accurate information to help the doctor prepare for your consultation.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={patientForm.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                  />
                  {formErrors.fullName && <span className="text-[10px] text-red-500 font-medium">{formErrors.fullName}</span>}
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={patientForm.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-xs"
                  />
                  {formErrors.email && <span className="text-[10px] text-red-500 font-medium">{formErrors.email}</span>}
                </div>
              </div>

              <div className="flex justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={handleBack}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center space-x-2 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-xl text-xs flex items-center space-x-2 transition shadow-md"
                >
                  <span>Review Booking</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* --- STEP 3: REVIEW & SUBMIT --- */}
          {currentStep === 3 && (
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Review Your Appointment</h2>
              <p className="text-xs text-slate-500">Please confirm your booking details below.</p>
              
              <div className="bg-slate-50 p-6 rounded-2xl space-y-4 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-3">
                  <span className="text-slate-500">Doctor:</span>
                  <span className="font-bold text-slate-900">{selectedDoctor?.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-3">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="font-bold text-teal-600">{selectedDate} at {selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient Name:</span>
                  <span className="font-bold text-slate-900">{patientForm.fullName}</span>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button onClick={handleBack} className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs">Back</button>
                <button onClick={handleConfirmBooking} className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl text-xs shadow-md">Confirm Booking</button>
              </div>
            </div>
          )}

          {/* --- STEP 4: CONFIRMATION SUCCESS --- */}
          {currentStep === 4 && (
            <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl border border-slate-200 text-center space-y-6 shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Appointment Booked Successfully!</h2>
              <p className="text-xs text-slate-500">We have sent a confirmation email with all details to your registered email address.</p>
              
              <button 
                onClick={() => { setCurrentStep(1); setSelectedDoctor(null); setSelectedDate(''); setSelectedTimeSlot(''); }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-md"
              >
                Book Another Appointment
              </button>
            </div>
          )}

        </main>
      </motion.div>
      <Footer />
    </div>
  );
}
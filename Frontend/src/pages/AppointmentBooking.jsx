import React, { useState, useEffect } from 'react';
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
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

export default function AppointmentBooking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedConcern, setSelectedConcern] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  
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
    if (currentStep === 1 && !selectedDoctor) {
      alert("Please select a doctor to proceed.");
      return false;
    }
    if (currentStep === 2 && (!selectedDate || !selectedTimeSlot)) {
      alert("Please select both an appointment date and an available time slot.");
      return false;
    }
    if (currentStep === 3) {
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
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 500, behavior: 'smooth' });
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
    setCurrentStep(1);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTimeSlot('');
    alert("Appointment successfully requested! You can monitor its status below.");
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

  return (
  <div className="min-h-screen bg-slate-100 font-['Poppins'] text-slate-800">

    <Navbar />

    
      
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative bg-gradient-to-br from-blue-900 via-slate-900 to-teal-900 text-white overflow-hidden py-16 lg:py-24 mb-10 shadow-md">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Book Your Doctor Appointment <span className="bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">Seamlessly</span>
              </h1>
              
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
                Connect with world-class specialists, schedule hassle-free consultations, and manage your family's healthcare journey securely.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
                
                
                
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-teal-400 rounded-3xl blur-md opacity-30 animate-pulse"></div>
                <div className="relative bg-slate-800/90 backdrop-blur-xl border border-white/15 rounded-2xl p-6 shadow-2xl space-y-4">
                  <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-white font-bold shadow-md shrink-0">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Express Care</h4>
                      <p className="text-xs text-teal-300">Verified Doctors • Secure Portal</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-xl border border-white/5">
                      <Check className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Choose from 6+ specialized medical domains</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-xl border border-white/5">
                      <Check className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>Real-time slot picking and instant request tracking</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a 
                      href="#booking-wizard" 
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('booking-wizard').scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 hover:opacity-95 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-teal-500/20"
                    >
                      <span>Start Booking Flow</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <main id="booking-wizard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- 4-STEP HORIZONTAL STEPPER --- */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm mb-8">
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { num: 1, title: "Doctor" },
              { num: 2, title: "Date & Time" },
              { num: 3, title: "Details" },
              { num: 4, title: "Review" }
            ].map(step => {
              const isCompleted = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <div 
                  key={step.num} 
                  onClick={() => { if (step.num < currentStep) setCurrentStep(step.num); }}
                  className={`flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-1 sm:space-y-0 sm:space-x-3 p-2 sm:p-3 rounded-xl transition ${
                    step.num < currentStep ? 'cursor-pointer hover:bg-slate-50' : ''
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-xs shrink-0 ${
                    isCompleted ? 'bg-emerald-600 text-white' :
                    isCurrent ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white ring-4 ring-blue-100' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : step.num}
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="text-xs text-slate-400 font-medium block">Step 0{step.num}</span>
                    <span className={`text-xs sm:text-sm font-bold block ${isCurrent ? 'text-blue-900' : 'text-slate-600'}`}>
                      {step.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- STEP 1: SELECT DOCTOR --- */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Find Your Specialist</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by doctor name or specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-800"
                  />
                </div>

                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full p-3 bg-slate-50/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-800"
                >
                  <option value="">All Specializations</option>
                  {SPECIALIZATIONS.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              {/* Health Concerns Quick Filter Pills */}
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Filter by Health Concern</span>
                <div className="flex flex-wrap gap-2">
                  {HEALTH_CONCERNS.map(concern => (
                    <button
                      key={concern}
                      onClick={() => setSelectedConcern(selectedConcern === concern ? '' : concern)}
                      className={`text-xs px-3.5 py-1.5 rounded-lg font-medium transition border ${
                        selectedConcern === concern ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white border-transparent shadow-xs' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {concern}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Doctor Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map(doc => {
                const isSelected = selectedDoctor?.id === doc.id;
                return (
                  <div 
                    key={doc.id}
                    onClick={() => setSelectedDoctor(doc)}
                    className={`bg-white rounded-2xl border transition cursor-pointer p-5 flex flex-col justify-between shadow-sm hover:shadow-md ${
                      isSelected ? 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/10' : 'border-slate-200/80'
                    }`}
                  >
                    <div>
                      <div className="flex items-start space-x-4">
                        <img src={doc.imageUrl} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover shadow-xs shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-slate-900 text-base truncate">{doc.name}</h3>
                          <span className="inline-block px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md mt-1">
                            {doc.specialization}
                          </span>
                          <div className="flex items-center space-x-1 mt-1 text-amber-500 text-xs font-bold">
                            <Star className="w-3.5 h-3.5 fill-current shrink-0" />
                            <span>{doc.rating}</span>
                            <span className="text-slate-400 font-normal">({doc.reviewsCount} reviews)</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 space-y-1.5 text-xs text-slate-500 border-t border-slate-100 pt-3">
                        <p className="flex items-center justify-between">
                          <span>Experience:</span>
                          <span className="font-semibold text-slate-700">{doc.experienceYears} Years</span>
                        </p>
                        <p className="flex items-center justify-between">
                          <span>Consultation Fee:</span>
                          <span className="font-bold text-teal-600 text-sm">${doc.fee}</span>
                        </p>
                        <p className="flex items-center justify-between">
                          <span>Availability:</span>
                          <span className="font-semibold text-emerald-600">{doc.availabilityStatus}</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400 truncate mr-2">{doc.qualification}</span>
                      <button className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                        isSelected ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}>
                        {isSelected ? 'Selected' : 'Select Doctor'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNext}
                disabled={!selectedDoctor}
                className={`px-8 py-3.5 rounded-xl font-bold text-sm transition flex items-center space-x-2 shadow-lg ${
                  selectedDoctor ? 'bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-95 text-white shadow-blue-600/20 cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Proceed to Date & Time</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 2: SELECT DATE & TIME --- */}
        {currentStep === 2 && (
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-8">
            <div className="flex items-center space-x-4 border-b border-slate-100 pb-4">
              <img src={selectedDoctor?.imageUrl} alt={selectedDoctor?.name} className="w-14 h-14 rounded-xl object-cover shrink-0" />
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-slate-900 truncate">Schedule with {selectedDoctor?.name}</h2>
                <p className="text-xs bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-semibold">{selectedDoctor?.specialization} • Fee: ${selectedDoctor?.fee}</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700">Select Appointment Date</label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3.5 bg-slate-50/80 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm text-slate-800"
              />
            </div>

            {selectedDate && (
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700">Available Time Slots</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { time: '09:00 AM', status: 'Available' },
                    { time: '09:30 AM', status: 'Booked' },
                    { time: '10:00 AM', status: 'Available' },
                    { time: '10:30 AM', status: 'Available' },
                    { time: '11:15 AM', status: 'Available' },
                    { time: '02:00 PM', status: 'Available' },
                    { time: '03:30 PM', status: 'Booked' },
                    { time: '04:30 PM', status: 'Available' },
                  ].map((slot, idx) => {
                    const isBooked = slot.status === 'Booked';
                    const isSelected = selectedTimeSlot === slot.time;
                    return (
                      <button
                        key={idx}
                        disabled={isBooked}
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`py-3 px-4 rounded-xl text-xs font-bold border transition ${
                          isBooked ? 'bg-slate-100 text-slate-400 line-through cursor-not-allowed border-slate-200' :
                          isSelected ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white border-transparent shadow-md shadow-blue-600/20' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button onClick={handleBack} className="px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 text-sm">
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!selectedDate || !selectedTimeSlot}
                className={`px-8 py-3.5 rounded-xl font-bold text-sm transition flex items-center space-x-2 ${
                  selectedDate && selectedTimeSlot ? 'bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-95 text-white cursor-pointer shadow-lg shadow-blue-600/20' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Proceed to Patient Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 3: PATIENT DETAILS --- */}
        {currentStep === 3 && (
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Patient Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={patientForm.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50/80 border border-slate-200 rounded-xl outline-none text-sm text-slate-800 focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.fullName && <span className="text-xs text-rose-500 mt-1 block">{formErrors.fullName}</span>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={patientForm.email}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50/80 border border-slate-200 rounded-xl outline-none text-sm text-slate-800 focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.email && <span className="text-xs text-rose-500 mt-1 block">{formErrors.email}</span>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={patientForm.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50/80 border border-slate-200 rounded-xl outline-none text-sm text-slate-800 focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.phoneNumber && <span className="text-xs text-rose-500 mt-1 block">{formErrors.phoneNumber}</span>}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={patientForm.age}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-slate-50/80 border border-slate-200 rounded-xl outline-none text-sm text-slate-800 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gender *</label>
                  <select
                    name="gender"
                    value={patientForm.gender}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-slate-50/80 border border-slate-200 rounded-xl outline-none text-sm text-slate-800 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Residential Address</label>
              <input
                type="text"
                name="address"
                value={patientForm.address}
                onChange={handleInputChange}
                className="w-full p-3 bg-slate-50/80 border border-slate-200 rounded-xl outline-none text-sm text-slate-800 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Symptoms / Health Concern *</label>
              <textarea
                name="symptoms"
                rows="3"
                value={patientForm.symptoms}
                onChange={handleInputChange}
                className="w-full p-3 bg-slate-50/80 border border-slate-200 rounded-xl outline-none text-sm text-slate-800 focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your current symptoms or reason for visit..."
              ></textarea>
              {formErrors.symptoms && <span className="text-xs text-rose-500 mt-1 block">{formErrors.symptoms}</span>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Additional Notes (Optional)</label>
              <textarea
                name="notes"
                rows="2"
                value={patientForm.notes}
                onChange={handleInputChange}
                className="w-full p-3 bg-slate-50/80 border border-slate-200 rounded-xl outline-none text-sm text-slate-800 focus:ring-2 focus:ring-blue-500"
                placeholder="Any prior medical history or reports..."
              ></textarea>
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button onClick={handleBack} className="px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 text-sm">
                Back
              </button>
              <button onClick={handleNext} className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-95 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 flex items-center space-x-2">
                <span>Proceed to Review</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 4: REVIEW & CONFIRM --- */}
        {currentStep === 4 && (
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Review & Confirm Appointment</h2>
            <p className="text-xs text-slate-500">Please verify all information before submitting your booking request.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Doctor Information</span>
                  <button onClick={() => setCurrentStep(1)} className="text-xs font-bold text-blue-600 hover:underline">Edit</button>
                </div>
                <div className="flex items-center space-x-3">
                  <img src={selectedDoctor?.imageUrl} alt={selectedDoctor?.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-900 text-sm truncate">{selectedDoctor?.name}</h4>
                    <p className="text-xs bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent font-semibold">{selectedDoctor?.specialization}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600"><span className="font-semibold">Hospital:</span> {selectedDoctor?.hospital}</p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Schedule</span>
                  <button onClick={() => setCurrentStep(2)} className="text-xs font-bold text-blue-600 hover:underline">Edit</button>
                </div>
                <div className="space-y-2 text-xs text-slate-700">
                  <p className="flex justify-between"><span className="text-slate-500">Date:</span> <span className="font-bold">{selectedDate}</span></p>
                  <p className="flex justify-between"><span className="text-slate-500">Time Slot:</span> <span className="font-bold text-teal-700">{selectedTimeSlot}</span></p>
                  <p className="flex justify-between"><span className="text-slate-500">Consultation Fee:</span> <span className="font-bold text-slate-900">${selectedDoctor?.fee}</span></p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Patient & Medical Details</span>
                <button onClick={() => setCurrentStep(3)} className="text-xs font-bold text-blue-600 hover:underline">Edit</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div><span className="text-slate-400 block">Full Name</span><span className="font-bold text-slate-800">{patientForm.fullName}</span></div>
                <div><span className="text-slate-400 block">Email</span><span className="font-bold text-slate-800">{patientForm.email}</span></div>
                <div><span className="text-slate-400 block">Phone</span><span className="font-bold text-slate-800">{patientForm.phoneNumber}</span></div>
                <div><span className="text-slate-400 block">Age / Gender</span><span className="font-bold text-slate-800">{patientForm.age} yrs, {patientForm.gender}</span></div>
                <div className="col-span-2"><span className="text-slate-400 block">Symptoms</span><span className="font-bold text-slate-800">{patientForm.symptoms}</span></div>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button onClick={handleBack} className="px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 text-sm">
                Back
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/20 flex items-center space-x-2"
              >
                <CalendarCheck className="w-5 h-5" />
                <span>Confirm & Submit Appointment</span>
              </button>
            </div>
          </div>
        )}

        {/* --- APPOINTMENTS STATUS DASHBOARD --- */}
        <div className="mt-16 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-bold text-slate-900">Your Appointment Requests & Status Dashboard</h2>
            <p className="text-xs text-slate-500">Monitor approval status, view appointment cards, or simulate doctor approval.</p>
          </div>

          {appointments.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 text-center text-slate-400 text-sm shadow-sm">
              No appointments booked yet. Complete the 4-step wizard above to create your first appointment!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appointments.map(apt => {
                const isApproved = apt.status === 'Approved';
                return (
                  <div key={apt.appointmentId} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-bold text-slate-400">{apt.appointmentId}</span>
                      <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                        isApproved ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {apt.status === 'Pending' ? '⏳ Waiting for Doctor Approval' : '✅ Approved'}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <img src={apt.doctor.imageUrl} alt={apt.doctor.name} className="w-14 h-14 rounded-xl object-cover shadow-xs shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 text-sm truncate">{apt.doctor.name}</h4>
                        <p className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent text-xs font-semibold">{apt.doctor.specialization}</p>
                        <p className="text-slate-400 text-xs mt-0.5 truncate">{apt.doctor.hospital}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs space-y-1.5">
                      <p className="flex justify-between"><span className="text-slate-500">Patient Name:</span> <span className="font-bold text-slate-800">{apt.patient.fullName}</span></p>
                      <p className="flex justify-between"><span className="text-slate-500">Date & Time:</span> <span className="font-bold text-slate-800">{apt.date} at {apt.time}</span></p>
                      <p className="flex justify-between"><span className="text-slate-500">Consultation Fee:</span> <span className="font-bold text-teal-600">${apt.doctor.fee}</span></p>
                      <p className="flex justify-between"><span className="text-slate-500">Symptoms:</span> <span className="font-semibold text-slate-700 truncate max-w-[200px]">{apt.patient.symptoms}</span></p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {!isApproved ? (
                        <button
                          onClick={() => simulateApproval(apt.appointmentId)}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-95 text-white rounded-xl text-xs font-bold transition shadow-sm"
                        >
                          Simulate Doctor Approval ⚡
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveDetailsModal(apt)}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-95 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                      )}

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleCancelAppointment(apt.appointmentId)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl border border-rose-100 transition"
                          title="Cancel Appointment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </main>

      {/* --- APPROVED APPOINTMENT DETAILS MODAL --- */}
      {activeDetailsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl p-6 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Official Appointment Pass</span>
                <h3 className="text-lg font-bold text-slate-900">{activeDetailsModal.appointmentId}</h3>
              </div>
              <button onClick={() => setActiveDetailsModal(null)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl">
                <img src={activeDetailsModal.doctor.imageUrl} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 truncate">{activeDetailsModal.doctor.name}</h4>
                  <p className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent text-xs font-semibold">{activeDetailsModal.doctor.specialization}</p>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
                <p className="flex justify-between"><span className="text-slate-500">Hospital / Clinic:</span> <span className="font-bold text-slate-800">{activeDetailsModal.doctor.hospital}</span></p>
                <p className="flex justify-between"><span className="text-slate-500">Appointment Date:</span> <span className="font-bold text-slate-800">{activeDetailsModal.date}</span></p>
                <p className="flex justify-between"><span className="text-slate-500">Time Slot:</span> <span className="font-bold text-teal-700">{activeDetailsModal.time}</span></p>
                <p className="flex justify-between"><span className="text-slate-500">Patient Name:</span> <span className="font-bold text-slate-800">{activeDetailsModal.patient.fullName}</span></p>
                <p className="flex justify-between"><span className="text-slate-500">Contact Number:</span> <span className="font-bold text-slate-800">{activeDetailsModal.patient.phoneNumber}</span></p>
                <p className="flex justify-between"><span className="text-slate-500">Symptoms:</span> <span className="font-bold text-slate-800">{activeDetailsModal.patient.symptoms}</span></p>
                <p className="flex justify-between"><span className="text-slate-500">Consultation Fee:</span> <span className="font-bold text-teal-600">${activeDetailsModal.doctor.fee}</span></p>
              </div>
            </div>

            <button
              onClick={() => setActiveDetailsModal(null)}
              className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}
<Footer/>
    </div>
  );
}
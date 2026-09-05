import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import MockPaymentGatewayModal from "../components/common/MockPaymentGatewayModal";
import { API_BASE_URL } from "../config/api";
import { motion } from "framer-motion";
import {
  Search, Calendar, Clock, User, Phone, Mail, FileText,
  CheckCircle, AlertCircle, ChevronRight, ArrowLeft, ShieldCheck,
  Star, MapPin, Award, Stethoscope, CalendarCheck, Loader2,
  Edit3, Trash2, Eye, X, Check, Activity, HeartPulse, UserCheck, Sun, Sunset,
  QrCode, CreditCard, Building2, Wallet, Printer, Download, Receipt, CheckCircle2
} from 'lucide-react';

import doctorImg1 from "../assets/FindDoctors/Doctor-img-1.png";
import doctorImg2 from "../assets/FindDoctors/Doctor-img-2.png";
import doctorImg3 from "../assets/FindDoctors/Doctor-img-3.png";
import doctorImg4 from "../assets/FindDoctors/Doctor-img-4.png";
import doctorImg5 from "../assets/FindDoctors/Doctor-img-5.png";
import doctorImg6 from "../assets/FindDoctors/New-Doctor-img.png";
import doctorImg7 from "../assets/FindDoctors/Doctor-img-7.png";
import doctorImg8 from "../assets/FindDoctors/Doctor-img-8.png";
import doctorImg9 from "../assets/FindDoctors/Doctor-img-9.png";
import doctorImg10 from "../assets/FindDoctors/Doctor-img-10.png";
import doctorImg11 from "../assets/FindDoctors/Doctor-img-11.png";
import doctorImg12 from "../assets/FindDoctors/Doctor-img-12.png";
import doctorImg13 from "../assets/FindDoctors/Doctor-img-13.png";
import doctorImg14 from "../assets/FindDoctors/Doctor-img-14.png";

// --- CANONICAL DOCTORS DATABASE ---
const CANONICAL_DOCTORS = [
  {
    id: 1,
    name: 'Dr. Ananya Sharma',
    specialization: 'Cardiologist',
    concern: 'Heart-related problems',
    qualification: 'MBBS - GMC Nagpur, MD (Cardiology) - KEM Hospital, Mumbai',
    experienceYears: 12,
    rating: 4.9,
    reviewsCount: 142,
    fee: 1500,
    availabilityStatus: 'Available Today',
    nextSlot: '09:30 AM',
    imageUrl: doctorImg1,
    hospital: 'Nagpur Heart Institute, Dharampeth, Nagpur'
  },
  {
    id: 2,
    name: 'Dr. Vikram Shenoy',
    specialization: 'Neurologist',
    concern: 'Brain & nervous system',
    qualification: 'MBBS, MD, DM (Neurology) - NIMHANS, Bangalore',
    experienceYears: 15,
    rating: 4.9,
    reviewsCount: 148,
    fee: 1800,
    availabilityStatus: 'Available Today',
    nextSlot: '04:30 PM',
    imageUrl: doctorImg2,
    hospital: 'Apex Neuro & Stroke Center, Nagpur'
  },
  {
    id: 3,
    name: 'Dr. Priya Kapoor',
    specialization: 'Dermatologist',
    concern: 'Skin problems',
    qualification: 'MBBS, MD (Dermatology) - Topiwala National Medical College',
    experienceYears: 8,
    rating: 4.9,
    reviewsCount: 98,
    fee: 1200,
    availabilityStatus: 'Available Today',
    nextSlot: '11:00 AM',
    imageUrl: doctorImg3,
    hospital: 'Aura Skin & Aesthetic Clinic, Bandra West, Mumbai'
  },
  {
    id: 4,
    name: 'Dr. Arjun Verma',
    specialization: 'Orthopedic',
    concern: 'Bone & joint pain',
    qualification: 'MBBS, MS (Orthopedics) - AIIMS',
    experienceYears: 11,
    rating: 4.7,
    reviewsCount: 110,
    fee: 1400,
    availabilityStatus: 'Available Today',
    nextSlot: '02:00 PM',
    imageUrl: doctorImg4,
    hospital: 'Care Ortho Center, Dhantoli, Nagpur'
  },
  {
    id: 5,
    name: 'Dr. Neha Joshi',
    specialization: 'Pediatrician',
    concern: 'Child health',
    qualification: 'MBBS, DCH, DNB (Pediatrics)',
    experienceYears: 9,
    rating: 4.8,
    reviewsCount: 215,
    fee: 900,
    availabilityStatus: 'Available Today',
    nextSlot: '08:30 AM',
    imageUrl: doctorImg5,
    hospital: 'Sunshine Childrens Hospital, Ramdaspeth, Nagpur'
  },
  {
    id: 6,
    name: 'Dr. Kabir Malhotra',
    specialization: 'General Physician',
    concern: 'Fever & infections',
    qualification: 'MBBS, MD (Internal Medicine)',
    experienceYears: 7,
    rating: 4.6,
    reviewsCount: 178,
    fee: 800,
    availabilityStatus: 'Available Today',
    nextSlot: '04:00 PM',
    imageUrl: doctorImg6,
    hospital: 'HealthFirst Multi-Specialty Clinic, Kothrud, Pune'
  },
  {
    id: 7,
    name: 'Dr. Sneha Kulkarni',
    specialization: 'Gynecologist',
    concern: "Women's health",
    qualification: 'MBBS, MS (Obstetrics & Gynecology)',
    experienceYears: 13,
    rating: 4.9,
    reviewsCount: 89,
    fee: 1600,
    availabilityStatus: 'Available Tomorrow',
    nextSlot: '01:30 PM',
    imageUrl: doctorImg7,
    hospital: 'Grace Womens Care & Fertility Clinic, Andheri, Mumbai'
  },
  {
    id: 8,
    name: 'Dr. Rajesh Patel',
    specialization: 'Neurologist',
    concern: 'Brain & nervous system',
    qualification: 'MBBS, MD (Neurology) - NIMHANS, Bangalore',
    experienceYears: 16,
    rating: 4.8,
    reviewsCount: 145,
    fee: 2500,
    availabilityStatus: 'Available Today',
    nextSlot: '03:00 PM',
    imageUrl: doctorImg8,
    hospital: 'NeuroCare Institute, Civil Lines, Nagpur'
  },
  {
    id: 9,
    name: 'Dr. Anjali Deshmukh',
    specialization: 'Dentist',
    concern: 'Dental & oral health',
    qualification: 'BDS, MDS (Oral Surgery) - GDCH, Mumbai',
    experienceYears: 11,
    rating: 4.7,
    reviewsCount: 98,
    fee: 800,
    availabilityStatus: 'Available Today',
    nextSlot: '10:30 AM',
    imageUrl: doctorImg9,
    hospital: 'Smile Dental Clinic, Sadar, Nagpur'
  },
  {
    id: 10,
    name: 'Dr. Vikram Singh',
    specialization: 'Ophthalmologist',
    concern: 'Eye care & vision',
    qualification: 'MBBS, MS (Ophthalmology) - AIIMS, Delhi',
    experienceYears: 14,
    rating: 4.9,
    reviewsCount: 167,
    fee: 1200,
    availabilityStatus: 'Available Tomorrow',
    nextSlot: '11:00 AM',
    imageUrl: doctorImg10,
    hospital: 'Vision Eye Center, Camp, Pune'
  },
  {
    id: 11,
    name: 'Dr. Meera Krishnan',
    specialization: 'Endocrinologist',
    concern: 'Hormonal disorders & diabetes',
    qualification: 'MBBS, MD (Endocrinology) - CMC, Vellore',
    experienceYears: 12,
    rating: 4.8,
    reviewsCount: 134,
    fee: 1800,
    availabilityStatus: 'Available Today',
    nextSlot: '02:30 PM',
    imageUrl: doctorImg11,
    hospital: 'Diabetes Care Center, Anna Nagar, Chennai'
  },
  {
    id: 12,
    name: 'Dr. Amit Verma',
    specialization: 'Nephrologist',
    concern: 'Kidney & urinary disorders',
    qualification: 'MBBS, MD (Nephrology) - PGI, Chandigarh',
    experienceYears: 15,
    rating: 4.7,
    reviewsCount: 112,
    fee: 2200,
    availabilityStatus: 'Available Tomorrow',
    nextSlot: '04:00 PM',
    imageUrl: doctorImg12,
    hospital: 'Kidney Care Hospital, Secunderabad, Hyderabad'
  },
  {
    id: 13,
    name: 'Dr. Sunita Rao',
    specialization: 'Psychiatrist',
    concern: 'Mental health & therapy',
    qualification: 'MBBS, MD (Psychiatry) - NIMHANS, Bangalore',
    experienceYears: 10,
    rating: 4.9,
    reviewsCount: 201,
    fee: 1500,
    availabilityStatus: 'Available Today',
    nextSlot: '09:00 AM',
    imageUrl: doctorImg13,
    hospital: 'Mind Wellness Clinic, Koramangala, Bangalore'
  },
  {
    id: 14,
    name: 'Dr. Karthik Menon',
    specialization: 'Gastroenterologist',
    concern: 'Digestive system & liver',
    qualification: 'MBBS, MD (Gastroenterology) - CMC, Vellore',
    experienceYears: 13,
    rating: 4.8,
    reviewsCount: 156,
    fee: 2000,
    availabilityStatus: 'Available Tomorrow',
    nextSlot: '01:00 PM',
    imageUrl: doctorImg14,
    hospital: 'Digestive Health Center, Gachibowli, Hyderabad'
  },
  {
    id: 15,
    name: 'Dr. Rohan Mehra',
    specialization: 'Neurologist',
    concern: 'Brain & nervous system',
    qualification: 'MBBS, MD (Neurology) - Armed Forces Medical College (AFMC), Pune',
    experienceYears: 10,
    rating: 4.8,
    reviewsCount: 95,
    fee: 1400,
    availabilityStatus: 'Available Tomorrow',
    nextSlot: '11:30 AM',
    imageUrl: doctorImg8,
    hospital: 'Pune Institute of Neurosciences, Shivaji Nagar, Pune'
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
  "Pediatrician",
  "Gynecologist",
  "Dentist",
  "Ophthalmologist",
  "Endocrinologist",
  "Nephrologist",
  "Psychiatrist",
  "Gastroenterologist"
];

const MORNING_TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:15 AM",
  "11:00 AM",
  "11:45 AM",
  "12:30 PM"
];

const EVENING_TIME_SLOTS = [
  "02:00 PM",
  "02:45 PM",
  "03:30 PM",
  "04:15 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM"
];

const AVAILABLE_TIME_SLOTS = [...MORNING_TIME_SLOTS, ...EVENING_TIME_SLOTS];

export default function AppointmentBooking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const doctorIdParam = searchParams.get('doctorId');

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedConcern, setSelectedConcern] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorsList, setDoctorsList] = useState(CANONICAL_DOCTORS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState('');

  // Payment & Invoice Confirmation State
  const [paymentMethod, setPaymentMethod] = useState("UPI"); // "UPI" | "CARD" | "NET_BANKING" | "PAY_AT_CLINIC"
  const [upiId, setUpiId] = useState("piyush@oksbi");
  const [upiVerified, setUpiVerified] = useState(true);
  const [cardData, setCardData] = useState({
    cardNumber: "4532 8920 1192 8821",
    cardHolder: "PIYUSH DAHIWALE",
    expiry: "09/28",
    cvv: "824"
  });
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const [confirmedTransaction, setConfirmedTransaction] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname + window.location.search);
      navigate("/login");
    }
  }, [navigate]);

  // Fetch real doctors from backend and merge with local canonical assets
  useEffect(() => {
    const fetchBackendDoctors = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/doctors`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const merged = data.map((bDoc) => {
              const localDoc = CANONICAL_DOCTORS.find(
                (c) => c.id === bDoc.id || c.name.toLowerCase() === (bDoc.user?.name || "").toLowerCase()
              );
              return {
                id: bDoc.id,
                name: bDoc.user?.name || localDoc?.name || `Doctor ${bDoc.id}`,
                specialization: bDoc.specialization || localDoc?.specialization || "Specialist",
                concern: localDoc?.concern || "Health-related problems",
                qualification: bDoc.education || localDoc?.qualification || "MBBS, MD",
                experienceYears: parseInt(bDoc.experience) || localDoc?.experienceYears || 10,
                rating: bDoc.rating || 4.8,
                reviewsCount: localDoc?.reviewsCount || 120,
                fee: bDoc.consultationFee || localDoc?.fee || 1500,
                availabilityStatus: localDoc?.availabilityStatus || "Available Today",
                nextSlot: localDoc?.nextSlot || "09:30 AM",
                imageUrl: localDoc?.imageUrl || doctorImg1,
                hospital: localDoc?.hospital || "SmartHealth Medical Center"
              };
            });
            // Retain canonical doctors not present in backend data so all 15 specialists are bookable
            const remainingCanonical = CANONICAL_DOCTORS.filter(
              (cDoc) => !data.some((bDoc) => bDoc.id === cDoc.id || (bDoc.user?.name || "").toLowerCase() === cDoc.name.toLowerCase())
            );

            setDoctorsList([...merged, ...remainingCanonical]);
          }
        }
      } catch (err) {
        console.warn("Could not fetch backend doctors, using canonical database", err);
      }
    };
    fetchBackendDoctors();
  }, []);

  // Pre-select doctor if doctorId is provided
  useEffect(() => {
    if (doctorIdParam) {
      const doctor = doctorsList.find(doc => 
        String(doc.id) === String(doctorIdParam) || 
        String(doc.id).replace('doc_', '') === String(doctorIdParam).replace('doc_', '')
      ) || CANONICAL_DOCTORS.find(doc => 
        String(doc.id) === String(doctorIdParam) || 
        String(doc.id).replace('doc_', '') === String(doctorIdParam).replace('doc_', '')
      );
      if (doctor) {
        setSelectedDoctor(doctor);
      }
    }
  }, [doctorIdParam, doctorsList]);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const calculateAgeFromDob = (dobString) => {
    if (!dobString) return "";
    const birthDate = new Date(dobString);
    if (isNaN(birthDate.getTime())) return "";
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age > 0 ? String(age) : "";
  };

  const getInitialPatientForm = () => {
    let savedProfile = {};
    try {
      const raw = localStorage.getItem("smarthealth_patient_profile");
      if (raw) savedProfile = JSON.parse(raw);
    } catch (e) {}

    const userName = localStorage.getItem("name") || savedProfile.fullName || "";
    const userEmail = localStorage.getItem("email") || savedProfile.email || "";
    const userPhone = savedProfile.phone || localStorage.getItem("phone") || "+91 ";
    const userGender = savedProfile.gender || "Male";
    const userAddress = savedProfile.address || "";
    const calculatedAge = calculateAgeFromDob(savedProfile.dob || "1998-05-14");

    return {
      fullName: userName,
      email: userEmail,
      phoneNumber: userPhone,
      age: calculatedAge || (savedProfile.age ? String(savedProfile.age) : "26"),
      gender: userGender,
      address: userAddress,
      symptoms: "",
      notes: ""
    };
  };

  const [patientForm, setPatientForm] = useState(getInitialPatientForm);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const handleProfileSync = () => {
      let savedProfile = {};
      try {
        const raw = localStorage.getItem("smarthealth_patient_profile");
        if (raw) savedProfile = JSON.parse(raw);
      } catch (e) {}
      const userName = localStorage.getItem("name") || savedProfile.fullName;
      const userEmail = localStorage.getItem("email") || savedProfile.email;
      const userPhone = savedProfile.phone || localStorage.getItem("phone");
      const userGender = savedProfile.gender;
      const userAddress = savedProfile.address;
      const calculatedAge = calculateAgeFromDob(savedProfile.dob || "1998-05-14");

      setPatientForm((prev) => ({
        ...prev,
        fullName: prev.fullName || userName || "",
        email: prev.email || userEmail || "",
        phoneNumber: (prev.phoneNumber && prev.phoneNumber !== "+91 ") ? prev.phoneNumber : (userPhone || "+91 "),
        age: prev.age || calculatedAge || "26",
        gender: prev.gender || userGender || "Male",
        address: prev.address || userAddress || ""
      }));
    };

    window.addEventListener("storage", handleProfileSync);
    window.addEventListener("profileUpdated", handleProfileSync);
    return () => {
      window.removeEventListener("storage", handleProfileSync);
      window.removeEventListener("profileUpdated", handleProfileSync);
    };
  }, []);

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('smarthealth_appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeDetailsModal, setActiveDetailsModal] = useState(null);

  useEffect(() => {
    localStorage.setItem('smarthealth_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const filteredDoctors = doctorsList.filter(doc => {
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

  const consultationFee = selectedDoctor ? (Number(selectedDoctor.fee) || 1500) : 1500;
  const facilityFee = 50;
  const totalAmountPayable = consultationFee + facilityFee;

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleInitiatePayment = () => {
    if (paymentMethod === "PAY_AT_CLINIC") {
      handleConfirmBooking(null);
    } else {
      setIsPaymentModalOpen(true);
    }
  };

  const handleConfirmBooking = async (gatewayResult = null) => {
    setIsSubmitting(true);
    setBookingError('');

    const userId = localStorage.getItem("userId") || "1";
    const token = localStorage.getItem("token");

    // Convert time slot e.g. "09:30 AM" to "09:30:00" for Java LocalTime
    let formattedTime = "09:00:00";
    if (selectedTimeSlot) {
      const parts = selectedTimeSlot.trim().split(" ");
      if (parts.length === 2) {
        const [timePart, modifier] = parts;
        let [hours, minutes] = timePart.split(":");
        if (modifier.toUpperCase() === "PM" && hours !== "12") {
          hours = String(parseInt(hours, 10) + 12);
        }
        if (modifier.toUpperCase() === "AM" && hours === "12") {
          hours = "00";
        }
        formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`;
      }
    }

    const doctorNumericId = parseInt(String(selectedDoctor.id).replace("doc_", ""), 10) || 1;
    const isPayAtClinic = paymentMethod === "PAY_AT_CLINIC";
    const generatedTxnId = gatewayResult?.transactionId || (isPayAtClinic 
      ? `CLINIC-DESK-${Math.floor(100000 + Math.random() * 900000)}` 
      : `TXN-${paymentMethod}-${Math.floor(10000000 + Math.random() * 90000000)}`);

    // Convert selectedDate e.g. "Sep 2, 2026" or "2026-09-02" to standard "YYYY-MM-DD"
    let formattedDate = selectedDate;
    if (selectedDate) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(selectedDate)) {
        formattedDate = selectedDate;
      } else {
        const d = new Date(selectedDate);
        if (!isNaN(d.getTime())) {
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          formattedDate = `${year}-${month}-${day}`;
        }
      }
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          patientUserId: parseInt(userId, 10),
          doctorId: doctorNumericId,
          appointmentDate: formattedDate, // Standard YYYY-MM-DD
          startTime: formattedTime,
          reason: patientForm.symptoms || "General medical consultation",
          appointmentType: "in-person",
          paymentMethod: paymentMethod,
          paymentStatus: isPayAtClinic ? "PAY_ON_ARRIVAL" : "PAID",
          amountPaid: totalAmountPayable,
          transactionId: generatedTxnId
        })
      });

      const data = await res.json();
      if (res.ok) {
        const transactionRecord = {
          appointmentId: data.id ? `SMH-2026-${data.id}` : 'SMH-2026-' + Math.floor(1000 + Math.random() * 9000),
          doctor: selectedDoctor,
          date: selectedDate,
          time: selectedTimeSlot,
          patient: { ...patientForm },
          concern: selectedConcern || selectedDoctor?.concern || "General Checkup",
          paymentMethod: paymentMethod,
          paymentStatus: isPayAtClinic ? "PAY_ON_ARRIVAL" : "PAID",
          amount: totalAmountPayable,
          consultationFee: consultationFee,
          facilityFee: facilityFee,
          transactionId: generatedTxnId,
          status: data.status || 'CONFIRMED',
          bookingDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          bookedAtTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };

        setConfirmedTransaction(transactionRecord);
        setAppointments([transactionRecord, ...appointments]);
        setIsPaymentModalOpen(false);
        setCurrentStep(5);
        window.scrollTo({ top: 400, behavior: 'smooth' });

        // Dispatch real-time synchronization events
        window.dispatchEvent(new Event("appointmentsUpdated"));
        window.dispatchEvent(new Event("storage"));
      } else {
        setBookingError(data.error || "Failed to book appointment. Please choose a different slot or doctor.");
        setIsPaymentModalOpen(false);
      }
    } catch (err) {
      console.error("Booking error:", err);
      // Fallback for offline mode
      const transactionRecord = {
        appointmentId: 'SMH-2026-' + Math.floor(1000 + Math.random() * 9000),
        doctor: selectedDoctor,
        date: selectedDate,
        time: selectedTimeSlot,
        patient: { ...patientForm },
        concern: selectedConcern || selectedDoctor?.concern || "General Checkup",
        paymentMethod: paymentMethod,
        paymentStatus: isPayAtClinic ? "PAY_ON_ARRIVAL" : "PAID",
        amount: totalAmountPayable,
        consultationFee: consultationFee,
        facilityFee: facilityFee,
        transactionId: generatedTxnId,
        status: 'CONFIRMED',
        bookingDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        bookedAtTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setConfirmedTransaction(transactionRecord);
      setAppointments([transactionRecord, ...appointments]);
      setIsPaymentModalOpen(false);
      setCurrentStep(5);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };


  const handlePrintInvoice = () => {
    window.print();
  };

  const handleAddToCalendar = () => {
    if (!confirmedTransaction) return;
    const title = `Consultation with ${confirmedTransaction.doctor.name}`;
    const desc = `Appointment at ${confirmedTransaction.doctor.hospital}. Booking ID: ${confirmedTransaction.appointmentId}`;
    const loc = confirmedTransaction.doctor.hospital;
    const dateFormatted = confirmedTransaction.date.replace(/-/g, "");
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dateFormatted}T090000Z/${dateFormatted}T100000Z&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(loc)}`;
    window.open(googleCalUrl, "_blank");
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-teal-500 selection:text-white">
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
                              <span className="text-sm font-black text-slate-900">₹{doc.fee} <span className="text-[11px] font-normal text-slate-400">/ visit</span></span>
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

                  {/* Clinical Hours Notice */}
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-blue-100 text-blue-700 shrink-0">
                      <Clock size={16} />
                    </div>
                    <div className="text-xs">
                      <span className="font-bold text-slate-800 block">Hospital Outpatient Timings</span>
                      <span className="text-slate-600">
                        Morning Shift: 09:00 AM – 01:00 PM • Afternoon/Evening Shift: 02:00 PM – 07:00 PM. Night hours (07:00 PM – 09:00 AM) are non-bookable and reserved exclusively for Emergency Casualty.
                      </span>
                    </div>
                  </div>

                  {/* Date Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Appointment Date
                    </label>
                    <input 
                      type="date" 
                      min={new Date().toISOString().split("T")[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full sm:w-72 px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none text-xs font-bold text-slate-800"
                    />
                  </div>

                  {/* Morning Slots */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700">
                      <Sun size={15} />
                      <span>Morning Session (09:00 AM – 01:00 PM)</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                      {MORNING_TIME_SLOTS.map(slot => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                            selectedTimeSlot === slot
                              ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50/40'
                          }`}
                        >
                          <Clock size={12} />
                          <span>{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Evening Slots */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700">
                      <Sunset size={15} />
                      <span>Afternoon & Evening Session (02:00 PM – 07:00 PM)</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
                      {EVENING_TIME_SLOTS.map(slot => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                            selectedTimeSlot === slot
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/40'
                          }`}
                        >
                          <Clock size={12} />
                          <span>{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleNext}
                      disabled={!selectedDate || !selectedTimeSlot}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-xl text-xs flex items-center space-x-2 transition shadow-md disabled:opacity-50"
                    >
                      <span>Continue to Patient Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- STEP 2: PATIENT DETAILS --- */}
          {currentStep === 2 && (
            <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Patient Information & Symptoms</h2>
                <p className="text-xs text-slate-500 mt-1">Provide clinical details for the consulting specialist.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input 
                    type="text"
                    name="fullName"
                    value={patientForm.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 outline-none focus:border-teal-500"
                  />
                  {formErrors.fullName && <p className="text-red-500 text-[10px] mt-1">{formErrors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input 
                    type="email"
                    name="email"
                    value={patientForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 outline-none focus:border-teal-500"
                  />
                  {formErrors.email && <p className="text-red-500 text-[10px] mt-1">{formErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input 
                    type="text"
                    name="phoneNumber"
                    value={patientForm.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 outline-none focus:border-teal-500"
                  />
                  {formErrors.phoneNumber && <p className="text-red-500 text-[10px] mt-1">{formErrors.phoneNumber}</p>}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">Age & Gender</label>
                    <span className="text-[10px] font-semibold text-slate-400">Calculated from DOB</span>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="number"
                      name="age"
                      value={patientForm.age}
                      onChange={handleInputChange}
                      placeholder="Age"
                      min="1"
                      max="120"
                      className="w-24 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 outline-none focus:border-teal-500"
                    />
                    <select
                      name="gender"
                      value={patientForm.gender}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 outline-none focus:border-teal-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {formErrors.age && <p className="text-red-500 text-[10px] mt-1">{formErrors.age}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Health Symptoms & Consultation Reason</label>
                <textarea 
                  name="symptoms"
                  rows={3}
                  value={patientForm.symptoms}
                  onChange={handleInputChange}
                  placeholder="Describe your current medical symptoms, duration, or reason for consultation (e.g. fever, headache, routine checkup)..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:border-teal-500"
                />
                {formErrors.symptoms && <p className="text-red-500 text-[10px] mt-1">{formErrors.symptoms}</p>}
              </div>

              <div className="flex justify-between pt-4">
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
                  <span>Review Booking & Bill</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* --- STEP 3: REVIEW & ITEMIZED BILL BREAKDOWN --- */}
          {currentStep === 3 && (
            <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Review Booking & Cost Summary</h2>
                <p className="text-xs text-slate-500 mt-1">Verify clinical consultation details and itemized hospital fees.</p>
              </div>
              
              {/* Doctor & Appointment Summary */}
              <div className="bg-slate-50 p-5 rounded-2xl space-y-3.5 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2.5">
                  <span className="text-slate-500 font-medium">Selected Specialist:</span>
                  <span className="font-bold text-slate-900">{selectedDoctor?.name} ({selectedDoctor?.specialization})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2.5">
                  <span className="text-slate-500 font-medium">Date & Slot:</span>
                  <span className="font-bold text-teal-600">{selectedDate} at {selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2.5">
                  <span className="text-slate-500 font-medium">Hospital Center:</span>
                  <span className="font-semibold text-slate-700">{selectedDoctor?.hospital}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Patient:</span>
                  <span className="font-bold text-slate-900">{patientForm.fullName} ({patientForm.gender}, {patientForm.age} yrs)</span>
                </div>
              </div>

              {/* Itemized Bill Breakdown */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-200/80 space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Receipt size={14} className="text-blue-600" />
                  <span>Itemized Fee Breakdown</span>
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Specialist Consultation Fee ({selectedDoctor?.specialization})</span>
                    <span className="font-bold text-slate-900">₹{consultationFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Digital Hospital Facility & Safety Surcharge</span>
                    <span className="font-bold text-slate-900">₹{facilityFee}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Healthcare GST (0% Tax-Exempt)</span>
                    <span className="font-bold text-emerald-600">₹0 (Free)</span>
                  </div>
                  <div className="pt-2.5 border-t border-slate-200 flex justify-between text-sm sm:text-base font-black text-slate-900">
                    <span>Total Payable Amount</span>
                    <span className="text-blue-600">₹{totalAmountPayable.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button 
                  onClick={handleBack} 
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center space-x-2 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button 
                  onClick={handleNext} 
                  className="px-7 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold rounded-xl text-xs shadow-md flex items-center gap-2 transition cursor-pointer"
                >
                  <span>Select Payment Method (₹{totalAmountPayable.toLocaleString()})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* --- STEP 4: PAYMENT METHOD SELECTION & CHECKOUT --- */}
          {currentStep === 4 && (
            <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Choose Payment Method</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Select your preferred payment channel or choose to pay at the clinic.</p>
                </div>
                <div className="p-2.5 px-3.5 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-2 self-start sm:self-auto">
                  <ShieldCheck size={16} className="text-blue-600" />
                  <span className="text-xs font-black text-blue-900">Total: ₹{totalAmountPayable.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Methods Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "UPI", label: "UPI / QR Code", icon: QrCode, badge: "Instant" },
                  { id: "CARD", label: "Credit / Debit Card", icon: CreditCard, badge: "Secure" },
                  { id: "NET_BANKING", label: "Net Banking", icon: Building2, badge: "Direct" },
                  { id: "PAY_AT_CLINIC", label: "Pay at Clinic", icon: Wallet, badge: "Zero Upfront" }
                ].map(method => {
                  const Icon = method.icon;
                  const isSelected = paymentMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3.5 rounded-2xl border-2 transition text-left flex flex-col justify-between cursor-pointer ${
                        isSelected 
                          ? 'border-blue-600 bg-blue-50/40 shadow-xs' 
                          : 'border-slate-100 hover:border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <Icon size={16} />
                        </div>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isSelected ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                          {method.badge}
                        </span>
                      </div>
                      <span className={`text-xs font-bold mt-3 block ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>
                        {method.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Payment Channel Sub-Panel */}
              <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                
                {/* 1. UPI / QR Tab */}
                {paymentMethod === "UPI" && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      {/* Realistic Simulated QR Box */}
                      <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col items-center shrink-0">
                        <div className="w-32 h-32 bg-slate-900 rounded-xl p-2 flex flex-col items-center justify-between text-white">
                          <div className="w-full flex justify-between">
                            <div className="w-6 h-6 border-2 border-white rounded-xs p-0.5"><div className="w-full h-full bg-white"></div></div>
                            <div className="w-6 h-6 border-2 border-white rounded-xs p-0.5"><div className="w-full h-full bg-white"></div></div>
                          </div>
                          <div className="text-[9px] font-black tracking-widest text-teal-300 uppercase">SMART HEALTH UPI</div>
                          <div className="w-full flex justify-between">
                            <div className="w-6 h-6 border-2 border-white rounded-xs p-0.5"><div className="w-full h-full bg-white"></div></div>
                            <div className="w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center text-slate-900 text-[8px] font-black">₹</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 mt-1.5">Scan with Any UPI App</span>
                      </div>

                      {/* UPI ID input */}
                      <div className="space-y-3 flex-1 w-full">
                        <span className="text-xs font-bold text-slate-800 block">Or Enter Your UPI ID</span>
                        <div className="relative">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => { setUpiId(e.target.value); setUpiVerified(false); }}
                            placeholder="username@bank (e.g. name@oksbi)"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => setUpiVerified(true)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black cursor-pointer"
                          >
                            {upiVerified ? "Verified ✓" : "Verify ID"}
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 text-[11px] text-slate-500">
                          <span className="font-semibold">Supported:</span>
                          <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-bold text-slate-700">Google Pay</span>
                          <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-bold text-slate-700">PhonePe</span>
                          <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-bold text-slate-700">Paytm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Card Tab */}
                {paymentMethod === "CARD" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardData.cardNumber}
                          onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                          placeholder="4532 •••• •••• 8821"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Name on Card</label>
                        <input
                          type="text"
                          value={cardData.cardHolder}
                          onChange={(e) => setCardData({ ...cardData, cardHolder: e.target.value })}
                          placeholder="Piyush Dahiwale"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          placeholder="MM/YY"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">CVV / CVC</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          placeholder="•••"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                      <ShieldCheck size={14} className="text-emerald-600" />
                      <span>Secured with 256-Bit SSL & 3D Secure OTP verification.</span>
                    </div>
                  </div>
                )}

                {/* 3. Net Banking Tab */}
                {paymentMethod === "NET_BANKING" && (
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-700 block">Select Your Bank</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {["HDFC Bank", "State Bank of India", "ICICI Bank", "Axis Bank", "Kotak Mahindra", "Punjab National Bank"].map(b => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setSelectedBank(b)}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition text-left cursor-pointer ${
                            selectedBank === b 
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Pay at Clinic Tab */}
                {paymentMethod === "PAY_AT_CLINIC" && (
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                    <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                      <Wallet size={16} />
                      <span>Zero Upfront Payment Required</span>
                    </div>
                    <p className="text-xs text-amber-900 leading-relaxed">
                      Your appointment slot with <strong>{selectedDoctor?.name}</strong> will be immediately confirmed and locked. You can conveniently pay the consultation fee of <strong>₹{totalAmountPayable.toLocaleString()}</strong> in Cash, UPI, or Card at the hospital reception counter before your visit.
                    </p>
                  </div>
                )}

              </div>

              {bookingError && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{bookingError}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between pt-4">
                <button 
                  disabled={isSubmitting}
                  onClick={handleBack} 
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs disabled:opacity-50 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 inline mr-1" />
                  <span>Back to Review</span>
                </button>
                <button 
                  disabled={isSubmitting}
                  onClick={handleInitiatePayment} 
                  className="px-7 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl text-xs shadow-md flex items-center gap-2 disabled:opacity-75 transition cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing Payment & Booking...</span>
                    </>
                  ) : paymentMethod === "PAY_AT_CLINIC" ? (
                    <span>Confirm & Pay at Clinic (₹{totalAmountPayable.toLocaleString()})</span>
                  ) : (
                    <span>Pay ₹{totalAmountPayable.toLocaleString()} & Confirm Booking</span>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* --- STEP 5: OFFICIAL CONFIRMATION & DIGITAL INVOICE --- */}
          {currentStep === 5 && (
            <div className="max-w-3xl mx-auto space-y-6">
              
              {/* Top Banner */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Appointment Confirmed Successfully!</h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  Your appointment with <strong className="text-slate-800">{confirmedTransaction?.doctor?.name}</strong> has been registered in the SmartHealth hospital records.
                </p>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
                  <span>Booking Reference:</span>
                  <span className="text-blue-600 font-black">{confirmedTransaction?.appointmentId}</span>
                </div>
              </div>

              {/* Digital Tax Invoice & Clinical Slip */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                
                {/* Slip Header */}
                <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-teal-400 font-black text-sm">
                      <HeartPulse size={18} />
                      <span>SmartHealth Medical Center</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Official Clinical Booking & Payment Receipt</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${
                      confirmedTransaction?.paymentStatus === 'PAID' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' 
                        : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                    }`}>
                      {confirmedTransaction?.paymentStatus === 'PAID' ? '✓ Paid Online' : 'Pay at Clinic Desk'}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">Txn ID: {confirmedTransaction?.transactionId}</p>
                  </div>
                </div>

                {/* Slip Body */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Grid info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Patient Details</span>
                      <p className="font-bold text-slate-800 text-sm">{confirmedTransaction?.patient?.fullName}</p>
                      <p className="text-slate-500">{confirmedTransaction?.patient?.phoneNumber} • {confirmedTransaction?.patient?.email}</p>
                      <p className="text-slate-500">Reason: {confirmedTransaction?.patient?.symptoms}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Consultation Schedule</span>
                      <p className="font-bold text-slate-800 text-sm">{confirmedTransaction?.doctor?.name}</p>
                      <p className="text-teal-600 font-bold">{confirmedTransaction?.date} at {confirmedTransaction?.time}</p>
                      <p className="text-slate-500">{confirmedTransaction?.doctor?.hospital}</p>
                    </div>
                  </div>

                  {/* Financial Table */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                        <tr>
                          <th className="p-3.5 px-4">Description</th>
                          <th className="p-3.5 px-4 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="p-3.5 px-4 font-medium">Outpatient Consultation Fee ({confirmedTransaction?.doctor?.specialization})</td>
                          <td className="p-3.5 px-4 text-right font-bold text-slate-900">₹{confirmedTransaction?.consultationFee?.toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 px-4 font-medium">Digital Clinic Facility & Surcharge</td>
                          <td className="p-3.5 px-4 text-right font-bold text-slate-900">₹{confirmedTransaction?.facilityFee}</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 px-4 font-medium">Healthcare GST (0% Exempt)</td>
                          <td className="p-3.5 px-4 text-right font-bold text-emerald-600">₹0</td>
                        </tr>
                        <tr className="bg-slate-50/80 font-black text-slate-900 text-sm">
                          <td className="p-4">Total Amount</td>
                          <td className="p-4 text-right text-blue-600">₹{confirmedTransaction?.amount?.toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>

                {/* Slip Action Buttons */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrintInvoice}
                      className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                    >
                      <Printer size={15} />
                      <span>Print / PDF Receipt</span>
                    </button>
                    <button
                      onClick={handleAddToCalendar}
                      className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                    >
                      <Calendar size={15} />
                      <span>Add to Google Calendar</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to="/patient/dashboard?tab=My Appointments"
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold rounded-xl text-xs transition shadow-md flex items-center gap-2"
                    >
                      <CalendarCheck size={16} />
                      <span>View in My Appointments</span>
                    </Link>
                  </div>
                </div>

              </div>

              {/* Reset to book another */}
              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setSelectedDoctor(null);
                    setSelectedDate('');
                    setSelectedTimeSlot('');
                    setConfirmedTransaction(null);
                    setBookingError('');
                  }}
                  className="text-xs font-bold text-slate-400 hover:text-blue-600 transition cursor-pointer"
                >
                  ← Book Another Appointment
                </button>
              </div>

            </div>
          )}

          {/* Mock Payment Gateway Modal */}
          <MockPaymentGatewayModal
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
            paymentMethod={paymentMethod}
            amount={totalAmountPayable}
            patientName={patientForm.fullName}
            doctorName={selectedDoctor?.name}
            clinicName={selectedDoctor?.hospital}
            upiId={upiId}
            cardData={cardData}
            bankName={selectedBank}
            onPaymentSuccess={(gatewayResult) => {
              handleConfirmBooking(gatewayResult);
            }}
            onPaymentFailure={(errMsg) => {
              setBookingError(errMsg);
            }}
          />

        </main>
      </motion.div>
      <Footer />
    </div>
  );
}
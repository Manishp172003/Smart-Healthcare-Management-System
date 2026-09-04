import { useState, useEffect } from "react";
import {
  Heart,
  Smile,
  Sparkles,
  Activity,
  Stethoscope,
  Bone,
  HeartPulse,
  ChevronRight,
  Calendar,
  Clock,
  ArrowLeft,
  CalendarCheck2,
  Video,
  MapPin,
  Loader2,
  AlertCircle,
  CheckCircle,
  X,
  Search,
  Filter,
  Star,
  ChevronDown,
  User,
  GraduationCap,
  Award,
  ThumbsUp,
  TrendingUp,
  Shield,
  CreditCard,
  CheckSquare,
  Square,
  Camera,
  Mic,
  Monitor,
  Bell,
  FileText,
  Info,
  Eye,
  Brain
} from "lucide-react";
import { CANONICAL_DOCTORS, getDoctorAvatar, getDoctorDetails } from "../../data/doctorsData";
import { API_BASE_URL } from "../../config/api";

const departments = [
  { id: "Cardiology", label: "Cardiology", icon: Heart, desc: "Heart & cardiovascular care", bg: "bg-red-50 text-red-600 border-red-100" },
  { id: "Neurology", label: "Neurology", icon: Activity, desc: "Brain, spine & nervous system", bg: "bg-purple-50 text-purple-600 border-purple-100" },
  { id: "Dermatology", label: "Dermatology", icon: Sparkles, desc: "Skin, hair & aesthetic care", bg: "bg-amber-50 text-amber-600 border-amber-100" },
  { id: "Orthopedics", label: "Orthopedics", icon: Bone, desc: "Bones, joints & spine care", bg: "bg-blue-50 text-blue-600 border-blue-100" },
  { id: "Pediatrics", label: "Pediatrics", icon: Smile, desc: "Infant & child healthcare", bg: "bg-teal-50 text-teal-600 border-teal-100" },
  { id: "General Practice", label: "General Medicine", icon: Stethoscope, desc: "Primary care & routine exams", bg: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { id: "Gynecology", label: "Gynecology & Obstetrics", icon: HeartPulse, desc: "Women's wellness & maternity", bg: "bg-rose-50 text-rose-600 border-rose-100" },
  { id: "Dentistry", label: "Dentistry", icon: Smile, desc: "Dental care & oral surgery", bg: "bg-cyan-50 text-cyan-600 border-cyan-100" },
  { id: "Ophthalmology", label: "Ophthalmology", icon: Eye, desc: "Eye care & vision surgery", bg: "bg-indigo-50 text-indigo-600 border-indigo-100" },
  { id: "Endocrinology", label: "Endocrinology", icon: Activity, desc: "Diabetes & hormonal health", bg: "bg-violet-50 text-violet-600 border-violet-100" },
  { id: "Nephrology", label: "Nephrology", icon: Activity, desc: "Kidney care & dialysis", bg: "bg-sky-50 text-sky-600 border-sky-100" },
  { id: "Psychiatry", label: "Psychiatry", icon: Brain, desc: "Mental wellness & therapy", bg: "bg-lime-50 text-lime-700 border-lime-100" },
  { id: "Gastroenterology", label: "Gastroenterology", icon: HeartPulse, desc: "Digestive & liver care", bg: "bg-orange-50 text-orange-600 border-orange-100" }
];

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:30 PM"];

const BookAppointment = ({ setActiveTab }) => {
  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [reason, setReason] = useState("");

  // New Phase 1 state
  const [appointmentType, setAppointmentType] = useState("in-person"); // "in-person" or "telehealth"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  // Phase 2 state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceFilter, setPriceFilter] = useState("all"); // "all", "low", "medium", "high"
  const [selectedDoctorProfile, setSelectedDoctorProfile] = useState(null);
  const [showDoctorProfile, setShowDoctorProfile] = useState(false);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [recommendedSpecialty, setRecommendedSpecialty] = useState("");
  const [hasSearchedRecs, setHasSearchedRecs] = useState(false);
  const [symptoms, setSymptoms] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Phase 3 state
  const [insuranceVerified, setInsuranceVerified] = useState(false);
  const [insuranceInfo, setInsuranceInfo] = useState(null);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [preVisitChecklist, setPreVisitChecklist] = useState([
    { id: 1, text: "Bring ID and insurance card", checked: false },
    { id: 2, text: "List current medications", checked: false },
    { id: 3, text: "Prepare medical history", checked: false },
    { id: 4, text: "Write down symptoms", checked: false },
    { id: 5, text: "Bring previous test results", checked: false }
  ]);
  const [showVideoCheck, setShowVideoCheck] = useState(false);
  const [videoCheckComplete, setVideoCheckComplete] = useState(false);
  const [favoriteDoctors, setFavoriteDoctors] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);

  // Fetch doctors from backend when department is selected
  useEffect(() => {
    const fetchDoctors = async () => {
      if (!selectedDept) return;

      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${API_BASE_URL}/api/doctors/specialty/${selectedDept}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
        } else {
          // Fallback to canonical doctors if backend call fails
          const fallbackData = CANONICAL_DOCTORS.filter(doc =>
            doc.specialty.toLowerCase().includes(selectedDept.toLowerCase()) ||
            selectedDept.toLowerCase().includes(doc.specialty.toLowerCase()) ||
            (selectedDept === "General Practice" && doc.specialty === "General Medicine")
          );
          setDoctors(fallbackData);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
        // Fallback to canonical doctors
        const fallbackData = CANONICAL_DOCTORS.filter(doc =>
          doc.specialty.toLowerCase().includes(selectedDept.toLowerCase()) ||
          selectedDept.toLowerCase().includes(doc.specialty.toLowerCase()) ||
          (selectedDept === "General Practice" && doc.specialty === "General Medicine")
        );
        setDoctors(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [selectedDept]);

  // Fetch available slots when doctor and date are selected
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!selectedDoc || !selectedDate) return;

      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/appointments/availability?doctorId=${selectedDoc.id}&date=${selectedDate}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAvailableSlots(data.availableSlots || timeSlots);
        } else {
          // Fallback to default slots
          setAvailableSlots(timeSlots);
        }
      } catch (err) {
        console.error("Error fetching availability:", err);
        // Fallback to default slots
        setAvailableSlots(timeSlots);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableSlots();
  }, [selectedDoc, selectedDate]);

  const handleNextStep = () => {
    // Validation before proceeding
    if (step === 1 && !selectedDept) {
      setError("Please select a department");
      return;
    }
    if (step === 2 && !selectedDoc) {
      setError("Please select a doctor");
      return;
    }
    if (step === 3 && (!selectedDate || !selectedSlot)) {
      setError("Please select both date and time slot");
      return;
    }

    setError("");
    setStep(prev => prev + 1);
  };

  const handleBackStep = () => {
    setError("");
    setStep(prev => prev - 1);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      setError("Please provide a reason for your visit");
      return;
    }

    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const parsedUserId = userId ? parseInt(userId, 10) : null;

    // Convert "09:00 AM" / "02:00 PM" into 24-hr "HH:mm:ss"
    let formattedTime = selectedSlot;
    if (selectedSlot && (selectedSlot.includes("AM") || selectedSlot.includes("PM"))) {
      const [timePart, modifier] = selectedSlot.split(" ");
      let [h, m] = timePart.split(":");
      let hours = parseInt(h, 10);
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;
      formattedTime = `${String(hours).padStart(2, "0")}:${m}:00`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          patientUserId: parsedUserId,
          doctorId: selectedDoc.id,
          appointmentDate: selectedDate,
          startTime: formattedTime,
          reason: reason,
          appointmentType: appointmentType
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        window.dispatchEvent(new Event("appointmentsUpdated"));
        window.dispatchEvent(new Event("appointmentBooked"));
        setTimeout(() => {
          setActiveTab("My Appointments");
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to book appointment. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.length > 0 ? doctors : CANONICAL_DOCTORS.filter(doc =>
    doc.specialty.toLowerCase().includes(selectedDept.toLowerCase()) ||
    selectedDept.toLowerCase().includes(doc.specialty.toLowerCase()) ||
    (selectedDept === "General Practice" && doc.specialty === "General Medicine")
  );

  // Map backend doctors to UI format using canonical image and details resolver
  const displayDoctors = filteredDoctors.map(doc => {
    const details = getDoctorDetails(doc);
    return {
      id: doc.id || details.id,
      name: doc.user?.name || doc.name || details.name,
      specialty: doc.specialization || doc.specialty || details.specialty,
      fee: typeof doc.fee === "string" ? doc.fee : `₹${doc.consultationFee || doc.fee || details.fee}`,
      avatar: getDoctorAvatar(doc),
      rating: doc.rating || details.rating,
      bio: doc.bio || details.bio,
      education: doc.education || details.education,
      experience: doc.experience || details.experience,
      hospital: doc.hospital || details.hospital,
      telehealth: doc.supportsTelehealth !== false && doc.telehealth !== false
    };
  });

  // Phase 2: Filter doctors based on search and filters
  const applyFilters = (doctorsList) => {
    return doctorsList.filter(doc => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          doc.name.toLowerCase().includes(query) ||
          doc.specialty.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Rating filter
      if (ratingFilter > 0) {
        const docRating = parseFloat(doc.rating);
        if (docRating < ratingFilter) return false;
      }

      // Price filter
      if (priceFilter !== "all") {
        const price = parseInt(doc.fee.replace(/[^0-9]/g, ""));
        if (priceFilter === "low" && price > 500) return false;
        if (priceFilter === "medium" && (price < 500 || price > 700)) return false;
        if (priceFilter === "high" && price < 700) return false;
      }

      return true;
    });
  };

  const availableDoctorsDisplay = applyFilters(displayDoctors);

  // Phase 2: Fetch appointment history for selected doctor
  const fetchAppointmentHistory = async (doctorId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments/doctor-id/${doctorId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAppointmentHistory(data);
      }
    } catch (err) {
      console.error("Error fetching appointment history:", err);
    }
  };

  // Phase 2: Get doctor recommendations based on symptoms
  const getRecommendations = async () => {
    if (!symptoms.trim()) return;

    setLoading(true);
    setHasSearchedRecs(true);
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { "Authorization": `Bearer ${token}` } : {};
      const response = await fetch(`${API_BASE_URL}/api/doctors/recommend?symptoms=${encodeURIComponent(symptoms)}`, {
        headers
      });
      if (response.ok) {
        const data = await response.json();
        setRecommendedSpecialty(data.recommendedSpecialty || "");
        // Map backend doctors to UI format with canonical avatar resolver
        const mappedDoctors = (data.doctors || []).map(doc => {
          const details = getDoctorDetails(doc);
          return {
            id: doc.id || details.id,
            name: doc.user?.name || doc.name || details.name,
            specialty: doc.specialization || doc.specialty || details.specialty,
            fee: typeof doc.fee === "string" ? doc.fee : `₹${doc.consultationFee || doc.fee || details.fee}`,
            avatar: getDoctorAvatar(doc),
            rating: doc.rating || details.rating,
            experience: doc.experience || details.experience
          };
        });
        setRecommendations(mappedDoctors);
      }
    } catch (err) {
      console.error("Error getting recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  // Phase 2: Show doctor profile
  const showDoctorProfileModal = (doctor) => {
    const details = getDoctorDetails(doctor);
    setSelectedDoctorProfile({
      ...details,
      ...doctor,
      avatar: getDoctorAvatar(doctor),
      fee: typeof doctor.fee === "string" ? doctor.fee : `₹${doctor.consultationFee || doctor.fee || details.fee}`,
      bio: doctor.bio || details.bio,
      education: doctor.education || details.education,
      hospital: doctor.hospital || details.hospital
    });
    setShowDoctorProfile(true);
    fetchAppointmentHistory(doctor.id);
  };

  // Phase 2: Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= totalDays; i++) {
      const day = new Date(year, month, i);
      day.setHours(0, 0, 0, 0);
      days.push(day);
    }

    return days;
  };

  // Phase 3: Insurance verification
  const verifyInsurance = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/api/patient/insurance`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setInsuranceInfo(data);
        setInsuranceVerified(true);
        // Calculate estimated cost
        const baseFee = selectedDoc?.fee ? parseInt(selectedDoc.fee.replace(/[^0-9]/g, "")) : 500;
        const insuranceCoverage = data.coveragePercentage || 0;
        const estimated = baseFee * (1 - insuranceCoverage / 100);
        setEstimatedCost(estimated);
      }
    } catch (err) {
      console.error("Error verifying insurance:", err);
    }
  };

  // Phase 3: Toggle favorite doctor
  const toggleFavorite = async (doctorId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/api/patient/favorites/${doctorId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        setIsFavorite(!isFavorite);
        // Update favorites list
        if (isFavorite) {
          setFavoriteDoctors(favoriteDoctors.filter(id => id !== doctorId));
        } else {
          setFavoriteDoctors([...favoriteDoctors, doctorId]);
        }
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  // Phase 3: Check if doctor is favorite
  const checkFavoriteStatus = (doctorId) => {
    setIsFavorite(favoriteDoctors.includes(doctorId));
  };

  // Phase 3: Load favorite doctors
  const loadFavoriteDoctors = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/api/patient/favorites`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setFavoriteDoctors(data.map(doc => doc.id));
      }
    } catch (err) {
      console.error("Error loading favorites:", err);
    }
  };

  // Phase 3: Pre-visit checklist toggle
  const toggleChecklistItem = (id) => {
    setPreVisitChecklist(preVisitChecklist.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  // Phase 3: Video equipment check
  const checkVideoEquipment = async () => {
    try {
      // Check camera and microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      stream.getTracks().forEach(track => track.stop());
      setVideoCheckComplete(true);
      setShowVideoCheck(false);
    } catch (err) {
      console.error("Video equipment check failed:", err);
      alert("Could not access camera or microphone. Please check permissions.");
    }
  };

  // Phase 3: Load favorites on component mount
  useEffect(() => {
    loadFavoriteDoctors();
  }, []);

  // Phase 3: Check favorite status when doctor is selected
  useEffect(() => {
    if (selectedDoc?.id) {
      checkFavoriteStatus(selectedDoc.id);
    }
  }, [selectedDoc]);

  return (
    <div className="space-y-6">
      

      {/* Progress Steps Header */}
      <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step >= s 
                  ? "bg-gradient-to-br from-[#2563EB] to-[#0D9488] text-white" 
                  : "bg-slate-100 text-slate-400"
              }`}>
                {s}
              </div>
              {s < 4 && <ChevronRight className="text-slate-300 w-4 h-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Type Selection */}
      <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">Appointment Type</label>
        <div className="flex gap-4">
          <button
            onClick={() => setAppointmentType("in-person")}
            className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition ${
              appointmentType === "in-person"
                ? "border-[#2563EB] bg-[#2563EB]/5"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <MapPin size={20} className={appointmentType === "in-person" ? "text-[#2563EB]" : "text-slate-400"} />
            <div className="text-left">
              <span className={`text-sm font-bold ${appointmentType === "in-person" ? "text-[#2563EB]" : "text-slate-700"}`}>
                In-Person
              </span>
              <p className="text-xs text-slate-500">Visit the clinic</p>
            </div>
          </button>
          <button
            onClick={() => setAppointmentType("telehealth")}
            className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition ${
              appointmentType === "telehealth"
                ? "border-[#0D9488] bg-[#0D9488]/5"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <Video size={20} className={appointmentType === "telehealth" ? "text-[#0D9488]" : "text-slate-400"} />
            <div className="text-left">
              <span className={`text-sm font-bold ${appointmentType === "telehealth" ? "text-[#0D9488]" : "text-slate-700"}`}>
                Telehealth
              </span>
              <p className="text-xs text-slate-500">Video consultation</p>
            </div>
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 animate-view-fade-in-up">
          <AlertCircle size={20} className="text-red-500" />
          <span className="text-sm text-red-700 font-semibold">{error}</span>
          <button
            onClick={() => setError("")}
            className="ml-auto text-red-400 hover:text-red-600 transition"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Phase 2: Smart Recommendations */}
      <div className="bg-gradient-to-r from-[#2563EB]/5 to-[#0D9488]/5 border border-[#2563EB]/20 rounded-2xl p-5">
        <h4 className="text-sm font-extrabold text-slate-800 mb-3 flex items-center gap-2">
          <Sparkles size={16} className="text-[#2563EB]" />
          Smart Doctor Recommendations
        </h4>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Describe symptoms (e.g., chest pain, headache, skin rash, knee injury)..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                getRecommendations();
              }
            }}
            className="flex-1 px-4 py-2.5 bg-white/70 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition shadow-2xs"
          />
          <button
            onClick={getRecommendations}
            disabled={loading || !symptoms.trim()}
            className="px-4 py-2.5 bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white rounded-xl text-sm font-bold hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer shrink-0"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <ThumbsUp size={16} />}
            Get Recommendations
          </button>
        </div>

        {/* Quick Symptom Chips */}
        <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
          <span className="text-[11px] font-semibold text-slate-500 mr-1">Quick Suggestions:</span>
          {[
            { label: "Chest Pain", symptom: "chest pain" },
            { label: "Fever & Flu", symptom: "fever cold" },
            { label: "Severe Headache", symptom: "headache migraine" },
            { label: "Skin Rash & Acne", symptom: "skin rash" },
            { label: "Joint & Knee Pain", symptom: "joint knee pain" },
            { label: "Pregnancy & Maternity", symptom: "pregnancy care" }
          ].map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => {
                setSymptoms(chip.symptom);
                // Trigger recommendation fetch
                setTimeout(() => {
                  setSymptoms(chip.symptom);
                }, 0);
              }}
              className="text-[11px] px-2.5 py-1 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-[#2563EB] border border-slate-200/80 hover:border-blue-300 transition shadow-2xs cursor-pointer"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {recommendations.length > 0 && (
          <div className="mt-4 space-y-2.5 pt-3 border-t border-slate-200/60">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-600 font-bold flex items-center gap-1.5">
                <Sparkles size={13} className="text-[#0D9488]" />
                Based on your symptoms, we recommend:
              </p>
              {recommendedSpecialty && (
                <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                  Recommended Specialty: {recommendedSpecialty}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {recommendations.map(doc => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3.5 bg-white/80 border border-slate-200 rounded-xl hover:bg-white hover:border-[#2563EB] hover:shadow-md transition cursor-pointer group"
                  onClick={() => {
                    setSelectedDoc(doc);
                    setSelectedDept(doc.specialty);
                    setSymptoms("");
                    setRecommendations([]);
                    setHasSearchedRecs(false);
                    handleNextStep();
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={doc.avatar} alt={doc.name} className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-extrabold text-slate-900 text-xs truncate group-hover:text-[#2563EB] transition-colors">{doc.name}</p>
                      <p className="text-[11px] text-slate-500 font-medium truncate">{doc.specialty}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] font-bold text-[#0D9488]">{doc.fee}</span>
                        <span className="text-[10px] text-amber-600 font-semibold flex items-center gap-0.5">
                          <Star size={10} className="fill-amber-400 text-amber-400" /> {doc.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#2563EB] shrink-0 pl-2">
                    <span>Select</span>
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {hasSearchedRecs && recommendations.length === 0 && !loading && (
          <p className="text-xs text-slate-600 mt-3 font-medium bg-amber-50/80 border border-amber-200/60 p-2.5 rounded-xl">
            No specific specialist matched "{symptoms}". We recommend selecting <strong>General Medicine</strong> above for comprehensive assessment.
          </p>
        )}
      </div>

      {/* Success Display */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-center gap-4 animate-view-fade-in-up">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle size={24} className="text-green-500" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-green-800">Appointment Booked Successfully!</h4>
            <p className="text-sm text-green-600">Redirecting to your appointments...</p>
          </div>
        </div>
      )}

      {/* STEP 1: SELECT DEPARTMENT */}
      {step === 1 && (
        <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
          <h3 className="text-base font-extrabold text-slate-800">1. Select a Department</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map(dept => {
              const Icon = dept.icon;
              return (
                <button
                  key={dept.id}
                  onClick={() => {
                    setSelectedDept(dept.id);
                    setSelectedDoc(null);
                    handleNextStep();
                  }}
                  className={`flex items-start gap-4 p-5 bg-white/50 backdrop-blur-sm border rounded-2xl text-left transition hover:shadow-md cursor-pointer ${
                    selectedDept === dept.id ? "border-[#2563EB] ring-2 ring-blue-50/50" : "border-white/40"
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${dept.bg}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm md:text-base leading-tight">{dept.label}</h4>
                    <p className="text-slate-400 text-xs mt-1.5 leading-snug">{dept.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: SELECT DOCTOR */}
      {step === 2 && (
        <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
          <div className="flex items-center gap-3">
            <button onClick={handleBackStep} className="p-2 bg-white/40 border border-white/20 rounded-xl hover:bg-white/60 transition cursor-pointer">
              <ArrowLeft size={16} className="text-slate-600" />
            </button>
            <h3 className="text-base font-extrabold text-slate-800">2. Select a Specialist ({selectedDept})</h3>
          </div>

          {/* Phase 2: Search and Filters */}
          <div className="space-y-3">
            {/* Search Bar */}
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/40 rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-50/50 transition"
              />
            </div>

            {/* Filter Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  filterOpen ? "bg-[#2563EB] text-white" : "bg-white/50 border border-white/40 text-slate-700 hover:bg-white/60"
                }`}
              >
                <Filter size={16} />
                Filters
                <ChevronDown size={16} className={`transition-transform ${filterOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Active Filters Count */}
              {(ratingFilter > 0 || priceFilter !== "all") && (
                <span className="text-xs text-slate-500 font-semibold">
                  {((ratingFilter > 0 ? 1 : 0) + (priceFilter !== "all" ? 1 : 0))} filter(s) active
                </span>
              )}
            </div>

            {/* Filter Panel */}
            {filterOpen && (
              <div className="bg-white/50 border border-white/40 rounded-xl p-4 space-y-4 animate-[fadeIn_0.2s_ease-out]">
                {/* Rating Filter */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Minimum Rating</label>
                  <div className="flex gap-2">
                    {[4.0, 4.5, 4.8].map(rating => (
                      <button
                        key={rating}
                        onClick={() => setRatingFilter(rating === ratingFilter ? 0 : rating)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition ${
                          ratingFilter === rating
                            ? "bg-[#2563EB] text-white"
                            : "bg-white/40 border border-white/30 text-slate-700 hover:bg-white/60"
                        }`}
                      >
                        <Star size={14} className={ratingFilter === rating ? "fill-white" : "fill-slate-300"} />
                        {rating}+
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Price Range</label>
                  <div className="flex gap-2">
                    {[
                      { value: "all", label: "All" },
                      { value: "low", label: "≤ ₹500" },
                      { value: "medium", label: "₹500-700" },
                      { value: "high", label: "≥ ₹700" }
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setPriceFilter(value)}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                          priceFilter === value
                            ? "bg-[#2563EB] text-white"
                            : "bg-white/40 border border-white/30 text-slate-700 hover:bg-white/60"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-12 bg-white/60 border border-white/45 rounded-3xl">
              <Loader2 size={32} className="text-[#2563EB] animate-spin" />
              <span className="ml-3 text-slate-500 font-semibold">Loading doctors...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableDoctorsDisplay.length === 0 ? (
                <div className="p-8 text-center text-slate-400 col-span-2">
                  No doctors match your current filters. Try adjusting your search or filters.
                </div>
              ) : (
                availableDoctorsDisplay.map(doc => (
                  <div
                    key={doc.id || doc.name}
                    className={`relative bg-white/50 backdrop-blur-sm border rounded-2xl p-5 transition hover:shadow-md ${
                      selectedDoc?.name === doc.name ? "border-[#2563EB] ring-2 ring-blue-50/50" : "border-white/40"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <img src={doc.avatar} alt={doc.name} className="w-14 h-14 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-extrabold text-slate-800 text-sm md:text-base leading-tight">{doc.name}</h4>
                            <span className="text-slate-400 text-[11px] font-bold block mt-1">{doc.specialty}</span>
                          </div>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star size={14} className="fill-yellow-500" />
                            <span className="text-sm font-bold text-slate-700">{doc.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1.5">
                            <TrendingUp size={14} className="text-slate-400" />
                            <span className="text-xs text-slate-500 font-semibold">{doc.experience}</span>
                          </div>
                          {doc.telehealth && (
                            <div className="flex items-center gap-1.5">
                              <Video size={14} className="text-[#0D9488]" />
                              <span className="text-xs text-[#0D9488] font-semibold">Telehealth</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">Fee</span>
                            <strong className="text-slate-900 text-sm font-extrabold">{doc.fee}</strong>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleFavorite(doc.id)}
                              className={`p-1.5 rounded-lg transition ${
                                favoriteDoctors.includes(doc.id)
                                  ? "bg-red-50 text-red-500"
                                  : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                              }`}
                            >
                              <Heart size={16} className={favoriteDoctors.includes(doc.id) ? "fill-red-500" : ""} />
                            </button>
                            <button
                              onClick={() => showDoctorProfileModal(doc)}
                              className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition"
                            >
                              View Profile
                            </button>
                            <button
                              onClick={() => {
                                setSelectedDoc(doc);
                                handleNextStep();
                              }}
                              className="px-3 py-1.5 bg-[#2563EB] text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition"
                            >
                              Select
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* STEP 3: CHOOSE DATE & TIME */}
      {step === 3 && (
        <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
          <div className="flex items-center gap-3">
            <button onClick={handleBackStep} className="p-2 bg-white/40 border border-white/20 rounded-xl hover:bg-white/60 transition cursor-pointer">
              <ArrowLeft size={16} className="text-slate-600" />
            </button>
            <h3 className="text-base font-extrabold text-slate-800">3. Choose Date & Time slot</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md">

            {/* Phase 2: Rich Calendar Widget */}
            <div className="lg:col-span-1 space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Select Calendar Date</label>

              <div className="bg-white border border-white/40 rounded-xl overflow-hidden">
                {/* Calendar Header */}
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#2563EB]/5 to-[#0D9488]/5 border-b border-white/40">
                  <button
                    onClick={() => {
                      const newDate = new Date(currentMonth);
                      newDate.setMonth(newDate.getMonth() - 1);
                      setCurrentMonth(newDate);
                    }}
                    className="p-1.5 hover:bg-white/60 rounded-lg transition"
                  >
                    <ChevronRight size={16} className="text-slate-600 rotate-180" />
                  </button>
                  <span className="font-bold text-slate-800 text-sm">
                    {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <button
                    onClick={() => {
                      const newDate = new Date(currentMonth);
                      newDate.setMonth(newDate.getMonth() + 1);
                      setCurrentMonth(newDate);
                    }}
                    className="p-1.5 hover:bg-white/60 rounded-lg transition"
                  >
                    <ChevronRight size={16} className="text-slate-600" />
                  </button>
                </div>

                {/* Calendar Days */}
                <div className="p-3">
                  {/* Weekday Headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-xs font-bold text-slate-400 py-1">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendarDays().map((day, index) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const isPast = day && day < today;
                      const isSelected = selectedDate === day?.toISOString().split('T')[0];

                      return (
                        <button
                          key={index}
                          onClick={() => {
                            if (day && !isPast) {
                              setSelectedDate(day.toISOString().split('T')[0]);
                            }
                          }}
                          disabled={!day || isPast}
                          className={`aspect-square rounded-lg text-xs font-semibold transition ${
                            !day
                              ? 'invisible'
                              : isPast
                              ? 'text-slate-300 cursor-not-allowed'
                              : isSelected
                              ? 'bg-[#2563EB] text-white'
                              : 'hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          {day ? day.getDate() : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Selected Date Display */}
              {selectedDate && (
                <div className="flex items-center gap-2 p-3 bg-[#2563EB]/5 border border-[#2563EB]/20 rounded-xl">
                  <Calendar size={16} className="text-[#2563EB]" />
                  <span className="text-sm font-bold text-slate-800">
                    {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              )}
            </div>

            {/* Choose Slots */}
            <div className="lg:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Select Time Slot</label>
              {loading ? (
                <div className="flex items-center justify-center py-8 bg-slate-50 border border-slate-200/50 rounded-xl">
                  <Loader2 size={24} className="text-[#2563EB] animate-spin" />
                  <span className="ml-3 text-slate-500 text-sm">Checking availability...</span>
                </div>
              ) : selectedDate ? (
                <div className="grid grid-cols-3 gap-3">
                  {(availableSlots.length > 0 ? availableSlots : timeSlots).map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`h-11 rounded-xl flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                        selectedSlot === slot
                          ? "bg-gradient-to-br from-[#2563EB] to-[#0D9488] text-white shadow-md border-none"
                          : "bg-white/40 border border-white/20 text-slate-600 hover:bg-white/60"
                      }`}
                    >
                      <Clock size={13} className="mr-1" />
                      {slot}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-slate-400 text-xs py-8 text-center bg-slate-50 border border-slate-200/50 rounded-xl">Please select a date on the left to see slots.</div>
              )}
            </div>

          </div>

          {selectedDate && selectedSlot && (
            <div className="flex justify-end mt-4">
              <button 
                onClick={handleNextStep}
                className="h-10 bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none text-white px-6 rounded-xl text-xs font-bold transition hover:shadow-md cursor-pointer"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: REASON & CONFIRM */}
      {step === 4 && (
        <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
          <div className="flex items-center gap-3">
            <button onClick={handleBackStep} className="p-2 bg-white/40 border border-white/20 rounded-xl hover:bg-white/60 transition cursor-pointer">
              <ArrowLeft size={16} className="text-slate-600" />
            </button>
            <h3 className="text-base font-extrabold text-slate-800">4. Enter Reason & Confirm</h3>
          </div>

          <form onSubmit={handleConfirm} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Form side */}
            <div className="lg:col-span-2 bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Tell us the reason for your visit</label>
                <textarea
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Briefly describe your symptoms or reason for scheduling..."
                  rows={5}
                  className="w-full border border-white/40 bg-slate-50/40 rounded-2xl p-4 text-xs md:text-sm text-[#162235] outline-none transition placeholder:text-slate-400 focus:border-[#2563EB]"
                />
              </div>

              {/* Phase 3: Insurance Verification */}
              <div className="bg-gradient-to-r from-[#2563EB]/5 to-[#0D9488]/5 border border-[#2563EB]/20 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                    <Shield size={16} className="text-[#2563EB]" />
                    Insurance Verification
                  </h5>
                  {insuranceVerified ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                      <CheckCircle size={14} className="fill-green-600" />
                      Verified
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={verifyInsurance}
                      className="text-xs font-bold text-[#2563EB] hover:underline"
                    >
                      Verify Now
                    </button>
                  )}
                </div>

                {insuranceVerified && insuranceInfo ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Provider:</span>
                      <span className="font-semibold text-slate-800">{insuranceInfo.provider}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Coverage:</span>
                      <span className="font-semibold text-slate-800">{insuranceInfo.coveragePercentage}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-200">
                      <span className="text-slate-600">Estimated Cost:</span>
                      <span className="font-extrabold text-[#2563EB]">₹{estimatedCost.toFixed(0)}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">Verify your insurance to see estimated costs and coverage.</p>
                )}
              </div>

              {/* Phase 3: Pre-Visit Checklist */}
              <div className="bg-white/50 border border-white/40 rounded-2xl p-5">
                <h5 className="text-sm font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                  <FileText size={16} className="text-[#2563EB]" />
                  Pre-Visit Checklist
                </h5>
                <div className="space-y-2">
                  {preVisitChecklist.map(item => (
                    <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                      <button
                        type="button"
                        onClick={() => toggleChecklistItem(item.id)}
                        className="flex-shrink-0"
                      >
                        {item.checked ? (
                          <CheckSquare size={18} className="text-[#2563EB] fill-[#2563EB]" />
                        ) : (
                          <Square size={18} className="text-slate-400 group-hover:text-slate-600" />
                        )}
                      </button>
                      <span className={`text-sm ${item.checked ? 'text-slate-800 line-through' : 'text-slate-600'}`}>
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Phase 3: Video Equipment Check (Telehealth only) */}
              {appointmentType === "telehealth" && (
                <div className="bg-gradient-to-r from-[#0D9488]/5 to-[#2563EB]/5 border border-[#0D9488]/20 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                      <Video size={16} className="text-[#0D9488]" />
                      Video Equipment Check
                    </h5>
                    {videoCheckComplete ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                        <CheckCircle size={14} className="fill-green-600" />
                        Ready
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowVideoCheck(true)}
                        className="text-xs font-bold text-[#0D9488] hover:underline"
                      >
                        Check Equipment
                      </button>
                    )}
                  </div>

                  {videoCheckComplete ? (
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Camera size={14} className="text-green-500" />
                        <span>Camera OK</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mic size={14} className="text-green-500" />
                        <span>Microphone OK</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">Check your camera and microphone before the appointment.</p>
                  )}
                </div>
              )}
            </div>

            {/* Summary card side */}
            <div className="lg:col-span-1 bg-slate-50/40 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="font-extrabold text-slate-800 text-sm md:text-base border-b border-slate-200/60 pb-3 flex items-center gap-2">
                  <CalendarCheck2 size={18} className="text-[#0D9488]" />
                  Booking Summary
                </h4>

                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">Specialist</span>
                    <strong className="text-slate-800 text-xs md:text-sm font-extrabold block mt-1">{selectedDoc.name}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">Department</span>
                    <strong className="text-slate-800 text-xs md:text-sm font-extrabold block mt-1">{selectedDept}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">Appointment Type</span>
                    <strong className="text-slate-800 text-xs md:text-sm font-extrabold block mt-1 flex items-center gap-1">
                      {appointmentType === "telehealth" ? <Video size={12} className="text-[#0D9488]" /> : <MapPin size={12} className="text-[#2563EB]" />}
                      {appointmentType === "telehealth" ? "Video Consultation" : "In-Person Visit"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">Date</span>
                    <strong className="text-slate-800 text-xs md:text-sm font-extrabold block mt-1">{selectedDate}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">Time Slot</span>
                    <strong className="text-slate-800 text-xs md:text-sm font-extrabold block mt-1">{selectedSlot}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">Fee</span>
                    <strong className="text-[#0d9488] text-sm md:text-base font-extrabold block mt-1">{selectedDoc.fee}</strong>
                  </div>

                  {/* Phase 3: Cost Breakdown */}
                  {insuranceVerified && estimatedCost > 0 && (
                    <div className="pt-3 border-t border-slate-200/60">
                      <button
                        type="button"
                        onClick={() => setShowCostBreakdown(!showCostBreakdown)}
                        className="flex items-center gap-2 text-xs font-bold text-[#2563EB] hover:underline"
                      >
                        <Info size={14} />
                        Cost Breakdown
                        <ChevronDown size={14} className={`transition-transform ${showCostBreakdown ? 'rotate-180' : ''}`} />
                      </button>

                      {showCostBreakdown && (
                        <div className="mt-3 space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Base Fee:</span>
                            <span className="font-semibold">{selectedDoc.fee}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Insurance Coverage:</span>
                            <span className="font-semibold text-green-600">-{insuranceInfo?.coveragePercentage}%</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-slate-200">
                            <span className="font-bold text-slate-800">Your Cost:</span>
                            <span className="font-extrabold text-[#2563EB]">₹{estimatedCost.toFixed(0)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 flex items-center justify-center gap-1.5 h-11 bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none text-white rounded-xl text-xs font-bold transition hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    Confirm Appointment
                    <CalendarCheck2 size={16} />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Phase 2: Doctor Profile Modal */}
      {showDoctorProfile && selectedDoctorProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between z-10">
              <h3 className="text-xl font-extrabold text-slate-800">Doctor Profile</h3>
              <button
                onClick={() => setShowDoctorProfile(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Doctor Basic Info */}
              <div className="flex items-start gap-6">
                <img
                  src={selectedDoctorProfile.avatar}
                  alt={selectedDoctorProfile.name}
                  className="w-24 h-24 rounded-2xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-2xl font-extrabold text-slate-800">{selectedDoctorProfile.name}</h4>
                  <p className="text-slate-600 font-semibold mt-1">{selectedDoctorProfile.specialty}</p>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-slate-700">{selectedDoctorProfile.rating}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-600 font-semibold">{selectedDoctorProfile.experience}</span>
                    </div>
                    {selectedDoctorProfile.telehealth && (
                      <div className="flex items-center gap-1.5">
                        <Video size={16} className="text-[#0D9488]" />
                        <span className="text-sm text-[#0D9488] font-semibold">Telehealth Available</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <span className="text-lg font-extrabold text-[#2563EB]">{selectedDoctorProfile.fee}</span>
                    <span className="text-sm text-slate-500"> consultation fee</span>
                  </div>
                </div>
              </div>

              {/* About */}
              <div>
                <h5 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <User size={16} className="text-[#2563EB]" />
                  About
                </h5>
                <p className="text-slate-600 leading-relaxed">{selectedDoctorProfile.bio}</p>
              </div>

              {/* Education */}
              <div>
                <h5 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <GraduationCap size={16} className="text-[#2563EB]" />
                  Education
                </h5>
                <p className="text-slate-600">{selectedDoctorProfile.education}</p>
              </div>

              {/* Appointment History */}
              {appointmentHistory.length > 0 && (
                <div>
                  <h5 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Calendar size={16} className="text-[#2563EB]" />
                    Your Past Appointments
                  </h5>
                  <div className="space-y-2">
                    {appointmentHistory.slice(0, 3).map((apt, index) => (
                      <div key={index} className="bg-slate-50 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-slate-800">{apt.appointmentDate}</p>
                            <p className="text-sm text-slate-500">{apt.startTime} - {apt.endTime}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            apt.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                            apt.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {apt.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => toggleFavorite(selectedDoctorProfile.id)}
                  className={`flex-1 py-3 rounded-xl font-bold transition ${
                    favoriteDoctors.includes(selectedDoctorProfile.id)
                      ? "bg-red-50 text-red-500 hover:bg-red-100"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {favoriteDoctors.includes(selectedDoctorProfile.id) ? (
                    <>
                      <Heart size={16} className="fill-red-500 inline mr-2" />
                      Remove Favorite
                    </>
                  ) : (
                    <>
                      <Heart size={16} className="inline mr-2" />
                      Add to Favorites
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowDoctorProfile(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedDoc(selectedDoctorProfile);
                    setShowDoctorProfile(false);
                    handleNextStep();
                  }}
                  className="flex-1 py-3 bg-[#2563EB] text-white rounded-xl font-bold hover:bg-blue-700 transition"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Phase 3: Video Equipment Check Modal */}
      {showVideoCheck && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-extrabold text-slate-800">Video Equipment Check</h3>
              <button
                onClick={() => setShowVideoCheck(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0D9488]/10 to-[#2563EB]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video size={32} className="text-[#0D9488]" />
                </div>
                <p className="text-slate-600 text-sm">We'll check your camera and microphone to ensure they're working for your telehealth appointment.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <Camera size={20} className="text-slate-400" />
                  <span className="text-sm text-slate-600">Camera access required</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <Mic size={20} className="text-slate-400" />
                  <span className="text-sm text-slate-600">Microphone access required</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <Monitor size={20} className="text-slate-400" />
                  <span className="text-sm text-slate-600">Stable internet connection recommended</span>
                </div>
              </div>

              <button
                onClick={checkVideoEquipment}
                className="w-full py-3 bg-gradient-to-br from-[#0D9488] to-[#2563EB] text-white rounded-xl font-bold hover:shadow-md transition"
              >
                Start Equipment Check
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookAppointment;

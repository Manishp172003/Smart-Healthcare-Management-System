import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  X,
  User,
  HeartPulse,
  Calendar,
  Sparkles,
  ArrowRight,
  Clock,
  Star,
  MapPin,
  Stethoscope,
  Activity,
  Smile,
  Shield,
  ExternalLink,
  ChevronRight,
  HelpCircle
} from "lucide-react";

import doctorImg1 from "../../assets/FindDoctors/Doctor-img-1.png";
import doctorImg2 from "../../assets/FindDoctors/Doctor-img-2.png";
import doctorImg3 from "../../assets/FindDoctors/Doctor-img-3.png";
import doctorImg4 from "../../assets/FindDoctors/Doctor-img-4.png";
import doctorImg5 from "../../assets/FindDoctors/Doctor-img-5.png";
import doctorImg6 from "../../assets/FindDoctors/New-Doctor-img.png";
import doctorImg7 from "../../assets/FindDoctors/Doctor-img-7.png";

// Canonical database of search entities
const SEARCH_DOCTORS = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialty: "Cardiologist",
    hospital: "Care Hospital, Nagpur",
    fee: 1500,
    rating: 4.9,
    experience: "12 yrs",
    image: doctorImg1,
    profileUrl: "/doctors/1",
    bookingUrl: "/appointment?doctorId=1"
  },
  {
    id: 2,
    name: "Dr. Sarah Jenkins",
    specialty: "Interventional Cardiologist",
    hospital: "Lilavati Hospital, Mumbai",
    fee: 2200,
    rating: 4.9,
    experience: "14 yrs",
    image: doctorImg2,
    profileUrl: "/doctors/2",
    bookingUrl: "/appointment?doctorId=2"
  },
  {
    id: 3,
    name: "Dr. Priya Kapoor",
    specialty: "Dermatologist & Cosmetologist",
    hospital: "Skin & Laser Center, Mumbai",
    fee: 1200,
    rating: 4.8,
    experience: "9 yrs",
    image: doctorImg3,
    profileUrl: "/doctors/3",
    bookingUrl: "/appointment?doctorId=3"
  },
  {
    id: 4,
    name: "Dr. Arjun Verma",
    specialty: "Orthopedic Surgeon",
    hospital: "Apex Joint Center, Nagpur",
    fee: 1400,
    rating: 4.9,
    experience: "15 yrs",
    image: doctorImg4,
    profileUrl: "/doctors/4",
    bookingUrl: "/appointment?doctorId=4"
  },
  {
    id: 5,
    name: "Dr. Neha Joshi",
    specialty: "Senior Pediatrician",
    hospital: "Rainbow Children Hospital, Nagpur",
    fee: 900,
    rating: 4.9,
    experience: "11 yrs",
    image: doctorImg5,
    profileUrl: "/doctors/5",
    bookingUrl: "/appointment?doctorId=5"
  },
  {
    id: 6,
    name: "Dr. Kabir Malhotra",
    specialty: "General Physician",
    hospital: "Apollo Clinic, Pune",
    fee: 800,
    rating: 4.7,
    experience: "8 yrs",
    image: doctorImg6,
    profileUrl: "/doctors/6",
    bookingUrl: "/appointment?doctorId=6"
  },
  {
    id: 7,
    name: "Dr. Sneha Kulkarni",
    specialty: "Gynecologist & Obstetrician",
    hospital: "Mother & Child Care, Mumbai",
    fee: 1600,
    rating: 4.9,
    experience: "13 yrs",
    image: doctorImg7,
    profileUrl: "/doctors/7",
    bookingUrl: "/appointment?doctorId=7"
  }
];

const SEARCH_SPECIALTIES = [
  { name: "Cardiology", desc: "Heart & cardiovascular wellness, ECG, Angiography", icon: HeartPulse, url: "/doctors?specialty=Cardiologist" },
  { name: "Dermatology", desc: "Skin health, acne, laser care & allergies", icon: Sparkles, url: "/doctors?specialty=Dermatologist" },
  { name: "Orthopedics", desc: "Bone, joint, spine & fracture rehabilitation", icon: Activity, url: "/doctors?specialty=Orthopedic" },
  { name: "Pediatrics", desc: "Newborn health, immunizations & child care", icon: Smile, url: "/doctors?specialty=Pediatrician" },
  { name: "General Medicine", desc: "Primary consultations, fever, blood pressure & vitals", icon: Stethoscope, url: "/doctors?specialty=General Physician" },
  { name: "Gynecology", desc: "Women's wellness, pregnancy care & hormonal health", icon: Shield, url: "/doctors?specialty=Gynecologist" }
];

const QUICK_ACTIONS = [
  { title: "Book an Appointment", desc: "Instant booking with top specialists", icon: Calendar, url: "/appointment" },
  { title: "Find Doctors Directory", desc: "Browse all certified clinicians", icon: User, url: "/doctors" },
  { title: "Frequently Asked Questions (FAQ)", desc: "Patient answers, booking steps & policies", icon: HelpCircle, url: "/faq" },
  { title: "Patient Dashboard", desc: "Access visits, records & prescriptions", icon: Activity, url: "/patient/dashboard" },
  { title: "Privacy Policy & Security", desc: "HIPAA compliance & data protection", icon: Shield, url: "/privacy-policy" },
  { title: "Contact Healthcare Support", desc: "24/7 helpdesk & emergency triage", icon: ExternalLink, url: "/contact" }
];

const POPULAR_TAGS = [
  "Cardiologist",
  "Dr. Ananya Sharma",
  "Dermatology",
  "Pediatrics",
  "Telehealth",
  "Book Appointment",
  "Orthopedics"
];

export default function UniversalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Global keyboard shortcuts (Ctrl+K to open, ESC to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          window.dispatchEvent(new Event("openSearchModal"));
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Filtered lists
  const matchedDoctors = SEARCH_DOCTORS.filter(
    (d) =>
      d.name.toLowerCase().includes(cleanQuery) ||
      d.specialty.toLowerCase().includes(cleanQuery) ||
      d.hospital.toLowerCase().includes(cleanQuery)
  );

  const matchedSpecialties = SEARCH_SPECIALTIES.filter(
    (s) =>
      s.name.toLowerCase().includes(cleanQuery) ||
      s.desc.toLowerCase().includes(cleanQuery)
  );

  const matchedActions = QUICK_ACTIONS.filter(
    (a) =>
      a.title.toLowerCase().includes(cleanQuery) ||
      a.desc.toLowerCase().includes(cleanQuery)
  );

  const totalResults = matchedDoctors.length + matchedSpecialties.length + matchedActions.length;

  const handleSelectTag = (tag) => {
    setQuery(tag);
    inputRef.current?.focus();
  };

  const handleNavigate = (url) => {
    onClose();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-14 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Background click to dismiss */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      {/* Main Spotlight Dialog */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[82vh] animate-in zoom-in-95 duration-150">
        
        {/* Top Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
            <Search size={19} />
          </div>

          <input
            ref={inputRef}
            type="text"
            placeholder="Search doctors, specialties, treatments, or pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm sm:text-base font-semibold outline-none"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition cursor-pointer"
              title="Clear text"
            >
              <X size={15} />
            </button>
          )}

          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg bg-slate-200/70 hover:bg-slate-300/80 text-slate-600 text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
          >
            <span>ESC</span>
          </button>
        </div>

        {/* Modal Body / Results Area */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-6 flex-1">
          
          {/* Default State: When Query is Empty */}
          {!cleanQuery ? (
            <div className="space-y-5">
              {/* Popular Tags */}
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2.5">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleSelectTag(tag)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 text-slate-600 border border-slate-200/60 text-xs font-semibold transition cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions Shortcuts */}
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2.5">
                  Frequently Visited
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {QUICK_ACTIONS.slice(0, 4).map((action, idx) => {
                    const IconComponent = action.icon;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleNavigate(action.url)}
                        className="p-3 rounded-2xl border border-slate-100 hover:border-blue-200 bg-white hover:bg-blue-50/40 transition cursor-pointer flex items-center gap-3 group"
                      >
                        <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-600 transition">
                          <IconComponent size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition truncate">
                            {action.title}
                          </h4>
                          <p className="text-[10px] text-slate-400 truncate">{action.desc}</p>
                        </div>
                        <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-600 transition" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Search Results State */
            <div className="space-y-6">
              
              {/* No Results Fallback */}
              {totalResults === 0 && (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Search size={22} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">No medical results found for "{query}"</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      Try searching by doctor name (e.g. <em>Dr. Sharma</em>), clinical department (e.g. <em>Cardiology</em>), or explore all doctors.
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate("/doctors")}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white text-xs font-bold rounded-xl hover:opacity-95 shadow-sm transition cursor-pointer"
                  >
                    View All Doctors Directory
                  </button>
                </div>
              )}

              {/* 1. Doctors Results */}
              {matchedDoctors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <User size={13} />
                      <span>Doctors ({matchedDoctors.length})</span>
                    </span>
                    <Link
                      to="/doctors"
                      onClick={onClose}
                      className="text-xs text-blue-600 font-bold hover:underline"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="space-y-2">
                    {matchedDoctors.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3 rounded-2xl border border-slate-100 hover:border-blue-200 bg-white hover:bg-blue-50/30 transition flex items-center justify-between gap-3 group"
                      >
                        <div 
                          className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                          onClick={() => handleNavigate(doc.profileUrl)}
                        >
                          <img
                            src={doc.image}
                            alt={doc.name}
                            className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition truncate">
                              {doc.name}
                            </h4>
                            <p className="text-[11px] text-teal-600 font-semibold truncate">{doc.specialty}</p>
                            <p className="text-[10px] text-slate-400 truncate">{doc.hospital}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="hidden sm:inline-block text-xs font-black text-slate-700">
                            ₹{doc.fee}
                          </span>
                          <button
                            onClick={() => handleNavigate(doc.bookingUrl)}
                            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-95 text-white text-xs font-bold transition cursor-pointer shadow-2xs"
                          >
                            Book
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Specialties & Departments Results */}
              {matchedSpecialties.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <HeartPulse size={13} />
                    <span>Specialties & Departments ({matchedSpecialties.length})</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedSpecialties.map((spec, idx) => {
                      const IconComp = spec.icon;
                      return (
                        <div
                          key={idx}
                          onClick={() => handleNavigate(spec.url)}
                          className="p-3 rounded-2xl border border-slate-100 hover:border-teal-200 bg-white hover:bg-teal-50/30 transition cursor-pointer flex items-center gap-3 group"
                        >
                          <div className="p-2.5 rounded-xl bg-teal-50 group-hover:bg-teal-100 text-teal-600 transition">
                            <IconComp size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-800 group-hover:text-teal-700 transition truncate">
                              {spec.name}
                            </h4>
                            <p className="text-[10px] text-slate-400 truncate">{spec.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Quick Actions Results */}
              {matchedActions.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles size={13} />
                    <span>Quick Navigation ({matchedActions.length})</span>
                  </span>

                  <div className="space-y-1.5">
                    {matchedActions.map((act, idx) => {
                      const IconComp = act.icon;
                      return (
                        <div
                          key={idx}
                          onClick={() => handleNavigate(act.url)}
                          className="p-2.5 px-3 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition cursor-pointer flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <IconComp size={14} className="text-slate-400" />
                            <span className="font-semibold text-slate-700 truncate">{act.title}</span>
                          </div>
                          <ArrowRight size={13} className="text-slate-300" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer Status Bar */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between text-[11px] text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>SmartHealth Universal Search</span>
          </span>

          <div className="hidden sm:flex items-center gap-3 text-[10px]">
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-600 font-bold">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-600 font-bold">↓</kbd> navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-600 font-bold">ESC</kbd> close</span>
          </div>
        </div>

      </div>

    </div>
  );
}

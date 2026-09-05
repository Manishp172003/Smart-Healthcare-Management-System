import { useState } from "react";
import VideoConsultationModal from "./VideoConsultationModal";
import { getDoctorAvatar, getDoctorDetails } from "../../data/doctorsData";
import { API_BASE_URL } from "../../config/api";
import {
  Video,
  MapPin,
  Link2,
  FileWarning,
  Building2,
  Plus,
  SlidersHorizontal,
  Clock,
  ArrowUpDown,
  Search,
  Calendar,
  Filter,
  X,
  Bell,
  Download,
  Calendar as CalendarIcon,
  ChevronDown,
  RotateCcw,
  Upload,
  FileText,
  CheckCircle,
  Star,
  Award,
  GraduationCap,
  Stethoscope,
  MessageSquare,
  Video as VideoIcon,
  ChevronLeft,
  ChevronRight,
  Sun,
  Sunset,
  AlertCircle,
  ShieldCheck
} from "lucide-react";

const CLINICAL_MORNING_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:15 AM",
  "11:00 AM",
  "11:45 AM",
  "12:30 PM"
];

const CLINICAL_EVENING_SLOTS = [
  "02:00 PM",
  "02:45 PM",
  "03:30 PM",
  "04:15 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM"
];

const convert12to24 = (time12) => {
  if (!time12) return "10:00:00";
  const [time, modifier] = time12.split(" ");
  let [hours, minutes] = time.split(":");
  let h = parseInt(hours, 10);
  if (modifier === "PM" && h < 12) h += 12;
  if (modifier === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${minutes}:00`;
};

const initialAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Jenkins",
    specialty: "Cardiology Consultation",
    type: "Follow-up",
    date: "Oct 24",
    time: "10:00 AM",
    duration: "45 mins",
    mode: "Telehealth",
    status: "Confirmed",
    linkInfo: "Link available 15m prior",
    warning: "Pre-visit form required"
  },
  {
    id: 2,
    doctor: "Dr. Marcus Chen",
    specialty: "General Practice",
    type: "Annual Physical",
    date: "Nov 02",
    time: "2:30 PM",
    duration: "30 mins",
    mode: "In-Person",
    status: "Pending Review",
    location: "Main Campus, Suite 402"
  }
];

const MyAppointments = ({ setActiveTab, appointments: propAppointments = [], loading = false }) => {
  const [activeFilter, setActiveFilter] = useState("Upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list"); // "list" or "calendar"
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleSlot, setRescheduleSlot] = useState("10:15 AM");
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [reminderSettings, setReminderSettings] = useState({
    email: true,
    sms: false,
    hoursBefore: 24
  });

  // Advanced features state
  const [isDoctorProfileOpen, setIsDoctorProfileOpen] = useState(false);
  const [isVideoMeetingOpen, setIsVideoMeetingOpen] = useState(false);
  const [isDocumentUploadOpen, setIsDocumentUploadOpen] = useState(false);
  const [isPreVisitChecklistOpen, setIsPreVisitChecklistOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "Prepare list of current medications", completed: false },
    { id: 2, text: "Bring medical history documents", completed: false },
    { id: 3, text: "List current symptoms and concerns", completed: false },
    { id: 4, text: "Prepare questions for the doctor", completed: false },
    { id: 5, text: "Check insurance coverage", completed: false }
  ]);

  // Interactive Monthly Calendar View State
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(prev => prev - 1);
    } else {
      setCalMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(prev => prev + 1);
    } else {
      setCalMonth(prev => prev + 1);
    }
  };

  const handleTodayMonth = () => {
    const now = new Date();
    setCalMonth(now.getMonth());
    setCalYear(now.getFullYear());
    setSelectedCalendarDate(now.toISOString().split("T")[0]);
  };

  // Map backend structure to UI schema
  const appointments = propAppointments.map((apt) => {
    try {
      const rawName = apt.doctor?.user?.name || "Specialist";
      const cleanDoctorName = rawName.startsWith("Dr.") ? rawName : `Dr. ${rawName}`;
      return {
        id: apt.id,
        doctor: cleanDoctorName,
        specialty: apt.doctor?.specialization || "General Medicine",
        type: "Consultation",
        date: apt.appointmentDate,
        time: apt.startTime ? apt.startTime.slice(0, 5) : "09:30",
        duration: "30 mins",
        mode: apt.appointmentType === "telehealth" ? "Telehealth" : "In-Person",
        status: apt.status === "PENDING" ? "Pending Review" : apt.status === "CONFIRMED" ? "Confirmed" : apt.status === "COMPLETED" ? "Completed" : "Cancelled",
        paymentStatus: apt.paymentStatus,
        paymentMethod: apt.paymentMethod,
        amountPaid: apt.amountPaid,
        location: apt.doctor?.hospital || "Hospital Suite & Clinical Center"
      };
    } catch (error) {
      console.error("Error mapping appointment:", error);
      return null;
    }
  }).filter(Boolean);

  const upcomingCount = appointments.filter(a => a.status !== "Completed" && a.status !== "Cancelled").length;

  // Smart date formatting
  const getSmartDate = (dateString) => {
    if (!dateString) return dateString;

    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Reset time for date comparison
    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    const appointmentDate = new Date(date);
    appointmentDate.setHours(0, 0, 0, 0);

    if (appointmentDate.getTime() === today.getTime()) return "Today";
    if (appointmentDate.getTime() === tomorrow.getTime()) return "Tomorrow";

    // Format date nicely
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Filter appointments based on search query
  const getFilteredAppointments = () => {
    if (!searchQuery.trim()) return appointments;

    const query = searchQuery.toLowerCase();
    return appointments.filter(app =>
      app.doctor.toLowerCase().includes(query) ||
      app.specialty.toLowerCase().includes(query) ||
      app.date.toLowerCase().includes(query) ||
      app.type.toLowerCase().includes(query)
    );
  };

  const filteredAppointments = getFilteredAppointments();

  // Calendar computations
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayIndex = new Date(calYear, calMonth, 1).getDay(); // 0 = Sunday
  const prefixDays = Array.from({ length: firstDayIndex });
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const todayDateObj = new Date();
  const todayStr = `${todayDateObj.getFullYear()}-${String(todayDateObj.getMonth() + 1).padStart(2, '0')}-${String(todayDateObj.getDate()).padStart(2, '0')}`;

  const monthAppointments = appointments.filter(a => {
    if (!a.date) return false;
    const parts = a.date.split("-");
    if (parts.length < 2) return false;
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    return y === calYear && m === calMonth + 1;
  });

  const selectedDateApts = appointments.filter(a => a.date === selectedCalendarDate);

  const formatReadableDate = (dateString) => {
    if (!dateString) return "Selected Date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${API_BASE_URL}/api/appointments/${id}/status?status=CANCELLED`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          alert("Appointment cancelled successfully.");
          window.location.reload();
        } else {
          const data = await response.json();
          alert(data.error || "Could not cancel appointment.");
        }
      } catch (err) {
        console.error("Cancel appointment error:", err);
        alert("Failed to connect to the backend server.");
      }
    }
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setRescheduleDate(appointment.date || new Date().toISOString().split("T")[0]);
    setRescheduleSlot("10:15 AM");
    setIsRescheduleModalOpen(true);
  };

  const handleRescheduleConfirm = async () => {
    if (!selectedAppointment) return;
    const token = localStorage.getItem("token");
    const time24 = convert12to24(rescheduleSlot);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/appointments/${selectedAppointment.id}/reschedule?newDate=${rescheduleDate}&newTime=${time24}`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        alert(`Appointment successfully rescheduled to ${rescheduleDate} at ${rescheduleSlot}! Status reset to Pending Review.`);
        setIsRescheduleModalOpen(false);
        window.location.reload();
      } else {
        const data = await response.json();
        alert(data.error || "Could not reschedule appointment.");
      }
    } catch (err) {
      console.error("Reschedule error:", err);
      alert("Failed to connect to the backend server.");
    }
  };

  const handleReminderSettings = (appointment) => {
    setSelectedAppointment(appointment);
    setIsReminderModalOpen(true);
  };

  const handleSaveReminderSettings = () => {
    // In a real implementation, this would save to backend
    alert(`Reminder settings saved for ${selectedAppointment.doctor}`);
    setIsReminderModalOpen(false);
  };

  const handleExportToCalendar = (appointment) => {
    // Create iCal format for calendar export
    const startDate = new Date(`${appointment.date} ${appointment.time}`);
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // Add 30 minutes

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//SmartHealth//Patient Portal//EN',
      'BEGIN:VEVENT',
      `DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:Appointment with ${appointment.doctor}`,
      `DESCRIPTION:${appointment.specialty} - ${appointment.type}`,
      `LOCATION:${appointment.mode === 'Telehealth' ? 'Online Call' : appointment.location || 'Medical Center'}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `appointment-${appointment.id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert("Appointment exported to calendar file!");
  };

  // Advanced Features Functions
  const handleDoctorProfile = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDoctorProfileOpen(true);
  };

  const handleVideoMeeting = (appointment) => {
    setSelectedAppointment(appointment);
    setIsVideoMeetingOpen(true);
  };

  const handleDocumentUpload = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDocumentUploadOpen(true);
  };

  const handlePreVisitChecklist = (appointment) => {
    setSelectedAppointment(appointment);
    setIsPreVisitChecklistOpen(true);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleUploadDocuments = () => {
    // In a real implementation, this would upload to backend
    alert(`${uploadedFiles.length} document(s) uploaded successfully!`);
    setIsDocumentUploadOpen(false);
    setUploadedFiles([]);
  };

  const handleToggleChecklistItem = (id) => {
    setChecklistItems(checklistItems.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleSaveChecklist = () => {
    // In a real implementation, this would save to backend
    const completedCount = checklistItems.filter(item => item.completed).length;
    alert(`Pre-visit checklist saved! ${completedCount}/${checklistItems.length} items completed.`);
    setIsPreVisitChecklistOpen(false);
  };

  const getDoctorProfile = () => {
    const details = getDoctorDetails(selectedAppointment?.doctor);
    return {
      name: selectedAppointment?.doctor || details.name,
      specialty: selectedAppointment?.specialty || details.specialty,
      avatar: getDoctorAvatar(selectedAppointment?.doctor),
      rating: details.rating,
      reviews: details.reviewsCount || 127,
      experience: details.experience || "12+ Years",
      education: details.education || "MBBS, MD",
      certifications: ["Board Certified Specialist", "Licensed Clinical Practitioner"],
      languages: ["English", "Hindi", "Marathi"],
      bio: details.bio,
      hospital: details.hospital || selectedAppointment?.location || "SmartHealth Medical Center"
    };
  };

  const getFilteredData = () => {
    const filteredByStatus = () => {
      if (activeFilter === "Upcoming") {
        return filteredAppointments.filter(a => a.status === "Confirmed" || a.status === "Pending Review");
      }
      if (activeFilter === "Past") {
        return filteredAppointments.filter(a => a.status === "Completed");
      }
      return filteredAppointments.filter(a => a.status === "Waitlist" || a.status === "Cancelled");
    };

    return filteredByStatus();
  };

  const filteredData = getFilteredData();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-white/60 border border-white/45 rounded-3xl p-10 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md">
        <p className="text-slate-500 font-semibold text-sm animate-pulse">Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Search and Filter Bar */}
      <div className="bg-white/60 rounded-2xl border border-white/45 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by doctor, specialty, or date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                viewMode === "list"
                  ? "bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <SlidersHorizontal size={16} />
              List
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                viewMode === "calendar"
                  ? "bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Calendar size={16} />
              Calendar
            </button>
          </div>

          {/* Advanced Filter Toggle */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
              isFilterOpen
                ? "bg-[#2563EB] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Filter size={16} />
            Filters
          </button>
        </div>

        {/* Advanced Filter Panel */}
        {isFilterOpen && (
          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2">Specialty</label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#2563EB]">
                <option>All Specialties</option>
                <option>Cardiology</option>
                <option>Dermatology</option>
                <option>General Practice</option>
                <option>Neurology</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2">Time Range</label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#2563EB]">
                <option>All Time</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2">Appointment Type</label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#2563EB]">
                <option>All Types</option>
                <option>Telehealth</option>
                <option>In-Person</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Tabs Filter Row */}
      <div className="border-b border-slate-200">
        <div className="flex gap-8">
          {[
            { id: "Upcoming", label: "Upcoming", badge: upcomingCount },
            { id: "Past", label: "Past" },
            { id: "Waitlist", label: "Waitlist" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`pb-4 text-sm font-bold relative transition cursor-pointer border-none bg-transparent ${
                activeFilter === tab.id 
                  ? "text-[#0d9488] border-b-2 border-[#0d9488]" 
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <span className="flex items-center gap-1.5">
                {tab.label}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#EA4335] px-1.5 text-[10px] font-extrabold text-white">
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      {viewMode === "calendar" ? (
        <div className="space-y-6">
          {/* Calendar Header & Month Navigation */}
          <div className="bg-white/70 border border-white/60 rounded-3xl p-5 sm:p-6 shadow-sm backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                <Calendar size={22} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {monthNames[calMonth]} {calYear}
                </h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  {monthAppointments.length} appointment{monthAppointments.length === 1 ? '' : 's'} scheduled this month
                </p>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition shadow-2xs cursor-pointer"
                title="Previous Month"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleTodayMonth}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
              >
                Today
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition shadow-2xs cursor-pointer"
                title="Next Month"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Calendar Grid + Selected Day Agenda Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 7-Day Monthly Grid (2 Columns on Desktop) */}
            <div className="lg:col-span-2 bg-white/70 border border-white/60 rounded-3xl p-5 sm:p-6 shadow-sm backdrop-blur-md">
              {/* Weekday Names Header */}
              <div className="grid grid-cols-7 gap-1 text-center mb-2 pb-2 border-b border-slate-100">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
                  <div key={dayName} className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {dayName}
                  </div>
                ))}
              </div>

              {/* Day Cells Matrix */}
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {/* Prefix offset days */}
                {prefixDays.map((_, i) => (
                  <div key={`prefix-${i}`} className="min-h-[72px] sm:min-h-[88px] rounded-2xl bg-slate-50/40 opacity-40 border border-transparent" />
                ))}

                {/* Actual days in this month */}
                {daysArray.map((dayNum) => {
                  const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                  const dayApts = appointments.filter(a => a.date === dateStr);
                  const isSelected = selectedCalendarDate === dateStr;
                  const isToday = todayStr === dateStr;

                  return (
                    <div
                      key={dayNum}
                      onClick={() => setSelectedCalendarDate(dateStr)}
                      className={`min-h-[72px] sm:min-h-[88px] p-2 rounded-2xl border transition cursor-pointer flex flex-col justify-between group select-none ${
                        isSelected 
                          ? "bg-blue-50/90 border-blue-400 shadow-sm ring-2 ring-blue-400/30" 
                          : isToday
                          ? "bg-emerald-50/40 border-emerald-300 hover:bg-emerald-50/70"
                          : "bg-white/70 hover:bg-white border-slate-100 hover:border-blue-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                          isToday 
                            ? "bg-emerald-600 text-white" 
                            : isSelected 
                            ? "bg-blue-600 text-white" 
                            : "text-slate-700 group-hover:text-blue-600"
                        }`}>
                          {dayNum}
                        </span>

                        {dayApts.length > 0 && (
                          <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700">
                            {dayApts.length}
                          </span>
                        )}
                      </div>

                      {/* Event Snippets */}
                      <div className="space-y-1 mt-1">
                        {dayApts.slice(0, 2).map((apt, idx) => (
                          <div
                            key={idx}
                            className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold truncate leading-tight ${
                              apt.status === "Confirmed"
                                ? "bg-emerald-100 text-emerald-800"
                                : apt.status === "Pending Review"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                            title={`${apt.time} - ${apt.doctor}`}
                          >
                            {apt.time} {apt.doctor.replace("Dr. ", "")}
                          </div>
                        ))}
                        {dayApts.length > 2 && (
                          <span className="text-[9px] font-bold text-slate-400 pl-1 block">
                            +{dayApts.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Day Agenda Drawer (1 Column on Desktop) */}
            <div className="bg-white/70 border border-white/60 rounded-3xl p-5 sm:p-6 shadow-sm backdrop-blur-md flex flex-col justify-between space-y-4">
              <div>
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Day Agenda</span>
                    <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                      {formatReadableDate(selectedCalendarDate)}
                    </h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200">
                    {selectedDateApts.length} visit{selectedDateApts.length === 1 ? '' : 's'}
                  </span>
                </div>

                {/* Agenda Content */}
                <div className="space-y-3 mt-4">
                  {selectedDateApts.length === 0 ? (
                    <div className="text-center py-10 space-y-3">
                      <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                        <Calendar size={22} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-700">No visits on this day</p>
                        <p className="text-[11px] text-slate-400 max-w-[200px] mx-auto mt-0.5">
                          Need consultation? Schedule a visit for this date.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("Book Appointment")}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:opacity-95 text-white font-bold text-xs rounded-xl transition shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus size={13} />
                        <span>Book for this Day</span>
                      </button>
                    </div>
                  ) : (
                    selectedDateApts.map((apt) => (
                      <div key={apt.id} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-teal-600 flex items-center gap-1">
                            <Clock size={12} />
                            <span>{apt.time} ({apt.duration})</span>
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold ${
                            apt.status === "Confirmed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : apt.status === "Cancelled"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}>
                            {apt.status === "Cancelled" && apt.paymentStatus === "REFUNDED"
                              ? "Refunded"
                              : apt.status}
                          </span>
                        </div>

                        <div>
                          <h5 className="text-sm font-black text-slate-900 leading-tight">{apt.doctor}</h5>
                          <p className="text-xs text-slate-400 font-semibold mt-0.5">{apt.specialty}</p>
                          <p className="text-[11px] text-slate-500 font-medium mt-1 flex items-center gap-1">
                            <MapPin size={12} className="text-slate-400 shrink-0" />
                            <span>{apt.location}</span>
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                          {apt.mode === "Telehealth" ? (
                            <button
                              onClick={() => handleVideoMeeting(apt)}
                              className="flex-1 py-2 px-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                            >
                              <VideoIcon size={13} />
                              <span>Join Call</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleReschedule(apt)}
                              className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                            >
                              <RotateCcw size={13} />
                              <span>Reschedule</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleCancel(apt.id)}
                            className="py-2 px-3 text-rose-500 hover:bg-rose-50 rounded-xl text-xs font-bold transition cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Status Legend */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Confirmed
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Pending
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Selected
                </span>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <>
          {/* List Sub-header Info */}
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span className="uppercase tracking-wider">
              {filteredData.length} {activeFilter === "Upcoming" ? "Scheduled" : activeFilter}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            <button className="flex items-center gap-1 text-slate-400 hover:text-slate-600 cursor-pointer bg-transparent border-none">
              Sort by: Date (Earliest)
              <ArrowUpDown size={13} />
            </button>
          </div>

          {/* Row List cards */}
          <div className="space-y-4">
        {filteredData.length === 0 ? (
          <div className="p-16 text-center bg-white/60 border border-white/45 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md rounded-3xl">
            <Search size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-400 text-sm font-bold">
              {searchQuery ? `No appointments matching "${searchQuery}"` : "No appointments found under this status."}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-[#2563EB] text-xs font-bold hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          filteredData.map(app => {
            const isTelehealth = app.mode === "Telehealth";
            const isConfirmed = app.status === "Confirmed";

            return (
              <div 
                key={app.id}
                className={`bg-white/60 rounded-3xl border border-white/45 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md flex flex-col md:flex-row items-stretch overflow-hidden relative ${
                  isTelehealth ? "border-l-4 border-l-[#0D9488]" : "border-l-4 border-l-[#2563EB]"
                }`}
              >
                
                {/* Column 1: Date block */}
                <div className="p-5 flex flex-row md:flex-col items-center justify-between md:justify-center md:text-center min-w-[150px] border-b md:border-b-0 md:border-r border-slate-100 gap-3">
                  
                  {/* Left Icon (Visual representation of Mode) */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    isTelehealth ? "bg-[#0D9488]/8 text-[#0D9488]" : "bg-slate-100 text-slate-500"
                  }`}>
                    {isTelehealth ? <Video size={16} /> : <MapPin size={16} />}
                  </div>

                  {/* Date details */}
                  <div className="text-right md:text-center flex-1 md:flex-initial">
                    <h4 className="text-xl font-extrabold text-slate-800 leading-none">{getSmartDate(app.date)}</h4>
                    <span className="text-xs font-bold text-[#2563EB] block mt-1.5">{app.time}</span>
                    <span className="text-[10px] text-slate-400 font-bold block mt-1 uppercase tracking-wider">{app.duration}</span>
                  </div>

                </div>

                {/* Column 2: Doctor info */}
                <div className="p-6 flex-1 flex flex-col justify-center space-y-3">
                  
                  {/* Badges row */}
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider ${
                      isTelehealth ? "bg-[#0D9488]/8 text-[#0D9488]" : "bg-slate-100 text-slate-500"
                    }`}>
                      {app.mode.toUpperCase()}
                    </span>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isConfirmed
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : app.status === "Cancelled"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {app.status === "Cancelled" && app.paymentStatus === "REFUNDED"
                        ? `Cancelled • ₹${app.amountPaid || 1500} Refunded`
                        : app.status}
                    </span>

                    {/* Financial Status Badge */}
                    {app.paymentStatus === "PAID" && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                        ✓ Paid Online
                      </span>
                    )}
                    {app.paymentStatus === "PAY_ON_ARRIVAL" && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                        💵 Pay at Clinic
                      </span>
                    )}
                    {app.paymentStatus === "REFUNDED" && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-50 text-purple-700 border border-purple-200">
                        ↩ 100% Refunded
                      </span>
                    )}
                  </div>

                  {/* Doctor Info */}
                  <div className="flex items-center gap-3.5">
                    <img
                      src={getDoctorAvatar(app.doctor)}
                      alt={app.doctor}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0 cursor-pointer hover:opacity-90 transition shadow-2xs"
                      onClick={() => handleDoctorProfile(app)}
                    />
                    <div>
                      <h3
                        className="text-base sm:text-lg font-extrabold text-slate-800 leading-tight cursor-pointer hover:text-[#2563EB] transition"
                        onClick={() => handleDoctorProfile(app)}
                      >
                        {app.doctor}
                      </h3>
                      <p className="text-slate-400 text-xs mt-1 font-bold">
                        {app.specialty} <span className="text-slate-300 mx-1">•</span> {app.type}
                      </p>
                    </div>
                  </div>

                  {/* Row Metadata (Links / Location detail) */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-semibold text-slate-500">
                    {isTelehealth ? (
                      <>
                        <span className="flex items-center gap-1">
                          <Link2 size={13} className="text-slate-400" />
                          {app.linkInfo}
                        </span>
                        {app.warning && (
                          <span className="flex items-center gap-1 text-[#EA4335]">
                            <FileWarning size={13} className="text-[#EA4335]" />
                            {app.warning}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Building2 size={13} className="text-slate-400" />
                        {app.location}
                      </span>
                    )}
                  </div>

                </div>

                {/* Column 3: Actions block */}
                <div className="p-5 md:min-w-[210px] border-t md:border-t-0 md:border-l border-slate-100 flex flex-col justify-center items-stretch gap-2.5 bg-slate-50/50">
                  {isTelehealth ? (
                    <button
                      onClick={() => handleVideoMeeting(app)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-[#2563EB] to-[#0D9488] hover:from-blue-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                    >
                      <VideoIcon size={14} />
                      <span>Join Video Call</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReschedule(app)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
                    >
                      <RotateCcw size={14} />
                      <span>Reschedule</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleCancel(app.id)}
                    className="w-full py-1.5 text-center text-xs font-bold text-rose-500 hover:text-rose-700 hover:bg-rose-50/60 rounded-lg transition cursor-pointer"
                  >
                    Cancel Visit
                  </button>

                  {/* Compact Quick Tools Toolbar */}
                  <div className="flex items-center justify-between gap-1 pt-2 border-t border-slate-200/70">
                    <button
                      onClick={() => handleDocumentUpload(app)}
                      className="p-2 rounded-lg bg-white hover:bg-blue-50 text-slate-500 hover:text-blue-600 border border-slate-200 transition cursor-pointer shadow-2xs"
                      title="Upload Medical Documents"
                    >
                      <Upload size={13} />
                    </button>
                    <button
                      onClick={() => handlePreVisitChecklist(app)}
                      className="p-2 rounded-lg bg-white hover:bg-teal-50 text-slate-500 hover:text-teal-600 border border-slate-200 transition cursor-pointer shadow-2xs"
                      title="Pre-Visit Checklist"
                    >
                      <FileText size={13} />
                    </button>
                    <button
                      onClick={() => handleReminderSettings(app)}
                      className="p-2 rounded-lg bg-white hover:bg-amber-50 text-slate-500 hover:text-amber-600 border border-slate-200 transition cursor-pointer shadow-2xs"
                      title="Set Notification Reminder"
                    >
                      <Bell size={13} />
                    </button>
                    <button
                      onClick={() => handleExportToCalendar(app)}
                      className="p-2 rounded-lg bg-white hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 border border-slate-200 transition cursor-pointer shadow-2xs"
                      title="Export to Calendar (.ics)"
                    >
                      <Download size={13} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>
    </>
  )}

      {/* Reschedule Modal */}
      {isRescheduleModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-7 animate-view-fade-in-up border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Reschedule Consultation</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  With <strong className="text-slate-700">{selectedAppointment.doctor}</strong> ({selectedAppointment.specialty})
                </p>
              </div>
              <button
                onClick={() => setIsRescheduleModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Date Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Select New Date</label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 font-semibold text-slate-800"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Clinical Hours Notice */}
              <div className="p-3 bg-blue-50/70 border border-blue-200/70 rounded-2xl flex items-start gap-2.5 text-xs text-blue-900">
                <AlertCircle size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold block">Clinical Consultation Timings</span>
                  <p className="text-[11px] text-blue-700 mt-0.5">
                    Consultations are scheduled strictly between <strong>09:00 AM and 07:00 PM</strong>. Night hours (07:00 PM – 09:00 AM) are non-bookable and reserved for 24/7 Emergency Casualty.
                  </p>
                </div>
              </div>

              {/* Time Slot Picker: Morning Session */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
                  <Sun size={14} className="text-amber-500" />
                  <span>Morning Session (09:00 AM – 01:00 PM)</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {CLINICAL_MORNING_SLOTS.map((slot) => {
                    const isSelected = rescheduleSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setRescheduleSlot(slot)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                          isSelected
                            ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white border-transparent shadow-sm"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slot Picker: Evening Session */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
                  <Sunset size={14} className="text-indigo-500" />
                  <span>Afternoon & Evening Session (02:00 PM – 07:00 PM)</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {CLINICAL_EVENING_SLOTS.map((slot) => {
                    const isSelected = rescheduleSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setRescheduleSlot(slot)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                          isSelected
                            ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white border-transparent shadow-sm"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary Pill */}
              <div className="p-3 rounded-xl bg-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Rescheduled Visit:</span>
                <span className="font-extrabold text-slate-900">
                  {rescheduleDate || "Selected Date"} at {rescheduleSlot}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsRescheduleModalOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRescheduleConfirm}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white text-xs font-bold hover:shadow-md transition cursor-pointer"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reminder Settings Modal */}
      {isReminderModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-view-fade-in-up">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Reminder Settings</h3>
            <p className="text-sm text-slate-500 mb-6">
              Set reminders for your appointment with {selectedAppointment.doctor}
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">Email Reminders</span>
                <button
                  onClick={() => setReminderSettings({...reminderSettings, email: !reminderSettings.email})}
                  className={`w-12 h-6 rounded-full transition ${reminderSettings.email ? 'bg-[#2563EB]' : 'bg-slate-200'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition ${reminderSettings.email ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">SMS Reminders</span>
                <button
                  onClick={() => setReminderSettings({...reminderSettings, sms: !reminderSettings.sms})}
                  className={`w-12 h-6 rounded-full transition ${reminderSettings.sms ? 'bg-[#2563EB]' : 'bg-slate-200'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition ${reminderSettings.sms ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">Remind me</label>
                <select
                  value={reminderSettings.hoursBefore}
                  onChange={(e) => setReminderSettings({...reminderSettings, hoursBefore: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#2563EB]"
                >
                  <option value={1}>1 hour before</option>
                  <option value={24}>1 day before</option>
                  <option value={48}>2 days before</option>
                  <option value={168}>1 week before</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsReminderModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveReminderSettings}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white text-xs font-bold hover:shadow-md transition"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Profile Modal */}
      {isDoctorProfileOpen && selectedAppointment && (() => {
        const doctor = getDoctorProfile();
        return (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 animate-view-fade-in-up">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{doctor.name}</h3>
                    <p className="text-sm text-slate-500 font-semibold">{doctor.specialty}</p>
                    <p className="text-xs text-[#0D9488] font-bold mt-0.5">{doctor.hospital}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDoctorProfileOpen(false)}
                  className="text-slate-400 hover:text-slate-600 transition p-1 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#0D9488] rounded-full flex items-center justify-center text-white">
                      <Stethoscope size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Rating</p>
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400 fill-current" />
                        <span className="font-bold text-slate-800">{doctor.rating}</span>
                        <span className="text-xs text-slate-400">({doctor.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 bg-[#0D9488]/10 rounded-full flex items-center justify-center text-[#0D9488]">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Experience</p>
                      <p className="font-bold text-slate-800">{doctor.experience}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 bg-[#2563EB]/10 rounded-full flex items-center justify-center text-[#2563EB]">
                      <Award size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Certifications</p>
                      <p className="font-bold text-slate-800 text-sm">{doctor.certifications.join(', ')}</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-slate-500 mb-2">Education</p>
                    <p className="text-sm text-slate-800">{doctor.education}</p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-500 mb-2">Languages</p>
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map(lang => (
                        <span key={lang} className="px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-700">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-500 mb-2">Hospital</p>
                    <p className="text-sm text-slate-800">{doctor.hospital}</p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-500 mb-2">About</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{doctor.bio}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200">
                <button
                  onClick={() => setIsDoctorProfileOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setIsDoctorProfileOpen(false);
                    setActiveTab("Book Appointment");
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white text-xs font-bold hover:shadow-md transition"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Interactive Telehealth Video Consultation Room */}
      <VideoConsultationModal
        isOpen={isVideoMeetingOpen}
        onClose={() => setIsVideoMeetingOpen(false)}
        appointment={selectedAppointment}
      />

      {/* Document Upload Modal */}
      {isDocumentUploadOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 animate-view-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Upload Documents</h3>
                <p className="text-sm text-slate-500">for appointment with {selectedAppointment.doctor}</p>
              </div>
              <button
                onClick={() => setIsDocumentUploadOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center mb-4">
              <Upload size={32} className="mx-auto text-slate-400 mb-3" />
              <p className="text-sm text-slate-600 mb-2">Drag and drop files here</p>
              <p className="text-xs text-slate-400 mb-4">or</p>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="px-4 py-2 bg-[#2563EB] text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-[#1D4ED8] transition"
              >
                Browse Files
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2 mb-4">
                <p className="text-xs font-bold text-slate-500">Uploaded Files:</p>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-700">{file.name}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="text-slate-400 hover:text-red-500 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsDocumentUploadOpen(false);
                  setUploadedFiles([]);
                }}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadDocuments}
                disabled={uploadedFiles.length === 0}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white text-xs font-bold hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload ({uploadedFiles.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pre-Visit Checklist Modal */}
      {isPreVisitChecklistOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 animate-view-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Pre-Visit Checklist</h3>
                <p className="text-sm text-slate-500">for appointment with {selectedAppointment.doctor}</p>
              </div>
              <button
                onClick={() => setIsPreVisitChecklistOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {checklistItems.map(item => (
                <label key={item.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleToggleChecklistItem(item.id)}
                    className="mt-1 w-5 h-5 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span className={`text-sm ${item.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex items-center justify-between p-3 bg-[#0D9488]/10 rounded-lg mb-6">
              <span className="text-sm font-semibold text-slate-700">Progress</span>
              <span className="text-sm font-bold text-[#0D9488]">
                {checklistItems.filter(item => item.completed).length}/{checklistItems.length} completed
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsPreVisitChecklistOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChecklist}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white text-xs font-bold hover:shadow-md transition"
              >
                Save Checklist
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyAppointments;

import { useState } from "react";
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
  Video as VideoIcon
} from "lucide-react";

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

  // Map backend structure to UI schema
  const appointments = propAppointments.map((apt) => {
    try {
      return {
        id: apt.id,
        doctor: `Dr. ${apt.doctor?.user?.name || "Specialist"}`,
        specialty: apt.doctor?.specialization || "General Medicine",
        type: "Consultation",
        date: apt.appointmentDate,
        time: apt.startTime,
        duration: "30 mins",
        mode: "In-Person",
        status: apt.status === "PENDING" ? "Pending Review" : apt.status === "CONFIRMED" ? "Confirmed" : apt.status === "COMPLETED" ? "Completed" : "Cancelled",
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

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:8080/api/appointments/${id}/status?status=CANCELLED`, {
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
    setIsRescheduleModalOpen(true);
  };

  const handleRescheduleConfirm = async (newDate, newTime) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8080/api/appointments/${selectedAppointment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          appointmentDate: newDate,
          startTime: newTime
        })
      });

      if (response.ok) {
        alert("Appointment rescheduled successfully!");
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

  // Mock doctor data (in real app, this would come from backend)
  const getDoctorProfile = () => ({
    name: selectedAppointment?.doctor || "Dr. Specialist",
    specialty: selectedAppointment?.specialty || "General Medicine",
    rating: 4.8,
    reviews: 127,
    experience: "12 years",
    education: "Medical School, MD",
    certifications: ["Board Certified", "Licensed Specialist"],
    languages: ["English", "Spanish"],
    bio: "Dr. Specialist is a dedicated healthcare professional with extensive experience in providing quality patient care. Specialized in preventive medicine and patient education.",
    hospital: "SmartHealth Medical Center"
  });

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
                      isConfirmed ? "bg-blue-50 text-[#2563EB]" : "bg-yellow-50 text-yellow-600"
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  {/* Doctor Info */}
                  <div>
                    <h3
                      className="text-lg font-extrabold text-slate-800 leading-tight cursor-pointer hover:text-[#2563EB] transition"
                      onClick={() => handleDoctorProfile(app)}
                    >
                      {app.doctor}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1.5 font-bold">
                      {app.specialty} <span className="text-slate-300 mx-1">•</span> {app.type}
                    </p>
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
                <div className="p-6 md:min-w-[220px] border-t md:border-t-0 md:border-l border-white/40 flex flex-row md:flex-col justify-center items-stretch gap-2 bg-white/20">
                  {isTelehealth ? (
                    <>
                      <button
                        onClick={() => handleVideoMeeting(app)}
                        className="flex-1 flex items-center justify-center gap-1.5 h-10 bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none text-white rounded-xl text-xs font-bold transition hover:shadow-md hover:-translate-y-px cursor-pointer"
                      >
                        <VideoIcon size={14} />
                        Join Call
                      </button>
                      <button
                        onClick={() => handleReschedule(app)}
                        className="flex-1 h-10 bg-white/40 border border-white/20 hover:bg-white/60 text-slate-600 rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        <RotateCcw size={14} />
                        Reschedule
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleDocumentUpload(app)}
                        className="flex-1 h-10 bg-white/40 border border-white/20 hover:bg-white/60 text-slate-600 rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        <Upload size={14} />
                        Upload Docs
                      </button>
                      <button
                        onClick={() => handlePreVisitChecklist(app)}
                        className="flex-1 h-10 bg-white/40 border border-white/20 hover:bg-white/60 text-slate-600 rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        <FileText size={14} />
                        Checklist
                      </button>
                      <button
                        onClick={() => handleReschedule(app)}
                        className="flex-1 h-10 bg-white/40 border border-white/20 hover:bg-white/60 text-slate-600 rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        <RotateCcw size={14} />
                        Reschedule
                      </button>
                      <button
                        onClick={() => handleCancel(app.id)}
                        className="flex-1 h-10 bg-transparent border-none text-[#EA4335] hover:underline rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {/* Additional Actions */}
                  <div className="flex gap-2 pt-2 border-t border-white/30">
                    <button
                      onClick={() => handleReminderSettings(app)}
                      className="flex-1 flex items-center justify-center gap-1 h-8 bg-white/30 border border-white/20 hover:bg-white/50 text-slate-600 rounded-lg text-[10px] font-bold transition cursor-pointer"
                      title="Set Reminders"
                    >
                      <Bell size={12} />
                    </button>
                    <button
                      onClick={() => handleExportToCalendar(app)}
                      className="flex-1 flex items-center justify-center gap-1 h-8 bg-white/30 border border-white/20 hover:bg-white/50 text-slate-600 rounded-lg text-[10px] font-bold transition cursor-pointer"
                      title="Export to Calendar"
                    >
                      <Download size={12} />
                    </button>
                    {isTelehealth && (
                      <button
                        onClick={() => handleVideoMeeting(app)}
                        className="flex-1 flex items-center justify-center gap-1 h-8 bg-white/30 border border-white/20 hover:bg-white/50 text-slate-600 rounded-lg text-[10px] font-bold transition cursor-pointer"
                        title="Video Meeting"
                      >
                        <VideoIcon size={12} />
                      </button>
                    )}
                    {!isTelehealth && (
                      <button
                        onClick={() => handleDocumentUpload(app)}
                        className="flex-1 flex items-center justify-center gap-1 h-8 bg-white/30 border border-white/20 hover:bg-white/50 text-slate-600 rounded-lg text-[10px] font-bold transition cursor-pointer"
                        title="Upload Documents"
                      >
                        <Upload size={12} />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Reschedule Modal */}
      {isRescheduleModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-view-fade-in-up">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Reschedule Appointment</h3>
            <p className="text-sm text-slate-500 mb-6">
              Reschedule your appointment with {selectedAppointment.doctor}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">New Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#2563EB]"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">New Time</label>
                <input
                  type="time"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsRescheduleModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In a real implementation, this would use the actual input values
                  alert("Reschedule functionality will be connected to backend API");
                  setIsRescheduleModalOpen(false);
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white text-xs font-bold hover:shadow-md transition"
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
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{doctor.name}</h3>
                  <p className="text-sm text-slate-500">{doctor.specialty}</p>
                </div>
                <button
                  onClick={() => setIsDoctorProfileOpen(false)}
                  className="text-slate-400 hover:text-slate-600 transition"
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

      {/* Video Meeting Modal */}
      {isVideoMeetingOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full p-6 animate-view-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Video Consultation</h3>
                <p className="text-sm text-slate-500">with {selectedAppointment.doctor}</p>
              </div>
              <button
                onClick={() => setIsVideoMeetingOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center mb-6">
              <div className="text-center">
                <VideoIcon size={48} className="mx-auto text-slate-400 mb-4" />
                <p className="text-slate-400 text-sm">Video meeting will start here</p>
                <p className="text-slate-500 text-xs mt-2">Scheduled: {getSmartDate(selectedAppointment.date)} at {selectedAppointment.time}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Clock size={18} className="text-[#2563EB]" />
                <div>
                  <p className="text-xs text-slate-500">Duration</p>
                  <p className="text-sm font-bold text-slate-800">{selectedAppointment.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Stethoscope size={18} className="text-[#0D9488]" />
                <div>
                  <p className="text-xs text-slate-500">Specialty</p>
                  <p className="text-sm font-bold text-slate-800">{selectedAppointment.specialty}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <CheckCircle size={18} className="text-green-500" />
                <div>
                  <p className="text-xs text-slate-500">Status</p>
                  <p className="text-sm font-bold text-slate-800">{selectedAppointment.status}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsVideoMeetingOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => alert("Video meeting functionality will be connected to WebRTC backend")}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white text-xs font-bold hover:shadow-md transition"
              >
                Join Meeting
              </button>
            </div>
          </div>
        </div>
      )}

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

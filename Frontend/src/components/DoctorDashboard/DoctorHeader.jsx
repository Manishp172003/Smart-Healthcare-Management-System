import { useState, useEffect, useMemo } from "react";
import { 
  Bell, 
  Search, 
  ChevronDown, 
  UserCheck, 
  X, 
  BellOff, 
  CheckCircle2, 
  Calendar, 
  Video, 
  Siren, 
  FileText,
  Clock,
  Menu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tabMeta = {
  "Dashboard": {
    title: "Clinical Overview",
    subtitle: "Real-time incoming appointments, approvals, and patient consultations."
  },
  "Patients": {
    title: "Patients Directory",
    subtitle: "Search, view medical history, and inspect client charts."
  },
  "Schedules": {
    title: "Schedules Planner",
    subtitle: "Set your office calendar and configure patient time slots."
  },
  "Medical Records": {
    title: "Medical Records Vault",
    subtitle: "Upload prescriptions and sign patient reports."
  },
  "Analytics": {
    title: "Practice Analytics",
    subtitle: "View statistics for your practice and client feedback."
  },
  "Help Center": {
    title: "Clinical Help Center",
    subtitle: "Telehealth protocols, prescription guidelines, and emergency SOPs."
  }
};

const DoctorHeader = ({ 
  activeTab, 
  setActiveTab,
  activeDoctor, 
  doctors = [], 
  selectedDoctorId, 
  setSelectedDoctorId, 
  pendingCount = 0,
  appointments = [],
  isDoctorLocked = false,
  onToggleMobileMenu
}) => {
  const currentMeta = tabMeta[activeTab] || { title: activeTab, subtitle: "" };
  const doctorName = activeDoctor?.user?.name || "Dr. Ananya Sharma";
  const doctorSpec = activeDoctor?.specialization || "Cardiologist";

  const [showNotifications, setShowNotifications] = useState(false);
  const [activeEmergencies, setActiveEmergencies] = useState([]);
  const [liveTrigger, setLiveTrigger] = useState(0);

  // Stored read IDs
  const [readIds, setReadIds] = useState(() => {
    try {
      const saved = localStorage.getItem("smarthealth_doctor_read_notifications");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Stored cleared IDs
  const [clearedIds, setClearedIds] = useState(() => {
    try {
      const saved = localStorage.getItem("smarthealth_doctor_cleared_notifications");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // 1. Fetch active hospital emergencies
  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/emergencies/active");
        if (res.ok) {
          const data = await res.json();
          setActiveEmergencies(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        // silent fail on network glitch
      }
    };
    fetchEmergencies();
    const interval = setInterval(fetchEmergencies, 10000); // 10s poll
    return () => clearInterval(interval);
  }, []);

  // 2. Real-time event sync
  useEffect(() => {
    const handleSync = () => setLiveTrigger(p => p + 1);
    window.addEventListener("storage", handleSync);
    window.addEventListener("appointmentsUpdated", handleSync);
    window.addEventListener("recordsUpdated", handleSync);
    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("appointmentsUpdated", handleSync);
      window.removeEventListener("recordsUpdated", handleSync);
    };
  }, []);

  // 3. Compute live real-time clinical notifications
  const notifications = useMemo(() => {
    const list = [];

    // A. Active Emergency Alerts (Highest priority)
    activeEmergencies.forEach(emg => {
      const id = `emg-${emg.id}`;
      list.push({
        id,
        title: "CRITICAL: Patient Emergency Alert",
        description: `${emg.patient?.user?.name || "Patient"} flagged an SOS alert: ${emg.medicalSummary || "Immediate trauma evaluation needed."}`,
        time: "URGENT",
        type: "emergency",
        unread: !readIds.includes(id),
        actionTab: "Dashboard"
      });
    });

    // B. Live Appointments for this Doctor
    if (appointments && appointments.length > 0) {
      appointments.forEach(apt => {
        const patientName = apt.patient?.user?.name || apt.patient?.name || "Patient";
        const date = apt.appointmentDate || "Upcoming";
        const time = apt.startTime || "";
        const isTele = apt.appointmentType === "telehealth";

        if (apt.status === "PENDING") {
          const id = `doc-apt-pending-${apt.id}`;
          list.push({
            id,
            title: "New Booking Request",
            description: `${patientName} requested a ${isTele ? "Telehealth" : "In-Clinic"} consultation on ${date} ${time}.`,
            time: `${date}`,
            type: "booking",
            unread: !readIds.includes(id),
            actionTab: "Dashboard"
          });
        } else if (apt.status === "CONFIRMED") {
          const id = `doc-apt-conf-${apt.id}`;
          list.push({
            id,
            title: isTele ? "Telehealth Consultation Ready" : "Upcoming Clinic Visit",
            description: `Scheduled with ${patientName} on ${date} ${time ? "at " + time : ""}.`,
            time: `${date}`,
            type: isTele ? "telehealth" : "booking",
            unread: !readIds.includes(id),
            actionTab: "Dashboard"
          });
        }
      });
    }

    // C. Digital Prescriptions logged by doctor
    try {
      const recordsRaw = localStorage.getItem("smarthealth_medical_records");
      if (recordsRaw) {
        const records = JSON.parse(recordsRaw);
        if (Array.isArray(records)) {
          records.slice(0, 2).forEach(rec => {
            const id = `doc-rec-${rec.id}`;
            list.push({
              id,
              title: "Prescription Signed & Transmitted",
              description: `${rec.name} dispatched to patient portal successfully.`,
              time: `${rec.date}`,
              type: "prescription",
              unread: !readIds.includes(id),
              actionTab: "Medical Records"
            });
          });
        }
      }
    } catch (e) {}

    // Fallback if empty
    if (list.length === 0) {
      list.push({
        id: "doc-sys-active",
        title: "Clinical Portal Active",
        description: "Your OPD schedule and consultation queue are synchronized with the central hospital database.",
        time: "Active",
        type: "system",
        unread: false,
        actionTab: "Dashboard"
      });
    }

    return list.filter(item => !clearedIds.includes(item.id));
  }, [activeEmergencies, appointments, readIds, clearedIds, liveTrigger]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAsRead = (id) => {
    if (!readIds.includes(id)) {
      const updated = [...readIds, id];
      setReadIds(updated);
      localStorage.setItem("smarthealth_doctor_read_notifications", JSON.stringify(updated));
    }
  };

  const handleNotificationClick = (item) => {
    handleMarkAsRead(item.id);
    setShowNotifications(false);
    if (item.actionTab && setActiveTab) {
      setActiveTab(item.actionTab);
    }
  };

  const handleMarkAllAsRead = () => {
    const allIds = notifications.map(n => n.id);
    const updated = Array.from(new Set([...readIds, ...allIds]));
    setReadIds(updated);
    localStorage.setItem("smarthealth_doctor_read_notifications", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    const allIds = notifications.map(n => n.id);
    const updated = Array.from(new Set([...clearedIds, ...allIds]));
    setClearedIds(updated);
    localStorage.setItem("smarthealth_doctor_cleared_notifications", JSON.stringify(updated));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "emergency":
        return <Siren size={15} className="text-red-500 animate-pulse" />;
      case "telehealth":
        return <Video size={15} className="text-teal-600" />;
      case "prescription":
        return <FileText size={15} className="text-purple-600" />;
      case "booking":
        return <Calendar size={15} className="text-blue-600" />;
      default:
        return <CheckCircle2 size={15} className="text-emerald-500" />;
    }
  };

  const getNotificationBg = (type) => {
    switch (type) {
      case "emergency":
        return "bg-red-50 border-red-200 text-red-700";
      case "telehealth":
        return "bg-teal-50 border-teal-200 text-teal-700";
      case "prescription":
        return "bg-purple-50 border-purple-200 text-purple-700";
      case "booking":
        return "bg-blue-50 border-blue-200 text-blue-700";
      default:
        return "bg-slate-50 border-slate-200 text-slate-700";
    }
  };

  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/50 pb-5 relative z-30">
      
      {/* Title & Subtitle Stack with Mobile Hamburger Button */}
      <div className="flex items-center gap-3 flex-1">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="p-2.5 rounded-xl bg-white/90 border border-slate-200/80 text-slate-700 hover:text-slate-900 shadow-xs md:hidden flex items-center justify-center transition cursor-pointer shrink-0"
          title="Open Menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight flex items-center gap-3">
            {activeTab === "Dashboard" ? `Good Day, ${doctorName}` : currentMeta.title}
          </h1>
          <p className="mt-1 text-xs md:text-sm text-slate-500 font-medium">
            {activeTab === "Dashboard" 
              ? `${doctorSpec} • ${pendingCount} appointment${pendingCount === 1 ? '' : 's'} waiting for review`
              : currentMeta.subtitle
            }
          </p>
        </div>
      </div>

      {/* Global Actions (Doctor Switcher or Lock Badge, Notification Bell, Profile) */}
      <div className="flex items-center gap-3 sm:gap-4 flex-wrap relative">
        
        {/* Clinician Profile Selector Dropdown or Locked Badge */}
        {isDoctorLocked ? (
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-900 text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span>Active Practice</span>
          </div>
        ) : (
          doctors.length > 0 && (
            <div className="relative">
              <select
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(Number(e.target.value))}
                className="appearance-none bg-white/80 border border-slate-200/80 rounded-xl px-3.5 py-2 pr-8 text-xs font-bold text-slate-800 shadow-sm outline-none focus:border-blue-500 cursor-pointer"
                title="Admin Preview: Switch doctor profile"
              >
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.user?.name || `Doctor ${doc.id}`} ({doc.specialization})
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          )
        )}

        {/* Notifications Bell */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            title={unreadCount > 0 ? `${unreadCount} new clinical notifications` : "Clinical notifications"}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/60 bg-white/70 text-slate-600 shadow-sm backdrop-blur-sm transition hover:bg-white cursor-pointer ${
              showNotifications ? "bg-white ring-2 ring-blue-500/20" : ""
            }`}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-rose-500 text-[10px] font-black text-white flex items-center justify-center border-2 border-white shadow-xs animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Floating Notification Popover Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell size={16} className="text-blue-600" />
                    <span className="font-extrabold text-xs text-slate-900">Clinical Notifications</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllAsRead}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-transparent border-none cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                {/* List Body */}
                <div className="max-h-[320px] overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 px-4 text-center text-slate-400">
                      <BellOff className="w-8 h-8 text-slate-300 mb-2" />
                      <p className="text-xs font-bold text-slate-600">All clear!</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">No pending clinical alerts or requests.</p>
                    </div>
                  ) : (
                    notifications.map(item => (
                      <div
                        key={item.id}
                        onClick={() => handleNotificationClick(item)}
                        className={`p-3.5 hover:bg-slate-50 transition cursor-pointer flex gap-3 relative ${
                          item.unread ? "bg-blue-50/20" : ""
                        }`}
                      >
                        {item.unread && (
                          <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        )}
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${getNotificationBg(item.type)}`}>
                          {getNotificationIcon(item.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-900 text-xs truncate">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                          <span className="text-[9px] text-slate-400 font-bold block mt-1">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="p-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <button
                      onClick={handleClearAll}
                      className="text-slate-400 hover:text-slate-600 font-bold px-2 py-1 bg-transparent border-none cursor-pointer"
                    >
                      Clear all
                    </button>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-blue-600 hover:text-blue-800 font-bold px-2 py-1 bg-transparent border-none cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Clinician Avatar & Info */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          {activeDoctor?.avatar ? (
            <img
              src={activeDoctor.avatar}
              alt={doctorName}
              className="h-10 w-10 rounded-xl object-cover border border-slate-200 shadow-sm shrink-0"
            />
          ) : (
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
              {doctorName.replace("Dr. ", "").charAt(0) || "D"}
            </div>
          )}
          <div className="hidden lg:block text-left">
            <p className="text-xs font-extrabold text-slate-800 leading-none">{doctorName}</p>
            <span className="text-[10px] text-teal-600 font-bold mt-1 block">{doctorSpec}</span>
          </div>
        </div>

      </div>

    </header>
  );
};

export default DoctorHeader;

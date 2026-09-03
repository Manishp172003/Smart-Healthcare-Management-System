import { useState, useEffect, useMemo } from "react";
import { Bell, Plus, Calendar, FileText, CheckCircle, X, BellOff, Menu, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const tabMeta = {
  "Dashboard": {
    title: "Welcome back, Sarah.",
    subtitle: "Here is an overview of your health journey."
  },
  "My Appointments": {
    title: "My Appointments",
    subtitle: "Manage your upcoming visits and view past history."
  },
  "Book Appointment": {
    title: "Book an Appointment",
    subtitle: "Schedule consultations with our medical specialists."
  },
  "Medical Records": {
    title: "Medical Records",
    subtitle: "Access lab reports, digital prescriptions, and certificates."
  },
  "Profile": {
    title: "Patient Profile",
    subtitle: "Manage your contact info and medical checklists."
  },
  "Help Center": {
    title: "Help Center",
    subtitle: "Search FAQs, browse help guides, or submit a support ticket."
  }
};

function DashboardHeader({ activeTab, setActiveTab, onMenuToggle, appointments = [] }) {
  const userName = localStorage.getItem("name") || "Patient";
  const userInitial = userName.charAt(0).toUpperCase();

  const [profilePhoto, setProfilePhoto] = useState(() => localStorage.getItem("userAvatar") || "");

  useEffect(() => {
    const handleAvatarUpdate = () => {
      setProfilePhoto(localStorage.getItem("userAvatar") || "");
    };
    window.addEventListener("avatarUpdated", handleAvatarUpdate);
    window.addEventListener("storage", handleAvatarUpdate);
    return () => {
      window.removeEventListener("avatarUpdated", handleAvatarUpdate);
      window.removeEventListener("storage", handleAvatarUpdate);
    };
  }, []);

  const [showNotifications, setShowNotifications] = useState(false);
  
  // Stored read & cleared IDs
  const [readNotificationIds, setReadNotificationIds] = useState(() => {
    try {
      const saved = localStorage.getItem("smarthealth_read_notifications");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [clearedNotificationIds, setClearedNotificationIds] = useState(() => {
    try {
      const saved = localStorage.getItem("smarthealth_cleared_notifications");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [liveTrigger, setLiveTrigger] = useState(0);

  useEffect(() => {
    const handleSync = () => {
      setLiveTrigger(prev => prev + 1);
    };
    window.addEventListener("storage", handleSync);
    window.addEventListener("recordsUpdated", handleSync);
    window.addEventListener("appointmentsUpdated", handleSync);
    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("recordsUpdated", handleSync);
      window.removeEventListener("appointmentsUpdated", handleSync);
    };
  }, []);

  // Compute live real-time notifications
  const notifications = useMemo(() => {
    const list = [];

    // 1. Real appointments from database
    if (appointments && appointments.length > 0) {
      appointments.forEach((apt) => {
        const docName = apt.doctor?.user?.name || "Medical Specialist";
        const spec = apt.doctor?.specialization || "Clinical";
        const date = apt.appointmentDate || "Upcoming";
        const time = apt.startTime || "";
        const id = `apt-${apt.id}-${apt.status}`;

        if (apt.status === "CONFIRMED") {
          list.push({
            id,
            title: "Appointment Confirmed",
            description: `Dr. ${docName} confirmed your ${spec} consultation for ${date} ${time ? 'at ' + time : ''}.`,
            time: `${date}`,
            type: "appointment",
            unread: !readNotificationIds.includes(id),
            actionTab: "My Appointments"
          });
        } else if (apt.status === "PENDING") {
          list.push({
            id,
            title: "Booking Awaiting Confirmation",
            description: `Consultation request with Dr. ${docName} on ${date} has been received.`,
            time: `${date}`,
            type: "appointment",
            unread: !readNotificationIds.includes(id),
            actionTab: "My Appointments"
          });
        } else if (apt.status === "CANCELLED") {
          list.push({
            id,
            title: "Appointment Cancelled",
            description: `Consultation with Dr. ${docName} scheduled for ${date} was cancelled.`,
            time: `${date}`,
            type: "appointment",
            unread: !readNotificationIds.includes(id),
            actionTab: "My Appointments"
          });
        } else if (apt.status === "COMPLETED") {
          list.push({
            id,
            title: "Consultation Completed",
            description: `Session with Dr. ${docName} on ${date} is completed. View summary in history.`,
            time: `${date}`,
            type: "appointment",
            unread: !readNotificationIds.includes(id),
            actionTab: "My Appointments"
          });
        }
      });
    }

    // 2. Real Medical Records from vault
    try {
      const recordsRaw = localStorage.getItem("smarthealth_medical_records");
      if (recordsRaw) {
        const records = JSON.parse(recordsRaw);
        if (Array.isArray(records)) {
          records.slice(0, 2).forEach((rec) => {
            const id = `rec-${rec.id}`;
            list.push({
              id,
              title: "Health Document in Vault",
              description: `${rec.name} (${rec.category}) uploaded by ${rec.provider}.`,
              time: `${rec.date}`,
              type: "record",
              unread: !readNotificationIds.includes(id),
              actionTab: "Medical Records"
            });
          });
        }
      }
    } catch (e) {}

    // 3. Real Health Vitals
    try {
      const vitalsRaw = localStorage.getItem("smarthealth_patient_vitals");
      if (vitalsRaw) {
        const vitals = JSON.parse(vitalsRaw);
        const id = `vitals-${vitals.lastUpdated || 'recent'}`;
        list.push({
          id,
          title: "Vitals Synchronized",
          description: `Blood Pressure ${vitals.bpSystolic}/${vitals.bpDiastolic} mmHg • SpO2 ${vitals.spo2}% • Pulse ${vitals.heartRate} bpm.`,
          time: vitals.lastUpdated || "Today",
          type: "system",
          unread: !readNotificationIds.includes(id),
          actionTab: "Dashboard"
        });
      }
    } catch (e) {}

    // Default welcome if no items yet
    if (list.length === 0) {
      list.push({
        id: "sys-welcome",
        title: "Welcome to SmartHealth",
        description: "Your digital patient portal is active. Schedule an appointment or upload health records anytime.",
        time: "Just now",
        type: "system",
        unread: !readNotificationIds.includes("sys-welcome"),
        actionTab: "Book Appointment"
      });
    }

    return list.filter(item => !clearedNotificationIds.includes(item.id));
  }, [appointments, readNotificationIds, clearedNotificationIds, liveTrigger]);

  const titleText = activeTab === "Dashboard" 
    ? `Welcome back, ${userName}.` 
    : (tabMeta[activeTab] || tabMeta["Dashboard"]).title;

  const subtitleText = (tabMeta[activeTab] || tabMeta["Dashboard"]).subtitle;

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAsRead = (id) => {
    if (!readNotificationIds.includes(id)) {
      const updated = [...readNotificationIds, id];
      setReadNotificationIds(updated);
      localStorage.setItem("smarthealth_read_notifications", JSON.stringify(updated));
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
    const updated = Array.from(new Set([...readNotificationIds, ...allIds]));
    setReadNotificationIds(updated);
    localStorage.setItem("smarthealth_read_notifications", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    const allIds = notifications.map(n => n.id);
    const updated = Array.from(new Set([...clearedNotificationIds, ...allIds]));
    setClearedNotificationIds(updated);
    localStorage.setItem("smarthealth_cleared_notifications", JSON.stringify(updated));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "appointment":
        return <Calendar size={15} className="text-blue-600" />;
      case "record":
        return <FileText size={15} className="text-teal-600" />;
      default:
        return <CheckCircle size={15} className="text-green-600" />;
    }
  };

  const getNotificationBg = (type) => {
    switch (type) {
      case "appointment":
        return "bg-blue-50 border-blue-100";
      case "record":
        return "bg-teal-50 border-teal-100";
      default:
        return "bg-green-50 border-green-100";
    }
  };

  return (
    <header className="mb-6 md:mb-8 border-b border-slate-200 pb-5 md:pb-6 relative">
      
      {/* ================= MOBILE TOP APP BAR (md:hidden) ================= */}
      {/* Compact mobile header: Hamburger + Home + Notifications */}
      <div className="flex md:hidden items-center justify-between pb-4">
        {/* Left: Hamburger menu button */}
        <button
          onClick={onMenuToggle}
          className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-800 border-none bg-transparent cursor-pointer flex items-center justify-center transition"
          aria-label="Open Navigation Menu"
        >
          <Menu size={24} />
        </button>

        {/* Center: Back to Home button (smaller) */}
        <Link
          to="/"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-[11px] font-semibold transition"
        >
          <Home size={14} />
          <span>Home</span>
        </Link>

        {/* Right: Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100 cursor-pointer border-none bg-transparent ${showNotifications ? "bg-slate-100" : ""}`}
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* ================= MAIN TITLE ROW (Desktop & Mobile) ================= */}
      <div className="flex items-center justify-between">
        
        {/* Dynamic Title & Subtitle (Full width on mobile) */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {titleText}
          </h1>

          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 font-semibold">
            {subtitleText}
          </p>
        </div>

        {/* Desktop-only Right Side Actions (hidden on mobile, visible on md:flex) */}
        <div className="hidden md:flex items-center gap-5 relative">

          {/* Back to Home button */}
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold transition"
          >
            <Home size={16} />
            <span>Back to Home</span>
          </Link>

          {/* Special Inline Context Action: "+ Book New" on My Appointments */}
          {activeTab === "My Appointments" && (
            <button
              onClick={() => setActiveTab("Book Appointment")}
              className="h-10 bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none text-white px-5 rounded-xl text-xs font-bold transition hover:shadow-md hover:-translate-y-px cursor-pointer flex items-center gap-1.5"
            >
              <Plus size={15} />
              Book New
            </button>
          )}

          {/* Notification Bell Trigger */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100 cursor-pointer border-none bg-transparent z-50 ${showNotifications ? "bg-slate-100" : ""}`}
            >
              <Bell size={23} />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
              )}
            </button>
          </div>

          {/* Patient Profile Avatar */}
          <div 
            onClick={() => setActiveTab("Profile")}
            className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-blue-100 bg-blue-50 cursor-pointer hover:ring-2 hover:ring-blue-400 transition shrink-0 shadow-2xs"
            title="View Profile"
          >
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="font-bold text-[#2563EB]">
                {userInitial}
              </span>
            )}
          </div>

        </div>

      </div>

      {/* Backdrop overlay to close notifications dropdown when clicking outside */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40 bg-transparent" 
          onClick={() => setShowNotifications(false)}
        />
      )}

      {/* Shared Notifications Dropdown Card */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-14 md:top-20 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-white/95 border border-slate-200/80 rounded-2xl shadow-xl overflow-hidden z-50 text-left backdrop-blur-md"
          >
            
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
              <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                Notifications
                {unreadCount > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {unreadCount} New
                  </span>
                )}
              </h4>
              {notifications.length > 0 && (
                <button 
                  onClick={handleMarkAllAsRead}
                  className="text-xs font-bold text-[#2563EB] hover:text-[#0D9488] bg-transparent border-none cursor-pointer"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* List Body */}
            <div className="max-h-[300px] overflow-y-auto divide-y divide-slate-100">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 px-5 text-center text-slate-400">
                  <BellOff className="w-8 h-8 text-slate-300 mb-2" />
                  <p className="text-xs font-bold">All clear!</p>
                  <p className="text-[11px] text-slate-400 font-medium">You don't have any notifications right now.</p>
                </div>
              ) : (
                notifications.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => handleNotificationClick(item)}
                    className={`p-4 hover:bg-slate-50/80 transition cursor-pointer flex gap-3.5 relative ${item.unread ? "bg-blue-50/20" : ""}`}
                  >
                    {/* Dot status indicator */}
                    {item.unread && (
                      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    )}

                    {/* Icon circle */}
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${getNotificationBg(item.type)}`}>
                      {getNotificationIcon(item.type)}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 text-xs truncate">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-relaxed">
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

            {/* Footer action button */}
            {notifications.length > 0 && (
              <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex justify-center">
                <button 
                  onClick={handleClearAll}
                  className="text-xs font-bold text-slate-500 hover:text-slate-700 bg-transparent border-none cursor-pointer"
                >
                  Clear all notifications
                </button>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}

export default DashboardHeader;
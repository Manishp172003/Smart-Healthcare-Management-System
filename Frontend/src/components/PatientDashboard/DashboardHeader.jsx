import { useState } from "react";
import { Bell, Plus, Calendar, FileText, CheckCircle, X, BellOff, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

function DashboardHeader({ activeTab, setActiveTab, onMenuToggle }) {
  const userName = localStorage.getItem("name") || "Patient";
  const userInitial = userName.charAt(0).toUpperCase();

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Appointment Confirmed",
      description: "Dr. Jenkins confirmed your Cardiology checkup.",
      time: "10 mins ago",
      type: "appointment",
      unread: true,
    },
    {
      id: 2,
      title: "Lab Report Uploaded",
      description: "Your annual blood panel results are now available.",
      time: "2 hours ago",
      type: "record",
      unread: true,
    },
    {
      id: 3,
      title: "Profile Completed",
      description: "You've successfully set up your patient account.",
      time: "Yesterday",
      type: "system",
      unread: false,
    }
  ]);

  const titleText = activeTab === "Dashboard" 
    ? `Welcome back, ${userName}.` 
    : (tabMeta[activeTab] || tabMeta["Dashboard"]).title;

  const subtitleText = (tabMeta[activeTab] || tabMeta["Dashboard"]).subtitle;

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleClearAll = () => {
    setNotifications([]);
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
      {/* Dedicated top navigation bar on mobile: Hamburger on left, Notification & Profile on right */}
      <div className="flex md:hidden items-center justify-between pb-4">
        {/* Left: Hamburger menu button */}
        <button
          onClick={onMenuToggle}
          className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-800 border-none bg-transparent cursor-pointer flex items-center justify-center transition"
          aria-label="Open Navigation Menu"
        >
          <Menu size={24} />
        </button>

        {/* Right: Notification Bell & Profile Avatar */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100 cursor-pointer border-none bg-transparent ${showNotifications ? "bg-slate-100" : ""}`}
              aria-label="Notifications"
            >
              <Bell size={22} />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
              )}
            </button>
          </div>

          {/* Patient Profile Avatar */}
          <div 
            onClick={() => setActiveTab("Profile")}
            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-blue-100 bg-blue-50 cursor-pointer hover:ring-2 hover:ring-blue-400 transition shrink-0"
            title="View Profile"
          >
            <span className="font-bold text-sm text-[#2563EB]">
              {userInitial}
            </span>
          </div>
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
            className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-blue-100 bg-blue-50 cursor-pointer hover:ring-2 hover:ring-blue-400 transition shrink-0"
            title="View Profile"
          >
            <span className="font-bold text-[#2563EB]">
              {userInitial}
            </span>
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
                    onClick={() => handleMarkAsRead(item.id)}
                    className={`p-4 hover:bg-slate-50/60 transition cursor-pointer flex gap-3.5 relative ${item.unread ? "bg-blue-50/15" : ""}`}
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
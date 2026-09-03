import {
  LayoutDashboard,
  CalendarDays,
  CalendarPlus,
  FileText,
  User,
  Siren,
  CircleHelp,
  LogOut,
  HeartPulse,
  ChevronLeft,
  ChevronRight,
  X,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    label: "Back to Home",
    icon: Home,
    isExternal: true,
    href: "/"
  },
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Appointments",
    icon: CalendarDays,
  },
  {
    label: "Book Appointment",
    icon: CalendarPlus,
  },
  {
    label: "Medical Records",
    icon: FileText,
  },
  {
    label: "Profile",
    icon: User,
  },
];

const bottomItems = [
  {
    label: "Help Center",
    icon: CircleHelp,
  },
  {
    label: "Sign Out",
    icon: LogOut,
  },
];

function Sidebar({ 
  activeTab, 
  setActiveTab, 
  onSignOutTrigger, 
  onEmergencyTrigger, 
  isOpen, 
  onClose,
  isCollapsed = false,
  setIsCollapsed
}) {
  return (
    <aside className={`fixed left-0 top-0 h-screen flex-col border-r border-white/5 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F766E] text-white z-50 transition-all duration-300 md:translate-x-0 md:flex ${
      isCollapsed ? "md:w-20 p-3" : "md:w-64 p-5"
    } ${
      isOpen ? "translate-x-0 flex w-64 p-5 shadow-2xl" : "-translate-x-full hidden md:flex"
    }`}>

      {/* Floating Desktop Collapse/Expand Toggle on Edge */}
      {setIsCollapsed && (
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute -right-3.5 top-6 z-50 w-7 h-7 rounded-full bg-slate-900 border border-slate-700/90 text-slate-300 hover:text-white hover:bg-teal-600 shadow-md items-center justify-center transition-transform hover:scale-110 cursor-pointer"
          title={isCollapsed ? "Expand sidebar" : "Shrink sidebar to icons only"}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      )}

      {/* Logo Section */}
      <div className={`mb-4 flex items-center ${isCollapsed ? "justify-center py-2" : "justify-between px-3 py-2"}`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 flex items-center justify-center text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] rounded-xl shadow-sm border border-white/10 shrink-0">
            <HeartPulse size={22} className="stroke-[2.5]" />
          </div>

          {!isCollapsed && (
            <div className="transition-opacity duration-200">
              <span className="text-lg font-extrabold tracking-[-0.5px] text-white block leading-none">
                SmartHealth
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[1.5px] text-white/50 block mt-1.5 leading-none">
                Patient Portal
              </span>
            </div>
          )}
        </div>

        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="md:hidden text-white/60 hover:text-white p-2 rounded-xl bg-white/5 border-none cursor-pointer flex items-center justify-center"
        >
          <X size={16} />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-1.5 mt-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.label === activeTab;
          const isExternal = item.isExternal;

          if (isExternal) {
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => {
                  if (onClose) onClose();
                }}
                className={`flex w-full items-center transition cursor-pointer text-slate-300 hover:bg-white/5 hover:text-white rounded-xl ${
                  isCollapsed 
                    ? "justify-center px-0 py-3 relative group" 
                    : "gap-4 px-4 py-3 text-sm font-medium"
                }`}
              >
                <Icon size={20} className="shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
                {isCollapsed && (
                  <span className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          }

          return (
            <button
              key={item.label}
              onClick={() => {
                setActiveTab(item.label);
                if (onClose) onClose();
              }}
              className={`flex w-full items-center transition cursor-pointer rounded-xl ${
                isCollapsed 
                  ? "justify-center px-0 py-3 relative group" 
                  : "gap-4 px-4 py-3 text-sm font-medium"
              } ${
                isActive
                  ? isCollapsed
                    ? "bg-white/15 text-white shadow-xs"
                    : "bg-white/10 text-white border-l-4 border-[#0D9488] rounded-r-xl rounded-l-none font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={20} className="shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
              {isCollapsed && (
                <span className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className={`border-t border-white/5 ${isCollapsed ? "px-0 py-4" : "px-2 py-5"}`}>
        
        {/* Emergency */}
        <button 
          onClick={() => {
            if (onEmergencyTrigger) onEmergencyTrigger();
            if (onClose) onClose();
          }}
          className={`mb-3 flex w-full items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 transition hover:bg-red-500/20 cursor-pointer ${
            isCollapsed ? "p-3 relative group" : "gap-3 px-4 py-3 text-sm font-bold"
          }`}
        >
          <Siren size={20} className="shrink-0 animate-pulse" />
          {!isCollapsed && <span>Emergency Alert</span>}
          {isCollapsed && (
            <span className="absolute left-full ml-3 px-2.5 py-1 bg-red-950 border border-red-700 text-red-200 text-xs font-bold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Emergency Alert
            </span>
          )}
        </button>

        {/* Help + Logout */}
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isHelp = item.label === "Help Center";
          const isActive = isHelp && activeTab === "Help Center";

          const handleClick = () => {
            if (isHelp) {
              setActiveTab("Help Center");
              if (onClose) onClose();
            } else {
              if (onSignOutTrigger) {
                onSignOutTrigger();
              } else {
                if (window.confirm("Are you sure you want to sign out?")) {
                  localStorage.clear();
                  window.location.href = "/login";
                }
              }
              if (onClose) onClose();
            }
          };

          return (
            <button
              key={item.label}
              onClick={handleClick}
              className={`mb-1 flex w-full items-center transition cursor-pointer rounded-xl ${
                isCollapsed 
                  ? "justify-center px-0 py-3 relative group" 
                  : "gap-4 px-4 py-3 text-sm font-medium"
              } ${
                isActive 
                  ? isCollapsed
                    ? "bg-white/15 text-white shadow-xs"
                    : "bg-white/10 text-white border-l-4 border-[#0D9488] rounded-r-xl rounded-l-none font-bold" 
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={20} className="shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
              {isCollapsed && (
                <span className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}

      </div>
    </aside>
  );
}

export default Sidebar;
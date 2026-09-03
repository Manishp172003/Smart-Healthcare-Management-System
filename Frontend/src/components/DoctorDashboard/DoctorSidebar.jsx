import { 
  LayoutGrid, 
  Users, 
  Calendar, 
  FileHeart, 
  BarChart3, 
  HeartPulse, 
  Siren, 
  HelpCircle, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Patients", icon: Users },
  { label: "Schedules", icon: Calendar },
  { label: "Medical Records", icon: FileHeart },
  { label: "Analytics", icon: BarChart3 }
];

const bottomItems = [
  { label: "Help Center", icon: HelpCircle },
  { label: "Sign Out", icon: LogOut }
];

const DoctorSidebar = ({ 
  activeTab, 
  setActiveTab, 
  onSignOutTrigger, 
  isOpen = false, 
  onClose,
  isCollapsed = false,
  setIsCollapsed
}) => {
  return (
    <aside className={`fixed bottom-0 left-0 top-0 z-40 flex-col justify-between border-r border-[#0D9488]/20 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0D9488] transition-all duration-300 md:translate-x-0 md:flex ${
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
      
      {/* Top Section */}
      <div>
        
        {/* Brand Logo Header */}
        <div className={`mb-5 flex items-center ${isCollapsed ? "justify-center py-2" : "justify-between px-3 py-2"}`}>
          
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
                  Clinical Portal
                </span>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white md:hidden cursor-pointer transition"
            title="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-1.5 mt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.label;

            return (
              <button
                key={item.label}
                onClick={() => {
                  setActiveTab(item.label);
                  onClose?.();
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

                {/* Floating Tooltip in collapsed mode */}
                {isCollapsed && (
                  <span className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

      </div>

      {/* Bottom Section */}
      <div className={`border-t border-white/5 ${isCollapsed ? "px-0 py-4" : "px-2 py-5"}`}>
        
        {/* Emergency Alert */}
        <button 
          onClick={() => {
            alert("Broadcasting Emergency Alert. Clinical dispatch notified.");
            onClose?.();
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

        {/* Bottom items */}
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isHelp = item.label === "Help Center";
          const isActive = isHelp && activeTab === "Help Center";

          const handleClick = () => {
            if (isHelp) {
              setActiveTab("Help Center");
              onClose?.();
            } else {
              onClose?.();
              if (onSignOutTrigger) {
                onSignOutTrigger();
              } else {
                window.location.href = "/login";
              }
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
};

export default DoctorSidebar;

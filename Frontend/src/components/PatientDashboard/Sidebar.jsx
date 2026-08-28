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
} from "lucide-react";

const menuItems = [
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

function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-white/5 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F766E] text-white md:flex">

      {/* Logo */}
      <div className="px-6 py-7">
        <div className="flex items-center gap-3">
          
          <div className="w-10 h-10 flex items-center justify-center text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] rounded-xl shadow-sm border border-white/10">
            <HeartPulse size={22} className="stroke-[2.5]" />
          </div>

          <div>
            <span className="text-lg font-extrabold tracking-[-0.5px] text-white block leading-none">
              SmartHealth
            </span>

            <span className="text-[9px] font-bold uppercase tracking-[1.5px] text-white/50 block mt-1.5 leading-none">
              Patient Portal
            </span>
          </div>

        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4">

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.label === activeTab;

          return (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`mb-2 flex w-full items-center gap-4 px-4 py-3 text-sm font-medium transition cursor-pointer ${
                isActive
                  ? "bg-white/10 text-white border-l-4 border-[#0D9488] rounded-r-xl rounded-l-none font-bold"
                  : "text-slate-300 hover:bg-white/5 hover:text-white rounded-xl"
              }`}
            >
              <Icon
                size={21}
                strokeWidth={isActive ? 2.5 : 2}
              />

              <span>{item.label}</span>
            </button>
          );
        })}

      </nav>

      {/* Bottom Section */}
      <div className="border-t border-white/5 px-4 py-5">

        {/* Emergency */}
        <button className="mb-3 flex w-full items-center justify-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-400 transition hover:bg-red-500/20 cursor-pointer">
          <Siren size={20} />
          Emergency Alert
        </button>

        {/* Help + Logout */}
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isHelp = item.label === "Help Center";
          const isActive = isHelp && activeTab === "Help Center";

          const handleClick = () => {
            if (isHelp) {
              setActiveTab("Help Center");
            } else {
              alert("Signing out...");
            }
          };

          return (
            <button
              key={item.label}
              onClick={handleClick}
              className={`mb-1 flex w-full items-center gap-4 px-4 py-3 text-sm font-medium transition cursor-pointer ${
                isActive 
                  ? "bg-white/10 text-white border-l-4 border-[#0D9488] rounded-r-xl rounded-l-none font-bold" 
                  : "text-slate-300 hover:bg-white/5 hover:text-white rounded-xl"
              }`}
            >
              <Icon size={21} />
              <span>{item.label}</span>
            </button>
          );
        })}

      </div>
    </aside>
  );
}

export default Sidebar;
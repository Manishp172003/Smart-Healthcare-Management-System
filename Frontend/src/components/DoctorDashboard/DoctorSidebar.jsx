import { 
  LayoutGrid, 
  Users, 
  Calendar, 
  FileHeart, 
  BarChart3, 
  HeartPulse, 
  Siren, 
  HelpCircle, 
  LogOut 
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

const DoctorSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="fixed bottom-0 left-0 top-0 z-20 hidden w-64 flex-col justify-between border-r border-[#0D9488]/20 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0D9488] p-5 text-white md:flex">
      
      {/* Top Section */}
      <div>
        
        {/* Brand Logo */}
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-lg shadow-[#0D9488]/20">
            <HeartPulse className="text-[#0d9488] animate-pulse" size={24} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight leading-none text-white">SmartHealth</h1>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0D9488]/85 block mt-0.5">Clinical Portal</span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.label;

            return (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`flex w-full items-center gap-4 px-4 py-3 text-sm font-medium transition cursor-pointer ${
                  isActive
                    ? "bg-white/10 text-white border-l-4 border-[#0D9488] rounded-r-xl rounded-l-none font-bold"
                    : "text-slate-300 hover:bg-white/5 hover:text-white rounded-xl"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/5 px-2 py-5">
        
        {/* Emergency Alert */}
        <button 
          onClick={() => alert("Broadcasting Emergency Alert. Clinical dispatch notified.")}
          className="mb-3 flex w-full items-center justify-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-400 transition hover:bg-red-500/20 cursor-pointer"
        >
          <Siren size={20} />
          Emergency Alert
        </button>

        {/* Bottom items */}
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isHelp = item.label === "Help Center";
          const isActive = isHelp && activeTab === "Help Center";

          const handleClick = () => {
            if (isHelp) {
              setActiveTab("Help Center");
            } else {
              if (confirm("Are you sure you want to sign out?")) {
                window.location.href = "/login";
              }
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
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}

      </div>

    </aside>
  );
};

export default DoctorSidebar;

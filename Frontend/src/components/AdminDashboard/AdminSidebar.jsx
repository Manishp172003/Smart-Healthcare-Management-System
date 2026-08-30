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

const AdminSidebar = ({ activeTab, setActiveTab, onEmergencyTrigger, onSignOutTrigger }) => {
  return (
    <aside className="fixed bottom-0 left-0 top-0 z-20 hidden w-64 flex-col justify-between border-r border-[#0D9488]/20 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0D9488] p-5 text-white md:flex">
      
      {/* Top Section */}
      <div>
        
        {/* Brand Logo */}
        <div className="px-4 py-5 mb-4">
          <div className="flex items-center gap-3">
            
            <div className="w-10 h-10 flex items-center justify-center text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] rounded-xl shadow-sm border border-white/10">
              <HeartPulse size={22} className="stroke-[2.5]" />
            </div>

            <div>
              <span className="text-lg font-extrabold tracking-[-0.5px] text-white block leading-none">
                SmartHealth
              </span>

              <span className="text-[9px] font-bold uppercase tracking-[1.5px] text-white/50 block mt-1.5 leading-none">
                Admin Portal
              </span>
            </div>

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
          onClick={onEmergencyTrigger}
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
              onSignOutTrigger();
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

export default AdminSidebar;

import { Bell, Search } from "lucide-react";

const tabMeta = {
  "Dashboard": {
    title: "Good Morning, Dr. Reynolds",
    subtitle: "Here is your clinical overview for today, October 24th."
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
    title: "Help Center",
    subtitle: "Search FAQs, browse help guides, or submit a support ticket."
  }
};

const DoctorHeader = ({ activeTab }) => {
  const currentMeta = tabMeta[activeTab] || { title: activeTab, subtitle: "" };

  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200/50 pb-5">
      
      {/* Title & Subtitle Stack */}
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {currentMeta.title}
        </h1>
        <p className="mt-1 text-xs md:text-sm text-slate-500 font-medium">
          {currentMeta.subtitle}
        </p>
      </div>

      {/* Global Actions (Search, Notification, Profile) */}
      <div className="flex items-center gap-4">
        
        {/* Search Bar */}
        <div className="relative hidden sm:block w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search patients or records..."
            className="w-full rounded-xl border border-slate-200/70 bg-white/70 backdrop-blur-sm py-2 pl-10 pr-4 text-xs md:text-sm text-[#162235] outline-none transition focus:border-[#0D9488] focus:bg-white"
          />
        </div>

        {/* Notifications Bell */}
        <button 
          onClick={() => alert("No new clinical notifications.")}
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/45 bg-white/60 text-slate-600 shadow-sm backdrop-blur-sm transition hover:bg-white/80 cursor-pointer"
        >
          <Bell size={18} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#EA4335]" />
        </button>

        {/* Clinician Avatar */}
        <div className="flex items-center gap-2.5 cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150" 
            alt="Dr. Reynolds Profile" 
            className="h-10 w-10 rounded-xl object-cover border-2 border-[#0D9488]/40 shadow-sm"
          />
          <div className="hidden lg:block text-left">
            <p className="text-xs font-extrabold text-slate-800 leading-none">Dr. Reynolds</p>
            <span className="text-[10px] text-slate-400 font-bold mt-1 block">Cardiology MD</span>
          </div>
        </div>

      </div>

    </header>
  );
};

export default DoctorHeader;

import { Plus, Search, Menu } from "lucide-react";

const tabMeta = {
  "Dashboard": {
    title: "Dashboard Overview",
    subtitle: "System-wide metrics and daily performance."
  },
  "Doctors": {
    title: "Doctors Directory & Credential Approvals",
    subtitle: "Manage medical practitioners, verify licenses, and onboard specialists."
  },
  "Patients": {
    title: "Patient Records Audit",
    subtitle: "Monitor clinical files and client charts."
  },
  "Schedules": {
    title: "Schedules Audit",
    subtitle: "Track clinic schedules and booking distribution."
  },
  "Medical Records": {
    title: "Medical Archives",
    subtitle: "Inspect clinical logs and report signatures."
  },
  "Testimonials": {
    title: "Patient Reviews & Testimonials",
    subtitle: "Moderate patient care feedback, feature testimonials, and configure publication mode."
  },
  "Analytics": {
    title: "System Performance",
    subtitle: "Monitor network metrics, load, and HIPAA auditing."
  },
  "Help Center": {
    title: "Help Center",
    subtitle: "Search FAQs, browse help guides, or submit a support ticket."
  }
};

const AdminHeader = ({ activeTab, onToggleMobileMenu }) => {
  const currentMeta = tabMeta[activeTab] || { title: activeTab, subtitle: "" };

  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/50 pb-5">
      
      {/* Title Stack with Mobile Hamburger Button */}
      <div className="flex items-center justify-between gap-3 flex-1">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="p-2.5 rounded-xl bg-white/90 border border-slate-200/80 text-slate-700 hover:text-slate-900 shadow-xs md:hidden flex items-center justify-center transition cursor-pointer shrink-0"
            title="Open Menu"
          >
            <Menu size={20} />
          </button>

          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {currentMeta.title}
            </h1>
            <p className="mt-0.5 text-xs md:text-sm text-slate-500 font-medium">
              {currentMeta.subtitle}
            </p>
          </div>
        </div>

        {/* Compact Mobile Action Button */}
        <button 
          onClick={() => alert("IT Administrator log action: opening system record configuration wizard...")}
          className="flex sm:hidden items-center justify-center gap-1.5 h-9 px-3 bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none text-white rounded-xl text-xs font-bold shadow-xs shrink-0 cursor-pointer"
        >
          <Plus size={14} />
          <span>Record</span>
        </button>
      </div>

      {/* Global Actions (Tablet / Desktop) */}
      <div className="hidden sm:flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative w-60">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search patients, doctors..."
            className="w-full rounded-xl border border-slate-200/70 bg-white/70 backdrop-blur-sm py-2 pl-9 pr-4 text-xs md:text-sm text-[#162235] outline-none transition focus:border-[#0D9488] focus:bg-white"
          />
        </div>

        {/* New Record Button */}
        <button 
          onClick={() => alert("IT Administrator log action: opening system record configuration wizard...")}
          className="flex items-center justify-center gap-1.5 h-10 px-4 bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none text-white rounded-xl text-xs font-bold shadow-[0_4px_12px_rgba(37,99,235,0.12)] hover:shadow-[0_6px_18px_rgba(37,99,235,0.2)] hover:-translate-y-px transition duration-300 cursor-pointer"
        >
          <Plus size={15} />
          <span>New Record</span>
        </button>
      </div>

    </header>
  );
};

export default AdminHeader;

import { Bell, Plus } from "lucide-react";

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
  }
};

function DashboardHeader({ activeTab, setActiveTab }) {
  const currentMeta = tabMeta[activeTab] || tabMeta["Dashboard"];

  return (
    <header className="mb-8 flex items-center justify-between border-b border-slate-200 pb-6">
      
      {/* Dynamic Title & Subtitle */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {currentMeta.title}
        </h1>

        <p className="mt-2 text-sm text-slate-500 font-semibold">
          {currentMeta.subtitle}
        </p>
      </div>

      {/* Right Side Actions & Badges */}
      <div className="flex items-center gap-5">

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

        {/* Notification Bell */}
        <button className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100 cursor-pointer border-none bg-transparent">
          <Bell size={23} />
          <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-[#EA4335]" />
        </button>

        {/* Patient Profile Avatar */}
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-blue-100 bg-blue-50">
          <span className="font-bold text-[#2563EB]">
            S
          </span>
        </div>

      </div>

    </header>
  );
}

export default DashboardHeader;
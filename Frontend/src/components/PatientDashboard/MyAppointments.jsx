import { useState } from "react";
import { 
  Video, 
  MapPin, 
  Link2, 
  FileWarning, 
  Building2, 
  Plus, 
  SlidersHorizontal,
  Clock,
  ArrowUpDown
} from "lucide-react";

const initialAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Jenkins",
    specialty: "Cardiology Consultation",
    type: "Follow-up",
    date: "Oct 24",
    time: "10:00 AM",
    duration: "45 mins",
    mode: "Telehealth",
    status: "Confirmed",
    linkInfo: "Link available 15m prior",
    warning: "Pre-visit form required"
  },
  {
    id: 2,
    doctor: "Dr. Marcus Chen",
    specialty: "General Practice",
    type: "Annual Physical",
    date: "Nov 02",
    time: "2:30 PM",
    duration: "30 mins",
    mode: "In-Person",
    status: "Pending Review",
    location: "Main Campus, Suite 402"
  }
];

const MyAppointments = ({ setActiveTab }) => {
  const [activeFilter, setActiveFilter] = useState("Upcoming");
  const [appointments, setAppointments] = useState(initialAppointments);

  const upcomingCount = appointments.filter(a => a.status !== "Completed" && a.status !== "Cancelled").length;

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      setAppointments(appointments.map(app => 
        app.id === id ? { ...app, status: "Cancelled" } : app
      ));
    }
  };

  const getFilteredData = () => {
    if (activeFilter === "Upcoming") {
      return appointments.filter(a => a.status === "Confirmed" || a.status === "Pending Review");
    }
    if (activeFilter === "Past") {
      return appointments.filter(a => a.status === "Completed");
    }
    return appointments.filter(a => a.status === "Waitlist" || a.status === "Cancelled");
  };

  const filteredData = getFilteredData();

  return (
    <div className="space-y-6">
      

      {/* Tabs Filter Row */}
      <div className="border-b border-slate-200">
        <div className="flex gap-8">
          {[
            { id: "Upcoming", label: "Upcoming", badge: upcomingCount },
            { id: "Past", label: "Past" },
            { id: "Waitlist", label: "Waitlist" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`pb-4 text-sm font-bold relative transition cursor-pointer border-none bg-transparent ${
                activeFilter === tab.id 
                  ? "text-[#0d9488] border-b-2 border-[#0d9488]" 
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <span className="flex items-center gap-1.5">
                {tab.label}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#EA4335] px-1.5 text-[10px] font-extrabold text-white">
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* List Sub-header Info */}
      <div className="flex justify-between items-center text-xs font-bold text-slate-400">
        <span className="uppercase tracking-wider">
          {filteredData.length} {activeFilter === "Upcoming" ? "Scheduled" : activeFilter}
        </span>
        <button className="flex items-center gap-1 text-slate-400 hover:text-slate-600 cursor-pointer bg-transparent border-none">
          Sort by: Date (Earliest)
          <SlidersHorizontal size={13} />
        </button>
      </div>

      {/* Row List cards */}
      <div className="space-y-4">
        {filteredData.length === 0 ? (
          <div className="p-16 text-center bg-white/60 border border-white/45 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md rounded-3xl">
            <p className="text-slate-400 text-sm font-bold">No appointments found under this status.</p>
          </div>
        ) : (
          filteredData.map(app => {
            const isTelehealth = app.mode === "Telehealth";
            const isConfirmed = app.status === "Confirmed";

            return (
              <div 
                key={app.id}
                className={`bg-white/60 rounded-3xl border border-white/45 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md flex flex-col md:flex-row items-stretch overflow-hidden relative ${
                  isTelehealth ? "border-l-4 border-l-[#0D9488]" : "border-l-4 border-l-[#2563EB]"
                }`}
              >
                
                {/* Column 1: Date block */}
                <div className="p-5 flex flex-row md:flex-col items-center justify-between md:justify-center md:text-center min-w-[150px] border-b md:border-b-0 md:border-r border-slate-100 gap-3">
                  
                  {/* Left Icon (Visual representation of Mode) */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    isTelehealth ? "bg-[#0D9488]/8 text-[#0D9488]" : "bg-slate-100 text-slate-500"
                  }`}>
                    {isTelehealth ? <Video size={16} /> : <MapPin size={16} />}
                  </div>

                  {/* Date details */}
                  <div className="text-right md:text-center flex-1 md:flex-initial">
                    <h4 className="text-xl font-extrabold text-slate-800 leading-none">{app.date}</h4>
                    <span className="text-xs font-bold text-[#2563EB] block mt-1.5">{app.time}</span>
                    <span className="text-[10px] text-slate-400 font-bold block mt-1 uppercase tracking-wider">{app.duration}</span>
                  </div>

                </div>

                {/* Column 2: Doctor info */}
                <div className="p-6 flex-1 flex flex-col justify-center space-y-3">
                  
                  {/* Badges row */}
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider ${
                      isTelehealth ? "bg-[#0D9488]/8 text-[#0D9488]" : "bg-slate-100 text-slate-500"
                    }`}>
                      {app.mode.toUpperCase()}
                    </span>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isConfirmed ? "bg-blue-50 text-[#2563EB]" : "bg-yellow-50 text-yellow-600"
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  {/* Doctor Info */}
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-800 leading-tight">{app.doctor}</h3>
                    <p className="text-slate-400 text-xs mt-1.5 font-bold">
                      {app.specialty} <span className="text-slate-300 mx-1">•</span> {app.type}
                    </p>
                  </div>

                  {/* Row Metadata (Links / Location detail) */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] font-semibold text-slate-500">
                    {isTelehealth ? (
                      <>
                        <span className="flex items-center gap-1">
                          <Link2 size={13} className="text-slate-400" />
                          {app.linkInfo}
                        </span>
                        {app.warning && (
                          <span className="flex items-center gap-1 text-[#EA4335]">
                            <FileWarning size={13} className="text-[#EA4335]" />
                            {app.warning}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Building2 size={13} className="text-slate-400" />
                        {app.location}
                      </span>
                    )}
                  </div>

                </div>

                {/* Column 3: Actions block */}
                <div className="p-6 md:min-w-[200px] border-t md:border-t-0 md:border-l border-white/40 flex flex-row md:flex-col justify-center items-stretch gap-3 bg-white/20">
                  {isTelehealth ? (
                    <>
                      <button className="flex-1 flex items-center justify-center gap-1.5 h-10 bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none text-white rounded-xl text-xs font-bold transition hover:shadow-md hover:-translate-y-px cursor-pointer">
                        Join Call
                      </button>
                      <button className="flex-1 h-10 bg-white/40 border border-white/20 hover:bg-white/60 text-slate-600 rounded-xl text-xs font-bold transition cursor-pointer">
                        Reschedule
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="flex-1 h-10 bg-white/40 border border-white/20 hover:bg-white/60 text-slate-600 rounded-xl text-xs font-bold transition cursor-pointer">
                        Modify Request
                      </button>
                      <button 
                        onClick={() => handleCancel(app.id)}
                        className="flex-1 h-10 bg-transparent border-none text-[#EA4335] hover:underline rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default MyAppointments;

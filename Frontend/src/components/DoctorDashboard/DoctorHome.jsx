import { 
  Calendar, 
  CheckSquare, 
  Users, 
  Clock, 
  CheckCircle2, 
  Activity, 
  ChevronRight 
} from "lucide-react";

const appointments = [
  {
    time: "09:00 AM",
    timeDetail: "In Progress (15m left)",
    patientName: "Elena Silva",
    patientId: "PT-8472",
    reason: "Post-op follow up",
    status: "Active",
    badgeClass: "bg-emerald-50 text-emerald-600 border-emerald-100",
    initials: "ES",
    avatar: null
  },
  {
    time: "09:30 AM",
    timeDetail: "30 min",
    patientName: "Marcus Johnson",
    patientId: "PT-1129",
    reason: "Annual Physical",
    status: "Waiting",
    badgeClass: "bg-amber-50 text-amber-600 border-amber-100",
    initials: "MJ",
    avatar: null
  },
  {
    time: "10:15 AM",
    timeDetail: "15 min",
    patientName: "Arthur Pendelton",
    patientId: "PT-9031",
    reason: "Medication Review",
    status: "Scheduled",
    badgeClass: "bg-slate-100 text-slate-600 border-slate-200",
    initials: "AP",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

const DoctorHome = () => {
  return (
    <div className="space-y-6">
      
      {/* Quick Statistics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white/60 border border-white/45 rounded-3xl p-5 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider block">Today's Visits</span>
            <span className="text-2xl font-black text-slate-800 block mt-1">6 Scheduled</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-100">
            <Users size={18} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white/60 border border-white/45 rounded-3xl p-5 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider block">Currently Active</span>
            <span className="text-2xl font-black text-slate-800 block mt-1">1 Patient</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0d9488] flex items-center justify-center border border-emerald-100">
            <Activity size={18} />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white/60 border border-white/45 rounded-3xl p-5 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider block">Hours Clocked</span>
            <span className="text-2xl font-black text-slate-800 block mt-1">4.5 Hrs</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center border border-yellow-100">
            <Clock size={18} />
          </div>
        </div>

      </div>

      {/* Main Grid: Today's Appointments and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Today's Appointments Table (Occupies 2 columns on desktop) */}
        <div className="lg:col-span-2 bg-white/60 border border-white/45 rounded-3xl shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md flex flex-col overflow-hidden">
          
          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-slate-200/50 p-6">
            <h2 className="text-base md:text-lg font-extrabold text-slate-800 flex items-center gap-2">
              <Calendar size={18} className="text-[#0d9488]" />
              Today's Appointments
            </h2>
            <button className="text-xs font-extrabold text-[#2563EB] hover:text-[#0D9488] hover:underline cursor-pointer flex items-center gap-0.5 bg-transparent border-none">
              View Full Schedule
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[550px] text-left">
              
              {/* Table Head */}
              <thead>
                <tr className="bg-slate-100/40 text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100/30">
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Reason</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {appointments.map((app, index) => (
                  <tr 
                    key={index}
                    className="border-b border-slate-100/40 hover:bg-slate-50/30 transition cursor-pointer last:border-b-0"
                  >
                    
                    {/* Time Column */}
                    <td className="px-6 py-5 whitespace-nowrap">
                      <p className="text-xs md:text-sm font-extrabold text-slate-800">{app.time}</p>
                      <p className={`text-[10px] md:text-xs mt-0.5 font-bold ${
                        app.status === "Active" ? "text-emerald-500" : "text-slate-400"
                      }`}>{app.timeDetail}</p>
                    </td>

                    {/* Patient Name + Avatar Column */}
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {app.avatar ? (
                          <img 
                            src={app.avatar} 
                            alt={app.patientName} 
                            className="w-9 h-9 rounded-full object-cover border border-slate-200"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                            {app.initials}
                          </div>
                        )}
                        <div>
                          <p className="text-xs md:text-sm font-extrabold text-slate-800">{app.patientName}</p>
                          <p className="text-[10px] md:text-xs text-slate-400 font-bold mt-0.5">ID: {app.patientId}</p>
                        </div>
                      </div>
                    </td>

                    {/* Reason Column */}
                    <td className="px-6 py-5 text-xs md:text-sm text-slate-600 font-semibold whitespace-nowrap">
                      {app.reason}
                    </td>

                    {/* Status badge Column */}
                    <td className="px-6 py-5 text-center whitespace-nowrap">
                      <span className={`inline-flex px-2.5 py-1 text-[10px] md:text-xs font-bold rounded-lg border ${app.badgeClass}`}>
                        {app.status}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>

        {/* Right Column: Quick Actions Card */}
        <div className="lg:col-span-1 bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md space-y-5">
          <div>
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider block">Clinical Tools</span>
            <h2 className="text-base md:text-lg font-extrabold text-slate-800 mt-1">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            {/* Reschedule Button */}
            <button 
              onClick={() => alert("Redirecting to schedule management...")}
              className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-white/50 border border-white/40 hover:bg-white/85 hover:shadow-md transition cursor-pointer text-[#0d9488]"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-100">
                <Calendar size={20} />
              </div>
              <span className="text-xs font-extrabold text-slate-700">Reschedule</span>
            </button>

            {/* Confirm List Button */}
            <button 
              onClick={() => alert("Confirmed today's consulting schedule queue.")}
              className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-white/50 border border-white/40 hover:bg-white/85 hover:shadow-md transition cursor-pointer text-[#2563EB]"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                <CheckSquare size={20} />
              </div>
              <span className="text-xs font-extrabold text-slate-700">Confirm List</span>
            </button>

          </div>
        </div>

      </div>

    </div>
  );
};

export default DoctorHome;

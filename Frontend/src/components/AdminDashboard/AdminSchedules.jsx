import { CalendarDays, Clock, CheckCircle2 } from "lucide-react";

const auditLogs = [
  { time: "09:00 AM", patient: "Eleanor Pena", doctor: "Dr. Robert Fox", status: "Active Consultation" },
  { time: "09:30 AM", patient: "Marcus Johnson", doctor: "Dr. Emily Chen", status: "Waiting" },
  { time: "10:15 AM", patient: "Arthur Pendelton", doctor: "Dr. Emily Chen", status: "Scheduled" }
];

const AdminSchedules = () => {
  return (
    <div className="space-y-6">
      
      {/* Overview */}
      <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md">
        <h3 className="font-extrabold text-slate-800 text-sm md:text-base flex items-center gap-2">
          <CalendarDays size={18} className="text-[#0d9488]" />
          Schedules Audit & Load Monitor
        </h3>
        <p className="text-slate-400 text-xs mt-1.5 leading-snug">Track daily consultation loads across clinical offices.</p>
      </div>

      {/* Grid of Logs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {auditLogs.map((log, idx) => (
          <div key={idx} className="bg-white/60 border border-white/45 rounded-3xl p-5 shadow-[0_8px_32px_rgba(15,23,42,0.01)] backdrop-blur-md space-y-4">
            <div className="flex justify-between items-center text-xs font-bold text-[#0D9488]">
              <span className="flex items-center gap-1"><Clock size={12} /> {log.time}</span>
              <span className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wide text-[9px]">{log.status}</span>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Patient Name</p>
              <p className="text-sm font-extrabold text-slate-800 mt-0.5">{log.patient}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Assigned Clinician</p>
              <p className="text-sm font-bold text-slate-700 mt-0.5">{log.doctor}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminSchedules;

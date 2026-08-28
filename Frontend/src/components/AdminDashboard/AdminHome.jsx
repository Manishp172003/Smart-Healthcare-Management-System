import { useState } from "react";
import { 
  Users, 
  UserCheck, 
  Calendar, 
  ClipboardCheck, 
  CheckCircle2, 
  TrendingUp, 
  Activity, 
  UserPlus, 
  FlaskConical, 
  XCircle, 
  ChevronRight,
  ShieldCheck,
  Briefcase
} from "lucide-react";

const stats = [
  { label: "Total Patients", value: "12,485", subtext: "+5.2% this month", icon: Users, colorClass: "text-[#2563EB] bg-blue-50 border-blue-100" },
  { label: "Total Doctors", value: "342", subtext: "+2 new staff", icon: Briefcase, colorClass: "text-[#0d9488] bg-teal-50 border-teal-100" },
  { label: "Appointments Today", value: "856", subtext: "Active bookings", icon: Calendar, colorClass: "text-[#0D9488] bg-emerald-50 border-emerald-100" },
  { label: "Pending Approvals", value: "43", subtext: "Requires attention", icon: ClipboardCheck, colorClass: "text-[#EA4335] bg-red-50 border-red-100 text-red-600 font-bold", isWarning: true },
  { label: "System Status", value: "Optimal", subtext: "All services running", icon: CheckCircle2, colorClass: "text-emerald-600 bg-emerald-50 border-emerald-100" }
];

const weeklyData = [
  { label: "Mon", count: 120, height: "25%", isActive: false },
  { label: "Tue", count: 240, height: "48%", isActive: false },
  { label: "Wed", count: 180, height: "36%", isActive: false },
  { label: "Thu", count: 340, height: "68%", isActive: false },
  { label: "Fri", count: 450, height: "90%", isActive: true },
  { label: "Sat", count: 300, height: "60%", isActive: false },
  { label: "Sun", count: 220, height: "44%", isActive: false }
];

const monthlyData = [
  { label: "Wk 1", count: 850, height: "60%", isActive: false },
  { label: "Wk 2", count: 1200, height: "85%", isActive: true },
  { label: "Wk 3", count: 950, height: "68%", isActive: false },
  { label: "Wk 4", count: 700, height: "50%", isActive: false }
];

const activities = [
  { text: "Dr. Sarah Jenkins admitted a new patient.", time: "10 mins ago", icon: UserPlus, bg: "bg-blue-50 text-[#2563EB] border-blue-100" },
  { text: "Lab results for Patient #8902 are ready.", time: "45 mins ago", icon: FlaskConical, bg: "bg-teal-50 text-[#0d9488] border-teal-100" },
  { text: "Appointment cancelled by Mark R.", time: "2 hours ago", icon: XCircle, bg: "bg-red-50 text-red-500 border-red-100" },
  { text: "System maintenance completed successfully.", time: "Yesterday, 11:30 PM", icon: CheckCircle2, bg: "bg-slate-50 text-slate-500 border-slate-200" }
];

const upcomingAppointments = [
  { patient: "Eleanor Pena", doctor: "Dr. Robert Fox", department: "Cardiology", time: "09:00 AM", status: "Confirmed", badge: "bg-blue-50 text-[#2563EB] border-blue-100" },
  { patient: "Wade Warren", doctor: "Dr. Esther Howard", department: "Neurology", time: "10:30 AM", status: "Waiting", badge: "bg-slate-100 text-slate-600 border-slate-200" },
  { patient: "Brooklyn Simmons", doctor: "Dr. Guy Hawkins", department: "Pediatrics", time: "11:15 AM", status: "Confirmed", badge: "bg-blue-50 text-[#2563EB] border-blue-100" }
];

const AdminHome = () => {
  const [chartTab, setChartTab] = useState("Week");
  const activeChartData = chartTab === "Week" ? weeklyData : monthlyData;

  return (
    <div className="space-y-6">
      
      {/* 5 Stats Cards Grid */}
      <div className="grid grid-cols-5 gap-4 md:gap-5 lg:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className="bg-white/60 border border-white/45 rounded-[24px] p-5 lg:p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md flex flex-col justify-between aspect-square"
            >
              {/* Top Row: Label & Icon */}
              <div className="flex items-start justify-between gap-2">
                <span className="text-[9px] sm:text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider leading-tight">
                  {stat.label}
                </span>
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center border shrink-0 ${stat.colorClass}`}>
                  <Icon size={16} />
                </div>
              </div>

              {/* Bottom Row: Value & Trend */}
              <div className="mt-auto">
                <span className="text-base sm:text-lg md:text-xl lg:text-3xl font-black text-slate-800 block leading-none">
                  {stat.value}
                </span>
                <span className={`text-[8px] sm:text-[9px] md:text-xs mt-2.5 block font-extrabold leading-none ${
                  stat.isWarning ? "text-[#EA4335]" : "text-slate-400"
                }`}>
                  {stat.subtext}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Grid: Chart + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Appointment Trends (Left Card) */}
        <div className="lg:col-span-2 bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md flex flex-col justify-between">
          
          <div className="flex items-center justify-between border-b border-slate-200/50 pb-4">
            <h3 className="font-extrabold text-slate-800 text-sm md:text-base flex items-center gap-2">
              <TrendingUp size={18} className="text-[#0d9488]" />
              Appointment Trends
            </h3>

            {/* Toggle tabs */}
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {["Week", "Month"].map(t => (
                <button
                  key={t}
                  onClick={() => setChartTab(t)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-md transition cursor-pointer ${
                    chartTab === t 
                      ? "bg-white text-slate-900 shadow-sm" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Bar Columns Container */}
          <div className="mt-8 flex items-end justify-between h-64 border-b border-slate-200/80 pb-2 relative z-0">
            {/* Background grid guide lines */}
            <div className="absolute inset-x-0 top-0 bottom-0 border-b border-dashed border-slate-200/40 pointer-events-none -z-10" style={{ top: "25%" }} />
            <div className="absolute inset-x-0 top-0 bottom-0 border-b border-dashed border-slate-200/40 pointer-events-none -z-10" style={{ top: "50%" }} />
            <div className="absolute inset-x-0 top-0 bottom-0 border-b border-dashed border-slate-200/40 pointer-events-none -z-10" style={{ top: "75%" }} />

            {activeChartData && activeChartData.length > 0 ? (
              activeChartData.map((data, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group">
                  
                  {/* Count tooltip on hover */}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-800 text-white font-bold text-[9px] px-2 py-0.5 rounded absolute -translate-y-[260px] pointer-events-none shadow-sm">
                    {data.count} Bookings
                  </span>

                  {/* Column Graphic */}
                  <div 
                    className={`w-[45%] rounded-t-lg transition-all duration-500 cursor-pointer ${
                      data.isActive 
                        ? "bg-[#0d9488] shadow-md shadow-[#0d9488]/20" 
                        : "bg-[#0d9488]/40 hover:bg-[#0d9488]/60"
                    }`} 
                    style={{ height: data.height || "0%" }}
                  />

                  {/* Day label */}
                  <span className="text-[10px] md:text-xs font-bold text-slate-400 mt-2">{data.label || ""}</span>

                </div>
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 text-xs py-10">
                No data available
              </div>
            )}
          </div>

        </div>

        {/* Recent Activity (Right Card) */}
        <div className="lg:col-span-1 bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md flex flex-col justify-between">
          
          <div className="flex items-center justify-between border-b border-slate-200/50 pb-4">
            <h3 className="font-extrabold text-slate-800 text-sm md:text-base flex items-center gap-2">
              <Activity size={18} className="text-[#2563EB]" />
              Recent Activity
            </h3>
            <button className="text-[10px] font-extrabold text-[#2563EB] hover:text-[#0D9488] hover:underline bg-transparent border-none cursor-pointer">
              View All
            </button>
          </div>

          <div className="mt-4 flex-1 space-y-4">
            {activities.map((act, idx) => {
              const Icon = act.icon;
              return (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${act.bg}`}>
                    <Icon size={14} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                      {act.text.split("Patient #8902").map((part, i) => (
                        <span key={i}>
                          {part}
                          {i === 0 && act.text.includes("Patient #8902") && (
                            <strong className="text-slate-900 font-bold">Patient #8902</strong>
                          )}
                        </span>
                      ))}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block font-medium">{act.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Bottom Card: Upcoming Appointments Table */}
      <div className="bg-white/60 border border-white/45 rounded-3xl shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md flex flex-col overflow-hidden">
        
        <div className="flex items-center justify-between border-b border-slate-200/50 p-6">
          <h3 className="font-extrabold text-slate-800 text-sm md:text-base">Upcoming Appointments</h3>
          <button className="text-xs font-extrabold text-[#2563EB] hover:text-[#0D9488] hover:underline bg-transparent border-none cursor-pointer">
            Manage Schedule
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead>
              <tr className="bg-slate-100/40 text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100/30">
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Doctor</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.map((app, idx) => (
                <tr key={idx} className="border-b border-slate-100/40 hover:bg-slate-50/30 transition last:border-b-0">
                  <td className="px-6 py-5 whitespace-nowrap text-xs md:text-sm font-extrabold text-slate-800">{app.patient}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs md:text-sm text-slate-700 font-bold">{app.doctor}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs md:text-sm text-slate-500 font-semibold">{app.department}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs md:text-sm text-slate-500 font-medium">{app.time}</td>
                  <td className="px-6 py-5 text-center whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-1 text-[10px] md:text-xs font-bold rounded-lg border ${app.badge}`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Footer Links & Copyright */}
      <footer className="border-t border-slate-200/50 pt-6 pb-2 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 flex-wrap">
          <span className="font-extrabold text-[#2563EB] tracking-tight mr-2 text-sm">SmartHealth</span>
          <a href="#" className="hover:text-[#0D9488] transition">Privacy Policy</a>
          <a href="#" className="hover:text-[#0D9488] transition">Terms of Service</a>
          <a href="#" className="hover:text-[#0D9488] transition">Contact Support</a>
          <a href="#" className="hover:text-[#0D9488] transition flex items-center gap-1">
            <ShieldCheck size={13} />
            HIPAA Compliance
          </a>
        </div>
        <div className="text-xs text-slate-400 font-medium">
          &copy; 2026 SmartHealth Systems. All rights reserved.
        </div>
      </footer>

    </div>
  );
};

export default AdminHome;

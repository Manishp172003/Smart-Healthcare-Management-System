import { Activity, Server, Cpu, Database } from "lucide-react";

const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      
      {/* Metrics columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* API response */}
        <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>API SERVER LOAD</span>
            <Server size={16} className="text-[#0D9488]" />
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-800 leading-none">12 ms</h4>
            <p className="text-[10px] md:text-xs text-slate-400 font-semibold mt-2">Average response latency</p>
          </div>
        </div>

        {/* CPU */}
        <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>CPU AVAILABILITY</span>
            <Cpu size={16} className="text-[#2563EB]" />
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-800 leading-none">4.8 %</h4>
            <p className="text-[10px] md:text-xs text-emerald-500 font-semibold mt-2">Optimal cluster performance</p>
          </div>
        </div>

        {/* Database */}
        <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>DATABASE INTEGRITY</span>
            <Database size={16} className="text-emerald-500" />
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-800 leading-none">99.999%</h4>
            <p className="text-[10px] md:text-xs text-slate-400 font-semibold mt-2">Sync node compliance match</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminAnalytics;

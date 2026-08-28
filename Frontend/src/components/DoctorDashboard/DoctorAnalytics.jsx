import { BarChart3, TrendingUp, Star, Award, HeartHandshake } from "lucide-react";

const DoctorAnalytics = () => {
  return (
    <div className="space-y-6">
      
      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Rating Card */}
        <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider block">Patient Rating</span>
            <div className="w-8 h-8 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center border border-yellow-100">
              <Star size={16} fill="currentColor" />
            </div>
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-800 leading-none">4.92 / 5</h4>
            <p className="text-[10px] md:text-xs text-slate-400 font-semibold mt-2">Based on 142 patient feedback reviews</p>
          </div>
        </div>

        {/* Completion Card */}
        <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider block">Completed Consults</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0d9488] flex items-center justify-center border border-emerald-100">
              <Award size={16} />
            </div>
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-800 leading-none">98.4%</h4>
            <p className="text-[10px] md:text-xs text-emerald-500 font-semibold mt-2">+1.2% improvement from last month</p>
          </div>
        </div>

        {/* Retention Card */}
        <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider block">Patient Retention</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-100">
              <HeartHandshake size={16} />
            </div>
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-800 leading-none">89%</h4>
            <p className="text-[10px] md:text-xs text-slate-400 font-semibold mt-2">Average follow-up scheduling rate</p>
          </div>
        </div>

      </div>

      {/* Visual Analytics Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Consultations Trend bar representation */}
        <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md space-y-5">
          <h4 className="text-sm md:text-base font-extrabold text-slate-800 flex items-center gap-2">
            <TrendingUp size={18} className="text-[#0d9488]" />
            Monthly Consultation Hours
          </h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                <span>Cardiology Follow-ups</span>
                <span>48 hrs (60%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div className="bg-[#0D9488] h-2.5 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                <span>Annual Physical Diagnostics</span>
                <span>24 hrs (30%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div className="bg-[#2563EB] h-2.5 rounded-full" style={{ width: "30%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                <span>Telehealth Medication Reviews</span>
                <span>8 hrs (10%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div className="bg-amber-400 h-2.5 rounded-full" style={{ width: "10%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Metrics Details */}
        <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md space-y-4">
          <h4 className="text-sm md:text-base font-extrabold text-slate-800 flex items-center gap-2">
            <BarChart3 size={18} className="text-[#2563EB]" />
            Consultation Analytics Summary
          </h4>

          <div className="grid grid-cols-2 gap-4 text-center py-2">
            
            <div className="p-4 bg-slate-50/40 border border-white/30 rounded-2xl">
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider block">Average Consult</span>
              <span className="text-xl font-black text-slate-800 mt-1 block">22 Mins</span>
            </div>

            <div className="p-4 bg-slate-50/40 border border-white/30 rounded-2xl">
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider block">No-Show Rate</span>
              <span className="text-xl font-black text-slate-800 mt-1 block">1.8%</span>
            </div>

            <div className="p-4 bg-slate-50/40 border border-white/30 rounded-2xl">
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider block">First-Visit Ratio</span>
              <span className="text-xl font-black text-slate-800 mt-1 block">34%</span>
            </div>

            <div className="p-4 bg-slate-50/40 border border-white/30 rounded-2xl">
              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider block">Electronic Signatures</span>
              <span className="text-xl font-black text-slate-800 mt-1 block">100% Secure</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default DoctorAnalytics;

import { useState, useEffect } from "react";
import {
  Activity,
  Heart,
  Droplets,
  Wind,
  Scale,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles
} from "lucide-react";

const DEFAULT_VITALS = {
  heartRate: 72,
  bpSystolic: 120,
  bpDiastolic: 80,
  spo2: 99,
  glucose: 98,
  weight: 68.5,
  height: 175,
  lastUpdated: "Today, 09:30 AM"
};

export default function HealthVitals() {
  const [vitals, setVitals] = useState(() => {
    const saved = localStorage.getItem("smarthealth_patient_vitals");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_VITALS;
      }
    }
    return DEFAULT_VITALS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...vitals });

  // Calculate BMI: weight (kg) / (height(m))^2
  const heightInMeters = (vitals.height || 175) / 100;
  const bmi = (vitals.weight / (heightInMeters * heightInMeters)).toFixed(1);

  const getBmiCategory = (val) => {
    const num = parseFloat(val);
    if (num < 18.5) return { text: "Underweight", color: "text-amber-500 bg-amber-50" };
    if (num < 25) return { text: "Normal / Healthy", color: "text-emerald-600 bg-emerald-50" };
    if (num < 30) return { text: "Overweight", color: "text-amber-600 bg-amber-50" };
    return { text: "Obese", color: "text-rose-600 bg-rose-50" };
  };

  const bmiStatus = getBmiCategory(bmi);

  const handleSaveVitals = (e) => {
    e.preventDefault();
    const updated = {
      ...formData,
      lastUpdated: "Just now"
    };
    setVitals(updated);
    localStorage.setItem("smarthealth_patient_vitals", JSON.stringify(updated));
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white/70 border border-white/60 rounded-3xl p-6 shadow-sm backdrop-blur-md space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Activity size={18} />
            </div>
            <h3 className="font-extrabold text-slate-800 text-base">Health Vitals & Biometrics</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
            <Clock size={12} />
            <span>Last recorded: <strong>{vitals.lastUpdated}</strong></span>
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({ ...vitals });
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Log New Vitals</span>
        </button>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        
        {/* 1. Heart Rate */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50/70 to-pink-50/40 border border-rose-100/80 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Heart size={16} />
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
              Normal
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Heart Rate</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-slate-900">{vitals.heartRate}</span>
              <span className="text-xs font-bold text-slate-400">bpm</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Resting pulse range: 60–100</span>
        </div>

        {/* 2. Blood Pressure */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/40 border border-blue-100/80 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Activity size={16} />
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
              Optimal
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Blood Pressure</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-slate-900">{vitals.bpSystolic}/{vitals.bpDiastolic}</span>
              <span className="text-xs font-bold text-slate-400">mmHg</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Systolic / Diastolic</span>
        </div>

        {/* 3. SpO2 Oxygen */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-50/70 to-emerald-50/40 border border-teal-100/80 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
              <Wind size={16} />
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
              95%+ Good
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Oxygen (SpO2)</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-slate-900">{vitals.spo2}</span>
              <span className="text-xs font-bold text-slate-400">%</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Blood oxygenation level</span>
        </div>

        {/* 4. Blood Glucose */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/70 to-orange-50/40 border border-amber-100/80 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Droplets size={16} />
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
              Fasting OK
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Blood Glucose</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-slate-900">{vitals.glucose}</span>
              <span className="text-xs font-bold text-slate-400">mg/dL</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Target fasting: 70–99</span>
        </div>

        {/* 5. Weight & BMI */}
        <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-gradient-to-br from-purple-50/70 to-indigo-50/40 border border-purple-100/80 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Scale size={16} />
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${bmiStatus.color}`}>
              BMI {bmi}
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 block">Body Weight</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-slate-900">{vitals.weight}</span>
              <span className="text-xs font-bold text-slate-400">kg</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">{bmiStatus.text}</span>
        </div>

      </div>

      {/* Log Vitals Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-blue-600 to-teal-600 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-white">
                  <Activity size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">Record Patient Vitals</h4>
                  <p className="text-[11px] text-blue-100">Update your clinical metrics for this session</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveVitals} className="flex-1 flex flex-col overflow-hidden">
              
              {/* Scrollable Form Body */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Heart Rate (bpm)</label>
                    <input
                      type="number"
                      min="40"
                      max="200"
                      required
                      value={formData.heartRate}
                      onChange={(e) => setFormData({ ...formData, heartRate: parseInt(e.target.value, 10) || 0 })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">SpO2 Oxygen (%)</label>
                    <input
                      type="number"
                      min="70"
                      max="100"
                      required
                      value={formData.spo2}
                      onChange={(e) => setFormData({ ...formData, spo2: parseInt(e.target.value, 10) || 0 })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Systolic BP (mmHg)</label>
                    <input
                      type="number"
                      min="70"
                      max="220"
                      required
                      value={formData.bpSystolic}
                      onChange={(e) => setFormData({ ...formData, bpSystolic: parseInt(e.target.value, 10) || 0 })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Diastolic BP (mmHg)</label>
                    <input
                      type="number"
                      min="40"
                      max="140"
                      required
                      value={formData.bpDiastolic}
                      onChange={(e) => setFormData({ ...formData, bpDiastolic: parseInt(e.target.value, 10) || 0 })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Blood Sugar (mg/dL)</label>
                    <input
                      type="number"
                      min="40"
                      max="400"
                      required
                      value={formData.glucose}
                      onChange={(e) => setFormData({ ...formData, glucose: parseInt(e.target.value, 10) || 0 })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="20"
                      max="250"
                      required
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition"
                    />
                  </div>
                </div>

              </div>

              {/* Sticky Solid Bottom Action Bar */}
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-200 transition cursor-pointer shadow-xs text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold shadow-md hover:shadow-lg transition cursor-pointer text-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 size={15} />
                  <span>Save & Update Vitals</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

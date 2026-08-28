import { useState } from "react";
import { Search, UserCheck, Eye, Plus } from "lucide-react";

const patientList = [
  { id: "PT-8472", name: "Elena Silva", age: 34, gender: "Female", lastVisit: "Oct 24, 2026", condition: "Heart Arrhythmia" },
  { id: "PT-1129", name: "Marcus Johnson", age: 45, gender: "Male", lastVisit: "Oct 22, 2026", condition: "Hypertension" },
  { id: "PT-9031", name: "Arthur Pendelton", age: 67, gender: "Male", lastVisit: "Oct 20, 2026", condition: "Coronary Disease" },
  { id: "PT-4481", name: "Samantha Cross", age: 29, gender: "Female", lastVisit: "Oct 15, 2026", condition: "Post-op Recovery" },
  { id: "PT-3091", name: "Robert Vance", age: 52, gender: "Male", lastVisit: "Sep 28, 2026", condition: "Diabetic Checkup" }
];

const DoctorPatients = () => {
  const [search, setSearch] = useState("");

  const filteredPatients = patientList.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.condition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Search Header Bar */}
      <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search patients by name, ID or disease..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-white/40 bg-slate-50/40 rounded-xl py-2 pl-9 pr-3 text-xs md:text-sm text-[#162235] outline-none placeholder:text-slate-400 focus:border-[#2563EB]"
          />
        </div>

        <button 
          onClick={() => alert("Registration of new patient charts is managed by clinical reception.")}
          className="flex items-center justify-center gap-1.5 h-10 px-5 bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none text-white rounded-xl text-xs font-bold transition hover:shadow-md cursor-pointer"
        >
          <Plus size={15} />
          Register Patient
        </button>

      </div>

      {/* Patient Directory Card */}
      <div className="bg-white/60 border border-white/45 rounded-3xl shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="bg-slate-100/40 text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100/30">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Age / Gender</th>
                <th className="px-6 py-4">Clinical Condition</th>
                <th className="px-6 py-4">Last Consultation</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-slate-400 text-xs font-bold">No patients matching filters found.</td>
                </tr>
              ) : (
                filteredPatients.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100/40 hover:bg-slate-50/30 transition last:border-b-0">
                    <td className="px-6 py-5 whitespace-nowrap text-xs md:text-sm font-extrabold text-slate-800">{p.id}</td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                          {p.name.split(" ").map(n=>n[0]).join("")}
                        </div>
                        <span className="text-xs md:text-sm font-extrabold text-slate-800">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-xs md:text-sm text-slate-600 font-semibold">{p.age} yrs / {p.gender}</td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="inline-flex px-2 py-0.5 text-[10px] font-bold rounded bg-blue-50 text-blue-600 border border-blue-100">
                        {p.condition}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-xs md:text-sm text-slate-500 font-medium">{p.lastVisit}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <button 
                        onClick={() => alert(`Accessing medical history chart file for patient ${p.name}`)}
                        className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg text-[10px] font-bold bg-white/40 border border-white/20 hover:bg-white/60 transition cursor-pointer text-slate-700"
                      >
                        <Eye size={12} />
                        View Chart
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DoctorPatients;

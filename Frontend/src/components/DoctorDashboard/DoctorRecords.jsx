import { useState } from "react";
import { Search, FileText, UploadCloud, CheckSquare, Sparkles } from "lucide-react";

const recordArchive = [
  { id: "REC-9921", patientName: "Elena Silva", docType: "Lab Report", title: "Lipid Profile Panel", date: "Oct 24, 2026", status: "Signed" },
  { id: "REC-8842", patientName: "Marcus Johnson", docType: "Prescription", title: "Lisinopril 10mg Renewal", date: "Oct 22, 2026", status: "Pending Review" },
  { id: "REC-1102", patientName: "Arthur Pendelton", docType: "Diagnosis Notes", title: "Cardiology Consultation Summary", date: "Oct 20, 2026", status: "Signed" },
  { id: "REC-4091", patientName: "Samantha Cross", docType: "Lab Report", title: "Post-op ECG Diagnostic Chart", date: "Oct 15, 2026", status: "Signed" }
];

const DoctorRecords = () => {
  const [records, setRecords] = useState(recordArchive);
  const [search, setSearch] = useState("");
  const [newPrescription, setNewPrescription] = useState({ patient: "", medication: "", notes: "" });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      id: `REC-${Math.floor(Math.random() * 9000) + 1000}`,
      patientName: newPrescription.patient,
      docType: "Prescription",
      title: `${newPrescription.medication} Prescription`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Signed"
    };

    setRecords([newRecord, ...records]);
    setNewPrescription({ patient: "", medication: "", notes: "" });
    alert("Prescription has been signed and pushed to patient vault!");
  };

  const toggleSignRecord = (id) => {
    setRecords(records.map(rec => {
      if (rec.id === id) {
        return {
          ...rec,
          status: rec.status === "Signed" ? "Pending Review" : "Signed"
        };
      }
      return rec;
    }));
  };

  const filteredRecords = records.filter(r => 
    r.patientName.toLowerCase().includes(search.toLowerCase()) ||
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.docType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Form: Draft Prescription */}
        <div className="lg:col-span-1 bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md space-y-5">
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm md:text-base leading-none">Draft Prescription</h3>
            <p className="text-slate-400 text-xs mt-1.5 leading-snug">Sign and transmit medication prescriptions directly to the patient dashboard.</p>
          </div>

          <form onSubmit={handleUploadSubmit} className="space-y-4">
            
            {/* Patient Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider block">Select Patient</label>
              <select 
                required
                value={newPrescription.patient}
                onChange={(e) => setNewPrescription({ ...newPrescription, patient: e.target.value })}
                className="w-full border border-white/40 bg-slate-50/40 rounded-xl p-3 text-xs md:text-sm text-[#162235] outline-none"
              >
                <option value="">-- Choose Patient --</option>
                <option value="Elena Silva">Elena Silva (PT-8472)</option>
                <option value="Marcus Johnson">Marcus Johnson (PT-1129)</option>
                <option value="Arthur Pendelton">Arthur Pendelton (PT-9031)</option>
              </select>
            </div>

            {/* Prescription Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider block">Medication & Dosage</label>
              <input 
                type="text"
                required
                placeholder="e.g. Lisinopril 10mg (Once Daily)"
                value={newPrescription.medication}
                onChange={(e) => setNewPrescription({ ...newPrescription, medication: e.target.value })}
                className="w-full border border-white/40 bg-slate-50/40 rounded-xl p-3 text-xs outline-none transition focus:border-[#2563EB]"
              />
            </div>

            {/* Special Instructions */}
            <div className="space-y-1.5">
              <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider block">Special Instructions</label>
              <textarea 
                placeholder="Take in morning with food..."
                rows={3}
                value={newPrescription.notes}
                onChange={(e) => setNewPrescription({ ...newPrescription, notes: e.target.value })}
                className="w-full border border-white/40 bg-slate-50/40 rounded-xl p-3 text-xs outline-none transition focus:border-[#2563EB]"
              />
            </div>

            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-1.5 h-10 bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none text-white rounded-xl text-xs font-bold transition hover:shadow-md cursor-pointer"
            >
              <UploadCloud size={15} />
              Sign & Transmit
            </button>

          </form>
        </div>

        {/* Right Section: Records Table */}
        <div className="lg:col-span-2 bg-white/60 border border-white/45 rounded-3xl shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md flex flex-col overflow-hidden">
          
          {/* Controls Bar */}
          <div className="p-5 border-b border-slate-200/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h3 className="font-extrabold text-slate-800 text-sm md:text-base leading-none">Diagnostic Archives</h3>
            <div className="relative w-full md:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search archive..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-white/40 bg-slate-50/40 rounded-xl py-2 pl-9 pr-3 text-xs md:text-sm text-[#162235] outline-none placeholder:text-slate-400 focus:border-[#2563EB]"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[550px] text-left">
              <thead>
                <tr className="bg-slate-100/40 text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100/30">
                  <th className="px-6 py-4">Record ID</th>
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Title / Type</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((rec) => (
                  <tr key={rec.id} className="border-b border-slate-100/40 hover:bg-slate-50/30 transition last:border-b-0">
                    <td className="px-6 py-5 whitespace-nowrap text-xs md:text-sm font-extrabold text-slate-800">{rec.id}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-xs md:text-sm font-extrabold text-[#162235]">{rec.patientName}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-slate-400" />
                        <div>
                          <p className="text-xs md:text-sm font-extrabold text-slate-800">{rec.title}</p>
                          <p className="text-[9px] md:text-[10px] text-[#0d9488] font-bold mt-0.5 uppercase tracking-wide">{rec.docType} • {rec.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <button 
                        onClick={() => toggleSignRecord(rec.id)}
                        className={`inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                          rec.status === "Signed" 
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100/30" 
                            : "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100/30"
                        }`}
                      >
                        <CheckSquare size={12} />
                        {rec.status}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  );
};

export default DoctorRecords;

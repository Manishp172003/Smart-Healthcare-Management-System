import { useState, useEffect } from "react";
import { 
  FileText, 
  Download, 
  UploadCloud, 
  Search, 
  Eye, 
  FileUp,
  AlertCircle,
  X,
  Trash2,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Clock,
  Sparkles
} from "lucide-react";

const INITIAL_RECORDS = [
  { 
    id: 1, 
    date: "Sep 15, 2026", 
    name: "Complete Blood Count (CBC).pdf", 
    category: "Lab Reports", 
    provider: "LabCorp Diagnostics", 
    size: "2.4 MB",
    summary: "Hemoglobin: 14.2 g/dL (Normal), WBC: 6,800 /mcL (Normal), Platelets: 240,000 /mcL (Normal). Overall indices normal."
  },
  { 
    id: 2, 
    date: "Aug 02, 2026", 
    name: "Lipid Panel & Cholesterol Results.pdf", 
    category: "Lab Reports", 
    provider: "Metro Labs Ltd", 
    size: "1.8 MB",
    summary: "Total Cholesterol: 182 mg/dL (Desirable), HDL: 52 mg/dL, LDL: 104 mg/dL, Triglycerides: 130 mg/dL."
  },
  { 
    id: 3, 
    date: "Jul 10, 2026", 
    name: "Amoxicillin & Antihistamine Prescription.pdf", 
    category: "Prescriptions", 
    provider: "Dr. Ananya Sharma", 
    size: "820 KB",
    summary: "Rx: Amoxicillin 500mg (1 tablet twice daily for 5 days after food), Cetirizine 10mg (1 tablet at bedtime)."
  },
  { 
    id: 4, 
    date: "Jun 14, 2026", 
    name: "Covid-19 Booster Vaccination Certificate.pdf", 
    category: "Vaccinations", 
    provider: "City Vaccination Center", 
    size: "1.2 MB",
    summary: "Dose: Precautionary Booster (Covishield/AstraZeneca). Batch: AZ-98214. Fully vaccinated."
  }
];

const MedicalRecords = () => {
  const [activeCategory, setActiveCategory] = useState("Lab Reports");
  const [searchQuery, setSearchQuery] = useState("");
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("smarthealth_medical_records");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_RECORDS;
      }
    }
    return INITIAL_RECORDS;
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [viewingRecord, setViewingRecord] = useState(null);
  const [successToast, setSuccessToast] = useState("");

  const persistRecords = (updatedRecords) => {
    setRecords(updatedRecords);
    localStorage.setItem("smarthealth_medical_records", JSON.stringify(updatedRecords));
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (!uploadedFile) return;

    const newRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" }),
      name: uploadedFile.name,
      category: activeCategory,
      provider: "Patient Self-Upload",
      size: `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      summary: `Patient-uploaded digital health document verified on ${new Date().toLocaleDateString()}. Document integrity SHA-256 confirmed.`
    };

    const updated = [newRecord, ...records];
    persistRecords(updated);
    setUploadedFile(null);
    setSuccessToast(`"${newRecord.name}" successfully added to ${activeCategory}!`);
    setTimeout(() => setSuccessToast(""), 4000);
  };

  const handleDeleteRecord = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from your records vault?`)) {
      const updated = records.filter(r => r.id !== id);
      persistRecords(updated);
    }
  };

  const handleDownloadRecord = (rec) => {
    const element = document.createElement("a");
    const fileContent = `=======================================================
SMARTHEALTH MEDICAL CENTER - OFFICIAL HEALTH RECORD
=======================================================
Document Name: ${rec.name}
Category:      ${rec.category}
Date Issued:   ${rec.date}
Provider:      ${rec.provider}
Patient Name:  ${localStorage.getItem("name") || "Manish Pawar"}
EHR Ref ID:    EHR-2026-${rec.id}
Status:        Digitally Signed & Encrypted (256-Bit)

CLINICAL SUMMARY & FINDINGS:
-------------------------------------------------------
${rec.summary || "No automated clinical notes attached."}

=======================================================
SmartHealth Cloud EHR System • Confidential Medical Data
`;
    const file = new Blob([fileContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = rec.name.endsWith('.pdf') ? rec.name.replace('.pdf', '-Report.txt') : `${rec.name}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredRecords = records.filter(rec => 
    rec.category === activeCategory && 
    rec.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryCount = (categoryName) => {
    return records.filter(r => r.category === categoryName).length;
  };

  return (
    <div className="space-y-6">
      
      {/* Notification Toast */}
      {successToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-800 font-bold shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast("")} className="text-emerald-600 hover:text-emerald-800">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Upload Record Card */}
        <div className="lg:col-span-1 bg-white/70 border border-white/60 rounded-3xl p-6 shadow-sm backdrop-blur-md space-y-5">
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm md:text-base leading-none">Upload New Record</h3>
            <p className="text-slate-400 text-xs mt-1.5 leading-snug">Store health documents safely in your digital vault.</p>
          </div>

          <form onSubmit={handleFileUpload} className="space-y-4">
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-6 text-center transition flex flex-col items-center justify-center relative cursor-pointer group bg-slate-50/40">
              <input 
                type="file" 
                required
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                onChange={(e) => setUploadedFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <FileUp className="text-slate-400 group-hover:text-blue-600 w-8 h-8 mb-2 transition" />
              {uploadedFile ? (
                <div>
                  <p className="text-slate-800 text-xs font-bold truncate max-w-[200px]">{uploadedFile.name}</p>
                  <p className="text-blue-600 text-[11px] font-semibold mt-1">{(uploadedFile.size / 1024).toFixed(0)} KB • Ready to upload</p>
                </div>
              ) : (
                <div>
                  <span className="text-slate-700 text-xs font-bold block">Choose file to upload</span>
                  <span className="text-slate-400 text-[10px] block mt-1">PDF, PNG or JPG up to 10MB</span>
                </div>
              )}
            </div>

            {/* Select Folder */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Target Folder</label>
              <select 
                value={activeCategory} 
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 rounded-xl p-2.5 text-xs text-slate-800 font-semibold outline-none transition focus:border-blue-500 focus:bg-white"
              >
                <option value="Lab Reports">Lab Reports ({getCategoryCount("Lab Reports")})</option>
                <option value="Prescriptions">Prescriptions ({getCategoryCount("Prescriptions")})</option>
                <option value="Vaccinations">Vaccinations ({getCategoryCount("Vaccinations")})</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-2 h-11 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 border-none text-white rounded-xl text-xs font-bold transition shadow-md cursor-pointer"
            >
              <UploadCloud size={16} />
              <span>Upload to Vault</span>
            </button>

          </form>

          {/* Security Badge */}
          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center gap-2.5 text-[11px] text-blue-900">
            <ShieldCheck size={16} className="text-blue-600 shrink-0" />
            <span>Encrypted with 256-Bit AES encryption. Compliant with HIPAA privacy rules.</span>
          </div>

        </div>

        {/* Right Side: Records Table */}
        <div className="lg:col-span-2 bg-white/70 border border-white/60 rounded-3xl shadow-sm backdrop-blur-md flex flex-col overflow-hidden">
          
          {/* Controls Bar */}
          <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            {/* Tabs Selector with Live Counters */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {["Lab Reports", "Prescriptions", "Vaccinations"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === cat 
                      ? "bg-white text-slate-900 shadow-xs" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat ? 'bg-blue-100 text-blue-700 font-black' : 'bg-slate-200/70 text-slate-500'
                  }`}>
                    {getCategoryCount(cat)}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-800 font-semibold outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
              />
            </div>

          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {filteredRecords.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center p-6">
                <AlertCircle className="text-slate-300 w-10 h-10 mb-2" />
                <h4 className="text-slate-700 font-extrabold text-sm">No documents found in {activeCategory}</h4>
                <p className="text-slate-400 text-xs mt-1">Upload a PDF or prescription using the form on the left.</p>
              </div>
            ) : (
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] md:text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    <th className="px-6 py-3.5 font-bold">Document Name</th>
                    <th className="px-6 py-3.5 font-bold">Upload Date</th>
                    <th className="px-6 py-3.5 font-bold">Provider / Lab</th>
                    <th className="px-6 py-3.5 font-bold">Size</th>
                    <th className="px-6 py-3.5 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.map(rec => (
                    <tr key={rec.id} className="hover:bg-blue-50/20 transition">
                      <td className="px-6 py-4 flex items-center gap-2.5 text-xs md:text-sm font-bold text-slate-800">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <FileText size={16} />
                        </div>
                        <span className="truncate max-w-[200px]">{rec.name}</span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">{rec.date}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-700">{rec.provider}</td>
                      <td className="px-6 py-4 text-xs text-slate-400 font-bold">{rec.size}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button 
                            onClick={() => setViewingRecord(rec)}
                            title="Preview Document"
                            className="p-2 bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 rounded-xl transition cursor-pointer"
                          >
                            <Eye size={14} />
                          </button>
                          <button 
                            onClick={() => handleDownloadRecord(rec)}
                            title="Download File"
                            className="p-2 bg-slate-100 hover:bg-teal-100 text-slate-600 hover:text-teal-700 rounded-xl transition cursor-pointer"
                          >
                            <Download size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteRecord(rec.id, rec.name)}
                            title="Delete Record"
                            className="p-2 bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 rounded-xl transition cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>

      </div>

      {/* Document Preview Modal */}
      {viewingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-slate-900 to-blue-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 text-teal-300 flex items-center justify-center">
                  <FileText size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm truncate max-w-xs">{viewingRecord.name}</h4>
                  <span className="text-[10px] text-slate-400">Category: {viewingRecord.category} • {viewingRecord.date}</span>
                </div>
              </div>
              <button
                onClick={() => setViewingRecord(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Document Content View */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Issued By</span>
                  <span className="font-bold text-slate-800 text-sm">{viewingRecord.provider}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Verification</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs">
                    <CheckCircle2 size={12} />
                    <span>Digitally Verified</span>
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-200/80 space-y-3">
                <h5 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                  <Sparkles size={13} className="text-blue-600" />
                  <span>Clinical Summary & Diagnostic Findings</span>
                </h5>
                <p className="text-slate-700 leading-relaxed font-mono bg-white p-3.5 rounded-xl border border-slate-200 text-[11px]">
                  {viewingRecord.summary}
                </p>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-normal flex items-start gap-2">
                <AlertCircle size={15} className="text-amber-700 shrink-0 mt-0.5" />
                <span>This medical document is protected under patient confidentiality regulations. For formal legal or surgical clearances, request an original stamped copy from the diagnostic center.</span>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <Printer size={14} />
                <span>Print Document</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadRecord(viewingRecord)}
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download File</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MedicalRecords;

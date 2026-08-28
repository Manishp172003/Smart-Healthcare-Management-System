import { useState } from "react";
import { 
  FileText, 
  Download, 
  UploadCloud, 
  Search, 
  Eye, 
  Plus, 
  FileUp,
  AlertCircle
} from "lucide-react";

const initialRecords = [
  { id: 1, date: "Sep 15, 2026", name: "Complete Blood Count.pdf", category: "Lab Reports", provider: "LabCorp Diagnostics", size: "2.4 MB" },
  { id: 2, date: "Aug 02, 2026", name: "Lipid Panel Results.pdf", category: "Lab Reports", provider: "Metro Labs Ltd", size: "1.8 MB" },
  { id: 3, date: "Jul 10, 2026", name: "Amoxicillin Prescription.pdf", category: "Prescriptions", provider: "Dr. Emily Chen", size: "820 KB" },
  { id: 4, date: "Jun 14, 2026", name: "Covid-19 Vaccination Certificate.pdf", category: "Vaccinations", provider: "City Vaccination Center", size: "1.2 MB" }
];

const MedicalRecords = () => {
  const [activeCategory, setActiveCategory] = useState("Lab Reports");
  const [searchQuery, setSearchQuery] = useState("");
  const [records, setRecords] = useState(initialRecords);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (!uploadedFile) return;

    const newRecord = {
      id: records.length + 1,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" }),
      name: uploadedFile.name,
      category: activeCategory,
      provider: "Patient Self-Upload",
      size: `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB`
    };

    setRecords([newRecord, ...records]);
    setUploadedFile(null);
    alert("Record uploaded successfully!");
  };

  const filteredRecords = records.filter(rec => 
    rec.category === activeCategory && 
    rec.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Side: Upload Record Card */}
        <div className="lg:col-span-1 bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_4px_20px_rgba(15,23,42,0.02)] space-y-5">
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm md:text-base leading-none">Upload New Record</h3>
            <p className="text-slate-400 text-xs mt-1.5 leading-snug">Store health documents safely in your digital vault.</p>
          </div>

          <form onSubmit={handleFileUpload} className="space-y-4">
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-slate-200 hover:border-[#2563EB] rounded-2xl p-6 text-center transition flex flex-col items-center justify-center relative cursor-pointer group bg-slate-50/50">
              <input 
                type="file" 
                required
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => setUploadedFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <FileUp className="text-slate-400 group-hover:text-[#2563EB] w-8 h-8 mb-2 transition" />
              {uploadedFile ? (
                <div>
                  <p className="text-slate-700 text-xs font-bold truncate max-w-[180px]">{uploadedFile.name}</p>
                  <p className="text-slate-400 text-[10px] mt-1">{(uploadedFile.size / 1024).toFixed(0)} KB</p>
                </div>
              ) : (
                <div>
                  <span className="text-slate-600 text-xs font-bold block">Choose file to upload</span>
                  <span className="text-slate-400 text-[10px] block mt-1">PDF, PNG or JPG up to 10MB</span>
                </div>
              )}
            </div>

            {/* Select Folder */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Target Folder</label>
              <select 
                value={activeCategory} 
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 rounded-xl p-2.5 text-xs md:text-sm text-[#162235] outline-none"
              >
                <option value="Lab Reports">Lab Reports</option>
                <option value="Prescriptions">Prescriptions</option>
                <option value="Vaccinations">Vaccinations</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-1.5 h-10 bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none text-white rounded-xl text-xs font-bold transition hover:shadow-md cursor-pointer"
            >
              <UploadCloud size={15} />
              Upload Document
            </button>

          </form>
        </div>

        {/* Right Side: Records Table */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl shadow-[0_4px_20px_rgba(15,23,42,0.02)] flex flex-col overflow-hidden">
          
          {/* Controls Bar */}
          <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            {/* Tabs Selector */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {["Lab Reports", "Prescriptions", "Vaccinations"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-[11px] md:text-xs font-bold rounded-lg transition cursor-pointer ${
                    activeCategory === cat 
                      ? "bg-white text-slate-900 shadow-sm" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 rounded-xl py-2 pl-9 pr-3 text-xs md:text-sm text-[#162235] outline-none placeholder:text-slate-400 focus:border-[#2563EB]"
              />
            </div>

          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {filteredRecords.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center p-6">
                <AlertCircle className="text-slate-300 w-10 h-10 mb-2" />
                <h4 className="text-slate-700 font-extrabold text-sm">No documents found</h4>
                <p className="text-slate-400 text-xs mt-1">Try uploading a document or changing the search query.</p>
              </div>
            ) : (
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] md:text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    <th className="px-6 py-3.5 font-bold">Document Name</th>
                    <th className="px-6 py-3.5 font-bold">Upload Date</th>
                    <th className="px-6 py-3.5 font-bold">Provider</th>
                    <th className="px-6 py-3.5 font-bold">File Size</th>
                    <th className="px-6 py-3.5 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map(rec => (
                    <tr key={rec.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4 flex items-center gap-2.5 text-xs md:text-sm font-bold text-slate-800">
                        <FileText size={16} className="text-[#2563EB]" />
                        {rec.name}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">{rec.date}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-700">{rec.provider}</td>
                      <td className="px-6 py-4 text-xs text-slate-400 font-bold">{rec.size}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-1.5 bg-slate-50 hover:bg-[#2563EB]/8 text-slate-400 hover:text-[#2563EB] rounded-lg transition cursor-pointer">
                            <Eye size={14} />
                          </button>
                          <button className="p-1.5 bg-slate-50 hover:bg-[#0D9488]/8 text-slate-400 hover:text-[#0D9488] rounded-lg transition cursor-pointer">
                            <Download size={14} />
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

    </div>
  );
};

export default MedicalRecords;

import { useState } from "react";
import { Search, ShieldAlert, Key, Ban } from "lucide-react";

const mockPatients = [
  { id: "PT-8472", name: "Elena Silva", email: "elena.silva@email.com", role: "Patient", status: "Active" },
  { id: "DOC-342", name: "Dr. Robert Fox", email: "robert.fox@smarthealth.com", role: "Doctor (Cardiology)", status: "Active" },
  { id: "PT-1129", name: "Marcus Johnson", email: "marcus.j@email.com", role: "Patient", status: "Suspended" },
  { id: "ADM-002", name: "Admin Sarah", email: "sarah.admin@smarthealth.com", role: "System Admin", status: "Active" }
];

const AdminPatients = () => {
  const [search, setSearch] = useState("");

  const filtered = mockPatients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    p.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Controls */}
      <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search accounts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-white/40 bg-slate-50/40 rounded-xl py-2 pl-9 pr-3 text-xs md:text-sm text-[#162235] outline-none placeholder:text-slate-400 focus:border-[#2563EB]"
          />
        </div>
        <div className="text-xs font-bold text-slate-400">Total Audit: {mockPatients.length} Active System Accounts</div>
      </div>

      {/* Table Card */}
      <div className="bg-white/60 border border-white/45 rounded-3xl shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead>
              <tr className="bg-slate-100/40 text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100/30">
                <th className="px-6 py-4">Account ID</th>
                <th className="px-6 py-4">Full Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">System Role</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(acc => (
                <tr key={acc.id} className="border-b border-slate-100/40 hover:bg-slate-50/30 transition last:border-b-0">
                  <td className="px-6 py-5 whitespace-nowrap text-xs md:text-sm font-extrabold text-slate-800">{acc.id}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs md:text-sm font-extrabold text-[#162235]">{acc.name}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs md:text-sm text-slate-500 font-semibold">{acc.email}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs md:text-sm text-slate-500 font-medium">{acc.role}</td>
                  <td className="px-6 py-5 text-center whitespace-nowrap">
                    <span className={`inline-flex px-2 py-0.5 text-[10px] font-bold rounded border ${
                      acc.status === "Active" 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                        : "bg-red-50 text-red-500 border-red-100"
                    }`}>
                      {acc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminPatients;

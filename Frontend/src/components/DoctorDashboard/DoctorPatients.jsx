import { useState } from "react";
import { Search, UserCheck, Eye, Phone, Mail, Calendar, Activity } from "lucide-react";

const DoctorPatients = ({ appointments = [], loading = false }) => {
  const [search, setSearch] = useState("");

  // Extract unique patients from appointments
  const patientsMap = new Map();
  appointments.forEach((app) => {
    if (app.patient && !patientsMap.has(app.patient.id)) {
      patientsMap.set(app.patient.id, {
        id: `PT-${app.patient.id}`,
        name: app.patient.user?.name || "Patient",
        email: app.patient.user?.email || "patient@healthcare.com",
        phone: app.patient.phone || "+91 98765 43210",
        lastVisit: app.appointmentDate || "Recent",
        condition: app.reason || "General Checkup",
        status: app.status
      });
    }
  });

  const patientList = Array.from(patientsMap.values());

  // Fallback demo patients if no live appointments yet
  const displayList = patientList.length > 0 ? patientList : [
    { id: "PT-8472", name: "Elena Silva", email: "elena.silva@example.com", phone: "+91 98234 11223", lastVisit: "Oct 24, 2026", condition: "Cardiology follow up", status: "COMPLETED" },
    { id: "PT-1129", name: "Marcus Johnson", email: "marcus.j@example.com", phone: "+91 97123 44556", lastVisit: "Oct 22, 2026", condition: "Hypertension evaluation", status: "CONFIRMED" },
    { id: "PT-9031", name: "Arthur Pendelton", email: "arthur.p@example.com", phone: "+91 96321 88990", lastVisit: "Oct 20, 2026", condition: "ECG Consultation", status: "CONFIRMED" }
  ];

  const filteredPatients = displayList.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.condition.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Search Header Bar */}
      <div className="bg-white/70 border border-white/60 rounded-3xl p-5 sm:p-6 shadow-sm backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search patients by name, ID or disease..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-slate-200 bg-slate-50/60 rounded-xl py-2 pl-9 pr-3 text-xs md:text-sm text-[#162235] outline-none placeholder:text-slate-400 focus:border-[#2563EB]"
          />
        </div>

        <div className="text-xs text-slate-500 font-semibold">
          Showing <strong className="text-slate-900">{filteredPatients.length}</strong> registered patient{filteredPatients.length === 1 ? '' : 's'}
        </div>

      </div>

      {/* Patient Directory Card */}
      <div className="bg-white/70 border border-white/60 rounded-3xl shadow-sm backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="bg-slate-50/70 text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <th className="px-6 py-4">Patient ID</th>
                <th className="px-6 py-4">Patient Profile</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Primary Concern</th>
                <th className="px-6 py-4">Last Consultation</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-10 text-slate-400 text-xs font-bold">
                    No patients matching the search criteria found.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p) => {
                  const initials = p.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/40 transition">
                      
                      {/* ID */}
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-extrabold text-blue-600">
                        {p.id}
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                            {initials}
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-extrabold text-slate-900">{p.name}</p>
                            <span className="text-[10px] text-slate-400 font-semibold">Registered Patient</span>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-0.5">
                          <p className="text-xs text-slate-700 font-medium flex items-center gap-1.5">
                            <Mail size={12} className="text-slate-400" />
                            <span>{p.email}</span>
                          </p>
                          <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                            <Phone size={11} />
                            <span>{p.phone}</span>
                          </p>
                        </div>
                      </td>

                      {/* Concern */}
                      <td className="px-6 py-4 text-xs font-medium text-slate-700 max-w-xs truncate">
                        {p.condition}
                      </td>

                      {/* Last Visit */}
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-slate-400" />
                          <span>{p.lastVisit}</span>
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-1 text-[10px] font-bold rounded-lg border ${
                          p.status === "CONFIRMED" 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                            : p.status === "PENDING"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        }`}>
                          {p.status || "Active"}
                        </span>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DoctorPatients;

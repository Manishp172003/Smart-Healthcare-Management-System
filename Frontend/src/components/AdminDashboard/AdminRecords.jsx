import { ShieldCheck, FileSpreadsheet, Lock } from "lucide-react";

const mockLogs = [
  { id: "LOG-4091", event: "Patient Health File Accessed", node: "Clinical Node 1", ip: "192.168.1.14", status: "Secure Audit Trail" },
  { id: "LOG-3091", event: "Admin Portal Authentication", node: "IT Subnet B", ip: "10.0.4.88", status: "2FA Verified" },
  { id: "LOG-2091", event: "Patient Prescription Signed", node: "Prescription Server", ip: "192.168.1.25", status: "Encrypted Signature Match" }
];

const AdminRecords = () => {
  return (
    <div className="space-y-6">
      
      {/* Vault Header */}
      <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-800 text-sm md:text-base flex items-center gap-2">
            <Lock size={18} className="text-[#2563EB]" />
            Security & HIPAA Access Logs
          </h3>
          <p className="text-slate-400 text-xs mt-1.5 leading-snug">Tamper-proof diagnostic access audit logs trail.</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] border border-blue-100">
          <FileSpreadsheet size={18} />
        </div>
      </div>

      {/* Table list */}
      <div className="bg-white/60 border border-white/45 rounded-3xl shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead>
              <tr className="bg-slate-100/40 text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100/30">
                <th className="px-6 py-4">Log ID</th>
                <th className="px-6 py-4">Event Trigger</th>
                <th className="px-6 py-4">Clinical Gateway</th>
                <th className="px-6 py-4">Origin IP</th>
                <th className="px-6 py-4 text-center">Compliance Status</th>
              </tr>
            </thead>
            <tbody>
              {mockLogs.map(log => (
                <tr key={log.id} className="border-b border-slate-100/40 hover:bg-slate-50/30 transition last:border-b-0">
                  <td className="px-6 py-5 whitespace-nowrap text-xs md:text-sm font-extrabold text-slate-800">{log.id}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs md:text-sm font-extrabold text-slate-700">{log.event}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs md:text-sm text-slate-500 font-semibold">{log.node}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-xs md:text-sm text-slate-500 font-medium">{log.ip}</td>
                  <td className="px-6 py-5 text-center whitespace-nowrap">
                    <span className="inline-flex px-2 py-0.5 text-[9px] font-bold rounded border bg-emerald-50 text-emerald-600 border-emerald-100 items-center gap-1">
                      <ShieldCheck size={11} />
                      {log.status}
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

export default AdminRecords;

import { useState } from "react";
import {
  HelpCircle,
  ShieldCheck,
  Stethoscope,
  Siren,
  Database,
  Search,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  Mail,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Server,
  Lock
} from "lucide-react";

const adminProtocols = [
  {
    icon: Stethoscope,
    title: "Practitioner Credentialing SOP",
    desc: "National Medical Council validation, license registry lookup, and activation protocols.",
    tag: "HR & Licensing",
    bg: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    icon: Siren,
    title: "Emergency SOS Dispatch SOP",
    desc: "Triage desk escalation, ambulance fleet dispatch, and live geolocation response.",
    tag: "Critical Operations",
    bg: "bg-red-50 text-red-600 border-red-100"
  },
  {
    icon: ShieldCheck,
    title: "HIPAA & Data Protection",
    desc: "Role-based access security, patient data audit trails, and encryption guidelines.",
    tag: "Compliance & Legal",
    bg: "bg-teal-50 text-teal-600 border-teal-100"
  },
  {
    icon: Database,
    title: "Failover & Disaster Recovery",
    desc: "MySQL database automated snapshot schedules, failover procedures, and audit retention.",
    tag: "Infrastructure",
    bg: "bg-purple-50 text-purple-600 border-purple-100"
  }
];

const adminFaqs = [
  {
    q: "How do I verify and approve newly registered medical doctors?",
    a: "Go to the 'Doctors' tab in your Admin Portal. If any doctor has self-registered, their card will appear in the 'Pending Approvals' queue with their Medical License ID. Validate their license with the National Medical Register, then click 'Approve License' to grant active portal privileges."
  },
  {
    q: "How does the real-time Emergency SOS system function during a crisis?",
    a: "When a patient or triage desk triggers an emergency alert, the hospital system activates a high-priority audio beacon, displays the live GPS coordinates, and pins an emergency banner on the admin screen. Hospital administrators can copy the exact GPS link directly to ambulance crews."
  },
  {
    q: "How do I suspend or revoke a practitioner's access to the clinical portal?",
    a: "In the 'Doctors' directory, locate the doctor's record and click the amber 'Shield Alert' button. This updates their user account to 'SUSPENDED', immediately revoking login access and hiding them from the patient appointment booking catalog."
  },
  {
    q: "Where are patient clinical records and lab reports stored?",
    a: "EHR documents are securely linked with AES-256 encrypted storage. Patient records audit logs can be reviewed in the 'Medical Records' tab, where administrators can monitor report signatures and upload timestamps."
  },
  {
    q: "How can hospital administrators onboard new medical departments or specialists?",
    a: "Click 'Onboard New Doctor' in the Doctors panel. Provide the physician's official email, department specialization, consultation fee, and license number. The system will provision their credentials and notify the department head."
  }
];

export default function AdminHelp() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [ticketSubmitted, setTicketSubmitted] = useState(null);

  const [ticket, setTicket] = useState({
    category: "Practitioner Credentialing Issue",
    subject: "",
    urgency: "Medium",
    description: ""
  });

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    const ticketId = `TKT-ADM-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketSubmitted(ticketId);
    setTicket({
      category: "Practitioner Credentialing Issue",
      subject: "",
      urgency: "Medium",
      description: ""
    });
    setTimeout(() => setTicketSubmitted(null), 7000);
  };

  const filteredFaqs = adminFaqs.filter(
    f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#2563EB] rounded-3xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Server size={14} />
            Hospital Administration & Operations Center
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
            Administrative Knowledge Base & Incident Desk
          </h2>
          <p className="text-slate-300 text-xs md:text-sm font-medium">
            Review hospital compliance standards, disaster recovery protocols, or submit an infrastructure maintenance request.
          </p>

          <div className="pt-2 relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search administration SOPs, compliance, or doctor approval guides..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-3 pl-11 pr-4 text-xs md:text-sm text-white placeholder:text-slate-400 outline-none focus:border-blue-400 focus:bg-white/15 backdrop-blur-md"
            />
          </div>
        </div>
      </div>

      {/* Protocol Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminProtocols.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white/70 border border-white/60 rounded-3xl p-5 shadow-sm backdrop-blur-md space-y-3 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${item.bg}`}>
                  <Icon size={18} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {item.tag}
                </span>
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 leading-snug">{item.title}</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Cols: Admin FAQs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Hospital Administration FAQs</h3>
            <span className="text-xs font-bold text-slate-400">{filteredFaqs.length} entries</span>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white/70 border border-white/60 rounded-2xl p-4 shadow-xs backdrop-blur-md transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-3 bg-transparent border-none cursor-pointer"
                  >
                    <span className="font-bold text-xs md:text-sm text-slate-800 leading-snug">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp size={16} className="text-blue-600 shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 font-medium leading-relaxed animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Hospital Infrastructure Hotline */}
          <div className="p-5 rounded-3xl bg-blue-50 border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Lock size={20} />
              </div>
              <div>
                <h4 className="font-black text-xs md:text-sm text-blue-950">Chief Medical Director & IT Hotline</h4>
                <p className="text-[11px] text-blue-700 font-medium">Direct escalation line for server downtime or critical licensing audits.</p>
              </div>
            </div>
            <a
              href="tel:18005550199"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition shrink-0 flex items-center gap-1.5"
            >
              <PhoneCall size={14} />
              <span>+91 800-SMART-ADM</span>
            </a>
          </div>
        </div>

        {/* Right Col: Admin IT Maintenance Ticket */}
        <div className="bg-white/70 border border-white/60 rounded-3xl p-6 shadow-sm backdrop-blur-md space-y-5">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block">IT Command</span>
            <h3 className="font-extrabold text-sm md:text-base text-slate-900 mt-1">Submit Maintenance Ticket</h3>
            <p className="text-slate-500 text-xs mt-1 leading-snug font-medium">
              Report server latency, billing gateway issues, or user access anomalies.
            </p>
          </div>

          {ticketSubmitted && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              <div>
                <p>Maintenance Ticket #{ticketSubmitted} Logged!</p>
                <span className="text-[10px] font-normal text-emerald-700">Engineering on-call team alerted immediately.</span>
              </div>
            </div>
          )}

          <form onSubmit={handleTicketSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Issue Category</label>
              <select
                value={ticket.category}
                onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800 outline-none focus:border-blue-500"
              >
                <option value="Practitioner Credentialing Issue">Practitioner Credentialing Issue</option>
                <option value="Emergency Broadcast Malfunction">Emergency Broadcast Malfunction</option>
                <option value="Database Replication & Backup">Database Replication & Backup</option>
                <option value="Payment Gateway Discrepancy">Payment Gateway Discrepancy</option>
                <option value="Compliance Audit Log Export">Compliance Audit Log Export</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Subject</label>
              <input
                type="text"
                required
                placeholder="Brief summary of the issue..."
                value={ticket.subject}
                onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Priority Level</label>
              <div className="grid grid-cols-3 gap-2 font-bold text-[11px]">
                {["Standard", "High", "Critical"].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setTicket({ ...ticket, urgency: lvl })}
                    className={`py-1.5 rounded-xl border text-center transition cursor-pointer ${
                      ticket.urgency === lvl
                        ? "bg-blue-600 text-white border-blue-600 font-extrabold"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Incident Details</label>
              <textarea
                rows={3}
                required
                placeholder="Provide affected user IDs, service names, or timestamps..."
                value={ticket.description}
                onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800 outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
            >
              Submit Ticket to Engineering
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}

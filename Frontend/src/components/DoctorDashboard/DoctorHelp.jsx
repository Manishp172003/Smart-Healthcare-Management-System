import { useState } from "react";
import {
  HelpCircle,
  Video,
  FileText,
  Siren,
  ShieldCheck,
  Search,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  LifeBuoy
} from "lucide-react";

const doctorGuides = [
  {
    icon: Video,
    title: "Telehealth Video SOP",
    desc: "Camera & mic testing, WebRTC permissions, virtual waiting room protocols.",
    tag: "Clinical OPD",
    bg: "bg-teal-50 text-teal-600 border-teal-100"
  },
  {
    icon: FileText,
    title: "E-Prescribing Guidelines",
    desc: "Digital signature compliance, drug dosage limits, patient vault transmission.",
    tag: "EHR Standards",
    bg: "bg-purple-50 text-purple-600 border-purple-100"
  },
  {
    icon: Siren,
    title: "Emergency Code Escalation",
    desc: "Emergency SOS protocols, triage ward dispatch, ambulance coordination.",
    tag: "Critical Care",
    bg: "bg-red-50 text-red-600 border-red-100"
  },
  {
    icon: ShieldCheck,
    title: "HIPAA & Data Privacy",
    desc: "Patient confidentiality, encrypted charting, medical record disclosure rules.",
    tag: "Compliance",
    bg: "bg-blue-50 text-blue-600 border-blue-100"
  }
];

const clinicalFaqs = [
  {
    q: "How do I start a telehealth consultation with my patient?",
    a: "Go to your 'Clinical Overview' tab. On any Confirmed Telehealth appointment, click the teal 'Start Call' button. The virtual consultation room will open with your live camera and audio feed. Ensure your browser microphone and webcam permissions are set to 'Allow'."
  },
  {
    q: "How does my drafted e-prescription reach the patient?",
    a: "Navigate to the 'Medical Records' tab, fill in the patient's name, prescribed medication dosage, and clinical notes, and click 'Sign & Transmit Prescription'. The prescription is digitally signed and pushed immediately into the patient's Medical Records vault and notification bell."
  },
  {
    q: "What should I do if a patient experiences an emergency during a virtual consultation?",
    a: "Immediately click the red 'Emergency Alert' button in the sidebar or call the Trauma Center Hotline at +91 800-SMART-911. State the patient's ID and physical address (visible in the patient record) to initiate emergency dispatch."
  },
  {
    q: "How do I manage my weekly consulting schedule and block time off?",
    a: "Open the 'Schedules' tab to view your weekly grid. Clicking on any open slot will toggle it to 'Blocked', preventing patients from booking that hour. You can unblock it anytime by clicking again."
  },
  {
    q: "What is the policy for patient no-shows or delayed connections?",
    a: "Physicians are requested to remain in the virtual room for up to 15 minutes past the scheduled start time. If the patient does not join, you may mark the appointment as 'Cancelled' with reason 'Patient No-Show'."
  }
];

export default function DoctorHelp() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [ticketSubmitted, setTicketSubmitted] = useState(null);

  const [ticket, setTicket] = useState({
    category: "Telehealth Video/Audio Issue",
    subject: "",
    urgency: "Medium",
    description: ""
  });

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    const ticketId = `TKT-DOC-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketSubmitted(ticketId);
    setTicket({
      category: "Telehealth Video/Audio Issue",
      subject: "",
      urgency: "Medium",
      description: ""
    });
    setTimeout(() => setTicketSubmitted(null), 7000);
  };

  const filteredFaqs = clinicalFaqs.filter(
    f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0D9488] rounded-3xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <LifeBuoy size={14} />
            Physician Clinical Support Desk
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
            How can we assist your clinical practice today?
          </h2>
          <p className="text-slate-300 text-xs md:text-sm font-medium">
            Search clinical operation guides, virtual consultation standards, or contact 24/7 hospital IT dispatch.
          </p>

          <div className="pt-2 relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search clinical SOPs, e-prescribing, or telehealth questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-3 pl-11 pr-4 text-xs md:text-sm text-white placeholder:text-slate-400 outline-none focus:border-teal-400 focus:bg-white/15 backdrop-blur-md"
            />
          </div>
        </div>
      </div>

      {/* Quick Guide Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {doctorGuides.map((guide, idx) => {
          const Icon = guide.icon;
          return (
            <div
              key={idx}
              className="bg-white/70 border border-white/60 rounded-3xl p-5 shadow-sm backdrop-blur-md space-y-3 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${guide.bg}`}>
                  <Icon size={18} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {guide.tag}
                </span>
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 leading-snug">{guide.title}</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed font-medium">{guide.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Two-Column Layout: FAQs & Priority Support Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Cols: Clinical FAQs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Clinical Frequently Asked Questions</h3>
            <span className="text-xs font-bold text-slate-400">{filteredFaqs.length} answers</span>
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
                      <ChevronUp size={16} className="text-teal-600 shrink-0" />
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

          {/* Emergency Escalation Banner */}
          <div className="p-5 rounded-3xl bg-red-50 border border-red-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Siren size={20} className="animate-pulse" />
              </div>
              <div>
                <h4 className="font-black text-xs md:text-sm text-red-950">Code Blue & Critical Dispatch</h4>
                <p className="text-[11px] text-red-700 font-medium">Hospital trauma line available 24/7 for urgent clinical escalation.</p>
              </div>
            </div>
            <a
              href="tel:18007627891"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition shrink-0 flex items-center gap-1.5"
            >
              <PhoneCall size={14} />
              <span>+91 800-SMART-911</span>
            </a>
          </div>
        </div>

        {/* Right Col: Clinical IT Support Ticket */}
        <div className="bg-white/70 border border-white/60 rounded-3xl p-6 shadow-sm backdrop-blur-md space-y-5">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-600 block">IT Desk</span>
            <h3 className="font-extrabold text-sm md:text-base text-slate-900 mt-1">Submit Clinical Support Ticket</h3>
            <p className="text-slate-500 text-xs mt-1 leading-snug font-medium">
              Report hardware issues, video connection drops, or EHR sync discrepancies.
            </p>
          </div>

          {ticketSubmitted && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              <div>
                <p>Ticket #{ticketSubmitted} Created!</p>
                <span className="text-[10px] font-normal text-emerald-700">Hospital tech operations will reply in 15 mins.</span>
              </div>
            </div>
          )}

          <form onSubmit={handleTicketSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Issue Category</label>
              <select
                value={ticket.category}
                onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800 outline-none focus:border-teal-500"
              >
                <option value="Telehealth Video/Audio Issue">Telehealth Video/Audio Issue</option>
                <option value="Prescription Vault Transmission">Prescription Vault Transmission</option>
                <option value="Calendar Slot Scheduling Bug">Calendar Slot Scheduling Bug</option>
                <option value="Emergency Broadcast Notification">Emergency Broadcast Notification</option>
                <option value="Other Clinical Software Glitch">Other Clinical Software Glitch</option>
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
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800 outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Priority</label>
              <div className="grid grid-cols-3 gap-2 font-bold text-[11px]">
                {["Low", "Medium", "Urgent"].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setTicket({ ...ticket, urgency: lvl })}
                    className={`py-1.5 rounded-xl border text-center transition cursor-pointer ${
                      ticket.urgency === lvl
                        ? "bg-teal-600 text-white border-teal-600 font-extrabold"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Clinical Context / Details</label>
              <textarea
                rows={3}
                required
                placeholder="Specify patient ID, browser name, or error code..."
                value={ticket.description}
                onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800 outline-none focus:border-teal-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
            >
              Submit Ticket to Hospital IT
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}

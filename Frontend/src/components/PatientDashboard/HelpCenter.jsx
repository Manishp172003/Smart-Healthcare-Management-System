import { useState } from "react";
import { 
  Calendar, 
  CreditCard, 
  Lock, 
  FileText, 
  MessageSquareCode, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  HelpCircle,
  Mail,
  PhoneCall,
  CheckCircle2
} from "lucide-react";

const faqCategories = [
  { label: "Appointments", icon: Calendar, desc: "Video calls, booking guides", bg: "bg-blue-50 text-blue-600 border-blue-100" },
  { label: "Billing & Insurance", icon: CreditCard, desc: "Receipts, claims, billing", bg: "bg-yellow-50 text-yellow-600 border-yellow-100" },
  { label: "Medical Records", icon: FileText, desc: "Lab results, sharing reports", bg: "bg-teal-50 text-teal-600 border-teal-100" },
  { label: "Account & Security", icon: Lock, desc: "Passwords, HIPAA settings", bg: "bg-purple-50 text-purple-600 border-purple-100" }
];

const faqData = [
  {
    question: "How do I join my telehealth video consultation?",
    answer: "To join your video call, go to 'My Appointments' tab in the sidebar, locate your scheduled appointment card, and click the 'Join Call' button. The button becomes active 15 minutes prior to your scheduled time slot."
  },
  {
    question: "When will my laboratory blood work reports be available?",
    answer: "Typically, lab test results are processed and uploaded within 24 to 48 hours. Once approved by your provider, they will automatically appear in your 'Medical Records' tab under the 'Lab Reports' folder."
  },
  {
    question: "How do I cancel or reschedule a booked appointment?",
    answer: "You can reschedule or cancel directly from your 'My Appointments' list. Click the 'Reschedule' button to pick a new date, or click 'Cancel' to withdraw. We kindly request cancellations be made at least 2 hours before the appointment."
  },
  {
    question: "Are my personal health records secured and confidential?",
    answer: "Yes, absolutely. SmartHealth utilizes end-to-end AES-256 encryption for all messages and documents. Our platform is fully HIPAA-compliant, ensuring your sensitive healthcare details remain strictly secure and confidential."
  }
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [ticket, setTicket] = useState({ name: "", subject: "", message: "" });

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${ticket.name}. Your support ticket regarding "${ticket.subject}" has been successfully submitted!`);
    setTicket({ name: "", subject: "", message: "" });
  };

  const filteredFaqs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Search Header Wrapper */}
      <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="font-extrabold text-slate-800 text-sm md:text-base leading-none">Frequently Asked Questions</h3>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-white/45 bg-slate-50/40 rounded-xl py-2 pl-9 pr-3 text-xs md:text-sm text-[#162235] outline-none placeholder:text-slate-400 focus:border-[#2563EB]"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {faqCategories.map(cat => {
          const Icon = cat.icon;
          return (
            <div 
              key={cat.label} 
              className="bg-white/60 border border-white/45 rounded-3xl p-5 shadow-[0_8px_32px_rgba(15,23,42,0.01)] backdrop-blur-md flex items-start gap-4 transition hover:shadow-md cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${cat.bg}`}>
                <Icon size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-xs md:text-sm leading-tight">{cat.label}</h4>
                <p className="text-slate-400 text-[10px] md:text-xs mt-1.5 leading-snug">{cat.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Accordion FAQs and Contact Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Accordions (2 Columns width) */}
        <div className="lg:col-span-2 space-y-4 bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md">
          {filteredFaqs.length === 0 ? (
            <p className="text-slate-400 text-xs py-6 text-center font-bold">No FAQ items match your search query.</p>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="border-b border-slate-100/60 last:border-b-0 pb-3 last:pb-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center py-3 text-left font-bold text-slate-700 hover:text-[#2563EB] text-xs md:text-sm transition cursor-pointer border-none bg-transparent"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle size={16} className="text-[#0D9488]" />
                      {faq.question}
                    </span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 mt-2 opacity-100" : "max-h-0 opacity-0"
                  }`}>
                    <p className="text-slate-400 text-[11px] md:text-xs leading-relaxed pl-6.5 font-medium">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Contact support and Ticket forms (1 Column width) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Live helpline */}
          <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md space-y-4">
            <h4 className="font-extrabold text-slate-800 text-xs md:text-sm flex items-center gap-2">
              <MessageSquareCode size={18} className="text-[#2563EB]" />
              Support Channels
            </h4>

            <div className="space-y-3.5">
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <PhoneCall size={14} className="text-[#0D9488]" />
                <span className="font-bold">Helpline: +1 (800) 555-0199</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <Mail size={14} className="text-[#0D9488]" />
                <span className="font-bold">Email: support@smarthealth.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-400 font-semibold pl-6.5 leading-none">
                Average wait time: 2 mins
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-1.5 h-10 bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none text-white rounded-xl text-xs font-bold transition hover:shadow-md cursor-pointer">
              Start Live Chat
            </button>
          </div>

          {/* Ticket form */}
          <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md space-y-4">
            <h4 className="font-extrabold text-slate-800 text-xs md:text-sm">Submit Support Request</h4>
            
            <form onSubmit={handleTicketSubmit} className="space-y-3.5">
              <input 
                type="text" 
                required
                placeholder="Your Name"
                value={ticket.name}
                onChange={(e) => setTicket({ ...ticket, name: e.target.value })}
                className="w-full border border-white/40 bg-slate-50/40 rounded-xl p-3 text-xs text-[#162235] outline-none transition focus:border-[#2563EB]"
              />

              <input 
                type="text" 
                required
                placeholder="Subject"
                value={ticket.subject}
                onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                className="w-full border border-white/40 bg-slate-50/40 rounded-xl p-3 text-xs text-[#162235] outline-none transition focus:border-[#2563EB]"
              />

              <textarea 
                required
                placeholder="Describe your issue..."
                rows={3}
                value={ticket.message}
                onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
                className="w-full border border-white/40 bg-slate-50/40 rounded-xl p-3 text-xs text-[#162235] outline-none transition focus:border-[#2563EB]"
              />

              <button 
                type="submit"
                className="w-full h-10 bg-white/40 border border-white/20 hover:bg-white/60 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Submit Ticket
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};

export default HelpCenter;

import { Plus, FileText, Star } from "lucide-react";

function QuickActions({ setActiveTab, onOpenFeedback }) {
  return (
    <div className="flex flex-col gap-5">

      {/* ================= BLOOD REPORT ================= */}
      <div className="flex flex-1 flex-col justify-between rounded-3xl bg-blue-50/30 backdrop-blur-md border border-white/40 p-6 shadow-xs">

        <div className="flex items-center justify-between">

          {/* Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB]/8 text-[#2563EB]">
            <FileText size={20} />
          </div>

          {/* New Badge */}
          <span className="rounded-md bg-white border border-slate-100 px-3 py-1 text-[10px] md:text-xs font-bold text-slate-500">
            New
          </span>

        </div>

        <div className="mt-4">

          <h3 className="text-sm md:text-base font-extrabold text-slate-800 leading-tight">
            Blood Work Results
          </h3>

          <p className="mt-1 text-[11px] md:text-xs text-slate-400">
            Available for review
          </p>

          <button 
            onClick={() => setActiveTab("Medical Records")}
            className="mt-4 text-[11px] md:text-xs font-bold text-[#2563EB] hover:text-[#0D9488] hover:underline cursor-pointer bg-transparent border-none"
          >
            View Report →
          </button>

        </div>

      </div>


      {/* ================= BOOK APPOINTMENT ================= */}
      <button 
        onClick={() => setActiveTab("Book Appointment")}
        className="group flex items-center justify-between rounded-3xl bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none p-6 text-left text-white shadow-md transition hover:-translate-y-px duration-300 cursor-pointer w-full"
      >

        <div>

          <h3 className="text-sm md:text-base font-extrabold leading-tight">
            Need a visit?
          </h3>

          <p className="mt-1 text-[11px] md:text-xs text-teal-100">
            Book a new appointment
          </p>

        </div>

        {/* Plus Button */}
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm border border-white/20 transition group-hover:scale-110">
          <Plus size={22} />
        </div>

      </button>

      {/* ================= RATE CONSULTATION / FEEDBACK ================= */}
      <button 
        onClick={onOpenFeedback}
        className="group flex items-center justify-between rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50/60 backdrop-blur-md border border-amber-200/60 p-5 text-left text-slate-800 shadow-xs transition hover:shadow-md hover:-translate-y-px duration-300 cursor-pointer w-full"
      >
        <div>
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-600 block">
            Patient Voice
          </span>
          <h3 className="text-sm font-extrabold text-slate-800 leading-tight mt-0.5">
            Rate Your Consultation
          </h3>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Leave a testimonial for your doctor
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm transition group-hover:scale-110 shrink-0">
          <Star size={18} className="fill-white" />
        </div>
      </button>

    </div>
  );
}

export default QuickActions;
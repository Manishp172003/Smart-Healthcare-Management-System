import { Plus, FileText } from "lucide-react";

function QuickActions() {
  return (
    <div className="flex flex-col gap-6">

      {/* ================= BLOOD REPORT ================= */}
      <div className="flex flex-1 flex-col justify-between rounded-3xl bg-blue-50/50 border border-blue-100/50 p-7">

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

        <div className="mt-6">

          <h3 className="text-sm md:text-base font-extrabold text-slate-800 leading-tight">
            Blood Work Results
          </h3>

          <p className="mt-1 text-[11px] md:text-xs text-slate-400">
            Available for review
          </p>

          <button className="mt-5 text-[11px] md:text-xs font-bold text-[#2563EB] hover:text-[#0D9488] hover:underline cursor-pointer">
            View Report →
          </button>

        </div>

      </div>


      {/* ================= BOOK APPOINTMENT ================= */}
      <button className="group flex items-center justify-between rounded-3xl bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none p-7 text-left text-white shadow-[0_6px_18px_rgba(37,99,235,0.12)] transition hover:-translate-y-px duration-300 cursor-pointer">

        <div>

          <h3 className="text-sm md:text-base font-extrabold leading-tight">
            Need a visit?
          </h3>

          <p className="mt-1 text-[11px] md:text-xs text-teal-100">
            Book a new appointment
          </p>

        </div>

        {/* Plus Button */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm border border-white/20 transition group-hover:scale-110">
          <Plus size={24} />
        </div>

      </button>

    </div>
  );
}

export default QuickActions;
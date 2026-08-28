import {
  CalendarClock,
  Video,
  CalendarDays,
} from "lucide-react";

function NextAppointment() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/45 bg-white/60 p-7 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md">

      {/* Decorative Background */}
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#0d9488]/10 opacity-50 blur-3xl" />

      <div className="relative">

        {/* Appointment Information */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row">

          <div>

            {/* Label */}
            <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#0D9488]">
              <CalendarClock size={18} />
              Next Appointment
            </div>

            {/* Title */}
            <h2 className="text-lg md:text-xl font-extrabold text-slate-900 leading-tight">
              Cardiology Checkup
            </h2>

            {/* Doctor */}
            <p className="mt-1.5 text-xs md:text-sm text-slate-500 font-medium">
              Dr. Emily Chen • Heart Health Clinic
            </p>

          </div>

          {/* Date & Time */}
          <div className="text-left sm:text-right flex flex-col md:justify-center">

            <p className="text-sm md:text-base font-bold text-[#0D9488]">
              Tomorrow
            </p>

            <p className="mt-0.5 text-xs md:text-sm text-slate-600 font-semibold">
              10:00 AM
            </p>

          </div>

        </div>

        {/* Divider */}
        <div className="my-7 border-t border-white/40" />

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">

          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none px-5 py-3 font-bold text-white shadow-[0_4px_12px_rgba(37,99,235,0.15)] hover:shadow-[0_6px_18px_rgba(37,99,235,0.22)] transition-all duration-300 hover:-translate-y-px cursor-pointer">
            <Video size={18} />
            Join Telehealth
          </button>

          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/40 border border-white/20 px-5 py-3 font-medium text-slate-700 transition hover:bg-white/60 cursor-pointer">
            <CalendarDays size={18} />
            Reschedule
          </button>

        </div>

      </div>

    </div>
  );
}

export default NextAppointment;
import {
  CalendarClock,
  Video,
  CalendarDays,
} from "lucide-react";

function NextAppointment() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

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
            <h2 className="text-2xl font-bold text-slate-900">
              Cardiology Checkup
            </h2>

            {/* Doctor */}
            <p className="mt-2 text-base text-slate-500">
              Dr. Emily Chen • Heart Health Clinic
            </p>

          </div>

          {/* Date & Time */}
          <div className="text-left sm:text-right">

            <p className="text-xl font-semibold text-[#0D9488]">
              Tomorrow
            </p>

            <p className="mt-1 text-lg text-slate-600">
              10:00 AM
            </p>

          </div>

        </div>

        {/* Divider */}
        <div className="my-7 border-t border-slate-200" />

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">

          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none px-5 py-3 font-bold text-white shadow-[0_4px_12px_rgba(37,99,235,0.15)] hover:shadow-[0_6px_18px_rgba(37,99,235,0.22)] transition-all duration-300 hover:-translate-y-px cursor-pointer">
            <Video size={18} />
            Join Telehealth
          </button>

          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-200">
            <CalendarDays size={18} />
            Reschedule
          </button>

        </div>

      </div>

    </div>
  );
}

export default NextAppointment;
import { MoreHorizontal } from "lucide-react";

function UpcomingAppointments({ appointments = [], loading = false }) {
  if (loading) {
    return (
      <div className="flex flex-col rounded-3xl border border-white/45 bg-white/60 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md min-h-[220px] justify-center items-center">
        <p className="text-slate-500 font-semibold text-xs md:text-sm animate-pulse">Loading upcoming list...</p>
      </div>
    );
  }

  const upcomingList = appointments.filter(
    (apt) => apt.status === "PENDING" || apt.status === "CONFIRMED"
  );

  return (
    <div className="flex flex-col rounded-3xl border border-white/45 bg-white/60 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-6">

        <h2 className="text-base md:text-lg font-extrabold text-slate-800">
          Upcoming
        </h2>

        <button className="rounded-lg p-1 text-[#0D9488] transition hover:bg-slate-100 cursor-pointer">
          <MoreHorizontal size={22} />
        </button>

      </div>

      {/* Appointment List */}
      <div className="flex flex-col gap-3 p-4">

        {upcomingList.length === 0 ? (
          <p className="text-slate-400 text-xs font-semibold p-4 text-center">No upcoming appointments.</p>
        ) : (
          upcomingList.map((appointment, index) => {
            let month = "DAT";
            let date = "00";
            try {
              const dateObj = new Date(appointment.appointmentDate);
              month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
              date = dateObj.getDate().toString().padStart(2, '0');
            } catch (err) {
              console.error(err);
            }

            const doctorName = appointment.doctor?.user?.name || "Specialist";
            const specialty = appointment.doctor?.specialization || "General Health";

            return (
              <div
                key={index}
                className="flex cursor-pointer items-start gap-4 rounded-2xl bg-slate-50/40 border border-slate-100/30 p-4 transition hover:bg-slate-100/50"
              >

                {/* Date */}
                <div
                  className={`min-w-[58px] rounded-xl p-2 text-center ${
                    index === 0
                      ? "bg-[#0D9488]/8 text-[#0D9488]"
                      : "bg-slate-200/60 text-slate-500"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase">
                    {month}
                  </p>

                  <p className="text-xl font-bold">
                    {date}
                  </p>
                </div>

                {/* Details */}
                <div className="flex-1">

                  <h3 className="font-bold text-slate-900">
                    {specialty}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Dr. {doctorName} • {appointment.startTime}
                  </p>

                  {/* Status */}
                  <span
                    className={`mt-2 inline-block rounded-md px-2 py-1 text-xs font-bold ${
                      appointment.status === "CONFIRMED"
                        ? "bg-blue-50 text-[#2563EB] border border-blue-100/60"
                        : "border border-slate-200 bg-slate-50 text-slate-500"
                    }`}
                  >
                    {appointment.status}
                  </span>

                </div>

              </div>
            );
          })
        )}

      </div>

    </div>
  );
}

export default UpcomingAppointments;
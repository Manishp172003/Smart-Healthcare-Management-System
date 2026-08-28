import { MoreHorizontal } from "lucide-react";

const appointments = [
  {
    month: "OCT",
    date: "12",
    department: "Dermatology",
    doctor: "Dr. Smith",
    time: "2:30 PM",
    status: "Confirmed",
  },
  {
    month: "NOV",
    date: "05",
    department: "General Practice",
    doctor: "Dr. Allen",
    time: "9:00 AM",
    status: "Pending",
  },
];

function UpcomingAppointments() {
  return (
    <div className="flex flex-col rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-6">

        <h2 className="text-xl font-bold text-slate-900">
          Upcoming
        </h2>

        <button className="rounded-lg p-1 text-[#0D9488] transition hover:bg-slate-100 cursor-pointer">
          <MoreHorizontal size={22} />
        </button>

      </div>

      {/* Appointment List */}
      <div className="flex flex-col gap-3 p-4">

        {appointments.map((appointment, index) => (
          <div
            key={index}
            className="flex cursor-pointer items-start gap-4 rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100"
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
                {appointment.month}
              </p>

              <p className="text-xl font-bold">
                {appointment.date}
              </p>
            </div>

            {/* Details */}
            <div className="flex-1">

              <h3 className="font-bold text-slate-900">
                {appointment.department}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {appointment.doctor} • {appointment.time}
              </p>

              {/* Status */}
              <span
                className={`mt-2 inline-block rounded-md px-2 py-1 text-xs font-bold ${
                  appointment.status === "Confirmed"
                    ? "bg-blue-50 text-[#2563EB] border border-blue-100/60"
                    : "border border-slate-200 bg-slate-50 text-slate-500"
                }`}
              >
                {appointment.status}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default UpcomingAppointments;
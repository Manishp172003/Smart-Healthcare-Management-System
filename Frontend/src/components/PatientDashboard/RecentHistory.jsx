import { CheckCircle, XCircle } from "lucide-react";
import { getDoctorAvatar } from "../../data/doctorsData";

function RecentHistory({ appointments = [], loading = false, setActiveTab }) {
  if (loading) {
    return (
      <div className="flex flex-col overflow-hidden rounded-3xl border border-white/45 bg-white/60 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md min-h-[220px] justify-center items-center">
        <p className="text-slate-500 font-semibold text-xs md:text-sm animate-pulse">Loading recent history...</p>
      </div>
    );
  }

  const pastList = appointments.filter(
    (apt) => apt.status === "COMPLETED" || apt.status === "CANCELLED"
  );

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-white/45 bg-white/60 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-6">

        <h2 className="text-base md:text-lg font-extrabold text-slate-800">
          Recent History
        </h2>

        <button 
          onClick={() => setActiveTab && setActiveTab("My Appointments")}
          className="font-bold text-[#2563EB] hover:text-[#0D9488] hover:underline cursor-pointer bg-transparent border-none text-xs md:text-sm"
        >
          View All
        </button>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        {pastList.length === 0 ? (
          <p className="text-slate-400 text-xs font-semibold p-6 text-center">No past consultations or medical history found.</p>
        ) : (
          <table className="w-full min-w-[650px] text-left">

            {/* Table Header */}
            <thead>
              <tr className="bg-slate-100/40 text-xs uppercase tracking-wider text-slate-600 border-b border-slate-100/30">

                <th className="px-5 py-4 font-semibold">
                  Date
                </th>

                <th className="px-5 py-4 font-semibold">
                  Provider
                </th>

                <th className="px-5 py-4 font-semibold">
                  Type
                </th>

                <th className="px-5 py-4 text-right font-semibold">
                  Status
                </th>

              </tr>
            </thead>

            {/* Table Body */}
            <tbody>

              {pastList.map((item, index) => {
                const rawDoctorName = item.doctor?.user?.name || "Specialist";
                const doctorName = rawDoctorName.startsWith("Dr.") ? rawDoctorName : `Dr. ${rawDoctorName}`;
                const specialty = item.doctor?.specialization || "General Health";
                const doctorAvatar = getDoctorAvatar(item.doctor);

                return (
                  <tr
                    key={index}
                    className="cursor-pointer border-t border-slate-200/50 transition hover:bg-slate-50/40"
                  >

                    <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-700">
                      {item.appointmentDate}
                    </td>

                    <td className="px-5 py-5 text-sm font-medium text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={doctorAvatar} 
                          alt={doctorName} 
                          className="w-7 h-7 rounded-lg object-cover border border-slate-200 shrink-0" 
                        />
                        <span>{doctorName}</span>
                      </div>
                    </td>

                    <td className="px-5 py-5 text-sm text-slate-500">
                      {specialty} Consult
                    </td>

                    <td className="px-5 py-5 text-right">

                      <span className={`inline-flex items-center gap-1 text-sm font-bold ${
                        item.status === "COMPLETED" ? "text-[#0D9488]" : "text-rose-600"
                      }`}>
                        {item.status === "COMPLETED" ? (
                          <>
                            <CheckCircle size={16} />
                            Completed
                          </>
                        ) : (
                          <>
                            <XCircle size={16} />
                            Cancelled
                          </>
                        )}
                      </span>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}

export default RecentHistory;
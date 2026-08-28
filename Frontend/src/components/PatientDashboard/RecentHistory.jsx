import { CheckCircle } from "lucide-react";

const history = [
  {
    date: "Sep 15, 2023",
    provider: "Dr. Emily Chen",
    type: "Cardiology Consult",
  },
  {
    date: "Aug 02, 2023",
    provider: "LabCorp",
    type: "Blood Work",
  },
  {
    date: "Jul 10, 2023",
    provider: "Dr. Allen",
    type: "Annual Physical",
  },
];

function RecentHistory() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 p-6">

        <h2 className="text-xl font-bold text-slate-900">
          Recent History
        </h2>

        <button className="font-bold text-[#2563EB] hover:text-[#0D9488] hover:underline cursor-pointer">
          View All
        </button>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full min-w-[650px] text-left">

          {/* Table Header */}
          <thead>
            <tr className="bg-slate-100 text-xs uppercase tracking-wider text-slate-600">

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

            {history.map((item, index) => (
              <tr
                key={index}
                className="cursor-pointer border-t border-slate-200 transition hover:bg-slate-50"
              >

                <td className="whitespace-nowrap px-5 py-5 text-sm text-slate-700">
                  {item.date}
                </td>

                <td className="px-5 py-5 text-sm font-medium text-slate-900">
                  {item.provider}
                </td>

                <td className="px-5 py-5 text-sm text-slate-500">
                  {item.type}
                </td>

                <td className="px-5 py-5 text-right">

                  <span className="inline-flex items-center gap-1 text-sm font-bold text-[#0D9488]">
                    <CheckCircle size={16} />
                    Completed
                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentHistory;
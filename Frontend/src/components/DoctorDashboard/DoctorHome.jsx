import { useState } from "react";
import VideoConsultationModal from "../PatientDashboard/VideoConsultationModal";
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle2, 
  Activity, 
  Check, 
  X, 
  AlertCircle, 
  AlertTriangle,
  ShieldCheck,
  DollarSign,
  RefreshCw, 
  Filter, 
  Video, 
  MapPin, 
  Stethoscope, 
  Phone, 
  Mail 
} from "lucide-react";

const DoctorHome = ({ 
  appointments = [], 
  loading = false, 
  handleUpdateStatus, 
  activeDoctor, 
  onRefresh 
}) => {
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [liveConsultation, setLiveConsultation] = useState(null);
  const [cancelModalAppointment, setCancelModalAppointment] = useState(null);

  // Compute live KPIs
  const totalCount = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === "PENDING").length;
  const confirmedCount = appointments.filter((a) => a.status === "CONFIRMED").length;
  const completedCount = appointments.filter((a) => a.status === "COMPLETED").length;
  const cancelledCount = appointments.filter((a) => a.status === "CANCELLED").length;

  // Filter appointments
  const filteredAppointments = appointments.filter((app) => {
    const matchesStatus = filterStatus === "ALL" || app.status === filterStatus;
    const patientName = app.patient?.user?.name || app.patient?.name || "";
    const reason = app.reason || "";
    const matchesSearch =
      patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const onAction = async (id, status) => {
    setUpdatingId(id);
    await handleUpdateStatus(id, status);
    setUpdatingId(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return {
          label: "Pending Review",
          className: "bg-amber-50 text-amber-700 border-amber-200"
        };
      case "CONFIRMED":
        return {
          label: "Confirmed",
          className: "bg-emerald-50 text-emerald-700 border-emerald-200"
        };
      case "COMPLETED":
        return {
          label: "Completed",
          className: "bg-blue-50 text-blue-700 border-blue-200"
        };
      case "CANCELLED":
        return {
          label: "Cancelled",
          className: "bg-rose-50 text-rose-700 border-rose-200"
        };
      default:
        return {
          label: status,
          className: "bg-slate-100 text-slate-700 border-slate-200"
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Dynamic Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Total Appointments */}
        <div className="bg-white/70 border border-white/60 rounded-3xl p-5 shadow-sm backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Bookings</span>
            <span className="text-2xl font-black text-slate-900 block mt-1">{totalCount}</span>
            <span className="text-[10px] text-slate-500 font-semibold mt-0.5 block">All consultations</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <Calendar size={20} />
          </div>
        </div>

        {/* Metric 2: Pending Approval */}
        <div className="bg-white/70 border border-white/60 rounded-3xl p-5 shadow-sm backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-[10px] md:text-xs font-bold text-amber-500 uppercase tracking-wider block">Pending Review</span>
            <span className="text-2xl font-black text-amber-600 block mt-1">{pendingCount}</span>
            <span className="text-[10px] text-amber-600/80 font-semibold mt-0.5 block">Requires action</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <AlertCircle size={20} />
          </div>
        </div>

        {/* Metric 3: Confirmed / Scheduled */}
        <div className="bg-white/70 border border-white/60 rounded-3xl p-5 shadow-sm backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-[10px] md:text-xs font-bold text-emerald-500 uppercase tracking-wider block">Confirmed Visits</span>
            <span className="text-2xl font-black text-emerald-600 block mt-1">{confirmedCount}</span>
            <span className="text-[10px] text-emerald-600/80 font-semibold mt-0.5 block">Ready for consult</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <Activity size={20} />
          </div>
        </div>

        {/* Metric 4: Completed */}
        <div className="bg-white/70 border border-white/60 rounded-3xl p-5 shadow-sm backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-[10px] md:text-xs font-bold text-purple-500 uppercase tracking-wider block">Completed</span>
            <span className="text-2xl font-black text-purple-600 block mt-1">{completedCount}</span>
            <span className="text-[10px] text-purple-600/80 font-semibold mt-0.5 block">History closed</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
            <CheckCircle2 size={20} />
          </div>
        </div>

      </div>

      {/* Main Container: Filter tabs & Appointments Table */}
      <div className="bg-white/70 border border-white/60 rounded-3xl shadow-sm backdrop-blur-md overflow-hidden">
        
        {/* Controls Toolbar */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Status Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "ALL", label: "All", count: totalCount },
              { id: "PENDING", label: "Pending", count: pendingCount },
              { id: "CONFIRMED", label: "Confirmed", count: confirmedCount },
              { id: "COMPLETED", label: "Completed", count: completedCount },
              { id: "CANCELLED", label: "Cancelled", count: cancelledCount }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  filterStatus === tab.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100/70 hover:bg-slate-200/70 text-slate-600"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                  filterStatus === tab.id ? "bg-white/20 text-white" : "bg-white text-slate-700 shadow-2xs"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search & Refresh */}
          <div className="flex items-center gap-2.5">
            <input
              type="text"
              placeholder="Search patient or symptom..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 outline-none focus:border-blue-500 w-full sm:w-56"
            />
            <button
              onClick={onRefresh}
              title="Refresh Appointments"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

        </div>

        {/* Appointments Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <th className="px-6 py-4">Appointment Schedule</th>
                <th className="px-6 py-4">Patient Information</th>
                <th className="px-6 py-4">Symptoms / Reason</th>
                <th className="px-6 py-4 text-center">Type</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Doctor Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <div className="max-w-xs mx-auto text-center space-y-2">
                      <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                        <Calendar size={22} />
                      </div>
                      <p className="text-sm font-bold text-slate-700">No appointments found</p>
                      <p className="text-xs text-slate-400">
                        {filterStatus === "ALL"
                          ? "There are no incoming appointments scheduled for this doctor."
                          : `No appointments with status "${filterStatus.toLowerCase()}" were found.`}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((app) => {
                  const patientUser = app.patient?.user;
                  const patientName = patientUser?.name || "Patient";
                  const patientEmail = patientUser?.email || "patient@healthcare.com";
                  const initials = patientName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();
                  const badge = getStatusBadge(app.status);
                  const isUpdating = updatingId === app.id;

                  return (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition">
                      
                      {/* Schedule Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-start gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100 mt-0.5">
                            <Clock size={16} />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-slate-900">
                              {app.appointmentDate || "Pending Date"}
                            </p>
                            <p className="text-[11px] font-semibold text-teal-600 mt-0.5">
                              {app.startTime ? app.startTime.slice(0, 5) : "09:30"} {app.endTime ? ` - ${app.endTime.slice(0, 5)}` : ""}
                            </p>
                            <span className="text-[10px] text-slate-400">ID: #APT-{app.id}</span>
                          </div>
                        </div>
                      </td>

                      {/* Patient Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs shrink-0">
                            {initials}
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-slate-800">{patientName}</p>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                              <Mail size={11} />
                              <span>{patientEmail}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Reason Column */}
                      <td className="px-6 py-4">
                        <p className="text-xs font-medium text-slate-700 max-w-xs line-clamp-2 leading-relaxed">
                          {app.reason || "General clinical consultation"}
                        </p>
                      </td>

                      {/* Type Column */}
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {app.appointmentType === "telehealth" ? (
                            <>
                              <Video size={11} className="text-teal-600" />
                              <span>Telehealth</span>
                            </>
                          ) : (
                            <>
                              <MapPin size={11} className="text-blue-600" />
                              <span>In-Person</span>
                            </>
                          )}
                        </span>
                      </td>

                      {/* Status Column */}
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <div className="flex flex-col items-center gap-1">
                          <span className={`inline-flex px-2.5 py-1 text-[11px] font-bold rounded-lg border ${badge.className}`}>
                            {badge.label}
                          </span>
                          {app.paymentStatus === "PAID" ? (
                            <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-flex items-center gap-1">
                              ✓ Paid Online (₹{app.amountPaid || 1500})
                            </span>
                          ) : app.paymentStatus === "REFUNDED" ? (
                            <span className="text-[9px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200 inline-flex items-center gap-1">
                              ↩ 100% Refunded (₹{app.amountPaid || 1500})
                            </span>
                          ) : (
                            <span className="text-[9px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 inline-flex items-center gap-1">
                              💵 Pay at Clinic
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Doctor Actions Column */}
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          
                          {/* When PENDING: Show Approve & Decline */}
                          {app.status === "PENDING" && (
                            <>
                              <button
                                disabled={isUpdating}
                                onClick={() => onAction(app.id, "CONFIRMED")}
                                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1.5 shadow-sm transition disabled:opacity-50 cursor-pointer"
                                title="Approve Appointment"
                              >
                                <Check size={13} className="stroke-[3]" />
                                <span>Approve</span>
                              </button>

                              <button
                                disabled={isUpdating}
                                onClick={() => setCancelModalAppointment(app)}
                                className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold text-[11px] flex items-center gap-1 transition disabled:opacity-50 cursor-pointer"
                                title="Decline Appointment"
                              >
                                <X size={13} className="stroke-[3]" />
                                <span>Decline</span>
                              </button>
                            </>
                          )}

                          {/* When CONFIRMED: Show Join Call, Mark Complete & Cancel */}
                          {app.status === "CONFIRMED" && (
                            <>
                              {app.appointmentType === "telehealth" && (
                                <button
                                  onClick={() => setLiveConsultation(app)}
                                  className="px-2.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-sm transition cursor-pointer"
                                  title="Start Telehealth Consultation"
                                >
                                  <Video size={13} className="stroke-[2.5]" />
                                  <span>Start Call</span>
                                </button>
                              )}

                              <button
                                disabled={isUpdating}
                                onClick={() => onAction(app.id, "COMPLETED")}
                                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-[11px] flex items-center gap-1.5 shadow-sm transition disabled:opacity-50 cursor-pointer"
                                title="Mark Consultation Completed"
                              >
                                <CheckCircle2 size={13} className="stroke-[2.5]" />
                                <span>Complete</span>
                              </button>

                              <button
                                disabled={isUpdating}
                                onClick={() => setCancelModalAppointment(app)}
                                className="p-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 font-bold text-[11px] transition disabled:opacity-50 cursor-pointer"
                                title="Cancel / Emergency Rebook"
                              >
                                <X size={13} className="stroke-[2.5]" />
                              </button>
                            </>
                          )}

                          {/* When COMPLETED */}
                          {app.status === "COMPLETED" && (
                            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                              <CheckCircle2 size={13} className="text-emerald-500" />
                              <span>Closed</span>
                            </span>
                          )}

                          {/* When CANCELLED */}
                          {app.status === "CANCELLED" && (
                            <span className="text-[11px] font-bold text-rose-400">
                              Cancelled
                            </span>
                          )}

                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Emergency Cancellation & Auto-Refund Modal */}
      {cancelModalAppointment && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 border border-rose-100">
              <AlertTriangle size={24} />
            </div>

            <h3 className="text-lg font-black text-slate-900 leading-tight">
              Emergency Cancellation
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Cancel appointment for <span className="font-bold text-slate-800">{cancelModalAppointment.patient?.user?.name || cancelModalAppointment.patient?.name || "Patient"}</span> scheduled on <span className="font-bold text-slate-800">{cancelModalAppointment.appointmentDate} at {cancelModalAppointment.startTime?.slice(0, 5)}</span>?
            </p>

            {cancelModalAppointment.paymentStatus === "PAID" || (!cancelModalAppointment.paymentStatus && cancelModalAppointment.paymentMethod !== "PAY_AT_CLINIC") ? (
              <div className="mt-4 p-4 rounded-2xl bg-purple-50/80 border border-purple-200/80 flex items-start gap-3">
                <ShieldCheck size={20} className="text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-black text-purple-900">Automatic 100% Patient Refund</h5>
                  <p className="text-[11px] text-purple-700 mt-0.5 leading-relaxed">
                    The patient already paid <span className="font-bold">₹{cancelModalAppointment.amountPaid || 1500}</span> online. A full refund will be immediately triggered back to their original payment source.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
                <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-black text-amber-900">Pay at Clinic Appointment</h5>
                  <p className="text-[11px] text-amber-700 mt-0.5 leading-relaxed">
                    No online payment was collected. The patient will be notified that this clinical visit slot has been cancelled.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setCancelModalAppointment(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                Keep Appointment
              </button>
              <button
                disabled={updatingId === cancelModalAppointment.id}
                onClick={async () => {
                  const id = cancelModalAppointment.id;
                  setCancelModalAppointment(null);
                  await onAction(id, "CANCELLED");
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md transition disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
              >
                <span>Confirm & Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Telehealth Video Modal */}
      {liveConsultation && (
        <VideoConsultationModal
          isOpen={Boolean(liveConsultation)}
          onClose={() => setLiveConsultation(null)}
          appointment={{
            id: liveConsultation.id,
            doctor: `Dr. ${activeDoctor?.user?.name || "Practitioner"} (You)`,
            specialty: `${activeDoctor?.specialization || "Clinical"} Consultation`,
            date: liveConsultation.appointmentDate,
            time: liveConsultation.startTime,
            duration: "30 mins",
            mode: "Telehealth",
            status: liveConsultation.status
          }}
        />
      )}

    </div>
  );
};

export default DoctorHome;

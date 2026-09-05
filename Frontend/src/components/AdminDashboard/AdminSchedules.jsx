import { useState, useEffect, useMemo } from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  Filter,
  Search,
  Video,
  MapPin,
  Stethoscope,
  Users,
  AlertCircle,
  RefreshCw,
  X
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";

const AdminSchedules = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchMasterSchedule = async () => {
    setLoading(true);
    try {
      const [aptRes, docRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/appointments`),
        fetch(`${API_BASE_URL}/api/doctors`)
      ]);

      if (aptRes.ok) {
        const aptData = await aptRes.json();
        setAppointments(Array.isArray(aptData) ? aptData : []);
      }
      if (docRes.ok) {
        const docData = await docRes.json();
        setDoctors(Array.isArray(docData) ? docData : []);
      }
    } catch (err) {
      console.error("Error loading master hospital schedule:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMasterSchedule();
    const handleSync = () => fetchMasterSchedule();
    window.addEventListener("appointmentsUpdated", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("appointmentsUpdated", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const handleAdminStatusChange = async (appointmentId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${appointmentId}/status?status=${newStatus}`, {
        method: "PUT"
      });
      if (res.ok) {
        setAppointments(prev =>
          prev.map(app => (app.id === appointmentId ? { ...app, status: newStatus } : app))
        );
        showToast(`Appointment #${appointmentId} updated to ${newStatus}!`);
        window.dispatchEvent(new Event("appointmentsUpdated"));
        window.dispatchEvent(new Event("storage"));
      } else {
        showToast("Failed to update status", "error");
      }
    } catch (err) {
      showToast("Network error updating status", "error");
    }
  };

  // KPIs
  const totalCount = appointments.length;
  const confirmedCount = appointments.filter(a => a.status === "CONFIRMED").length;
  const pendingCount = appointments.filter(a => a.status === "PENDING").length;
  const completedCount = appointments.filter(a => a.status === "COMPLETED").length;

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter(app => {
      const docId = app.doctor?.id;
      const matchesDoc = selectedDoctorFilter === "ALL" || String(docId) === String(selectedDoctorFilter);
      const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;

      const patientName = app.patient?.user?.name || app.patient?.name || "";
      const doctorName = app.doctor?.user?.name || "";
      const reason = app.reason || "";
      const date = app.appointmentDate || "";

      const matchesSearch =
        patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
        date.includes(searchQuery);

      return matchesDoc && matchesStatus && matchesSearch;
    });
  }, [appointments, selectedDoctorFilter, statusFilter, searchQuery]);

  const getBadgeStyle = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "COMPLETED":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "CANCELLED":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-3 animate-fadeInUp ${
          toast.type === "error" ? "bg-red-900 text-white border-red-700" : "bg-slate-900 text-white border-slate-800"
        }`}>
          {toast.type === "error" ? <AlertCircle size={18} className="text-red-400" /> : <CheckCircle2 size={18} className="text-emerald-400" />}
          <span className="text-xs font-semibold">{toast.msg}</span>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white ml-2">
            <X size={14} />
          </button>
        </div>
      )}

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white/70 border border-white/60 rounded-3xl p-5 shadow-sm backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Consultations</span>
            <span className="text-2xl font-black text-slate-900 block mt-1">{totalCount}</span>
            <span className="text-[11px] text-slate-500 font-semibold mt-0.5 block">Hospital-wide schedule</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <CalendarDays size={20} />
          </div>
        </div>

        <div className="bg-white/70 border border-white/60 rounded-3xl p-5 shadow-sm backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Confirmed Active</span>
            <span className="text-2xl font-black text-emerald-600 block mt-1">{confirmedCount}</span>
            <span className="text-[11px] text-slate-500 font-semibold mt-0.5 block">Ready for consultation</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="bg-white/70 border border-white/60 rounded-3xl p-5 shadow-sm backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Pending Review</span>
            <span className="text-2xl font-black text-amber-600 block mt-1">{pendingCount}</span>
            <span className="text-[11px] text-slate-500 font-semibold mt-0.5 block">Awaiting doctor confirmation</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <Clock size={20} />
          </div>
        </div>

        <div className="bg-white/70 border border-white/60 rounded-3xl p-5 shadow-sm backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Completed Visits</span>
            <span className="text-2xl font-black text-purple-600 block mt-1">{completedCount}</span>
            <span className="text-[11px] text-slate-500 font-semibold mt-0.5 block">Concluded clinical sessions</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
            <Stethoscope size={20} />
          </div>
        </div>

      </div>

      {/* Main Roster Table */}
      <div className="bg-white/70 border border-white/60 rounded-3xl shadow-sm backdrop-blur-md overflow-hidden">
        
        {/* Controls Bar: Doctor Filter + Status Filter + Search */}
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          
          <div>
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <CalendarDays size={18} className="text-blue-600" />
              <span>Central Hospital Appointment Roster</span>
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">
              Comprehensive schedule oversight across all clinical departments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search patient, doctor, date..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-800 font-semibold outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Doctor Filter (Admin exclusive control) */}
            <div className="relative">
              <select
                value={selectedDoctorFilter}
                onChange={(e) => setSelectedDoctorFilter(e.target.value)}
                className="border border-slate-200 bg-slate-50 rounded-xl py-2 px-3 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
              >
                <option value="ALL">All Doctors (Hospital Wide)</option>
                {doctors.map(doc => (
                  <option key={doc.id} value={doc.id}>
                    Dr. {doc.user?.name || `Doctor ${doc.id}`} ({doc.specialization})
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-200 bg-slate-50 rounded-xl py-2 px-3 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="ALL">All Status</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            <button
              onClick={fetchMasterSchedule}
              className="p-2 border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-600 transition cursor-pointer"
              title="Refresh master schedule"
            >
              <RefreshCw size={15} />
            </button>

          </div>

        </div>

        {/* Master Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-16 text-center text-slate-400 text-xs font-semibold animate-pulse">
              Loading hospital schedules...
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-xs font-semibold">
              No appointments matching the selected filters.
            </div>
          ) : (
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="bg-slate-50/60 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-100">
                  <th className="px-6 py-4">Slot Time & Date</th>
                  <th className="px-6 py-4">Assigned Specialist</th>
                  <th className="px-6 py-4">Patient Profile</th>
                  <th className="px-6 py-4">Clinical Concern</th>
                  <th className="px-6 py-4 text-center">Consultation Mode</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Admin Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredAppointments.map(app => {
                  const docName = app.doctor?.user?.name || "Specialist";
                  const patientName = app.patient?.user?.name || app.patient?.name || "Patient";
                  const isTele = app.appointmentType === "telehealth";

                  return (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition">
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-extrabold text-slate-900">{app.appointmentDate}</p>
                        <span className="text-[11px] text-blue-600 font-bold flex items-center gap-1 mt-0.5">
                          <Clock size={12} />
                          {app.startTime || "09:00 AM"}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 font-black flex items-center justify-center text-xs border border-blue-100">
                            {docName.replace("Dr. ", "").charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">Dr. {docName.replace("Dr. ", "")}</p>
                            <span className="text-[10px] text-slate-400 font-medium">{app.doctor?.specialization}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-bold text-slate-900">{patientName}</p>
                        <span className="text-[10px] text-slate-400 font-normal">{app.patient?.user?.email || "Patient Profile"}</span>
                      </td>

                      <td className="px-6 py-4 max-w-xs truncate font-medium text-slate-600">
                        {app.reason || "Routine Clinical Examination"}
                      </td>

                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
                          isTele
                            ? "bg-teal-50 text-teal-700 border-teal-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}>
                          {isTele ? <Video size={11} className="text-teal-600" /> : <MapPin size={11} className="text-blue-600" />}
                          <span>{isTele ? "Telehealth" : "In-Person"}</span>
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <div className="flex flex-col items-center gap-1">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide border ${getBadgeStyle(app.status)}`}>
                            {app.status}
                          </span>
                          {app.paymentStatus === "PAID" ? (
                            <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              ✓ Paid Online (₹{app.amountPaid || 1500})
                            </span>
                          ) : app.paymentStatus === "REFUNDED" ? (
                            <span className="text-[9px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                              ↩ 100% Refunded
                            </span>
                          ) : (
                            <span className="text-[9px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              💵 Pay at Clinic
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {app.status === "PENDING" && (
                            <button
                              onClick={() => handleAdminStatusChange(app.id, "CONFIRMED")}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg transition cursor-pointer"
                            >
                              Approve
                            </button>
                          )}
                          {app.status === "CONFIRMED" && (
                            <button
                              onClick={() => handleAdminStatusChange(app.id, "COMPLETED")}
                              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-lg transition cursor-pointer"
                            >
                              Complete
                            </button>
                          )}
                          {app.status !== "CANCELLED" && app.status !== "COMPLETED" && (
                            <button
                              onClick={() => handleAdminStatusChange(app.id, "CANCELLED")}
                              className="px-2 py-1 bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-600 font-bold text-[11px] rounded-lg transition cursor-pointer"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

      </div>

    </div>
  );
};

export default AdminSchedules;

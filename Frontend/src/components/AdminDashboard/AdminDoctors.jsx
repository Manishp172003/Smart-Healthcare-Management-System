import { useState, useEffect } from "react";
import {
  Stethoscope,
  Search,
  Plus,
  CheckCircle2,
  AlertTriangle,
  X,
  UserCheck,
  ShieldCheck,
  ShieldAlert,
  Trash2,
  Clock,
  Sparkles,
  Video,
  Award,
  DollarSign,
  Camera,
  Upload,
  Image as ImageIcon
} from "lucide-react";

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    password: "Doctor@123",
    specialization: "Cardiology",
    licenseNumber: "",
    consultationFee: 1500,
    education: "MBBS, MD (Medicine)",
    experience: "10+ Years",
    bio: "Senior Clinical Specialist at SmartHealth Medical Center",
    avatar: ""
  });

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        showToast("Image size must be less than 3MB", "error");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDoctor(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/doctors");
      if (res.ok) {
        const data = await res.json();
        setDoctors(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Error fetching doctors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:8080/api/doctors/${id}/status?status=${newStatus}`, {
        method: "PUT"
      });
      if (res.ok) {
        setDoctors(prev =>
          prev.map(d => (d.id === id ? { ...d, user: { ...d.user, status: newStatus } } : d))
        );
        showToast(`Doctor #${id} status updated to ${newStatus}!`);
      } else {
        showToast("Failed to update doctor status", "error");
      }
    } catch (err) {
      showToast("Network error updating status", "error");
    }
  };

  const handleDeleteDoctor = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove Dr. ${name} from the medical registry?`)) return;
    try {
      const res = await fetch(`http://localhost:8080/api/doctors/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setDoctors(prev => prev.filter(d => d.id !== id));
        showToast(`Dr. ${name} removed from registry.`);
      } else {
        showToast("Failed to delete doctor", "error");
      }
    } catch (err) {
      showToast("Network error deleting doctor", "error");
    }
  };

  const handleCreateDoctor = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDoctor)
      });
      if (res.ok) {
        const created = await res.json();
        setDoctors([created, ...doctors]);
        setIsAddModalOpen(false);
        setNewDoctor({
          name: "",
          email: "",
          password: "Doctor@123",
          specialization: "Cardiology",
          licenseNumber: "",
          consultationFee: 1500,
          education: "MBBS, MD (Medicine)",
          experience: "10+ Years",
          bio: "Senior Clinical Specialist at SmartHealth Medical Center",
          avatar: ""
        });
        showToast(`Dr. ${created.user?.name || "New Doctor"} successfully onboarded!`);
      } else {
        const errData = await res.json();
        showToast(errData.error || "Failed to onboard doctor", "error");
      }
    } catch (err) {
      showToast("Network error creating doctor", "error");
    }
  };

  const pendingDoctors = doctors.filter(d => d.user?.status === "PENDING_APPROVAL");
  const activeCount = doctors.filter(d => d.user?.status === "ACTIVE").length;

  const filteredDoctors = doctors.filter(d => {
    const name = d.user?.name || "";
    const spec = d.specialization || "";
    const license = d.licenseNumber || "";
    const status = d.user?.status || "ACTIVE";

    const matchesSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      spec.toLowerCase().includes(search.toLowerCase()) ||
      license.toLowerCase().includes(search.toLowerCase());

    const matchesSpec = filterSpecialty === "ALL" || spec === filterSpecialty;
    const matchesStatus = filterStatus === "ALL" || status === filterStatus;

    return matchesSearch && matchesSpec && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-3 animate-fadeInUp ${
          toast.type === "error" 
            ? "bg-red-900 text-white border-red-700" 
            : "bg-slate-900 text-white border-slate-800"
        }`}>
          {toast.type === "error" ? (
            <AlertTriangle size={18} className="text-red-400 shrink-0" />
          ) : (
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          )}
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
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Doctors</span>
            <span className="text-2xl font-black text-slate-900 block mt-1">{doctors.length}</span>
            <span className="text-[11px] text-slate-500 font-semibold mt-0.5 block">Hospital medical roster</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
            <Stethoscope size={20} />
          </div>
        </div>

        <div className="bg-white/70 border border-white/60 rounded-3xl p-5 shadow-sm backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Specialists</span>
            <span className="text-2xl font-black text-emerald-600 block mt-1">{activeCount}</span>
            <span className="text-[11px] text-slate-500 font-semibold mt-0.5 block">Verified & practicing</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <ShieldCheck size={20} />
          </div>
        </div>

        <div className="bg-white/70 border border-white/60 rounded-3xl p-5 shadow-sm backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Pending Approvals</span>
            <span className="text-2xl font-black text-amber-600 block mt-1">{pendingDoctors.length}</span>
            <span className="text-[11px] text-slate-500 font-semibold mt-0.5 block">Credentials review required</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <Clock size={20} />
          </div>
        </div>

        <div className="bg-white/70 border border-white/60 rounded-3xl p-5 shadow-sm backdrop-blur-md flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Telehealth Enabled</span>
            <span className="text-2xl font-black text-teal-600 block mt-1">
              {doctors.filter(d => d.supportsTelehealth).length}
            </span>
            <span className="text-[11px] text-slate-500 font-semibold mt-0.5 block">Virtual OPD ready</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
            <Video size={20} />
          </div>
        </div>

      </div>

      {/* Pending Approvals Alert Banner */}
      {pendingDoctors.length > 0 && (
        <div className="p-5 bg-amber-50/80 border border-amber-200/80 rounded-3xl space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <AlertTriangle size={18} className="text-amber-600" />
            <span>{pendingDoctors.length} Doctor Registration{pendingDoctors.length > 1 ? 's' : ''} Awaiting License Verification</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingDoctors.map(doc => (
              <div key={doc.id} className="p-4 bg-white rounded-2xl border border-amber-200/60 shadow-xs flex items-center justify-between">
                <div>
                  <h5 className="font-extrabold text-xs text-slate-900">Dr. {doc.user?.name}</h5>
                  <p className="text-[11px] text-slate-500">{doc.specialization} • License: <strong className="font-mono text-slate-700">{doc.licenseNumber}</strong></p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{doc.user?.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusUpdate(doc.id, "ACTIVE")}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(doc.id, "SUSPENDED")}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Directory & Controls */}
      <div className="bg-white/70 border border-white/60 rounded-3xl shadow-sm backdrop-blur-md overflow-hidden">
        
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search doctors by name or license..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-slate-200 bg-slate-50 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-800 font-semibold outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-slate-200 bg-slate-50 rounded-xl py-2 px-3 text-xs font-bold text-slate-700 outline-none"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="PENDING_APPROVAL">Pending Verification</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer self-stretch sm:self-auto justify-center"
          >
            <Plus size={16} />
            <span>Onboard New Doctor</span>
          </button>

        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-16 text-center text-slate-400 text-xs font-semibold animate-pulse">
              Loading medical directory...
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-xs font-semibold">
              No doctors matching criteria.
            </div>
          ) : (
            <table className="w-full min-w-[750px] text-left">
              <thead>
                <tr className="bg-slate-50/60 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-100">
                  <th className="px-6 py-4">Practitioner</th>
                  <th className="px-6 py-4">Specialization</th>
                  <th className="px-6 py-4">License ID</th>
                  <th className="px-6 py-4">Consultation Fee</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredDoctors.map(doc => {
                  const status = doc.user?.status || "ACTIVE";
                  const name = doc.user?.name || "Doctor";
                  return (
                    <tr key={doc.id} className="hover:bg-slate-50/50 transition">
                      
                      <td className="px-6 py-4 flex items-center gap-3 font-bold text-slate-900">
                        {doc.avatar ? (
                          <img
                            src={doc.avatar}
                            alt={name}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200/80 shadow-xs shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-600 text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
                            {name.replace("Dr. ", "").charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="leading-tight">Dr. {name.replace("Dr. ", "")}</p>
                          <span className="text-[10px] text-slate-400 font-normal">{doc.user?.email}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-semibold text-slate-700">
                        <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100/70 font-bold text-[11px]">
                          {doc.specialization}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-mono font-bold text-slate-600">
                        {doc.licenseNumber}
                      </td>

                      <td className="px-6 py-4 font-bold text-slate-800">
                        ₹{doc.consultationFee}
                      </td>

                      <td className="px-6 py-4 font-bold text-amber-600">
                        ★ {doc.rating ? doc.rating.toFixed(1) : "4.9"}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide border ${
                          status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : status === "PENDING_APPROVAL"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}>
                          {status.replace("_", " ")}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {status === "ACTIVE" ? (
                            <button
                              onClick={() => handleStatusUpdate(doc.id, "SUSPENDED")}
                              title="Suspend Doctor"
                              className="p-1.5 bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-700 rounded-lg transition cursor-pointer"
                            >
                              <ShieldAlert size={14} />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusUpdate(doc.id, "ACTIVE")}
                              title="Activate Doctor"
                              className="p-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 rounded-lg transition cursor-pointer"
                            >
                              <ShieldCheck size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteDoctor(doc.id, name)}
                            title="Remove from Registry"
                            className="p-1.5 bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 rounded-lg transition cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
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

      {/* Onboard New Doctor Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            
            <div className="p-5 bg-gradient-to-r from-blue-600 to-teal-600 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <Stethoscope size={20} />
                <div>
                  <h4 className="font-bold text-base">Onboard Medical Practitioner</h4>
                  <p className="text-[11px] text-blue-100">Add a certified physician to the hospital roster</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateDoctor} className="flex-1 flex flex-col overflow-hidden">
              
              <div className="p-6 overflow-y-auto space-y-4 text-xs">
                
                {/* Doctor Professional Portrait Photo Upload */}
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative group shrink-0">
                    {newDoctor.avatar ? (
                      <img
                        src={newDoctor.avatar}
                        alt="Doctor Preview"
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-sm"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50 border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
                        <Camera size={20} className="text-slate-400" />
                        <span className="text-[9px] font-bold mt-1 text-slate-400">No Photo</span>
                      </div>
                    )}
                    <label 
                      htmlFor="doctor-avatar-input"
                      className="absolute -bottom-1 -right-1 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm cursor-pointer transition"
                      title="Upload headshot"
                    >
                      <Upload size={12} />
                      <input
                        id="doctor-avatar-input"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-1">
                    <p className="font-extrabold text-xs text-slate-800">Doctor Professional Headshot</p>
                    <p className="text-[11px] text-slate-500 font-medium">Upload physician photo (JPG, PNG, max 3MB).</p>
                    {newDoctor.avatar && (
                      <button
                        type="button"
                        onClick={() => setNewDoctor({ ...newDoctor, avatar: "" })}
                        className="text-[10px] font-bold text-rose-600 hover:text-rose-700 bg-transparent border-none cursor-pointer"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Doctor Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Verma"
                      value={newDoctor.name}
                      onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Official Email</label>
                    <input
                      type="email"
                      required
                      placeholder="doctor@smarthealth.com"
                      value={newDoctor.email}
                      onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Specialization</label>
                    <select
                      value={newDoctor.specialization}
                      onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
                    >
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="General Medicine">General Medicine</option>
                      <option value="Gynecology">Gynecology</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Medical License ID</label>
                    <input
                      type="text"
                      required
                      placeholder="MCI-984210"
                      value={newDoctor.licenseNumber}
                      onChange={(e) => setNewDoctor({ ...newDoctor, licenseNumber: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Consultation Fee (₹)</label>
                    <input
                      type="number"
                      min="100"
                      step="50"
                      required
                      value={newDoctor.consultationFee}
                      onChange={(e) => setNewDoctor({ ...newDoctor, consultationFee: parseInt(e.target.value) || 0 })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Experience</label>
                    <input
                      type="text"
                      placeholder="12+ Years"
                      value={newDoctor.experience}
                      onChange={(e) => setNewDoctor({ ...newDoctor, experience: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Qualifications</label>
                  <input
                    type="text"
                    placeholder="MBBS, MD, FACC"
                    value={newDoctor.education}
                    onChange={(e) => setNewDoctor({ ...newDoctor, education: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-800 outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-200 transition cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold shadow-md transition cursor-pointer text-xs"
                >
                  Confirm & Provision Doctor
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

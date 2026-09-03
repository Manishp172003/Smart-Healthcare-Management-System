import { useState, useEffect } from "react";
import { 
  Star, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Filter, 
  MessageSquareQuote,
  Search,
  Check,
  AlertCircle
} from "lucide-react";
import { 
  getTestimonials, 
  getModerationMode, 
  setModerationMode, 
  updateReviewStatus, 
  toggleReviewFeature, 
  deleteReview 
} from "../../utils/testimonialsService";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [mode, setMode] = useState("manual");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionSuccess, setActionSuccess] = useState(null);

  const loadData = () => {
    setTestimonials(getTestimonials());
    setMode(getModerationMode());
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener("testimonialsUpdated", handleUpdate);
    window.addEventListener("testimonialsModeChanged", handleUpdate);
    return () => {
      window.removeEventListener("testimonialsUpdated", handleUpdate);
      window.removeEventListener("testimonialsModeChanged", handleUpdate);
    };
  }, []);

  const handleModeToggle = (newMode) => {
    setModerationMode(newMode);
    setMode(newMode);
    setActionSuccess(`Moderation mode switched to ${newMode === "auto" ? "⚡ Auto-Accept" : "🛡️ Manual Review"}`);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const handleApprove = (id) => {
    updateReviewStatus(id, "APPROVED");
    setActionSuccess("Testimonial approved & published to homepage!");
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleReject = (id) => {
    updateReviewStatus(id, "REJECTED");
    setActionSuccess("Testimonial rejected from public publication.");
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleToggleFeature = (id) => {
    toggleReviewFeature(id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient review?")) {
      deleteReview(id);
      setActionSuccess("Review deleted successfully.");
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  // Metrics
  const totalCount = testimonials.length;
  const approvedCount = testimonials.filter(t => t.status === "APPROVED").length;
  const pendingCount = testimonials.filter(t => t.status === "PENDING").length;
  const averageRating = totalCount > 0 
    ? (testimonials.reduce((acc, t) => acc + (t.rating || 5), 0) / totalCount).toFixed(1) 
    : "5.0";

  // Filtered List
  const filteredTestimonials = testimonials.filter(t => {
    const matchesStatus = filterStatus === "ALL" || t.status === filterStatus;
    const matchesSearch = 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.doctorName && t.doctorName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">

      {/* Toast Feedback */}
      {actionSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white border border-slate-700 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 size={16} className="text-teal-400" />
          <span className="text-xs font-bold">{actionSuccess}</span>
        </div>
      )}

      {/* Top Banner: Moderation Mode Switcher */}
      <div className="bg-white/80 border border-white/60 rounded-[28px] p-6 shadow-xs backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#0D9488] flex items-center justify-center text-white shadow-sm shrink-0">
              <MessageSquareQuote size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg md:text-xl font-black text-slate-900 leading-tight">
                  Patient Reviews & Testimonials Moderation
                </h2>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  mode === "auto" 
                    ? "bg-amber-100 text-amber-700 border border-amber-200" 
                    : "bg-teal-100 text-teal-800 border border-teal-200"
                }`}>
                  {mode === "auto" ? "⚡ Auto-Accept Mode" : "🛡️ Manual Review Active"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
                Control how patient care testimonials appear on the public homepage. Choose between instant publication or administrative verification.
              </p>
            </div>
          </div>

          {/* Mode Switcher Toggle Pill */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/80 shrink-0">
            <button
              onClick={() => handleModeToggle("manual")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                mode === "manual"
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <ShieldCheck size={15} className={mode === "manual" ? "text-[#0D9488]" : ""} />
              <span>Manual Approval</span>
            </button>

            <button
              onClick={() => handleModeToggle("auto")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                mode === "auto"
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Zap size={15} className={mode === "auto" ? "text-amber-500" : ""} />
              <span>Auto-Accept</span>
            </button>
          </div>

        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-white/80 border border-white/60 rounded-2xl p-5 shadow-xs backdrop-blur-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Reviews</span>
          <span className="text-2xl font-black text-slate-800 block mt-2">{totalCount}</span>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5 block">Hospital wide</span>
        </div>

        <div className="bg-white/80 border border-white/60 rounded-2xl p-5 shadow-xs backdrop-blur-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Approved & Live</span>
          <span className="text-2xl font-black text-emerald-700 block mt-2">{approvedCount}</span>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5 block">Published on homepage</span>
        </div>

        <div className="bg-white/80 border border-white/60 rounded-2xl p-5 shadow-xs backdrop-blur-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Pending Review</span>
          <span className="text-2xl font-black text-amber-700 block mt-2">{pendingCount}</span>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5 block">Awaiting sign-off</span>
        </div>

        <div className="bg-white/80 border border-white/60 rounded-2xl p-5 shadow-xs backdrop-blur-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Average Rating</span>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-2xl font-black text-slate-800">{averageRating}</span>
            <div className="flex items-center text-amber-400">
              <Star size={18} className="fill-amber-400" />
            </div>
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5 block">5.0 Star scale</span>
        </div>

      </div>

      {/* Moderation Queue & Filter Row */}
      <div className="bg-white/80 border border-white/60 rounded-[28px] p-6 shadow-xs backdrop-blur-md space-y-5">
        
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/50 pb-5">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80 overflow-x-auto">
            {["ALL", "PENDING", "APPROVED", "REJECTED"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  filterStatus === st
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {st === "ALL" && `All (${totalCount})`}
                {st === "PENDING" && `Pending (${pendingCount})`}
                {st === "APPROVED" && `Live (${approvedCount})`}
                {st === "REJECTED" && `Rejected`}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search patient, quote, doctor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3.5 text-slate-800 outline-none focus:bg-white focus:border-[#0D9488] transition"
            />
          </div>

        </div>

        {/* Testimonials List */}
        {filteredTestimonials.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            No testimonials match the current filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTestimonials.map((item) => {
              const isPending = item.status === "PENDING";
              const isApproved = item.status === "APPROVED";
              const isRejected = item.status === "REJECTED";

              return (
                <div 
                  key={item.id}
                  className={`rounded-2xl p-5 border transition duration-200 flex flex-col justify-between ${
                    isPending 
                      ? "bg-amber-50/40 border-amber-200" 
                      : isRejected 
                      ? "bg-slate-50 border-slate-200 opacity-65" 
                      : "bg-white border-slate-200/80 shadow-xs"
                  }`}
                >
                  <div>
                    {/* Top row: Patient Profile & Status Badge */}
                    <div className="flex items-start justify-between gap-3">
                      
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-xs" 
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#0D9488] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                            {item.name.charAt(0)}
                          </div>
                        )}

                        <div>
                          <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                            {item.name}
                          </h4>
                          <span className="text-[11px] text-slate-500 font-medium block">
                            {item.role} • {item.doctorName || "General Care"}
                          </span>
                        </div>
                      </div>

                      {/* Status badge */}
                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        isApproved
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : isPending
                          ? "bg-amber-100 text-amber-800 border border-amber-200 animate-pulse"
                          : "bg-red-100 text-red-700 border border-red-200"
                      }`}>
                        {item.status}
                      </span>

                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mt-3">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={14}
                          className={s <= item.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}
                        />
                      ))}
                      <span className="text-[11px] font-bold text-slate-500 ml-1.5">{item.rating}.0 / 5.0</span>
                    </div>

                    {/* Review Quote */}
                    <p className="text-xs text-slate-700 italic mt-3 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                      "{item.text}"
                    </p>
                  </div>

                  {/* Bottom Action Row */}
                  <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100">
                    
                    {/* Feature Pin Button */}
                    <button
                      onClick={() => handleToggleFeature(item.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                        item.featured 
                          ? "bg-amber-100 text-amber-800 border border-amber-200" 
                          : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                      }`}
                      title={item.featured ? "Featured on Homepage" : "Click to pin to homepage"}
                    >
                      <Sparkles size={13} className={item.featured ? "text-amber-500 fill-amber-500" : ""} />
                      <span>{item.featured ? "Featured" : "Pin"}</span>
                    </button>

                    {/* Status update buttons */}
                    <div className="flex items-center gap-2">
                      {!isApproved && (
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition cursor-pointer"
                        >
                          <Check size={13} />
                          <span>Approve</span>
                        </button>
                      )}

                      {!isRejected && (
                        <button
                          onClick={() => handleReject(item.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition cursor-pointer border border-red-200"
                        >
                          <XCircle size={13} />
                          <span>Reject</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};

export default AdminTestimonials;

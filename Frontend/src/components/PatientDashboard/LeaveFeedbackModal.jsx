import { useState } from "react";
import { Star, X, CheckCircle2, ShieldCheck, HeartPulse, Send } from "lucide-react";
import { submitReview } from "../../utils/testimonialsService";

const RATING_LABELS = {
  1: "Needs Improvement",
  2: "Fair Care Experience",
  3: "Good & Helpful",
  4: "Very Satisfied",
  5: "Exceptional Healthcare"
};

const LeaveFeedbackModal = ({ isOpen, onClose, doctors = [], onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [patientRole, setPatientRole] = useState("Consultation Patient");
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  if (!isOpen) return null;

  const currentPatientName = localStorage.getItem("name") || "Verified Patient";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    const result = submitReview({
      patientName: currentPatientName,
      patientRole: patientRole || "Verified Patient",
      rating,
      text: feedbackText,
      doctorName: selectedDoctor || "SmartHealth Medical Staff"
    });

    setSubmitResult(result);
    setIsSubmitted(true);
    if (onSuccess) onSuccess(result);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setSubmitResult(null);
    setFeedbackText("");
    setRating(5);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-[28px] border border-slate-100 shadow-[0_24px_60px_rgba(15,23,42,0.12)] w-full max-w-lg overflow-hidden relative">
        
        {/* Header gradient banner */}
        <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0D9488] p-6 text-white relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#0D9488] flex items-center justify-center text-white shadow-sm border border-white/20">
              <HeartPulse size={22} />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white leading-tight">Rate Your Care Experience</h3>
              <p className="text-xs text-teal-200 mt-0.5">Your voice helps our clinical team maintain excellence</p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-500 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-slate-900">Thank You, {currentPatientName}!</h4>
                <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                  {submitResult?.isAutoApproved
                    ? "Your review has been verified and published immediately to our hospital homepage testimonials carousel!"
                    : "Your review has been submitted to hospital administration for verification and will appear on the public website once approved."}
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer"
                >
                  Done & Return to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 text-center">
                  Overall Consultation Rating
                </label>
                <div className="flex items-center justify-center gap-2 py-2">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const isFilled = (hoverRating || rating) >= starVal;
                    return (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setRating(starVal)}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-125 cursor-pointer focus:outline-none"
                      >
                        <Star
                          size={32}
                          className={`transition-colors duration-150 ${
                            isFilled ? "fill-amber-400 text-amber-400 drop-shadow-xs" : "text-slate-200"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="text-center">
                  <span className="text-xs font-extrabold text-[#0D9488] bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                    {RATING_LABELS[hoverRating || rating]}
                  </span>
                </div>
              </div>

              {/* Specialist Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Attending Specialist (Optional)
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] outline-none transition"
                >
                  <option value="">General Hospital Staff / Comprehensive Care</option>
                  {doctors && doctors.map((doc) => (
                    <option key={doc.id} value={doc.user?.name || `Dr. Specialist #${doc.id}`}>
                      {doc.user?.name} ({doc.specialization})
                    </option>
                  ))}
                </select>
              </div>

              {/* Patient Category Tag */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Patient Category / Department
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cardiology Patient, Outpatient Care, Mother of 2"
                  value={patientRole}
                  onChange={(e) => setPatientRole(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] outline-none transition"
                />
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Your Testimonial / Care Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share how your doctor or clinic experience went. What made your care comfortable and supportive?"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-800 focus:bg-white focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488] outline-none transition resize-none leading-relaxed"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#0D9488] hover:from-blue-700 hover:to-teal-700 text-xs font-bold text-white shadow-md hover:shadow-lg transition cursor-pointer flex items-center gap-1.5"
                >
                  <Send size={14} />
                  <span>Submit Testimonial</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default LeaveFeedbackModal;

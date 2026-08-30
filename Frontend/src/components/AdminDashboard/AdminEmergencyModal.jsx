import { motion, AnimatePresence } from "framer-motion";
import { Siren, X, Lock, Radio, ShieldAlert } from "lucide-react";

const AdminEmergencyModal = ({ isOpen, onClose, showToast }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ 
                scale: 1, 
                y: 0, 
                opacity: 1,
                transition: { 
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }
              }}
              exit={{ 
                scale: 0.95, 
                y: 20, 
                opacity: 0,
                transition: { duration: 0.2 }
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white border border-red-100 rounded-[32px] shadow-[0_32px_80px_rgba(239,68,68,0.15)] overflow-hidden p-6 md:p-8"
            >
              
              {/* Glow Accent */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#EA4335] via-[#EAB308] to-[#EA4335] animate-pulse" />

              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-xl transition cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Icon & Title */}
              <div className="flex flex-col items-center text-center mt-4">
                
                {/* Pulse Siren Icon */}
                <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 text-red-500 mb-5">
                  <div className="absolute inset-0 rounded-2xl bg-red-500/20 animate-ping" />
                  <Siren size={32} className="relative z-10" />
                </div>

                <h3 className="text-xl md:text-2xl font-black text-slate-800">
                  SYSTEM EMERGENCY ACTUATION
                </h3>
                
                <p className="text-slate-500 text-xs md:text-sm max-w-sm mt-2 leading-relaxed">
                  You are about to initiate critical clinical security procedures. Please select an emergency action to broadcast.
                </p>

              </div>

              {/* Alert Warning Box */}
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mt-6 flex items-start gap-3">
                <ShieldAlert size={20} className="text-[#EA4335] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-black text-[#EA4335] text-xs uppercase tracking-wider">
                    Administrative Action Required
                  </span>
                  <span className="block text-red-700/80 text-[11px] font-medium leading-relaxed mt-1">
                    Activating locks or broadcasts will log this session ID under HIPAA regulatory guidelines and notify clinical heads.
                  </span>
                </div>
              </div>

              {/* Actions Grid */}
              <div className="grid grid-cols-1 gap-3.5 mt-6">
                
                <button 
                  onClick={() => {
                    showToast("PROTOCOL INITIATED: Facilities lockdown deployment started.", "error");
                    onClose();
                  }}
                  className="flex items-center justify-between gap-3 w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-2xl p-4 font-extrabold text-sm border-none cursor-pointer transition-transform hover:-translate-y-px active:translate-y-0"
                >
                  <span className="flex items-center gap-3">
                    <Lock size={18} />
                    Lock Down Facility Gates
                  </span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded uppercase font-black tracking-wider">Deploy</span>
                </button>

                <button 
                  onClick={() => {
                    showToast("BROADCAST SENT: Clinicians and active staff alerted.", "warning");
                    onClose();
                  }}
                  className="flex items-center justify-between gap-3 w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl p-4 font-extrabold text-sm border-none cursor-pointer transition-transform hover:-translate-y-px active:translate-y-0"
                >
                  <span className="flex items-center gap-3">
                    <Radio size={18} className="text-amber-400" />
                    Broadcast Clinic Broadcasts
                  </span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded uppercase font-black tracking-wider">Send</span>
                </button>

              </div>

              {/* Cancel Button */}
              <div className="flex justify-center mt-5">
                <button 
                  onClick={onClose}
                  className="text-xs font-extrabold text-slate-500 hover:text-slate-800 hover:underline bg-transparent border-none cursor-pointer"
                >
                  Abort Critical Protocol
                </button>
              </div>

            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdminEmergencyModal;

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, HelpCircle, LogOut, ShieldAlert, X } from "lucide-react";

const CustomConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?", 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  type = "info" // info, danger, warning
}) => {
  
  // Custom styling based on modal type
  let colorTheme = {
    bg: "bg-blue-50 text-[#2563EB]",
    icon: LogOut,
    btn: "bg-gradient-to-r from-[#2563EB] to-[#0D9488] hover:from-[#1D4ED8] hover:to-[#0F766E] shadow-blue-500/20"
  };

  if (type === "danger") {
    colorTheme = {
      bg: "bg-red-50 text-[#EA4335]",
      icon: ShieldAlert,
      btn: "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 shadow-red-500/20"
    };
  } else if (type === "warning") {
    colorTheme = {
      bg: "bg-amber-50 text-amber-600",
      icon: AlertCircle,
      btn: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20"
    };
  }

  const Icon = colorTheme.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0F172A]/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
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
              y: 15, 
              opacity: 0,
              transition: { duration: 0.2 }
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white border border-slate-100/80 rounded-[32px] shadow-[0_24px_60px_rgba(15,23,42,0.12)] overflow-hidden p-6 md:p-8 z-10"
          >
            {/* Close Cross */}
            <button 
              onClick={onClose}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-xl transition cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Content Row */}
            <div className="flex flex-col items-center text-center mt-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorTheme.bg}`}>
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight leading-snug">
                {title}
              </h3>
              <p className="text-slate-500 text-xs md:text-sm mt-2 leading-relaxed max-w-xs">
                {message}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={onClose}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold text-xs cursor-pointer transition border-none"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className={`w-full py-3 text-white rounded-2xl font-black text-xs cursor-pointer transition border-none shadow-md ${colorTheme.btn}`}
              >
                {confirmText}
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CustomConfirmModal;

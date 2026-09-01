import React, { useState, useEffect, useRef } from "react";
import { Siren, ShieldAlert, X, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EmergencyModal = ({ isOpen, onClose, onConfirm }) => {
  const [countdown, setCountdown] = useState(3);
  const [isSending, setIsSending] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCountdown(3);
      setIsSending(false);
      // Start the 3-second countdown
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleTrigger();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isOpen]);

  const handleCancel = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    onClose();
  };

  const handleTrigger = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsSending(true);

    // Retrieve patient GPS coordinates via browser Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onConfirm({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("Geolocation access failed, falling back to Nagoya center coords.", error);
          // Nagoya or Nagpur mock coordinates fallback
          onConfirm({
            latitude: 21.1458,
            longitude: 79.0882,
          });
        },
        { timeout: 5000 }
      );
    } else {
      // Fallback if browser doesn't support geolocation
      onConfirm({
        latitude: 21.1458,
        longitude: 79.0882,
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancel}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Flash Warning Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-md overflow-hidden rounded-[32px] bg-slate-900 border border-red-500/30 p-8 text-center text-white shadow-2xl shadow-red-950/20"
          >
            {/* Blinking Red Beacon Ring */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.12)_0%,transparent_70%)] pointer-events-none animate-pulse" />

            {/* Header Close button */}
            <button 
              onClick={handleCancel}
              className="absolute right-6 top-6 rounded-full bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition cursor-pointer border-none"
            >
              <X size={16} />
            </button>

            {/* Emergency Animated Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 border-2 border-red-500/40 relative">
              <Siren size={36} className="text-red-500 animate-bounce" />
              <span className="absolute -inset-2 rounded-full border border-red-500/30 animate-ping opacity-60" />
            </div>

            {/* Header Titles */}
            <div className="mt-6 space-y-2">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-red-500 flex items-center justify-center gap-2">
                <ShieldAlert size={24} />
                EMERGENCY ALERT
              </h2>
              <p className="text-xs text-slate-400 font-medium px-4">
                This will instantly notify the on-duty clinical team, ambulance desk, and transmit your current medical profile.
              </p>
            </div>

            {/* Countdown / Dispatching progress */}
            <div className="my-8 flex justify-center items-center">
              {isSending ? (
                <div className="flex flex-col items-center gap-3">
                  <Radio className="w-12 h-12 text-red-500 animate-pulse" />
                  <span className="text-sm font-extrabold tracking-widest text-red-400 animate-pulse">DISPATCHING HELP...</span>
                </div>
              ) : (
                <div className="relative flex items-center justify-center h-28 w-28 rounded-full border-4 border-red-500/20">
                  {/* Flashing Countdown digits */}
                  <span className="text-5xl font-black text-white leading-none">
                    {countdown}
                  </span>
                  {/* Countdown circle border animation */}
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle 
                      cx="56" cy="56" r="52" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      fill="transparent" 
                      className="text-red-500"
                      strokeDasharray="326.7"
                      strokeDashoffset={326.7 - (326.7 * countdown) / 3}
                      style={{ transition: "stroke-dashoffset 1s linear" }}
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Button Actions */}
            <div className="flex flex-col gap-3">
              {!isSending && (
                <button
                  onClick={handleTrigger}
                  className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-500/40 hover:-translate-y-0.5 cursor-pointer border-none"
                >
                  Send Immediately
                </button>
              )}
              
              <button
                onClick={handleCancel}
                className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-bold text-sm transition-all duration-300 cursor-pointer border border-white/10"
              >
                Cancel Alert
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EmergencyModal;

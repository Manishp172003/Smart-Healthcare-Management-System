import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X, Siren } from "lucide-react";
import AdminSidebar from "../components/AdminDashboard/AdminSidebar";
import AdminHeader from "../components/AdminDashboard/AdminHeader";
import AdminHome from "../components/AdminDashboard/AdminHome";
import AdminDoctors from "../components/AdminDashboard/AdminDoctors";
import AdminPatients from "../components/AdminDashboard/AdminPatients";
import AdminSchedules from "../components/AdminDashboard/AdminSchedules";
import AdminRecords from "../components/AdminDashboard/AdminRecords";
import AdminAnalytics from "../components/AdminDashboard/AdminAnalytics";
import AdminHelp from "../components/AdminDashboard/AdminHelp";
import AdminTestimonials from "../components/AdminDashboard/AdminTestimonials";
import AdminEmergencyModal from "../components/AdminDashboard/AdminEmergencyModal";
import CustomConfirmModal from "../components/common/CustomConfirmModal";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isSignOutConfirmOpen, setIsSignOutConfirmOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem("smarthealth_admin_sidebar_collapsed") === "true";
    } catch {
      return false;
    }
  });

  const handleToggleCollapse = (val) => {
    setIsSidebarCollapsed(val);
    try {
      localStorage.setItem("smarthealth_admin_sidebar_collapsed", String(val));
    } catch {}
  };

  useEffect(() => {
    document.title = `${activeTab} • Admin Operations | SmartHealth`;
  }, [activeTab]);

  // Synthesize alarm sound tone using Web Audio API
  const playAlarmSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); 
      gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
      
      setTimeout(() => {
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(1046.50, audioCtx.currentTime); 
        gain2.gain.setValueAtTime(0.5, audioCtx.currentTime);
        osc2.start();
        osc2.stop(audioCtx.currentTime + 0.3);
      }, 180);
    } catch (err) {
      console.warn("AudioContext tone failed", err);
    }
  };

  useEffect(() => {
    // 1. Retrieve current active alerts
    const fetchActiveAlerts = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/emergencies/active");
        if (res.ok) {
          const data = await res.json();
          setActiveAlerts(data);
        }
      } catch (err) {
        console.error("Error fetching active emergencies:", err);
      }
    };
    fetchActiveAlerts();

    // 2. Subscribe to real-time events channel
    const eventSource = new EventSource("http://localhost:8080/api/emergencies/subscribe");
    
    eventSource.addEventListener("emergency-alert", (event) => {
      try {
        const alert = JSON.parse(event.data);
        setActiveAlerts((prev) => {
          const exists = prev.some((a) => a.id === alert.id);
          if (alert.status === "RESOLVED") {
            return prev.filter((a) => a.id !== alert.id);
          }
          
          if (exists) {
            return prev.map((a) => a.id === alert.id ? alert : a);
          } else {
            playAlarmSound();
            showToast(`🚨 CRITICAL EMERGENCY: Triggered by Patient ${alert.patient?.user?.name || "User"}`, "error");
            return [alert, ...prev];
          }
        });
      } catch (err) {
        console.error("Error parsing SSE payload:", err);
      }
    });

    eventSource.onerror = (err) => {
      console.warn("SSE stream error, retrying...", err);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleUpdateAlertStatus = async (alertId, nextStatus) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:8080/api/emergencies/${alertId}/status?status=${nextStatus}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        showToast(`Alert status updated to ${nextStatus}`, "success");
      } else {
        alert("Failed to update emergency status.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const showToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]/80 flex relative overflow-hidden z-0">
      
      {/* Dynamic View Transitions */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes viewFadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-view-fade-in-up {
          animation: viewFadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* Background Glow Blobs */}
      <div className="absolute top-[8%] right-[12%] w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-[#2563EB]/8 to-[#0D9488]/8 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[20%] w-[420px] h-[420px] rounded-full bg-[#0D9488]/6 blur-[120px] pointer-events-none -z-10" />

      {/* Sidebar Navigation */}
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onEmergencyTrigger={() => setIsEmergencyModalOpen(true)}
        onSignOutTrigger={() => setIsSignOutConfirmOpen(true)}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={handleToggleCollapse}
      />

      {/* Mobile Drawer Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)} 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-30 md:hidden"
        />
      )}

      {/* Main Content Pane */}
      <main className={`min-h-screen flex-1 transition-all duration-300 overflow-x-hidden ${
        isSidebarCollapsed ? "md:pl-20" : "md:pl-64"
      }`}>
        <div className="p-6 md:p-10 w-full max-w-[1440px] mx-auto">

          {/* Header */}
          <AdminHeader 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onToggleMobileMenu={() => setIsMobileSidebarOpen(prev => !prev)}
          />

          {/* View Router */}
          <div className="mt-8 relative min-h-[500px]">
            {activeTab === "Dashboard" && (
              <div className="animate-view-fade-in-up">
                <AdminHome />
              </div>
            )}
            {activeTab === "Doctors" && (
              <div className="animate-view-fade-in-up">
                <AdminDoctors />
              </div>
            )}
            {activeTab === "Patients" && (
              <div className="animate-view-fade-in-up">
                <AdminPatients />
              </div>
            )}
            {activeTab === "Schedules" && (
              <div className="animate-view-fade-in-up">
                <AdminSchedules />
              </div>
            )}
            {activeTab === "Medical Records" && (
              <div className="animate-view-fade-in-up">
                <AdminRecords />
              </div>
            )}
            {activeTab === "Testimonials" && (
              <div className="animate-view-fade-in-up">
                <AdminTestimonials />
              </div>
            )}
            {activeTab === "Analytics" && (
              <div className="animate-view-fade-in-up">
                <AdminAnalytics />
              </div>
            )}
            {activeTab === "Help Center" && (
              <div className="animate-view-fade-in-up">
                <AdminHelp />
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Emergency Animated Alert Modal */}
      <AdminEmergencyModal 
        isOpen={isEmergencyModalOpen} 
        onClose={() => setIsEmergencyModalOpen(false)} 
        showToast={showToast}
      />

      {/* Custom Sign Out Confirmation Modal */}
      <CustomConfirmModal 
        isOpen={isSignOutConfirmOpen} 
        onClose={() => setIsSignOutConfirmOpen(false)} 
        onConfirm={() => {
          setIsSignOutConfirmOpen(false);
          window.location.href = "/admin/login";
        }}
        title="Sign Out Session"
        message="Are you sure you want to end your administrative session? You will be redirected to the admin login portal."
        confirmText="Yes, Sign Out"
        cancelText="Cancel"
      />

      {/* Real-time Emergency Roster Overlay */}
      {activeAlerts.length > 0 && (
        <div className="fixed bottom-6 right-6 z-[99998] w-full max-w-sm space-y-3 pointer-events-auto">
          <AnimatePresence>
            {activeAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                className="bg-slate-900 border border-red-500 rounded-[24px] p-5 shadow-[0_20px_50px_rgba(239,68,68,0.15)] text-white relative overflow-hidden"
              >
                {/* Pulsing warning beacon line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-red-500 animate-pulse" />
                
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0 animate-pulse mt-0.5">
                    <Siren size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block font-black text-red-400 text-[10px] uppercase tracking-wider">
                      Patient Emergency Alert
                    </span>
                    <span className="block font-black text-slate-100 text-sm mt-1">
                      {alert.patient?.user?.name || "Patient"}
                    </span>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed font-medium">
                      {alert.medicalSummary}
                    </p>
                    <span className="block text-slate-500 text-[10px] font-bold mt-2">
                      Coordinates: {alert.latitude.toFixed(4)}, {alert.longitude.toFixed(4)}
                    </span>
                    
                    {/* Google maps Navigation redirect link */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${alert.latitude},${alert.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-400 font-bold hover:text-blue-300 hover:underline mt-2.5 transition"
                    >
                      Open Location in Maps ↗
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2.5 mt-4 border-t border-white/5 pt-3.5">
                  {alert.status === "TRIGGERED" && (
                    <button
                      onClick={() => handleUpdateAlertStatus(alert.id, "DISPATCHED")}
                      className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-[10px] uppercase tracking-wider transition border-none cursor-pointer"
                    >
                      Dispatch Ambulance
                    </button>
                  )}
                  {alert.status === "DISPATCHED" && (
                    <button
                      onClick={() => handleUpdateAlertStatus(alert.id, "RESOLVED")}
                      className="flex-1 py-2.5 rounded-xl bg-[#0D9488] hover:bg-teal-500 text-white font-extrabold text-[10px] uppercase tracking-wider transition border-none cursor-pointer"
                    >
                      Resolve Emergency
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Floating Toast Notification Container */}
      <div className="fixed top-6 right-6 z-[99999] flex flex-col gap-3 pointer-events-none w-full max-w-sm">
        <AnimatePresence>
          {toasts.map((toast) => {
            let bgClass = "bg-white/95 border-slate-100/80 shadow-slate-200/50 text-slate-800";
            let iconColor = "text-[#2563EB] bg-blue-100/50";
            let Icon = Info;
            
            if (toast.type === "success") {
              bgClass = "bg-[#ECFDF5]/95 border-[#A7F3D0]/80 shadow-[#10B981]/10 text-emerald-950";
              iconColor = "text-emerald-600 bg-emerald-100/50";
              Icon = CheckCircle2;
            } else if (toast.type === "error") {
              bgClass = "bg-[#FEF2F2]/95 border-[#FEE2E2]/80 shadow-[#EF4444]/10 text-red-950";
              iconColor = "text-[#EA4335] bg-red-50";
              Icon = AlertCircle;
            } else if (toast.type === "warning") {
              bgClass = "bg-[#FFFBEB]/95 border-[#FEF3C7]/80 shadow-[#F59E0B]/10 text-amber-950";
              iconColor = "text-amber-600 bg-amber-100/50";
              Icon = AlertTriangle;
            }

            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: -20, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: 30, transition: { duration: 0.15 } }}
                className={`pointer-events-auto border backdrop-blur-md p-4 rounded-[20px] shadow-[0_12px_32px_rgba(15,23,42,0.06)] flex items-start justify-between gap-3 ${bgClass}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconColor}`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <span className="block font-black text-[10px] uppercase tracking-wider opacity-60">
                      {toast.type === "success" ? "Notification" : toast.type === "error" ? "Protocol Initiated" : "System Log"}
                    </span>
                    <p className="text-xs font-bold leading-relaxed mt-0.5">{toast.message}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded transition shrink-0 cursor-pointer"
                >
                  <X size={12} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
}

export default AdminDashboard;

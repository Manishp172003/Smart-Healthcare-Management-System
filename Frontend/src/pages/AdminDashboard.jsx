import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import AdminSidebar from "../components/AdminDashboard/AdminSidebar";
import AdminHeader from "../components/AdminDashboard/AdminHeader";
import AdminHome from "../components/AdminDashboard/AdminHome";
import AdminPatients from "../components/AdminDashboard/AdminPatients";
import AdminSchedules from "../components/AdminDashboard/AdminSchedules";
import AdminRecords from "../components/AdminDashboard/AdminRecords";
import AdminAnalytics from "../components/AdminDashboard/AdminAnalytics";
import AdminEmergencyModal from "../components/AdminDashboard/AdminEmergencyModal";
import CustomConfirmModal from "../components/common/CustomConfirmModal";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isSignOutConfirmOpen, setIsSignOutConfirmOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

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
      />

      {/* Main Content Pane */}
      <main className="min-h-screen flex-1 md:pl-64 overflow-x-hidden">
        <div className="p-6 md:p-10 w-full max-w-[1440px] mx-auto">

          {/* Header */}
          <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* View Router */}
          <div className="mt-8 relative min-h-[500px]">
            {activeTab === "Dashboard" && (
              <div className="animate-view-fade-in-up">
                <AdminHome />
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
            {activeTab === "Analytics" && (
              <div className="animate-view-fade-in-up">
                <AdminAnalytics />
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

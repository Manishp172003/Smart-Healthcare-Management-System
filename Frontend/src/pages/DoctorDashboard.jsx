import { useState, useEffect } from "react";
import DoctorSidebar from "../components/DoctorDashboard/DoctorSidebar";
import DoctorHeader from "../components/DoctorDashboard/DoctorHeader";
import DoctorHome from "../components/DoctorDashboard/DoctorHome";
import DoctorPatients from "../components/DoctorDashboard/DoctorPatients";
import DoctorSchedules from "../components/DoctorDashboard/DoctorSchedules";
import DoctorRecords from "../components/DoctorDashboard/DoctorRecords";
import DoctorAnalytics from "../components/DoctorDashboard/DoctorAnalytics";
import DoctorHelp from "../components/DoctorDashboard/DoctorHelp";
import CustomConfirmModal from "../components/common/CustomConfirmModal";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [selectedDoctorId, setSelectedDoctorId] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [isSignOutConfirmOpen, setIsSignOutConfirmOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem("smarthealth_doctor_sidebar_collapsed") === "true";
    } catch {
      return false;
    }
  });

  const handleToggleCollapse = (val) => {
    setIsSidebarCollapsed(val);
    try {
      localStorage.setItem("smarthealth_doctor_sidebar_collapsed", String(val));
    } catch {}
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // 1. Fetch doctors list on load
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/doctors");
        if (res.ok) {
          const data = await res.json();
          setDoctors(data);

          // If logged in as doctor, automatically select this doctor's ID
          const loggedInUserId = localStorage.getItem("userId");
          const loggedInRole = localStorage.getItem("role");
          if (loggedInRole === "ROLE_DOCTOR" && loggedInUserId) {
            const myDoc = data.find((d) => String(d.user?.id) === String(loggedInUserId));
            if (myDoc) {
              setSelectedDoctorId(myDoc.id);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  // 2. Fetch appointments for selected doctor
  const fetchAppointments = async () => {
    if (!selectedDoctorId) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/appointments/doctor-id/${selectedDoctorId}`);
      if (res.ok) {
        const data = await res.json();
        setAppointments(Array.isArray(data) ? data : []);
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.error("Error fetching doctor appointments:", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    const handleSync = () => fetchAppointments();
    window.addEventListener("appointmentsUpdated", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("appointmentsUpdated", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, [selectedDoctorId]);

  // 3. Update appointment status (CONFIRMED, COMPLETED, CANCELLED)
  const handleUpdateStatus = async (appointmentId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:8080/api/appointments/${appointmentId}/status?status=${newStatus}`, {
        method: "PUT"
      });
      if (res.ok) {
        const updated = await res.json();
        setAppointments((prev) =>
          prev.map((app) => (app.id === appointmentId ? { ...app, status: newStatus } : app))
        );
        showToast(
          `Appointment #${appointmentId} marked as ${newStatus.toLowerCase()}!`,
          newStatus === "CANCELLED" ? "error" : "success"
        );
        // Real-time synchronization dispatch
        window.dispatchEvent(new Event("appointmentsUpdated"));
        window.dispatchEvent(new Event("storage"));
      } else {
        const errData = await res.json();
        showToast(errData.error || "Failed to update appointment status", "error");
      }
    } catch (err) {
      console.error("Status update error:", err);
      showToast("Network error. Please try again.", "error");
    }
  };

  const activeDoctor = doctors.find((d) => d.id === selectedDoctorId) || {
    id: 1,
    specialization: "Cardiologist",
    user: { name: "Dr. Ananya Sharma" }
  };

  useEffect(() => {
    const docName = activeDoctor?.user?.name || "Doctor Portal";
    document.title = `${activeTab} • ${docName} | SmartHealth`;
  }, [activeTab, activeDoctor]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]/80 flex relative overflow-hidden z-0">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-3 animate-fadeInUp ${
          toast.type === "error" 
            ? "bg-red-900 text-white border-red-700" 
            : "bg-slate-900 text-white border-slate-800"
        }`}>
          {toast.type === "error" ? (
            <AlertCircle size={18} className="text-red-400 shrink-0" />
          ) : (
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          )}
          <span className="text-xs font-semibold">{toast.message}</span>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white ml-2">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Dynamic Switched Tab Transitions */}
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
      <DoctorSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
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
          <DoctorHeader 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            activeDoctor={activeDoctor}
            doctors={doctors}
            selectedDoctorId={selectedDoctorId}
            setSelectedDoctorId={setSelectedDoctorId}
            pendingCount={appointments.filter(a => a.status === "PENDING").length}
            appointments={appointments}
            isDoctorLocked={localStorage.getItem("role") === "ROLE_DOCTOR"}
            onToggleMobileMenu={() => setIsMobileSidebarOpen(prev => !prev)}
          />

          {/* View Router */}
          <div className="mt-8 relative min-h-[500px]">
            {activeTab === "Dashboard" && (
              <div className="animate-view-fade-in-up">
                <DoctorHome 
                  appointments={appointments}
                  loading={loading}
                  handleUpdateStatus={handleUpdateStatus}
                  activeDoctor={activeDoctor}
                  onRefresh={fetchAppointments}
                />
              </div>
            )}
            {activeTab === "Patients" && (
              <div className="animate-view-fade-in-up">
                <DoctorPatients 
                  appointments={appointments}
                  loading={loading}
                />
              </div>
            )}
            {activeTab === "Schedules" && (
              <div className="animate-view-fade-in-up">
                <DoctorSchedules 
                  appointments={appointments}
                  activeDoctor={activeDoctor}
                />
              </div>
            )}
            {activeTab === "Medical Records" && (
              <div className="animate-view-fade-in-up">
                <DoctorRecords />
              </div>
            )}
            {activeTab === "Analytics" && (
              <div className="animate-view-fade-in-up">
                <DoctorAnalytics appointments={appointments} />
              </div>
            )}
            {activeTab === "Help Center" && (
              <div className="animate-view-fade-in-up">
                <DoctorHelp />
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Custom Sign Out Confirmation Modal */}
      <CustomConfirmModal 
        isOpen={isSignOutConfirmOpen} 
        onClose={() => setIsSignOutConfirmOpen(false)} 
        onConfirm={() => {
          setIsSignOutConfirmOpen(false);
          localStorage.clear();
          window.location.href = "/login";
        }}
        title="Sign Out Session"
        message="Are you sure you want to end your clinical session? Any unsaved medical notes may be lost."
      />

    </div>
  );
}

export default DoctorDashboard;

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/PatientDashboard/Sidebar";
import DashboardHeader from "../components/PatientDashboard/DashboardHeader";
import CustomConfirmModal from "../components/common/CustomConfirmModal";
import EmergencyModal from "../components/PatientDashboard/EmergencyModal";
import NextAppointment from "../components/PatientDashboard/NextAppointment";
import QuickActions from "../components/PatientDashboard/QuickActions";
import UpcomingAppointments from "../components/PatientDashboard/UpcomingAppointments";
import RecentHistory from "../components/PatientDashboard/RecentHistory";
import HealthVitals from "../components/PatientDashboard/HealthVitals";

// New Sub-view imports
import MyAppointments from "../components/PatientDashboard/MyAppointments";
import BookAppointment from "../components/PatientDashboard/BookAppointment";
import MedicalRecords from "../components/PatientDashboard/MedicalRecords";
import PatientProfile from "../components/PatientDashboard/PatientProfile";
import HelpCenter from "../components/PatientDashboard/HelpCenter";
import LeaveFeedbackModal from "../components/PatientDashboard/LeaveFeedbackModal";

const VALID_TABS = ["Dashboard", "My Appointments", "Book Appointment", "Medical Records", "Profile", "Help Center"];

function PatientDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const initialTab = (requestedTab && VALID_TABS.includes(requestedTab)) 
    ? requestedTab 
    : (requestedTab === "Settings" ? "Profile" : "Dashboard");

  const [activeTab, setActiveTab] = useState(initialTab);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSignOutConfirmOpen, setIsSignOutConfirmOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem("smarthealth_patient_sidebar_collapsed") === "true";
    } catch {
      return false;
    }
  });

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const handleToggleCollapse = (val) => {
    setIsSidebarCollapsed(val);
    try {
      localStorage.setItem("smarthealth_patient_sidebar_collapsed", String(val));
    } catch {}
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/doctors")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setDoctors(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    document.title = `${activeTab} • Patient Portal | SmartHealth`;
  }, [activeTab]);

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl) {
      if (tabFromUrl === "Settings") {
        setActiveTab("Profile");
      } else if (VALID_TABS.includes(tabFromUrl)) {
        setActiveTab(tabFromUrl);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || !token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/appointments/patient/${userId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
    const handleSync = () => fetchAppointments();
    window.addEventListener("appointmentsUpdated", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("appointmentsUpdated", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const handleEmergencyConfirm = async (coords) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/api/emergencies/trigger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: userId,
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      });

      if (response.ok) {
        setIsEmergencyModalOpen(false);
        alert("🚨 EMERGENCY DISTRESS ALERT REGISTERED! Medical responders have been dispatched and notified of your exact coordinates.");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to trigger emergency alert. Please contact emergency services immediately.");
      }
    } catch (err) {
      console.error("Emergency trigger error:", err);
      alert("Network Error: Could not connect to system dispatcher. Please dial 102/108 immediately.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]/80 flex relative overflow-hidden z-0">
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
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onSignOutTrigger={() => setIsSignOutConfirmOpen(true)} 
        onEmergencyTrigger={() => setIsEmergencyModalOpen(true)}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={handleToggleCollapse}
      />

      {/* Backdrop overlay for mobile sidebar drawer */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden" 
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content Pane */}
      <main className={`min-h-screen flex-1 transition-all duration-300 overflow-x-hidden ${
        isSidebarCollapsed ? "md:pl-20" : "md:pl-64"
      }`}>

        <div className="p-4 sm:p-6 md:p-10 w-full max-w-[1440px] mx-auto">

          {/* Header */}
          <DashboardHeader 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onMenuToggle={() => setIsMobileSidebarOpen(true)}
            appointments={appointments}
          />

          {/* View Router */}
          <div className="mt-8 relative min-h-[500px]">
            {activeTab === "Dashboard" && (
              <div className="space-y-6 animate-view-fade-in-up">
                
                {/* Top Row Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <NextAppointment appointments={appointments} loading={loading} setActiveTab={setActiveTab} />
                  </div>
                  <QuickActions 
                    setActiveTab={setActiveTab} 
                    onOpenFeedback={() => setIsFeedbackModalOpen(true)} 
                  />
                </div>

                {/* Middle Row: Health Vitals & Biometrics */}
                <HealthVitals />

                {/* Bottom Row Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-1">
                    <UpcomingAppointments appointments={appointments} loading={loading} />
                  </div>
                  <div className="lg:col-span-2">
                    <RecentHistory appointments={appointments} loading={loading} setActiveTab={setActiveTab} />
                  </div>
                </div>

              </div>
            )}

            {activeTab === "My Appointments" && (
              <div className="animate-view-fade-in-up">
                <MyAppointments setActiveTab={setActiveTab} appointments={appointments} loading={loading} />
              </div>
            )}
            {activeTab === "Book Appointment" && (
              <div className="animate-view-fade-in-up">
                <BookAppointment setActiveTab={setActiveTab} />
              </div>
            )}
            {activeTab === "Medical Records" && (
              <div className="animate-view-fade-in-up">
                <MedicalRecords />
              </div>
            )}
            {activeTab === "Profile" && (
              <div className="animate-view-fade-in-up">
                <PatientProfile />
              </div>
            )}
            {activeTab === "Help Center" && (
              <div className="animate-view-fade-in-up">
                <HelpCenter />
              </div>
            )}
          </div>

        </div>

      </main>

      {/* Sign Out Confirmation Modal */}
      <CustomConfirmModal 
        isOpen={isSignOutConfirmOpen} 
        onClose={() => setIsSignOutConfirmOpen(false)} 
        onConfirm={() => {
          setIsSignOutConfirmOpen(false);
          localStorage.clear();
          window.location.href = "/login";
        }}
        title="Sign Out Session"
        message="Are you sure you want to end your patient portal session? You will be returned to the authentication portal."
      />

      {/* Emergency Trigger Modal */}
      <EmergencyModal 
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        onConfirm={handleEmergencyConfirm}
      />

      {/* Leave Feedback Modal */}
      <LeaveFeedbackModal 
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        doctors={doctors}
      />

    </div>
  );
}

export default PatientDashboard;
import { useState } from "react";
import AdminSidebar from "../components/AdminDashboard/AdminSidebar";
import AdminHeader from "../components/AdminDashboard/AdminHeader";
import AdminHome from "../components/AdminDashboard/AdminHome";
import AdminPatients from "../components/AdminDashboard/AdminPatients";
import AdminSchedules from "../components/AdminDashboard/AdminSchedules";
import AdminRecords from "../components/AdminDashboard/AdminRecords";
import AdminAnalytics from "../components/AdminDashboard/AdminAnalytics";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

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
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

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

    </div>
  );
}

export default AdminDashboard;

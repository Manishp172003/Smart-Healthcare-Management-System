import { useState } from "react";
import Sidebar from "../components/PatientDashboard/Sidebar";
import DashboardHeader from "../components/PatientDashboard/DashboardHeader";
import NextAppointment from "../components/PatientDashboard/NextAppointment";
import QuickActions from "../components/PatientDashboard/QuickActions";
import UpcomingAppointments from "../components/PatientDashboard/UpcomingAppointments";
import RecentHistory from "../components/PatientDashboard/RecentHistory";

// New Sub-view imports
import MyAppointments from "../components/PatientDashboard/MyAppointments";
import BookAppointment from "../components/PatientDashboard/BookAppointment";
import MedicalRecords from "../components/PatientDashboard/MedicalRecords";
import PatientProfile from "../components/PatientDashboard/PatientProfile";
import HelpCenter from "../components/PatientDashboard/HelpCenter";

function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

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
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Pane */}
      <main className="min-h-screen flex-1 md:pl-64 overflow-x-hidden">

        <div className="p-6 md:p-10 w-full max-w-[1440px] mx-auto">

          {/* Header */}
          <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* View Router */}
          <div className="mt-8 relative min-h-[500px]">
            {activeTab === "Dashboard" && (
              <div className="space-y-6 animate-view-fade-in-up">
                
                {/* Top Row Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <NextAppointment />
                  </div>
                  <QuickActions />
                </div>

                {/* Bottom Row Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-1">
                    <UpcomingAppointments />
                  </div>
                  <div className="lg:col-span-2">
                    <RecentHistory />
                  </div>
                </div>

              </div>
            )}

            {activeTab === "My Appointments" && (
              <div className="animate-view-fade-in-up">
                <MyAppointments setActiveTab={setActiveTab} />
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

    </div>
  );
}

export default PatientDashboard;
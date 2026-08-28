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

function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Pane */}
      <main className="min-h-screen flex-1 md:pl-64 overflow-x-hidden">

        <div className="p-6 md:p-10 w-full max-w-[1440px] mx-auto">

          {/* Header */}
          <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* View Router */}
          <div className="mt-8">
            {activeTab === "Dashboard" && (
              <div className="space-y-6">
                
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

            {activeTab === "My Appointments" && <MyAppointments setActiveTab={setActiveTab} />}
            {activeTab === "Book Appointment" && <BookAppointment setActiveTab={setActiveTab} />}
            {activeTab === "Medical Records" && <MedicalRecords />}
            {activeTab === "Profile" && <PatientProfile />}
          </div>

        </div>

      </main>

    </div>
  );
}

export default PatientDashboard;
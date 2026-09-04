import { useState } from "react";
import {
  CalendarClock,
  Video,
  CalendarDays,
} from "lucide-react";
import VideoConsultationModal from "./VideoConsultationModal";
import { getDoctorAvatar } from "../../data/doctorsData";

function NextAppointment({ appointments = [], loading = false, setActiveTab }) {
  const [isTelehealthModalOpen, setIsTelehealthModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-white/45 bg-white/60 p-7 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md flex items-center justify-center min-h-[220px]">
        <p className="text-slate-500 font-semibold text-sm animate-pulse">Loading next appointment...</p>
      </div>
    );
  }

  // Find the first upcoming active consultation
  const upcoming = appointments.find(
    (apt) => apt.status === "PENDING" || apt.status === "CONFIRMED"
  );

  if (!upcoming) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-white/45 bg-white/60 p-7 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md flex flex-col justify-center min-h-[220px] justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#0D9488]">
            <CalendarClock size={18} />
            Next Appointment
          </div>
          <h2 className="text-base md:text-lg font-extrabold text-slate-800 leading-tight">
            No Scheduled Consultations
          </h2>
          <p className="mt-1.5 text-xs text-slate-500 font-medium">
            Keep your health checklist updated. Book a new appointment to schedule a session.
          </p>
        </div>
      </div>
    );
  }

  const rawDoctorName = upcoming.doctor?.user?.name || "Medical Specialist";
  const doctorName = rawDoctorName.startsWith("Dr.") ? rawDoctorName : `Dr. ${rawDoctorName}`;
  const specialization = upcoming.doctor?.specialization || "General Health";
  const dateStr = upcoming.appointmentDate;
  const timeStr = upcoming.startTime;
  const doctorAvatar = getDoctorAvatar(upcoming.doctor);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/45 bg-white/60 p-7 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md">

      {/* Decorative Background */}
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#0d9488]/10 opacity-50 blur-3xl" />

      <div className="relative">

        {/* Appointment Information */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row">

          <div className="flex items-center gap-4">
            <img 
              src={doctorAvatar} 
              alt={doctorName} 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-slate-200/80 shadow-sm shrink-0"
            />
            <div>
              {/* Label */}
              <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
                <CalendarClock size={16} />
                Next Appointment
              </div>

              {/* Title */}
              <h2 className="text-lg md:text-xl font-extrabold text-slate-900 leading-tight">
                {specialization}
              </h2>

              {/* Doctor */}
              <p className="mt-1 text-xs md:text-sm text-slate-600 font-semibold">
                {doctorName} • Clinic Center
              </p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="text-left sm:text-right flex flex-col md:justify-center">

            <p className="text-sm md:text-base font-bold text-[#0D9488]">
              {dateStr}
            </p>

            <p className="mt-0.5 text-xs md:text-sm text-slate-600 font-semibold">
              {timeStr}
            </p>

          </div>

        </div>

        {/* Divider */}
        <div className="my-7 border-t border-white/40" />

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">

          <button 
            onClick={() => setIsTelehealthModalOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none px-5 py-3 font-bold text-white shadow-[0_4px_12px_rgba(37,99,235,0.15)] hover:shadow-[0_6px_18px_rgba(37,99,235,0.22)] transition-all duration-300 hover:-translate-y-px cursor-pointer"
          >
            <Video size={18} />
            Join Telehealth
          </button>

          <button 
            onClick={() => setActiveTab && setActiveTab("My Appointments")}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/40 border border-white/20 px-5 py-3 font-medium text-slate-700 transition hover:bg-white/60 cursor-pointer"
          >
            <CalendarDays size={18} />
            Reschedule
          </button>

        </div>

      </div>

      {/* Live Telehealth Video Modal */}
      <VideoConsultationModal
        isOpen={isTelehealthModalOpen}
        onClose={() => setIsTelehealthModalOpen(false)}
        appointment={{
          id: upcoming.id || 101,
          doctor: `Dr. ${doctorName}`,
          specialty: `${specialization} Consultation`,
          date: dateStr,
          time: timeStr,
          duration: "30 mins",
          mode: "Telehealth",
          status: upcoming.status
        }}
      />

    </div>
  );
}

export default NextAppointment;
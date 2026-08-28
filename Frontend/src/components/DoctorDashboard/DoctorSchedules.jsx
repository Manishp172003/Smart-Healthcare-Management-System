import { useState } from "react";
import { CalendarDays, Clock, Lock, CheckCircle2 } from "lucide-react";

const days = ["Mon, Oct 26", "Tue, Oct 27", "Wed, Oct 28", "Thu, Oct 29", "Fri, Oct 30"];
const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"];

const initialSchedule = {
  "Mon, Oct 26": { "09:00 AM": "Booked", "10:00 AM": "Available", "11:00 AM": "Available", "01:00 PM": "Blocked", "02:00 PM": "Available", "03:00 PM": "Booked" },
  "Tue, Oct 27": { "09:00 AM": "Available", "10:00 AM": "Booked", "11:00 AM": "Available", "01:00 PM": "Available", "02:00 PM": "Available", "03:00 PM": "Available" },
  "Wed, Oct 28": { "09:00 AM": "Blocked", "10:00 AM": "Available", "11:00 AM": "Booked", "01:00 PM": "Available", "02:00 PM": "Blocked", "03:00 PM": "Available" },
  "Thu, Oct 29": { "09:00 AM": "Available", "10:00 AM": "Available", "11:00 AM": "Available", "01:00 PM": "Booked", "02:00 PM": "Available", "03:00 PM": "Booked" },
  "Fri, Oct 30": { "09:00 AM": "Booked", "10:00 AM": "Available", "11:00 AM": "Available", "01:00 PM": "Available", "02:00 PM": "Available", "03:00 PM": "Available" }
};

const DoctorSchedules = () => {
  const [schedule, setSchedule] = useState(initialSchedule);

  const toggleSlotStatus = (day, slot) => {
    const currentStatus = schedule[day][slot];
    if (currentStatus === "Booked") {
      alert("This slot is already booked by a patient. Cancellations are managed through Patient Records.");
      return;
    }
    
    const nextStatus = currentStatus === "Available" ? "Blocked" : "Available";
    
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        [slot]: nextStatus
      }
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Calendar Config Info */}
      <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="font-extrabold text-slate-800 text-sm md:text-base leading-none">Weekly Hours Scheduler</h3>
          <p className="text-slate-400 text-xs mt-1.5 leading-snug">Click on any available slot to block it from bookings, or click a blocked slot to open it.</p>
        </div>

        <div className="flex gap-4 text-xs font-bold">
          <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-emerald-100 border border-emerald-200" /> Open</span>
          <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-blue-100 border border-blue-200" /> Booked</span>
          <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-200" /> Blocked</span>
        </div>
      </div>

      {/* Scheduler Grid Card */}
      <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md overflow-x-auto">
        <div className="grid grid-cols-5 gap-4 min-w-[700px]">
          
          {days.map((day) => (
            <div key={day} className="space-y-3">
              
              {/* Day Header */}
              <div className="text-center pb-2.5 border-b border-slate-200/50">
                <p className="text-xs md:text-sm font-extrabold text-slate-800">{day.split(", ")[0]}</p>
                <p className="text-[10px] text-slate-400 font-bold mt-0.5">{day.split(", ")[1]}</p>
              </div>

              {/* Day Slots */}
              <div className="space-y-2">
                {timeSlots.map((slot) => {
                  const status = schedule[day][slot];
                  
                  let colorClass = "bg-emerald-50/60 border-emerald-100 text-emerald-600 hover:bg-emerald-100/50";
                  if (status === "Booked") {
                    colorClass = "bg-blue-50/60 border-blue-100 text-[#2563EB] cursor-not-allowed";
                  } else if (status === "Blocked") {
                    colorClass = "bg-slate-100/60 border-slate-200 text-slate-400 hover:bg-slate-200/40";
                  }

                  return (
                    <button
                      key={slot}
                      onClick={() => toggleSlotStatus(day, slot)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-[10px] md:text-xs font-bold transition-all cursor-pointer ${colorClass}`}
                    >
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {slot}
                      </span>
                      <span className="text-[8px] font-extrabold uppercase px-1 rounded-sm tracking-wider opacity-85">
                        {status}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default DoctorSchedules;

import { useState } from "react";
import { 
  Heart, 
  Smile, 
  Sparkles, 
  Activity, 
  Stethoscope,
  ChevronRight,
  Calendar,
  Clock,
  ArrowLeft,
  CalendarCheck2
} from "lucide-react";

const departments = [
  { id: "Cardiology", label: "Cardiology", icon: Heart, desc: "Heart health checkups", bg: "bg-red-50 text-red-600 border-red-100" },
  { id: "Dermatology", label: "Dermatology", icon: Sparkles, desc: "Skin consultations", bg: "bg-yellow-50 text-yellow-600 border-yellow-100" },
  { id: "Pediatrics", label: "Pediatrics", icon: Smile, desc: "Child care checkups", bg: "bg-purple-50 text-purple-600 border-purple-100" },
  { id: "Neurology", label: "Neurology", icon: Activity, desc: "Brain and nerve health", bg: "bg-blue-50 text-blue-600 border-blue-100" },
  { id: "General Practice", label: "General Practice", icon: Stethoscope, desc: "General health reviews", bg: "bg-teal-50 text-teal-600 border-teal-100" }
];

const availableDoctors = [
  { name: "Dr. Emily Chen", specialty: "Cardiology", fee: "₹700", avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&h=100&q=80", rating: "4.9" },
  { name: "Dr. Sarah Johnson", specialty: "Cardiology", fee: "₹500", avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=100&h=100&q=80", rating: "4.9" },
  { name: "Dr. Priya Sharma", specialty: "Dermatology", fee: "₹600", avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=100&h=100&q=80", rating: "4.9" },
  { name: "Dr. Michael Chen", specialty: "Neurology", fee: "₹700", avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=100&h=100&q=80", rating: "4.8" }
];

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:30 PM"];

const BookAppointment = ({ setActiveTab }) => {
  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [reason, setReason] = useState("");

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handleBackStep = () => {
    setStep(prev => prev - 1);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    alert(`Appointment successfully booked with ${selectedDoc.name} on ${selectedDate} at ${selectedSlot}!`);
    setActiveTab("My Appointments");
  };

  const filteredDoctors = availableDoctors.filter(doc => doc.specialty === selectedDept || selectedDept === "General Practice");

  return (
    <div className="space-y-6">
      

      {/* Progress Steps Header */}
      <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step >= s 
                  ? "bg-gradient-to-br from-[#2563EB] to-[#0D9488] text-white" 
                  : "bg-slate-100 text-slate-400"
              }`}>
                {s}
              </div>
              {s < 4 && <ChevronRight className="text-slate-300 w-4 h-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: SELECT DEPARTMENT */}
      {step === 1 && (
        <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
          <h3 className="text-base font-extrabold text-slate-800">1. Select a Department</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map(dept => {
              const Icon = dept.icon;
              return (
                <button
                  key={dept.id}
                  onClick={() => {
                    setSelectedDept(dept.id);
                    setSelectedDoc(null);
                    handleNextStep();
                  }}
                  className={`flex items-start gap-4 p-5 bg-white/50 backdrop-blur-sm border rounded-2xl text-left transition hover:shadow-md cursor-pointer ${
                    selectedDept === dept.id ? "border-[#2563EB] ring-2 ring-blue-50/50" : "border-white/40"
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${dept.bg}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm md:text-base leading-tight">{dept.label}</h4>
                    <p className="text-slate-400 text-xs mt-1.5 leading-snug">{dept.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: SELECT DOCTOR */}
      {step === 2 && (
        <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
          <div className="flex items-center gap-3">
            <button onClick={handleBackStep} className="p-2 bg-white/40 border border-white/20 rounded-xl hover:bg-white/60 transition cursor-pointer">
              <ArrowLeft size={16} className="text-slate-600" />
            </button>
            <h3 className="text-base font-extrabold text-slate-800">2. Select a Specialist ({selectedDept})</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDoctors.length === 0 ? (
              <div className="p-8 text-center text-slate-400 col-span-2">No doctors currently available in this department.</div>
            ) : (
              filteredDoctors.map(doc => (
                <button
                  key={doc.name}
                  onClick={() => {
                    setSelectedDoc(doc);
                    handleNextStep();
                  }}
                  className={`flex items-center justify-between gap-4 p-5 bg-white/50 backdrop-blur-sm border rounded-2xl text-left transition hover:shadow-md cursor-pointer ${
                    selectedDoc?.name === doc.name ? "border-[#2563EB] ring-2 ring-blue-50/50" : "border-white/40"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <img src={doc.avatar} alt={doc.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm md:text-base leading-tight">{doc.name}</h4>
                      <span className="text-slate-400 text-[11px] font-bold block mt-1">{doc.specialty} • Rating ★{doc.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">Fee</span>
                    <strong className="text-slate-900 text-sm md:text-base font-extrabold block mt-1">{doc.fee}</strong>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* STEP 3: CHOOSE DATE & TIME */}
      {step === 3 && (
        <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
          <div className="flex items-center gap-3">
            <button onClick={handleBackStep} className="p-2 bg-white/40 border border-white/20 rounded-xl hover:bg-white/60 transition cursor-pointer">
              <ArrowLeft size={16} className="text-slate-600" />
            </button>
            <h3 className="text-base font-extrabold text-slate-800">3. Choose Date & Time slot</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md">
            
            {/* Choose Date Input */}
            <div className="lg:col-span-1 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Select Calendar Date</label>
              <input 
                type="date" 
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-white/40 bg-slate-50/40 rounded-xl p-3 text-sm text-[#162235] outline-none transition focus:border-[#2563EB]"
              />
            </div>

            {/* Choose Slots */}
            <div className="lg:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Select Time Slot</label>
              {selectedDate ? (
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`h-11 rounded-xl flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                        selectedSlot === slot 
                          ? "bg-gradient-to-br from-[#2563EB] to-[#0D9488] text-white shadow-md border-none" 
                          : "bg-white/40 border border-white/20 text-slate-600 hover:bg-white/60"
                      }`}
                    >
                      <Clock size={13} className="mr-1" />
                      {slot}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-slate-400 text-xs py-8 text-center bg-slate-50 border border-slate-200/50 rounded-xl">Please select a date on the left to see slots.</div>
              )}
            </div>

          </div>

          {selectedDate && selectedSlot && (
            <div className="flex justify-end mt-4">
              <button 
                onClick={handleNextStep}
                className="h-10 bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none text-white px-6 rounded-xl text-xs font-bold transition hover:shadow-md cursor-pointer"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: REASON & CONFIRM */}
      {step === 4 && (
        <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
          <div className="flex items-center gap-3">
            <button onClick={handleBackStep} className="p-2 bg-white/40 border border-white/20 rounded-xl hover:bg-white/60 transition cursor-pointer">
              <ArrowLeft size={16} className="text-slate-600" />
            </button>
            <h3 className="text-base font-extrabold text-slate-800">4. Enter Reason & Confirm</h3>
          </div>

          <form onSubmit={handleConfirm} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Form side */}
            <div className="lg:col-span-2 bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md space-y-4">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Tell us the reason for your visit</label>
              <textarea
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Briefly describe your symptoms or reason for scheduling..."
                rows={5}
                className="w-full border border-white/40 bg-slate-50/40 rounded-2xl p-4 text-xs md:text-sm text-[#162235] outline-none transition placeholder:text-slate-400 focus:border-[#2563EB]"
              />
            </div>

            {/* Summary card side */}
            <div className="lg:col-span-1 bg-slate-50/40 backdrop-blur-sm border border-slate-200/50 rounded-3xl p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="font-extrabold text-slate-800 text-sm md:text-base border-b border-slate-200/60 pb-3 flex items-center gap-2">
                  <CalendarCheck2 size={18} className="text-[#0D9488]" />
                  Booking Summary
                </h4>

                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">Specialist</span>
                    <strong className="text-slate-800 text-xs md:text-sm font-extrabold block mt-1">{selectedDoc.name}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">Department</span>
                    <strong className="text-slate-800 text-xs md:text-sm font-extrabold block mt-1">{selectedDept}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">Date</span>
                    <strong className="text-slate-800 text-xs md:text-sm font-extrabold block mt-1">{selectedDate}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">Time Slot</span>
                    <strong className="text-slate-800 text-xs md:text-sm font-extrabold block mt-1">{selectedSlot}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">Fee</span>
                    <strong className="text-[#0d9488] text-sm md:text-base font-extrabold block mt-1">{selectedDoc.fee}</strong>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full mt-6 flex items-center justify-center gap-1.5 h-11 bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none text-white rounded-xl text-xs font-bold transition hover:shadow-md cursor-pointer"
              >
                Confirm Appointment
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};

export default BookAppointment;

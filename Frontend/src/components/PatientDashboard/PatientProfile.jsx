import { useState } from "react";
import { User, Phone, MapPin, Award, CheckCircle, ShieldAlert, HeartHandshake } from "lucide-react";

const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: localStorage.getItem("name") || "Patient Name",
    email: localStorage.getItem("email") || "patient@smarthealth.com",
    phone: "+91 98765 43210",
    dob: "1994-10-12",
    gender: "Female",
    bloodGroup: "O+",
    address: "Apartment 4B, Emerald Heights, Sector 12, Mumbai",
    emergencyContact: "John Connor (+91 98765 00000)"
  });

  const [medicalHistory, setMedicalHistory] = useState({
    allergies: [
      { name: "Penicillin", checked: true },
      { name: "Peanuts", checked: false },
      { name: "Sulfa Drugs", checked: true }
    ],
    conditions: [
      { name: "Asthma", checked: false },
      { name: "Hypertension", checked: true },
      { name: "Diabetes", checked: false }
    ],
    medications: [
      { name: "Lisinopril 10mg", checked: true },
      { name: "Albuterol Inhaler", checked: false }
    ]
  });

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxToggle = (category, index) => {
    if (!isEditing) return;
    const list = [...medicalHistory[category]];
    list[index].checked = !list[index].checked;
    setMedicalHistory({
      ...medicalHistory,
      [category]: list
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile and medical history successfully updated!");
  };

  return (
    <div className="space-y-6">
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Personal Info (2 Columns width on desktop) */}
        <div className="lg:col-span-2 bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md space-y-5">
          <h3 className="font-extrabold text-slate-800 text-sm md:text-base border-b border-slate-100 pb-3 flex justify-between items-center gap-2">
            <span className="flex items-center gap-2">
              <User size={18} className="text-[#2563EB]" />
              Personal & Contact Information
            </span>
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`h-9 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isEditing 
                  ? "bg-white/40 border border-white/20 text-slate-755 hover:bg-white/60" 
                  : "bg-gradient-to-br from-[#2563EB] to-[#0D9488] text-white border-none shadow-[0_4px_12px_rgba(37,99,235,0.1)] hover:shadow-[0_6px_18px_rgba(37,99,235,0.18)] hover:-translate-y-px"
              }`}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider block">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                required
                disabled={!isEditing}
                value={profile.fullName}
                onChange={handleProfileChange}
                className="w-full border border-white/40 bg-slate-50/40 disabled:bg-slate-50/20 disabled:text-slate-400 rounded-xl p-3 text-xs md:text-sm text-[#162235] outline-none transition focus:border-[#2563EB]"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider block">Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                disabled={!isEditing}
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full border border-white/40 bg-slate-50/40 disabled:bg-slate-50/20 disabled:text-slate-400 rounded-xl p-3 text-xs md:text-sm text-[#162235] outline-none transition focus:border-[#2563EB]"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider block">Phone Number</label>
              <input 
                type="text" 
                name="phone"
                required
                disabled={!isEditing}
                value={profile.phone}
                onChange={handleProfileChange}
                className="w-full border border-white/40 bg-slate-50/40 disabled:bg-slate-50/20 disabled:text-slate-400 rounded-xl p-3 text-xs md:text-sm text-[#162235] outline-none transition focus:border-[#2563EB]"
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-1.5">
              <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider block">Date of Birth</label>
              <input 
                type="date" 
                name="dob"
                required
                disabled={!isEditing}
                value={profile.dob}
                onChange={handleProfileChange}
                className="w-full border border-white/40 bg-slate-50/40 disabled:bg-slate-50/20 disabled:text-slate-400 rounded-xl p-3 text-xs md:text-sm text-[#162235] outline-none transition focus:border-[#2563EB]"
              />
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider block">Gender</label>
              <select 
                name="gender"
                disabled={!isEditing}
                value={profile.gender}
                onChange={handleProfileChange}
                className="w-full border border-white/40 bg-slate-50/40 disabled:bg-slate-50/20 disabled:text-slate-400 rounded-xl p-3 text-xs md:text-sm text-[#162235] outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Blood Group */}
            <div className="space-y-1.5">
              <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider block">Blood Group</label>
              <select 
                name="bloodGroup"
                disabled={!isEditing}
                value={profile.bloodGroup}
                onChange={handleProfileChange}
                className="w-full border border-white/40 bg-slate-50/40 disabled:bg-slate-50/20 disabled:text-slate-400 rounded-xl p-3 text-xs md:text-sm text-[#162235] outline-none"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            {/* Residential Address */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider block">Residential Address</label>
              <input 
                type="text" 
                name="address"
                required
                disabled={!isEditing}
                value={profile.address}
                onChange={handleProfileChange}
                className="w-full border border-white/40 bg-slate-50/40 disabled:bg-slate-50/20 disabled:text-slate-400 rounded-xl p-3 text-xs md:text-sm text-[#162235] outline-none transition focus:border-[#2563EB]"
              />
            </div>

            {/* Emergency Contact */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider block">Emergency Contact</label>
              <input 
                type="text" 
                name="emergencyContact"
                required
                disabled={!isEditing}
                value={profile.emergencyContact}
                onChange={handleProfileChange}
                className="w-full border border-white/40 bg-slate-50/40 disabled:bg-slate-50/20 disabled:text-slate-400 rounded-xl p-3 text-xs md:text-sm text-[#162235] outline-none transition focus:border-[#2563EB]"
              />
            </div>

          </div>
        </div>

        {/* Right Side: Medical History Checklist */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Allergies Card */}
          <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md space-y-3">
            <h3 className="font-extrabold text-slate-800 text-sm md:text-base border-b border-slate-100 pb-2.5 flex items-center gap-2">
              <ShieldAlert size={18} className="text-[#2563EB]" />
              Allergies
            </h3>
            <div className="space-y-2">
              {medicalHistory.allergies.map((item, idx) => (
                <label 
                  key={item.name} 
                  onClick={() => handleCheckboxToggle("allergies", idx)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                    isEditing ? "hover:bg-slate-50 cursor-pointer" : ""
                  }`}
                >
                  <input 
                    type="checkbox" 
                    disabled={!isEditing}
                    checked={item.checked} 
                    onChange={() => {}}
                    className="rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]" 
                  />
                  <span className={`text-xs md:text-sm font-semibold ${item.checked ? "text-slate-800" : "text-slate-400"}`}>{item.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Chronic Conditions Card */}
          <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md space-y-3">
            <h3 className="font-extrabold text-slate-800 text-sm md:text-base border-b border-slate-100 pb-2.5 flex items-center gap-2">
              <Award size={18} className="text-[#0D9488]" />
              Chronic Conditions
            </h3>
            <div className="space-y-2">
              {medicalHistory.conditions.map((item, idx) => (
                <label 
                  key={item.name}
                  onClick={() => handleCheckboxToggle("conditions", idx)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                    isEditing ? "hover:bg-slate-50 cursor-pointer" : ""
                  }`}
                >
                  <input 
                    type="checkbox" 
                    disabled={!isEditing}
                    checked={item.checked} 
                    onChange={() => {}}
                    className="rounded border-slate-300 text-[#0D9488] focus:ring-[#0D9488]" 
                  />
                  <span className={`text-xs md:text-sm font-semibold ${item.checked ? "text-slate-800" : "text-slate-400"}`}>{item.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Active Medications Card */}
          <div className="bg-white/60 border border-white/45 rounded-3xl p-6 shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md space-y-3">
            <h3 className="font-extrabold text-slate-800 text-sm md:text-base border-b border-slate-100 pb-2.5 flex items-center gap-2">
              <HeartHandshake size={18} className="text-[#2563EB]" />
              Active Medications
            </h3>
            <div className="space-y-2">
              {medicalHistory.medications.map((item, idx) => (
                <label 
                  key={item.name}
                  onClick={() => handleCheckboxToggle("medications", idx)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                    isEditing ? "hover:bg-slate-50 cursor-pointer" : ""
                  }`}
                >
                  <input 
                    type="checkbox" 
                    disabled={!isEditing}
                    checked={item.checked} 
                    onChange={() => {}}
                    className="rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]" 
                  />
                  <span className={`text-xs md:text-sm font-semibold ${item.checked ? "text-slate-800" : "text-slate-400"}`}>{item.name}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Submit Actions */}
        {isEditing && (
          <div className="lg:col-span-3 flex justify-end gap-3 bg-white/60 border border-white/45 p-4 rounded-2xl shadow-[0_8px_32px_rgba(15,23,42,0.015)] backdrop-blur-md">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="h-10 px-6 rounded-xl text-xs font-bold bg-white/40 border border-white/20 text-slate-600 hover:bg-white/60 cursor-pointer"
            >
              Discard
            </button>
            <button
              type="submit"
              className="h-10 px-6 rounded-xl border-none text-white text-xs font-bold bg-gradient-to-br from-[#2563EB] to-[#0D9488] shadow-md hover:shadow-lg transition cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        )}

      </form>
    </div>
  );
};

export default PatientProfile;

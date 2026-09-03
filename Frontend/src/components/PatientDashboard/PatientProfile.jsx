import { useState, useRef } from "react";
import { User, Phone, MapPin, Award, CheckCircle, ShieldAlert, HeartHandshake, Camera, Upload, Trash2, CheckCircle2 } from "lucide-react";

const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(() => localStorage.getItem("userAvatar") || "");
  const fileInputRef = useRef(null);

  const DEFAULT_PROFILE = {
    fullName: localStorage.getItem("name") || "Manish Pawar",
    email: localStorage.getItem("email") || "patient@smarthealth.com",
    phone: "+91 98765 43210",
    dob: "1998-05-14",
    gender: "Male",
    bloodGroup: "O+",
    address: "Civil Lines, Nagpur, Maharashtra, India",
    emergencyContact: "Family (+91 98765 00000)"
  };

  const DEFAULT_MEDICAL = {
    allergies: [
      { name: "Penicillin", checked: false },
      { name: "Peanuts", checked: false },
      { name: "Sulfa Drugs", checked: false }
    ],
    conditions: [
      { name: "Asthma", checked: false },
      { name: "Hypertension", checked: false },
      { name: "Diabetes", checked: false }
    ],
    medications: [
      { name: "Vitamin D3 Supplement", checked: true },
      { name: "Paracetamol (as needed)", checked: true }
    ]
  };

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("smarthealth_patient_profile");
    if (saved) {
      try {
        return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
      } catch (e) {
        return DEFAULT_PROFILE;
      }
    }
    return DEFAULT_PROFILE;
  });

  const [medicalHistory, setMedicalHistory] = useState(() => {
    const saved = localStorage.getItem("smarthealth_patient_medical_history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_MEDICAL;
      }
    }
    return DEFAULT_MEDICAL;
  });

  const [saveToast, setSaveToast] = useState("");

  const initials = profile.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Profile image must be less than 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64Url = reader.result;
      setAvatar(base64Url);
      localStorage.setItem("userAvatar", base64Url);
      window.dispatchEvent(new Event("avatarUpdated"));
      window.dispatchEvent(new Event("storage"));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatar("");
    localStorage.removeItem("userAvatar");
    window.dispatchEvent(new Event("avatarUpdated"));
    window.dispatchEvent(new Event("storage"));
  };

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
    localStorage.setItem("name", profile.fullName);
    localStorage.setItem("email", profile.email);
    localStorage.setItem("smarthealth_patient_profile", JSON.stringify(profile));
    localStorage.setItem("smarthealth_patient_medical_history", JSON.stringify(medicalHistory));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("avatarUpdated"));
    setSaveToast("Profile details and clinical history successfully saved to your record!");
    setTimeout(() => setSaveToast(""), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {saveToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-800 font-bold shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>{saveToast}</span>
          </div>
          <button onClick={() => setSaveToast("")} className="text-emerald-600 hover:text-emerald-800">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Profile Photo & Identity Banner */}
      <div className="bg-white/70 border border-white/60 rounded-3xl p-6 shadow-sm backdrop-blur-md flex flex-col sm:flex-row items-center gap-6">
        
        {/* Avatar Circle with Camera Overlay */}
        <div className="relative group shrink-0">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-md bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-black">
            {avatar ? (
              <img src={avatar} alt={profile.fullName} className="w-full h-full object-cover" />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md border-2 border-white transition cursor-pointer"
            title="Upload / Change Photo"
          >
            <Camera size={14} />
          </button>
          
          <input 
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </div>

        {/* Identity & Upload Actions */}
        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">{profile.fullName}</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <CheckCircle2 size={11} />
                  <span>Verified Patient</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{profile.email}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center sm:justify-end gap-2 pt-1 sm:pt-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Upload size={13} />
                <span>Upload Photo</span>
              </button>
              {avatar && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 size={13} />
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            Supports JPG, PNG or WEBP (Max 5MB). Photo updates automatically across your patient header and dashboard.
          </p>
        </div>

      </div>

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

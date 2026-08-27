import {
  ShieldCheck,
  CalendarCheck,
  UserRoundCheck,
  FileHeart,
  Search,
  MapPin,
  ChevronDown,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[720px] flex items-center justify-center overflow-hidden bg-[linear-gradient(180deg,rgba(248,251,255,0.98)_0%,rgba(248,251,255,0.94)_45%,rgba(248,251,255,0.45)_75%,rgba(248,251,255,0.1)_100%),url('/images/healthcare-doctor.png')] bg-[68%_center] bg-cover md:min-h-[660px] md:items-center md:bg-[linear-gradient(90deg,rgba(248,251,255,1)_0%,rgba(248,251,255,0.98)_45%,rgba(248,251,255,0.85)_55%,rgba(248,251,255,0.15)_75%,rgba(248,251,255,0)_100%),url('/images/healthcare-doctor.png')] md:bg-[85%_center] pt-28 pb-16">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-2 flex flex-col justify-center">

        {/* Hero Content */}
        <div className="relative z-2 w-full max-w-full md:w-[48%] md:max-w-[580px] py-4">

          <span className="inline-block mb-3.5 text-[#0D9488] text-xs font-bold tracking-[2px] uppercase">
            SMART HEALTHCARE PLATFORM
          </span>

          <h1 className="text-[#0F172A] text-4xl font-extrabold tracking-tight leading-[1.1] md:text-5xl lg:text-[56px]">
            Better Health
            <br />
            <span className="text-[#0D9488]">Brighter Future</span>
          </h1>

          <p className="mt-5 text-[#64748B] text-sm leading-relaxed md:text-base lg:text-lg">
            Book appointments, manage your health records,
            and connect with trusted healthcare professionals
            — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3.5 mt-7 flex-wrap">
            <button className="flex items-center justify-center gap-2 p-3.5 px-5 rounded-xl text-xs font-semibold text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none shadow-[0_7px_18px_rgba(37,99,235,0.22)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(37,99,235,0.3)]">
              <CalendarCheck size={18} />
              Book Appointment
            </button>

            <button className="flex items-center justify-center gap-2 p-3.5 px-5 rounded-xl text-xs font-semibold text-[#2563EB] bg-white/80 border border-[rgba(37,99,235,0.25)] transition-transform hover:-translate-y-0.5 hover:bg-white hover:border-[#2563EB]">
              <UserRoundCheck size={18} />
              Find a Doctor
            </button>
          </div>

          {/* Trust Features */}
          <div className="grid grid-cols-2 gap-4 max-w-[500px] mt-10 md:gap-[20px_24px]">

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center text-[#0D9488] bg-white/82 border border-[rgba(13,148,136,0.14)] rounded-xl shadow-[0_5px_15px_rgba(15,23,42,0.05)] backdrop-blur-sm">
                <ShieldCheck size={22} />
              </div>

              <div>
                <h4 className="text-[#0F172A] text-xs font-bold md:text-sm">Trusted & Secure</h4>
                <p className="mt-0.5 text-[#64748B] text-[10px] md:text-xs">Your health data is protected</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center text-[#0D9488] bg-white/82 border border-[rgba(13,148,136,0.14)] rounded-xl shadow-[0_5px_15px_rgba(15,23,42,0.05)] backdrop-blur-sm">
                <CalendarCheck size={22} />
              </div>

              <div>
                <h4 className="text-[#0F172A] text-xs font-bold md:text-sm">Easy Appointment</h4>
                <p className="mt-0.5 text-[#64748B] text-[10px] md:text-xs">Book in a few clicks</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center text-[#0D9488] bg-white/82 border border-[rgba(13,148,136,0.14)] rounded-xl shadow-[0_5px_15px_rgba(15,23,42,0.05)] backdrop-blur-sm">
                <UserRoundCheck size={22} />
              </div>

              <div>
                <h4 className="text-[#0F172A] text-xs font-bold md:text-sm">Expert Doctors</h4>
                <p className="mt-0.5 text-[#64748B] text-[10px] md:text-xs">Trusted healthcare experts</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center text-[#0D9488] bg-white/82 border border-[rgba(13,148,136,0.14)] rounded-xl shadow-[0_5px_15px_rgba(15,23,42,0.05)] backdrop-blur-sm">
                <FileHeart size={22} />
              </div>

              <div>
                <h4 className="text-[#0F172A] text-xs font-bold md:text-sm">Health Records</h4>
                <p className="mt-0.5 text-[#64748B] text-[10px] md:text-xs">Access them anytime</p>
              </div>
            </div>

          </div>
        </div>

        {/* Appointment Search */}
        <div className="relative z-5 w-full max-w-[1080px] mt-12 p-5 bg-white/97 border border-[rgba(226,232,240,0.9)] rounded-2xl shadow-[0_15px_40px_rgba(15,23,42,0.06)]">

          <div className="mb-3.5">
            <h3 className="text-[#0F172A] text-[15px] font-bold">Find & Book an Appointment</h3>

            <p className="mt-0.75 text-[#64748B] text-[10px]">
              Find the right doctor for your healthcare needs
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5 items-center sm:grid-cols-2 md:grid-cols-[1.2fr_1fr_1fr_150px]">

            {/* Doctor */}
            <div className="min-h-[58px] flex items-center gap-2.5 p-2.5 text-[#2563EB] bg-gray-50 border border-[#E2E8F0] rounded-xl transition-colors focus-within:border-[rgba(37,99,235,0.45)]">
              <Search size={19} />

              <div className="flex-1">
                <label className="block mb-0.75 text-[#0F172A] text-[10px] font-semibold">Search Doctor</label>

                <input
                  type="text"
                  placeholder="Doctor or specialty"
                  className="w-full border-none outline-none bg-transparent text-[#64748B] text-[11px] placeholder-gray-400"
                />
              </div>
            </div>

            {/* Category */}
            <div className="min-h-[58px] flex items-center gap-2.5 p-2.5 text-[#2563EB] bg-gray-50 border border-[#E2E8F0] rounded-xl transition-colors focus-within:border-[rgba(37,99,235,0.45)]">
              <UserRoundCheck size={19} />

              <div className="flex-1">
                <label className="block mb-0.75 text-[#0F172A] text-[10px] font-semibold">Specialty</label>

                <select defaultValue="" className="w-full border-none outline-none bg-transparent text-[#64748B] text-[11px] cursor-pointer">
                  <option value="" disabled>
                    Select specialty
                  </option>

                  <option>General Physician</option>
                  <option>Cardiology</option>
                  <option>Dermatology</option>
                  <option>Dental</option>
                  <option>Neurology</option>
                </select>
              </div>

              <ChevronDown size={17} />
            </div>

            {/* Location */}
            <div className="min-h-[58px] flex items-center gap-2.5 p-2.5 text-[#2563EB] bg-gray-50 border border-[#E2E8F0] rounded-xl transition-colors focus-within:border-[rgba(37,99,235,0.45)]">
              <MapPin size={19} />

              <div className="flex-1">
                <label className="block mb-0.75 text-[#0F172A] text-[10px] font-semibold">Location</label>

                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full border-none outline-none bg-transparent text-[#64748B] text-[11px] placeholder-gray-400"
                />
              </div>
            </div>

            <button className="min-h-[58px] border-none rounded-xl text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] text-[12px] font-semibold shadow-[0_7px_18px_rgba(37,99,235,0.22)] transition-transform hover:-translate-y-px hover:shadow-[0_10px_22px_rgba(37,99,235,0.3)] sm:col-span-2 md:col-span-1">
              Find Doctors
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
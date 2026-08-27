import { HeartPulse, ShieldCheck, CalendarCheck } from "lucide-react";

const AuthBrandPanel = ({ page = "login" }) => {
  return (
    <div className="relative hidden min-h-[680px] w-1/2 overflow-hidden rounded-l-[28px] bg-[#2563EB] lg:block">

      {/* Background Image */}
      <img
        src="/images/healthcare-doctor.png"
        alt="Healthcare professional"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Brand Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/95 via-[#1d4ed8]/85 to-[#0D9488]/90" />

      {/* Decorative Shape */}
      <div className="absolute -right-24 top-[-80px] h-[520px] w-[300px] rotate-[18deg] bg-white/5" />

      <div className="absolute -bottom-40 left-20 h-[500px] w-[260px] rotate-[18deg] bg-white/5" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-10 text-white">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
            <HeartPulse size={25} strokeWidth={2.5} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              SmartHealth
            </h1>

            <p className="text-[10px] font-medium tracking-[2px] text-white/70">
              HEALTHCARE MANAGEMENT
            </p>
          </div>

        </div>

        {/* Main Message */}
        <div className="mt-auto max-w-md pb-12">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs backdrop-blur-sm">
            <ShieldCheck size={14} />
            Secure healthcare platform
          </div>

          <h2 className="text-4xl font-bold leading-tight">
            Your health,
            <br />
            <span className="text-[#a7f3d0]">
              our priority.
            </span>
          </h2>

          <p className="mt-5 max-w-sm text-sm leading-6 text-white/75">
            Connect with trusted healthcare professionals, book
            appointments, and manage your healthcare journey in one
            secure place.
          </p>

          {/* Features */}
          <div className="mt-7 flex flex-wrap gap-3">

            <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs backdrop-blur-sm">
              <CalendarCheck size={14} />
              Easy Booking
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs backdrop-blur-sm">
              <ShieldCheck size={14} />
              Secure Records
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthBrandPanel;
import SecurityFeatures from "./SecurityFeatures";
import { HeartPulse } from "lucide-react";

function AdminBranding() {
  return (
    <section
      className="relative hidden min-h-[700px] overflow-hidden rounded-[28px] lg:flex lg:w-[45%]"
      style={{
        backgroundImage: "url(/images/admin-login-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#003b52]/95 via-[#006b7a]/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col justify-between p-10">

        {/* ================= LOGO ================= */}
        <div>

          {/* 
            Replace this temporary logo with
            our existing project logo.
          */}

          <div className="flex items-center gap-3 text-white">

            <div className="w-11 h-11 flex items-center justify-center text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] rounded-xl shadow-sm border border-white/10">
              <HeartPulse size={24} className="stroke-[2.5]" />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-[-0.5px] leading-none">
                SmartHealth
              </h1>

              <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-white/60 mt-1.5 leading-none">
                Admin Portal
              </p>
            </div>

          </div>

        </div>


        {/* ================= PORTAL INFO ================= */}
        <div className="max-w-md">

          <h2 className="text-4xl font-bold tracking-tight text-white">
            Secure Portal
          </h2>

          <p className="mt-3 text-lg leading-7 text-white/85">
            Authorized access for SmartHealth administrators.
          </p>

          {/* Security Features */}
          <SecurityFeatures />

        </div>

      </div>

    </section>
  );
}

export default AdminBranding;
import AdminBranding from "../components/AdminLogin/AdminBranding";
import AdminLoginForm from "../components/AdminLogin/AdminLoginForm";

function AdminLogin() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden z-0">
      
      {/* Background Glow Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#2563EB]/6 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#0D9488]/6 blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1280px] min-h-[680px] flex overflow-hidden rounded-[32px] bg-white border border-slate-100 shadow-[0_24px_70px_rgba(15,23,42,0.07)] p-3 sm:p-4">

        {/* Left Branding */}
        <AdminBranding />

        {/* Right Login Form */}
        <AdminLoginForm />

      </div>

    </div>
  );
}

export default AdminLogin;
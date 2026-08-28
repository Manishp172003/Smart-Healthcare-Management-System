import AdminBranding from "../components/AdminLogin/AdminBranding";
import AdminLoginForm from "../components/AdminLogin/AdminLoginForm";

function AdminLogin() {
  return (
    <div className="min-h-screen bg-slate-900 p-2 sm:p-4 lg:p-6">

      <div className="mx-auto flex min-h-[calc(100vh-1rem)] max-w-[1400px] overflow-hidden rounded-2xl bg-white shadow-2xl sm:min-h-[calc(100vh-2rem)] lg:min-h-[calc(100vh-3rem)]">

        {/* Left Branding */}
        <AdminBranding />

        {/* Right Login Form */}
        <AdminLoginForm />

      </div>

    </div>
  );
}

export default AdminLogin;
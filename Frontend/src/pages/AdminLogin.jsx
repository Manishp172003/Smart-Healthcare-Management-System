import AdminBranding from "../components/AdminLogin/AdminBranding";
import AdminLoginForm from "../components/AdminLogin/AdminLoginForm";

function AdminLogin() {
  return (
    <div className="h-screen w-screen bg-white flex overflow-hidden relative">

      {/* Left Branding */}
      <AdminBranding />

      {/* Right Login Form */}
      <AdminLoginForm />

    </div>
  );
}

export default AdminLogin;
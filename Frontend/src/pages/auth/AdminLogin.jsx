import { useState } from "react";
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  HelpCircle,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [require2FA, setRequire2FA] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Login submitted:", { email, password, require2FA });
    alert(`Admin authentication successful! 2FA required: ${require2FA ? "YES" : "NO"}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f9fc] px-4 py-8 sm:px-6 lg:px-10 flex items-center justify-center relative">
      
      {/* Back Button to main portal */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
      >
        <ArrowLeft size={14} />
        Back to Home
      </Link>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* Main Split-Pane Container Card */}
      <div className="w-full max-w-[1100px] min-h-[640px] overflow-hidden rounded-[28px] bg-white shadow-[0_25px_70px_rgba(15,23,42,0.1)] flex animate-fade-in-up">
        
        {/* Left Side: Illustration Panel */}
        <div className="relative hidden lg:block lg:w-1/2 overflow-hidden h-[640px]">
          
          <img 
            src="/images/Admin-illustration.png" 
            alt="Secure Portal Admin Illustration" 
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent" />

          {/* Overlaid Title Stack */}
          <div className="absolute bottom-10 left-10 right-10 z-10">
            <h2 className="text-3xl font-black text-white leading-none tracking-tight">Secure Portal</h2>
            <p className="text-white/80 text-xs md:text-sm mt-2.5 font-medium leading-relaxed max-w-sm">
              Authorized access for SmartHealth administrators.
            </p>
          </div>

        </div>

        {/* Right Side: Admin Credentials Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
          <div className="w-full max-w-[380px] space-y-6">
            
            {/* Header Title */}
            <div>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">Admin Login</h3>
              <p className="text-slate-400 text-xs md:text-sm mt-2 font-medium">Please authenticate to access the system.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Admin ID / Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Admin ID / Email</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                  <input 
                    type="email" 
                    required
                    placeholder="admin@smarthealth.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-slate-200 bg-slate-50/50 rounded-xl py-3 pl-11 pr-4 text-xs md:text-sm text-[#162235] outline-none transition focus:border-[#0D9488] focus:bg-white"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 block">Password</label>
                  <button 
                    type="button"
                    onClick={() => alert("Admin credentials can be reset by consulting the IT Administration desk.")}
                    className="text-[11px] font-bold text-[#0D9488] hover:underline cursor-pointer bg-transparent border-none"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-slate-200 bg-slate-50/50 rounded-xl py-3 pl-11 pr-11 text-xs md:text-sm text-[#162235] outline-none transition focus:border-[#0D9488] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Require Two-Factor Authentication Switch */}
              <div className="py-2">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      checked={require2FA} 
                      onChange={() => setRequire2FA(!require2FA)} 
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0D9488]"></div>
                  </div>
                  <span className="text-xs md:text-sm text-slate-600 font-semibold">
                    Require Two-Factor Authentication
                  </span>
                </label>
              </div>

              {/* Secure Login Button */}
              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0D9488] hover:bg-[#0b7a70] text-white py-3 px-4 text-xs md:text-sm font-extrabold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-px cursor-pointer border-none"
              >
                <Shield size={16} />
                Secure Login
              </button>

            </form>

            {/* Assistance Helpline */}
            <div className="pt-2 text-center">
              <button 
                onClick={() => alert("IT Support desk is available at extension #4000 or via email support@smarthealth.com.")}
                className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition cursor-pointer bg-transparent border-none"
              >
                <HelpCircle size={14} />
                Need assistance? <span className="text-[#0D9488] font-bold hover:underline">Contact IT Support</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminLogin;

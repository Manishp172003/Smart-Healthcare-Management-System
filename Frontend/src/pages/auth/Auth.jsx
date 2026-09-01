import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  UserPlus,
  ArrowRight,
  HeartPulse,
  Check,
} from "lucide-react";

import AuthBrandPanel from "../../components/auth/AuthBrandPanel";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === "/login";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Separate states for Login and Register
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store JWT token and user details in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("email", data.email);
        localStorage.setItem("name", data.name);
        localStorage.setItem("userId", data.id);

        alert(`Welcome back, ${data.name}!`);

        // Redirect based on user role
        if (data.role === "ROLE_ADMIN") {
          navigate("/admin/dashboard");
        } else if (data.role === "ROLE_DOCTOR") {
          navigate("/doctor/dashboard");
        } else {
          navigate("/patient/dashboard");
        }
      } else {
        alert(data.error || "Login failed. Please verify your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error: Could not connect to the authentication server.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (!acceptedTerms) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerData.fullName,
          email: registerData.email,
          password: registerData.password,
          role: "PATIENT"
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Error: Could not connect to the authentication server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f9fc] px-4 py-8 sm:px-6 lg:px-10 flex items-center justify-center">
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

      <div className="w-full max-w-[1180px] min-h-[720px] overflow-hidden rounded-[28px] bg-white shadow-[0_25px_70px_rgba(15,23,42,0.12)] flex animate-fade-in-up">
        
        {/* LEFT BRAND PANEL (Remains mounted for perfect continuity) */}
        <AuthBrandPanel page={isLogin ? "login" : "register"} />

        {/* RIGHT SIDE FORM CONTAINER */}
        <div className="flex w-full items-center justify-center px-6 py-10 sm:px-10 lg:w-1/2 lg:px-16 relative">
          
          <div className="w-full max-w-[440px] relative overflow-visible">
            
            {/* Mobile Logo */}
            <div className="mb-6 flex items-center gap-2 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#0D9488] text-white">
                <HeartPulse size={21} />
              </div>
              <span className="text-xl font-bold text-[#162235]">
                SmartHealth
              </span>
            </div>

            {/* Transition Container */}
            <div className="relative w-full">
              
              {/* LOGIN VIEW */}
              <div 
                className={`w-full transition-all duration-500 ease-in-out ${
                  isLogin 
                    ? "opacity-100 translate-x-0 pointer-events-auto relative z-10" 
                    : "opacity-0 -translate-x-20 pointer-events-none absolute top-0 left-0 z-0"
                }`}
              >
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#eff6ff] text-[#2563EB] shadow-sm">
                    <UserRound size={34} strokeWidth={2} />
                  </div>
                </div>

                {/* Heading */}
                <div className="mt-5 text-center">
                  <h2 className="text-3xl font-bold tracking-[2px] text-[#162235]">
                    LOGIN
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Welcome back. Sign in to continue.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLoginSubmit} className="mt-8 space-y-6">
                  <div className="relative">
                    <UserRound size={19} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      placeholder="Email address"
                      required
                      className="w-full border-0 border-b border-slate-300 bg-transparent py-3 pl-9 pr-3 text-sm text-[#162235] outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-0"
                    />
                  </div>

                  <div className="relative">
                    <LockKeyhole size={19} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      placeholder="Password"
                      required
                      className="w-full border-0 border-b border-slate-300 bg-transparent py-3 pl-9 pr-10 text-sm text-[#162235] outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#2563EB]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-2">
                    <button
                      type="button"
                      className="text-xs font-semibold text-[#162235] transition hover:text-[#2563EB]"
                    >
                      Forgot Password?
                    </button>

                    <button
                      type="submit"
                      className="group flex items-center gap-2 rounded-full bg-gradient-to-br from-[#2563EB] to-[#0D9488] px-7 py-3 text-xs font-bold text-white shadow-[0_7px_18px_rgba(37,99,235,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(37,99,235,0.25)] cursor-pointer border-none"
                    >
                      LOGIN
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </form>

                {/* Divider */}
                <div className="my-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-xs text-slate-400">Or Continue With</span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                {/* Social Login */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-700 shadow-sm transition duration-200 hover:bg-slate-50 hover:-translate-y-px cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                    </svg>
                    Sign in with Google
                  </button>
                </div>

                {/* Switch link */}
                <p className="mt-8 text-center text-xs text-slate-500">
                  Don't have an account?
                  <Link to="/register" className="ml-1 font-bold text-[#2563EB] hover:underline">
                    Create Account
                  </Link>
                </p>
              </div>

              {/* REGISTER VIEW */}
              <div 
                className={`w-full transition-all duration-500 ease-in-out ${
                  !isLogin 
                    ? "opacity-100 translate-x-0 pointer-events-auto relative z-10" 
                    : "opacity-0 translate-x-20 pointer-events-none absolute top-0 left-0 z-0"
                }`}
              >
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#eff6ff] text-[#2563EB] shadow-sm">
                    <UserPlus size={34} strokeWidth={2} />
                  </div>
                </div>

                {/* Heading */}
                <div className="mt-5 text-center">
                  <h2 className="text-3xl font-bold tracking-[2px] text-[#162235]">
                    REGISTER
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Create your SmartHealth account.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleRegisterSubmit} className="mt-6 space-y-5">
                  <div className="relative">
                    <UserRound size={19} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      name="fullName"
                      value={registerData.fullName}
                      onChange={handleRegisterChange}
                      placeholder="Full Name"
                      required
                      className="w-full border-0 border-b border-slate-300 bg-transparent py-3 pl-9 pr-3 text-sm text-[#162235] outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-0"
                    />
                  </div>

                  <div className="relative">
                    <Mail size={19} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      placeholder="Email Address"
                      required
                      className="w-full border-0 border-b border-slate-300 bg-transparent py-3 pl-9 pr-3 text-sm text-[#162235] outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-0"
                    />
                  </div>

                  <div className="relative">
                    <LockKeyhole size={19} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      placeholder="Password"
                      required
                      minLength={6}
                      className="w-full border-0 border-b border-slate-300 bg-transparent py-3 pl-9 pr-10 text-sm text-[#162235] outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#2563EB]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <div className="relative">
                    <LockKeyhole size={19} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      placeholder="Confirm Password"
                      required
                      minLength={6}
                      className="w-full border-0 border-b border-slate-300 bg-transparent py-3 pl-9 pr-10 text-sm text-[#162235] outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#2563EB]"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-2">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="peer sr-only"
                      />
                      <span className="flex h-[18px] w-[18px] items-center justify-center rounded border border-slate-300 text-transparent transition peer-checked:border-[#2563EB] peer-checked:bg-[#2563EB] peer-checked:text-white">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="text-xs text-slate-500">
                        I agree to the{" "}
                        <button type="button" className="font-semibold text-[#2563EB] hover:underline">
                          Terms
                        </button>
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="group flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-br from-[#2563EB] to-[#0D9488] px-6 py-3 text-xs font-bold text-white shadow-[0_7px_18px_rgba(37,99,235,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(37,99,235,0.25)] cursor-pointer border-none"
                    >
                      REGISTER
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </form>

                {/* Divider */}
                <div className="my-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-xs text-slate-400">Or Continue With</span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                {/* Social Registration */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-700 shadow-sm transition duration-200 hover:bg-slate-50 hover:-translate-y-px cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                    </svg>
                    Sign up with Google
                  </button>
                </div>

                {/* Switch link */}
                <p className="mt-8 text-center text-xs text-slate-500">
                  Already have an account?
                  <Link to="/login" className="ml-1 font-bold text-[#2563EB] hover:underline">
                    Login
                  </Link>
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;

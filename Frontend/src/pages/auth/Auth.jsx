import React, { useState, useEffect, useRef } from "react";
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
  Stethoscope,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  RefreshCw,
  KeyRound
} from "lucide-react";

import AuthBrandPanel from "../../components/auth/AuthBrandPanel";
import { API_BASE_URL, GOOGLE_CLIENT_ID } from "../../config/api";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === "/login";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Role selection state
  const [selectedRole, setSelectedRole] = useState("PATIENT"); // PATIENT, DOCTOR

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
    phone: "",
    licenseNumber: "",
    specialization: "",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Email Verification / OTP flow state
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [devOtpHint, setDevOtpHint] = useState("");
  const otpInputRefs = useRef([]);

  const handleGoogleCredentialResponse = async (response) => {
    try {
      setGoogleLoading(true);
      setAuthError("");

      const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: response.credential,
          role: selectedRole,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("email", data.email);
        localStorage.setItem("name", data.name);
        if (data.id) localStorage.setItem("userId", data.id);

        // Decode Google avatar from token payload
        try {
          const base64Url = response.credential.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );
          const payloadObj = JSON.parse(jsonPayload);
          if (payloadObj.picture) {
            localStorage.setItem("userAvatar", payloadObj.picture);
          }
        } catch (e) {}

        window.dispatchEvent(new Event("authChange"));

        const redirectUrl = localStorage.getItem("redirectAfterLogin");
        if (redirectUrl) {
          localStorage.removeItem("redirectAfterLogin");
          navigate(redirectUrl);
        } else if (data.role === "ROLE_DOCTOR") {
          navigate("/doctor/dashboard");
        } else if (data.role === "ROLE_ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/patient/dashboard");
        }
      } else {
        setAuthError(data.error || "Google authentication failed.");
        alert(data.error || "Google authentication failed.");
      }
    } catch (err) {
      setAuthError("Could not connect to authentication server.");
      alert("Could not connect to authentication server.");
    } finally {
      setGoogleLoading(false);
    }
  };

  useEffect(() => {
    const initGoogle = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        const targetBtn = document.getElementById(isLogin ? "googleSignInBtn" : "googleSignUpBtn");
        if (targetBtn) {
          targetBtn.innerHTML = "";
          window.google.accounts.id.renderButton(targetBtn, {
            theme: "outline",
            size: "large",
            width: "360",
            text: isLogin ? "signin_with" : "signup_with",
            shape: "rectangular",
            logo_alignment: "left",
          });
        }
      }
    };

    if (window.google?.accounts?.id) {
      initGoogle();
    } else {
      const timer = setInterval(() => {
        if (window.google?.accounts?.id) {
          initGoogle();
          clearInterval(timer);
        }
      }, 250);
      return () => clearInterval(timer);
    }
  }, [isLogin, selectedRole]);

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

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleOtpDigitChange = (index, value) => {
    const cleanVal = value.replace(/\D/g, "");
    if (!cleanVal && value !== "") return;

    const char = cleanVal.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);
    setOtpError("");

    if (char && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otpDigits[index] && index > 0) {
        const newDigits = [...otpDigits];
        newDigits[index - 1] = "";
        setOtpDigits(newDigits);
        otpInputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...otpDigits];
        newDigits[index] = "";
        setOtpDigits(newDigits);
      }
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().replace(/\D/g, "");
    if (pasted) {
      const digits = pasted.slice(0, 6).split("");
      const newDigits = ["", "", "", "", "", ""];
      digits.forEach((d, i) => {
        newDigits[i] = d;
      });
      setOtpDigits(newDigits);
      const nextFocus = Math.min(digits.length, 5);
      otpInputRefs.current[nextFocus]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const code = otpDigits.join("");
    if (code.length !== 6) {
      setOtpError("Please enter all 6 digits of the verification code.");
      return;
    }

    try {
      setOtpLoading(true);
      setOtpError("");

      const res = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: verificationEmail,
          otp: code,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);
          localStorage.setItem("email", data.email);
          localStorage.setItem("name", data.name);
          if (data.id) localStorage.setItem("userId", data.id);

          window.dispatchEvent(new Event("authChange"));

          alert(`🎉 Email verified successfully! Welcome to SmartHealth, ${data.name}!`);

          const redirectUrl = localStorage.getItem("redirectAfterLogin");
          if (redirectUrl) {
            localStorage.removeItem("redirectAfterLogin");
            navigate(redirectUrl);
          } else if (data.role === "ROLE_DOCTOR") {
            navigate("/doctor/dashboard");
          } else if (data.role === "ROLE_ADMIN") {
            navigate("/admin/dashboard");
          } else {
            navigate("/patient/dashboard");
          }
        } else {
          alert("🎉 Doctor email verified successfully! Your license is now under review by Hospital Administration.");
          setIsVerifyingOtp(false);
          navigate("/login");
        }
      } else {
        setOtpError(data.error || "Verification failed. Please check the code and try again.");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setOtpError("Network error. Could not connect to verification server.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || otpLoading) return;

    try {
      setOtpLoading(true);
      setOtpError("");
      setOtpSuccess("");

      const res = await fetch(`${API_BASE_URL}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: verificationEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        setResendCooldown(60);
        setOtpSuccess(data.message || "A fresh verification code has been sent to your email.");
        if (data.devOtp) {
          setDevOtpHint(data.devOtp);
        }
      } else {
        setOtpError(data.error || "Failed to resend code. Please try again.");
      }
    } catch (err) {
      setOtpError("Network error. Could not connect to authentication server.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
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

        // Check for redirect after login
        const redirectAfterLogin = localStorage.getItem("redirectAfterLogin");
        if (redirectAfterLogin) {
          localStorage.removeItem("redirectAfterLogin");
          navigate(redirectAfterLogin);
          return;
        }

        // Redirect based on user role
        if (data.role === "ROLE_ADMIN") {
          navigate("/admin/dashboard");
        } else if (data.role === "ROLE_DOCTOR") {
          navigate("/doctor/dashboard");
        } else {
          navigate("/patient/dashboard");
        }
      } else {
        if (data.emailVerified === false || (data.error && data.error.includes("EMAIL_NOT_VERIFIED"))) {
          setVerificationEmail(data.email || loginData.email);
          setIsVerifyingOtp(true);
          setResendCooldown(60);
          setOtpError("");
          setOtpSuccess("Your email is not verified yet. We just sent a fresh 6-digit code to your email.");
        } else {
          alert(data.error || "Login failed. Please verify your credentials.");
        }
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

    // Doctor-specific validation
    if (selectedRole === "DOCTOR") {
      if (!registerData.licenseNumber || !registerData.specialization) {
        alert("License number and specialization are required for doctor registration.");
        return;
      }
    }

    try {
      const requestBody = {
        name: registerData.fullName,
        email: registerData.email,
        password: registerData.password,
        role: selectedRole,
        phone: registerData.phone
      };

      // Add doctor-specific fields
      if (selectedRole === "DOCTOR") {
        requestBody.licenseNumber = registerData.licenseNumber;
        requestBody.specialization = registerData.specialization;
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.requiresVerification) {
          setVerificationEmail(data.email || registerData.email);
          setDevOtpHint(data.devOtp || "");
          setIsVerifyingOtp(true);
          setResendCooldown(60);
          setOtpError("");
          setOtpSuccess("A 6-digit verification code has been sent to your email.");
        } else {
          alert("Registration successful! Please login.");
          navigate("/login");
        }
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
            {isVerifyingOtp ? (
              <div className="w-full animate-fade-in-up py-4">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-50 to-teal-50 text-[#0D9488] shadow-sm border border-teal-100">
                    <ShieldCheck size={38} className="text-[#0D9488]" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-[#0D9488]"></span>
                    </span>
                  </div>
                </div>

                {/* Heading */}
                <div className="mt-5 text-center">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#162235]">
                    Verify Your Email
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-slate-500">
                    We have sent a 6-digit verification code to:
                  </p>
                  <p className="font-extrabold text-slate-800 text-xs sm:text-sm mt-1 flex items-center justify-center gap-1.5">
                    <Mail size={15} className="text-[#2563EB]" />
                    <span>{verificationEmail}</span>
                  </p>
                </div>

                {/* 6-box Digit Inputs */}
                <div className="mt-6">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center mb-3">
                    Enter 6-Digit Code
                  </label>
                  <div className="flex justify-center items-center gap-2 sm:gap-2.5">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpInputRefs.current[idx] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        onPaste={idx === 0 ? handleOtpPaste : undefined}
                        className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-2xl font-black rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 outline-none transition shadow-2xs"
                        autoFocus={idx === 0}
                      />
                    ))}
                  </div>
                </div>

                {/* Alerts */}
                {otpError && (
                  <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{otpError}</span>
                  </div>
                )}

                {otpSuccess && (
                  <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-semibold flex items-center gap-2">
                    <CheckCircle2 size={16} className="shrink-0" />
                    <span>{otpSuccess}</span>
                  </div>
                )}

                {devOtpHint && (
                  <div className="mt-3 p-2.5 rounded-xl bg-blue-50/70 border border-blue-200/70 text-[11px] text-blue-700 flex items-center justify-between">
                    <span>Demo Mode Code: <strong>{devOtpHint}</strong></span>
                    <button
                      type="button"
                      onClick={() => {
                        const digits = devOtpHint.split("").slice(0, 6);
                        setOtpDigits(digits);
                      }}
                      className="text-[10px] bg-blue-600 hover:bg-blue-700 text-white font-bold px-2 py-0.5 rounded-md transition cursor-pointer"
                    >
                      Auto Fill
                    </button>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={otpLoading || otpDigits.join("").length !== 6}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#0D9488] py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_4px_16px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.35)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-none"
                >
                  {otpLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify & Activate Account</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                {/* Resend and Back Actions */}
                <div className="mt-5 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendCooldown > 0 || otpLoading}
                    className={`transition ${
                      resendCooldown > 0
                        ? "text-slate-400 cursor-not-allowed"
                        : "text-[#2563EB] hover:text-blue-700 font-bold cursor-pointer"
                    }`}
                  >
                    {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend Verification Code"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsVerifyingOtp(false);
                      setOtpDigits(["", "", "", "", "", ""]);
                      setOtpError("");
                    }}
                    className="text-slate-500 hover:text-slate-800 transition cursor-pointer flex items-center gap-1"
                  >
                    <ArrowLeft size={14} />
                    <span>Change Email</span>
                  </button>
                </div>
              </div>
            ) : (
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

                {/* Role Selection Tabs */}
                <div className="mt-6 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("PATIENT")}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-semibold transition-all ${
                      selectedRole === "PATIENT"
                        ? "bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Patient
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole("DOCTOR")}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-semibold transition-all ${
                      selectedRole === "DOCTOR"
                        ? "bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Doctor
                  </button>
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
                <div className="flex flex-col items-center justify-center gap-2">
                  <div id="googleSignInBtn" className="w-full flex justify-center min-h-[44px]"></div>
                  {googleLoading && (
                    <span className="text-xs text-slate-500 animate-pulse font-medium">
                      Authenticating with Google...
                    </span>
                  )}
                </div>

                {/* Switch link */}
                <p className="mt-8 text-center text-xs text-slate-500">
                  Don't have an account?
                  <Link to="/register" className="ml-1 font-bold text-[#2563EB] hover:underline">
                    Create Account
                  </Link>
                </p>

                {/* Admin Login Link */}
                <p className="mt-2 text-center text-xs text-slate-400">
                  <Link to="/admin-login" className="hover:text-[#2563EB] transition">
                    Admin Login
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

                {/* Role Selection Tabs */}
                <div className="mt-6 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("PATIENT")}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-semibold transition-all ${
                      selectedRole === "PATIENT"
                        ? "bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Patient
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole("DOCTOR")}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-semibold transition-all ${
                      selectedRole === "DOCTOR"
                        ? "bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Doctor
                  </button>
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

                  {/* Phone Number (Required for both) */}
                  <div className="relative">
                    <Mail size={19} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={registerData.phone}
                      onChange={handleRegisterChange}
                      placeholder="Phone Number"
                      required
                      className="w-full border-0 border-b border-slate-300 bg-transparent py-3 pl-9 pr-3 text-sm text-[#162235] outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-0"
                    />
                  </div>

                  {/* Doctor-specific fields */}
                  {selectedRole === "DOCTOR" && (
                    <>
                      <div className="relative">
                        <Stethoscope size={19} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          name="licenseNumber"
                          value={registerData.licenseNumber}
                          onChange={handleRegisterChange}
                          placeholder="Medical License Number"
                          required
                          className="w-full border-0 border-b border-slate-300 bg-transparent py-3 pl-9 pr-3 text-sm text-[#162235] outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-0"
                        />
                      </div>

                      <div className="relative">
                        <Stethoscope size={19} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          name="specialization"
                          value={registerData.specialization}
                          onChange={handleRegisterChange}
                          placeholder="Specialization (e.g., Cardiology)"
                          required
                          className="w-full border-0 border-b border-slate-300 bg-transparent py-3 pl-9 pr-3 text-sm text-[#162235] outline-none transition placeholder:text-slate-400 focus:border-[#2563EB] focus:ring-0"
                        />
                      </div>
                    </>
                  )}

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
                <div className="flex flex-col items-center justify-center gap-2">
                  <div id="googleSignUpBtn" className="w-full flex justify-center min-h-[44px]"></div>
                  {googleLoading && (
                    <span className="text-xs text-slate-500 animate-pulse font-medium">
                      Registering with Google...
                    </span>
                  )}
                </div>

                {/* Switch link */}
                <p className="mt-8 text-center text-xs text-slate-500">
                  Already have an account?
                  <Link to="/login" className="ml-1 font-bold text-[#2563EB] hover:underline">
                    Login
                  </Link>
                </p>

                {/* Admin Login Link */}
                <p className="mt-2 text-center text-xs text-slate-400">
                  <Link to="/admin-login" className="hover:text-[#2563EB] transition">
                    Admin Login
                  </Link>
                </p>
              </div>

            </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;

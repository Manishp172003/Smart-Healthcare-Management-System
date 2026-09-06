import { HeartPulse, UserRound, Menu, X, Home, User, Calendar, FileText, Phone, LogOut, ChevronRight, Bell, Settings, Search, Grid, CalendarPlus, HelpCircle, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import UniversalSearchModal from "./UniversalSearchModal";

const Navbar = ({ forceLight = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [doctorsDropdownOpen, setDoctorsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(() => localStorage.getItem("name") || "");
  const [userRole, setUserRole] = useState(() => localStorage.getItem("role") || "ROLE_PATIENT");
  const location = useLocation();
  const currentPath = location.pathname;
  const isDoctorProfile = currentPath.startsWith("/doctors/") && currentPath !== "/doctors";
  // Landing subpages that have full dark hero background banners
  const darkHeroPaths = ["/", "/about", "/doctors", "/service", "/services", "/contact"];
  const isDarkHeroPage = darkHeroPaths.includes(currentPath);
  // Any page with a white/light top background (e.g. 404 not found, doctor profile) must show dark text and frosted light backdrop immediately
  const isLightNavbar = forceLight || isScrolled || !isDarkHeroPage;

  const [userAvatar, setUserAvatar] = useState(() => localStorage.getItem("userAvatar") || "");

  const getDashboardUrl = () => {
    if (userRole === "ROLE_DOCTOR") return "/doctor/dashboard";
    if (userRole === "ROLE_ADMIN") return "/admin/dashboard";
    return "/patient/dashboard";
  };

  const getRoleLabel = () => {
    if (userRole === "ROLE_DOCTOR") return "Physician Account";
    if (userRole === "ROLE_ADMIN") return "Admin Operations";
    return "Patient Account";
  };

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setUserName(localStorage.getItem("name") || "");
    setUserRole(localStorage.getItem("role") || "ROLE_PATIENT");

    const handleAvatarUpdate = () => {
      setUserAvatar(localStorage.getItem("userAvatar") || "");
      setUserName(localStorage.getItem("name") || "");
      setUserRole(localStorage.getItem("role") || "ROLE_PATIENT");
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("avatarUpdated", handleAvatarUpdate);
    window.addEventListener("storage", handleAvatarUpdate);
    return () => {
      window.removeEventListener("avatarUpdated", handleAvatarUpdate);
      window.removeEventListener("storage", handleAvatarUpdate);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Initial check in case user is already scrolled
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Ctrl+K / Cmd+K listener for Universal Search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K" || e.code === "KeyK")) {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserDropdownOpen && !event.target.closest('.user-dropdown-container')) {
        setIsUserDropdownOpen(false);
      }
      if (servicesDropdownOpen && !event.target.closest('.services-dropdown-container')) {
        setServicesDropdownOpen(false);
      }
      if (doctorsDropdownOpen && !event.target.closest('.doctors-dropdown-container')) {
        setDoctorsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserDropdownOpen, servicesDropdownOpen, doctorsDropdownOpen]);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md font-sans transition-all duration-300 ${
      isLightNavbar
        ? 'bg-white/80 border-b border-slate-200/50 shadow-[0_4px_20px_rgba(15,23,42,0.02)]'
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="w-full max-w-[1440px] min-h-[76px] mx-auto flex items-center justify-between px-6 md:px-12 py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 min-w-auto md:min-w-[190px]">
          <div className="w-9.5 h-9.5 md:w-10.5 md:h-10.5 flex items-center justify-center text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] rounded-xl">
            <HeartPulse size={24} strokeWidth={2.5} />
          </div>

          <div className="flex flex-col leading-[1.1]">
            <span className="text-[17px] md:text-xl font-extrabold tracking-[-0.5px] bg-gradient-to-r from-[#2563EB] to-[#0D9488] bg-clip-text text-transparent">SmartHealth</span>
            <span className="mt-0.75 text-[#64748B] text-[8px] md:text-[9px] font-semibold tracking-[0.5px] uppercase">Healthcare System</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-6">
          <Link to="/" className={`nav-link relative text-xs md:text-sm transition-colors hover:text-[#2563EB] ${currentPath === "/" ? (isLightNavbar ? "text-[#2563EB] font-semibold active uppercase" : "text-white font-semibold active uppercase") : (isLightNavbar ? "text-[#475569] font-medium uppercase" : "text-white font-medium uppercase")}`}>
            Home
            <span className="nav-link-underline"></span>
          </Link>

          <Link to="/about" className={`nav-link relative text-xs md:text-sm transition-colors hover:text-[#2563EB] ${currentPath === "/about" ? (isLightNavbar ? "text-[#2563EB] font-semibold active uppercase" : "text-white font-semibold active uppercase") : (isLightNavbar ? "text-[#475569] font-medium uppercase" : "text-white font-medium uppercase")}`}>
            About Us
            <span className="nav-link-underline"></span>
          </Link>

          <div className="relative doctors-dropdown-container"
            onMouseEnter={() => setDoctorsDropdownOpen(true)}
            onMouseLeave={() => setDoctorsDropdownOpen(false)}
          >
            <Link to="/doctors"
              className={`nav-link relative text-xs md:text-sm transition-colors hover:text-[#2563EB] flex items-center gap-1 ${(currentPath === "/doctors" || isDoctorProfile) ? (isLightNavbar ? "text-[#2563EB] font-semibold active uppercase" : "text-white font-semibold active uppercase") : (isLightNavbar ? "text-[#475569] font-medium uppercase" : "text-white font-medium uppercase")}`}
            >
              Find Doctors
              <ChevronRight size={14} className="transform rotate-90" />
              <span className="nav-link-underline"></span>
            </Link>

            {/* Doctors Mega Menu */}
            {doctorsDropdownOpen && (
              <div className="absolute left-0 top-8 w-[500px] bg-white rounded-xl shadow-[0_8px_30px_rgba(15,23,42,0.12)] border border-slate-100 z-50 animate-slideDown">
                <div className="p-6">
                  <h3 className="text-sm font-semibold text-slate-800 mb-4">Find Doctors by Specialty</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/doctors?specialty=General Medicine" onClick={() => setDoctorsDropdownOpen(false)} className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                      <User size={16} className="text-[#2563EB]" />
                      <span className="text-sm text-slate-700">General Physicians</span>
                    </Link>
                    <Link to="/doctors?specialty=Cardiology" onClick={() => setDoctorsDropdownOpen(false)} className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                      <User size={16} className="text-[#2563EB]" />
                      <span className="text-sm text-slate-700">Cardiologists</span>
                    </Link>
                    <Link to="/doctors?specialty=Neurology" onClick={() => setDoctorsDropdownOpen(false)} className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                      <User size={16} className="text-[#2563EB]" />
                      <span className="text-sm text-slate-700">Neurologists</span>
                    </Link>
                    <Link to="/doctors?specialty=Orthopedics" onClick={() => setDoctorsDropdownOpen(false)} className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                      <User size={16} className="text-[#2563EB]" />
                      <span className="text-sm text-slate-700">Orthopedists</span>
                    </Link>
                    <Link to="/doctors?specialty=Pediatrics" onClick={() => setDoctorsDropdownOpen(false)} className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                      <User size={16} className="text-[#0D9488]" />
                      <span className="text-sm text-slate-700">Pediatricians</span>
                    </Link>
                    <Link to="/doctors?specialty=Dermatology" onClick={() => setDoctorsDropdownOpen(false)} className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                      <User size={16} className="text-[#0D9488]" />
                      <span className="text-sm text-slate-700">Dermatologists</span>
                    </Link>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <Link to="/doctors" className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#2563EB]/10 text-[#2563EB] hover:bg-[#2563EB]/20 transition-colors">
                      <Search size={16} />
                      <span className="text-sm font-semibold">View All Doctors</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative services-dropdown-container"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <Link to="/service"
              className={`nav-link relative text-xs md:text-sm transition-colors hover:text-[#2563EB] flex items-center gap-1 ${currentPath === "/service" ? (isLightNavbar ? "text-[#2563EB] font-semibold active uppercase" : "text-white font-semibold active uppercase") : (isLightNavbar ? "text-[#475569] font-medium uppercase" : "text-white font-medium uppercase")}`}
            >
              Services
              <ChevronRight size={14} className="transform rotate-90" />
              <span className="nav-link-underline"></span>
            </Link>

            {/* Services Mega Menu */}
            {servicesDropdownOpen && (
              <div className="absolute left-0 top-8 w-[600px] bg-white rounded-xl shadow-[0_8px_30px_rgba(15,23,42,0.12)] border border-slate-100 z-50 animate-slideDown">
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800 mb-3">Healthcare Services</h3>
                      <div className="space-y-2">
                        <Link to="/service" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                          <HeartPulse size={16} className="text-[#2563EB]" />
                          <span className="text-sm text-slate-700">General Checkup</span>
                        </Link>
                        <Link to="/service" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                          <HeartPulse size={16} className="text-[#2563EB]" />
                          <span className="text-sm text-slate-700">Cardiology</span>
                        </Link>
                        <Link to="/service" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                          <HeartPulse size={16} className="text-[#2563EB]" />
                          <span className="text-sm text-slate-700">Neurology</span>
                        </Link>
                        <Link to="/service" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                          <HeartPulse size={16} className="text-[#2563EB]" />
                          <span className="text-sm text-slate-700">Orthopedics</span>
                        </Link>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800 mb-3">Specialized Care</h3>
                      <div className="space-y-2">
                        <Link to="/service" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                          <HeartPulse size={16} className="text-[#0D9488]" />
                          <span className="text-sm text-slate-700">Pediatrics</span>
                        </Link>
                        <Link to="/service" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                          <HeartPulse size={16} className="text-[#0D9488]" />
                          <span className="text-sm text-slate-700">Dermatology</span>
                        </Link>
                        <Link to="/service" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                          <HeartPulse size={16} className="text-[#0D9488]" />
                          <span className="text-sm text-slate-700">Ophthalmology</span>
                        </Link>
                        <Link to="/service" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                          <HeartPulse size={16} className="text-[#0D9488]" />
                          <span className="text-sm text-slate-700">Dental Care</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>


          <Link to="/faq" className={`nav-link relative text-xs md:text-sm transition-colors hover:text-[#2563EB] ${currentPath === "/faq" ? (isLightNavbar ? "text-[#2563EB] font-semibold active uppercase" : "text-white font-semibold active uppercase") : (isLightNavbar ? "text-[#475569] font-medium uppercase" : "text-white font-medium uppercase")}`}>
            FAQ
            <span className="nav-link-underline"></span>
          </Link>

          <Link to="/contact" className={`nav-link relative text-xs md:text-sm transition-colors hover:text-[#2563EB] ${currentPath === "/contact" ? (isLightNavbar ? "text-[#2563EB] font-semibold active uppercase" : "text-white font-semibold active uppercase") : (isLightNavbar ? "text-[#475569] font-medium uppercase" : "text-white font-medium uppercase")}`}>
            Contact Us
            <span className="nav-link-underline"></span>
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Search Button - Desktop Spotlight Trigger */}
          <button
            className={`hidden md:flex items-center gap-2 px-3 h-10 rounded-xl transition-all cursor-pointer ${
              isLightNavbar 
                ? 'text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/70' 
                : 'text-white bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/20'
            }`}
            onClick={() => setIsSearchOpen(true)}
            title="Universal Medical Search (Ctrl + K)"
          >
            <Search size={16} />
            <span className="text-xs font-semibold hidden lg:inline">Search...</span>
            <kbd className={`hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${
              isLightNavbar ? 'bg-slate-200 text-slate-600' : 'bg-white/20 text-white/90'
            }`}>
              Ctrl K
            </kbd>
          </button>

          {/* User Account Dropdown - Desktop */}
          <div className="relative hidden md:block user-dropdown-container">
            <button
              className={`flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden transition-colors ${isLightNavbar ? 'text-[#0F172A] bg-gray-50 hover:bg-gray-100' : 'text-white bg-white/20 backdrop-blur-md hover:bg-white/30'}`}
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              {userAvatar && isLoggedIn ? (
                <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <UserRound size={18} />
              )}
            </button>

            {/* User Dropdown Menu */}
            {isUserDropdownOpen && (
              <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-[0_8px_30px_rgba(15,23,42,0.12)] border border-slate-100 z-50 animate-slideDown">
                {isLoggedIn ? (
                  <>
                    <div className="p-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#0D9488] overflow-hidden flex items-center justify-center text-white font-semibold shrink-0">
                          {userAvatar ? (
                            <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <User size={18} />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-800 truncate">
                            {userName || "My Account"}
                          </p>
                          <p className="text-xs text-[#0D9488] font-semibold">{getRoleLabel()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link 
                        to={getDashboardUrl()} 
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <LayoutDashboard size={16} className="text-[#2563EB]" />
                        <span className="text-sm text-slate-700 font-semibold">Dashboard</span>
                      </Link>
                      {userRole === "ROLE_PATIENT" && (
                        <>
                          <Link 
                            to="/patient/dashboard?tab=My Appointments" 
                            onClick={() => setIsUserDropdownOpen(false)}
                            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <Calendar size={16} className="text-slate-500" />
                            <span className="text-sm text-slate-700">My Appointments</span>
                          </Link>
                          <Link 
                            to="/patient/dashboard?tab=Medical Records" 
                            onClick={() => setIsUserDropdownOpen(false)}
                            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <FileText size={16} className="text-slate-500" />
                            <span className="text-sm text-slate-700">Medical Records</span>
                          </Link>
                          <Link 
                            to="/patient/dashboard?tab=Profile" 
                            onClick={() => setIsUserDropdownOpen(false)}
                            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <Settings size={16} className="text-slate-500" />
                            <span className="text-sm text-slate-700">Profile Settings</span>
                          </Link>
                        </>
                      )}
                      <button
                        onClick={() => {
                          localStorage.clear();
                          setIsUserDropdownOpen(false);
                          window.location.href = "/login";
                        }}
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-rose-50 transition-colors text-rose-500 w-full text-left border-none bg-transparent cursor-pointer mt-1"
                      >
                        <LogOut size={16} />
                        <span className="text-sm font-semibold">Logout</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#0D9488] flex items-center justify-center text-white font-semibold">
                          <User size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">Guest User</p>
                          <p className="text-xs text-slate-500">Sign in for more features</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link to="/login" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                        <UserRound size={16} className="text-slate-500" />
                        <span className="text-sm text-slate-700">Login</span>
                      </Link>
                      <Link to="/register" onClick={() => setIsUserDropdownOpen(false)} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                        <CalendarPlus size={16} className="text-slate-500" />
                        <span className="text-sm text-slate-700">Sign Up</span>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Universal Medical Search (Spotlight Command Palette) */}
          <UniversalSearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />

          {/* Mobile User Avatar / Direct Dashboard Button */}
          {isLoggedIn && (
            <Link
              to={getDashboardUrl()}
              className={`flex md:hidden items-center justify-center w-9.5 h-9.5 rounded-xl overflow-hidden border shadow-xs transition-all ${
                isLightNavbar 
                  ? 'border-slate-200 bg-gray-50 text-slate-700' 
                  : 'border-white/30 bg-white/20 text-white backdrop-blur-md'
              }`}
              title="Open Dashboard"
            >
              {userAvatar ? (
                <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#2563EB] to-[#0D9488] flex items-center justify-center text-white text-xs font-black">
                  {userName ? userName.charAt(0).toUpperCase() : <LayoutDashboard size={17} />}
                </div>
              )}
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className={`flex md:hidden items-center justify-center w-10 h-10 rounded-xl transition-colors ${isLightNavbar ? 'text-[#0F172A] bg-gray-50' : 'text-white bg-white/20 backdrop-blur-md'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Conditional Button: Login/Signup or Book Appointment */}
          {isLoggedIn ? (
            <Link to="/appointment" className={`flex items-center justify-center gap-2 p-2.5 px-3 text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none rounded-xl text-[12px] font-semibold shadow-[0_6px_18px_rgba(37,99,235,0.22)] transition-transform hover:-translate-y-px hover:shadow-[0_9px_22px_rgba(37,99,235,0.3)] md:min-w-[145px] md:p-2.75 md:px-4.25 ${isMobileMenuOpen ? 'max-md:hidden' : ''}`}>
              <CalendarPlus size={17} />
              <span className="hidden md:inline">Book Appointment</span>
            </Link>
          ) : (
            <Link to="/login" className={`flex items-center justify-center gap-2 p-2.5 px-3 text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none rounded-xl text-[12px] font-semibold shadow-[0_6px_18px_rgba(37,99,235,0.22)] transition-transform hover:-translate-y-px hover:shadow-[0_9px_22px_rgba(37,99,235,0.3)] md:min-w-[145px] md:p-2.75 md:px-4.25 ${isMobileMenuOpen ? 'max-md:hidden' : ''}`}>
              <UserRound size={17} />
              <span className="hidden md:inline">Login / Signup</span>
            </Link>
          )}
        </div>

      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-20 left-0 right-0 rounded-2xl shadow-[0_12px_36px_rgba(15,23,42,0.12)] p-4 mx-3.5 sm:mx-6 z-50 transition-all max-h-[calc(100vh-90px)] overflow-y-auto ${isLightNavbar ? 'bg-white border border-slate-200' : 'bg-white/95 backdrop-blur-md border border-white/20 text-slate-800'}`}>
          
          {/* User Account Card in Mobile Menu */}
          {isLoggedIn ? (
            <div className="p-3.5 mb-2.5 rounded-2xl bg-gradient-to-br from-slate-50 via-teal-50/40 to-blue-50/40 border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#0D9488] overflow-hidden flex items-center justify-center text-white font-bold text-base shrink-0 shadow-xs">
                  {userAvatar ? (
                    <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span>{userName ? userName.charAt(0).toUpperCase() : <User size={18} />}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {userName || "My Account"}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-semibold text-[#0D9488]">
                      {getRoleLabel()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Dashboard Button */}
              <Link
                to={getDashboardUrl()}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 px-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white font-bold text-xs shadow-xs hover:shadow-md transition-all"
              >
                <span className="flex items-center gap-2">
                  <LayoutDashboard size={15} />
                  <span>Open {userRole === "ROLE_DOCTOR" ? "Doctor" : (userRole === "ROLE_ADMIN" ? "Admin" : "Patient")} Dashboard</span>
                </span>
                <ChevronRight size={14} />
              </Link>

              {/* Quick Patient Tabs */}
              {userRole === "ROLE_PATIENT" && (
                <div className="grid grid-cols-3 gap-1.5 mt-2 pt-2 border-t border-slate-200/70">
                  <Link
                    to="/patient/dashboard?tab=My Appointments"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col items-center p-2 rounded-lg bg-white border border-slate-200/80 hover:bg-slate-50 transition-colors text-center"
                  >
                    <Calendar size={14} className="text-[#2563EB] mb-1" />
                    <span className="text-[10px] font-bold text-slate-700">Appointments</span>
                  </Link>
                  <Link
                    to="/patient/dashboard?tab=Medical Records"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col items-center p-2 rounded-lg bg-white border border-slate-200/80 hover:bg-slate-50 transition-colors text-center"
                  >
                    <FileText size={14} className="text-[#0D9488] mb-1" />
                    <span className="text-[10px] font-bold text-slate-700">Records</span>
                  </Link>
                  <Link
                    to="/patient/dashboard?tab=Profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col items-center p-2 rounded-lg bg-white border border-slate-200/80 hover:bg-slate-50 transition-colors text-center"
                  >
                    <Settings size={14} className="text-slate-600 mb-1" />
                    <span className="text-[10px] font-bold text-slate-700">Profile</span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="p-3 mb-2.5 rounded-2xl bg-gradient-to-br from-slate-50 via-teal-50/20 to-blue-50/20 border border-slate-200/80 shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#0D9488] flex items-center justify-center text-white shrink-0">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Welcome to SmartHealth</p>
                  <p className="text-[10px] text-slate-500">Sign in for dashboard & appointments</p>
                </div>
              </div>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-1.5 bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white text-[11px] font-bold rounded-lg shrink-0 shadow-xs"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Standard Navigation Links */}
          <nav className="flex flex-col gap-1">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all ${currentPath === "/" ? "bg-[#2563EB]/10 text-[#2563EB]" : "hover:bg-slate-100 text-slate-700"}`}>
              <Home size={17} />
              <span className="text-xs uppercase font-semibold">Home</span>
            </Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all ${currentPath === "/about" ? "bg-[#2563EB]/10 text-[#2563EB]" : "hover:bg-slate-100 text-slate-700"}`}>
              <FileText size={17} />
              <span className="text-xs uppercase font-semibold">About Us</span>
            </Link>
            <Link to="/doctors" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all ${currentPath === "/doctors" ? "bg-[#2563EB]/10 text-[#2563EB]" : "hover:bg-slate-100 text-slate-700"}`}>
              <User size={17} />
              <span className="text-xs uppercase font-semibold">Find Doctors</span>
            </Link>
            <Link to="/service" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all ${currentPath === "/service" || currentPath === "/services" ? "bg-[#2563EB]/10 text-[#2563EB]" : "hover:bg-slate-100 text-slate-700"}`}>
              <Grid size={17} />
              <span className="text-xs uppercase font-semibold">Services</span>
            </Link>
            <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all ${currentPath === "/faq" ? "bg-[#2563EB]/10 text-[#2563EB]" : "hover:bg-slate-100 text-slate-700"}`}>
              <HelpCircle size={17} />
              <span className="text-xs uppercase font-semibold">FAQ</span>
            </Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all ${currentPath === "/contact" ? "bg-[#2563EB]/10 text-[#2563EB]" : "hover:bg-slate-100 text-slate-700"}`}>
              <Phone size={17} />
              <span className="text-xs uppercase font-semibold">Contact Us</span>
            </Link>

            {/* Bottom Actions in Mobile Menu */}
            {isLoggedIn ? (
              <div className="flex flex-col gap-1.5 mt-2 pt-2 border-t border-slate-100">
                <Link 
                  to="/appointment" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white font-bold text-xs uppercase tracking-wider shadow-xs"
                >
                  <CalendarPlus size={16} />
                  <span>Book Appointment</span>
                </Link>
                <button
                  onClick={() => {
                    localStorage.clear();
                    setIsMobileMenuOpen(false);
                    window.location.href = "/login";
                  }}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl hover:bg-rose-50 text-rose-600 font-bold text-xs uppercase tracking-wider border border-rose-100 bg-rose-50/30 transition-colors cursor-pointer w-full"
                >
                  <LogOut size={15} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="mt-2 pt-2 border-t border-slate-100">
                <Link 
                  to="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white font-bold text-xs uppercase tracking-wider shadow-xs"
                >
                  <UserRound size={16} />
                  <span>Login / Register</span>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
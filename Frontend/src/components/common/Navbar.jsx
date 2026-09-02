import { HeartPulse, UserRound, Menu, X, Home, User, Calendar, FileText, Phone, LogOut, ChevronRight, Bell, Settings, Search, Grid } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [doctorsDropdownOpen, setDoctorsDropdownOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Initial check in case user is already scrolled
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserDropdownOpen && !event.target.closest('.user-dropdown-container')) {
        setIsUserDropdownOpen(false);
      }
      if (isSearchOpen && !event.target.closest('.search-container')) {
        setIsSearchOpen(false);
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
  }, [isUserDropdownOpen, isSearchOpen, servicesDropdownOpen, doctorsDropdownOpen]);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md font-sans transition-all duration-300 ${
      isScrolled
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
          <Link to="/" className={`nav-link relative text-xs md:text-sm transition-colors hover:text-[#2563EB] ${currentPath === "/" ? (isScrolled ? "text-[#2563EB] font-semibold active uppercase" : "text-white font-semibold active uppercase") : (isScrolled ? "text-[#475569] font-medium uppercase" : "text-white font-medium uppercase")}`}>
            Home
            <span className="nav-link-underline"></span>
          </Link>

          <Link to="/about" className={`nav-link relative text-xs md:text-sm transition-colors hover:text-[#2563EB] ${currentPath === "/about" ? (isScrolled ? "text-[#2563EB] font-semibold active uppercase" : "text-white font-semibold active uppercase") : (isScrolled ? "text-[#475569] font-medium uppercase" : "text-white font-medium uppercase")}`}>
            About Us
            <span className="nav-link-underline"></span>
          </Link>

          <div className="relative doctors-dropdown-container"
            onMouseEnter={() => setDoctorsDropdownOpen(true)}
            onMouseLeave={() => setDoctorsDropdownOpen(false)}
          >
            <Link to="/doctors"
              className={`nav-link relative text-xs md:text-sm transition-colors hover:text-[#2563EB] flex items-center gap-1 ${currentPath === "/doctors" ? (isScrolled ? "text-[#2563EB] font-semibold active uppercase" : "text-white font-semibold active uppercase") : (isScrolled ? "text-[#475569] font-medium uppercase" : "text-white font-medium uppercase")}`}
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
                    <Link to="/doctors" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                      <User size={16} className="text-[#2563EB]" />
                      <span className="text-sm text-slate-700">General Physicians</span>
                    </Link>
                    <Link to="/doctors" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                      <User size={16} className="text-[#2563EB]" />
                      <span className="text-sm text-slate-700">Cardiologists</span>
                    </Link>
                    <Link to="/doctors" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                      <User size={16} className="text-[#2563EB]" />
                      <span className="text-sm text-slate-700">Neurologists</span>
                    </Link>
                    <Link to="/doctors" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                      <User size={16} className="text-[#2563EB]" />
                      <span className="text-sm text-slate-700">Orthopedists</span>
                    </Link>
                    <Link to="/doctors" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                      <User size={16} className="text-[#0D9488]" />
                      <span className="text-sm text-slate-700">Pediatricians</span>
                    </Link>
                    <Link to="/doctors" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
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
              className={`nav-link relative text-xs md:text-sm transition-colors hover:text-[#2563EB] flex items-center gap-1 ${currentPath === "/service" ? (isScrolled ? "text-[#2563EB] font-semibold active uppercase" : "text-white font-semibold active uppercase") : (isScrolled ? "text-[#475569] font-medium uppercase" : "text-white font-medium uppercase")}`}
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


          <Link to="/contact" className={`nav-link relative text-xs md:text-sm transition-colors hover:text-[#2563EB] ${currentPath === "/contact" ? (isScrolled ? "text-[#2563EB] font-semibold active uppercase" : "text-white font-semibold active uppercase") : (isScrolled ? "text-[#475569] font-medium uppercase" : "text-white font-medium uppercase")}`}>
            Contact Us
            <span className="nav-link-underline"></span>
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Search Button - Desktop */}
          <button
            className={`hidden md:flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${isScrolled ? 'text-[#0F172A] bg-gray-50 hover:bg-gray-100' : 'text-white bg-white/20 backdrop-blur-md hover:bg-white/30'}`}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search size={18} />
          </button>

          {/* User Account Dropdown - Desktop */}
          <div className="relative hidden md:block user-dropdown-container">
            <button
              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${isScrolled ? 'text-[#0F172A] bg-gray-50 hover:bg-gray-100' : 'text-white bg-white/20 backdrop-blur-md hover:bg-white/30'}`}
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              <UserRound size={18} />
            </button>

            {/* User Dropdown Menu */}
            {isUserDropdownOpen && (
              <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-[0_8px_30px_rgba(15,23,42,0.12)] border border-slate-100 z-50 animate-slideDown">
                <div className="p-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#0D9488] flex items-center justify-center text-white font-semibold">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Welcome!</p>
                      <p className="text-xs text-slate-500">Patient Account</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <Link to="/patient/dashboard" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                    <Calendar size={16} className="text-slate-500" />
                    <span className="text-sm text-slate-700">My Appointments</span>
                  </Link>
                  <Link to="/patient/dashboard" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                    <Settings size={16} className="text-slate-500" />
                    <span className="text-sm text-slate-700">Settings</span>
                  </Link>
                  <Link to="/patient/dashboard" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                    <Bell size={16} className="text-slate-500" />
                    <span className="text-sm text-slate-700">Notifications</span>
                  </Link>
                  <Link to="/login" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors text-red-500">
                    <LogOut size={16} />
                    <span className="text-sm">Logout</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Search Dropdown */}
          {isSearchOpen && (
            <div className="absolute right-16 top-16 w-80 bg-white rounded-xl shadow-[0_8px_30px_rgba(15,23,42,0.12)] border border-slate-100 z-50 animate-slideDown search-container">
              <div className="p-4">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search doctors, services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none text-sm"
                  />
                </div>
                {searchQuery && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-500 mb-2">Quick Links</p>
                    <Link to="/doctors" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <User size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-700">Find Doctors</span>
                    </Link>
                    <Link to="/service" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <Grid size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-700">Services</span>
                    </Link>
                    <Link to="/appointment" className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                      <Calendar size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-700">Book Appointment</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className={`flex md:hidden items-center justify-center w-10 h-10 rounded-xl transition-colors ${isScrolled ? 'text-[#0F172A] bg-gray-50' : 'text-white bg-white/20 backdrop-blur-md'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Login - Hidden on mobile when menu is open */}
          <Link to="/login" className={`flex items-center justify-center gap-2 p-2.5 px-3 text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] border-none rounded-xl text-[12px] font-semibold shadow-[0_6px_18px_rgba(37,99,235,0.22)] transition-transform hover:-translate-y-px hover:shadow-[0_9px_22px_rgba(37,99,235,0.3)] md:min-w-[145px] md:p-2.75 md:px-4.25 ${isMobileMenuOpen ? 'max-md:hidden' : ''}`}>
            <UserRound size={17} />
            <span className="hidden md:inline">Login / Signup</span>
          </Link>
        </div>

      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-20 left-0 right-0 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.06)] p-4 mx-4 md:mx-7 z-50 transition-all ${isScrolled ? 'bg-white border border-[rgba(226,232,240,0.8)]' : 'bg-white/95 backdrop-blur-md border border-white/20'}`}>
          <nav className="flex flex-col gap-1">
            <Link to="/" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${currentPath === "/" ? "bg-[#2563EB]/10 text-[#2563EB]" : "hover:bg-slate-100"}`}>
              <Home size={18} />
              <span className="text-xs uppercase font-semibold">Home</span>
            </Link>
            <Link to="/about" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${currentPath === "/about" ? "bg-[#2563EB]/10 text-[#2563EB]" : "hover:bg-slate-100"}`}>
              <FileText size={18} />
              <span className="text-xs uppercase font-semibold">About Us</span>
            </Link>
            <Link to="/doctors" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${currentPath === "/doctors" ? "bg-[#2563EB]/10 text-[#2563EB]" : "hover:bg-slate-100"}`}>
              <User size={18} />
              <span className="text-xs uppercase font-semibold">Find Doctors</span>
            </Link>
            <Link to="/service" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${currentPath === "/service" ? "bg-[#2563EB]/10 text-[#2563EB]" : "hover:bg-slate-100"}`}>
              <Grid size={18} />
              <span className="text-xs uppercase font-semibold">Services</span>
            </Link>
            <Link to="/contact" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${currentPath === "/contact" ? "bg-[#2563EB]/10 text-[#2563EB]" : "hover:bg-slate-100"}`}>
              <Phone size={18} />
              <span className="text-xs uppercase font-semibold">Contact Us</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
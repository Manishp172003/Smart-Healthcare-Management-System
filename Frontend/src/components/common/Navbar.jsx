import { HeartPulse, UserRound, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 border-b border-slate-200/50 shadow-[0_4px_20px_rgba(15,23,42,0.02)] backdrop-blur-md font-sans">
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
          <Link to="/" className={`nav-link relative text-xs md:text-sm transition-colors hover:text-[#2563EB] ${currentPath === "/" ? "text-[#2563EB] font-semibold active" : "text-[#475569] font-medium"}`}>
            Home
            <span className="nav-link-underline"></span>
          </Link>

          <Link to="/about" className={`nav-link relative text-xs md:text-sm transition-colors hover:text-[#2563EB] ${currentPath === "/about" ? "text-[#2563EB] font-semibold active" : "text-[#475569] font-medium"}`}>
            About Us
            <span className="nav-link-underline"></span>
          </Link>

          <Link to="/doctors" className={`nav-link relative text-xs md:text-sm transition-colors hover:text-[#2563EB] ${currentPath === "/doctors" ? "text-[#2563EB] font-semibold active" : "text-[#475569] font-medium"}`}>
            Find Doctors
            <span className="nav-link-underline"></span>
          </Link>

          <Link to="/service" className={`nav-link relative text-xs md:text-sm transition-colors hover:text-[#2563EB] ${currentPath === "/service" ? "text-[#2563EB] font-semibold active" : "text-[#475569] font-medium"}`}>
            Services
            <span className="nav-link-underline"></span>
          </Link>


          <Link to="/contact" className={`nav-link relative text-xs md:text-sm transition-colors hover:text-[#2563EB] ${currentPath === "/contact" ? "text-[#2563EB] font-semibold active" : "text-[#475569] font-medium"}`}>
            Contact Us
            <span className="nav-link-underline"></span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="flex md:hidden items-center justify-center w-10 h-10 text-[#0F172A] bg-gray-50 rounded-xl"
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white border border-[rgba(226,232,240,0.8)] rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.06)] p-4 mx-4 md:mx-7 z-50">
          <nav className="flex flex-col gap-4">
            <Link to="/" className={`text-xs ${currentPath === "/" ? "text-[#2563EB] font-semibold" : "text-[#0F172A] font-medium hover:text-[#2563EB]"}`}>Home</Link>
            <Link to="/about" className={`text-xs ${currentPath === "/about" ? "text-[#2563EB] font-semibold" : "text-[#0F172A] font-medium hover:text-[#2563EB]"}`}>About Us</Link>
            <Link to="/doctors" className={`text-xs ${currentPath === "/doctors" ? "text-[#2563EB] font-semibold" : "text-[#0F172A] font-medium hover:text-[#2563EB]"}`}>Find Doctors</Link>
            <Link to="/service" className={`text-xs ${currentPath === "/service" ? "text-[#2563EB] font-semibold" : "text-[#0F172A] font-medium hover:text-[#2563EB]"}`}>Services</Link>
            <Link to="/contact" className={`text-xs ${currentPath === "/contact" ? "text-[#2563EB] font-semibold" : "text-[#0F172A] font-medium hover:text-[#2563EB]"}`}>Contact Us</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
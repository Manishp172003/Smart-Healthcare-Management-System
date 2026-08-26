import { HeartPulse, UserRound, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 py-3 md:px-7 md:py-3.5 bg-transparent">
      <div className="w-full max-w-[1440px] min-h-[70px] mx-auto flex items-center justify-between p-2 px-3 md:p-2.5 md:px-4.5 bg-white border border-[rgba(226,232,240,0.8)] rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.06)]">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 min-w-auto md:min-w-[190px]">
          <div className="w-9.5 h-9.5 md:w-10.5 md:h-10.5 flex items-center justify-center text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] rounded-xl">
            <HeartPulse size={24} strokeWidth={2.5} />
          </div>

          <div className="flex flex-col leading-[1.1]">
            <span className="text-[17px] md:text-xl font-extrabold tracking-[-0.5px] bg-gradient-to-r from-[#2563EB] to-[#0D9488] bg-clip-text text-transparent">SmartHealth</span>
            <span className="mt-0.75 text-[#64748B] text-[8px] md:text-[9px] font-semibold tracking-[0.5px] uppercase">Healthcare System</span>
          </div>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-4">
          <a href="/" className="relative text-[#2563EB] text-[13px] font-semibold transition-colors hover:text-[#2563EB] lg:text-[12px]">
            Home
            <span className="absolute left-1/2 -bottom-2.5 w-5.5 h-0.75 -translate-x-1/2 bg-[#2563EB] rounded-full"></span>
          </a>

          <a href="#about" className="relative text-[#0F172A] text-[13px] font-medium transition-colors hover:text-[#2563EB] lg:text-[12px]">
            About Us
          </a>

          <a href="#doctors" className="relative text-[#0F172A] text-[13px] font-medium transition-colors hover:text-[#2563EB] lg:text-[12px]">
            Find Doctors
          </a>

          <a href="#services" className="relative text-[#0F172A] text-[13px] font-medium transition-colors hover:text-[#2563EB] lg:text-[12px]">
            Services
          </a>

          <a href="#packages" className="relative text-[#0F172A] text-[13px] font-medium transition-colors hover:text-[#2563EB] lg:text-[12px]">
            Our Packages
          </a>

          <a href="#contact" className="relative text-[#0F172A] text-[13px] font-medium transition-colors hover:text-[#2563EB] lg:text-[12px]">
            Contact Us
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="flex md:hidden items-center justify-center w-10 h-10 text-[#0F172A] bg-gray-50 rounded-xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Login - Hidden on mobile when menu is open */}
        <button className={`flex items-center justify-center gap-2 p-2.5 px-3 text-white bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] border-none rounded-xl text-[12px] font-semibold shadow-[0_6px_18px_rgba(37,99,235,0.22)] transition-transform hover:-translate-y-px hover:shadow-[0_9px_22px_rgba(37,99,235,0.3)] md:min-w-[145px] md:p-2.75 md:px-4.25 ${isMobileMenuOpen ? 'max-md:hidden' : ''}`}>
          <UserRound size={17} />
          <span className="hidden md:inline">Login / Signup</span>
        </button>

      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-24 left-0 right-0 bg-white border border-[rgba(226,232,240,0.8)] rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.06)] p-4 mx-4 md:mx-7 z-50">
          <nav className="flex flex-col gap-4">
            <a href="/" className="text-[#2563EB] text-[13px] font-semibold">Home</a>
            <a href="#about" className="text-[#0F172A] text-[13px] font-medium hover:text-[#2563EB]">About Us</a>
            <a href="#doctors" className="text-[#0F172A] text-[13px] font-medium hover:text-[#2563EB]">Find Doctors</a>
            <a href="#services" className="text-[#0F172A] text-[13px] font-medium hover:text-[#2563EB]">Services</a>
            <a href="#packages" className="text-[#0F172A] text-[13px] font-medium hover:text-[#2563EB]">Our Packages</a>
            <a href="#contact" className="text-[#0F172A] text-[13px] font-medium hover:text-[#2563EB]">Contact Us</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
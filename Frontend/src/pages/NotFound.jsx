import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import notFoundIllustration from "../assets/404-healthcare.jpg";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 flex flex-col justify-between selection:bg-blue-500 selection:text-white relative overflow-hidden">
      {/* Light Navbar explicitly visible from initial load */}
      <Navbar forceLight={true} />

      {/* Subtle Background Geometric Pattern matching reference */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(#2563EB 1.5px, transparent 1.5px), radial-gradient(#0D9488 1.5px, transparent 1.5px)`,
          backgroundSize: '48px 48px',
          backgroundPosition: '0 0, 24px 24px'
        }}
      />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16">
        <div className="w-full max-w-5xl mx-auto text-center flex flex-col items-center">

          {/* 1. Big OOPS! Heading */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-slate-900 uppercase select-none leading-none mb-2">
            OOPS!
          </h1>

          {/* 2. Full-Screen Seamless Vector Artwork (No rigid borders or boxes) */}
          <div className="w-full max-w-4xl lg:max-w-5xl my-2 sm:my-4 flex items-center justify-center">
            <img
              src={notFoundIllustration}
              alt="404 Connection Lost"
              className="w-full h-auto max-h-[480px] sm:max-h-[540px] md:max-h-[600px] object-contain mx-auto mix-blend-multiply transition-transform duration-700 hover:scale-[1.01]"
            />
          </div>

          {/* 3. Page Not Found & Subtitle */}
          <div className="space-y-3 max-w-xl mx-auto -mt-2 sm:-mt-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Page Not Found
            </h2>
            <p className="text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>

          {/* 4. Prominent "Go To Home" Button with vibrant gradient */}
          <div className="pt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl bg-gradient-to-r from-[#2563EB] via-blue-600 to-[#0D9488] hover:from-blue-700 hover:via-blue-700 hover:to-teal-700 text-white font-bold text-base shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
            >
              <Home size={19} />
              <span>Go To Home</span>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;

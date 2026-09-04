import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import {
  ShieldCheck,
  Lock,
  Calendar,
  User,
  FileText,
  Activity,
  Server,
  Bell,
  Mail,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Eye,
  RefreshCw,
  Users,
  Settings,
  Printer,
  Copy,
  Search,
  ExternalLink,
  FolderLock,
  UserCheck,
  Sparkles,
  DownloadCloud,
  ArrowRight,
  Share2,
  KeyRound,
  Shield,
  PhoneCall
} from "lucide-react";

const tableOfContents = [
  { id: "introduction", label: "1. Introduction & Scope", num: "01" },
  { id: "privacy-glance", label: "2. Privacy at a Glance", num: "02" },
  { id: "information-collected", label: "3. Information We Collect", num: "03" },
  { id: "data-utilization", label: "4. How We Utilize Data", num: "04" },
  { id: "encryption-security", label: "5. Encryption & Security", num: "05" },
  { id: "patient-rights", label: "6. Your Patient Rights", num: "06" },
  { id: "data-sharing", label: "7. Laboratory & Specialist Sharing", num: "07" },
  { id: "retention-deletion", label: "8. Data Retention & Deletion", num: "08" },
  { id: "privacy-inquiries", label: "9. Contact Privacy Officer", num: "09" }
];

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = tableOfContents.length - 1; i >= 0; i--) {
        const item = tableOfContents[i];
        const element = document.getElementById(item.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setToastMessage("Policy link copied to clipboard!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-['Poppins',sans-serif] flex flex-col justify-between">
      <Navbar />

      {/* Print Stylesheet */}
      <style>{`
        @media print {
          header, footer, .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
          }
          .print-full-width {
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white border border-slate-700 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-fadeIn no-print">
          <CheckCircle size={16} className="text-teal-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      <div className="flex-grow">
        
        {/* ================= 1. HERO SECTION WITH CERTIFICATION CLUSTER ================= */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#E0F2FE]/40 via-[#F0FDFA]/30 to-[#F8FAFC] pt-28 pb-16 md:pb-20 border-b border-[#E2E8F0]">
          
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] items-center gap-10">
              
              {/* Left Column: Heading & Introduction */}
              <div className="flex flex-col items-start gap-4">
                
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#64748B] font-medium no-print">
                  <Link to="/" className="hover:text-[#2563EB] transition-colors">Home</Link>
                  <ChevronRight size={14} className="text-slate-400" />
                  <span className="text-[#0D9488] font-bold">Privacy Policy & Patient Data Trust</span>
                </nav>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-teal-200/80 shadow-xs text-[#0D9488] text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  <ShieldCheck size={16} className="text-[#0D9488]" />
                  <span>Confidential Healthcare Architecture</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-slate-900 leading-[1.15]">
                  Patient Privacy & <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-[#2563EB] to-[#0D9488] bg-clip-text text-transparent">
                    Data Protection Policy
                  </span>
                </h1>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                  Your medical records and personal dignity are sacred. Learn how SmartHealth encrypts, safeguards, and handles your consultations under statutory healthcare compliance standards.
                </p>

              </div>

              {/* Right Column: Security & Compliance Shield Matrix */}
              <div className="bg-white/90 border border-slate-200/90 rounded-3xl p-6 shadow-sm backdrop-blur-md relative overflow-hidden">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center font-bold">
                    <Lock size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">Security & Clinical Trust Matrix</h3>
                    <p className="text-[11px] text-slate-400">Certified regulatory compliance</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                    <KeyRound size={16} className="text-blue-600 shrink-0" />
                    <div>
                      <strong className="text-xs font-bold text-slate-800 block">256-Bit AES</strong>
                      <span className="text-[10px] text-slate-500">Encrypted at rest</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                    <ShieldCheck size={16} className="text-teal-600 shrink-0" />
                    <div>
                      <strong className="text-xs font-bold text-slate-800 block">HIPAA Compliant</strong>
                      <span className="text-[10px] text-slate-500">Protected health info</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                    <Server size={16} className="text-purple-600 shrink-0" />
                    <div>
                      <strong className="text-xs font-bold text-slate-800 block">ISO 27001</strong>
                      <span className="text-[10px] text-slate-500">Certified data center</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                    <UserCheck size={16} className="text-amber-600 shrink-0" />
                    <div>
                      <strong className="text-xs font-bold text-slate-800 block">Doctor Isolation</strong>
                      <span className="text-[10px] text-slate-500">Zero-leak privilege</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Audit Cycle: Annual Third-Party</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> All Systems Active
                  </span>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ================= 2. POLICY UTILITIES & SEARCH STRIP ================= */}
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 -mt-7 relative z-20 no-print">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Version & Status */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  LEGAL VERSION STATUS
                </span>
                <p className="text-xs sm:text-sm font-extrabold text-slate-800">
                  Version 2.4 • Effective September 2026
                </p>
              </div>
            </div>

            {/* Utility Actions */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition cursor-pointer"
                title="Copy Direct Link"
              >
                <Copy size={14} className="text-[#2563EB]" />
                <span>Share Link</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition cursor-pointer"
                title="Print Formal Policy"
              >
                <Printer size={14} className="text-[#0D9488]" />
                <span>Print Policy</span>
              </button>

              <Link
                to="/faq"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white text-xs font-bold shadow-xs hover:shadow-md transition"
              >
                <span>Help Center & FAQ</span>
                <ArrowRight size={13} />
              </Link>
            </div>

          </div>
        </div>

        {/* ================= 3. "PRIVACY AT A GLANCE" EXECUTIVE SUMMARY ================= */}
        <div id="privacy-glance" className="w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-12">
          <div className="mb-4">
            <span className="text-xs font-bold text-[#0D9488] uppercase tracking-[2px]">
              EXECUTIVE HIGHLIGHTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mt-1">
              Privacy at a Glance
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              The 3 core tenets governing how your medical records are treated on SmartHealth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Tenet 1: Zero Data Selling */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                <Shield size={22} />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2">
                1. Zero Data Monetization
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We never sell, rent, monetize, or broker patient medical records, symptom searches, or appointment histories to commercial advertisers or pharmaceutical brokers.
              </p>
            </div>

            {/* Tenet 2: Strict Doctor Isolation */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center mb-4">
                <FolderLock size={22} />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2">
                2. Strict Doctor Isolation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your medical history and prescriptions are accessible strictly to the licensed specialist conducting your booked consultation, with complete role-based session isolation.
              </p>
            </div>

            {/* Tenet 3: 100% Patient Ownership */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4">
                <DownloadCloud size={22} />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2">
                3. Full Patient Ownership
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You own your medical data. Download, print, or export your digital prescriptions and diagnostic history anytime from your dashboard, or request account erasure.
              </p>
            </div>

          </div>
        </div>

        {/* ================= 4. MAIN CONTENT WITH STICKY SIDEBAR ================= */}
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[290px_1fr] gap-10 items-start">
            
            {/* Sticky Table of Contents Sidebar */}
            <aside className="hidden lg:block sticky top-28 bg-white border border-slate-200/90 rounded-3xl p-5 shadow-xs no-print">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                <FileText size={14} className="text-[#0D9488]" />
                <span>Table of Contents</span>
              </h4>

              <nav className="space-y-1">
                {tableOfContents.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                        isActive
                          ? "bg-teal-50 text-[#0D9488] font-extrabold border-l-3 border-[#0D9488]"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <span className="truncate pr-2">{item.label}</span>
                      <span className={`text-[10px] font-mono ${isActive ? "text-[#0D9488]" : "text-slate-400"}`}>
                        {item.num}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Fast Emergency Help Box in Sidebar */}
              <div className="mt-6 pt-5 border-t border-slate-100 px-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Privacy Compliance Officer
                </span>
                <a 
                  href="mailto:dpo@smarthealth.com"
                  className="text-xs font-bold text-[#2563EB] hover:underline block truncate"
                >
                  dpo@smarthealth.com
                </a>
              </div>
            </aside>

            {/* Document Content Columns */}
            <div className="space-y-10 print-full-width">
              
              {/* Section 1: Introduction */}
              <section id="introduction" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold text-sm">
                    01
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Introduction & Platform Scope
                  </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    SmartHealth Healthcare System ("SmartHealth", "we", "our", or "us") operates a cloud-native medical coordination platform connecting patients with certified clinicians, diagnostic clinics, and hospital departments. We recognize that medical consultation data is among the most sensitive personal information an individual possesses.
                  </p>
                  <p>
                    This Privacy Policy applies to all services offered through our website, patient dashboard, doctor portal, and administrative dispatch channels. It outlines the lawful bases under which we collect, store, transmit, and protect Protected Health Information (PHI) in compliance with applicable health privacy statutes.
                  </p>
                </div>
              </section>

              {/* Section 2: Information Collected */}
              <section id="information-collected" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center font-bold text-sm">
                    03
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Information We Collect
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mb-6">
                  We gather only the minimum necessary data required to schedule care, deliver consultations, and comply with clinical audit regulations:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-2">
                      <User size={16} className="text-[#2563EB]" />
                      <span>Patient Demographics</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                      <li>Full legal name, gender, date of birth</li>
                      <li>Contact email and SMS phone number</li>
                      <li>City, state, and emergency contact details</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-2">
                      <Activity size={16} className="text-[#0D9488]" />
                      <span>Clinical Consultation Data</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                      <li>Current medical symptoms & concerns</li>
                      <li>Past medical history, allergies & surgeries</li>
                      <li>Digital prescriptions & doctor consultation notes</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-2">
                      <Server size={16} className="text-purple-600" />
                      <span>Technical & Audit Metadata</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                      <li>IP address, browser type & timestamp logs</li>
                      <li>Authentication session tokens (JWT)</li>
                      <li>Audit logs for authorized doctor access</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-2">
                      <Bell size={16} className="text-amber-600" />
                      <span>Patient Feedback & Reviews</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                      <li>Patient feedback ratings and testimonials</li>
                      <li>Support ticket correspondence</li>
                      <li>Opt-in wellness newsletter preferences</li>
                    </ul>
                  </div>

                </div>
              </section>

              {/* Section 3: Data Utilization */}
              <section id="data-utilization" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
                    04
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    How We Utilize Your Health Data
                  </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-start gap-3">
                    <CheckCircle size={18} className="text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 text-sm block">Appointment Facilitation & Booking</strong>
                      <span>Matching you with verified clinicians, reserving real-time time slots, generating digital booking tokens, and dispatching SMS/email reminders.</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-start gap-3">
                    <CheckCircle size={18} className="text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 text-sm block">Continuity of Clinical Care</strong>
                      <span>Enabling your attending doctor to view previous clinical history, update electronic prescriptions, and document diagnosis notes securely.</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-start gap-3">
                    <CheckCircle size={18} className="text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 text-sm block">System Integrity & Legal Audit</strong>
                      <span>Investigating fraudulent access attempts, conducting compliance audits, and maintaining statutory record retention mandated by medical councils.</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4: Encryption & Security */}
              <section id="encryption-security" className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white rounded-3xl p-6 sm:p-10 shadow-xl scroll-mt-28 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                    <Lock size={13} />
                    <span>Cryptographic Safeguards</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
                    Military-Grade 256-Bit Data Encryption
                  </h2>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-2xl">
                    SmartHealth stores all diagnostic records, medical notes, and identifiers in physically secure, ISO 27001-certified cloud medical clusters.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-200">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <strong className="text-white block font-bold mb-1">AES-256 at Rest</strong>
                      <span>All database volumes and document archives encrypted with rotating master keys.</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <strong className="text-white block font-bold mb-1">TLS 1.3 in Transit</strong>
                      <span>End-to-end forward secrecy encryption across all browser and API exchanges.</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <strong className="text-white block font-bold mb-1">Role-Based Access (RBAC)</strong>
                      <span>Doctors can only inspect patients with whom they have an active consultation.</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <strong className="text-white block font-bold mb-1">Encrypted Automated Backups</strong>
                      <span>Daily immutable backups stored in geographically isolated secure cloud zones.</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: Your Patient Rights */}
              <section id="patient-rights" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold text-sm">
                    06
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Your Statutory Rights as a Patient
                  </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  <p>
                    <strong>• Right of Full Access:</strong> You may at any time inspect and download your complete medical consultation history and diagnostic prescriptions from your patient account.
                  </p>
                  <p>
                    <strong>• Right to Rectification:</strong> If any contact details, emergency information, or biographical data are inaccurate, you can update them instantly in profile settings.
                  </p>
                  <p>
                    <strong>• Right to Data Portability:</strong> Request an export of your digital records in standard structured formats for transfer to other clinics.
                  </p>
                  <p>
                    <strong>• Right to Erasure:</strong> You can submit an account closure request. Subject to mandatory medical council record retention laws (typically 3 to 7 years for clinical notes), all non-mandated personal identifiers are permanently purged.
                  </p>
                </div>

                {/* Direct Patient Dashboard Action Banner */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-teal-50 to-white border border-teal-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">Want to inspect your medical records?</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Access your personal health vault directly.</p>
                  </div>
                  <Link
                    to="/patient/dashboard?tab=Medical Records"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white text-xs font-bold shadow-xs hover:shadow-md transition shrink-0"
                  >
                    <span>Open Health Records</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </section>

              {/* Section 6: Third-Party & Lab Sharing */}
              <section id="data-sharing" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm">
                    07
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Laboratory & Third-Party Sharing Rules
                  </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    SmartHealth does not share patient data with third parties except under the following strict operational necessities:
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>
                      <strong>Diagnostic Pathology Laboratories:</strong> Only when an attending doctor issues an electronic lab order authorized by the patient.
                    </li>
                    <li>
                      <strong>Payment Processing Gateways:</strong> Secure tokenized transaction verification (we never store full credit card or CVV details).
                    </li>
                    <li>
                      <strong>Statutory Legal Compliance:</strong> In response to lawful court subpoenas, public health epidemic reporting mandates, or imminent threats to patient life.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 7: Retention & Deletion */}
              <section id="retention-deletion" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                    08
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Data Retention & Account Deletion
                  </h2>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    We retain clinical histories for the period specified by the Medical Council of India (MCI) and international healthcare governance bodies to ensure medical malpractice safety and diagnostic continuity.
                  </p>
                  <p>
                    Upon verified account closure request, non-clinical analytics data, session cookies, and marketing opt-ins are deleted within 30 days.
                  </p>
                </div>
              </section>

              {/* Section 8: Contact Privacy Officer */}
              <section id="privacy-inquiries" className="bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white rounded-3xl p-6 sm:p-10 shadow-xl scroll-mt-28">
                <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-teal-200 text-[11px] font-bold uppercase tracking-wider mb-3 border border-white/20">
                  Data Protection Officer (DPO)
                </span>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
                  Have Questions About Your Privacy?
                </h2>

                <p className="text-slate-100 text-xs sm:text-sm mb-6 max-w-xl leading-relaxed">
                  For formal data access requests, clinical record corrections, or inquiries regarding our cryptographic safeguards, contact our dedicated compliance officer.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                    <span className="text-[10px] uppercase font-bold text-teal-200 block mb-1">Direct Privacy Desk</span>
                    <a href="mailto:privacy@smarthealth.com" className="text-sm font-bold text-white hover:underline block">
                      privacy@smarthealth.com
                    </a>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                    <span className="text-[10px] uppercase font-bold text-teal-200 block mb-1">Emergency Hospital Line</span>
                    <a href="tel:+919876543210" className="text-sm font-bold text-white hover:underline block">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#2563EB] font-bold text-xs sm:text-sm shadow-lg hover:bg-slate-50 transition hover:-translate-y-0.5"
                >
                  <Mail size={15} />
                  <span>Submit Privacy Ticket</span>
                </Link>
              </section>

            </div>

          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
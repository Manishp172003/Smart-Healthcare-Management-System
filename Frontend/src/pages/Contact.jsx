import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  AtSign,
  FileText,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { motion } from "framer-motion";
import contactBg from "../assets/About-Section/Contact-section.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-['Poppins',sans-serif] text-slate-800 antialiased selection:bg-cyan-500 selection:text-white">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >

      {/* HEADER INTRO SECTION */}
      <section className="relative overflow-hidden pt-48 pb-40 lg:pt-64 lg:pb-52 text-white min-h-[75vh]">
        {/* Healthcare Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${contactBg})` }}
        />
        {/* Enhanced dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-slate-950/70 z-0" />

        {/* Decorative Glow Elements */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-6">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-inner font-['Poppins',sans-serif]">
              <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span>Contact Us</span>
            </div>

            {/* Heading - solid dark rich contrast */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white font-['Poppins',sans-serif] drop-shadow-md">
              Let's Connect <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">With You</span>
            </h1>

            {/* Supporting Text - solid deep slate text with strong legibility */}
            <p className="text-slate-200 text-lg sm:text-xl leading-relaxed font-['Poppins',sans-serif] font-medium drop-shadow max-w-2xl mx-auto">
              Have questions or need assistance? Reach out to our team for any healthcare-related queries, appointment support, or guidance.
            </p>

          </div>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-50">
        
        {/* Subtle decorative background blur shapes */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT SIDE: Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold tracking-wider uppercase shadow-sm">
                  <span>GET IN TOUCH</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  We're Here to Help
                </h2>

                <p className="text-slate-600 text-base leading-relaxed">
                  Have questions about appointments, doctors, or our healthcare services? Our team is here to assist you.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                
                {/* Phone Card */}
                <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-cyan-500/40 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0 group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-500 transition-colors duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Phone Number</h4>
                    <a href="tel:+919876543210" className="text-slate-900 font-semibold text-base hover:text-cyan-600 transition-colors">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Email Card */}
                <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-cyan-500/40 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0 group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-500 transition-colors duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Email Address</h4>
                    <a href="mailto:support@smarthealthcare.com" className="text-slate-900 font-semibold text-base hover:text-cyan-600 transition-colors">
                      support@smarthealthcare.com
                    </a>
                  </div>
                </div>

                {/* Address Card */}
                <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-cyan-500/40 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0 group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-500 transition-colors duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Office Location</h4>
                    <p className="text-slate-900 font-semibold text-base">
                      Nagpur, Maharashtra, India
                    </p>
                  </div>
                </div>

                {/* Working Hours Card */}
                <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-cyan-500/40 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0 group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-500 transition-colors duration-300">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Working Hours</h4>
                    <p className="text-slate-900 font-semibold text-base">
                      Mon - Sat, 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT SIDE: Contact Form Card */}
            <div className="lg:col-span-7">
              <div className="bg-white/90 backdrop-blur-xl rounded-[32px] border border-slate-200/80 p-8 sm:p-10 shadow-xl shadow-slate-200/50 relative">
                
                {/* Success Message Notification */}
                {submitted && (
                  <div className="mb-6 p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center gap-3 animate-fadeIn">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">Message Sent Successfully!</h4>
                      <p className="text-xs text-teal-700">Thank you for reaching out. Our support team will get back to you shortly.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Full Name <span className="text-cyan-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Email Address <span className="text-cyan-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <AtSign className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Phone Number <span className="text-cyan-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-4 h-4" />
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Subject <span className="text-cyan-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <FileText className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Appointment Inquiry"
                          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Message <span className="text-cyan-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute top-4 left-4 pointer-events-none text-slate-400">
                        <MessageSquare className="w-4 h-4" />
                      </span>
                      <textarea
                        name="message"
                        required
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please write your questions or details here..."
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button & Privacy Note */}
                  <div className="space-y-4 pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-teal-400 transition-all duration-300 flex items-center justify-center gap-2 text-base"
                    >
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
                      <ShieldCheck className="w-4 h-4 text-teal-600" />
                      <span>Your information is safe and secure with us.</span>
                    </div>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </motion.div>

    <Footer />
    </div>
  );
};

export default Contact;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import faqHeroImg from "../assets/About-Section/FAQ-Hero.png";
import { 
  HelpCircle, 
  Search, 
  Plus, 
  Minus, 
  Calendar, 
  UserCheck, 
  ShieldCheck, 
  CreditCard, 
  FileText, 
  MessageCircle, 
  CalendarCheck, 
  Mail, 
  Phone, 
  Clock, 
  ChevronRight,
  Home,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Filter
} from 'lucide-react';

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [helpfulFeedback, setHelpfulFeedback] = useState({});

  const categories = [
    { name: 'All', icon: FileText, description: 'All FAQs', count: 15 },
    { name: 'General', icon: HelpCircle, description: 'Platform Info', count: 3 },
    { name: 'Appointments', icon: Calendar, description: 'Booking & Slots', count: 4 },
    { name: 'Doctors', icon: UserCheck, description: 'Specialist Verification', count: 3 },
    { name: 'Account', icon: ShieldCheck, description: 'Security & Privacy', count: 3 },
    { name: 'Payments', icon: CreditCard, description: 'Fees & Invoices', count: 2 }
  ];

  const popularChips = [
    "Cancel appointment",
    "Doctor fees",
    "Verified doctors",
    "Medical records",
    "Emergency support",
    "Payment receipts"
  ];

  const faqs = [
    {
      id: 1,
      category: 'General',
      question: 'What is SmartHealth?',
      answer: 'SmartHealth is a modern healthcare appointment and patient management system designed to seamlessly connect patients with certified medical specialists, streamline real-time booking, and securely store digital medical records.'
    },
    {
      id: 2,
      category: 'General',
      question: 'How does SmartHealth work?',
      answer: 'SmartHealth allows you to search verified doctors by specialty or location, inspect their available slots, book physical or telemedicine consultations, receive digital booking tokens, and track medical history from your centralized dashboard.'
    },
    {
      id: 3,
      category: 'General',
      question: 'Is SmartHealth free to use for patients?',
      answer: 'Browsing specialists, checking clinic availability, and maintaining your personal health records on SmartHealth is completely free. Patients only pay the standard clinical consultation fees set transparently by individual doctors.'
    },
    {
      id: 4,
      category: 'Appointments',
      question: 'How do I book an appointment?',
      answer: 'Navigate to "Book Appointment" or choose a physician on the "Find Doctors" directory. Select a convenient calendar date and time slot, enter patient details, and confirm to receive your instant digital booking token.'
    },
    {
      id: 5,
      category: 'Appointments',
      question: 'Can I cancel or reschedule my appointment?',
      answer: 'Yes. You can cancel or reschedule upcoming appointments through your Patient Dashboard under the "Appointments" tab up to 2 hours before the scheduled slot with zero penalty.'
    },
    {
      id: 6,
      category: 'Appointments',
      question: 'Will I receive an appointment confirmation?',
      answer: 'Yes! You will receive an immediate on-screen digital confirmation receipt along with SMS and email notifications containing clinic directions, doctor details, and your unique appointment token.'
    },
    {
      id: 7,
      category: 'Appointments',
      question: 'Can I book an appointment for a family member?',
      answer: 'Yes! While logged in to your account, you can enter your dependent or family member’s name, age, gender, and specific medical symptoms during checkout.'
    },
    {
      id: 8,
      category: 'Doctors',
      question: 'Are all doctors on SmartHealth verified?',
      answer: 'Yes, every doctor undergoes rigorous credential verification—including medical council licenses, postgraduate certifications, hospital affiliations, and background checks—before their profile is published.'
    },
    {
      id: 9,
      category: 'Doctors',
      question: 'Can I see doctor reviews and consultation fees before booking?',
      answer: 'Yes, full transparency is our priority. You can review genuine patient ratings, verified testimonials, qualifications, years of clinical experience, and exact consultation fees upfront.'
    },
    {
      id: 10,
      category: 'Doctors',
      question: 'How can a medical specialist join the SmartHealth network?',
      answer: 'Certified doctors can register by selecting the "Doctor" portal on the sign-up page and submitting their medical licensing credentials for administrative board verification.'
    },
    {
      id: 11,
      category: 'Account',
      question: 'How is my medical data and privacy protected?',
      answer: 'We enforce 256-bit AES encryption at rest and TLS 1.3 in transit. Your medical history, prescriptions, and test results are confidential and protected under strict HIPAA and ISO 27001 data isolation policies.'
    },
    {
      id: 12,
      category: 'Account',
      question: 'Can I access past prescriptions and laboratory reports?',
      answer: 'Yes! Navigate to the "Medical Records" tab in your Patient Dashboard anytime to view, download, or print previous diagnostic reports, e-prescriptions, and physician clinical notes.'
    },
    {
      id: 13,
      category: 'Account',
      question: 'What should I do if I forget my account password?',
      answer: 'Click "Forgot Password" on the login screen, enter your registered email address, and follow the secure password reset instructions delivered to your inbox.'
    },
    {
      id: 14,
      category: 'Payments',
      question: 'What payment methods are supported for consultations?',
      answer: 'We support all major payment modes including credit/debit cards (Visa, MasterCard), UPI (Google Pay, PhonePe, Paytm), Net Banking, and direct clinic desk payments.'
    },
    {
      id: 15,
      category: 'Payments',
      question: 'Will I receive an official invoice and payment receipt?',
      answer: 'Yes, a downloadable digital tax invoice and GST-compliant clinic receipt are generated automatically upon successful booking confirmation.'
    }
  ];

  // Trigger brief shimmer loading on category change or query change
  const handleCategoryChange = (catName) => {
    if (selectedCategory === catName) return;
    setIsLoading(true);
    setSelectedCategory(catName);
    setOpenIndex(null);
    setTimeout(() => {
      setIsLoading(false);
    }, 320);
  };

  const handleChipClick = (chipText) => {
    setIsLoading(true);
    setSearchQuery(chipText);
    setSelectedCategory('All');
    setOpenIndex(null);
    setTimeout(() => {
      setIsLoading(false);
    }, 280);
  };

  const handleFeedback = (faqId, isHelpful) => {
    setHelpfulFeedback(prev => ({
      ...prev,
      [faqId]: isHelpful ? 'yes' : 'no'
    }));
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-['Poppins',sans-serif] flex flex-col justify-between">
      <Navbar />

      {/* Shimmer CSS Style */}
      <style>{`
        @keyframes shimmerWave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .skeleton-shimmer {
          position: relative;
          overflow: hidden;
          background-color: #E2E8F0;
        }
        .skeleton-shimmer::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.5) 40%,
            rgba(255, 255, 255, 0.8) 60%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmerWave 1.4s infinite;
        }
      `}</style>

      <div className="flex-grow">
        
        {/* ================= 1. HERO SECTION WITH SEARCH CONSOLE & BACKGROUND BANNER ================= */}
        <section 
          className="relative overflow-hidden bg-cover bg-no-repeat pt-28 md:pt-32 pb-20 md:pb-24 border-b border-slate-200/80"
          style={{
            backgroundImage: `url('${faqHeroImg}')`,
            backgroundPosition: 'right 20% center',
          }}
        >
          {/* Responsive gradient overlay: Clear text legibility on the left, reveals doctor & clinic on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/25 md:via-white/85 md:to-transparent z-0 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent z-0 pointer-events-none" />

          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-xl lg:max-w-2xl text-left">
              
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 mb-4 font-medium">
                <Link to="/" className="hover:text-[#2563EB] flex items-center transition-colors">
                  <Home className="w-3.5 h-3.5 mr-1" /> Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[#0D9488] font-bold">Help Center & FAQ</span>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-teal-200/80 shadow-xs mb-4 text-[#0D9488] text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
                <span>24/7 Knowledgebase & Clinical Support</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-slate-900 mb-4 leading-[1.15]">
                How Can We <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#2563EB] to-[#0D9488] bg-clip-text text-transparent">
                  Help You Today?
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 max-w-lg">
                Instant answers to appointment scheduling, doctor consultations, digital prescriptions, and clinical policies.
              </p>

              {/* Centralized Search Console */}
              <div className="relative mb-4 max-w-lg">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search questions or keywords (e.g. reschedule, fee)..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (!isLoading) {
                        setIsLoading(true);
                        setTimeout(() => setIsLoading(false), 240);
                      }
                    }}
                    className="w-full pl-12 pr-20 py-3.5 sm:py-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 focus:border-[#2563EB] shadow-[0_10px_25px_rgba(15,23,42,0.06)] text-xs sm:text-sm transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setIsLoading(true);
                        setTimeout(() => setIsLoading(false), 200);
                      }}
                      className="absolute right-3 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Popular Search Suggestion Chips */}
              <div className="flex items-center gap-1.5 flex-wrap max-w-lg">
                <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1 mr-1">
                  <Filter size={12} className="text-[#0D9488]" /> Popular:
                </span>
                {popularChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleChipClick(chip)}
                    className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                      searchQuery.toLowerCase() === chip.toLowerCase()
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                        : 'bg-white/90 hover:bg-white text-slate-600 hover:text-[#2563EB] border-slate-200 shadow-2xs'
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ================= 2. CATEGORY TABS WITH QUESTION COUNTS ================= */}
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 -mt-6 relative z-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.name;

              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`flex flex-col items-center p-4 sm:p-5 rounded-2xl border transition-all duration-300 text-center cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#2563EB] to-[#0D9488] text-white border-transparent shadow-[0_12px_28px_rgba(37,99,235,0.28)] -translate-y-1'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-teal-300 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {/* Category Pill Icon */}
                  <div className={`p-2.5 rounded-xl mb-2.5 transition-colors ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-teal-50 text-[#0D9488]'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-xs sm:text-sm font-extrabold mb-0.5">{cat.name}</h3>
                  
                  <span className={`text-[10px] font-semibold ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                    {cat.count} Questions
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= 3. FAQ ACCORDION / SKELETON LOADER SECTION ================= */}
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-14">
          
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-6 pb-2 border-b border-slate-200/80">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-slate-900">
                {selectedCategory === 'All' ? 'All Questions' : `${selectedCategory} Questions`}
              </span>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                {filteredFaqs.length} Available
              </span>
            </div>

            {searchQuery && (
              <span className="text-xs text-slate-500">
                Matches for <strong className="text-slate-800">"{searchQuery}"</strong>
              </span>
            )}
          </div>

          {/* SKELETON LOADER: Displayed during category transition or query filter */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div 
                  key={item} 
                  className="border border-slate-200 rounded-2xl p-5 bg-white shadow-xs flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 w-3/4">
                    {/* Pill Skeleton */}
                    <div className="w-20 h-6 rounded-md skeleton-shimmer shrink-0" />
                    {/* Title Skeleton */}
                    <div className="w-full h-5 rounded skeleton-shimmer" />
                  </div>
                  {/* Circle Skeleton */}
                  <div className="w-8 h-8 rounded-full skeleton-shimmer shrink-0" />
                </div>
              ))}
            </div>
          ) : filteredFaqs.length > 0 ? (
            
            /* REAL ACCORDION CONTENT */
            <div className="space-y-3.5">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const feedback = helpfulFeedback[faq.id];

                return (
                  <div
                    key={faq.id}
                    className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                      isOpen 
                        ? 'border-[#2563EB]/40 bg-white shadow-[0_8px_25px_rgba(37,99,235,0.06)] ring-1 ring-[#2563EB]/20' 
                        : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full text-left px-5 sm:px-6 py-4.5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0D9488] bg-teal-50 border border-teal-100/80 px-2.5 py-1 rounded-md shrink-0">
                          {faq.category}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-[#0F172A] leading-snug">
                          {faq.question}
                        </span>
                      </div>

                      <div className={`p-2 rounded-full shrink-0 transition-colors ${
                        isOpen ? 'bg-[#EFF6FF] text-[#2563EB]' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="border-t border-slate-100"
                        >
                          <div className="px-5 sm:px-6 py-4.5 bg-slate-50/50 text-[#475569] text-xs sm:text-sm leading-relaxed">
                            <p>{faq.answer}</p>

                            {/* Helpfulness Micro-Widget */}
                            <div className="mt-4 pt-3.5 border-t border-slate-200/60 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-500">
                              <span className="font-medium">Was this answer helpful?</span>
                              
                              {feedback ? (
                                <span className="text-xs font-bold text-teal-700 flex items-center gap-1.5 animate-fadeIn">
                                  <CheckCircle2 size={14} className="text-teal-600" />
                                  Thank you for your feedback!
                                </span>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleFeedback(faq.id, true)}
                                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 transition cursor-pointer font-semibold text-[11px]"
                                  >
                                    <ThumbsUp size={12} />
                                    <span>Yes</span>
                                  </button>
                                  <button
                                    onClick={() => handleFeedback(faq.id, false)}
                                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition cursor-pointer font-semibold text-[11px]"
                                  >
                                    <ThumbsDown size={12} />
                                    <span>No</span>
                                  </button>
                                </div>
                              )}
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 mb-1">No matching questions found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
                We couldn't find any questions matching "{searchQuery}". Try selecting another category or speak with our 24/7 hospital support.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="px-5 py-2.5 bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md transition cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
          </div>
        </div>

        {/* ================= 4. CLINICAL TRIAGE CONTACT STRIP ================= */}
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex items-center gap-4 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Emergency Line
                </span>
                <a href="tel:+919876543210" className="text-sm font-extrabold text-slate-900 hover:text-blue-600 transition-colors">
                  +91 98765 43210
                </a>
                <p className="text-[11px] text-slate-500">24/7 Clinical Triage</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex items-center gap-4 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Email Helpdesk
                </span>
                <a href="mailto:support@smarthealth.com" className="text-sm font-extrabold text-slate-900 hover:text-teal-600 transition-colors">
                  support@smarthealth.com
                </a>
                <p className="text-[11px] text-slate-500">Response within 15 mins</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex items-center gap-4 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Hospital Helpdesk
                </span>
                <span className="text-sm font-extrabold text-slate-900">
                  Always Open 24/7
                </span>
                <p className="text-[11px] text-slate-500">365 Days a Year</p>
              </div>
            </div>

          </div>
        </div>

        {/* ================= 5. STILL HAVE QUESTIONS ACTION BANNER ================= */}
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 mb-16">
          <div className="w-full rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0D9488] p-8 sm:p-12 text-white text-center shadow-xl relative overflow-hidden border border-slate-700/60">
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-teal-300 text-[11px] font-bold uppercase tracking-wider mb-3 border border-white/10">
                Personalized Assistance
              </span>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-3 leading-tight">
                Still Can't Find Your Answer?
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm mb-7 leading-relaxed">
                Our specialized medical concierge team is online 24/7 to guide you through appointments, specialist recommendations, and treatment inquiries.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-[#2563EB] font-bold text-xs sm:text-sm shadow-md hover:bg-slate-50 transition-all hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> Contact Healthcare Concierge
                </Link>
                <Link
                  to="/appointment"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#0D9488] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 border border-white/20"
                >
                  <CalendarCheck className="w-4 h-4 mr-2" /> Book Appointment Directly
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Faq;
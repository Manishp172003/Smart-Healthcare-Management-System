import { useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Riya S.",
    role: "Patient",
    rating: 5,
    text: "Dr. Ananya is not just an excellent doctor but also an amazing human being. She listened to me patiently and made my journey so comfortable.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    name: "Pooja M.",
    role: "Mother of 2",
    rating: 5,
    text: "The entire team at SmartHealth is so supportive and caring. I felt safe and confident throughout my pregnancy.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    name: "Anjali K.",
    role: "Patient",
    rating: 5,
    text: "Finally found a place where healthcare is taken seriously and with so much compassion. Highly recommend!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    name: "Aarav Mehta",
    role: "Patient",
    rating: 5,
    text: "Booking an appointment through SmartHealth was incredibly easy. I was able to find a specialist in less than five minutes.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    name: "Rajesh Patel",
    role: "Retired Senior",
    rating: 5,
    text: "As an elderly patient, traveling long distances for appointment booking was tough. Now I book consults directly from home.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
  }
];

const TestimonialsSection = () => {
  const scrollContainerRef = useRef(null);

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector(".testimonial-card")?.offsetWidth || 300;
      scrollContainerRef.current.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector(".testimonial-card")?.offsetWidth || 300;
      scrollContainerRef.current.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full px-4 md:px-7 max-w-[1440px] mx-auto" id="testimonials">
      <div className="w-full bg-[#0F766E] rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.08)] px-6 py-8 md:p-10 text-white relative overflow-hidden">
        
        {/* Leaf Watermark 1 (Top Right) */}
        <div className="absolute top-[-30px] right-[-30px] w-[260px] h-[260px] text-white/5 pointer-events-none opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M50 15 C68 15 85 32 85 50 C85 68 68 85 50 85 C32 85 15 68 15 50 C15 32 32 15 50 15 Z" />
            <path d="M50 15 L50 85" />
            <path d="M15 50 L85 50" />
            <path d="M25 25 C38 38 50 50 50 50" strokeDasharray="3 3" />
            <path d="M75 25 C62 38 50 50 50 50" strokeDasharray="3 3" />
            <path d="M25 75 C38 62 50 50 50 50" strokeDasharray="3 3" />
            <path d="M75 75 C62 62 50 50 50 50" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="8" stroke="currentColor" fill="none" />
          </svg>
        </div>

        {/* Leaf Watermark 2 (Bottom Left) */}
        <div className="absolute bottom-[-50px] left-[-50px] w-[280px] h-[280px] text-white/5 pointer-events-none opacity-20">
          <svg className="w-full h-full animate-[spin_120s_linear_infinite]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M50 15 C68 15 85 32 85 50 C85 68 68 85 50 85 C32 85 15 68 15 50 C15 32 32 15 50 15 Z" />
            <path d="M50 15 L50 85" />
            <path d="M15 50 L85 50" />
            <circle cx="50" cy="50" r="16" stroke="currentColor" fill="none" />
            <circle cx="50" cy="50" r="26" stroke="currentColor" fill="none" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Header */}
        <div className="max-w-[650px] mx-auto text-center mb-6 relative z-2">
          <span className="text-[#a7f3d0] text-xs font-bold tracking-[2px] uppercase">
            PATIENT STORIES
          </span>

          <h2 className="mt-1 text-white text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight">
            Real Patients. Real Stories.
          </h2>

          <div className="mt-2 text-[#a7f3d0] flex items-center justify-center">
            <div className="w-10 h-[1.5px] bg-white/20" />
            <div className="mx-3.5 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a7f3d0]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#a7f3d0]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#a7f3d0]" />
            </div>
            <div className="w-10 h-[1.5px] bg-white/20" />
          </div>
        </div>

        {/* Slider Section */}
        <div className="relative w-full flex items-center mt-6 px-2 md:px-6 z-2">
          
          {/* Navigation Prev Button */}
          <button 
            onClick={scrollPrev}
            className="absolute left-0 md:left-[-12px] lg:left-[-20px] top-[50%] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all shadow-lg active:scale-95 focus:outline-none"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Scrolling Container */}
          <div
            ref={scrollContainerRef}
            className="w-full flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-4 px-2"
          >
            {testimonials.map((t, idx) => {
              const delayClasses = ['animate-delay-100', 'animate-delay-200', 'animate-delay-300', 'animate-delay-400', 'animate-delay-500'];

              return (
              <div
                key={idx}
                className={`testimonial-card flex-shrink-0 snap-start w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] min-h-[200px] p-6 bg-white border border-slate-100 rounded-[28px] shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)] transition-all duration-300 flex flex-col justify-between text-slate-800 animate-on-scroll ${delayClasses[idx % delayClasses.length]}`}
              >
                <div>
                  {/* Quote Icon */}
                  <div className="text-teal-200/70 mb-2 flex items-start justify-start">
                    <Quote size={28} className="fill-current rotate-180 transform" />
                  </div>

                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed italic font-medium mb-4">
                    "{t.text}"
                  </p>
                </div>

                <div>
                  {/* Star Rating */}
                  <div className="flex gap-0.5 mb-3 text-[#d97706] justify-start">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" className="stroke-none" />
                    ))}
                  </div>

                  {/* User Bio */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-50">
                    <img 
                      src={t.image} 
                      alt={t.name} 
                      className="w-10.5 h-10.5 rounded-full object-cover border border-slate-100 bg-teal-50"
                    />
                    <div>
                      <h4 className="text-slate-900 text-xs md:text-sm font-extrabold leading-none">{t.name}</h4>
                      <span className="text-slate-400 text-[10px] md:text-xs font-semibold block mt-1">{t.role}</span>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          {/* Navigation Next Button */}
          <button 
            onClick={scrollNext}
            className="absolute right-0 md:right-[-12px] lg:right-[-20px] top-[50%] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all shadow-lg active:scale-95 focus:outline-none"
            aria-label="Next testimonials"
          >
            <ChevronRight size={22} />
          </button>

        </div>

      </div>
    </div>
  );
};

export default TestimonialsSection;

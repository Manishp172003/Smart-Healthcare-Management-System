import { 
  HeartPulse, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0F172A] border-t border-slate-800/80 py-12 md:py-16 mt-8 text-slate-300 relative overflow-hidden" id="contact">
      
      {/* Decorative background shapes */}
      <div className="absolute top-[-100px] right-[-50px] w-[200px] h-[200px] border-[30px] border-slate-800/20 rounded-full pointer-events-none" />
      <div className="absolute left-[-100px] bottom-[-120px] w-[250px] h-[250px] border-[40px] border-slate-800/20 rounded-full pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 sm:grid-cols-2 relative z-2">
          
          {/* Column 1: Branding & Socials */}
          <div className="flex flex-col gap-4">
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-9.5 h-9.5 flex items-center justify-center text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] rounded-xl">
                <HeartPulse size={20} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-[1.1]">
                <span className="text-lg font-extrabold tracking-[-0.5px] text-white">SmartHealth</span>
                <span className="text-slate-500 text-[8px] font-semibold tracking-[0.5px] uppercase">Healthcare System</span>
              </div>
            </a>
            
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-2">
              Simplifying and digitizing healthcare booking, records, scheduling, and patient coordination.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-[#2563EB] hover:text-white transition-colors text-slate-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-[#2563EB] hover:text-white transition-colors text-slate-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-[#2563EB] hover:text-white transition-colors text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-[#2563EB] hover:text-white transition-colors text-slate-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-3 sm:pl-4 lg:pl-12">
            <h4 className="text-white text-xs md:text-sm font-bold uppercase tracking-wider">Quick Links</h4>
            <nav className="flex flex-col gap-2.5 mt-2">
              <a href="/" className="text-slate-400 hover:text-white text-xs md:text-sm transition-colors">Home</a>
              <a href="#about" className="text-slate-400 hover:text-white text-xs md:text-sm transition-colors">About Us</a>
              <a href="#services" className="text-slate-400 hover:text-white text-xs md:text-sm transition-colors">Our Services</a>
              <a href="#doctors" className="text-slate-400 hover:text-white text-xs md:text-sm transition-colors">Find Doctors</a>
              <a href="#packages" className="text-slate-400 hover:text-white text-xs md:text-sm transition-colors">Packages</a>
              <a href="#testimonials" className="text-slate-400 hover:text-white text-xs md:text-sm transition-colors">Testimonials</a>
            </nav>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white text-xs md:text-sm font-bold uppercase tracking-wider">Contact Info</h4>
            <div className="flex flex-col gap-3 mt-2 text-xs md:text-sm text-slate-400">
              
              <div className="flex items-start gap-2.5">
                <MapPin size={17} className="text-[#0D9488] flex-shrink-0 mt-0.5" />
                <span>123 Care Street, Medical District, Mumbai, India</span>
              </div>
              
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#0D9488] flex-shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#0D9488] flex-shrink-0" />
                <span>support@smarthealth.com</span>
              </div>
              
              <div className="flex items-start gap-2.5">
                <Clock size={16} className="text-[#0D9488] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-slate-300">Mon - Sat: 9am - 8pm</span>
                  <span className="block text-[10px] md:text-xs">Sunday: Closed</span>
                </div>
              </div>

            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white text-xs md:text-sm font-bold uppercase tracking-wider">Newsletter</h4>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-2">
              Subscribe to get updates on health tips, schedules, and clinic news.
            </p>
            
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 mt-2.5 p-1.5 bg-slate-800/80 border border-slate-700 rounded-xl focus-within:border-slate-600 transition-colors">
              <input 
                type="email" 
                placeholder="Enter email"
                className="w-full bg-transparent border-none outline-none text-white text-xs px-2 placeholder-slate-500"
              />
              <button className="w-9.5 h-9.5 flex items-center justify-center text-white bg-gradient-to-br from-[#2563EB] to-[#0D9488] rounded-lg transition-transform hover:-translate-y-px">
                <Send size={15} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500 relative z-2">
          <span>&copy; {new Date().getFullYear()} SmartHealth Healthcare System. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

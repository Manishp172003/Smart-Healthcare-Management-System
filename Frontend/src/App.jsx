import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Auth from "./pages/auth/Auth";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import FindDoctors from "./pages/FindDoctors";
import DoctorProfile from "./pages/DoctorProfile";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import AppointmentBooking from "./pages/AppointmentBooking";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/Privacypolicy";
import NotFound from "./pages/NotFound";

// Helper component to reset scroll position and update document title on route switches
function RouteWatcher() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const titleMap = {
      "/": "SmartHealth | Intelligent Healthcare Platform",
      "/about": "About Us • SmartHealth",
      "/service": "Clinical Services • SmartHealth",
      "/contact": "Contact Support • SmartHealth",
      "/doctors": "Find Verified Doctors • SmartHealth",
      "/appointment": "Book Consultation • SmartHealth",
      "/faq": "FAQs & Patient Help • SmartHealth",
      "/privacy-policy": "Privacy Policy & Data Security • SmartHealth",
      "/login": "Sign In • SmartHealth",
      "/register": "Create Account • SmartHealth",
      "/admin/login": "Admin Authentication • SmartHealth",
    };

    if (titleMap[pathname]) {
      document.title = titleMap[pathname];
    } else if (pathname.startsWith("/doctors/")) {
      document.title = "Physician Profile • SmartHealth";
    }
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <RouteWatcher />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/about" element={<About/>}/>
        <Route path="/doctors" element={<FindDoctors/>}/>
        <Route path="/doctors/:doctorId" element={<DoctorProfile/>}/>
        <Route path="/service" element={<Services/>}/>
        <Route path="/services" element={<Navigate to="/service" replace />}/>
        <Route path="/faq" element={<FAQ/>}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/appointment" element={<AppointmentBooking/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
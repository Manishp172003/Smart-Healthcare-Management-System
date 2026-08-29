import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/auth/Auth";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import FindDoctors from "./pages/FindDoctors";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import AppointmentBooking from "./pages/AppointmentBooking";

function App() {
  return (
    <Router>
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
        <Route path="/service" element={<Services/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/appointment" element={<AppointmentBooking/>}/>
      </Routes>
    </Router>
  );
}

export default App;
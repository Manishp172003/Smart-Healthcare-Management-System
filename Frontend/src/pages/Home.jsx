import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import ServicesSection from "../components/home/ServicesSection";
import DoctorsSection from "../components/home/DoctorsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import HomeCtaBanner from "../components/home/HomeCtaBanner";
import Footer from "../components/common/Footer";
import useScrollAnimation from "../hooks/useScrollAnimation";

const Home = () => {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-[#EFF3F7] pt-4 pb-0 flex flex-col gap-6">
      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <DoctorsSection />
      <TestimonialsSection />
      <HomeCtaBanner />
      <Footer />
    </div>
  );
};

export default Home;
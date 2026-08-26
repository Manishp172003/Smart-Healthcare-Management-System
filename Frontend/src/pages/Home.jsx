import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import ServicesSection from "../components/home/ServicesSection";
import WhyChooseSection from "../components/home/WhyChooseSection";
import HowItWorks from "../components/home/HowItWorks";
import DoctorsSection from "../components/home/DoctorsSection";
import CTASection from "../components/home/CTASection";

const Home = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_80%_10%,rgba(37,99,235,0.08),transparent_30%),#F8FAFC]">

      <Navbar />

      <main>
        <Hero />

        <AboutSection />

        <ServicesSection />

        <WhyChooseSection />

        <HowItWorks />

        <DoctorsSection />

        <CTASection />
      </main>

    </div>
  );
};

export default Home;
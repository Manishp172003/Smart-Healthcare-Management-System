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
    <div className="home-page">

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
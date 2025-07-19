import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import NavBar from "../components/NavBar";
import { FeaturesSection } from "../components/FeaturesSection";

export const HomePage = () => {
  return (
    <div className="bg-white min-h-screen">
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

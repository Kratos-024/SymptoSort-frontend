import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import NavBar from "../components/NavBar";

export const HomePage = () => {
  return (
    <section className="dark bg-white/50 text-white min-h-screen">
      <NavBar />
      <HeroSection />
      <Footer />
    </section>
  );
};

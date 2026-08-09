import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col bg-[#050b14] text-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
    </main>
  );
}

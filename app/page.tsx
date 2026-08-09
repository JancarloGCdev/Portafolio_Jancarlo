import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col bg-[#050b14] text-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
    </main>
  );
}

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection } from "@/components/ContactSection";
import { MatrixBackground } from "@/components/MatrixBackground";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col text-white">
      <MatrixBackground />
      <Navbar />
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}

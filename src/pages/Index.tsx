import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <BlogSection />
      <ExperienceSection />
      <ContactSection />
      <footer className="border-t border-border py-8 text-center">
        <p className="text-xs font-mono text-muted-foreground">
          <span className="text-terminal-dim">$</span> echo "Built with passion" | grep -i engineering
        </p>
      </footer>
    </div>
  );
};

export default Index;

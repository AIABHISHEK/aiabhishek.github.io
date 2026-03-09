import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import SectionHeader from "./SectionHeader";

const ContactSection = () => (
  <section id="contact" className="py-24 px-6">
    <div className="container mx-auto max-w-2xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionHeader command="contact" title="Get In Touch" />
        <p className="text-muted-foreground mb-8">
          Interested in working together or have a question? Feel free to reach out.
        </p>

        <div className="flex justify-center gap-6 mb-10">
          <a
            href="mailto:ay22oct02@gmail.com"
            className="card-terminal flex items-center gap-3 px-6 py-4 hover:border-primary/40 transition-colors"
          >
            <Mail size={20} className="text-primary" />
            <span className="text-sm font-mono text-muted-foreground">ay22oct02@gmail.com</span>
          </a>
        </div>

        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/aiabhishek"
            className="p-3 border border-border rounded-md text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/aiabhishek/"
            className="p-3 border border-border rounded-md text-muted-foreground hover:text-secondary hover:border-secondary/40 transition-colors"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ContactSection;

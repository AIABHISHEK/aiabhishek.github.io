import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import SectionHeader from "./SectionHeader";

const projects = [
  {
    name: "Distributed Link Shortener",
    description: "High-throughput URL shortening service with distributed caching, rate limiting, and analytics pipeline.",
    stack: ["Node.js", "Fastify", "PostgreSQL", "Redis", "Docker"],
    features: ["Horizontal scaling", "Redis caching layer", "Click analytics pipeline", "Rate limiting"],
    github: "#",
    demo: "#",
  },
  {
    name: "Real-time Crypto Price Alerts",
    description: "Event-driven system for monitoring cryptocurrency prices and delivering real-time alerts via WebSocket and email.",
    stack: ["Node.js", "Kafka", "Redis", "PostgreSQL", "WebSocket"],
    features: ["Event-driven architecture", "Real-time WebSocket streams", "Configurable alert rules", "Price aggregation"],
    github: "#",
  },
  {
    name: "IoT Dashcam Integration Platform",
    description: "TCP-based ingestion service for IoT dashcam devices using JT808 protocol with real-time location tracking.",
    stack: ["Node.js", "TCP/JT808", "PostgreSQL", "Docker", "Flespi"],
    features: ["Custom protocol parsing", "TCP connection management", "Real-time GPS tracking", "Device lifecycle management"],
    github: "#",
  },
  {
    name: "Job Application Tracker SaaS",
    description: "Full-stack SaaS platform for tracking job applications with Kanban boards, analytics, and resume management.",
    stack: ["Next.js", "PostgreSQL", "Redis", "TypeScript"],
    features: ["Multi-tenant architecture", "RESTful API", "Role-based access", "Application analytics"],
    github: "#",
    demo: "#",
  },
];

const ProjectsSection = () => (
  <section id="projects" className="py-24 px-6">
    <div className="container mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionHeader command="projects" title="Featured Projects" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            className="card-terminal flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">{p.name}</h3>
              <div className="flex gap-2">
                <a href={p.github} className="text-muted-foreground hover:text-primary transition-colors">
                  <Github size={16} />
                </a>
                {p.demo && (
                  <a href={p.demo} className="text-muted-foreground hover:text-secondary transition-colors">
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{p.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.stack.map((t) => (
                <span key={t} className="px-2 py-0.5 text-xs font-mono text-primary bg-primary/10 rounded">
                  {t}
                </span>
              ))}
            </div>

            <ul className="mt-auto space-y-1">
              {p.features.map((f) => (
                <li key={f} className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                  <span className="text-terminal-dim">▸</span> {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const experiences = [
  {
    role: "Full-stack Developer",
    company: "Trikon.tech",
    period: "Jan 2025 - July 2025",
    points: [
      "Integrated IoT dashcam devices using JT808 protocol over TCP",
      "Built high-throughput TCP ingestion services for real-time GPS data",
      "Migrated device communication layer to Flespi MQTT broker",
      "Developed monitoring dashboards using React and Next.js",
      "Implemented observability with Prometheus and Grafana",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Startup Studio",
    period: "Jan 2024 - July 2024",
    points: [
      "Built RESTful APIs with Node.js and Express",
      "Designed PostgreSQL schemas for multi-tenant SaaS applications",
      "Implemented CI/CD pipelines with Docker and GitHub Actions",
    ],
  },
];

const ExperienceSection = () => (
  <section id="experience" className="py-24 px-6">
    <div className="container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionHeader command="experience" title="Experience" />
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="relative pl-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {/* Timeline dot */}
              <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-background" />

              <div className="card-terminal">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{exp.role}</h3>
                    <p className="text-sm text-secondary font-mono">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground mt-1 sm:mt-0">{exp.period}</span>
                </div>
                <ul className="space-y-1.5">
                  {exp.points.map((p) => (
                    <li key={p} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-terminal-dim mt-0.5">▸</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ExperienceSection;

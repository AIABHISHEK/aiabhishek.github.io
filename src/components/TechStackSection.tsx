import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { Server, Database, Container, BarChart3, Monitor, Code } from "lucide-react";

const categories = [
  {
    name: "Languages",
    icon: Code,
    techs: ["JavaScript", "TypeScript", "Python", "SQL"],
  },
  {
    name: "Backend",
    icon: Server,
    techs: ["Node.js", "Fastify", "Bun", "Express"],
  },
  {
    name: "Databases",
    icon: Database,
    techs: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    name: "Infrastructure",
    icon: Container,
    techs: ["Docker", "Kafka", "Nginx"],
  },
  {
    name: "Observability",
    icon: BarChart3,
    techs: ["Prometheus", "Grafana", "Loki", "Tempo", "OpenTelemetry"],
  },
  {
    name: "Frontend",
    icon: Monitor,
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
];

const TechStackSection = () => (
  <section id="tech" className="py-24 px-6">
    <div className="container mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionHeader command="tech_stack" title="Technologies" />
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            className="card-terminal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <cat.icon size={20} className="text-primary" />
              <h3 className="font-semibold text-foreground">{cat.name}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.techs.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs font-mono bg-muted text-muted-foreground rounded-md border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TechStackSection;

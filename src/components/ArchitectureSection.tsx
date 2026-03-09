import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const caseStudies = [
  {
    title: "Distributed Link Shortener",
    problem: "Need to handle millions of URL shortenings per day with low latency and high availability.",
    architecture: "Stateless API nodes behind a load balancer, Redis for caching hot URLs, PostgreSQL for persistence, Kafka for async analytics event processing.",
    technologies: ["Node.js", "Fastify", "Redis", "PostgreSQL", "Kafka", "Docker"],
    challenges: ["Handling hash collisions at scale", "Cache invalidation strategies", "Eventual consistency in analytics"],
  },
  {
    title: "IoT Dashcam Platform",
    problem: "Ingest real-time GPS and video data from thousands of IoT dashcam devices using a custom binary protocol.",
    architecture: "TCP server parsing JT808 binary protocol, message queue for decoupled processing, PostgreSQL with PostGIS for location data, React dashboard for visualization.",
    technologies: ["Node.js", "TCP Sockets", "JT808", "PostgreSQL", "PostGIS", "Flespi"],
    challenges: ["Binary protocol parsing", "Managing persistent TCP connections", "Migrating to third-party MQTT broker"],
  },
];

const ArchitectureSection = () => (
  <section id="architecture" className="py-24 px-6">
    <div className="container mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionHeader command="case_studies" title="System Architecture" />
      </motion.div>

      <div className="space-y-8">
        {caseStudies.map((cs, i) => (
          <motion.div
            key={cs.title}
            className="card-terminal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">{cs.title}</h3>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-mono text-primary text-xs mb-1">// Problem</p>
                <p className="text-muted-foreground">{cs.problem}</p>
              </div>
              <div>
                <p className="font-mono text-primary text-xs mb-1">// Architecture</p>
                <p className="text-muted-foreground">{cs.architecture}</p>
              </div>
              <div>
                <p className="font-mono text-primary text-xs mb-1">// Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {cs.technologies.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-xs font-mono text-secondary bg-secondary/10 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-primary text-xs mb-1">// Key Challenges</p>
                <ul className="space-y-1">
                  {cs.challenges.map((c) => (
                    <li key={c} className="text-muted-foreground flex items-center gap-2">
                      <span className="text-terminal-dim">▸</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ArchitectureSection;

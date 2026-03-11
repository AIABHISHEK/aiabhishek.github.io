import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";


const AboutSection = () => (
  <section id="about" className="py-24 px-6">
    <div className="container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader command="about" title="About Me" />
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            I'm a backend-focused full stack developer with deep expertise in building scalable,
            production-grade distributed systems. My core strengths lie in designing high-throughput
            APIs, event-driven architectures, and resilient microservices.
          </p>
          <p>
            I've worked extensively with <span className="text-primary font-mono text-sm">Node.js</span>,{" "}
            <span className="text-primary font-mono text-sm">Nodejs</span>,{" "}
            <span className="text-primary font-mono text-sm">Fastify</span>,{" "}
            <span className="text-primary font-mono text-sm">PostgreSQL</span>,{" "}
            <span className="text-primary font-mono text-sm">Redis</span>,{" "}
            <span className="text-primary font-mono text-sm">Kafka</span>, and{" "}
            <span className="text-primary font-mono text-sm">Docker</span> — building services that
            handle real-time data pipelines, IoT device integrations, and complex business workflows.
          </p>
          <p>
            On the observability side, I implement full-stack monitoring using{" "}
            <span className="text-secondary font-mono text-sm">OpenTelemetry</span>,{" "}
            <span className="text-secondary font-mono text-sm">Prometheus</span>, and{" "}
            <span className="text-secondary font-mono text-sm">Grafana</span> to ensure systems
            are transparent, measurable, and maintainable at scale.
          </p>
          <p>
            While my primary focus is backend systems, I also build modern frontend applications using{" "}
            <span className="text-secondary font-mono text-sm">React</span>,{" "}
            <span className="text-secondary font-mono text-sm">Next.js</span>,
            allowing me to develop end-to-end products from infrastructure to user interface.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;

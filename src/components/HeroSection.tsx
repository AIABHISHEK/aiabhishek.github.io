import { motion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import TypingEffect from "./TypingEffect";

const metrics = [
  { label: "Projects Built", value: "10+" },
  { label: "Technologies", value: "6+" },
  { label: "Backend Systems", value: "5+" },
  { label: "Years of Exp.", value: "1+" },
];

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2 space-y-6">
            <p className="font-mono text-muted-foreground text-sm">
              <TypingEffect text='> initializing developer profile...' speed={40} />
            </p>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <span className="text-foreground">Abhishek</span>{" "}
              <span className="text-primary glow-text">Yadav</span>
            </motion.h1>

            <motion.p
              className="font-mono text-secondary text-sm md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              Backend Engineer / Backend-focused Full Stack Developer
            </motion.p>

            <motion.p
              className="text-muted-foreground max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.3, duration: 0.5 }}
            >
              Building scalable distributed systems, high-performance APIs, event-driven architectures,
              and robust backend infrastructure. Passionate about system design, observability,
              and engineering excellence.
            </motion.p>

            <motion.div
              className="flex gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.5 }}
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
              >
                View Projects <ArrowDown size={16} />
              </a>
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-md font-medium text-sm hover:border-primary/50 transition-colors"
              >
                <FileText size={16} /> Resume
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.5, duration: 0.6 }}
          >
            {metrics.map((m) => (
              <div key={m.label} className="card-terminal text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary glow-text">{m.value}</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">{m.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

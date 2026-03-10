import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import SectionHeader from "../SectionHeader";
import { projects } from "./projectsData";

const ProjectsSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <section id="projects" className="scroll-mt-20 py-24 px-6">
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
              key={p.id}
              className="card-terminal flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">{p.name}</h3>
                <div className="flex gap-2">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github size={16} />
                  </a>
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-secondary transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs font-mono text-primary bg-primary/10 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <ul className="space-y-1 mb-5">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="text-xs text-muted-foreground font-mono flex items-center gap-2"
                  >
                    <span className="text-terminal-dim">▸</span> {f}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-4 border-t border-border">
                <button
                  onClick={() =>
                    navigate(`/project/${p.id}`, {
                      state: { backgroundLocation: location },
                    })
                  }
                  className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:text-foreground transition-colors group"
                >
                  <span>&gt; view_architecture</span>
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { projects } from "@/components/projects/projectsData";
import { ArchitectureExplorer } from "@/components/architecture-explorer";
import SectionHeader from "@/components/SectionHeader";

type ProjectDetailProps = {
  isModal?: boolean;
};

const ProjectDetail = ({ isModal = false }: ProjectDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);
  const goToProjects = () => {
    if (isModal) {
      navigate(-1);
      return;
    }

    navigate("/#projects");
  };

  useEffect(() => {
    if (!isModal) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate(-1);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isModal, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-muted-foreground">
            <span className="text-primary">&gt;</span> project not found
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-sm font-mono text-primary hover:underline"
          >
            ← back to home
          </button>
        </div>
      </div>
    );
  }

  const content = (
    <div className={isModal ? "min-h-full bg-background" : "min-h-screen bg-background"}>
      {/* Top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto max-w-6xl px-6 flex items-center h-14">
          <button
            onClick={goToProjects}
            className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            <span>~/projects</span>
          </button>
          <div className="ml-auto flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={16} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-secondary transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-28 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-mono text-xs text-primary mb-3">
              <span className="text-muted-foreground">&gt;</span> cat project/{project.id}/README.md
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {project.name}
            </h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-mono text-primary bg-primary/10 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Overview & Problem */}
      <div className="px-6 pb-16">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-6">
          <motion.div
            className="card-terminal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="font-mono text-xs text-primary mb-2">// Overview</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.overview}
            </p>
          </motion.div>
          <motion.div
            className="card-terminal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <p className="font-mono text-xs text-primary mb-2">// Problem</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.problem}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Architecture Explorer */}
      {project.architectureConfig && (
        <ArchitectureExplorer config={project.architectureConfig} />
      )}

      {/* Engineering Decisions & Challenges */}
      {(project.engineeringDecisions || project.challengesSolved) && (
        <div className="px-6 py-16">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                command="engineering_notes"
                title="Engineering Notes"
              />
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {project.engineeringDecisions && (
                <motion.div
                  className="card-terminal"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="font-mono text-xs text-primary mb-3">
                    // Engineering Decisions
                  </p>
                  <ul className="space-y-2">
                    {project.engineeringDecisions.map((d) => (
                      <li
                        key={d}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-terminal-dim mt-0.5">▸</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
              {project.challengesSolved && (
                <motion.div
                  className="card-terminal"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="font-mono text-xs text-primary mb-3">
                    // Challenges Solved
                  </p>
                  <ul className="space-y-2">
                    {project.challengesSolved.map((c) => (
                      <li
                        key={c}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-terminal-dim mt-0.5">▸</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Back */}
      <div className="px-6 pb-16">
        <div className="container mx-auto max-w-6xl text-center">
          <button
            onClick={goToProjects}
            className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:underline"
          >
            <ArrowLeft size={14} />
            <span>&gt; cd ~/projects</span>
          </button>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-[70] bg-background/75 backdrop-blur-sm">
        <div className="h-full overflow-y-auto">{content}</div>
      </div>
    );
  }

  return content;
};

export default ProjectDetail;

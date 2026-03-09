import { motion, AnimatePresence } from "framer-motion";
import type { ComponentDetail } from "./types";

interface Props {
  detail: ComponentDetail | null;
}

const DetailSection = ({ label, items }: { label: string; items: string[] }) => (
  <div>
    <p className="font-mono text-xs text-primary mb-1.5">// {label}</p>
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
          <span className="text-terminal-dim mt-0.5">▸</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ComponentDetailPanel = ({ detail }: Props) => {
  if (!detail) {
    return (
      <div className="card-terminal h-full flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">&gt;</span> select a component
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Click any node in the diagram to view details
          </p>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={detail.id}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.2 }}
        className="card-terminal h-full min-h-[300px]"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{detail.icon}</span>
          <h3 className="text-lg font-semibold text-foreground">{detail.label}</h3>
        </div>

        <div className="space-y-4">
          <div>
            <p className="font-mono text-xs text-primary mb-1.5">// Purpose</p>
            <p className="text-sm text-muted-foreground">{detail.purpose}</p>
          </div>

          {detail.responsibilities && (
            <DetailSection label="Responsibilities" items={detail.responsibilities} />
          )}
          {detail.tech && <DetailSection label="Tech" items={detail.tech} />}
          {detail.usage && <DetailSection label="Usage" items={detail.usage} />}
          {detail.strategy && <DetailSection label="Strategy" items={detail.strategy} />}
          {detail.dataStored && <DetailSection label="Data Stored" items={detail.dataStored} />}
          {detail.reason && (
            <div>
              <p className="font-mono text-xs text-primary mb-1.5">// Reason</p>
              <p className="text-sm text-muted-foreground">{detail.reason}</p>
            </div>
          )}
          {detail.eventsProduced && (
            <div>
              <p className="font-mono text-xs text-primary mb-1.5">// Events Produced</p>
              <div className="flex flex-wrap gap-2">
                {detail.eventsProduced.map((e) => (
                  <span key={e} className="px-2 py-0.5 text-xs font-mono text-secondary bg-secondary/10 rounded">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          )}
          {detail.benefits && <DetailSection label="Benefits" items={detail.benefits} />}
          {detail.tasks && <DetailSection label="Tasks" items={detail.tasks} />}
          {detail.tools && (
            <div>
              <p className="font-mono text-xs text-primary mb-1.5">// Tools</p>
              <div className="flex flex-wrap gap-2">
                {detail.tools.map((t) => (
                  <span key={t} className="px-2 py-0.5 text-xs font-mono text-secondary bg-secondary/10 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
          {detail.metrics && <DetailSection label="Metrics" items={detail.metrics} />}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ComponentDetailPanel;

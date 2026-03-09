import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  type NodeMouseHandler,
  type Node,
  type Edge,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { ArchitectureConfig } from "./types";
import ComponentDetailPanel from "./ComponentDetailPanel";
import SectionHeader from "../SectionHeader";

interface Props {
  config: ArchitectureConfig;
}

const ArchitectureExplorerInner = ({ config }: Props) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [nodes, setNodes] = useState<Node[]>(config.nodes);
  const [edges] = useState<Edge[]>(config.edges);
  const [simulating, setSimulating] = useState(false);
  const [activeSimIndex, setActiveSimIndex] = useState(-1);
  const [showMetrics, setShowMetrics] = useState(false);

  const highlightNode = useCallback(
    (nodeId: string | null) => {
      setNodes(
        config.nodes.map((n) => ({
          ...n,
          style:
            nodeId === n.id
              ? {
                  ...n.style,
                  border: "1px solid hsl(160 100% 50%)",
                  boxShadow: "0 0 15px hsl(160 100% 50% / 0.15)",
                }
              : n.style,
        }))
      );
    },
    [config.nodes]
  );

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      setSelectedNode(node.id);
      highlightNode(node.id);
    },
    [highlightNode]
  );

  const simulateFlow = useCallback(() => {
    if (simulating) return;
    setSimulating(true);
    setActiveSimIndex(0);
    setShowMetrics(false);
  }, [simulating]);

  useEffect(() => {
    if (!simulating || activeSimIndex < 0) return;

    if (activeSimIndex >= config.simulationPath.length) {
      setSimulating(false);
      setShowMetrics(true);
      highlightNode(null);
      return;
    }

    const nodeId = config.simulationPath[activeSimIndex];
    setSelectedNode(nodeId);
    highlightNode(nodeId);

    const timer = setTimeout(() => {
      setActiveSimIndex((i) => i + 1);
    }, 800);

    return () => clearTimeout(timer);
  }, [simulating, activeSimIndex, config.simulationPath, highlightNode]);

  const detail = selectedNode ? config.componentDetails[selectedNode] ?? null : null;

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader command="system_architecture" title={config.title} />
          <p className="text-sm text-muted-foreground font-mono mb-2 -mt-8">
            <span className="text-secondary">//</span> {config.subtitle}
          </p>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            {config.description}
          </p>
        </motion.div>

        <div className="mb-4">
          <button
            onClick={simulateFlow}
            disabled={simulating}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-mono rounded-md border border-border bg-card text-foreground hover:border-terminal-dim hover:shadow-[var(--glow-green)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={14} className="text-primary" />
            {simulating ? "Simulating..." : "Simulate Request Flow"}
          </button>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 card-terminal p-0 overflow-hidden" style={{ height: 520 }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodeClick={onNodeClick}
              fitView
              proOptions={{ hideAttribution: true }}
              nodesDraggable={false}
              nodesConnectable={false}
              panOnDrag
              zoomOnScroll
              minZoom={0.5}
              maxZoom={1.5}
            >
              <Background color="hsl(228 10% 15%)" gap={20} size={1} />
              <Controls
                showInteractive={false}
                style={{ background: "hsl(228 15% 10%)", border: "1px solid hsl(228 10% 18%)", borderRadius: 8 }}
              />
            </ReactFlow>
          </div>

          <div className="lg:col-span-2">
            <ComponentDetailPanel detail={detail} />
          </div>
        </div>

        {showMetrics && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
          >
            {config.simulationMetrics.map((m) => (
              <div key={m.label} className="card-terminal text-center">
                <span className="text-xl">{m.icon}</span>
                <p className="text-lg font-semibold text-foreground mt-1 font-mono">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

const ArchitectureExplorer = (props: Props) => (
  <ReactFlowProvider>
    <ArchitectureExplorerInner {...props} />
  </ReactFlowProvider>
);

export default ArchitectureExplorer;

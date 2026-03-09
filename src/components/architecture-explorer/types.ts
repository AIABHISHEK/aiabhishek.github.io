import type { Node, Edge } from "@xyflow/react";

export interface ComponentDetail {
  id: string;
  label: string;
  icon: string;
  purpose: string;
  responsibilities?: string[];
  tech?: string[];
  usage?: string[];
  strategy?: string[];
  dataStored?: string[];
  reason?: string;
  eventsProduced?: string[];
  benefits?: string[];
  tasks?: string[];
  tools?: string[];
  metrics?: string[];
}

export interface ArchitectureConfig {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
  componentDetails: Record<string, ComponentDetail>;
  simulationPath: string[];
  simulationMetrics: { label: string; value: string; icon: string }[];
  engineeringNotes: {
    scalingStrategy: string[];
    challengesSolved: string[];
  };
}

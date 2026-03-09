import type { ArchitectureConfig } from "../architecture-explorer/types";

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  overview: string;
  problem: string;
  stack: string[];
  features: string[];
  github: string;
  demo?: string;
  architectureConfig?: ArchitectureConfig;
  engineeringDecisions?: string[];
  challengesSolved?: string[];
}

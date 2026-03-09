import type { ArchitectureConfig } from "../types";

const nodeStyle = {
  background: "hsl(228 15% 10%)",
  border: "1px solid hsl(228 10% 18%)",
  borderRadius: "8px",
  padding: "12px 20px",
  color: "#e5e7eb",
  fontSize: "13px",
  fontFamily: "'JetBrains Mono', monospace",
};

const activeNodeStyle = {
  ...nodeStyle,
  border: "1px solid hsl(160 100% 50%)",
  boxShadow: "0 0 15px hsl(160 100% 50% / 0.15)",
};

export const linkShortenerConfig: ArchitectureConfig = {
  id: "link-shortener",
  title: "Interactive Architecture Explorer",
  subtitle: "Distributed Link Shortener",
  description:
    "This interactive diagram shows the architecture of a scalable link shortener system. Click on any component to understand its role in the system.",
  nodes: [
    {
      id: "client",
      position: { x: 50, y: 20 },
      data: { label: "🖥️  Client" },
      style: nodeStyle,
    },
    {
      id: "api-gateway",
      position: { x: 50, y: 140 },
      data: { label: "⚡  API Gateway (Fastify)" },
      style: nodeStyle,
    },
    {
      id: "redis",
      position: { x: -150, y: 280 },
      data: { label: "🔴  Redis Cache" },
      style: nodeStyle,
    },
    {
      id: "postgres",
      position: { x: 50, y: 280 },
      data: { label: "🐘  PostgreSQL" },
      style: nodeStyle,
    },
    {
      id: "kafka",
      position: { x: 250, y: 280 },
      data: { label: "📡  Kafka Event Stream" },
      style: nodeStyle,
    },
    {
      id: "analytics-worker",
      position: { x: 250, y: 420 },
      data: { label: "📊  Analytics Worker" },
      style: nodeStyle,
    },
    {
      id: "metrics",
      position: { x: 250, y: 550 },
      data: { label: "📈  Metrics / Observability" },
      style: nodeStyle,
    },
  ],
  edges: [
    { id: "e-client-api", source: "client", target: "api-gateway", animated: true, style: { stroke: "hsl(160 100% 50% / 0.4)" } },
    { id: "e-api-redis", source: "api-gateway", target: "redis", animated: true, style: { stroke: "hsl(199 89% 60% / 0.4)" } },
    { id: "e-api-pg", source: "api-gateway", target: "postgres", animated: true, style: { stroke: "hsl(199 89% 60% / 0.4)" } },
    { id: "e-api-kafka", source: "api-gateway", target: "kafka", animated: true, style: { stroke: "hsl(199 89% 60% / 0.4)" } },
    { id: "e-kafka-analytics", source: "kafka", target: "analytics-worker", animated: true, style: { stroke: "hsl(160 100% 50% / 0.4)" } },
    { id: "e-analytics-metrics", source: "analytics-worker", target: "metrics", animated: true, style: { stroke: "hsl(160 100% 50% / 0.4)" } },
  ],
  componentDetails: {
    client: {
      id: "client",
      label: "Client",
      icon: "🖥️",
      purpose: "User interacts with the system through a browser or application.",
      responsibilities: [
        "Send requests to shorten URLs",
        "Redirect users when short links are accessed",
      ],
    },
    "api-gateway": {
      id: "api-gateway",
      label: "API Gateway (Fastify)",
      icon: "⚡",
      purpose: "Handles all incoming HTTP requests.",
      responsibilities: [
        "Create short URLs",
        "Resolve short links and redirect",
        "Handle authentication and rate limiting",
      ],
      tech: ["Node.js", "Fastify"],
    },
    redis: {
      id: "redis",
      label: "Redis Cache",
      icon: "🔴",
      purpose: "Reduce database load and improve response latency.",
      usage: [
        "Cache frequently accessed short links",
        "Store recently resolved URL mappings",
      ],
      strategy: ["TTL-based eviction", "Cache-first lookup"],
    },
    postgres: {
      id: "postgres",
      label: "PostgreSQL",
      icon: "🐘",
      purpose: "Primary persistent storage for link mappings.",
      dataStored: [
        "Short code",
        "Original URL",
        "Creation timestamp",
        "Metadata",
      ],
      reason: "Strong consistency and reliability",
    },
    kafka: {
      id: "kafka",
      label: "Kafka Event Stream",
      icon: "📡",
      purpose: "Handle asynchronous event processing.",
      eventsProduced: ["link_created", "link_clicked"],
      benefits: [
        "Decouples analytics processing from API requests",
        "Improves scalability",
      ],
    },
    "analytics-worker": {
      id: "analytics-worker",
      label: "Analytics Worker",
      icon: "📊",
      purpose: "Consumes Kafka events and processes analytics.",
      tasks: [
        "Track link clicks",
        "Aggregate metrics",
        "Store usage statistics",
      ],
    },
    metrics: {
      id: "metrics",
      label: "Metrics / Observability",
      icon: "📈",
      purpose: "Monitor system health and performance.",
      tools: ["Prometheus", "Grafana", "OpenTelemetry"],
      metrics: [
        "Request latency",
        "Cache hit rate",
        "Event processing lag",
      ],
    },
  },
  simulationPath: [
    "client",
    "api-gateway",
    "redis",
    "postgres",
    "kafka",
    "analytics-worker",
    "metrics",
  ],
  simulationMetrics: [
    { label: "Requests Processed", value: "1,247", icon: "⚡" },
    { label: "Cache Hit Rate", value: "94.2%", icon: "🎯" },
    { label: "Avg Latency", value: "12ms", icon: "⏱️" },
    { label: "Events Published", value: "3,891", icon: "📡" },
  ],
  engineeringNotes: {
    scalingStrategy: [
      "Redis caching reduces database load by 90%+ for hot URLs",
      "Kafka enables asynchronous event processing without blocking API responses",
      "Stateless API services allow horizontal scaling behind a load balancer",
    ],
    challengesSolved: [
      "Handling high traffic for popular links via cache-first reads",
      "Preventing cache stampede with distributed locking",
      "Ensuring reliable event delivery with Kafka consumer groups",
    ],
  },
};

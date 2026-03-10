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
      data: { label: "🖥️ Client" },
      style: nodeStyle,
    },
    {
      id: "api-gateway",
      position: { x: 50, y: 140 },
      data: { label: "⚡ API Gateway (Fastify)" },
      style: nodeStyle,
    },
    {
      id: "redis",
      position: { x: -150, y: 300 },
      data: { label: "🔴 Redis Cache" },
      style: nodeStyle,
    },
    {
      id: "postgres",
      position: { x: 50, y: 300 },
      data: { label: "🐘 PostgreSQL" },
      style: nodeStyle,
    },
    {
      id: "kafka",
      position: { x: 250, y: 300 },
      data: { label: "📡 Kafka Event Stream" },
      style: nodeStyle,
    },
    {
      id: "analytics-worker",
      position: { x: 250, y: 460 },
      data: { label: "📊 Analytics Worker" },
      style: nodeStyle,
    },
    {
      id: "metrics",
      position: { x: 450, y: 300 },
      data: { label: "📈 Metrics / Observability" },
      style: nodeStyle,
    },
  ],

  edges: [
    {
      id: "e-client-api",
      source: "client",
      target: "api-gateway",
      animated: true,
      style: { stroke: "hsl(160 100% 50% / 0.4)" },
    },

    {
      id: "e-api-redis",
      source: "api-gateway",
      target: "redis",
      animated: true,
      style: { stroke: "hsl(199 89% 60% / 0.4)" },
    },

    {
      id: "e-api-pg",
      source: "api-gateway",
      target: "postgres",
      animated: true,
      style: { stroke: "hsl(199 89% 60% / 0.4)" },
    },

    {
      id: "e-api-kafka",
      source: "api-gateway",
      target: "kafka",
      animated: true,
      style: { stroke: "hsl(199 89% 60% / 0.4)" },
    },

    {
      id: "e-kafka-worker",
      source: "kafka",
      target: "analytics-worker",
      animated: true,
      style: { stroke: "hsl(160 100% 50% / 0.4)" },
    },

    {
      id: "e-worker-pg",
      source: "analytics-worker",
      target: "postgres",
      animated: true,
      style: { stroke: "hsl(45 100% 60% / 0.4)" },
    },

    {
      id: "e-api-metrics",
      source: "api-gateway",
      target: "metrics",
      animated: false,
      style: { stroke: "hsl(45 100% 60% / 0.4)", strokeDasharray: "6,4" },
    },

    {
      id: "e-worker-metrics",
      source: "analytics-worker",
      target: "metrics",
      animated: false,
      style: { stroke: "hsl(45 100% 60% / 0.4)", strokeDasharray: "6,4" },
    },
  ],

  componentDetails: {
    client: {
      id: "client",
      label: "Client",
      icon: "🖥️",
      purpose: "Users interact with the system via browsers or applications.",
      responsibilities: [
        "Send requests to create short URLs",
        "Request redirects for shortened links",
      ],
    },

    "api-gateway": {
      id: "api-gateway",
      label: "API Gateway (Fastify)",
      icon: "⚡",
      purpose: "Handles incoming HTTP requests and orchestrates core services.",
      responsibilities: [
        "Create new short links",
        "Resolve short URLs and redirect",
        "Publish analytics events to Kafka",
        "Apply rate limiting and validation",
      ],
      tech: ["Node.js", "Fastify"],
    },

    redis: {
      id: "redis",
      label: "Redis Cache",
      icon: "🔴",
      purpose: "Improves response latency by caching frequently accessed short URLs.",
      usage: [
        "Cache hot URL mappings",
        "Reduce PostgreSQL read load",
      ],
      strategy: [
        "Cache-first lookup strategy",
        "TTL-based eviction",
      ],
    },

    postgres: {
      id: "postgres",
      label: "PostgreSQL",
      icon: "🐘",
      purpose: "Primary persistent storage for links and analytics data.",
      dataStored: [
        "Short code",
        "Original URL",
        "Creation timestamp",
        "Click analytics",
      ],
      reason: "Strong consistency and relational querying for analytics.",
    },

    kafka: {
      id: "kafka",
      label: "Kafka Event Stream",
      icon: "📡",
      purpose: "Handles asynchronous event processing.",
      eventsProduced: ["link_created", "link_clicked"],
      benefits: [
        "Decouples analytics from request path",
        "Enables scalable event processing",
      ],
    },

    "analytics-worker": {
      id: "analytics-worker",
      label: "Analytics Worker",
      icon: "📊",
      purpose: "Consumes Kafka events and processes analytics asynchronously.",
      tasks: [
        "Consume click events",
        "Aggregate link statistics",
        "Persist analytics data into PostgreSQL",
      ],
    },

    metrics: {
      id: "metrics",
      label: "Metrics / Observability",
      icon: "📈",
      purpose:
        "Collect metrics, traces, and logs from services to monitor system health.",
      tools: ["Prometheus", "Grafana", "OpenTelemetry"],
      metrics: [
        "Request latency (p50 / p95 / p99)",
        "Cache hit rate",
        "Kafka consumer lag",
        "API error rate",
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
  ],

  simulationMetrics: [
    { label: "Requests Processed", value: "1,247", icon: "⚡" },
    { label: "Cache Hit Rate", value: "94.2%", icon: "🎯" },
    { label: "Avg Latency", value: "12ms", icon: "⏱️" },
    { label: "Events Published", value: "3,891", icon: "📡" },
  ],

  engineeringNotes: {
    scalingStrategy: [
      "Redis caching reduces PostgreSQL load for hot URLs",
      "Kafka enables asynchronous event processing",
      "Stateless API services allow horizontal scaling",
    ],
    challengesSolved: [
      "Handling burst traffic using rate limiting",
      "Preventing cache stampede with distributed locking",
      "Ensuring reliable event processing using Kafka consumer groups",
    ],
  },
};

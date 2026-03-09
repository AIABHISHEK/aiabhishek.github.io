import type { ProjectData } from "./types";
import { linkShortenerConfig } from "../architecture-explorer/configs/link-shortener";

export const projects: ProjectData[] = [
  {
    id: "distributed-link-shortener",
    name: "Distributed Link Shortener",
    description:
      "High-throughput URL shortening service with distributed caching, rate limiting, and analytics pipeline.",
    overview:
      "A scalable URL shortening platform designed to handle millions of requests per day. The system uses a cache-first architecture with Redis for hot URLs, PostgreSQL for persistence, and Kafka for decoupled analytics event processing.",
    problem:
      "Need to handle millions of URL shortenings per day with low latency, high availability, and real-time click analytics — without coupling analytics to the critical path.",
    stack: ["Node.js", "Fastify", "PostgreSQL", "Redis", "Kafka", "Docker"],
    features: [
      "Horizontal scaling",
      "Redis caching layer",
      "Click analytics pipeline",
      "Rate limiting",
    ],
    github: "#",
    demo: "#",
    architectureConfig: linkShortenerConfig,
    engineeringDecisions: [
      "Chose Fastify over Express for 2-3x better throughput on JSON serialization",
      "Redis cache-first reads reduce PostgreSQL load by ~90% for hot URLs",
      "Kafka decouples analytics from the API critical path, keeping p99 latency under 15ms",
      "Stateless API nodes allow horizontal scaling behind a simple load balancer",
      "Base62 encoding for short codes provides compact, URL-safe identifiers",
    ],
    challengesSolved: [
      "Handling hash collisions at scale with retry + unique constraint fallback",
      "Preventing cache stampede using distributed locking on cache misses",
      "Ensuring reliable analytics delivery with Kafka consumer groups and dead-letter queues",
      "Graceful handling of burst traffic via token-bucket rate limiting per IP",
    ],
  },
  {
    id: "crypto-price-alerts",
    name: "Real-time Crypto Price Alerts",
    description:
      "Event-driven system for monitoring cryptocurrency prices and delivering real-time alerts via WebSocket and email.",
    overview:
      "An event-driven alerting platform that aggregates cryptocurrency prices from multiple exchanges, evaluates user-defined alert rules in real time, and delivers notifications through WebSocket connections and email.",
    problem:
      "Traders need real-time, low-latency price alerts with configurable thresholds, but most exchange APIs are rate-limited and inconsistent across providers.",
    stack: ["Node.js", "Kafka", "Redis", "PostgreSQL", "WebSocket"],
    features: [
      "Event-driven architecture",
      "Real-time WebSocket streams",
      "Configurable alert rules",
      "Price aggregation",
    ],
    github: "link-sh",
    engineeringDecisions: [
      "Kafka streams for reliable price event processing with exactly-once semantics",
      "Redis pub/sub for low-latency WebSocket broadcast to connected clients",
      "Rule engine evaluates user alerts against aggregated price snapshots",
    ],
    challengesSolved: [
      "Handling rate limits across multiple exchange APIs with adaptive backoff",
      "Maintaining thousands of concurrent WebSocket connections efficiently",
      "Deduplicating alerts during high-volatility price fluctuations",
    ],
  },
  {
    id: "iot-dashcam-platform",
    name: "IoT Dashcam Integration Platform",
    description:
      "TCP-based ingestion service for IoT dashcam devices using JT808 protocol with real-time location tracking.",
    overview:
      "A backend platform for ingesting real-time GPS and video data from thousands of IoT dashcam devices using a custom binary protocol (JT808), with PostgreSQL + PostGIS for location storage and a React dashboard for fleet visualization.",
    problem:
      "Ingest real-time GPS and video data from thousands of IoT dashcam devices using a custom binary protocol, with reliable connection management and device lifecycle tracking.",
    stack: ["Node.js", "TCP/JT808", "PostgreSQL", "PostGIS", "Docker", "Flespi"],
    features: [
      "Custom protocol parsing",
      "TCP connection management",
      "Real-time GPS tracking",
      "Device lifecycle management",
    ],
    github: "#",
    engineeringDecisions: [
      "Custom TCP server for parsing JT808 binary protocol frames",
      "PostGIS extensions for efficient geospatial queries on location data",
      "Migrated to Flespi MQTT broker for improved device connection reliability",
    ],
    challengesSolved: [
      "Parsing and validating complex binary protocol frames with checksums",
      "Managing persistent TCP connections with heartbeat and reconnection logic",
      "Handling device firmware variations in protocol implementation",
    ],
  },
  {
    id: "job-tracker-saas",
    name: "Job Application Tracker SaaS",
    description:
      "Full-stack SaaS platform for tracking job applications with Kanban boards, analytics, and resume management.",
    overview:
      "A multi-tenant SaaS application for job seekers to track applications through a Kanban-style board, with built-in analytics, resume management, and role-based access control.",
    problem:
      "Job seekers lose track of applications across dozens of companies. Existing tools lack application analytics and are not designed for the engineering job search workflow.",
    stack: ["Next.js", "PostgreSQL", "Redis", "TypeScript"],
    features: [
      "Multi-tenant architecture",
      "RESTful API",
      "Role-based access",
      "Application analytics",
    ],
    github: "#",
    demo: "#",
    engineeringDecisions: [
      "Row-level security in PostgreSQL for multi-tenant data isolation",
      "Redis for caching dashboard analytics and session management",
      "Next.js API routes for a unified full-stack deployment",
    ],
    challengesSolved: [
      "Designing a flexible Kanban data model that supports custom pipeline stages",
      "Implementing efficient full-text search across applications and notes",
      "Building role-based access with invite-based team collaboration",
    ],
  },
];

import type { ProjectData } from "./types";
import { linkShortenerConfig } from "../architecture-explorer/configs/link-shortener";
import { telemetryIngestionConfig } from "../architecture-explorer/configs/telemetry-ingestion";

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
    github: "https://github.com/AIABHISHEK/link-sh",
    architectureConfig: linkShortenerConfig,
    engineeringDecisions: [
      "Chose Fastify over Express for 2-3x better throughput on JSON serialization",
      "Redis cache-first reads reduce PostgreSQL load by ~90% for hot URLs",
      "Kafka decouples analytics from the API critical path, keeping p99 latency under 15ms",
      "Stateless API nodes allow horizontal scaling behind a simple load balancer",
      "Base62 encoding for short codes provides compact, URL-safe identifiers",
    ],
    challengesSolved: [
      "Ensuring reliable analytics delivery with Kafka consumer groups and dead-letter queues",
      "Graceful handling of burst traffic via token-bucket rate limiting per IP",

    ],
  },
  {
    id: "telemetry-data-ingestion",
    name: "Telemetry Data Ingestion Pipeline",
    description:
      "Real-time telemetry ingestion system for EV chargers using MQTT with session correlation and analytics APIs.",
    overview:
      "A real-time telemetry ingestion backend designed to process EV charger data streams from both vehicle DC and meter AC telemetry sources. The system correlates independent data streams into charging sessions and provides analytics APIs for performance metrics.",
    problem:
      "EV charger telemetry arrives as independent device streams (DC vehicle telemetry and AC meter telemetry). These streams must be correlated into charging sessions and processed in real time for analytics and operational insights.",
    stack: ["TypeScript", "NestJS", "MQTT", "PostgreSQL", "Docker"],
    features: [
      "Real-time telemetry ingestion",
      "Session-based event correlation",
      "Analytics APIs for charging efficiency",
      "Hot and cold data storage",
    ],
    github: "https://github.com/AIABHISHEK/data-ingestion-service",
    architectureConfig: telemetryIngestionConfig,
    engineeringDecisions: [
      "MQTT chosen for efficient lightweight telemetry messaging",
      "Session-centric data model correlates DC vehicle and AC meter telemetry streams",
      "Hot storage tables for active sessions and cold storage for historical analytics",
      "Containerized services with Docker for reproducible deployments",
    ],
    challengesSolved: [
      "Correlating asynchronous telemetry streams into unified charging sessions",
      "Handling high-frequency telemetry messages efficiently",
      "Designing schema for both real-time queries and historical analytics",
    ],
  },
  {
    id: "http-server-from-scratch",
    name: "HTTP Server From Scratch",
    description:
      "A lightweight HTTP/1.1 server implemented from scratch in Rust using raw TCP sockets.",
    overview:
      "A low-level HTTP server implementation built directly on top of TCP sockets in Rust. The server manually parses HTTP requests and constructs responses, demonstrating deep understanding of networking protocols and system programming.",
    problem:
      "Most developers rely on frameworks without understanding the underlying HTTP protocol. This project explores how HTTP works internally by implementing a server from first principles.",
    stack: ["Rust", "TCP", "HTTP/1.1"],
    features: [
      "Manual HTTP request parsing",
      "Custom routing implementation",
      "Response generation with correct status codes",
      "Memory-safe concurrent request handling",
    ],
    github: "https://github.com/AIABHISHEK/http-web-server-rust",
    engineeringDecisions: [
      "Rust chosen for memory safety and zero-cost abstractions",
      "Manual HTTP parsing to understand protocol structure",
      "TCP socket implementation using Rust standard library",
      "Ownership model ensures safe concurrency without data races",
    ],
    challengesSolved: [
      "Parsing HTTP headers and request lines from raw byte streams",
      "Handling TCP packet",
      "Designing routing logic without frameworks",
    ],
  },
  {
    id: "job-application-tracker",
    name: "Job Application Tracker SaaS",
    description:
      "Full-stack SaaS platform for tracking job applications with AI-powered job extraction and browser integration.",
    overview:
      "A productivity SaaS platform that helps job seekers track their job applications. It includes a Chrome extension to capture job postings directly from websites and AI-powered extraction of job details from URLs.",
    problem:
      "Job seekers often manage dozens of applications across different platforms. Tracking application status, job details, and follow-ups manually becomes difficult and disorganized.",
    stack: ["Node.js", "React", "PostgreSQL", "AWS EC2"],
    features: [
      "Job application status tracking",
      "AI-based job detail extraction",
      "RESTful API backend",
      "Chrome extension for saving job posts",
    ],
    github: "#",
    demo: "https://job.devploy.xyz/",
    engineeringDecisions: [
      "Node.js REST APIs handle application tracking and user authentication",
      "AI extraction automates job detail parsing from URLs",
      "Chrome extension integrates directly with job boards",
    ],
    challengesSolved: [
      "Extracting structured job information from unstructured webpages",
      "Designing scalable production-ready APIs for application tracking",
    ],
  },
];

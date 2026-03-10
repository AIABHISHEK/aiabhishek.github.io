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

export const telemetryIngestionConfig: ArchitectureConfig = {
    id: "telemetry-ingestion",
    title: "Interactive Architecture Explorer",
    subtitle: "EV Telemetry Data Ingestion Engine",
    description:
        "NestJS-based telemetry ingestion service that consumes MQTT events from EV chargers, correlates telemetry streams into charging sessions, and stores analytics-ready data in PostgreSQL.",

    nodes: [
        {
            id: "devices",
            position: { x: 0, y: 20 },
            data: { label: "🚗 EV Chargers / Vehicles" },
            style: nodeStyle,
        },

        {
            id: "mqtt",
            position: { x: 0, y: 120 },
            data: { label: "📡 MQTT Broker (Mosquitto)" },
            style: nodeStyle,
        },

        {
            id: "ingestion",
            position: { x: 0, y: 240 },
            data: { label: "⚙️ NestJS Ingestion Service" },
            style: nodeStyle,
        },

        {
            id: "sessions",
            position: { x: -180, y: 380 },
            data: { label: "🔗 Session Manager" },
            style: nodeStyle,
        },

        {
            id: "postgres",
            position: { x: 180, y: 380 },
            data: { label: "🐘 PostgreSQL Database" },
            style: nodeStyle,
        },

        {
            id: "analytics",
            position: { x: 180, y: 520 },
            data: { label: "📊 Analytics API" },
            style: nodeStyle,
        },

        {
            id: "metrics",
            position: { x: -180, y: 520 },
            data: { label: "📈 Metrics / Observability" },
            style: nodeStyle,
        },
    ],

    edges: [
        {
            id: "e-devices-mqtt",
            source: "devices",
            target: "mqtt",
            animated: true,
            style: { stroke: "hsl(160 100% 50% / 0.4)" },
        },

        {
            id: "e-mqtt-ingestion",
            source: "mqtt",
            target: "ingestion",
            animated: true,
            style: { stroke: "hsl(160 100% 50% / 0.4)" },
        },

        {
            id: "e-ingestion-session",
            source: "ingestion",
            target: "sessions",
            animated: true,
            style: { stroke: "hsl(199 89% 60% / 0.4)" },
        },

        {
            id: "e-session-db",
            source: "sessions",
            target: "postgres",
            animated: true,
            style: { stroke: "hsl(199 89% 60% / 0.4)" },
        },

        {
            id: "e-ingestion-db",
            source: "ingestion",
            target: "postgres",
            animated: true,
            style: { stroke: "hsl(199 89% 60% / 0.4)" },
        },

        {
            id: "e-db-analytics",
            source: "postgres",
            target: "analytics",
            animated: true,
            style: { stroke: "hsl(160 100% 50% / 0.4)" },
        },

        {
            id: "e-ingestion-metrics",
            source: "ingestion",
            target: "metrics",
            animated: true,
            style: {
                stroke: "hsl(45 100% 60% / 0.4)",
                strokeDasharray: "6,4",
            },
        },
    ],

    componentDetails: {
        devices: {
            id: "devices",
            label: "EV Chargers / Vehicles",
            icon: "🚗",
            purpose:
                "Charging devices publish telemetry data during charging sessions.",
            responsibilities: [
                "Send vehicle telemetry (SOC, battery temperature)",
                "Send meter telemetry (voltage, AC consumption)",
                "Emit session start and end events",
            ],
        },

        mqtt: {
            id: "mqtt",
            label: "MQTT Broker",
            icon: "📡",
            purpose:
                "Routes telemetry messages from EV devices to backend ingestion services.",
            responsibilities: [
                "Receive telemetry from charging devices",
                "Publish messages to subscribers",
                "Handle unreliable device connectivity",
            ],
            tech: ["Mosquitto", "MQTT"],
        },

        ingestion: {
            id: "ingestion",
            label: "NestJS Ingestion Service",
            icon: "⚙️",
            purpose:
                "Consumes MQTT telemetry streams and processes incoming events.",
            responsibilities: [
                "Subscribe to MQTT telemetry topics",
                "Validate telemetry payloads",
                "Forward events to session correlation logic",
                "Insert telemetry into database tables",
            ],
            tech: ["NestJS", "TypeScript"],
        },

        sessions: {
            id: "sessions",
            label: "Session Manager",
            icon: "🔗",
            purpose:
                "Correlates independent telemetry streams into unified charging sessions.",
            responsibilities: [
                "Track active charging sessions",
                "Attach telemetry events to sessions",
                "Manage session lifecycle",
            ],
        },

        postgres: {
            id: "postgres",
            label: "PostgreSQL Database",
            icon: "🐘",
            purpose: "Primary storage layer containing session metadata, telemetry history, and live state.",
        },

        analytics: {
            id: "analytics",
            label: "Analytics API",
            icon: "📊",
            purpose: "Provides analytics endpoints for computing charging efficiency and performance metrics.",
        },

        metrics: {
            id: "metrics",
            label: "Observability",
            icon: "📈",
            purpose:
                "Collects system metrics and monitors ingestion performance.",
            metrics: [
                "Telemetry ingestion rate",
                "Processing latency",
                "Active sessions",
                "Database write throughput",
            ],
        },
    },

    simulationPath: [
        "devices",
        "mqtt",
        "ingestion",
        "sessions",
        "postgres",
        "analytics",
    ],

    simulationMetrics: [
        { label: "Telemetry Events", value: "3,912", icon: "📡" },
        { label: "Active Sessions", value: "14", icon: "🔋" },
        { label: "Processing Latency", value: "19ms", icon: "⏱️" },
        { label: "DB Writes/sec", value: "285", icon: "🐘" },
    ],

    engineeringNotes: {
        scalingStrategy: [
            "Append-only telemetry tables optimize write throughput",
            "Hot state tables allow O(1) reads for dashboards",
            "Session-centric modeling enables efficient analytics queries",
        ],

        challengesSolved: [
            "Correlating AC and DC telemetry streams into unified charging sessions",
            "Supporting both real-time dashboards and historical analytics queries",
            "Handling continuous telemetry streams without database contention",
        ],
    },
};

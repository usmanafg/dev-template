/**
 * Dev Template — Roblox Developer Portfolio Configuration
 * ---------------------------------------------------------
 * Edit the values in this file to customize every section of your portfolio
 * without restructuring index.html or app.js.
 */

window.PORTFOLIO_CONFIG = {
  profile: {
    name: "Dev Template",
    handle: "Dev Template",
    role: "Roblox Developer & Systems Engineer",
    location: "United States",
    replyTime: "Replies within 24 hours",
    email: "hello@devtemplate.dev",
    headline: "Systems and worlds at Roblox scale.",
    summary:
      "I build high-concurrency Roblox experiences in Luau and developer tooling in TypeScript, Swift, and Rust. Focused on server-authoritative gameplay, compressed replication, and clean production architecture.",
    primaryAction: {
      label: "Explore shipped work",
      href: "#work"
    },
    secondaryAction: {
      label: "hello@devtemplate.dev",
      href: "mailto:hello@devtemplate.dev?subject=Roblox%20Development%20Inquiry"
    },
    tracks: [
      { label: "Roblox Worlds", meta: "Luau engines at 45K CCU", href: "#work" },
      { label: "Web & Native", meta: "TypeScript, Electron, Metal", href: "#showcase" }
    ],
    telemetry: {
      title: "60 Hz Server Loop & Packet Layout",
      statusLabel: "Nominal · 3.80 / 16.67 ms",
      tickRateHz: 60,
      frameBudgetMs: 16.67,
      activeTickMs: 3.8,
      snapshotBytes: 14,
      legacyBytes: 58,
      fields: [
        { name: "entityId", type: "u8", bytes: 1, note: "Active shard unit slot index (0-255)" },
        { name: "posQ", type: "i16[3]", bytes: 6, note: "Quantized world XYZ position at 0.05 stud step" },
        { name: "yaw", type: "u16", bytes: 2, note: "Packed heading angle across [0, 65535]" },
        { name: "stateFlags", type: "u8", bytes: 1, note: "Bitmask for stun, grounded, target lock, and FX" },
        { name: "health", type: "u16", bytes: 2, note: "Authoritative HP snapshot clamped on server tick" },
        { name: "tickCrc", type: "u16", bytes: 2, note: "Frame sequence checksum for delta discard" }
      ],
      phases: [
        { label: "Simulation", ms: 2.1 },
        { label: "Spatial Grid", ms: 0.9 },
        { label: "Buffer Pack", ms: 0.8 }
      ]
    },
    links: [
      { label: "GitHub", href: "https://github.com/devtemplate", meta: "@devtemplate" },
      { label: "Roblox", href: "https://www.roblox.com/users/profile", meta: "Creator Profile" },
      { label: "YouTube", href: "https://www.youtube.com/@devtemplate", meta: "Devlogs" },
      { label: "X / Twitter", href: "https://x.com/devtemplate", meta: "@devtemplate" }
    ]
  },

  about: {
    heading: "Background & Stack",
    facts: [
      { label: "Started in Luau", value: "2020 · Roblox Studio" },
      { label: "Web & Native", value: "2024 · TypeScript & Swift" },
      { label: "Flagship Scale", value: "180M+ Visits · 45K CCU" },
      { label: "Architecture", value: "Server Authority & ECS" }
    ],
    standardsTitle: "Production Guarantees",
    standards: [
      { label: "Type Safety", value: "--!strict · luau-lsp checked" },
      { label: "Heartbeat", value: "0 Heap Allocs in combat tick" },
      { label: "Data Safety", value: "Session-locked UpdateAsync" },
      { label: "Deployment", value: "Rojo CI + Automated Specs" }
    ],
    paragraphs: [
      "I started programming by scripting combat, round loops, and economy systems on Roblox in Luau. What began as solo prototypes expanded into live-service engineering while building Citadel Defense and external matchmaking infrastructure.",
      "Operating an experience at 45,000 concurrent players requires treating Luau like a strict systems language: packing network payloads into binary buffers, isolating client prediction from server authority, and keeping frame times predictable on low-end mobile devices.",
      "Beyond Studio, I build web telemetry dashboards and native desktop tools in TypeScript, React, Electron, and Swift. Those utilities support the same game loop: ranked queue routing in Bun and Hono, live place analytics in Next.js, and GPU-accelerated desktop previews.",
      "Every project in this portfolio template ships with deterministic state boundaries, strict type checking, and clean source code designed to outlast a single update cycle."
    ],
    signoffName: "Dev Template",
    signoffRole: "Roblox Systems Developer & Software Engineer"
  },

  stats: {
    heading: "Platform Impact",
    benchmarksTitle: "Per-Server Egress @ 50 Players (60 Hz)",
    benchmarksSub: "Measured replication bandwidth from load tests comparing Lua tables vs binary buffers.",
    benchmarks: [
      { label: "Nested Lua Table Remote", value: "169.9 KB/s", kb: 169.9, meta: "58 B / entity", active: false },
      { label: "Quantized Delta Table", value: "87.9 KB/s", kb: 87.9, meta: "30 B / entity", active: false },
      { label: "Packed Binary Buffer", value: "41.0 KB/s", kb: 41.0, meta: "14 B / entity", active: true }
    ],
    items: [
      {
        countTarget: "180",
        suffix: "M+",
        figure: "180M+",
        description: "Cumulative visits across shipped Roblox experiences and live-ops events."
      },
      {
        countTarget: "45,000",
        suffix: "",
        figure: "45,000",
        description: "Peak concurrent players sustained across synchronized global shards."
      },
      {
        countTarget: "1,400",
        suffix: "+",
        figure: "1,400+",
        description: "GitHub stars across open-source Studio plugins, web tools, and CLI bridges."
      },
      {
        countTarget: "60",
        suffix: " Hz",
        figure: "60 Hz",
        description: "Deterministic server simulation loop paired with compressed binary snapshots."
      }
    ]
  },

  work: {
    heading: "Shipped Work",
    lead: "Hover or select any row to inspect the release architecture and calculate network replication bandwidth at scale.",
    items: [
      {
        id: "citadel-defense",
        title: "Citadel Defense",
        category: "roblox",
        categoryLabel: "Roblox",
        role: "Lead Systems Engineer",
        stack: "Luau, ProfileStore, Buffers",
        metric: "120M+ Visits · 45K Peak CCU",
        year: "2024 - Present",
        frameBudgetMs: "3.8 ms server tick",
        pipeline: ["Quantized CFrame", "Server Authority", "14 B Buffer Pack"],
        url: "https://www.roblox.com/discover",
        packetBytesPerEntity: 14,
        summary:
          "Architected wave simulation, server-authoritative combat, session-locked trading, and live-ops tooling. Replaced legacy table remotes with packed binary buffers to stabilize server heartbeat during peak update traffic."
      },
      {
        id: "ropulse",
        title: "RoPulse Telemetry",
        category: "web",
        categoryLabel: "Web",
        role: "Creator & Maintainer",
        stack: "Next.js, TypeScript, Postgres",
        metric: "1,200+ Studio Teams",
        year: "2025 - Present",
        frameBudgetMs: "28 ms query p95",
        pipeline: ["Open Cloud Webhook", "Timescale Ingest", "Live Shard Diff"],
        url: "https://github.com/devtemplate",
        packetBytesPerEntity: 18,
        summary:
          "Web analytics and live server health tracker aggregating concurrent player telemetry, economy sinks, and crash-rate diffs for Roblox studios."
      },
      {
        id: "studioframe",
        title: "StudioFrame",
        category: "native",
        categoryLabel: "Native",
        role: "Author & Maintainer",
        stack: "Electron, React, Vite",
        metric: "Open-Source Workspace",
        year: "2025 - Present",
        frameBudgetMs: "60 FPS local UI",
        pipeline: ["Local IPC Bridge", "State Inspector", "Snapshot Export"],
        url: "https://github.com/devtemplate",
        packetBytesPerEntity: 10,
        summary:
          "Lightweight multi-pane desktop companion for managing Rojo sync workspaces, log streams, and Studio playtest profiles without sluggish plugin overhead."
      },
      {
        id: "metal-loom",
        title: "Metal Loom",
        category: "native",
        categoryLabel: "Native",
        role: "Author & Maintainer",
        stack: "Swift, Metal, macOS",
        metric: "120 FPS Preview Engine",
        year: "2026 - Present",
        frameBudgetMs: "0.9 ms GPU pass",
        pipeline: ["CVPixelBuffer", "Metal Compute", "ProMotion Lock"],
        url: "https://github.com/devtemplate",
        packetBytesPerEntity: 12,
        summary:
          "Native macOS utility written in Swift and Metal for inspecting custom shader loops and tileable texture previews across high-refresh displays with negligible GPU overhead."
      },
      {
        id: "queueshard",
        title: "QueueShard",
        category: "roblox",
        categoryLabel: "Roblox",
        role: "Backend Architect",
        stack: "Bun, Hono, MongoDB",
        metric: "Ranked Matchmaking API",
        year: "2024 - Present",
        frameBudgetMs: "14 ms dispatch",
        pipeline: ["ELO Bucketing", "HMAC Token", "ReserveServerAsync"],
        url: "https://github.com/devtemplate",
        packetBytesPerEntity: 16,
        summary:
          "External ELO matchmaking and party-routing service built on Bun, Hono, and MongoDB, handling ranked queue dispatch and cross-server reservation keys for competitive Roblox titles."
      },
      {
        id: "luaubridge",
        title: "LuauBridge",
        category: "web",
        categoryLabel: "Web",
        role: "Package Author",
        stack: "TypeScript, Rust, Rojo",
        metric: "Open-Source CLI",
        year: "2025",
        frameBudgetMs: "Zero-config AST",
        pipeline: ["Luau AST Scan", "Zap Schema Emit", "Open Cloud Push"],
        url: "https://github.com/devtemplate",
        packetBytesPerEntity: 8,
        summary:
          "Typed RPC code-generator and build pipeline utility bridging Luau server modules, Rojo sourcemaps, and Open Cloud automated publishing checks."
      }
    ]
  },

  showcase: {
    heading: "Selected Systems",
    linkLabel: "Browse source on GitHub",
    linkHref: "https://github.com/devtemplate",
    intro:
      "Every module below is rendered directly from real protocol math and strict type contracts, replacing decorative media with inspectable engineering specs.",
    frames: [
      {
        title: "Buffer Replication",
        fact: "14 B / entity",
        summary: "Packs unit IDs, quantized coordinates, yaw, bitflags, health, and frame CRC into one buffer.",
        codeSample: "buffer.writeu8(b, 0, entityId)\nbuffer.writei16(b, 1, math.round(x * 20))\nUnreliableRemote:FireAllClients(b)",
        metrics: [
          { label: "Compression", value: "76% smaller" },
          { label: "Frequency", value: "60 Hz fixed" }
        ]
      },
      {
        title: "Live Telemetry",
        fact: "Sub-second sync",
        summary: "Streams server heartbeat percentiles, MemoryStore utilization, and economy deltas over signed webhooks.",
        codeSample: "post('/v1/shards/heartbeat', {\n  ccu, tickP95Ms, heapMb, signature\n})",
        metrics: [
          { label: "Query p95", value: "28 ms" },
          { label: "Retention", value: "90 days" }
        ]
      },
      {
        title: "Desktop Shell",
        fact: "Rojo Companion",
        summary: "Isolated IPC worker tails Studio logs, sourcemap errors, and multi-client playtest flags in one pane.",
        codeSample: "rojo sourcemap default.project.json\n  --watch --output sourcemap.json",
        metrics: [
          { label: "Idle RAM", value: "64 MB" },
          { label: "Hot Reload", value: "< 50 ms" }
        ]
      },
      {
        title: "Metal Shaders",
        fact: "120 FPS lock",
        summary: "Zero-allocation render loop binding CVPixelBuffer textures to ProMotion display links on macOS.",
        codeSample: "encoder.setComputePipelineState(pso)\nencoder.dispatchThreads(grid, tg)\ncommandBuffer.commit()",
        metrics: [
          { label: "CPU Idle", value: "< 1.0%" },
          { label: "Frame Pace", value: "8.33 ms" }
        ]
      }
    ]
  },

  stackAndNotes: {
    heading: "Stack & Notes",
    stackGroups: [
      {
        group: "Roblox & Luau",
        items: [
          { name: "Strict Luau", meta: "Primary · 2020 - Present", dot: "#0a6436" },
          { name: "Rojo & Wally", meta: "Toolchain · Sourcemap & CI", dot: "#2b2622" },
          { name: "ProfileStore & MemoryStore", meta: "Session-locked persistence", dot: "#2b2622" },
          { name: "Zap / Binary Buffers", meta: "Compressed remote replication", dot: "#0a6436" },
          { name: "JECS & Parallel Luau", meta: "Actor-isolated simulation", dot: "#59504c" }
        ]
      },
      {
        group: "Web, Backend & Native",
        items: [
          { name: "TypeScript & Next.js", meta: "Full-stack · 2024 - Present", dot: "#0a6436" },
          { name: "Bun, Hono & MongoDB", meta: "Matchmaking & API services", dot: "#2b2622" },
          { name: "Electron, React & Vite", meta: "Cross-platform desktop UI", dot: "#59504c" },
          { name: "Swift & Metal", meta: "macOS native rendering", dot: "#2b2622" }
        ]
      }
    ],
    notesHeading: "Engineering Notes",
    notes: [
      {
        title: "Scaling Citadel Defense Replication to 45K CCU",
        date: "2026-08",
        readTime: "4 min",
        summary:
          "Why nested Lua tables stall Roblox replication queues above 150 active units, and how packing unit IDs, quantized coordinates, and delta flags into a single UnreliableRemoteEvent buffer cuts per-player bandwidth by 76%."
      },
      {
        title: "Deterministic Ranked Matchmaking with QueueShard",
        date: "2026-05",
        readTime: "5 min",
        summary:
          "Designing an external HTTP queue service using TeleportService:ReserveServerAsync tokens, sliding ELO tolerances, and HMAC signature validation to block client-side queue spoofing."
      },
      {
        title: "Automating Rojo Sourcemaps and CI Checks in LuauBridge",
        date: "2025-11",
        readTime: "3 min",
        summary:
          "How LuauBridge keeps strict Luau type definitions, Wally packages, and Roblox Open Cloud place deployments deterministic across pull requests."
      },
      {
        title: "Zero-Allocation Shader Loops with Swift and Metal Loom",
        date: "2026-09",
        readTime: "4 min",
        summary:
          "Lessons from Metal Loom on sharing CVPixelBuffer textures across multi-monitor display links while keeping idle CPU utilization under 1% on Apple Silicon."
      }
    ]
  },

  contact: {
    heading: "Get in Touch",
    statement:
      "Available for lead Roblox architecture, high-concurrency Luau optimization, and custom developer tooling.",
    prompt: "Have a game or system to scale?",
    availability: {
      heading: "Engagement Spec",
      status: "Open for Q1 / Q2 Commissions",
      rows: [
        { label: "Primary Focus", value: "Server Architecture & Luau Engines" },
        { label: "Secondary Focus", value: "Matchmaking APIs & Studio Tooling" },
        { label: "Collaboration", value: "Rojo Git Flow + Typed Contracts" },
        { label: "Timezone", value: "UTC-5 · US Eastern" }
      ]
    },
    footerLeft: "Dev Template · Roblox Portfolio",
    footerRight: "2026 · MIT License"
  }
};

# PacketFlow - System Overview

## Project Name

PacketFlow

## Description

PacketFlow is a lightweight, browser-based network simulation platform designed to simplify the teaching and learning of computer networking fundamentals. It allows users to visually build network topologies, connect devices with various cable types, and simulate packet flow across those connections.

## Purpose

The project aims to provide an accessible alternative to heavy simulation tools like Cisco Packet Tracer, especially for students in resource-constrained environments. It focuses on visual, interactive learning of networking concepts.

## Core Features

- **Drag-and-drop network builder**: Place routers, switches, PCs, servers, and security devices onto a canvas
- **Visual device connections**: Link devices using multiple cable types (Ethernet, Fiber, Serial, etc.)
- **Packet simulation**: Animate data packet movement between connected devices
- **Interactive terminal/console**: Built-in command-line interface for network diagnostics
- **Real-time network statistics**: IP configuration, speed tests, DNS lookup, and more
- **Responsive layout**: Works on desktop and mobile with collapsible sidebar and mobile toolbar

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.1 (App Router) |
| UI Library | React 19.2.4 |
| Canvas/Diagram | React Flow 11.11.4 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React 1.7.0 |
| Animations | Framer Motion 12.38.0 |
| Notifications | React Hot Toast 2.6.0 |
| Language | TypeScript 5 |
| Build Tool | Vite (not currently used - Next.js handles build) |

## System Architecture

PacketFlow follows a Next.js App Router architecture with three primary pages:

```
src/
├── app/
│   ├── globals.css          # Global styles + Tailwind import
│   ├── layout.tsx           # Root layout (minimal)
│   ├── page.tsx             # Landing page (auth modal, animated hero)
│   └── dashboard/
│       └── page.tsx         # Main simulator workspace
├── components/
│   ├── canvas/
│   │   ├── NetworkCanvas.tsx   # React Flow wrapper + packet engine
│   │   ├── CustomNode.tsx      # Device node component
│   │   └── TextNode.tsx        # Editable text/label node
│   └── ui/
│       └── Sidebar.tsx         # Device + cable palette
├── lib/
│   └── simulation.ts           # BFS path-finding algorithm
├── types/
│   └── network.ts              # TypeScript interfaces
└── utils/
    └── findEdgePath.ts         # Graph traversal utility
```

## Key Directories

- `src/app/` - Next.js application routes and styles
- `src/components/canvas/` - React Flow canvas, node types, packet animation
- `src/components/ui/` - Sidebar with device/cable drag-and-drop palette
- `src/lib/` - Core simulation logic (path finding)
- `src/types/` - Shared TypeScript type definitions
- `src/utils/` - Helper utilities

## How to Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## How to Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

## License

No license file currently included in the repository. All rights reserved by the project owner.

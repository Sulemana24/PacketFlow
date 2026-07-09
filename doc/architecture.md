# Architecture

## Layered Overview

PacketFlow is structured as a client-side Next.js application with no backend. All state is managed in React components, and persistence uses `localStorage`.

```
┌─────────────────────────────────────────────────────────────────┐
│                     Presentation Layer                          │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   page.tsx  │  │ dashboard/   │  │   Sidebar.tsx        │  │
│  │ (Landing)   │  │ page.tsx     │  │ (Device/Cable List)  │  │
│  └─────────────┘  └──────────────┘  └──────────────────────┘  │
│                          │                                      │
│                          ▼                                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │            canvas/NetworkCanvas.tsx                       │  │
│  │   ReactFlow instance + packet animation engine            │  │
│  │   - Node rendering (CustomNode, TextNode)                 │  │
│  │   - Edge rendering (cable style by type)                  │  │
│  │   - Packet animation (BFS path traversal)                 │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Simulation Layer                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  src/lib/simulation.ts  &  src/utils/findEdgePath.ts      │  │
│  │  - BFS graph traversal (find shortest path)               │  │
│  │  - No routing protocols implemented (simple shortest hop) │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                        State Layer                              │
│  React component state (useState) + React Flow hooks           │
│  - Nodes / Edges arrays                                        │
│  - Connection mode (cable type)                                │
│  - Selected node                                               │
│  - Packet state (path + animation index)                       │
│  - Console messages                                            │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Data Layer                              │
│  localStorage (browser only)                                   │
│  - "packetflow_user" (fake session storage)                    │
│  No IndexedDB, no backend API, no database                     │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Placing a Device

```
Sidebar (drag start)
  └─> event.dataTransfer.setData("item-type", "device")
  └─> event.dataTransfer.setData("device-type", "router")

Canvas (onDrop)
  └─> reactFlowInstance.screenToFlowPosition()
  └─> Create Node object (id, type "custom", data)
  └─> setNodes([...nds, newNode])
```

### 2. Connecting Devices with a Cable

```
Sidebar (drag start)
  └─> event.dataTransfer.setData("item-type", "cable")
  └─> event.dataTransfer.setData("cable-type", "fiber")

Canvas (onDrop / onNodeClick)
  └─> setConnectionMode("fiber")
  └─> User clicks first node (sourceNodeId)
  └─> User clicks second node (target)
  └─> Create Edge object
      - style based on cable type (getCableStyle)
      - data: { cableType }
  └─> setEdges(eds => ...concat(newEdge))
```

### 3. Sending a Packet

```
User clicks "Send Packet" button
  └─> Source = nodes[0].id  (first node placed)
  └─> Target = nodes[last].id (last node placed)
  └─> path = findEdgePath(edges, source, target)
      └─> BFS traversal of edge graph
  └─> setPacket({ path, index: 0 })
  └─> animatePacket(path, 0)
      └─> requestAnimationFrame loop
      └─> Interpolate position between node endpoints
      └─> setPacketPosition({ x, y })
      └─> Visual yellow dot rendered absolutely over canvas
```

### 4. Console Commands

```
User types command in terminal input
  └─> handleConsoleSubmit(command)
  └─> trimmedCommand = command.trim().toLowerCase()
  └─> switch/else block handles:
      - "help" -> static help text
      - "clear" -> clears messages
      - "network status" -> shows networkStats state
      - "network ip" -> local/public IP info
      - "speedtest" -> triggers fetch-based speed measurement
      - "ping [host]" -> simulated ping response
      - "traceroute [host]" -> simulated traceroute
      - "dns" -> static DNS server list
      - default -> "Command not found"
```

## Component Interactions

### NetworkCanvas

The central canvas component is the heart of the simulator. It:
- Initializes React Flow with empty nodes/edges
- Provides drag-and-drop handlers (`onDrop`, `onDragOver`, `onDragLeave`)
- Manages connection mode state for cable-based linking
- Handles node clicks (selection + connection initiation)
- Renders packet animation via `requestAnimationFrame`
- Contains delete/selection logic for nodes and edges

### Sidebar

Provides two tabs:
- **Devices**: 30+ network device types organized by category (End Devices, Infrastructure, Security, Servers, Specialized)
- **Cables**: 14 cable types organized by category (Wired, Wireless)

All items are draggable and set data on `dataTransfer` for canvas consumption.

### CustomNode

A React Flow node component that renders:
- Device icon (from Lucide React, mapped by device type)
- Device label
- Device type string (human-readable)
- Optional IP address
- 4 connection handles (top, left, bottom, right)

### TextNode

An editable text label node with:
- Double-click to edit
- Save/Cancel buttons
- Keyboard shortcuts (Enter to save, Escape to cancel)
- 4 connection handles like CustomNode

## Component Tree

```
src/app/layout.tsx
└── src/app/
    ├── page.tsx          (Landing page)
    │   └── Auth Modal (login/signup)
    │   └── Animated hero (framer-motion planets)
    └── dashboard/page.tsx
        ├── Sidebar (device + cable palette)
        └── NetworkCanvas (React Flow)
            ├── CustomNode (device nodes)
            ├── TextNode (label nodes)
            └── Packet animation overlay
```

## Styling Strategy

- **Tailwind CSS v4** with custom theme variables in `globals.css`
- Primary colors: `#00A5E0` (cyan/blue), `#0B0F19` (dark background), `#1F2937` (panels)
- Utility-first approach with inline `style` props for dynamic values (node positions, packet animation)
- No component library used — all UI is custom-built

## Key Design Decisions

1. **Client-side only**: No server-side rendering for the main app; all "auth" is simulated
2. **localStorage for persistence**: User session stored in browser; no real backend
3. **Simple BFS routing**: Path finding uses shortest-hop logic, not weighted metrics
4. **Fixed packet source/target**: "Send Packet" always uses first and last nodes placed
5. **Duplicate path-finding**: Both `src/lib/simulation.ts` and `src/utils/findEdgePath.ts` export the same function

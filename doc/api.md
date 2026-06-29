# Internal APIs

This document describes the key functions, components, and data models in the PacketFlow codebase.

## Simulation Layer

### `findEdgePath(edges, source, target)`

**Location:** `src/utils/findEdgePath.ts` and `src/lib/simulation.ts`

**Description:** Finds the shortest path (by hop count) between two nodes in a directed graph using breadth-first search (BFS).

**Parameters:**

| Name | Type | Description |
|------|------|-------------|
| `edges` | `any[]` | Array of edge objects with `source` and `target` properties |
| `source` | `string` | ID of the starting node |
| `target` | `string` | ID of the destination node |

**Returns:** `string[] | null` — Array of node IDs forming the path, or `null` if no path exists.

**Example:**

```ts
const path = findEdgePath(edges, "node-1", "node-4");
// Returns: ["node-1", "node-2", "node-3", "node-4"] or null
```

---

## Type Definitions

### `DeviceType`

**Location:** `src/types/network.ts` and `src/components/canvas/NetworkCanvas.tsx`

**Description:** Union type of all supported network device types.

**Values:**
```
"pc" | "router" | "switch" | "firewall" | "server" | "laptop" |
"printer" | "wireless-ap" | "cloud" | "modem" | "hub" | "bridge" |
"load-balancer" | "nas" | "ip-phone" | "tablet" | "smartphone" |
"access-point" | "controller" | "multilayer-switch" | "repeater" |
"gateway" | "ids" | "ips" | "vpn-concentrator"
```

### `CableType`

**Location:** `src/components/canvas/NetworkCanvas.tsx`

**Description:** Union type of supported cable/connection types.

**Values:**
```
"ethernet" | "fiber" | "coaxial" | "serial" | "usb" | "hdmi" |
"vga" | "dvi" | "thunderbolt" | "sata" | "power"
```

### `NetworkNodeData`

**Location:** `src/types/network.ts`

```ts
export type NetworkNodeData = {
  type: DeviceType;
  label: string;
  ipAddress?: string;
  macAddress?: string;
  status?: string;
};
```

### `Packet`

**Location:** `src/components/canvas/NetworkCanvas.tsx`

```ts
type Packet = {
  path: string[];
  index: number;
};
```

---

## Canvas API

### `NetworkCanvas` Component

**Location:** `src/components/canvas/NetworkCanvas.tsx`

**Purpose:** Main simulation canvas built on React Flow. Handles device placement, cable connections, node selection, and packet animation.

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `onDropNode` | `(type: DeviceType, position: {x: number, y: number}) => void` | Callback when a device is dropped onto the canvas |

**Internal State:**

| State | Type | Purpose |
|-------|------|---------|
| `nodes` | `Node<NetworkNodeData>[]` | All device/label nodes on canvas |
| `edges` | `Edge[]` | All cable connections between nodes |
| `connectionMode` | `string \| null` | Active cable type when connecting |
| `isConnecting` | `boolean` | Whether we are in the middle of a connection |
| `sourceNodeId` | `string \| null` | First node clicked during connection |
| `selectedNodeId` | `string \| null` | Currently selected node |
| `packet` | `Packet \| null` | Active packet animation state |
| `packetPosition` | `{x: number, y: number} \| null` | Current animated packet position |

**Key Methods:**

#### `animatePacket(path: string[], index: number)`

Recursively animates a packet along a path using `requestAnimationFrame`.

#### `sendPacket()`

Initiates packet transmission from the first node to the last node using `findEdgePath` to determine the route.

---

## UI Components

### `Sidebar`

**Location:** `src/components/ui/Sidebar.tsx`

**Purpose:** Device and cable palette with drag-and-drop support, search filtering, and collapsible categories.

**Exported Data Structures:**

```ts
type DeviceType =
  | "pc" | "router" | "switch" | "firewall" | "server" | "laptop"
  | "printer" | "wireless-ap" | "cloud" | "modem" | "hub" | "bridge"
  | "load-balancer" | "nas" | "ip-phone" | "tablet" | "smartphone"
  | "access-point" | "controller" | "multilayer-switch" | "repeater"
  | "gateway" | "ids" | "ips" | "vpn-concentrator" | "user" | "building"
  | "internet" | "dns" | "dhcp" | "proxy"
  | "text"

type CableType =
  | "ethernet" | "fiber" | "coaxial" | "serial" | "usb" | "console"
  | "hdmi" | "power" | "wireless" | "wifi6" | "cellular5g"
  | "bluetooth" | "zigbee" | "lorawan"
```

### `CustomNode`

**Location:** `src/components/canvas/CustomNode.tsx`

**Purpose:** React Flow custom node for network devices.

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `data` | `{ type, label, icon?, ipAddress?, macAddress?, status? }` | Node data |
| `selected` | `boolean` | Whether the node is currently selected |

### `TextNode`

**Location:** `src/components/canvas/TextNode.tsx`

**Purpose:** Editable text label node for annotations.

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `data` | `{ text, fontSize?, color? }` | Text content and styling |
| `selected` | `boolean` | Whether the node is currently selected |

---

## Utility Functions

### `getCableStyle(type: string)`

**Location:** `src/components/canvas/NetworkCanvas.tsx` (private)

Returns visual style object for a given cable type.

```ts
const getCableStyle = (type: string) => {
  switch (type) {
    case "fiber":
      return { stroke: "#00A5E0", strokeWidth: 3 };
    case "ethernet":
      return { stroke: "#10B981", strokeWidth: 2 };
    case "coaxial":
      return { stroke: "#F59E0B", strokeWidth: 2 };
    default:
      return { stroke: "#6B7280", strokeWidth: 2 };
  }
};
```

### `getDeviceLabel(type: DeviceType)`

**Location:** `src/components/canvas/NetworkCanvas.tsx` (private)

Returns human-readable label for a device type. Currently returns the type uppercase or "Text" for the special text type.

---

## Dashboard Console Commands

The console in `src/app/dashboard/page.tsx` exposes the following commands:

| Command | Description | Mode |
|---------|-------------|------|
| `help` | Show available commands | — |
| `clear` | Clear console output | — |
| `network status` | Show network connection status | — |
| `network ip` | Show local and public IP info | — |
| `speedtest` | Test internet download/upload speed | — |
| `ping [host]` | Simulated ping to a host | — |
| `traceroute [host]` | Simulated traceroute to a host | — |
| `devices` | List connected devices (static) | — |
| `stats` | Show simulation statistics (static) | — |
| `status` | Show simulation status (static) | — |
| `dns` | Show DNS server list (static) | — |

These commands are all implemented inside the `handleConsoleCommand` switch statement in `dashboard/page.tsx:579-716`.

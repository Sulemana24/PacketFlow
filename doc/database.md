# Data Storage

## Overview

PacketFlow currently uses **browser localStorage** for data persistence. There is no IndexedDB implementation, no backend API, and no database currently active in the codebase.

**Note:** The `README.md` lists "Firebase" as part of the tech stack, but Firebase is not present in `package.json` dependencies and no Firebase imports exist in the source code.

## localStorage Schema

PacketFlow stores one data structure in browser localStorage:

### User Session Object

**Key:** `packetflow_user`

**Location:** Set in `src/app/page.tsx:133` and `src/app/dashboard/page.tsx:409`

**Structure:**

```json
{
  "email": "string",
  "name": "string"
}
```

**Example:**

```json
{
  "email": "student@example.com",
  "name": "Jane Doe"
}
```

## CRUD Operations

### Create / Update Session

**Location:** `src/app/page.tsx` — `handleAuth` function (line 119)

```ts
const userData = {
  email,
  name: isLogin ? "User" : name,
};

localStorage.setItem("packetflow_user", JSON.stringify(userData));
```

### Read Session

**Location:** `src/app/dashboard/page.tsx` — `useEffect` (line 408)

```ts
const userData = localStorage.getItem("packetflow_user");
if (!userData) {
  router.push("/");
} else {
  setUser(JSON.parse(userData));
}
```

### Delete Session

**Location:** `src/app/dashboard/page.tsx` — `handleLogout` function (line 453)

```ts
const handleLogout = () => {
  localStorage.removeItem("packetflow_user");
  router.push("/");
};
```

## Future Database Possibilities

Although not implemented, a production version of PacketFlow could benefit from:

### IndexedDB Stores (Conceptual)

| Store Name | Purpose | Data Model |
|------------|---------|------------|
| `topologies` | Saved network lab files | See proposed schema below |
| `settings` | User preferences | Theme, default cable type, etc. |
| `sessions` | Login sessions | Auth tokens, expiry |

### Proposed Topology Data Model

```json
{
  "id": "uuid-string",
  "name": "Lab 1 - Basic LAN",
  "createdAt": "2026-06-21T21:00:00Z",
  "updatedAt": "2026-06-21T21:30:00Z",
  "nodes": [
    {
      "id": "node-uuid",
      "type": "custom",
      "position": { "x": 250, "y": 100 },
      "data": {
        "type": "router",
        "label": "R1",
        "ipAddress": "192.168.1.1"
      }
    }
  ],
  "edges": [
    {
      "id": "edge-uuid",
      "source": "node-1",
      "target": "node-2",
      "type": "smoothstep",
      "data": {
        "cableType": "ethernet"
      }
    }
  ]
}
```

### Proposed CRUD Operations (Not Implemented)

```ts
// Save topology
async function saveTopology(topology: Topology): Promise<void>

// Load all topologies
async function loadTopologies(): Promise<Topology[]>

// Load single topology
async function loadTopology(id: string): Promise<Topology | null>

// Delete topology
async function deleteTopology(id: string): Promise<void>
```

## Current Limitations

- No topology persistence — refreshing the page clears all devices and connections
- No user accounts — authentication is simulated with localStorage
- No data export/import (no `.pkt` or JSON save/load feature)
- All network statistics are either static or fetched live from public APIs (ipify.org, ipapi.co, Cloudflare speed test)

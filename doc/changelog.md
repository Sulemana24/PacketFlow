# Changelog

All notable changes to PacketFlow are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - Initial Release

### Added

- **Landing Page** (`src/app/page.tsx`)
  - Animated cosmic/space-themed hero with twinkling stars, orbiting planets, and shooting stars
  - Login / Sign Up modal with form validation
  - "How It Works" section
  - Features showcase
  - Call-to-action sections
  - Footer with branding

- **Dashboard** (`src/app/dashboard/page.tsx`)
  - Main simulation workspace
  - Collapsible sidebar with device and cable palette
  - Network canvas powered by React Flow
  - Built-in terminal/console with network diagnostic commands
  - User profile menu with logout
  - Mobile-responsive layout with bottom toolbar
  - Real-time network status monitoring (online/offline indicator)
  - IP configuration display (local IP via WebRTC, public IP via ipify.org)
  - Internet speed test (download via Cloudflare, upload via httpbin.org)
  - DNS server display
  - Console keyboard shortcuts (Ctrl+K to focus, Ctrl+Shift+C to toggle)

- **Network Canvas** (`src/components/canvas/NetworkCanvas.tsx`)
  - Drag-and-drop device placement from sidebar
  - Cable connection mode (select cable type, click two nodes to connect)
  - Visual edge styling by cable type (Ethernet, Fiber, Coaxial, etc.)
  - Packet animation with BFS pathfinding (`findEdgePath`)
  - Node selection and deletion (Delete/Backspace key)
  - Escape key cancels connection mode
  - "Send Packet" button for initiating animation

- **Custom Node Component** (`src/components/canvas/CustomNode.tsx`)
  - Device node rendering with Lucide React icons
  - Icon mapping for 25+ device types
  - Support for IP address display
  - 4 connection handles (top, left, bottom, right)

- **Text Node Component** (`src/components/canvas/TextNode.tsx`)
  - Editable text labels with double-click activation
  - Save/Cancel controls with keyboard shortcuts (Enter / Escape)
  - Used for annotations on the canvas

- **Sidebar** (`src/components/ui/Sidebar.tsx`)
  - 30+ device types organized by category (End Devices, Infrastructure, Security, Servers, Specialized)
  - 14 cable types organized by category (Wired, Wireless)
  - Search filtering across devices and cables
  - Collapsible category groups
  - Tab switching between Devices and Cables
  - Drag-and-drop export to canvas

- **Simulation Utilities**
  - BFS path-finding algorithm in `src/utils/findEdgePath.ts`
  - Duplicate implementation in `src/lib/simulation.ts`
  - Determines shortest-hop route between two nodes

- **Styling**
  - Tailwind CSS v4 with custom theme variables
  - Dark theme with cyan accent (`#00A5E0`)
  - Framer Motion animations throughout the app
  - Responsive grid layouts

### Known Issues

- No test suite exists (no unit, integration, or E2E tests)
- No topology persistence — refreshing the page clears the canvas
- Packet source/target is always first and last node placed (not user-selectable)
- Some console commands return hardcoded/static data (`devices`, `stats`, `status`, `dns`)
- MAC address is randomly generated (browsers cannot access real MAC addresses)
- Local IP detection via WebRTC may fail in some browser contexts
- Many `console.log` statements remain from development
- Duplicate `findEdgePath` implementation in two files (`src/lib/simulation.ts` and `src/utils/findEdgePath.ts`)
- No manifest.json or service worker (not a PWA yet)
- Auth is simulated with localStorage; no real backend or Firebase integration despite README mention

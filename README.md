# PacketFlow 🚀

PacketFlow is a lightweight, browser-based network simulation platform designed to simplify the teaching and learning of computer networking fundamentals. It lets you visually build network topologies, connect devices with various cable types, and watch data packets flow between them in real time.

## ✨ Features

- 🧱 **Drag-and-drop network builder** — Place routers, switches, PCs, servers, firewalls, and more
- 🔗 **Visual device connections** — Link devices with Ethernet, Fiber, Serial, Console, and other cable types
- 📦 **Packet flow simulation** — Watch animated packets travel across your topology using BFS path-finding
- 💻 **Built-in terminal console** — Run commands like `ping`, `traceroute`, `speedtest`, `network status`, and more
- 📊 **Real-time network diagnostics** — View local IP, public IP, MAC address, and internet speed
- 📱 **Responsive design** — Works on desktop and mobile with collapsible sidebar and mobile toolbar
- 🎨 **Cisco-inspired dark theme** — Professional UI with smooth animations

## 🛠️ Tech Stack

- **Next.js 16** — React framework with App Router
- **React 19** — UI library
- **React Flow** — Canvas for network topologies
- **Tailwind CSS v4** — Utility-first styling
- **Framer Motion** — Smooth page animations
- **Lucide React** — Icon library
- **TypeScript** — Type safety

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Run linting
npm run lint

# Create production build
npm run build

# Start production server
npm start
```

## 📖 Documentation

Full documentation is available in the `doc/` folder:

| File | Description |
|------|-------------|
| [`doc/system.md`](doc/system.md) | High-level project overview and features |
| [`doc/architecture.md`](doc/architecture.md) | System architecture and data flow diagrams |
| [`doc/api.md`](doc/api.md) | Internal APIs, components, and type definitions |
| [`doc/database.md`](doc/database.md) | Data storage (localStorage) schema and operations |
| [`doc/deployment.md`](doc/deployment.md) | Deployment steps for Vercel, Netlify, and GitHub Pages |
| [`doc/cli-commands.md`](doc/cli-commands.md) | All supported terminal commands with examples |
| [`doc/testing.md`](doc/testing.md) | Testing strategy and manual checklist |
| [`doc/troubleshooting.md`](doc/troubleshooting.md) | Common issues and fixes |
| [`doc/changelog.md`](doc/changelog.md) | Version history and known issues |
| [`doc/FIGMA-SPEC.md`](doc/FIGMA-SPEC.md) | Figma design spec — tokens, frames, components |
| [`doc/WIREFRAME.md`](doc/WIREFRAME.md) | Figma wireframe blueprint for each frame |

## 🎮 How to Use

1. **Login** — Click "Login / Sign Up" in the top-right (any credentials work for demo)
2. **Add Devices** — Drag devices from the left sidebar onto the canvas
3. **Connect Devices** — Click a cable in the sidebar, then click two devices on the canvas to connect them
4. **Send a Packet** — Click the "Send Packet" button in the top-right to animate data flow
5. **Use the Terminal** — Open the console to run commands like `network status`, `ping google.com`, or `speedtest`

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Delete` / `Backspace` | Remove selected node |
| `Escape` | Cancel connection mode |
| `B` | Toggle sidebar (mobile) |
| `F` | Fit view to show all nodes |
| `Ctrl+K` | Focus console input |
| `Ctrl+Shift+C` | Toggle console |

## 📸 Screenshots

*(Screenshots to be added — terminal must be restarted first, then `npm run dev` and open http://localhost:3000)*

## 🧠 Inspiration

Inspired by the need for simpler, more interactive networking education tools. PacketFlow provides a lightweight, accessible alternative to heavy simulator tools like Cisco Packet Tracer.

---

**Note:** This is an early-stage project (v0.1.0). Auth is simulated, topology data is not persisted across sessions, and some terminal commands return static data. See [`doc/changelog.md`](doc/changelog.md) for known issues.

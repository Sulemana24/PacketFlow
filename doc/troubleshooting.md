# Troubleshooting

## Build Errors

### `next build` fails with "Module not found"

**Symptom:** Build fails with an inability to resolve a module import.

**Fix:**
1. Run `npm install` to ensure all dependencies are installed
2. Delete `node_modules` and `.next` and reinstall:
   ```bash
   rm -rf node_modules .next
   npm install
   npm run build
   ```

### TypeScript errors during build

**Symptom:** `npm run build` fails with TypeScript errors.

**Fix:**
1. Check that `tsconfig.json` is valid and paths match the file structure
2. Ensure all imports use the `@/` prefix where configured (`"@/*": ["./src/*"]`)
3. Fix any type errors reported by ESLint: `npm run lint`

---

## PWA Installation Issues

**Symptom:** "Add to Home Screen" or PWA install prompt does not appear.

**Fix:**
PacketFlow does not currently include a `manifest.json` or service worker. To enable PWA installation:
1. Add a `public/manifest.json` file
2. Optionally add the `@ducanh2912/next-pwa` plugin for service worker support
3. Ensure the site is served over HTTPS (required for service workers)

---

## CLI Parser Errors

**Symptom:** Console commands return "Command not found" for valid commands.

**Fix:**
1. Ensure you are typing commands in **lowercase** — the parser converts input to lowercase with `.toLowerCase()`
2. Commands with arguments require a space (e.g., `ping google.com`, not `pinggoogle.com`)
3. Extra spaces before or after the command are trimmed, but double spaces within arguments may cause issues
4. The parser is case-insensitive but space-sensitive for argument parsing

**Known parser limitations:**
- Commands like `PING GOOGLE.COM` work
- Commands like `ping  google.com` (double space) may fail
- No tab completion or command history exists yet

---

## IndexedDB Issues

**Symptom:** Expecting to save/load topologies but data disappears on refresh.

**Fix:**
IndexedDB is **not currently implemented** in PacketFlow. There is no topology persistence layer. If you need to save layouts, use one of these workarounds:
1. Take a screenshot of your topology
2. Copy node/edge data manually from the browser console
3. Implement a local persistence layer (localStorage or IndexedDB)

To add IndexedDB support, you would need to:
1. Add an IndexedDB library (e.g., `idb` npm package)
2. Create stores for topologies
3. Hook save/load buttons in the UI

---

## Drag-and-Drop Not Working

**Symptom:** Dragging devices from the sidebar does nothing.

**Fix:**
1. Ensure you are dragging from the **sidebar** onto the **canvas** area
2. Some browsers restrict drag events in iframes or sandboxed environments — run in a normal browser window
3. The sidebar items must be clicked and held before dragging (not just clicked)
4. Check the browser console for errors

---

## Packet Animation Not Showing

**Symptom:** Clicking "Send Packet" but no yellow dot appears.

**Fix:**
1. Ensure there are **at least 2 nodes** on the canvas
2. Ensure there is a connected path between the first and last nodes
3. The path finder uses `findEdgePath` — if no BFS path exists, the packet will not animate
4. Check browser console for "No valid path found" messages
5. Nodes must be connected with edges (cables) for the packet to traverse

---

## Network Information Errors

**Symptom:** `network ip` or `speedtest` commands show errors or inaccurate data.

**Fix:**
1. **Local IP**: Uses WebRTC which may fail in some browser contexts — a fallback `192.168.1.100` is used after 2 seconds
2. **Public IP**: Requires external API access to `api.ipify.org` and `ipapi.co` — if blocked, values will show as "Fetching..."
3. **Speed test**: Requires CORS-enabled external endpoints (Cloudflare and httpbin.org) — may fail in network-restricted environments
4. All network fetches are best-effort; failures are caught silently and return zeros or nulls

---

## Mobile Responsiveness Issues

**Symptom:** Sidebar does not close, or canvas is not reachable on mobile.

**Fix:**
1. Press **B** to toggle the sidebar on mobile
2. Use the bottom mobile toolbar for zoom controls
3. Ensure viewport meta tag is present (it is in the root layout)
4. If the sidebar covers the canvas, tap the menu button or press B

---

## Console Terminal Not Responding

**Symptom:** Typing in the console does nothing.

**Fix:**
1. Click inside the terminal input field to ensure it is focused
2. Press **Ctrl+K** (Cmd+K) to refocus the input
3. If the console is minimized, click the maximize button in the console header
4. If the console is closed, click the Terminal button in the top bar

---

## LocalStorage Auth Issues

**Symptom:** "Login" redirects back to home page immediately.

**Fix:**
1. Check browser console for localStorage errors (private browsing may block it)
2. Ensure `packetflow_user` key exists in localStorage:
   ```js
   localStorage.getItem("packetflow_user")
   ```
3. If corrupted, clear it:
   ```js
   localStorage.removeItem("packetflow_user")
   ```
4. The auth flow is simulated — any email/password combination works as long as validation passes

---

## React Flow Canvas Problems

**Symptom:** Nodes appear off-screen or canvas is blank.

**Fix:**
1. The canvas uses `fitView` — zoom/pan controls should appear bottom-right
2. Nodes start at drop positions; you may need to pan the canvas
3. Check that `reactFlowInstance` is set (console may show "No reactFlowInstance!" if drop handler fires before initialization)
4. Background is dark (`#0B0F19`) with dot pattern — if you see a solid color, the Background component may have failed to render

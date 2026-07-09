# Testing Strategy

## Current State

PacketFlow does **not** currently include any automated tests. The `tests/` directory does not exist, and there is no test runner configured in `package.json`.

## Test Commands

No test scripts are defined. The available npm scripts are:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

## Recommended Test Setup

To add testing to the project, install a test runner and write tests for critical code.

```bash
# Install Jest + React Testing Library
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @types/jest ts-jest

# Install Vitest (lighter alternative)
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

Then add test scripts to `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

## What to Test

### Priority Areas

1. **Path-finding algorithm** (`src/utils/findEdgePath.ts` and `src/lib/simulation.ts`)
   - Simple graph with known shortest path
   - Disconnected graph (should return null)
   - Direct connection (path length 2)
   - Cyclic graph (should not infinite loop)

2. **Console command parser** (`src/app/dashboard/page.tsx` — `handleConsoleCommand`)
   - Valid commands produce expected output
   - Invalid commands produce error message
   - Case insensitivity works
   - Commands with arguments (ping, traceroute) parse correctly

3. **Utility functions**
   - `getCableStyle` returns correct styles per cable type
   - `getDeviceLabel` returns expected labels

4. **Sidebar**
   - Devices are listed and grouped by category
   - Search filtering works
   - Tab switching between devices and cables works
   - Drag start sets correct dataTransfer values

5. **NetworkCanvas**
   - Nodes are created on drop
   - Edges are created on connection mode completion
   - Delete key removes selected nodes and associated edges
   - Packet animation initiates and resolves

### Example Test: `findEdgePath`

```ts
import { describe, it, expect } from "vitest";
import { findEdgePath } from "./src/utils/findEdgePath";

describe("findEdgePath", () => {
  it("finds direct path", () => {
    const edges = [{ source: "A", target: "B" }];
    expect(findEdgePath(edges, "A", "B")).toEqual(["A", "B"]);
  });

  it("finds multi-hop path", () => {
    const edges = [
      { source: "A", target: "B" },
      { source: "B", target: "C" },
      { source: "C", target: "D" },
    ];
    expect(findEdgePath(edges, "A", "D")).toEqual(["A", "B", "C", "D"]);
  });

  it("returns null when no path exists", () => {
    const edges = [{ source: "A", target: "B" }];
    expect(findEdgePath(edges, "A", "C")).toBeNull();
  });
});
```

### Example Test: `getCableStyle`

```ts
import { describe, it, expect } from "vitest";

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

describe("getCableStyle", () => {
  it("returns fiber style", () => {
    expect(getCableStyle("fiber")).toEqual({ stroke: "#00A5E0", strokeWidth: 3 });
  });

  it("returns default style for unknown types", () => {
    expect(getCableStyle("usb")).toEqual({ stroke: "#6B7280", strokeWidth: 2 });
  });
});
```

## Linting

Linting is already configured via ESLint with Next.js core-web-vitals and TypeScript rules.

```bash
npm run lint
```

Run this before committing to catch type errors and code style issues.

## Coverage Goals

| Area | Target Coverage |
|------|----------------|
| Simulation utilities | 90%+ |
| Console command parser | 80%+ |
| UI components | 60%+ (smoke tests) |
| Utilities / helpers | 90%+ |

## Writing New Tests

1. Create test files with `.test.ts` or `.test.tsx` suffix adjacent to the source file, or in a `__tests__/` directory
2. Use `vitest` or `jest` depending on your chosen runner
3. Mock external API calls (`fetch` to ipify, ipapi, Cloudflare speed test, httpbin) with `vi.fn()` or `jest.fn()`
4. Keep tests isolated — each test should set up its own state

## Manual Testing Checklist

Since automated tests are not present yet, perform the following manual checks:

- [ ] Landing page loads and renders hero section
- [ ] Login modal opens and closes with Escape
- [ ] Signup form validates (password mismatch, short password)
- [ ] Dashboard loads after login
- [ ] Sidebar shows devices and cables
- [ ] Dragging a device onto canvas creates a node
- [ ] Dragging a cable then clicking two nodes creates an edge
- [ ] "Send Packet" animates a yellow dot across edges
- [ ] Pressing Delete removes selected node and its edges
- [ ] Pressing Escape cancels connection mode
- [ ] Console accepts `help`, `clear`, `network status`
- [ ] Console accepts `ping google.com` and `traceroute google.com`
- [ ] Console accepts `speedtest` (requires internet)
- [ ] Resize handle adjusts console height
- [ ] Mobile sidebar toggle works at narrow widths

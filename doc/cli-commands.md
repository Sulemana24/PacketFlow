# CLI Commands

PacketFlow includes a built-in terminal console in the dashboard that accepts network diagnostic commands. All commands are supported directly from the browser; no special mode or authentication is required beyond being logged in.

## Accessing the Console

- Click the **Terminal** button in the top-right of the dashboard
- Or press **Ctrl+K** (Cmd+K on Mac) to focus the console input
- Or press **Ctrl+Shift+C** to toggle the console open/closed

## Command Reference

### `help`

Shows all available commands with brief descriptions.

**Syntax:** `help`

**Output:**
```
Available commands:
  help - Show this help message
  clear - Clear console
  network status - Show network statistics
  network ip - Show IP information
  speedtest - Test internet speed
  ping [host] - Ping a host
  traceroute [host] - Trace route to host
  devices - List all devices
  stats - Show simulation statistics
  status - Show simulation status
  dns - Show DNS servers
```

---

### `clear`

Clears all messages from the console history.

**Syntax:** `clear`

**Output:** Console is emptied.

---

### `network status` (alias: `netstat`)

Displays current network connection status and bandwidth metrics.

**Syntax:** `network status`

**Output:**
```
=== NETWORK STATUS ===
Internet: Connected [green checkmark]
Connection Type: 4g
Signal Strength: 85%
Bandwidth: 1.5 Mbps
Download Speed: 24.50 Mbps
Upload Speed: 5.20 Mbps
Ping Latency: 24 ms
Packet Loss: 0%
RTT: 24 ms
```

---

### `network ip` (alias: `ipconfig`)

Shows local and public IP configuration information.

**Syntax:** `network ip`

**Output:**
```
=== IP CONFIGURATION ===
Local IP: 192.168.1.100
Public IP: 203.0.113.42
IPv6: Not available
MAC Address: AA:BB:CC:DD:EE:FF
ISP: Example ISP
Location: San Francisco, United States
```

Note: Local IP is detected via WebRTC; MAC address is randomly generated (browsers do not expose real MAC addresses).

---

### `speedtest`

Tests internet download and upload speed, plus ping latency.

**Syntax:** `speedtest`

**Output:**
```
Measuring internet speed... This may take a few seconds.
Speed test complete: [download icon] Download: 24.50 Mbps | [upload icon] Upload: 5.20 Mbps | [ping icon] Ping: 24ms
```

Note: This makes real network requests to Cloudflare's speed test endpoint and httpbin.org.

---

### `ping [host]`

Simulates a ping request to the specified host.

**Syntax:** `ping <hostname-or-ip>`

**Examples:**
```
ping google.com
ping 8.8.8.8
```

**Output:**
```
PING google.com: 64 bytes, time=23ms TTL=64
Packet loss: 0% | Round trip: 23ms
```

Note: Response times are randomized between 10-50ms. This is simulated, not a real ICMP ping.

---

### `traceroute [host]`

Simulates a traceroute to the specified host.

**Syntax:** `traceroute <hostname-or-ip>`

**Examples:**
```
traceroute google.com
traceroute 8.8.8.8
```

**Output:**
```
Tracing route to google.com:
  1  192.168.1.1  2ms
  2  10.0.0.1  15ms
  3  172.16.0.1  24ms
  4  google.com  42ms

Trace complete.
```

Note: This is simulated. The output uses generic hop addresses.

---

### `devices`

Lists the devices currently in the topology.

**Syntax:** `devices`

**Output:**
```
Connected devices:
  Router-1 (192.168.1.1)
  Switch-1 (192.168.1.2)
  PC-1 (192.168.1.10)
  Server-1 (192.168.1.100)
```

Note: Currently returns hardcoded sample output. Does not reflect actual canvas state.

---

### `stats`

Shows network simulation statistics.

**Syntax:** `stats`

**Output:**
```
Network Statistics:
  Packets sent: 1,247
  Packets received: 1,235
  Packet loss: 0.96%
  Average latency: 24ms
```

Note: Currently returns hardcoded static values.

---

### `status`

Shows simulation engine status.

**Syntax:** `status`

**Output:**
```
Simulation Status: RUNNING
  Uptime: 2h 34m
  Active devices: 4
  Active connections: 6
```

Note: Currently returns hardcoded static values.

---

### `dns`

Shows DNS server configuration.

**Syntax:** `dns`

**Output:**
```
=== DNS SERVERS ===
 8.8.8.8 (Google)
 8.8.4.4 (Google)
 1.1.1.1 (Cloudflare)
```

Note: Returns a static list; does not reflect actual system DNS settings.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` / `Cmd+K` | Focus console input |
| `Ctrl+Shift+C` | Toggle console open/closed |
| `Enter` | Submit command |
| `Escape` | Close auth modal |

## Implementation Notes

All console command logic is located in `src/app/dashboard/page.tsx` inside the `handleConsoleCommand` function (approx. lines 579-716). Commands are handled via a `switch` statement on the lowercased, trimmed input.

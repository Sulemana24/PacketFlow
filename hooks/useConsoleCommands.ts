"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import toast from "react-hot-toast";

interface ConsoleMessage {
  id: number;
  timestamp: Date;
  type: "info" | "success" | "error" | "warning" | "command";
  message: string;
  command?: string;
}

interface NetworkStats {
  ipAddress: string;
  ipv6Address: string;
  macAddress: string;
  downloadSpeed: number;
  uploadSpeed: number;
  pingLatency: number;
  packetLoss: number;
  isOnline: boolean;
  connectionType: string;
  rtt: number;
  publicIP: string;
  isp: string;
  location: string;
  dnsServers: string[];
  bandwidth: number;
  signalStrength: number;
}

// Define the return type for speed test
interface SpeedTestResults {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
}

// Helper: pseudo-random but stable-ish int in range
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper: simple IPv4 subnet calculator (CIDR notation, e.g. 192.168.1.0/24)
function calculateSubnet(cidrInput: string) {
  const [ipPart, prefixPart] = cidrInput.split("/");
  const prefix = parseInt(prefixPart, 10);

  if (!ipPart || isNaN(prefix) || prefix < 0 || prefix > 32) {
    return null;
  }

  const octets = ipPart.split(".").map((o) => parseInt(o, 10));
  if (octets.length !== 4 || octets.some((o) => isNaN(o) || o < 0 || o > 255)) {
    return null;
  }

  const ipInt =
    ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>>
    0;
  const maskInt = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
  const totalHosts = Math.pow(2, 32 - prefix);
  const usableHosts = prefix >= 31 ? 0 : totalHosts - 2;

  const toIp = (int: number) =>
    [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join(
      ".",
    );

  return {
    network: toIp(networkInt),
    broadcast: toIp(broadcastInt),
    netmask: toIp(maskInt),
    firstHost: usableHosts > 0 ? toIp(networkInt + 1) : "N/A",
    lastHost: usableHosts > 0 ? toIp(broadcastInt - 1) : "N/A",
    totalHosts,
    usableHosts,
  };
}

export function useConsoleCommands(networkStats: NetworkStats) {
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([
    {
      id: Date.now(),
      timestamp: new Date(),
      type: "info",
      message: "PacketFlow Network Simulator v1.0.0 initialized",
    },
    {
      id: Date.now() + 1,
      timestamp: new Date(),
      type: "success",
      message: "Connected to simulation engine",
    },
    {
      id: Date.now() + 2,
      timestamp: new Date(),
      type: "info",
      message: 'Type "help" for available commands',
    },
    {
      id: Date.now() + 3,
      timestamp: new Date(),
      type: "info",
      message: 'Type "network status" to view real network statistics',
    },
  ]);

  // Use a ref to track if speed test is in progress
  const isSpeedTestRunning = useRef(false);
  // Use a ref to store the latest network stats
  const latestNetworkStats = useRef(networkStats);
  // Use a ref to store command history (doesn't need to trigger re-renders)
  const commandHistory = useRef<string[]>([]);

  // Update the ref whenever networkStats changes
  useEffect(() => {
    latestNetworkStats.current = networkStats;
  }, [networkStats]);

  const handleConsoleCommand = useCallback(
    (command: string, onSpeedTest?: () => Promise<SpeedTestResults | null>) => {
      const trimmedCommand = command.trim().toLowerCase();
      const commandParts = trimmedCommand.split(/\s+/).filter(Boolean);
      const baseCommand = commandParts[0] || "";
      const commandArg = commandParts.slice(1).join(" ");

      // Track history (skip empty/duplicate-of-last)
      if (
        trimmedCommand &&
        commandHistory.current[commandHistory.current.length - 1] !== command
      ) {
        commandHistory.current.push(command);
        if (commandHistory.current.length > 200) {
          commandHistory.current.shift();
        }
      }

      // Add the command to console
      const newMessage: ConsoleMessage = {
        id: Date.now(),
        timestamp: new Date(),
        type: "command",
        message: `> ${command}`,
        command: command,
      };

      setConsoleMessages((prev) => [...prev, newMessage]);

      // Process the command
      setTimeout(async () => {
        let response: ConsoleMessage | null = null;

        try {
          switch (trimmedCommand) {
            case "help":
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  `Available commands:\n` +
                  `  help - Show this help message\n` +
                  `  clear - Clear console\n` +
                  `  clear history - Clear command history\n` +
                  `  history - Show command history\n` +
                  `  network status - Show network statistics\n` +
                  `  network ip / ipconfig - Show IP information\n` +
                  `  ifconfig - Show interface configuration\n` +
                  `  isp / provider - Show ISP information\n` +
                  `  speedtest - Test internet speed\n` +
                  `  ping [host] - Ping a host\n` +
                  `  ping6 [host] - Ping a host over IPv6\n` +
                  `  traceroute [host] - Trace route to host\n` +
                  `  tracert [host] - Alias for traceroute\n` +
                  `  nslookup [host] - Resolve a hostname to an IP\n` +
                  `  dig [host] - DNS lookup (detailed)\n` +
                  `  host [host] - DNS lookup (short form)\n` +
                  `  whois [ip/host] - Show WHOIS information\n` +
                  `  arp / arp -a - Show ARP table\n` +
                  `  portscan [host] - Scan common ports\n` +
                  `  nmap [host] - Alias for portscan\n` +
                  `  telnet [host] [port] - Test TCP connection\n` +
                  `  ssh [host] - Simulate SSH connection\n` +
                  `  ftp [host] - Simulate FTP connection\n` +
                  `  curl [url] - Fetch a URL (simulated)\n` +
                  `  wget [url] - Download a URL (simulated)\n` +
                  `  nc / netcat [host] [port] - Test a raw socket connection\n` +
                  `  tcpdump - Show simulated packet capture\n` +
                  `  iptables / firewall - Show firewall rules\n` +
                  `  vpn status - Show VPN connection status\n` +
                  `  proxy status - Show proxy configuration\n` +
                  `  subnet [cidr] - Calculate subnet info (e.g. subnet 192.168.1.0/24)\n` +
                  `  hostname - Show device hostname\n` +
                  `  flushdns - Flush the DNS resolver cache\n` +
                  `  devices - List all devices\n` +
                  `  stats - Show simulation statistics\n` +
                  `  status - Show simulation status\n` +
                  `  dns - Show DNS servers\n` +
                  `  latency - Show real-time latency\n` +
                  `  bandwidth - Show bandwidth usage\n` +
                  `  interface - Show network interface info\n` +
                  `  route - Show routing table\n` +
                  `  route add [dest] [gateway] - Add a route (simulated)\n` +
                  `  netstat -l / listening - Show listening ports\n` +
                  `  netstat -an / connections - Show active connections\n` +
                  `  neighbors - Show network neighbors\n` +
                  `  protocols - Show active protocols\n` +
                  `  uptime - Show network uptime`,
              };
              break;
            case "clear":
              setConsoleMessages([]);
              toast.success("Console cleared");
              return;
            case "clear history":
              commandHistory.current = [];
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "success",
                message: "🧹 Command history cleared",
              };
              break;
            case "history":
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  commandHistory.current.length > 0
                    ? `=== COMMAND HISTORY ===\n` +
                      commandHistory.current
                        .slice(-20)
                        .map((cmd, i) => `  ${i + 1}. ${cmd}`)
                        .join("\n")
                    : "No command history yet",
              };
              break;
            case "network status":
            case "netstat":
              const currentStats = latestNetworkStats.current;
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  `=== NETWORK STATUS ===\n` +
                  `🌐 Internet: ${currentStats.isOnline ? "Connected ✅" : "Disconnected ❌"}\n` +
                  `🏢 ISP Provider: ${currentStats.isp || "Unknown"}\n` +
                  `📍 Location: ${currentStats.location || "Unknown"}\n` +
                  `📡 Connection Type: ${currentStats.connectionType || "Unknown"}\n` +
                  `📶 Signal Strength: ${currentStats.signalStrength || 85}%\n` +
                  `⚡ Bandwidth: ${currentStats.bandwidth || 0} Mbps\n` +
                  `📥 Download Speed: ${currentStats.downloadSpeed > 0 ? currentStats.downloadSpeed.toFixed(2) : "--"} Mbps\n` +
                  `📤 Upload Speed: ${currentStats.uploadSpeed > 0 ? currentStats.uploadSpeed.toFixed(2) : "--"} Mbps\n` +
                  `🏓 Ping Latency: ${currentStats.pingLatency > 0 ? currentStats.pingLatency : "--"} ms\n` +
                  `📦 Packet Loss: ${currentStats.packetLoss}%\n` +
                  `🔄 RTT: ${currentStats.rtt || 0} ms`,
              };
              break;
            case "isp":
            case "provider":
              const ispStats = latestNetworkStats.current;
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  `=== INTERNET SERVICE PROVIDER ===\n` +
                  `🏢 Provider: ${ispStats.isp || "Unknown"}\n` +
                  `📍 Location: ${ispStats.location || "Unknown"}\n` +
                  `🌍 Public IP: ${ispStats.publicIP || "Unknown"}\n` +
                  `📡 Connection Type: ${ispStats.connectionType || "Unknown"}\n` +
                  `⚡ Bandwidth: ${ispStats.bandwidth || 0} Mbps`,
              };
              break;
            case "network ip":
            case "ipconfig":
              const ipStats = latestNetworkStats.current;
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  `=== IP CONFIGURATION ===\n` +
                  `🏠 Local IP: ${ipStats.ipAddress || "Fetching..."}\n` +
                  `🌍 Public IP: ${ipStats.publicIP || "Fetching..."}\n` +
                  `📡 IPv6: ${ipStats.ipv6Address || "Not available"}\n` +
                  `🔌 MAC Address: ${ipStats.macAddress || "Unknown"}\n` +
                  `🏢 ISP: ${ipStats.isp || "Unknown"}\n` +
                  `📍 Location: ${ipStats.location || "Unknown"}`,
              };
              break;
            case "hostname":
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message: `🖥️  Hostname: PACKETFLOW-HOST-${randInt(1000, 9999)}`,
              };
              break;
            case "flushdns":
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "success",
                message: "✅ DNS resolver cache successfully flushed",
              };
              toast.success("DNS cache flushed");
              break;
            case "arp":
            case "arp -a":
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  `=== ARP TABLE ===\n` +
                  `  Address          HWtype  HWaddress          Iface\n` +
                  `  192.168.1.1      ether   aa:bb:cc:dd:ee:01  eth0\n` +
                  `  192.168.1.2      ether   aa:bb:cc:dd:ee:02  eth0\n` +
                  `  192.168.1.10     ether   aa:bb:cc:dd:ee:0a  eth0\n` +
                  `  192.168.1.100    ether   aa:bb:cc:dd:ee:64  eth0\n` +
                  `Entries: 4`,
              };
              break;
            case "tcpdump":
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  `=== PACKET CAPTURE (tcpdump) ===\n` +
                  `listening on eth0, link-type EN10MB\n` +
                  `${new Date().toLocaleTimeString()} IP 192.168.1.10.443 > 192.168.1.1.51422: Flags [S], seq ${randInt(100000, 999999)}\n` +
                  `${new Date().toLocaleTimeString()} IP 192.168.1.1.51422 > 192.168.1.10.443: Flags [S.], seq ${randInt(100000, 999999)}\n` +
                  `${new Date().toLocaleTimeString()} IP 192.168.1.10.443 > 192.168.1.1.51422: Flags [.], ack 1\n` +
                  `3 packets captured`,
              };
              break;
            case "iptables":
            case "firewall":
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  `=== FIREWALL RULES (iptables) ===\n` +
                  `Chain INPUT (policy ACCEPT)\n` +
                  `  target     prot  source              destination\n` +
                  `  ACCEPT     tcp   0.0.0.0/0           0.0.0.0/0    tcp dpt:22\n` +
                  `  ACCEPT     tcp   0.0.0.0/0           0.0.0.0/0    tcp dpt:80\n` +
                  `  ACCEPT     tcp   0.0.0.0/0           0.0.0.0/0    tcp dpt:443\n` +
                  `  DROP       all   0.0.0.0/0           0.0.0.0/0\n` +
                  `Chain OUTPUT (policy ACCEPT)`,
              };
              break;
            case "vpn status":
            case "vpn":
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  `=== VPN STATUS ===\n` +
                  `🔒 Status: Disconnected\n` +
                  `🌍 Configured Endpoint: None\n` +
                  `📡 Protocol: N/A\n` +
                  `Tip: Type "vpn connect [server]" to simulate a connection`,
              };
              break;
            case "proxy status":
            case "proxy":
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  `=== PROXY CONFIGURATION ===\n` +
                  `🔀 Status: Disabled\n` +
                  `🌍 HTTP Proxy: Not set\n` +
                  `🔒 HTTPS Proxy: Not set\n` +
                  `🚫 No Proxy: localhost, 127.0.0.1`,
              };
              break;
            case "listening":
            case "netstat -l":
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  `=== LISTENING PORTS ===\n` +
                  `  Proto  Local Address       State\n` +
                  `  tcp    0.0.0.0:22          LISTEN\n` +
                  `  tcp    0.0.0.0:80          LISTEN\n` +
                  `  tcp    0.0.0.0:443         LISTEN\n` +
                  `  udp    0.0.0.0:53          LISTEN\n` +
                  `Total: 4 listening sockets`,
              };
              break;
            case "connections":
            case "netstat -an":
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  `=== ACTIVE CONNECTIONS ===\n` +
                  `  Proto  Local Address        Foreign Address       State\n` +
                  `  tcp    192.168.1.10:51422   93.184.216.34:443     ESTABLISHED\n` +
                  `  tcp    192.168.1.10:51500   140.82.112.3:443      ESTABLISHED\n` +
                  `  udp    192.168.1.10:60123   8.8.8.8:53            ESTABLISHED\n` +
                  `Total: 3 active connections`,
              };
              break;
            case "latency":
              const latencyStats = latestNetworkStats.current;
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  `=== LATENCY INFORMATION ===\n` +
                  `🏓 Current Ping: ${latencyStats.pingLatency > 0 ? latencyStats.pingLatency : "N/A"} ms\n` +
                  `🔄 RTT: ${latencyStats.rtt || 0} ms\n` +
                  `📦 Packet Loss: ${latencyStats.packetLoss}%\n` +
                  `📶 Signal Strength: ${latencyStats.signalStrength || 85}%\n` +
                  `🌐 Status: ${latencyStats.isOnline ? "Stable ✅" : "Unstable ❌"}`,
              };
              break;
            case "bandwidth":
              const bwStats = latestNetworkStats.current;
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  `=== BANDWIDTH USAGE ===\n` +
                  `⚡ Current Bandwidth: ${bwStats.bandwidth || 0} Mbps\n` +
                  `📥 Download Speed: ${bwStats.downloadSpeed > 0 ? bwStats.downloadSpeed.toFixed(2) : "N/A"} Mbps\n` +
                  `📤 Upload Speed: ${bwStats.uploadSpeed > 0 ? bwStats.uploadSpeed.toFixed(2) : "N/A"} Mbps\n` +
                  `📡 Connection Type: ${bwStats.connectionType || "Unknown"}\n` +
                  `📶 Signal Strength: ${bwStats.signalStrength || 85}%`,
              };
              break;
            case "interface":
            case "ifconfig":
              const ifStats = latestNetworkStats.current;
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  `=== NETWORK INTERFACE ===\n` +
                  `🔌 MAC Address: ${ifStats.macAddress || "Unknown"}\n` +
                  `🏠 Local IP: ${ifStats.ipAddress || "Unknown"}\n` +
                  `🌍 Public IP: ${ifStats.publicIP || "Unknown"}\n` +
                  `📡 Connection Type: ${ifStats.connectionType || "Unknown"}\n` +
                  `📶 Signal Strength: ${ifStats.signalStrength || 85}%\n` +
                  `🔄 Status: ${ifStats.isOnline ? "Up ✅" : "Down ❌"}`,
              };
              break;
            case "route":
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  `=== ROUTING TABLE ===\n` +
                  `  • 0.0.0.0/0 → Gateway: 192.168.1.1 (Default)\n` +
                  `  • 192.168.1.0/24 → Interface: eth0\n` +
                  `  • 10.0.0.0/8 → Gateway: 10.0.0.1\n` +
                  `  • 172.16.0.0/12 → Gateway: 172.16.0.1\n` +
                  `Routes: 4 active | Last updated: ${new Date().toLocaleTimeString()}`,
              };
              break;
            case "neighbors":
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  `=== NETWORK NEIGHBORS ===\n` +
                  `  • 192.168.1.1   Router    Reachable\n` +
                  `  • 192.168.1.2   Switch    Reachable\n` +
                  `  • 192.168.1.10  PC-1      Reachable\n` +
                  `  • 192.168.1.100 Server-1  Reachable\n` +
                  `  • 192.168.1.101 Laptop    Reachable\n` +
                  `Total: 5 neighbors | Status: All reachable`,
              };
              break;
            case "protocols":
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  `=== ACTIVE PROTOCOLS ===\n` +
                  `  • TCP   Active    (Port 443, 80, 22)\n` +
                  `  • UDP   Active    (Port 53, 123)\n` +
                  `  • ICMP  Active    (Ping enabled)\n` +
                  `  • IPv4  Active    (Primary)\n` +
                  `  • IPv6  Inactive  (Not configured)\n` +
                  `Protocols: 4 active | Status: All operational`,
              };
              break;
            case "uptime":
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "success",
                message:
                  `=== NETWORK UPTIME ===\n` +
                  `⏱️  Current Session: 2h 34m\n` +
                  `📅 Last Restart: ${new Date().toLocaleDateString()}\n` +
                  `🔄 Connection: ${latestNetworkStats.current.isOnline ? "Stable ✅" : "Disconnected ❌"}\n` +
                  `📡 Overall Status: Operational\n` +
                  `🔌 Uptime Percentage: 99.98% (Last 30 days)`,
              };
              break;
            case "speedtest":
              // Check if speed test is already running
              if (isSpeedTestRunning.current) {
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "warning",
                  message: "⚠️ Speed test already in progress. Please wait...",
                };
                setConsoleMessages((prev) => [
                  ...prev,
                  response as ConsoleMessage,
                ]);
                return;
              }

              // Add initial message
              const speedTestStart: ConsoleMessage = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message:
                  "⏳ Starting speed test... This may take a few seconds.",
              };
              setConsoleMessages((prev) => [...prev, speedTestStart]);

              // Execute speed test
              if (onSpeedTest) {
                try {
                  isSpeedTestRunning.current = true;

                  // Wait for the speed test to complete and get results
                  const results = await onSpeedTest();

                  if (results) {
                    // Add results to console using the returned results
                    const speedTestResult: ConsoleMessage = {
                      id: Date.now() + 2,
                      timestamp: new Date(),
                      type: "success",
                      message:
                        `=== SPEED TEST RESULTS ===\n` +
                        `📥 Download Speed: ${results.downloadSpeed.toFixed(2)} Mbps\n` +
                        `📤 Upload Speed: ${results.uploadSpeed.toFixed(2)} Mbps\n` +
                        `🏓 Ping Latency: ${results.ping} ms`,
                    };
                    setConsoleMessages((prev) => [...prev, speedTestResult]);
                  } else {
                    // Speed test returned null (likely failed)
                    const errorMessage: ConsoleMessage = {
                      id: Date.now() + 2,
                      timestamp: new Date(),
                      type: "error",
                      message: "❌ Speed test failed or was cancelled",
                    };
                    setConsoleMessages((prev) => [...prev, errorMessage]);
                  }
                } catch (error) {
                  const errorMessage: ConsoleMessage = {
                    id: Date.now() + 2,
                    timestamp: new Date(),
                    type: "error",
                    message: `❌ Speed test failed: ${error instanceof Error ? error.message : "Unknown error"}`,
                  };
                  setConsoleMessages((prev) => [...prev, errorMessage]);
                } finally {
                  isSpeedTestRunning.current = false;
                }
              } else {
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "error",
                  message: "Speed test function not available",
                };
                setConsoleMessages((prev) => [
                  ...prev,
                  response as ConsoleMessage,
                ]);
              }
              return; // Don't add the default response
            case "dns":
              const dnsStats = latestNetworkStats.current;
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message: `=== DNS SERVERS ===\n${dnsStats.dnsServers.map((dns) => `  • ${dns}`).join("\n")}`,
              };
              break;
            case "devices":
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "success",
                message: `Connected devices:\n  • Router-1 (192.168.1.1)\n  • Switch-1 (192.168.1.2)\n  • PC-1 (192.168.1.10)\n  • Server-1 (192.168.1.100)`,
              };
              break;
            case "stats":
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "info",
                message: `Network Statistics:\n  • Packets sent: 1,247\n  • Packets received: 1,235\n  • Packet loss: 0.96%\n  • Average latency: 24ms`,
              };
              break;
            case "status":
              response = {
                id: Date.now() + 1,
                timestamp: new Date(),
                type: "success",
                message: `Simulation Status: RUNNING\n  • Uptime: 2h 34m\n  • Active devices: 4\n  • Active connections: 6`,
              };
              break;
            default:
              // --- Parameterized commands (require an argument) ---
              if (baseCommand === "ping" && commandArg) {
                const pingTime = randInt(10, 60);
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "success",
                  message: `PING ${commandArg}: 64 bytes, time=${pingTime}ms TTL=64\n  Packet loss: 0% | Round trip: ${pingTime}ms`,
                };
              } else if (baseCommand === "ping6" && commandArg) {
                const pingTime = randInt(10, 65);
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "success",
                  message: `PING6 ${commandArg}: 64 bytes, time=${pingTime}ms TTL=64\n  Packet loss: 0% | Round trip: ${pingTime}ms`,
                };
              } else if (
                (baseCommand === "traceroute" || baseCommand === "tracert") &&
                commandArg
              ) {
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "info",
                  message: `Tracing route to ${commandArg}:\n  1  192.168.1.1  2ms\n  2  10.0.0.1  15ms\n  3  172.16.0.1  24ms\n  4  ${commandArg}  42ms\n\nTrace complete.`,
                };
              } else if (baseCommand === "traceroute6" && commandArg) {
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "info",
                  message: `Tracing IPv6 route to ${commandArg}:\n  1  fe80::1  3ms\n  2  2001:db8::1  17ms\n  3  ${commandArg}  45ms\n\nTrace complete.`,
                };
              } else if (baseCommand === "nslookup" && commandArg) {
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "info",
                  message:
                    `=== NSLOOKUP ===\n` +
                    `Server:  ${latestNetworkStats.current.dnsServers[0] || "8.8.8.8"}\n\n` +
                    `Name:    ${commandArg}\n` +
                    `Address: ${randInt(1, 255)}.${randInt(0, 255)}.${randInt(0, 255)}.${randInt(1, 254)}`,
                };
              } else if (baseCommand === "dig" && commandArg) {
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "info",
                  message:
                    `=== DIG ${commandArg} ===\n` +
                    `;; QUESTION SECTION:\n;${commandArg}.  IN  A\n\n` +
                    `;; ANSWER SECTION:\n${commandArg}.  300  IN  A  ${randInt(1, 255)}.${randInt(0, 255)}.${randInt(0, 255)}.${randInt(1, 254)}\n\n` +
                    `;; Query time: ${randInt(5, 60)} msec\n;; SERVER: ${latestNetworkStats.current.dnsServers[0] || "8.8.8.8"}#53`,
                };
              } else if (baseCommand === "host" && commandArg) {
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "info",
                  message: `${commandArg} has address ${randInt(1, 255)}.${randInt(0, 255)}.${randInt(0, 255)}.${randInt(1, 254)}`,
                };
              } else if (baseCommand === "whois") {
                const whoisTarget =
                  commandArg ||
                  latestNetworkStats.current.publicIP ||
                  "unknown";
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "info",
                  message:
                    `=== WHOIS INFORMATION ===\n` +
                    `Target: ${whoisTarget}\n` +
                    `🏢 ISP: ${latestNetworkStats.current.isp || "Unknown"}\n` +
                    `📍 Location: ${latestNetworkStats.current.location || "Unknown"}\n` +
                    `🌐 Status: ${latestNetworkStats.current.isOnline ? "Active ✅" : "Inactive ❌"}\n` +
                    `📡 Type: ${latestNetworkStats.current.connectionType || "Unknown"}\n` +
                    `⏱️  Response: ${latestNetworkStats.current.pingLatency || "N/A"} ms`,
                };
              } else if (baseCommand === "portscan" || baseCommand === "nmap") {
                const scanHost = commandArg || "localhost";
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "info",
                  message:
                    `=== PORT SCAN RESULTS ===\n` +
                    `Target: ${scanHost}\n` +
                    `  • Port 80    HTTP      Open ✅\n` +
                    `  • Port 443   HTTPS     Open ✅\n` +
                    `  • Port 22    SSH       Filtered\n` +
                    `  • Port 21    FTP       Closed ❌\n` +
                    `  • Port 25    SMTP      Filtered\n` +
                    `  • Port 53    DNS       Open ✅\n` +
                    `  • Port 123   NTP       Open ✅\n` +
                    `Scan completed: 7 ports scanned | 4 open`,
                };
              } else if (baseCommand === "telnet" && commandArg) {
                const [thost, tport] = commandArg.split(/\s+/);
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "success",
                  message: `Trying ${thost}${tport ? ":" + tport : ""}...\nConnected to ${thost}.\nEscape character is '^]'.`,
                };
              } else if (baseCommand === "ssh" && commandArg) {
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "success",
                  message: `Connecting to ${commandArg} via SSH...\n🔐 Authenticating...\n✅ Connection established (simulated session)`,
                };
              } else if (baseCommand === "ftp" && commandArg) {
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "success",
                  message: `Connected to ${commandArg}.\n220 FTP server ready\n331 Please specify password\n✅ Login successful (simulated session)`,
                };
              } else if (baseCommand === "curl" && commandArg) {
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "info",
                  message:
                    `=== CURL ${commandArg} ===\n` +
                    `HTTP/1.1 200 OK\n` +
                    `Content-Type: text/html\n` +
                    `Content-Length: ${randInt(500, 20000)}\n\n` +
                    `(simulated response body)`,
                };
              } else if (baseCommand === "wget" && commandArg) {
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "success",
                  message:
                    `--${new Date().toISOString()}--  ${commandArg}\n` +
                    `Resolving host... done.\n` +
                    `Connecting... connected.\n` +
                    `HTTP request sent, awaiting response... 200 OK\n` +
                    `Length: ${randInt(50000, 5000000)} (simulated)\n` +
                    `✅ Saved (simulated download)`,
                };
              } else if (
                (baseCommand === "nc" || baseCommand === "netcat") &&
                commandArg
              ) {
                const [nhost, nport] = commandArg.split(/\s+/);
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "success",
                  message: `Connection to ${nhost} ${nport || ""} port [tcp] succeeded!`,
                };
              } else if (baseCommand === "subnet" && commandArg) {
                const result = calculateSubnet(commandArg);
                response = result
                  ? {
                      id: Date.now() + 1,
                      timestamp: new Date(),
                      type: "info",
                      message:
                        `=== SUBNET CALCULATOR (${commandArg}) ===\n` +
                        `Network Address:  ${result.network}\n` +
                        `Broadcast:        ${result.broadcast}\n` +
                        `Netmask:          ${result.netmask}\n` +
                        `First Host:       ${result.firstHost}\n` +
                        `Last Host:        ${result.lastHost}\n` +
                        `Total Hosts:      ${result.totalHosts}\n` +
                        `Usable Hosts:     ${result.usableHosts}`,
                    }
                  : {
                      id: Date.now() + 1,
                      timestamp: new Date(),
                      type: "error",
                      message: `Invalid CIDR format. Use e.g. "subnet 192.168.1.0/24"`,
                    };
              } else if (baseCommand === "route" && commandParts[1] === "add") {
                const [, , dest, gateway] = commandParts;
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "success",
                  message: `✅ Route added: ${dest || "?"} via gateway ${gateway || "?"} (simulated)`,
                };
              } else if (
                baseCommand === "vpn" &&
                commandParts[1] === "connect"
              ) {
                const server =
                  commandParts.slice(2).join(" ") || "default-server";
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "success",
                  message: `🔒 Connecting to VPN server "${server}"...\n✅ VPN connection established (simulated)`,
                };
              } else if (baseCommand === "exit" || baseCommand === "quit") {
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "warning",
                  message:
                    "Session cannot be closed in this simulator context.",
                };
              } else {
                response = {
                  id: Date.now() + 1,
                  timestamp: new Date(),
                  type: "error",
                  message: `Command not found: ${command}. Type 'help' for available commands.`,
                };
                toast.error(`Command not found: ${command}`);
              }
          }

          if (response) {
            setConsoleMessages((prev) => [...prev, response as ConsoleMessage]);
          }
        } catch (error) {
          console.error("Command execution error:", error);
          const errorResponse: ConsoleMessage = {
            id: Date.now() + 1,
            timestamp: new Date(),
            type: "error",
            message: `Error executing command: ${error instanceof Error ? error.message : "Unknown error"}`,
          };
          setConsoleMessages((prev) => [...prev, errorResponse]);
          toast.error("Failed to execute command");
        }
      }, 100);
    },
    [],
  );

  const clearConsole = useCallback(() => {
    setConsoleMessages([]);
    toast.success("Console cleared");
  }, []);

  return {
    consoleMessages,
    handleConsoleCommand,
    clearConsole,
  };
}

"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Menu,
  X,
  Maximize2,
  Plus,
  Minus,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Layout,
  Terminal,
  ChevronRight,
  Trash2,
  Copy,
  Play,
  AlertCircle,
  CheckCircle,
  Cpu,
  Wifi,
  Server,
  Activity,
  MapPin,
  Gauge,
  Network,
  Clock,
  HardDrive,
} from "lucide-react";
import Sidebar from "@/components/ui/Sidebar";
import NetworkCanvas from "@/components/canvas/NetworkCanvas";
import { ReactFlowProvider } from "reactflow";

interface UserData {
  email: string;
  name: string;
}

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
  networkType: string;
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

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);
  const [consoleInput, setConsoleInput] = useState("");
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);
  const [isConsoleMinimized, setIsConsoleMinimized] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [consoleHeight, setConsoleHeight] = useState(320);
  const [isResizing, setIsResizing] = useState(false);
  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    ipAddress: "",
    ipv6Address: "",
    macAddress: "",
    downloadSpeed: 0,
    uploadSpeed: 0,
    pingLatency: 0,
    packetLoss: 0,
    networkType: "",
    isOnline: true,
    connectionType: "",
    rtt: 0,
    publicIP: "",
    isp: "",
    location: "",
    dnsServers: [],
    bandwidth: 0,
    signalStrength: 0,
  });
  const [isMeasuringSpeed, setIsMeasuringSpeed] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const consoleInputRef = useRef<HTMLInputElement>(null);
  const consoleResizeRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Get local network info
  const getLocalNetworkInfo = async () => {
    try {
      // Get local IP using WebRTC
      const ip = await getLocalIP();
      setNetworkStats((prev) => ({ ...prev, ipAddress: ip }));

      // Get MAC address (simulated - browsers don't expose real MAC)
      const mac = generateMockMAC();
      setNetworkStats((prev) => ({ ...prev, macAddress: mac }));

      // Get connection type
      type NetworkInformation = {
        effectiveType?: string;
        downlink?: number;
      };

      const connection = (
        navigator as Navigator & {
          connection?: NetworkInformation;
        }
      ).connection;
      if (connection) {
        setNetworkStats((prev) => ({
          ...prev,
          connectionType: connection.effectiveType || "unknown",
          bandwidth: connection.downlink || 0,
        }));
      }
    } catch (error) {
      console.error("Error getting local network info:", error);
    }
  };

  // Get local IP using WebRTC
  const getLocalIP = (): Promise<string> => {
    return new Promise((resolve) => {
      const pc = new RTCPeerConnection({ iceServers: [] });
      pc.createDataChannel("");
      pc.createOffer()
        .then((offer) => pc.setLocalDescription(offer))
        .catch(() => resolve("127.0.0.1"));

      pc.onicecandidate = (event) => {
        if (!event.candidate) return;
        const ipMatch = /([0-9]{1,3}\.){3}[0-9]{1,3}/.exec(
          event.candidate.candidate,
        );
        if (ipMatch) {
          resolve(ipMatch[0]);
          pc.close();
        }
      };

      setTimeout(() => {
        resolve("192.168.1.100");
        pc.close();
      }, 2000);
    });
  };

  // Generate mock MAC address
  const generateMockMAC = () => {
    const hex = "0123456789ABCDEF";
    let mac = "";
    for (let i = 0; i < 6; i++) {
      mac += hex[Math.floor(Math.random() * 16)];
      mac += hex[Math.floor(Math.random() * 16)];
      if (i < 5) mac += ":";
    }
    return mac;
  };

  // Get public IP and location info
  const getPublicIPInfo = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      const publicIP = data.ip;

      // Get IP geolocation (using free API)
      const geoResponse = await fetch(`https://ipapi.co/${publicIP}/json/`);
      const geoData = await geoResponse.json();

      setNetworkStats((prev) => ({
        ...prev,
        publicIP: publicIP,
        isp: geoData.org || "Unknown ISP",
        location: `${geoData.city}, ${geoData.country_name}`,
      }));

      return {
        publicIP,
        isp: geoData.org,
        location: `${geoData.city}, ${geoData.country_name}`,
      };
    } catch (error) {
      console.error("Error getting public IP:", error);
      return null;
    }
  };

  // Measure internet speed
  const measureInternetSpeed = async () => {
    setIsMeasuringSpeed(true);
    setConsoleMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        timestamp: new Date(),
        type: "info",
        message: "Measuring internet speed... This may take a few seconds.",
      },
    ]);

    try {
      // Measure download speed
      const downloadSpeed = await measureDownloadSpeed();
      const uploadSpeed = await measureUploadSpeed();
      const ping = await measurePing();

      setNetworkStats((prev) => ({
        ...prev,
        downloadSpeed,
        uploadSpeed,
        pingLatency: ping,
      }));

      setConsoleMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          timestamp: new Date(),
          type: "success",
          message: `Speed test complete: 📥 Download: ${downloadSpeed.toFixed(2)} Mbps | 📤 Upload: ${uploadSpeed.toFixed(2)} Mbps | 🏓 Ping: ${ping}ms`,
        },
      ]);
    } catch (error) {
      setConsoleMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          timestamp: new Date(),
          type: "error",
          message:
            "Failed to measure internet speed. Please check your connection.",
        },
      ]);
    } finally {
      setIsMeasuringSpeed(false);
    }
  };

  // Measure download speed
  const measureDownloadSpeed = (): Promise<number> => {
    return new Promise(async (resolve) => {
      const fileUrl = "https://speed.cloudflare.com/__down?bytes=5000000"; // 5MB file
      const startTime = Date.now();

      try {
        const response = await fetch(fileUrl);
        const data = await response.arrayBuffer();
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        const bitsLoaded = data.byteLength * 8;
        const speedMbps = bitsLoaded / duration / (1024 * 1024);
        resolve(speedMbps);
      } catch (error) {
        resolve(0);
      }
    });
  };

  // Measure upload speed
  const measureUploadSpeed = (): Promise<number> => {
    return new Promise(async (resolve) => {
      const testData = new ArrayBuffer(1000000); // 1MB
      const startTime = Date.now();

      try {
        await fetch("https://httpbin.org/post", {
          method: "POST",
          body: testData,
        });
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        const bitsLoaded = testData.byteLength * 8;
        const speedMbps = bitsLoaded / duration / (1024 * 1024);
        resolve(speedMbps);
      } catch (error) {
        resolve(0);
      }
    });
  };

  // Measure ping
  const measurePing = (): Promise<number> => {
    return new Promise(async (resolve) => {
      const startTime = Date.now();
      try {
        await fetch("https://httpbin.org/get", { cache: "no-store" });
        const endTime = Date.now();
        resolve(endTime - startTime);
      } catch (error) {
        resolve(999);
      }
    });
  };

  // Get DNS servers
  const getDNSServers = async () => {
    // Browser doesn't expose DNS, so we'll simulate with common DNS
    const dnsList = [
      "8.8.8.8 (Google)",
      "8.8.4.4 (Google)",
      "1.1.1.1 (Cloudflare)",
    ];
    setNetworkStats((prev) => ({ ...prev, dnsServers: dnsList }));
    return dnsList;
  };

  // Monitor network status
  const monitorNetworkStatus = () => {
    window.addEventListener("online", () => {
      setNetworkStats((prev) => ({ ...prev, isOnline: true }));
      setConsoleMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          timestamp: new Date(),
          type: "success",
          message: "Network connection restored",
        },
      ]);
    });

    window.addEventListener("offline", () => {
      setNetworkStats((prev) => ({ ...prev, isOnline: false }));
      setConsoleMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          timestamp: new Date(),
          type: "warning",
          message: "Network connection lost",
        },
      ]);
    });
  };

  // Initialize console messages and network monitoring
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      setConsoleMessages([
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

      // Initialize network monitoring
      getLocalNetworkInfo();
      getPublicIPInfo();
      getDNSServers();
      monitorNetworkStatus();

      // Periodic network check
      const interval = setInterval(() => {
        if (navigator.onLine !== networkStats.isOnline) {
          setNetworkStats((prev) => ({ ...prev, isOnline: navigator.onLine }));
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isMounted]);

  // Get user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("packetflow_user");
    if (!userData) {
      router.push("/");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  // Auto-scroll console to bottom
  useEffect(() => {
    if (
      consoleEndRef.current &&
      isConsoleOpen &&
      !isConsoleMinimized &&
      isMounted
    ) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleMessages, isConsoleOpen, isConsoleMinimized, isMounted]);

  // Focus console input on Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isConsoleOpen && !isConsoleMinimized) {
          consoleInputRef.current?.focus();
        } else {
          setIsConsoleOpen(true);
          setIsConsoleMinimized(false);
          setTimeout(() => consoleInputRef.current?.focus(), 100);
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "C") {
        e.preventDefault();
        setIsConsoleOpen(!isConsoleOpen);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isConsoleOpen, isConsoleMinimized]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("packetflow_user");
    router.push("/");
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobile && isSidebarOpen) {
        const sidebar = document.getElementById("sidebar");
        const menuButton = document.getElementById("menu-button");
        if (
          sidebar &&
          !sidebar.contains(e.target as Node) &&
          menuButton &&
          !menuButton.contains(e.target as Node)
        ) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobile, isSidebarOpen]);

  // Handle console resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        const newHeight = window.innerHeight - e.clientY;
        if (newHeight > 150 && newHeight < window.innerHeight - 100) {
          setConsoleHeight(newHeight);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  // Handle zoom to fit
  const handleZoomToFit = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.querySelector("canvas");
      if (canvas) {
        canvas.dispatchEvent(new CustomEvent("zoomToFit"));
      }
    }
  }, []);

  // Handle zoom controls
  const handleZoomIn = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.querySelector("canvas");
      if (canvas) {
        canvas.dispatchEvent(new CustomEvent("zoomIn"));
      }
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.querySelector("canvas");
      if (canvas) {
        canvas.dispatchEvent(new CustomEvent("zoomOut"));
      }
    }
  }, []);

  // Console command handler with network commands
  const handleConsoleCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    const newMessage: ConsoleMessage = {
      id: Date.now(),
      timestamp: new Date(),
      type: "command",
      message: `> ${command}`,
      command: command,
    };

    setConsoleMessages((prev) => [...prev, newMessage]);

    setTimeout(async () => {
      let response: ConsoleMessage;

      switch (trimmedCommand) {
        case "help":
          response = {
            id: Date.now() + 1,
            timestamp: new Date(),
            type: "info",
            message: `Available commands:\n  help - Show this help message\n  clear - Clear console\n  network status - Show network statistics\n  network ip - Show IP information\n  speedtest - Test internet speed\n  ping [host] - Ping a host\n  traceroute [host] - Trace route to host\n  devices - List all devices\n  stats - Show simulation statistics\n  status - Show simulation status\n  dns - Show DNS servers`,
          };
          break;
        case "clear":
          setConsoleMessages([]);
          return;
        case "network status":
        case "netstat":
          response = {
            id: Date.now() + 1,
            timestamp: new Date(),
            type: "info",
            message:
              `=== NETWORK STATUS ===\n` +
              `🌐 Internet: ${networkStats.isOnline ? "Connected ✅" : "Disconnected ❌"}\n` +
              `📡 Connection Type: ${networkStats.connectionType || "Unknown"}\n` +
              `📶 Signal Strength: ${networkStats.signalStrength || 85}%\n` +
              `⚡ Bandwidth: ${networkStats.bandwidth || 0} Mbps\n` +
              `📥 Download Speed: ${networkStats.downloadSpeed > 0 ? networkStats.downloadSpeed.toFixed(2) : "--"} Mbps\n` +
              `📤 Upload Speed: ${networkStats.uploadSpeed > 0 ? networkStats.uploadSpeed.toFixed(2) : "--"} Mbps\n` +
              `🏓 Ping Latency: ${networkStats.pingLatency > 0 ? networkStats.pingLatency : "--"} ms\n` +
              `📦 Packet Loss: ${networkStats.packetLoss}%\n` +
              `🔄 RTT: ${networkStats.rtt || 0} ms`,
          };
          break;
        case "network ip":
        case "ipconfig":
          response = {
            id: Date.now() + 1,
            timestamp: new Date(),
            type: "info",
            message:
              `=== IP CONFIGURATION ===\n` +
              `🏠 Local IP: ${networkStats.ipAddress || "Fetching..."}\n` +
              `🌍 Public IP: ${networkStats.publicIP || "Fetching..."}\n` +
              `📡 IPv6: ${networkStats.ipv6Address || "Not available"}\n` +
              `🔌 MAC Address: ${networkStats.macAddress || "Unknown"}\n` +
              `🏢 ISP: ${networkStats.isp || "Unknown"}\n` +
              `📍 Location: ${networkStats.location || "Unknown"}`,
          };
          break;
        case "speedtest":
          if (!isMeasuringSpeed) {
            measureInternetSpeed();
          } else {
            response = {
              id: Date.now() + 1,
              timestamp: new Date(),
              type: "warning",
              message: "Speed test already in progress. Please wait...",
            };
            setConsoleMessages((prev) => [...prev, response]);
          }
          return;
        case "dns":
          response = {
            id: Date.now() + 1,
            timestamp: new Date(),
            type: "info",
            message: `=== DNS SERVERS ===\n${networkStats.dnsServers.map((dns) => `  • ${dns}`).join("\n")}`,
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
          if (trimmedCommand.startsWith("ping ")) {
            const host = trimmedCommand.substring(5);
            const pingTime = Math.floor(Math.random() * 50) + 10;
            response = {
              id: Date.now() + 1,
              timestamp: new Date(),
              type: "success",
              message: `PING ${host}: 64 bytes, time=${pingTime}ms TTL=64\n  Packet loss: 0% | Round trip: ${pingTime}ms`,
            };
          } else if (trimmedCommand.startsWith("traceroute ")) {
            const host = trimmedCommand.substring(11);
            response = {
              id: Date.now() + 1,
              timestamp: new Date(),
              type: "info",
              message: `Tracing route to ${host}:\n  1  192.168.1.1  2ms\n  2  10.0.0.1  15ms\n  3  172.16.0.1  24ms\n  4  ${host}  42ms\n\nTrace complete.`,
            };
          } else {
            response = {
              id: Date.now() + 1,
              timestamp: new Date(),
              type: "error",
              message: `Command not found: ${command}. Type 'help' for available commands.`,
            };
          }
      }

      setConsoleMessages((prev) => [...prev, response]);
    }, 100);
  };

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (consoleInput.trim()) {
      handleConsoleCommand(consoleInput);
      setConsoleInput("");
    }
  };

  const clearConsole = () => {
    setConsoleMessages([]);
  };

  const copyConsole = () => {
    const consoleText = consoleMessages
      .map((msg) => `[${formatTime(msg.timestamp)}] ${msg.message}`)
      .join("\n");
    navigator.clipboard.writeText(consoleText);
  };

  // Format time without using locale to avoid hydration mismatches
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // Get icon for message type
  const getMessageIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle size={14} className="text-green-400 shrink-0" />;
      case "error":
        return <AlertCircle size={14} className="text-red-400 shrink-0" />;
      case "warning":
        return <AlertCircle size={14} className="text-yellow-400 shrink-0" />;
      case "command":
        return <ChevronRight size={14} className="text-blue-400 shrink-0" />;
      default:
        return <Terminal size={14} className="text-gray-400 shrink-0" />;
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "b" || e.key === "B") {
        setIsSidebarOpen((prev) => !prev);
      }
      if (e.key === "f" || e.key === "F") {
        handleZoomToFit();
      }
      if (e.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
      if (e.key === "Escape" && isProfileMenuOpen) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isSidebarOpen, handleZoomToFit, isProfileMenuOpen]);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "U";
    if (user.name && user.name !== "User") {
      return user.name.charAt(0).toUpperCase();
    }
    return user.email.charAt(0).toUpperCase();
  };

  // Don't render until mounted to avoid hydration issues
  if (!isMounted) {
    return (
      <div className="flex h-screen w-full bg-[#0B0F19] items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#0B0F19] text-white overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        id="menu-button"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-[#1F2937] p-2 rounded-lg hover:bg-[#374151] transition-all shadow-lg"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`
          fixed md:relative z-50 h-full transition-transform duration-300 ease-in-out shadow-xl
          ${isMobile ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
          md:translate-x-0
        `}
      >
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-[#0B0F19]/95 backdrop-blur-sm border-b border-[#1F2937] px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#00A5E0] to-[#0085C0] rounded-lg flex items-center justify-center">
                <Layout size={18} className="text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  PacketFlow Dashboard
                </h1>
                <p className="text-xs text-gray-500">
                  Network Simulation Platform
                </p>
              </div>
            </div>

            {/* Network Status Indicator */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-[#1F2937]/50">
                <div
                  className={`w-2 h-2 rounded-full ${networkStats.isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
                />
                <span className="text-xs text-gray-300">
                  {networkStats.isOnline ? "Online" : "Offline"}
                </span>
                {networkStats.downloadSpeed > 0 && (
                  <span className="text-xs text-gray-400">
                    {networkStats.downloadSpeed.toFixed(1)} Mbps
                  </span>
                )}
              </div>

              <button
                onClick={() => setIsConsoleOpen(!isConsoleOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#1F2937] transition-all"
                title="Toggle Console (Ctrl+Shift+C)"
              >
                <Terminal size={18} className="text-[#00A5E0]" />
                <span className="hidden md:inline text-sm">Console</span>
                <div
                  className={`w-2 h-2 rounded-full ${isConsoleOpen ? "bg-green-500" : "bg-gray-500"}`}
                />
              </button>
            </div>

            {user && (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1F2937] transition-all group"
                >
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00A5E0] to-[#0085C0] flex items-center justify-center shadow-lg">
                      <span className="text-white font-semibold text-sm">
                        {getUserInitials()}
                      </span>
                    </div>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0B0F19] ${networkStats.isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
                    />
                  </div>

                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-white">
                      {user.name && user.name !== "User"
                        ? user.name
                        : user.email.split("@")[0]}
                    </p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-200 hidden md:block ${
                      isProfileMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#1F2937] rounded-lg shadow-xl border border-[#374151] overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-[#374151]">
                      <p className="text-sm font-medium text-white">
                        {user.name && user.name !== "User"
                          ? user.name
                          : "Guest User"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{user.email}</p>
                    </div>

                    <div className="py-2">
                      <button
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[#374151] transition-colors"
                      >
                        <User size={16} className="text-[#00A5E0]" />
                        <span>Profile Settings</span>
                      </button>

                      <button
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[#374151] transition-colors"
                      >
                        <Settings size={16} className="text-[#00A5E0]" />
                        <span>Preferences</span>
                      </button>

                      <div className="border-t border-[#374151] my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-[#374151] transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Canvas Container */}
        <div ref={canvasRef} className="flex-1 min-h-0 relative">
          <ReactFlowProvider>
            <NetworkCanvas />
          </ReactFlowProvider>
        </div>

        {/* Resizable Console Terminal */}
        {isConsoleOpen && (
          <div
            className="flex-shrink-0 border-t border-[#1F2937] bg-[#0B0F19]/95 backdrop-blur-sm flex flex-col"
            style={{
              height: isConsoleMinimized ? "48px" : `${consoleHeight}px`,
            }}
          >
            {/* Resize Handle */}
            {!isConsoleMinimized && (
              <div
                ref={consoleResizeRef}
                onMouseDown={() => setIsResizing(true)}
                className="h-1 cursor-ns-resize hover:bg-[#00A5E0]/50 transition-colors"
                style={{ cursor: "row-resize" }}
              />
            )}

            {/* Console Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#1F2937]/50 border-b border-[#374151] flex-shrink-0">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-[#00A5E0]" />
                <span className="text-sm font-mono font-semibold">
                  Terminal
                </span>
                <div className="flex items-center gap-1 ml-2">
                  <Activity size={12} className="text-gray-500" />
                  <Wifi
                    size={12}
                    className={`${networkStats.isOnline ? "text-green-500" : "text-red-500"}`}
                  />
                  <Server size={12} className="text-gray-500" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyConsole}
                  className="p-1 hover:bg-[#374151] rounded transition"
                  title="Copy console output"
                >
                  <Copy size={14} className="text-gray-400" />
                </button>
                <button
                  onClick={clearConsole}
                  className="p-1 hover:bg-[#374151] rounded transition"
                  title="Clear console"
                >
                  <Trash2 size={14} className="text-gray-400" />
                </button>
                <button
                  onClick={() => setIsConsoleMinimized(!isConsoleMinimized)}
                  className="p-1 hover:bg-[#374151] rounded transition"
                  title={isConsoleMinimized ? "Expand" : "Minimize"}
                >
                  {isConsoleMinimized ? (
                    <Maximize2 size={14} className="text-gray-400" />
                  ) : (
                    <Minus size={14} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Console Content */}
            {!isConsoleMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-3 font-mono text-xs">
                  {consoleMessages.map((msg) => (
                    <div key={msg.id} className="mb-1 flex items-start gap-2">
                      <span className="text-gray-500 shrink-0">
                        [{formatTime(msg.timestamp)}]
                      </span>
                      <div className="flex items-start gap-1 flex-1 min-w-0">
                        {getMessageIcon(msg.type)}
                        <span
                          className={`whitespace-pre-wrap break-all ${
                            msg.type === "error"
                              ? "text-red-400"
                              : msg.type === "success"
                                ? "text-green-400"
                                : msg.type === "warning"
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                          }`}
                        >
                          {msg.message}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={consoleEndRef} />
                </div>

                {/* Console Input */}
                <form
                  onSubmit={handleConsoleSubmit}
                  className="border-t border-[#374151] p-2 flex-shrink-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#00A5E0] font-mono text-sm">$</span>
                    <input
                      ref={consoleInputRef}
                      type="text"
                      value={consoleInput}
                      onChange={(e) => setConsoleInput(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-sm font-mono text-white placeholder-gray-500"
                      placeholder="Type a command... (Ctrl+K to focus) | Try: network status, network ip, speedtest"
                      spellCheck={false}
                    />
                    <button
                      type="submit"
                      className="px-2 py-1 bg-[#00A5E0]/20 hover:bg-[#00A5E0]/30 rounded transition"
                    >
                      <Play size={14} className="text-[#00A5E0]" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}

        {/* Mobile Bottom Bar */}
        {isMobile && (
          <div className="sticky bottom-0 z-30 bg-[#0B0F19]/95 backdrop-blur-sm border-t border-[#1F2937] py-2 px-4 flex justify-around">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1F2937] transition"
            >
              <Menu size={20} className="text-[#00A5E0]" />
              <span className="text-xs">Tools</span>
            </button>

            <button
              onClick={handleZoomOut}
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1F2937] transition"
            >
              <Minus size={20} className="text-[#00A5E0]" />
              <span className="text-xs">Zoom Out</span>
            </button>

            <button
              onClick={handleZoomToFit}
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1F2937] transition"
            >
              <Maximize2 size={20} className="text-[#00A5E0]" />
              <span className="text-xs">Fit View</span>
            </button>

            <button
              onClick={handleZoomIn}
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1F2937] transition"
            >
              <Plus size={20} className="text-[#00A5E0]" />
              <span className="text-xs">Zoom In</span>
            </button>

            <button
              onClick={() => setIsConsoleOpen(!isConsoleOpen)}
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1F2937] transition"
            >
              <Terminal size={20} className="text-[#00A5E0]" />
              <span className="text-xs">Console</span>
            </button>

            <div className="text-xs text-gray-500 flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${networkStats.isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
              />
              <span>{networkStats.isOnline ? "Online" : "Offline"}</span>
            </div>
          </div>
        )}

        {/* Desktop Status Bar */}
        {/*  {!isMobile && (
          <div className="absolute bottom-4 left-4 z-40 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-lg text-xs text-gray-400">
            <span>
              💡 Tip: Press &apos;B&apos; to toggle sidebar | &apos;F&apos; to fit view | Ctrl+Shift+C to toggle console | Ctrl+K to focus console
            </span>
          </div>
        )} */}
      </div>
    </div>
  );
}

"use client";

import { Type } from "lucide-react";
import {
  Monitor,
  Router,
  Server,
  Cloud,
  Wifi,
  Printer,
  HardDrive,
  Cable,
  Network,
  Shield,
  Globe,
  Radio,
  Database,
  Tablet,
  Smartphone,
  GitBranch,
  Zap,
  Settings,
  Activity,
  ChevronDown,
  ChevronUp,
  Plug,
  Cable as CableIcon,
  ArrowRightLeft,
  Waves,
  Usb,
  Share2,
  User,
  Building2,
  Phone,
  Laptop,
  ShieldCheck,
  ShieldHalf,
  Eye,
  Lock,
  Scale,
  Gauge,
  Signal,
  Antenna,
  Radar,
  Box,
  Scan,
  SwitchCamera,
  LockKeyhole,
  Volume2,
  Watch,
  Search,
  Clock,
  KeyRound,
  Fingerprint,
  Scroll,
  GlobeLock,
  Cpu,
  Hexagon,
  WifiIcon,
  Bluetooth,
  WifiOff,
  EthernetPort,
  UsbIcon,
  HardDrive as HardDriveIcon,
  Database as DatabaseIcon,
  MonitorSmartphone,
  Server as ServerIcon,
  Cloud as CloudIcon,
} from "lucide-react";
import { useState } from "react";
import { LucideIcon } from "lucide-react";

type DeviceType =
  // Core Network
  | "router"
  | "switch"
  | "firewall"
  | "modem"
  | "hub"
  | "bridge"
  | "repeater"
  | "gateway"
  | "multilayer-switch"
  | "layer-3-switch"
  | "load-balancer"
  | "edge-router"
  | "core-router"
  | "distribution-switch"
  | "core-switch"
  // End Devices
  | "pc"
  | "server"
  | "laptop"
  | "printer"
  | "ip-phone"
  | "tablet"
  | "smartphone"
  | "workstation"
  | "thin-client"
  | "terminal"
  | "user"
  | "building"
  // Wireless
  | "wireless-ap"
  | "access-point"
  | "controller"
  | "wireless-controller"
  | "mesh-node"
  | "wireless-bridge"
  | "wi-fi-analyzer"
  // Security
  | "ids"
  | "ips"
  | "vpn-concentrator"
  | "vpn-gateway"
  | "security-appliance"
  | "next-gen-firewall"
  | "web-application-firewall"
  | "endpoint-security"
  | "zero-trust"
  // Servers
  | "file-server"
  | "web-server"
  | "mail-server"
  | "dns-server"
  | "dhcp-server"
  | "app-server"
  // Storage
  | "nas"
  | "san-switch"
  | "storage-array"
  | "backup-server"
  // Cloud & Virtual
  | "cloud"
  | "aws-cloud"
  | "azure-cloud"
  | "gcp-cloud"
  | "virtual-machine"
  | "container"
  | "kubernetes"
  | "docker"
  // Services
  | "dns"
  | "dhcp"
  | "proxy"
  | "web-proxy"
  | "reverse-proxy"
  | "radius-server"
  | "tacacs-server"
  | "syslog-server"
  | "ntp-server"
  | "snmp-server"
  | "sftp-server"
  | "ftp-server"
  // Specialized
  | "wan-optimizer"
  | "traffic-shaping"
  | "qos"
  | "bandwidth-manager"
  // IoT
  | "iot-device"
  | "smart-sensor"
  | "smart-camera"
  | "smart-lock"
  | "smart-light"
  | "smart-thermostat"
  | "smart-speaker"
  | "smart-tv"
  | "smart-watch"
  | "smart-glasses"
  // Monitoring
  | "network-monitor"
  | "performance-monitor"
  | "traffic-analyzer"
  | "packet-analyzer"
  | "network-scanner"
  | "vulnerability-scanner"
  // Other
  | "internet"
  | "database"
  | "text";

type CableType =
  // Copper
  | "ethernet"
  | "coaxial"
  | "serial"
  | "usb"
  | "usb-c"
  | "thunderbolt"
  | "firewire"
  // Fiber
  | "fiber-single-mode"
  | "fiber-multi-mode"
  // Power
  | "power"
  // Display
  | "hdmi"
  | "displayport"
  | "dvi"
  | "vga"
  // Storage
  | "sata"
  | "sas"
  // Other
  | "console"
  | "patch-cord"
  // Wireless
  | "wifi6"
  | "wifi5"
  | "cellular5g"
  | "cellular4g"
  | "bluetooth"
  | "zigbee"
  | "lorawan";

interface Device {
  type: DeviceType;
  label: string;
  icon: LucideIcon;
  category: string;
}

interface Cable {
  type: CableType;
  label: string;
  icon: LucideIcon;
  category: string;
  speed?: string;
}

// Helper type for category items
type CategoryItem = Device | Cable;

const devices: Device[] = [
  // ===== End Devices =====
  { type: "pc", label: "PC", icon: Monitor, category: "End Devices" },
  { type: "laptop", label: "Laptop", icon: Laptop, category: "End Devices" },
  {
    type: "smartphone",
    label: "Smartphone",
    icon: Smartphone,
    category: "End Devices",
  },
  { type: "tablet", label: "Tablet", icon: Tablet, category: "End Devices" },
  { type: "printer", label: "Printer", icon: Printer, category: "End Devices" },
  { type: "ip-phone", label: "IP Phone", icon: Phone, category: "End Devices" },
  {
    type: "workstation",
    label: "Workstation",
    icon: MonitorSmartphone,
    category: "End Devices",
  },
  {
    type: "thin-client",
    label: "Thin Client",
    icon: Monitor,
    category: "End Devices",
  },
  {
    type: "terminal",
    label: "Terminal",
    icon: Monitor,
    category: "End Devices",
  },
  { type: "user", label: "User", icon: User, category: "End Devices" },

  // ===== Network Infrastructure =====
  { type: "router", label: "Router", icon: Router, category: "Infrastructure" },
  {
    type: "switch",
    label: "Switch",
    icon: Network,
    category: "Infrastructure",
  },
  {
    type: "multilayer-switch",
    label: "Multilayer Switch",
    icon: GitBranch,
    category: "Infrastructure",
  },
  {
    type: "layer-3-switch",
    label: "Layer 3 Switch",
    icon: GitBranch,
    category: "Infrastructure",
  },
  { type: "hub", label: "Hub", icon: Network, category: "Infrastructure" },
  { type: "bridge", label: "Bridge", icon: Cable, category: "Infrastructure" },
  {
    type: "repeater",
    label: "Repeater",
    icon: Zap,
    category: "Infrastructure",
  },
  {
    type: "gateway",
    label: "Gateway",
    icon: Globe,
    category: "Infrastructure",
  },
  { type: "modem", label: "Modem", icon: Settings, category: "Infrastructure" },
  {
    type: "edge-router",
    label: "Edge Router",
    icon: Router,
    category: "Infrastructure",
  },
  {
    type: "core-router",
    label: "Core Router",
    icon: Router,
    category: "Infrastructure",
  },
  {
    type: "distribution-switch",
    label: "Distribution Switch",
    icon: Network,
    category: "Infrastructure",
  },
  {
    type: "core-switch",
    label: "Core Switch",
    icon: Network,
    category: "Infrastructure",
  },
  {
    type: "building",
    label: "Building",
    icon: Building2,
    category: "Infrastructure",
  },
  {
    type: "internet",
    label: "Internet",
    icon: Globe,
    category: "Infrastructure",
  },

  // ===== Wireless =====
  {
    type: "wireless-ap",
    label: "Wireless AP",
    icon: Wifi,
    category: "Wireless",
  },
  {
    type: "access-point",
    label: "Access Point",
    icon: Wifi,
    category: "Wireless",
  },
  {
    type: "controller",
    label: "Controller",
    icon: Settings,
    category: "Wireless",
  },
  {
    type: "wireless-controller",
    label: "Wireless Controller",
    icon: Signal,
    category: "Wireless",
  },
  {
    type: "mesh-node",
    label: "Mesh Node",
    icon: WifiIcon,
    category: "Wireless",
  },
  {
    type: "wireless-bridge",
    label: "Wireless Bridge",
    icon: Antenna,
    category: "Wireless",
  },
  {
    type: "wi-fi-analyzer",
    label: "Wi-Fi Analyzer",
    icon: Radar,
    category: "Wireless",
  },

  // ===== Security =====
  { type: "firewall", label: "Firewall", icon: Shield, category: "Security" },
  { type: "ids", label: "IDS", icon: Eye, category: "Security" },
  { type: "ips", label: "IPS", icon: ShieldCheck, category: "Security" },
  {
    type: "vpn-concentrator",
    label: "VPN Concentrator",
    icon: Lock,
    category: "Security",
  },
  {
    type: "vpn-gateway",
    label: "VPN Gateway",
    icon: Lock,
    category: "Security",
  },
  {
    type: "security-appliance",
    label: "Security Appliance",
    icon: Shield,
    category: "Security",
  },
  {
    type: "next-gen-firewall",
    label: "NGFW",
    icon: ShieldCheck,
    category: "Security",
  },
  {
    type: "web-application-firewall",
    label: "WAF",
    icon: ShieldHalf,
    category: "Security",
  },
  {
    type: "endpoint-security",
    label: "Endpoint Security",
    icon: Shield,
    category: "Security",
  },
  {
    type: "zero-trust",
    label: "Zero Trust",
    icon: LockKeyhole,
    category: "Security",
  },

  // ===== Servers =====
  { type: "server", label: "Server", icon: ServerIcon, category: "Servers" },
  {
    type: "file-server",
    label: "File Server",
    icon: ServerIcon,
    category: "Servers",
  },
  {
    type: "web-server",
    label: "Web Server",
    icon: ServerIcon,
    category: "Servers",
  },
  {
    type: "mail-server",
    label: "Mail Server",
    icon: ServerIcon,
    category: "Servers",
  },
  {
    type: "dns-server",
    label: "DNS Server",
    icon: Globe,
    category: "Servers",
  },
  {
    type: "dhcp-server",
    label: "DHCP Server",
    icon: Settings,
    category: "Servers",
  },
  {
    type: "app-server",
    label: "App Server",
    icon: ServerIcon,
    category: "Servers",
  },

  // ===== Storage =====
  {
    type: "nas",
    label: "NAS Storage",
    icon: HardDriveIcon,
    category: "Storage",
  },
  {
    type: "san-switch",
    label: "SAN Switch",
    icon: DatabaseIcon,
    category: "Storage",
  },
  {
    type: "storage-array",
    label: "Storage Array",
    icon: HardDriveIcon,
    category: "Storage",
  },
  {
    type: "backup-server",
    label: "Backup Server",
    icon: HardDriveIcon,
    category: "Storage",
  },

  // ===== Cloud & Virtual =====
  { type: "cloud", label: "Cloud", icon: CloudIcon, category: "Cloud" },
  { type: "aws-cloud", label: "AWS Cloud", icon: CloudIcon, category: "Cloud" },
  {
    type: "azure-cloud",
    label: "Azure Cloud",
    icon: CloudIcon,
    category: "Cloud",
  },
  { type: "gcp-cloud", label: "GCP Cloud", icon: CloudIcon, category: "Cloud" },
  {
    type: "virtual-machine",
    label: "Virtual Machine",
    icon: Cpu,
    category: "Cloud",
  },
  { type: "container", label: "Container", icon: Box, category: "Cloud" },
  {
    type: "kubernetes",
    label: "Kubernetes",
    icon: Hexagon,
    category: "Cloud",
  },
  { type: "docker", label: "Docker", icon: Box, category: "Cloud" },

  // ===== Network Services =====
  { type: "dns", label: "DNS Service", icon: GlobeLock, category: "Services" },
  { type: "dhcp", label: "DHCP Service", icon: Settings, category: "Services" },
  {
    type: "proxy",
    label: "Proxy Service",
    icon: ShieldHalf,
    category: "Services",
  },
  {
    type: "web-proxy",
    label: "Web Proxy",
    icon: ShieldHalf,
    category: "Services",
  },
  {
    type: "reverse-proxy",
    label: "Reverse Proxy",
    icon: ShieldHalf,
    category: "Services",
  },
  {
    type: "radius-server",
    label: "RADIUS Server",
    icon: KeyRound,
    category: "Services",
  },
  {
    type: "tacacs-server",
    label: "TACACS+ Server",
    icon: Fingerprint,
    category: "Services",
  },
  {
    type: "syslog-server",
    label: "Syslog Server",
    icon: Scroll,
    category: "Services",
  },
  {
    type: "ntp-server",
    label: "NTP Server",
    icon: Clock,
    category: "Services",
  },
  {
    type: "snmp-server",
    label: "SNMP Server",
    icon: Activity,
    category: "Services",
  },
  {
    type: "sftp-server",
    label: "SFTP Server",
    icon: Database,
    category: "Services",
  },
  {
    type: "ftp-server",
    label: "FTP Server",
    icon: Database,
    category: "Services",
  },

  // ===== Specialized =====
  {
    type: "load-balancer",
    label: "Load Balancer",
    icon: Scale,
    category: "Specialized",
  },
  {
    type: "wan-optimizer",
    label: "WAN Optimizer",
    icon: Gauge,
    category: "Specialized",
  },
  {
    type: "traffic-shaping",
    label: "Traffic Shaping",
    icon: Activity,
    category: "Specialized",
  },
  {
    type: "qos",
    label: "QoS Manager",
    icon: Gauge,
    category: "Specialized",
  },
  {
    type: "bandwidth-manager",
    label: "Bandwidth Manager",
    icon: Zap,
    category: "Specialized",
  },

  // ===== IoT =====
  {
    type: "iot-device",
    label: "IoT Device",
    icon: Box,
    category: "IoT & Smart",
  },
  {
    type: "smart-sensor",
    label: "Smart Sensor",
    icon: Scan,
    category: "IoT & Smart",
  },
  {
    type: "smart-camera",
    label: "Smart Camera",
    icon: SwitchCamera,
    category: "IoT & Smart",
  },
  {
    type: "smart-lock",
    label: "Smart Lock",
    icon: LockKeyhole,
    category: "IoT & Smart",
  },
  {
    type: "smart-light",
    label: "Smart Light",
    icon: Zap,
    category: "IoT & Smart",
  },
  {
    type: "smart-thermostat",
    label: "Smart Thermostat",
    icon: Settings,
    category: "IoT & Smart",
  },
  {
    type: "smart-speaker",
    label: "Smart Speaker",
    icon: Volume2,
    category: "IoT & Smart",
  },
  {
    type: "smart-tv",
    label: "Smart TV",
    icon: Monitor,
    category: "IoT & Smart",
  },
  {
    type: "smart-watch",
    label: "Smart Watch",
    icon: Watch,
    category: "IoT & Smart",
  },
  {
    type: "smart-glasses",
    label: "Smart Glasses",
    icon: Eye,
    category: "IoT & Smart",
  },

  // ===== Monitoring =====
  {
    type: "network-monitor",
    label: "Network Monitor",
    icon: Activity,
    category: "Monitoring",
  },
  {
    type: "performance-monitor",
    label: "Performance Monitor",
    icon: Gauge,
    category: "Monitoring",
  },
  {
    type: "traffic-analyzer",
    label: "Traffic Analyzer",
    icon: Radar,
    category: "Monitoring",
  },
  {
    type: "packet-analyzer",
    label: "Packet Analyzer",
    icon: Search,
    category: "Monitoring",
  },
  {
    type: "network-scanner",
    label: "Network Scanner",
    icon: Search,
    category: "Monitoring",
  },
  {
    type: "vulnerability-scanner",
    label: "Vulnerability Scanner",
    icon: Shield,
    category: "Monitoring",
  },

  // ===== Database =====
  { type: "database", label: "Database", icon: Database, category: "Storage" },

  // ===== Tools =====
  { type: "text" as DeviceType, label: "Text", icon: Type, category: "Tools" },
];

const cables: Cable[] = [
  // ===== Wired Connections =====
  {
    type: "ethernet",
    label: "Ethernet (CAT6)",
    icon: EthernetPort,
    category: "Wired",
    speed: "1 Gbps",
  },
  {
    type: "fiber-single-mode",
    label: "Fiber (Single-Mode)",
    icon: Waves,
    category: "Wired",
    speed: "100 Gbps",
  },
  {
    type: "fiber-multi-mode",
    label: "Fiber (Multi-Mode)",
    icon: Waves,
    category: "Wired",
    speed: "10 Gbps",
  },
  {
    type: "coaxial",
    label: "Coaxial",
    icon: CableIcon,
    category: "Wired",
    speed: "100 Mbps - 1 Gbps",
  },
  {
    type: "serial",
    label: "Serial (V.35)",
    icon: ArrowRightLeft,
    category: "Wired",
    speed: "1-10 Mbps",
  },
  {
    type: "usb",
    label: "USB",
    icon: Usb,
    category: "Wired",
    speed: "5 Gbps",
  },
  {
    type: "usb-c",
    label: "USB-C",
    icon: UsbIcon,
    category: "Wired",
    speed: "40 Gbps",
  },
  {
    type: "thunderbolt",
    label: "Thunderbolt",
    icon: Plug,
    category: "Wired",
    speed: "40 Gbps",
  },
  {
    type: "firewire",
    label: "FireWire",
    icon: Plug,
    category: "Wired",
    speed: "800 Mbps",
  },
  {
    type: "console",
    label: "Console (RJ45)",
    icon: Plug,
    category: "Wired",
    speed: "9600 bps",
  },
  {
    type: "hdmi",
    label: "HDMI",
    icon: Share2,
    category: "Wired",
    speed: "18 Gbps",
  },
  {
    type: "displayport",
    label: "DisplayPort",
    icon: Share2,
    category: "Wired",
    speed: "32.4 Gbps",
  },
  {
    type: "dvi",
    label: "DVI",
    icon: Share2,
    category: "Wired",
    speed: "3.96 Gbps",
  },
  {
    type: "vga",
    label: "VGA",
    icon: Share2,
    category: "Wired",
    speed: "N/A",
  },
  {
    type: "sata",
    label: "SATA",
    icon: HardDriveIcon,
    category: "Wired",
    speed: "6 Gbps",
  },
  {
    type: "sas",
    label: "SAS",
    icon: HardDriveIcon,
    category: "Wired",
    speed: "12 Gbps",
  },
  {
    type: "patch-cord",
    label: "Patch Cord",
    icon: CableIcon,
    category: "Wired",
    speed: "1 Gbps",
  },
  {
    type: "power",
    label: "Power Cable",
    icon: Plug,
    category: "Wired",
    speed: "N/A",
  },

  // ===== Wireless Connections =====
  {
    type: "wifi6",
    label: "WiFi 6",
    icon: Wifi,
    category: "Wireless",
    speed: "9.6 Gbps",
  },
  {
    type: "wifi5",
    label: "WiFi 5",
    icon: Wifi,
    category: "Wireless",
    speed: "3.5 Gbps",
  },
  {
    type: "cellular5g",
    label: "5G Cellular",
    icon: Radio,
    category: "Wireless",
    speed: "10 Gbps",
  },
  {
    type: "cellular4g",
    label: "4G LTE",
    icon: Radio,
    category: "Wireless",
    speed: "100 Mbps",
  },
  {
    type: "bluetooth",
    label: "Bluetooth",
    icon: Bluetooth,
    category: "Wireless",
    speed: "2 Mbps",
  },
  {
    type: "zigbee",
    label: "Zigbee",
    icon: WifiOff,
    category: "Wireless",
    speed: "250 kbps",
  },
  {
    type: "lorawan",
    label: "LoRaWAN",
    icon: WifiOff,
    category: "Wireless",
    speed: "50 kbps",
  },
];

// Use a generic type for the filter function
function filterItems<T extends CategoryItem>(items: T[], search: string): T[] {
  return items.filter(
    (item) =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()),
  );
}

// Use a generic type for the group function
function groupItems<T extends CategoryItem>(items: T[]): Record<string, T[]> {
  return items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, T[]>,
  );
}

export default function Sidebar() {
  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"devices" | "cables">("devices");

  const onDragStart = (
    event: React.DragEvent,
    type: DeviceType | CableType,
    itemType: "device" | "cable",
  ) => {
    event.dataTransfer.setData("item-type", itemType);
    if (itemType === "device") {
      event.dataTransfer.setData("device-type", type as string);
    } else {
      event.dataTransfer.setData("cable-type", type as string);
    }
    event.dataTransfer.effectAllowed = "copy";
    console.log(`Dragging ${itemType}: ${type}`);
  };

  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const filteredDevices = filterItems(devices, searchTerm);
  const filteredCables = filterItems(cables, searchTerm);

  const groupedDevices = groupItems(filteredDevices);
  const groupedCables = groupItems(filteredCables);
  const currentGrouped =
    activeTab === "devices" ? groupedDevices : groupedCables;

  // Get category icon
  const getCategoryIcon = (category: string): string => {
    // Map category to emoji
    const categoryEmojis: Record<string, string> = {
      "End Devices": "💻",
      Infrastructure: "🏗️",
      Wireless: "📶",
      Security: "🛡️",
      Servers: "🖥️",
      Storage: "💾",
      Cloud: "☁️",
      Services: "⚙️",
      Specialized: "🔧",
      "IoT & Smart": "📡",
      Monitoring: "📊",
      Tools: "🔨",
      Wired: "🔌",
    };
    return categoryEmojis[category] || "📦";
  };

  return (
    <div className="w-80 h-full bg-[#111827] border-r border-[#1F2937] overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="p-4 sticky top-0 bg-[#111827] border-b border-[#1F2937] z-10">
        <h2 className="text-lg font-bold mb-1">Network Tools</h2>
        <p className="text-xs text-gray-500">Drag and drop to canvas</p>

        {/* Tab Switcher */}
        <div className="mt-3 flex gap-2 bg-[#1F2937] p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("devices")}
            className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition ${
              activeTab === "devices"
                ? "bg-[#00A5E0] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Devices ({devices.length})
          </button>
          <button
            onClick={() => setActiveTab("cables")}
            className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition ${
              activeTab === "cables"
                ? "bg-[#00A5E0] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Cables ({cables.length})
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-3">
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00A5E0] transition"
          />
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-4">
        {Object.keys(currentGrouped).length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No {activeTab} found
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(currentGrouped).map(([category, categoryItems]) => (
              <div key={category}>
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 hover:text-gray-300 transition group"
                >
                  <span className="flex items-center gap-2">
                    <span>{getCategoryIcon(category)}</span>
                    <span>
                      {category} ({categoryItems.length})
                    </span>
                  </span>
                  {collapsedCategories[category] ? (
                    <ChevronDown
                      size={14}
                      className="group-hover:scale-110 transition"
                    />
                  ) : (
                    <ChevronUp
                      size={14}
                      className="group-hover:scale-110 transition"
                    />
                  )}
                </button>

                {!collapsedCategories[category] && (
                  <div className="grid grid-cols-2 gap-2">
                    {categoryItems.map((item: CategoryItem) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={`${item.type}-${item.label}`}
                          draggable
                          onDragStart={(e) =>
                            onDragStart(
                              e,
                              item.type,
                              activeTab === "devices" ? "device" : "cable",
                            )
                          }
                          className="flex items-center gap-2 p-2 bg-[#1F2937] rounded cursor-grab hover:bg-[#374151] transition-all hover:scale-105 active:cursor-grabbing group relative"
                        >
                          <Icon
                            size={16}
                            className={`flex-shrink-0 ${
                              activeTab === "cables"
                                ? "text-green-500"
                                : "text-[#00A5E0]"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm truncate block">
                              {item.label}
                            </span>
                            {"speed" in item && item.speed && (
                              <span className="text-[10px] text-gray-500">
                                {item.speed}
                              </span>
                            )}
                          </div>
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition">
                            <span className="text-[8px] text-gray-600">↕</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="sticky bottom-0 p-4 bg-[#111827] border-t border-[#1F2937] text-xs text-gray-500">
        <div className="flex justify-between">
          <span>Total {activeTab}</span>
          <span
            className={`font-semibold ${
              activeTab === "cables" ? "text-green-500" : "text-[#00A5E0]"
            }`}
          >
            {activeTab === "devices"
              ? filteredDevices.length
              : filteredCables.length}
          </span>
        </div>
        <div className="flex justify-between mt-1">
          <span>Categories</span>
          <span className="text-[#00A5E0] font-semibold">
            {Object.keys(currentGrouped).length}
          </span>
        </div>
        {activeTab === "cables" && (
          <div className="mt-2 pt-2 border-t border-[#1F2937] text-[10px] text-gray-600">
            <span>💡 Tip: Drag cables between devices to connect them</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ===== COMPREHENSIVE DEVICE TYPES =====
export type DeviceType =
  // Core Network Devices
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
  // Wireless Devices
  | "wireless-ap"
  | "access-point"
  | "controller"
  | "wireless-controller"
  | "mesh-node"
  | "wireless-bridge"
  | "wi-fi-analyzer"
  // Security Devices
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
  // Network Services
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
  // Specialized Network
  | "wan-optimizer"
  | "traffic-shaping"
  | "qos"
  | "bandwidth-manager"
  // IoT & Smart Devices
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
  // Internet
  | "internet";

// ===== COMPREHENSIVE CABLE TYPES =====
export type CableType =
  // Copper Cables
  | "ethernet"
  | "coaxial"
  | "serial"
  | "usb"
  | "usb-c"
  | "thunderbolt"
  | "firewire"
  // Fiber Cables
  | "fiber-single-mode"
  | "fiber-multi-mode"
  // Power
  | "power"
  // Display Cables
  | "hdmi"
  | "displayport"
  | "dvi"
  | "vga"
  // Storage Cables
  | "sata"
  | "sas"
  // Other
  | "console"
  | "patch-cord"
  | "bluetooth"
  | "wifi";

// ===== DEVICE METADATA =====
export interface DeviceMetadata {
  label: string;
  icon: string;
  category:
    | "core"
    | "end-device"
    | "wireless"
    | "security"
    | "server"
    | "storage"
    | "cloud"
    | "service"
    | "iot"
    | "monitoring";
  color: string;
}

// ===== CABLE METADATA =====
export interface CableMetadata {
  label: string;
  color: string;
  strokeWidth: number;
  strokeDasharray?: string;
  category: "copper" | "fiber" | "power" | "display" | "storage" | "other";
}

// ===== NETWORK NODE DATA =====
export type NetworkNodeData = {
  type: DeviceType;
  label: string;
  ipAddress?: string;
  macAddress?: string;
  status?:
    | "active"
    | "inactive"
    | "warning"
    | "maintenance"
    | "online"
    | "offline"
    | "running"
    | "stopped"
    | "degraded";
  icon?: string | null;
  metadata?: DeviceMetadata;
};

// ===== PACKET =====
export interface Packet {
  path: string[];
  index: number;
  data?: unknown;
}

// ===== EDGE DATA =====
export interface EdgeData {
  cableType: CableType;
  bandwidth?: number;
  latency?: number;
  status?: "active" | "inactive" | "warning";
}

// ===== NETWORK STATS =====
export interface NetworkStats {
  totalDevices: number;
  activeDevices: number;
  totalConnections: number;
  activeConnections: number;
  packetsSent: number;
  packetsReceived: number;
  packetLoss: number;
  averageLatency: number;
}

// ===== HELPER FUNCTIONS =====
export const DEVICE_METADATA: Record<DeviceType, DeviceMetadata> = {
  // Core Network
  router: { label: "Router", icon: "📡", category: "core", color: "#3B82F6" },
  switch: { label: "Switch", icon: "🔀", category: "core", color: "#10B981" },
  firewall: {
    label: "Firewall",
    icon: "🛡️",
    category: "security",
    color: "#EF4444",
  },
  modem: { label: "Modem", icon: "📶", category: "core", color: "#F59E0B" },
  hub: { label: "Hub", icon: "🔁", category: "core", color: "#8B5CF6" },
  bridge: { label: "Bridge", icon: "🌉", category: "core", color: "#EC4899" },
  repeater: {
    label: "Repeater",
    icon: "📤",
    category: "core",
    color: "#F97316",
  },
  gateway: { label: "Gateway", icon: "🚪", category: "core", color: "#06B6D4" },
  "multilayer-switch": {
    label: "MLS",
    icon: "🔀",
    category: "core",
    color: "#14B8A6",
  },
  "layer-3-switch": {
    label: "Layer 3 Switch",
    icon: "🔀",
    category: "core",
    color: "#14B8A6",
  },
  "load-balancer": {
    label: "Load Balancer",
    icon: "⚖️",
    category: "core",
    color: "#6366F1",
  },
  "edge-router": {
    label: "Edge Router",
    icon: "📡",
    category: "core",
    color: "#3B82F6",
  },
  "core-router": {
    label: "Core Router",
    icon: "📡",
    category: "core",
    color: "#2563EB",
  },
  "distribution-switch": {
    label: "Distribution Switch",
    icon: "🔀",
    category: "core",
    color: "#059669",
  },
  "core-switch": {
    label: "Core Switch",
    icon: "🔀",
    category: "core",
    color: "#047857",
  },

  // End Devices
  pc: { label: "PC", icon: "💻", category: "end-device", color: "#34D399" },
  server: { label: "Server", icon: "🖥️", category: "server", color: "#8B5CF6" },
  laptop: {
    label: "Laptop",
    icon: "💻",
    category: "end-device",
    color: "#34D399",
  },
  printer: {
    label: "Printer",
    icon: "🖨️",
    category: "end-device",
    color: "#F472B6",
  },
  "ip-phone": {
    label: "IP Phone",
    icon: "📞",
    category: "end-device",
    color: "#A78BFA",
  },
  tablet: {
    label: "Tablet",
    icon: "📱",
    category: "end-device",
    color: "#60A5FA",
  },
  smartphone: {
    label: "Smartphone",
    icon: "📱",
    category: "end-device",
    color: "#60A5FA",
  },
  workstation: {
    label: "Workstation",
    icon: "💻",
    category: "end-device",
    color: "#34D399",
  },
  "thin-client": {
    label: "Thin Client",
    icon: "💻",
    category: "end-device",
    color: "#34D399",
  },
  terminal: {
    label: "Terminal",
    icon: "🖥️",
    category: "end-device",
    color: "#34D399",
  },
  user: { label: "User", icon: "👤", category: "end-device", color: "#60A5FA" },
  building: {
    label: "Building",
    icon: "🏢",
    category: "end-device",
    color: "#60A5FA",
  },

  // Wireless
  "wireless-ap": {
    label: "WAP",
    icon: "📶",
    category: "wireless",
    color: "#FCD34D",
  },
  "access-point": {
    label: "AP",
    icon: "📶",
    category: "wireless",
    color: "#FCD34D",
  },
  controller: {
    label: "Controller",
    icon: "🎮",
    category: "wireless",
    color: "#F59E0B",
  },
  "wireless-controller": {
    label: "Wireless Controller",
    icon: "🎮",
    category: "wireless",
    color: "#F59E0B",
  },
  "mesh-node": {
    label: "Mesh Node",
    icon: "📶",
    category: "wireless",
    color: "#FCD34D",
  },
  "wireless-bridge": {
    label: "Wireless Bridge",
    icon: "📶",
    category: "wireless",
    color: "#FCD34D",
  },
  "wi-fi-analyzer": {
    label: "Wi-Fi Analyzer",
    icon: "📡",
    category: "monitoring",
    color: "#F59E0B",
  },

  // Security
  ids: { label: "IDS", icon: "🔍", category: "security", color: "#F87171" },
  ips: { label: "IPS", icon: "🛡️", category: "security", color: "#FCA5A5" },
  "vpn-concentrator": {
    label: "VPN",
    icon: "🔐",
    category: "security",
    color: "#EC4899",
  },
  "vpn-gateway": {
    label: "VPN Gateway",
    icon: "🔐",
    category: "security",
    color: "#EC4899",
  },
  "security-appliance": {
    label: "Security Appliance",
    icon: "🛡️",
    category: "security",
    color: "#EF4444",
  },
  "next-gen-firewall": {
    label: "NGFW",
    icon: "🛡️",
    category: "security",
    color: "#DC2626",
  },
  "web-application-firewall": {
    label: "WAF",
    icon: "🛡️",
    category: "security",
    color: "#EF4444",
  },
  "endpoint-security": {
    label: "Endpoint Security",
    icon: "🛡️",
    category: "security",
    color: "#EF4444",
  },
  "zero-trust": {
    label: "Zero Trust",
    icon: "🔐",
    category: "security",
    color: "#EC4899",
  },

  // Servers
  "file-server": {
    label: "File Server",
    icon: "📁",
    category: "server",
    color: "#8B5CF6",
  },
  "web-server": {
    label: "Web Server",
    icon: "🌐",
    category: "server",
    color: "#8B5CF6",
  },
  "mail-server": {
    label: "Mail Server",
    icon: "✉️",
    category: "server",
    color: "#8B5CF6",
  },
  "dns-server": {
    label: "DNS Server",
    icon: "🌐",
    category: "server",
    color: "#8B5CF6",
  },
  "dhcp-server": {
    label: "DHCP Server",
    icon: "📡",
    category: "server",
    color: "#8B5CF6",
  },
  "app-server": {
    label: "App Server",
    icon: "⚙️",
    category: "server",
    color: "#8B5CF6",
  },

  // Storage
  nas: { label: "NAS", icon: "💾", category: "storage", color: "#67E8F9" },
  "san-switch": {
    label: "SAN Switch",
    icon: "💾",
    category: "storage",
    color: "#67E8F9",
  },
  "storage-array": {
    label: "Storage Array",
    icon: "💾",
    category: "storage",
    color: "#67E8F9",
  },
  "backup-server": {
    label: "Backup Server",
    icon: "💾",
    category: "storage",
    color: "#67E8F9",
  },

  // Cloud & Virtual
  cloud: { label: "Cloud", icon: "☁️", category: "cloud", color: "#A78BFA" },
  "aws-cloud": {
    label: "AWS",
    icon: "☁️",
    category: "cloud",
    color: "#F97316",
  },
  "azure-cloud": {
    label: "Azure",
    icon: "☁️",
    category: "cloud",
    color: "#3B82F6",
  },
  "gcp-cloud": {
    label: "GCP",
    icon: "☁️",
    category: "cloud",
    color: "#34D399",
  },
  "virtual-machine": {
    label: "VM",
    icon: "🖥️",
    category: "cloud",
    color: "#A78BFA",
  },
  container: {
    label: "Container",
    icon: "📦",
    category: "cloud",
    color: "#A78BFA",
  },
  kubernetes: {
    label: "Kubernetes",
    icon: "⚙️",
    category: "cloud",
    color: "#A78BFA",
  },
  docker: { label: "Docker", icon: "🐳", category: "cloud", color: "#A78BFA" },

  // Network Services
  dns: { label: "DNS", icon: "🌐", category: "service", color: "#06B6D4" },
  dhcp: { label: "DHCP", icon: "📡", category: "service", color: "#06B6D4" },
  proxy: { label: "Proxy", icon: "🔀", category: "service", color: "#06B6D4" },
  "web-proxy": {
    label: "Web Proxy",
    icon: "🌐",
    category: "service",
    color: "#06B6D4",
  },
  "reverse-proxy": {
    label: "Reverse Proxy",
    icon: "🔄",
    category: "service",
    color: "#06B6D4",
  },
  "radius-server": {
    label: "RADIUS",
    icon: "🔑",
    category: "service",
    color: "#06B6D4",
  },
  "tacacs-server": {
    label: "TACACS+",
    icon: "🔑",
    category: "service",
    color: "#06B6D4",
  },
  "syslog-server": {
    label: "Syslog",
    icon: "📝",
    category: "service",
    color: "#06B6D4",
  },
  "ntp-server": {
    label: "NTP",
    icon: "🕐",
    category: "service",
    color: "#06B6D4",
  },
  "snmp-server": {
    label: "SNMP",
    icon: "📡",
    category: "service",
    color: "#06B6D4",
  },
  "sftp-server": {
    label: "SFTP",
    icon: "📁",
    category: "service",
    color: "#06B6D4",
  },
  "ftp-server": {
    label: "FTP",
    icon: "📁",
    category: "service",
    color: "#06B6D4",
  },

  // Specialized Network
  "wan-optimizer": {
    label: "WAN Optimizer",
    icon: "⚡",
    category: "core",
    color: "#F59E0B",
  },
  "traffic-shaping": {
    label: "Traffic Shaping",
    icon: "📊",
    category: "core",
    color: "#F59E0B",
  },
  qos: { label: "QoS", icon: "📊", category: "core", color: "#F59E0B" },
  "bandwidth-manager": {
    label: "Bandwidth Manager",
    icon: "📊",
    category: "core",
    color: "#F59E0B",
  },

  // IoT
  "iot-device": {
    label: "IoT Device",
    icon: "📡",
    category: "iot",
    color: "#34D399",
  },
  "smart-sensor": {
    label: "Smart Sensor",
    icon: "📡",
    category: "iot",
    color: "#34D399",
  },
  "smart-camera": {
    label: "Smart Camera",
    icon: "📷",
    category: "iot",
    color: "#34D399",
  },
  "smart-lock": {
    label: "Smart Lock",
    icon: "🔒",
    category: "iot",
    color: "#34D399",
  },
  "smart-light": {
    label: "Smart Light",
    icon: "💡",
    category: "iot",
    color: "#34D399",
  },
  "smart-thermostat": {
    label: "Smart Thermostat",
    icon: "🌡️",
    category: "iot",
    color: "#34D399",
  },
  "smart-speaker": {
    label: "Smart Speaker",
    icon: "🔊",
    category: "iot",
    color: "#34D399",
  },
  "smart-tv": {
    label: "Smart TV",
    icon: "📺",
    category: "iot",
    color: "#34D399",
  },
  "smart-watch": {
    label: "Smart Watch",
    icon: "⌚",
    category: "iot",
    color: "#34D399",
  },
  "smart-glasses": {
    label: "Smart Glasses",
    icon: "👓",
    category: "iot",
    color: "#34D399",
  },

  // Monitoring
  "network-monitor": {
    label: "Network Monitor",
    icon: "📊",
    category: "monitoring",
    color: "#06B6D4",
  },
  "performance-monitor": {
    label: "Performance Monitor",
    icon: "📊",
    category: "monitoring",
    color: "#06B6D4",
  },
  "traffic-analyzer": {
    label: "Traffic Analyzer",
    icon: "📊",
    category: "monitoring",
    color: "#06B6D4",
  },
  "packet-analyzer": {
    label: "Packet Analyzer",
    icon: "📡",
    category: "monitoring",
    color: "#06B6D4",
  },
  "network-scanner": {
    label: "Network Scanner",
    icon: "🔍",
    category: "monitoring",
    color: "#06B6D4",
  },
  "vulnerability-scanner": {
    label: "Vulnerability Scanner",
    icon: "🔍",
    category: "monitoring",
    color: "#06B6D4",
  },

  // Internet
  internet: {
    label: "Internet",
    icon: "🌐",
    category: "core",
    color: "#3B82F6",
  },
};

export const CABLE_METADATA: Record<CableType, CableMetadata> = {
  // Copper
  ethernet: {
    label: "Ethernet",
    color: "#10B981",
    strokeWidth: 2,
    category: "copper",
  },
  coaxial: {
    label: "Coaxial",
    color: "#F59E0B",
    strokeWidth: 2.5,
    category: "copper",
  },
  serial: {
    label: "Serial",
    color: "#8B5CF6",
    strokeWidth: 2,
    category: "copper",
  },
  usb: { label: "USB", color: "#3B82F6", strokeWidth: 2, category: "copper" },
  "usb-c": {
    label: "USB-C",
    color: "#6366F1",
    strokeWidth: 2,
    category: "copper",
  },
  thunderbolt: {
    label: "Thunderbolt",
    color: "#EC4899",
    strokeWidth: 2,
    category: "copper",
  },
  firewire: {
    label: "FireWire",
    color: "#F472B6",
    strokeWidth: 2,
    category: "copper",
  },

  // Fiber
  "fiber-single-mode": {
    label: "Fiber (SM)",
    color: "#00A5E0",
    strokeWidth: 3,
    category: "fiber",
  },
  "fiber-multi-mode": {
    label: "Fiber (MM)",
    color: "#06B6D4",
    strokeWidth: 2.5,
    category: "fiber",
  },

  // Power
  power: {
    label: "Power",
    color: "#EF4444",
    strokeWidth: 3,
    category: "power",
  },

  // Display
  hdmi: {
    label: "HDMI",
    color: "#F97316",
    strokeWidth: 2.5,
    category: "display",
  },
  displayport: {
    label: "DisplayPort",
    color: "#A855F7",
    strokeWidth: 2,
    category: "display",
  },
  dvi: { label: "DVI", color: "#8B5CF6", strokeWidth: 2, category: "display" },
  vga: { label: "VGA", color: "#6B7280", strokeWidth: 2, category: "display" },

  // Storage
  sata: {
    label: "SATA",
    color: "#22D3EE",
    strokeWidth: 2,
    category: "storage",
  },
  sas: { label: "SAS", color: "#2DD4BF", strokeWidth: 2, category: "storage" },

  // Other
  console: {
    label: "Console",
    color: "#FCD34D",
    strokeWidth: 2,
    strokeDasharray: "5,5",
    category: "other",
  },
  "patch-cord": {
    label: "Patch Cord",
    color: "#34D399",
    strokeWidth: 1.5,
    category: "other",
  },
  bluetooth: {
    label: "Bluetooth",
    color: "#3B82F6",
    strokeWidth: 1.5,
    strokeDasharray: "3,3",
    category: "other",
  },
  wifi: {
    label: "Wi-Fi",
    color: "#FCD34D",
    strokeWidth: 1.5,
    strokeDasharray: "3,3",
    category: "other",
  },
};

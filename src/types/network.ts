import { LucideIcon } from "lucide-react";
import {
  // Core Network
  Router,
  GitMerge,
  Shield,
  Signal,
  Network,
  Cable,
  RefreshCw,
  Globe,
  Scale,
  // End Devices
  Monitor,
  Server,
  Laptop,
  Printer,
  Phone,
  Tablet,
  Smartphone,
  User,
  Building2,
  // Wireless
  Wifi,
  Gamepad2,
  Antenna,
  Radar,
  // Security
  Eye,
  ShieldCheck,
  Lock,
  ShieldAlert,
  ShieldHalf,
  LockKeyhole,
  // Storage
  HardDrive,
  Database,
  // Cloud
  Cloud,
  Cpu,
  Box,
  Hexagon,
  // Services
  GlobeLock,
  Settings,
  KeyRound,
  Fingerprint,
  Scroll,
  Clock,
  Activity,
  // Specialized
  Gauge,
  Zap,
  // IoT
  Scan,
  SwitchCamera,
  Volume2,
  Watch,
  // Monitoring
  Search,
} from "lucide-react";

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
  icon: LucideIcon; // Changed from string to LucideIcon
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
  icon?: LucideIcon | null; // Changed from string to LucideIcon
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
  router: { label: "Router", icon: Router, category: "core", color: "#3B82F6" },
  switch: {
    label: "Switch",
    icon: GitMerge,
    category: "core",
    color: "#10B981",
  },
  firewall: {
    label: "Firewall",
    icon: Shield,
    category: "security",
    color: "#EF4444",
  },
  modem: { label: "Modem", icon: Signal, category: "core", color: "#F59E0B" },
  hub: { label: "Hub", icon: Network, category: "core", color: "#8B5CF6" },
  bridge: { label: "Bridge", icon: Cable, category: "core", color: "#EC4899" },
  repeater: {
    label: "Repeater",
    icon: RefreshCw,
    category: "core",
    color: "#F97316",
  },
  gateway: {
    label: "Gateway",
    icon: Globe,
    category: "core",
    color: "#06B6D4",
  },
  "multilayer-switch": {
    label: "MLS",
    icon: GitMerge,
    category: "core",
    color: "#14B8A6",
  },
  "layer-3-switch": {
    label: "Layer 3 Switch",
    icon: GitMerge,
    category: "core",
    color: "#14B8A6",
  },
  "load-balancer": {
    label: "Load Balancer",
    icon: Scale,
    category: "core",
    color: "#6366F1",
  },
  "edge-router": {
    label: "Edge Router",
    icon: Router,
    category: "core",
    color: "#3B82F6",
  },
  "core-router": {
    label: "Core Router",
    icon: Router,
    category: "core",
    color: "#2563EB",
  },
  "distribution-switch": {
    label: "Distribution Switch",
    icon: GitMerge,
    category: "core",
    color: "#059669",
  },
  "core-switch": {
    label: "Core Switch",
    icon: GitMerge,
    category: "core",
    color: "#047857",
  },

  // End Devices
  pc: { label: "PC", icon: Monitor, category: "end-device", color: "#34D399" },
  server: {
    label: "Server",
    icon: Server,
    category: "server",
    color: "#8B5CF6",
  },
  laptop: {
    label: "Laptop",
    icon: Laptop,
    category: "end-device",
    color: "#34D399",
  },
  printer: {
    label: "Printer",
    icon: Printer,
    category: "end-device",
    color: "#F472B6",
  },
  "ip-phone": {
    label: "IP Phone",
    icon: Phone,
    category: "end-device",
    color: "#A78BFA",
  },
  tablet: {
    label: "Tablet",
    icon: Tablet,
    category: "end-device",
    color: "#60A5FA",
  },
  smartphone: {
    label: "Smartphone",
    icon: Smartphone,
    category: "end-device",
    color: "#60A5FA",
  },
  workstation: {
    label: "Workstation",
    icon: Monitor,
    category: "end-device",
    color: "#34D399",
  },
  "thin-client": {
    label: "Thin Client",
    icon: Monitor,
    category: "end-device",
    color: "#34D399",
  },
  terminal: {
    label: "Terminal",
    icon: Monitor,
    category: "end-device",
    color: "#34D399",
  },
  user: { label: "User", icon: User, category: "end-device", color: "#60A5FA" },
  building: {
    label: "Building",
    icon: Building2,
    category: "end-device",
    color: "#60A5FA",
  },

  // Wireless
  "wireless-ap": {
    label: "WAP",
    icon: Wifi,
    category: "wireless",
    color: "#FCD34D",
  },
  "access-point": {
    label: "AP",
    icon: Wifi,
    category: "wireless",
    color: "#FCD34D",
  },
  controller: {
    label: "Controller",
    icon: Gamepad2,
    category: "wireless",
    color: "#F59E0B",
  },
  "wireless-controller": {
    label: "Wireless Controller",
    icon: Gamepad2,
    category: "wireless",
    color: "#F59E0B",
  },
  "mesh-node": {
    label: "Mesh Node",
    icon: Wifi,
    category: "wireless",
    color: "#FCD34D",
  },
  "wireless-bridge": {
    label: "Wireless Bridge",
    icon: Antenna,
    category: "wireless",
    color: "#FCD34D",
  },
  "wi-fi-analyzer": {
    label: "Wi-Fi Analyzer",
    icon: Radar,
    category: "monitoring",
    color: "#F59E0B",
  },

  // Security
  ids: { label: "IDS", icon: Eye, category: "security", color: "#F87171" },
  ips: {
    label: "IPS",
    icon: ShieldCheck,
    category: "security",
    color: "#FCA5A5",
  },
  "vpn-concentrator": {
    label: "VPN",
    icon: Lock,
    category: "security",
    color: "#EC4899",
  },
  "vpn-gateway": {
    label: "VPN Gateway",
    icon: Lock,
    category: "security",
    color: "#EC4899",
  },
  "security-appliance": {
    label: "Security Appliance",
    icon: ShieldAlert,
    category: "security",
    color: "#EF4444",
  },
  "next-gen-firewall": {
    label: "NGFW",
    icon: ShieldCheck,
    category: "security",
    color: "#DC2626",
  },
  "web-application-firewall": {
    label: "WAF",
    icon: ShieldHalf,
    category: "security",
    color: "#EF4444",
  },
  "endpoint-security": {
    label: "Endpoint Security",
    icon: Shield,
    category: "security",
    color: "#EF4444",
  },
  "zero-trust": {
    label: "Zero Trust",
    icon: LockKeyhole,
    category: "security",
    color: "#EC4899",
  },

  // Servers
  "file-server": {
    label: "File Server",
    icon: Server,
    category: "server",
    color: "#8B5CF6",
  },
  "web-server": {
    label: "Web Server",
    icon: Server,
    category: "server",
    color: "#8B5CF6",
  },
  "mail-server": {
    label: "Mail Server",
    icon: Server,
    category: "server",
    color: "#8B5CF6",
  },
  "dns-server": {
    label: "DNS Server",
    icon: Globe,
    category: "server",
    color: "#8B5CF6",
  },
  "dhcp-server": {
    label: "DHCP Server",
    icon: Settings,
    category: "server",
    color: "#8B5CF6",
  },
  "app-server": {
    label: "App Server",
    icon: Server,
    category: "server",
    color: "#8B5CF6",
  },

  // Storage
  nas: { label: "NAS", icon: HardDrive, category: "storage", color: "#67E8F9" },
  "san-switch": {
    label: "SAN Switch",
    icon: Database,
    category: "storage",
    color: "#67E8F9",
  },
  "storage-array": {
    label: "Storage Array",
    icon: HardDrive,
    category: "storage",
    color: "#67E8F9",
  },
  "backup-server": {
    label: "Backup Server",
    icon: HardDrive,
    category: "storage",
    color: "#67E8F9",
  },

  // Cloud & Virtual
  cloud: { label: "Cloud", icon: Cloud, category: "cloud", color: "#A78BFA" },
  "aws-cloud": {
    label: "AWS",
    icon: Cloud,
    category: "cloud",
    color: "#F97316",
  },
  "azure-cloud": {
    label: "Azure",
    icon: Cloud,
    category: "cloud",
    color: "#3B82F6",
  },
  "gcp-cloud": {
    label: "GCP",
    icon: Cloud,
    category: "cloud",
    color: "#34D399",
  },
  "virtual-machine": {
    label: "VM",
    icon: Cpu,
    category: "cloud",
    color: "#A78BFA",
  },
  container: {
    label: "Container",
    icon: Box,
    category: "cloud",
    color: "#A78BFA",
  },
  kubernetes: {
    label: "Kubernetes",
    icon: Hexagon,
    category: "cloud",
    color: "#A78BFA",
  },
  docker: { label: "Docker", icon: Box, category: "cloud", color: "#A78BFA" },

  // Network Services
  dns: { label: "DNS", icon: GlobeLock, category: "service", color: "#06B6D4" },
  dhcp: {
    label: "DHCP",
    icon: Settings,
    category: "service",
    color: "#06B6D4",
  },
  proxy: {
    label: "Proxy",
    icon: ShieldHalf,
    category: "service",
    color: "#06B6D4",
  },
  "web-proxy": {
    label: "Web Proxy",
    icon: ShieldHalf,
    category: "service",
    color: "#06B6D4",
  },
  "reverse-proxy": {
    label: "Reverse Proxy",
    icon: ShieldHalf,
    category: "service",
    color: "#06B6D4",
  },
  "radius-server": {
    label: "RADIUS",
    icon: KeyRound,
    category: "service",
    color: "#06B6D4",
  },
  "tacacs-server": {
    label: "TACACS+",
    icon: Fingerprint,
    category: "service",
    color: "#06B6D4",
  },
  "syslog-server": {
    label: "Syslog",
    icon: Scroll,
    category: "service",
    color: "#06B6D4",
  },
  "ntp-server": {
    label: "NTP",
    icon: Clock,
    category: "service",
    color: "#06B6D4",
  },
  "snmp-server": {
    label: "SNMP",
    icon: Activity,
    category: "service",
    color: "#06B6D4",
  },
  "sftp-server": {
    label: "SFTP",
    icon: Database,
    category: "service",
    color: "#06B6D4",
  },
  "ftp-server": {
    label: "FTP",
    icon: Database,
    category: "service",
    color: "#06B6D4",
  },

  // Specialized Network
  "wan-optimizer": {
    label: "WAN Optimizer",
    icon: Gauge,
    category: "core",
    color: "#F59E0B",
  },
  "traffic-shaping": {
    label: "Traffic Shaping",
    icon: Activity,
    category: "core",
    color: "#F59E0B",
  },
  qos: { label: "QoS", icon: Gauge, category: "core", color: "#F59E0B" },
  "bandwidth-manager": {
    label: "Bandwidth Manager",
    icon: Zap,
    category: "core",
    color: "#F59E0B",
  },

  // IoT
  "iot-device": {
    label: "IoT Device",
    icon: Box,
    category: "iot",
    color: "#34D399",
  },
  "smart-sensor": {
    label: "Smart Sensor",
    icon: Scan,
    category: "iot",
    color: "#34D399",
  },
  "smart-camera": {
    label: "Smart Camera",
    icon: SwitchCamera,
    category: "iot",
    color: "#34D399",
  },
  "smart-lock": {
    label: "Smart Lock",
    icon: LockKeyhole,
    category: "iot",
    color: "#34D399",
  },
  "smart-light": {
    label: "Smart Light",
    icon: Zap,
    category: "iot",
    color: "#34D399",
  },
  "smart-thermostat": {
    label: "Smart Thermostat",
    icon: Settings,
    category: "iot",
    color: "#34D399",
  },
  "smart-speaker": {
    label: "Smart Speaker",
    icon: Volume2,
    category: "iot",
    color: "#34D399",
  },
  "smart-tv": {
    label: "Smart TV",
    icon: Monitor,
    category: "iot",
    color: "#34D399",
  },
  "smart-watch": {
    label: "Smart Watch",
    icon: Watch,
    category: "iot",
    color: "#34D399",
  },
  "smart-glasses": {
    label: "Smart Glasses",
    icon: Eye,
    category: "iot",
    color: "#34D399",
  },

  // Monitoring
  "network-monitor": {
    label: "Network Monitor",
    icon: Activity,
    category: "monitoring",
    color: "#06B6D4",
  },
  "performance-monitor": {
    label: "Performance Monitor",
    icon: Gauge,
    category: "monitoring",
    color: "#06B6D4",
  },
  "traffic-analyzer": {
    label: "Traffic Analyzer",
    icon: Radar,
    category: "monitoring",
    color: "#06B6D4",
  },
  "packet-analyzer": {
    label: "Packet Analyzer",
    icon: Search,
    category: "monitoring",
    color: "#06B6D4",
  },
  "network-scanner": {
    label: "Network Scanner",
    icon: Search,
    category: "monitoring",
    color: "#06B6D4",
  },
  "vulnerability-scanner": {
    label: "Vulnerability Scanner",
    icon: Shield,
    category: "monitoring",
    color: "#06B6D4",
  },

  // Internet
  internet: {
    label: "Internet",
    icon: Globe,
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

// ===== HELPER FUNCTIONS =====
export function getDeviceMetadata(type: DeviceType): DeviceMetadata {
  return DEVICE_METADATA[type];
}

export function getCableMetadata(type: CableType): CableMetadata {
  return CABLE_METADATA[type];
}

export function getDeviceIcon(type: DeviceType): LucideIcon {
  return DEVICE_METADATA[type]?.icon || Monitor;
}

export function getDeviceColor(type: DeviceType): string {
  return DEVICE_METADATA[type]?.color || "#6B7280";
}

export function getDeviceLabel(type: DeviceType): string {
  return DEVICE_METADATA[type]?.label || type;
}

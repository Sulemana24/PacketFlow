import { Handle, Position } from "reactflow";
import {
  Monitor,
  Laptop,
  Router,
  Server,
  Wifi,
  Printer,
  HardDrive,
  Shield,
  ShieldCheck,
  ShieldHalf,
  Globe,
  Radio,
  Database,
  Tablet,
  Smartphone,
  GitBranch,
  GitMerge,
  Zap,
  Settings,
  Activity,
  Network,
  Cable,
  Cloud,
  Lock,
  Eye,
  Scale,
  Disc,
  Phone,
  Waypoints,
  DoorOpen,
  Gauge,
  Cpu,
  RefreshCw,
  GlobeLock,
  User,
  Building2,
  SwitchCamera,
  Signal,
  Antenna,
  HardDrive as HardDriveIcon,
  Database as DatabaseIcon,
  Box,
  Hexagon,
  ShieldAlert,
  LockKeyhole,
  KeyRound,
  Fingerprint,
  Scan,
  Radar,
  Scroll,
  Clock,
  Search,
  Volume2,
  Watch,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface CustomNodeProps {
  data: {
    type: string;
    label: string;
    icon?: LucideIcon; // Changed from 'any' to LucideIcon
    ipAddress?: string;
    macAddress?: string;
    status?: string;
  };
  selected?: boolean;
}

export default function CustomNode({ data, selected }: CustomNodeProps) {
  const getIcon = () => {
    // If icon is passed as a component, render it
    if (data.icon) {
      const IconComponent = data.icon;
      return <IconComponent size={20} className="text-[#00A5E0]" />;
    }

    // Comprehensive icons mapping for all device types
    const icons: Record<string, LucideIcon> = {
      // Changed from 'any' to LucideIcon
      // ======================
      // End Devices
      // ======================
      pc: Monitor,
      laptop: Laptop,
      tablet: Tablet,
      smartphone: Smartphone,
      printer: Printer,
      "ip-phone": Phone,
      user: User,
      building: Building2,
      workstation: Monitor,
      "thin-client": Monitor,
      terminal: Monitor,

      // ======================
      // Infrastructure & Core Network
      // ======================
      router: Router,
      switch: GitMerge,
      "multilayer-switch": GitBranch,
      "layer-3-switch": GitBranch,
      hub: Network,
      bridge: Cable,
      repeater: RefreshCw,
      "access-point": Wifi,
      "wireless-ap": Wifi,
      modem: Router,
      gateway: Globe,
      controller: Cpu,
      internet: Globe,
      "edge-router": Router,
      "core-router": Router,
      "distribution-switch": GitMerge,
      "core-switch": GitMerge,

      // ======================
      // Security
      // ======================
      firewall: Shield,
      ids: Eye,
      ips: ShieldCheck,
      "vpn-concentrator": Lock,
      "vpn-gateway": Lock,
      "security-appliance": ShieldAlert,
      "next-gen-firewall": ShieldCheck,
      "web-application-firewall": ShieldHalf,
      "endpoint-security": ShieldCheck,
      "zero-trust": LockKeyhole,

      // ======================
      // Servers & Storage
      // ======================
      server: Server,
      nas: HardDrive,
      database: Database,
      cloud: Cloud,
      "file-server": Server,
      "web-server": Server,
      "mail-server": Server,
      "dns-server": Server,
      "dhcp-server": Server,
      "app-server": Server,
      "san-switch": Database,
      "storage-array": HardDriveIcon,
      "backup-server": DatabaseIcon,

      // ======================
      // Specialized Network
      // ======================
      "load-balancer": Scale,
      dns: GlobeLock,
      dhcp: Globe,
      proxy: ShieldHalf,
      "web-proxy": ShieldHalf,
      "reverse-proxy": ShieldHalf,
      "wan-optimizer": Gauge,
      "traffic-shaping": Activity,
      qos: Gauge,
      "bandwidth-manager": Zap,

      // ======================
      // Wireless
      // ======================
      "wireless-controller": Signal,
      "mesh-node": Radio,
      "wireless-bridge": Antenna,
      "wi-fi-analyzer": Radar,

      // ======================
      // IoT & Smart Devices
      // ======================
      "iot-device": Box,
      "smart-sensor": Scan,
      "smart-camera": SwitchCamera,
      "smart-lock": LockKeyhole,
      "smart-light": Zap,
      "smart-thermostat": Settings,
      "smart-speaker": Volume2,
      "smart-tv": Monitor,
      "smart-watch": Watch,
      "smart-glasses": Eye,

      // ======================
      // Network Services
      // ======================
      "radius-server": KeyRound,
      "tacacs-server": Fingerprint,
      "syslog-server": Scroll,
      "ntp-server": Clock,
      "snmp-server": Activity,
      "sftp-server": Database,
      "ftp-server": Database,

      // ======================
      // Cloud & Virtual
      // ======================
      "virtual-machine": Cpu,
      container: Box,
      kubernetes: Hexagon,
      docker: Box,
      "aws-cloud": Cloud,
      "azure-cloud": Cloud,
      "gcp-cloud": Cloud,

      // ======================
      // Monitoring & Management
      // ======================
      "network-monitor": Activity,
      "performance-monitor": Gauge,
      "traffic-analyzer": Radar,
      "packet-analyzer": Scan,
      "network-scanner": Search,
      "vulnerability-scanner": ShieldAlert,
    };

    const IconComponent = icons[data.type] || Monitor;
    return <IconComponent size={20} className="text-[#00A5E0]" />;
  };

  // Get status color
  const getStatusColor = () => {
    if (!data.status) return "bg-green-500";
    switch (data.status.toLowerCase()) {
      case "active":
      case "online":
      case "running":
        return "bg-green-500";
      case "inactive":
      case "offline":
      case "stopped":
        return "bg-red-500";
      case "warning":
      case "degraded":
        return "bg-yellow-500";
      case "maintenance":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get device type color border
  const getDeviceBorderColor = () => {
    const colors: Record<string, string> = {
      // Network Infrastructure - Blue
      router: "#3B82F6",
      switch: "#10B981",
      "multilayer-switch": "#14B8A6",
      hub: "#8B5CF6",
      bridge: "#EC4899",
      repeater: "#F97316",
      "access-point": "#FCD34D",
      "wireless-ap": "#FCD34D",
      modem: "#F59E0B",
      gateway: "#06B6D4",
      controller: "#6366F1",

      // Security - Red
      firewall: "#EF4444",
      ids: "#F87171",
      ips: "#FCA5A5",
      "vpn-concentrator": "#EC4899",

      // Servers - Purple
      server: "#8B5CF6",
      nas: "#67E8F9",
      database: "#A78BFA",
      cloud: "#A78BFA",

      // End Devices - Green
      pc: "#34D399",
      laptop: "#34D399",
      tablet: "#60A5FA",
      smartphone: "#60A5FA",
      printer: "#F472B6",
      "ip-phone": "#A78BFA",

      // Default
    };
    return colors[data.type] || "#00A5E0";
  };

  return (
    <div
      className={`
        px-3 py-2 rounded-lg shadow-lg transition-all cursor-pointer
        ${selected ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#1F2937]" : ""}
      `}
      style={{
        background: "#1F2937",
        border: `2px solid ${selected ? "#3B82F6" : getDeviceBorderColor()}`,
        minWidth: "120px",
      }}
    >
      {/* 4 Connection Points - Top, Left, Bottom, Right */}
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />

      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate">{data.label}</div>
          <div className="text-xs text-gray-400 capitalize truncate">
            {data.type.replace(/-/g, " ")}
          </div>
          {data.ipAddress && (
            <div className="text-[10px] text-gray-500 truncate">
              {data.ipAddress}
            </div>
          )}
          {data.status && (
            <div className="flex items-center gap-1 mt-1">
              <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor()}`} />
              <span className="text-[8px] text-gray-400 uppercase tracking-wider">
                {data.status}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

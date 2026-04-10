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
} from "lucide-react";

interface CustomNodeProps {
  data: {
    type: string;
    label: string;
    icon?: any;
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

    // Fallback icons mapping matching sidebar
    const icons: Record<string, any> = {
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

      // ======================
      // Infrastructure
      // ======================
      router: Router,
      switch: GitMerge,
      "multilayer-switch": GitBranch,
      hub: Network,
      bridge: Cable,
      repeater: RefreshCw,
      "access-point": Wifi,
      "wireless-ap": Wifi,
      modem: Router,
      gateway: Globe,
      controller: Cpu,
      internet: Globe,

      // ======================
      // Security
      // ======================
      firewall: Shield,
      ids: Eye,
      ips: ShieldCheck,
      "vpn-concentrator": Lock,

      // ======================
      // Servers & Storage
      // ======================
      server: Server,
      nas: HardDrive,
      database: Database,
      cloud: Cloud,

      // ======================
      // Specialized
      // ======================
      "load-balancer": Scale,
      dns: GlobeLock,
      dhcp: Globe,
      proxy: ShieldHalf,
    };

    const IconComponent = icons[data.type] || Monitor;
    return <IconComponent size={20} className="text-[#00A5E0]" />;
  };

  return (
    <div
      className={`
        px-3 py-2 rounded-lg shadow-lg transition-all cursor-pointer
        ${selected ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#1F2937]" : ""}
      `}
      style={{
        background: "#1F2937",
        border: selected ? "2px solid #3B82F6" : "2px solid #00A5E0",
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
            {data.type.replace("-", " ")}
          </div>
          {data.ipAddress && (
            <div className="text-[10px] text-gray-500 truncate">
              {data.ipAddress}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

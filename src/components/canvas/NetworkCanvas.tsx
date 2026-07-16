"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  MarkerType,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import type { NetworkNodeData } from "@/types/network";
import type { Node } from "reactflow";
import TextNode from "./TextNode";
import { findEdgePath } from "../../utils/findEdgePath";
import CustomNode from "./CustomNode";
import {
  Router,
  GitMerge,
  Shield,
  Wifi,
  Network,
  Cable,
  RefreshCw,
  Globe,
  Scale,
  Monitor,
  Server,
  Printer,
  Phone,
  Tablet,
  Smartphone,
  Laptop,
  Wifi as WifiIcon,
  Gamepad2,
  Eye,
  ShieldCheck,
  Lock,
  HardDrive,
  Cloud,
  Box,
  Radio,
  Signal,
  Database,
  Zap,
  Activity,
  Gauge,
  Cpu,
  GlobeLock,
  KeyRound,
  Fingerprint,
  Scroll,
  Clock,
  Search,
  Volume2,
  Watch,
  SwitchCamera,
  LockKeyhole,
  Scan,
  Radar,
  Hexagon,
  ShieldAlert,
  Type,
  Settings,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

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
  | "load-balancer"
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

// ===== COMPREHENSIVE CABLE TYPES =====
export type CableType =
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

const nodeTypes = {
  custom: CustomNode,
  text: TextNode,
};

type Packet = {
  path: string[];
  index: number;
};

// ===== CABLE STYLE CONFIGURATION =====
const getCableStyle = (type: CableType) => {
  const styles: Record<
    CableType,
    { stroke: string; strokeWidth: number; strokeDasharray?: string }
  > = {
    ethernet: { stroke: "#10B981", strokeWidth: 2 },
    coaxial: { stroke: "#F59E0B", strokeWidth: 2.5 },
    serial: { stroke: "#8B5CF6", strokeWidth: 2 },
    usb: { stroke: "#3B82F6", strokeWidth: 2 },
    "usb-c": { stroke: "#6366F1", strokeWidth: 2 },
    thunderbolt: { stroke: "#EC4899", strokeWidth: 2 },
    firewire: { stroke: "#F472B6", strokeWidth: 2 },
    "fiber-single-mode": { stroke: "#00A5E0", strokeWidth: 3 },
    "fiber-multi-mode": { stroke: "#06B6D4", strokeWidth: 2.5 },
    power: { stroke: "#EF4444", strokeWidth: 3 },
    hdmi: { stroke: "#F97316", strokeWidth: 2.5 },
    displayport: { stroke: "#A855F7", strokeWidth: 2 },
    dvi: { stroke: "#8B5CF6", strokeWidth: 2 },
    vga: { stroke: "#6B7280", strokeWidth: 2 },
    sata: { stroke: "#22D3EE", strokeWidth: 2 },
    sas: { stroke: "#2DD4BF", strokeWidth: 2 },
    console: { stroke: "#FCD34D", strokeWidth: 2, strokeDasharray: "5,5" },
    "patch-cord": { stroke: "#34D399", strokeWidth: 1.5 },
    wifi6: { stroke: "#FCD34D", strokeWidth: 2, strokeDasharray: "8,4" },
    wifi5: { stroke: "#FBBF24", strokeWidth: 2, strokeDasharray: "8,4" },
    cellular5g: { stroke: "#A78BFA", strokeWidth: 2, strokeDasharray: "6,4" },
    cellular4g: { stroke: "#8B5CF6", strokeWidth: 2, strokeDasharray: "6,4" },
    bluetooth: { stroke: "#3B82F6", strokeWidth: 2, strokeDasharray: "4,4" },
    zigbee: { stroke: "#F59E0B", strokeWidth: 1.5, strokeDasharray: "3,3" },
    lorawan: { stroke: "#EF4444", strokeWidth: 1.5, strokeDasharray: "3,3" },
  };
  return styles[type] || { stroke: "#6B7280", strokeWidth: 2 };
};

// ===== DEVICE ICONS AND LABELS =====
const getDeviceIcon = (type: DeviceType): LucideIcon => {
  const icons: Record<DeviceType, LucideIcon> = {
    router: Router,
    switch: GitMerge,
    firewall: Shield,
    modem: Signal,
    hub: Network,
    bridge: Cable,
    repeater: RefreshCw,
    gateway: Globe,
    "multilayer-switch": GitMerge,
    "load-balancer": Scale,
    pc: Monitor,
    server: Server,
    laptop: Laptop,
    printer: Printer,
    "ip-phone": Phone,
    tablet: Tablet,
    smartphone: Smartphone,
    workstation: Monitor,
    "thin-client": Monitor,
    terminal: Monitor,
    user: Monitor,
    building: Monitor,
    "wireless-ap": WifiIcon,
    "access-point": WifiIcon,
    controller: Gamepad2,
    "wireless-controller": Signal,
    "mesh-node": Radio,
    "wireless-bridge": Radio,
    "wi-fi-analyzer": Radar,
    ids: Eye,
    ips: ShieldCheck,
    "vpn-concentrator": Lock,
    "vpn-gateway": Lock,
    "security-appliance": ShieldAlert,
    "next-gen-firewall": ShieldCheck,
    "web-application-firewall": ShieldAlert,
    "endpoint-security": ShieldCheck,
    "zero-trust": LockKeyhole,
    "file-server": Server,
    "web-server": Server,
    "mail-server": Server,
    "dns-server": Server,
    "dhcp-server": Server,
    "app-server": Server,
    nas: HardDrive,
    "san-switch": Database,
    "storage-array": HardDrive,
    "backup-server": Database,
    cloud: Cloud,
    "aws-cloud": Cloud,
    "azure-cloud": Cloud,
    "gcp-cloud": Cloud,
    "virtual-machine": Cpu,
    container: Box,
    kubernetes: Hexagon,
    docker: Box,
    dns: GlobeLock,
    dhcp: Globe,
    proxy: Shield,
    "web-proxy": Shield,
    "reverse-proxy": Shield,
    "radius-server": KeyRound,
    "tacacs-server": Fingerprint,
    "syslog-server": Scroll,
    "ntp-server": Clock,
    "snmp-server": Activity,
    "sftp-server": Database,
    "ftp-server": Database,
    "wan-optimizer": Gauge,
    "traffic-shaping": Activity,
    qos: Gauge,
    "bandwidth-manager": Zap,
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
    "network-monitor": Activity,
    "performance-monitor": Gauge,
    "traffic-analyzer": Radar,
    "packet-analyzer": Search,
    "network-scanner": Search,
    "vulnerability-scanner": ShieldAlert,
    internet: Globe,
    database: Database,
    text: Type,
  };
  return icons[type] || Box;
};

const getDeviceLabel = (type: DeviceType): string => {
  const labels: Record<DeviceType, string> = {
    router: "Router",
    switch: "Switch",
    firewall: "Firewall",
    modem: "Modem",
    hub: "Hub",
    bridge: "Bridge",
    repeater: "Repeater",
    gateway: "Gateway",
    "multilayer-switch": "MLS",
    "load-balancer": "Load Balancer",
    pc: "PC",
    server: "Server",
    laptop: "Laptop",
    printer: "Printer",
    "ip-phone": "IP Phone",
    tablet: "Tablet",
    smartphone: "Smartphone",
    workstation: "Workstation",
    "thin-client": "Thin Client",
    terminal: "Terminal",
    user: "User",
    building: "Building",
    "wireless-ap": "WAP",
    "access-point": "AP",
    controller: "Controller",
    "wireless-controller": "Wireless Controller",
    "mesh-node": "Mesh Node",
    "wireless-bridge": "Wireless Bridge",
    "wi-fi-analyzer": "Wi-Fi Analyzer",
    ids: "IDS",
    ips: "IPS",
    "vpn-concentrator": "VPN Concentrator",
    "vpn-gateway": "VPN Gateway",
    "security-appliance": "Security Appliance",
    "next-gen-firewall": "NGFW",
    "web-application-firewall": "WAF",
    "endpoint-security": "Endpoint Security",
    "zero-trust": "Zero Trust",
    "file-server": "File Server",
    "web-server": "Web Server",
    "mail-server": "Mail Server",
    "dns-server": "DNS Server",
    "dhcp-server": "DHCP Server",
    "app-server": "App Server",
    nas: "NAS",
    "san-switch": "SAN Switch",
    "storage-array": "Storage Array",
    "backup-server": "Backup Server",
    cloud: "Cloud",
    "aws-cloud": "AWS Cloud",
    "azure-cloud": "Azure Cloud",
    "gcp-cloud": "GCP Cloud",
    "virtual-machine": "VM",
    container: "Container",
    kubernetes: "Kubernetes",
    docker: "Docker",
    dns: "DNS",
    dhcp: "DHCP",
    proxy: "Proxy",
    "web-proxy": "Web Proxy",
    "reverse-proxy": "Reverse Proxy",
    "radius-server": "RADIUS",
    "tacacs-server": "TACACS+",
    "syslog-server": "Syslog",
    "ntp-server": "NTP",
    "snmp-server": "SNMP",
    "sftp-server": "SFTP",
    "ftp-server": "FTP",
    "wan-optimizer": "WAN Optimizer",
    "traffic-shaping": "Traffic Shaping",
    qos: "QoS",
    "bandwidth-manager": "Bandwidth Manager",
    "iot-device": "IoT Device",
    "smart-sensor": "Smart Sensor",
    "smart-camera": "Smart Camera",
    "smart-lock": "Smart Lock",
    "smart-light": "Smart Light",
    "smart-thermostat": "Smart Thermostat",
    "smart-speaker": "Smart Speaker",
    "smart-tv": "Smart TV",
    "smart-watch": "Smart Watch",
    "smart-glasses": "Smart Glasses",
    "network-monitor": "Network Monitor",
    "performance-monitor": "Performance Monitor",
    "traffic-analyzer": "Traffic Analyzer",
    "packet-analyzer": "Packet Analyzer",
    "network-scanner": "Network Scanner",
    "vulnerability-scanner": "Vulnerability Scanner",
    internet: "Internet",
    database: "Database",
    text: "Text",
  };
  return labels[type] || type.toUpperCase().replace("-", " ");
};

const getDeviceColor = (type: DeviceType): string => {
  const colors: Record<DeviceType, string> = {
    router: "#3B82F6",
    switch: "#10B981",
    firewall: "#EF4444",
    modem: "#F59E0B",
    hub: "#8B5CF6",
    bridge: "#EC4899",
    repeater: "#F97316",
    gateway: "#06B6D4",
    "multilayer-switch": "#14B8A6",
    "load-balancer": "#6366F1",
    pc: "#34D399",
    server: "#60A5FA",
    laptop: "#34D399",
    printer: "#F472B6",
    "ip-phone": "#A78BFA",
    tablet: "#60A5FA",
    smartphone: "#60A5FA",
    workstation: "#34D399",
    "thin-client": "#6B7280",
    terminal: "#6B7280",
    user: "#34D399",
    building: "#F59E0B",
    "wireless-ap": "#FCD34D",
    "access-point": "#FCD34D",
    controller: "#F59E0B",
    "wireless-controller": "#F59E0B",
    "mesh-node": "#FCD34D",
    "wireless-bridge": "#FCD34D",
    "wi-fi-analyzer": "#FCD34D",
    ids: "#F87171",
    ips: "#FCA5A5",
    "vpn-concentrator": "#EC4899",
    "vpn-gateway": "#EC4899",
    "security-appliance": "#EF4444",
    "next-gen-firewall": "#EF4444",
    "web-application-firewall": "#EF4444",
    "endpoint-security": "#EF4444",
    "zero-trust": "#EF4444",
    "file-server": "#8B5CF6",
    "web-server": "#8B5CF6",
    "mail-server": "#8B5CF6",
    "dns-server": "#8B5CF6",
    "dhcp-server": "#8B5CF6",
    "app-server": "#8B5CF6",
    nas: "#67E8F9",
    "san-switch": "#67E8F9",
    "storage-array": "#67E8F9",
    "backup-server": "#67E8F9",
    cloud: "#A78BFA",
    "aws-cloud": "#F97316",
    "azure-cloud": "#3B82F6",
    "gcp-cloud": "#34D399",
    "virtual-machine": "#8B5CF6",
    container: "#6366F1",
    kubernetes: "#6366F1",
    docker: "#6366F1",
    dns: "#06B6D4",
    dhcp: "#06B6D4",
    proxy: "#8B5CF6",
    "web-proxy": "#8B5CF6",
    "reverse-proxy": "#8B5CF6",
    "radius-server": "#8B5CF6",
    "tacacs-server": "#8B5CF6",
    "syslog-server": "#6B7280",
    "ntp-server": "#6B7280",
    "snmp-server": "#6B7280",
    "sftp-server": "#6B7280",
    "ftp-server": "#6B7280",
    "wan-optimizer": "#F97316",
    "traffic-shaping": "#F97316",
    qos: "#F97316",
    "bandwidth-manager": "#F97316",
    "iot-device": "#10B981",
    "smart-sensor": "#10B981",
    "smart-camera": "#10B981",
    "smart-lock": "#10B981",
    "smart-light": "#10B981",
    "smart-thermostat": "#10B981",
    "smart-speaker": "#10B981",
    "smart-tv": "#10B981",
    "smart-watch": "#10B981",
    "smart-glasses": "#10B981",
    "network-monitor": "#6366F1",
    "performance-monitor": "#6366F1",
    "traffic-analyzer": "#6366F1",
    "packet-analyzer": "#6366F1",
    "network-scanner": "#6366F1",
    "vulnerability-scanner": "#6366F1",
    internet: "#06B6D4",
    database: "#A78BFA",
    text: "#6B7280",
  };
  return colors[type] || "#6B7280";
};

interface NetworkCanvasProps {
  onDropNode?: (type: DeviceType, position: { x: number; y: number }) => void;
  isMobile?: boolean;
}

export default function NetworkCanvas({
  onDropNode,
  isMobile = false,
}: NetworkCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [connectionMode, setConnectionMode] = useState<CableType | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [sourceNodeId, setSourceNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [packet, setPacket] = useState<Packet | null>(null);
  const [packetPosition, setPacketPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const animationRef = useRef<number | null>(null);
  const animatePacketRef = useRef<
    ((path: string[], index: number) => void) | null
  >(null);

  // ===== Toast notification for feedback =====
  const showToast = useCallback(
    (message: string, type: "info" | "success" | "error" = "info") => {
      const colors = {
        info: "border-[#00A5E0]",
        success: "border-green-500",
        error: "border-red-500",
      };

      const toast = document.createElement("div");
      toast.className = `fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-[#1F2937] border ${colors[type]} rounded-lg px-4 py-2 z-[9999] text-white text-sm shadow-lg transition-all duration-300`;
      toast.textContent = message;
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 2000);
    },
    [],
  );

  // ===== Handle sidebar item drop via custom event =====
  useEffect(() => {
    const handleSidebarDrop = (event: CustomEvent) => {
      const { itemType, type, label, category, speed } = event.detail;

      console.log(`📦 Sidebar drop event: ${itemType} - ${type} (${label})`);

      if (!reactFlowInstance) {
        console.error("No reactFlowInstance!");
        showToast("Error: Canvas not ready", "error");
        return;
      }

      // Get viewport center
      const viewportCenter = reactFlowInstance.screenToFlowPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });

      // Add slight random offset to avoid stacking
      const randomOffset = () => (Math.random() - 0.5) * 200;
      const position = {
        x: viewportCenter.x + randomOffset(),
        y: viewportCenter.y + randomOffset(),
      };

      let newNodeId: string | null = null;

      if (itemType === "device") {
        const typedDeviceType = type as DeviceType;

        if (typedDeviceType === "text") {
          const newNode: Node = {
            id: crypto.randomUUID(),
            type: "text",
            position,
            data: {
              text: "Double-click to edit",
              fontSize: 14,
              color: "#ffffff",
            },
            style: {
              background: "#1F2937",
              border: "2px solid #00A5E0",
              borderRadius: "8px",
              padding: "10px",
            },
          };
          newNodeId = newNode.id;
          setNodes((nds) => [...nds, newNode]);
          showToast(`📝 Added text node`, "success");
        } else {
          const IconComponent = getDeviceIcon(typedDeviceType);
          const newNode: Node<NetworkNodeData> = {
            id: crypto.randomUUID(),
            type: "custom",
            position,
            data: {
              type: typedDeviceType,
              label: label || getDeviceLabel(typedDeviceType),
              icon: IconComponent,
              status: "online",
            },
            style: {
              background: "#1F2937",
              color: "#fff",
              border: `2px solid ${getDeviceColor(typedDeviceType)}`,
              borderRadius: "8px",
              padding: "10px",
              width: 130,
            },
          };
          newNodeId = newNode.id;
          setNodes((nds) => [...nds, newNode]);
          onDropNode?.(typedDeviceType, position);
          showToast(
            `✅ Added ${label || getDeviceLabel(typedDeviceType)}`,
            "success",
          );
        }

        // Pan to the new node on mobile
        if (isMobile && newNodeId) {
          setTimeout(() => {
            const node = reactFlowInstance.getNode(newNodeId!);
            if (node) {
              // Center the view on the new node
              reactFlowInstance.fitView({
                nodes: [node],
                padding: 0.3,
                duration: 500,
              });
              // Zoom in slightly to make it more visible
              setTimeout(() => {
                reactFlowInstance.zoomTo(1.2, {
                  duration: 300,
                });
              }, 400);
            }
          }, 100);
        }
      } else if (itemType === "cable") {
        const cableType = type as CableType;
        setConnectionMode(cableType);
        document.body.style.cursor = "crosshair";
        showToast(`🔌 Click two devices to connect with ${label}`, "info");
      }
    };

    document.addEventListener(
      "sidebar-item-drop",
      handleSidebarDrop as EventListener,
    );

    return () => {
      document.removeEventListener(
        "sidebar-item-drop",
        handleSidebarDrop as EventListener,
      );
    };
  }, [reactFlowInstance, setNodes, onDropNode, showToast, isMobile]);

  // ===== Listen for cable drag events from sidebar (desktop only) =====
  useEffect(() => {
    const handleDragStart = (event: DragEvent) => {
      if (isMobile) return;
      const itemType = event.dataTransfer?.getData("item-type");
      const cableType = event.dataTransfer?.getData("cable-type");

      if (itemType === "cable" && cableType) {
        setConnectionMode(cableType as CableType);
        document.body.style.cursor = "crosshair";
        showToast(`🔌 Click two devices to connect`, "info");
      }
    };

    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("dragstart", handleDragStart);
      document.body.style.cursor = "default";
    };
  }, [isMobile, showToast]);

  // ===== Connection handling =====
  const onConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) return;

      const cableType = connectionMode || "ethernet";

      const newEdge: Edge = {
        id: `edge-${connection.source}-${connection.target}-${crypto.randomUUID()}`,
        source: connection.source,
        target: connection.target,
        sourceHandle: connection.sourceHandle ?? undefined,
        targetHandle: connection.targetHandle ?? undefined,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00A5E0" },
        style: getCableStyle(cableType),
        label: cableType.toUpperCase().replace("-", " "),
        labelStyle: { fill: "#9CA3AF", fontSize: 10 },
        labelBgStyle: { fill: "#1F2937" },
        data: { cableType },
      };

      setEdges((eds) => addEdge(newEdge, eds));
      setConnectionMode(null);
      document.body.style.cursor = "default";
      showToast(`🔗 Connected devices with ${cableType}`, "success");
    },
    [setEdges, connectionMode, showToast],
  );

  const resetConnectionMode = useCallback(() => {
    setConnectionMode(null);
    setIsConnecting(false);
    setSourceNodeId(null);
    setSelectedNodeId(null);
    document.body.style.cursor = "default";
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        style: { ...n.style, border: "2px solid #00A5E0", boxShadow: "none" },
      })),
    );
  }, [setNodes]);

  // ===== Node click for cable connection =====
  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.stopPropagation();

      if (connectionMode) {
        if (!isConnecting) {
          setSourceNodeId(node.id);
          setIsConnecting(true);
          setSelectedNodeId(node.id);
          setNodes((nds) =>
            nds.map((n) => ({
              ...n,
              style:
                n.id === node.id
                  ? {
                      ...n.style,
                      border: "3px solid #10B981",
                      boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.3)",
                    }
                  : {
                      ...n.style,
                      border: "2px solid #00A5E0",
                      boxShadow: "none",
                    },
            })),
          );
        } else {
          if (sourceNodeId && sourceNodeId !== node.id) {
            const newEdge: Edge = {
              id: `edge-${sourceNodeId}-${node.id}-${crypto.randomUUID()}`,
              source: sourceNodeId,
              target: node.id,
              type: "smoothstep",
              markerEnd: { type: MarkerType.ArrowClosed, color: "#00A5E0" },
              style: getCableStyle(connectionMode),
              label: connectionMode.toUpperCase().replace("-", " "),
              labelStyle: { fill: "#9CA3AF", fontSize: 10 },
              labelBgStyle: { fill: "#1F2937" },
              data: { cableType: connectionMode },
            };
            setEdges((eds) => eds.concat(newEdge));
            showToast(`🔗 Connected devices with ${connectionMode}`, "success");
          }
          resetConnectionMode();
        }
      } else {
        setSelectedNodeId(node.id);
      }
    },
    [
      connectionMode,
      isConnecting,
      sourceNodeId,
      setNodes,
      setEdges,
      resetConnectionMode,
      showToast,
    ],
  );

  // ===== Drop handler (desktop drag-and-drop) =====
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragOver(false);

      if (isMobile) return;

      const itemType = event.dataTransfer.getData("item-type");
      const deviceType = event.dataTransfer.getData("device-type");
      const cableType = event.dataTransfer.getData("cable-type");

      if (!reactFlowInstance) {
        console.error("No reactFlowInstance!");
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      if (itemType === "device" && deviceType) {
        console.log(`✅ Adding device: ${deviceType}`);

        if (deviceType === "text") {
          const newNode: Node = {
            id: crypto.randomUUID(),
            type: "text",
            position,
            data: {
              text: "Double-click to edit",
              fontSize: 14,
              color: "#ffffff",
            },
            style: {
              background: "#1F2937",
              border: "2px solid #00A5E0",
              borderRadius: "8px",
              padding: "10px",
            },
          };
          setNodes((nds) => [...nds, newNode]);
        } else {
          const typedDeviceType = deviceType as DeviceType;
          const IconComponent = getDeviceIcon(typedDeviceType);
          const newNode: Node<NetworkNodeData> = {
            id: crypto.randomUUID(),
            type: "custom",
            position,
            data: {
              type: typedDeviceType,
              label: getDeviceLabel(typedDeviceType),
              icon: IconComponent,
              status: "online",
            },
            style: {
              background: "#1F2937",
              color: "#fff",
              border: `2px solid ${getDeviceColor(typedDeviceType)}`,
              borderRadius: "8px",
              padding: "10px",
              width: 130,
            },
          };
          setNodes((nds) => [...nds, newNode]);
        }

        onDropNode?.(deviceType as DeviceType, position);
      } else if (itemType === "cable" && cableType) {
        console.log(`🔌 Enabling cable mode: ${cableType}`);
        setConnectionMode(cableType as CableType);
        document.body.style.cursor = "crosshair";
        showToast(`🔌 Click two devices to connect`, "info");
      }
    },
    [reactFlowInstance, setNodes, onDropNode, isMobile, showToast],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback((event: React.DragEvent) => {
    setIsDragOver(false);
  }, []);

  // ===== Handle delete key =====
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        if (selectedNodeId) {
          setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
          setEdges((eds) =>
            eds.filter(
              (edge) =>
                edge.source !== selectedNodeId &&
                edge.target !== selectedNodeId,
            ),
          );
          setSelectedNodeId(null);
          showToast(`🗑️ Deleted device`, "info");
        }
      } else if (event.key === "Escape" && connectionMode) {
        resetConnectionMode();
        showToast(`❌ Cancelled connection`, "info");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedNodeId,
    setNodes,
    setEdges,
    connectionMode,
    resetConnectionMode,
    showToast,
  ]);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  // ===== Packet animation =====
  const animatePacket = useCallback(
    (path: string[], index: number) => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      if (index >= path.length - 1 || !reactFlowInstance) {
        setPacket(null);
        setPacketPosition(null);
        return;
      }

      const from = reactFlowInstance.getNode(path[index]);
      const to = reactFlowInstance.getNode(path[index + 1]);

      if (!from || !to) return;

      const start = from.position;
      const end = to.position;

      const duration = 600;
      const startTime = Date.now();

      const animate = (time: number) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const eased =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        setPacketPosition({
          x: start.x + (end.x - start.x) * eased,
          y: start.y + (end.y - start.y) * eased,
        });

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setPacket({ path, index: index + 1 });
          setTimeout(() => {
            if (animatePacketRef.current) {
              animatePacketRef.current(path, index + 1);
            }
          }, 50);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    },
    [reactFlowInstance],
  );

  useEffect(() => {
    animatePacketRef.current = animatePacket;
  }, [animatePacket]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []);

  const sendPacket = useCallback(() => {
    if (nodes.length < 2) {
      showToast("⚠️ Need at least 2 devices", "error");
      return;
    }

    const source = nodes[0].id;
    const target = nodes[nodes.length - 1].id;

    const path = findEdgePath(edges, source, target);

    if (!path || path.length < 2) {
      showToast("⚠️ No valid path found", "error");
      return;
    }

    setPacket({ path, index: 0 });
    animatePacket(path, 0);
    showToast(`📦 Sending packet...`, "info");
  }, [nodes, edges, animatePacket, showToast]);

  return (
    <div
      className={`w-full h-full bg-[#0B0F19] relative transition-all ${
        isDragOver ? "ring-4 ring-[#00A5E0] ring-inset" : ""
      }`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      {/* Top Toolbar */}
      <div className="absolute top-4 right-4 z-50 flex gap-2 flex-wrap">
        <button
          onClick={sendPacket}
          className="px-4 py-2 bg-[#00A5E0] hover:bg-[#00A5E0]/90 rounded-lg font-semibold transition shadow-lg text-sm"
        >
          Send Packet
        </button>

        {selectedNodeId && (
          <button
            onClick={() => {
              setNodes((nds) =>
                nds.filter((node) => node.id !== selectedNodeId),
              );
              setEdges((eds) =>
                eds.filter(
                  (edge) =>
                    edge.source !== selectedNodeId &&
                    edge.target !== selectedNodeId,
                ),
              );
              setSelectedNodeId(null);
              showToast(`🗑️ Deleted device`, "info");
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition shadow-lg text-sm"
          >
            Delete Selected
          </button>
        )}

        {nodes.length > 0 && (
          <button
            onClick={() => {
              setNodes([]);
              setEdges([]);
              setSelectedNodeId(null);
              showToast(`🧹 Cleared canvas`, "info");
            }}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition shadow-lg text-sm"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Connection Mode Indicator */}
      {connectionMode && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#1F2937] border border-[#00A5E0] rounded-lg px-4 py-2 z-50 shadow-lg">
          <span className="text-sm">
            🔌 Connecting with {connectionMode.toUpperCase().replace("-", " ")}{" "}
            cable - Click on two devices
          </span>
          <button
            onClick={resetConnectionMode}
            className="ml-3 text-xs text-red-400 hover:text-red-300"
          >
            Cancel (Esc)
          </button>
        </div>
      )}

      {/* Selection Indicator */}
      {selectedNodeId && !connectionMode && (
        <div className="absolute bottom-4 left-4 z-50 bg-[#1F2937] border border-blue-500 rounded-lg px-3 py-1 text-xs">
          <span>📌 Device selected - Press Delete to remove</span>
        </div>
      )}

      {/* Mobile Hint */}
      {isMobile && nodes.length === 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
          <div className="bg-[#1F2937]/80 backdrop-blur-sm border border-[#1F2937] rounded-lg px-6 py-4 max-w-xs">
            <p className="text-gray-400 text-sm">
              👆 Tap devices from the sidebar to add them here
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Or drag & drop on desktop
            </p>
          </div>
        </div>
      )}

      {/* Packet Animation */}
      {packet && (
        <div className="absolute top-16 left-4 z-50 bg-black/80 px-3 py-1 rounded-lg">
          <span className="text-yellow-400 text-sm">
            📦 Packet moving... ({packet.index + 1}/{packet.path.length})
          </span>
        </div>
      )}

      {/* Canvas */}
      <div ref={reactFlowWrapper} className="w-full h-full">
        {packetPosition && (
          <div
            className="absolute w-3 h-3 bg-yellow-400 rounded-full z-50 shadow-lg"
            style={{
              left: packetPosition.x,
              top: packetPosition.y,
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 20px rgba(250, 204, 21, 0.5)",
            }}
          />
        )}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          fitView
          snapToGrid
          snapGrid={[15, 15]}
          deleteKeyCode={null}
        >
          <Background color="#1F2937" gap={20} size={1} />
          <Controls className="bg-[#1F2937] text-white" />
        </ReactFlow>
      </div>
    </div>
  );
}

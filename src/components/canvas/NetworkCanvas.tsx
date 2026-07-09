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
  ReactFlowProvider,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import type { NetworkNodeData } from "@/types/network";
import type { Node } from "reactflow";
import TextNode from "./TextNode";
import { findEdgePath } from "../../utils/findEdgePath";
import CustomNode from "./CustomNode";

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
  // Wireless
  | "wireless-ap"
  | "access-point"
  | "controller"
  // Security
  | "ids"
  | "ips"
  | "vpn-concentrator"
  // Storage
  | "nas"
  | "san-switch"
  // Cloud
  | "cloud"
  // Other
  | "hub"
  | "bridge";

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
  | "patch-cord";

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
    // Copper cables
    ethernet: { stroke: "#10B981", strokeWidth: 2 },
    coaxial: { stroke: "#F59E0B", strokeWidth: 2.5 },
    serial: { stroke: "#8B5CF6", strokeWidth: 2 },
    usb: { stroke: "#3B82F6", strokeWidth: 2 },
    "usb-c": { stroke: "#6366F1", strokeWidth: 2 },
    thunderbolt: { stroke: "#EC4899", strokeWidth: 2 },
    firewire: { stroke: "#F472B6", strokeWidth: 2 },
    // Fiber cables
    "fiber-single-mode": { stroke: "#00A5E0", strokeWidth: 3 },
    "fiber-multi-mode": { stroke: "#06B6D4", strokeWidth: 2.5 },
    // Power
    power: { stroke: "#EF4444", strokeWidth: 3 },
    // Display
    hdmi: { stroke: "#F97316", strokeWidth: 2.5 },
    displayport: { stroke: "#A855F7", strokeWidth: 2 },
    dvi: { stroke: "#8B5CF6", strokeWidth: 2 },
    vga: { stroke: "#6B7280", strokeWidth: 2 },
    // Storage
    sata: { stroke: "#22D3EE", strokeWidth: 2 },
    sas: { stroke: "#2DD4BF", strokeWidth: 2 },
    // Other
    console: { stroke: "#FCD34D", strokeWidth: 2, strokeDasharray: "5,5" },
    "patch-cord": { stroke: "#34D399", strokeWidth: 1.5 },
  };
  return styles[type] || { stroke: "#6B7280", strokeWidth: 2 };
};

// ===== DEVICE ICONS AND LABELS =====
const getDeviceIcon = (type: DeviceType): string => {
  const icons: Record<DeviceType, string> = {
    // Core Network
    router: "📡",
    switch: "🔀",
    firewall: "🛡️",
    modem: "📶",
    hub: "🔁",
    bridge: "🌉",
    repeater: "📤",
    gateway: "🚪",
    "multilayer-switch": "🔀",
    "load-balancer": "⚖️",
    // End Devices
    pc: "💻",
    server: "🖥️",
    laptop: "💻",
    printer: "🖨️",
    "ip-phone": "📞",
    tablet: "📱",
    smartphone: "📱",
    // Wireless
    "wireless-ap": "📶",
    "access-point": "📶",
    controller: "🎮",
    // Security
    ids: "🔍",
    ips: "🛡️",
    "vpn-concentrator": "🔐",
    // Storage
    nas: "💾",
    "san-switch": "💾",
    // Cloud
    cloud: "☁️",
  };
  return icons[type] || "📦";
};

const getDeviceLabel = (type: DeviceType): string => {
  const labels: Record<DeviceType, string> = {
    // Core Network
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
    // End Devices
    pc: "PC",
    server: "Server",
    laptop: "Laptop",
    printer: "Printer",
    "ip-phone": "IP Phone",
    tablet: "Tablet",
    smartphone: "Smartphone",
    // Wireless
    "wireless-ap": "WAP",
    "access-point": "AP",
    controller: "Controller",
    // Security
    ids: "IDS",
    ips: "IPS",
    "vpn-concentrator": "VPN",
    // Storage
    nas: "NAS",
    "san-switch": "SAN Switch",
    // Cloud
    cloud: "Cloud",
  };
  return labels[type] || type.toUpperCase();
};

const getDeviceColor = (type: DeviceType): string => {
  const colors: Record<DeviceType, string> = {
    // Core Network - Blue family
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
    // End Devices - Green/Teal family
    pc: "#34D399",
    server: "#60A5FA",
    laptop: "#34D399",
    printer: "#F472B6",
    "ip-phone": "#A78BFA",
    tablet: "#60A5FA",
    smartphone: "#60A5FA",
    // Wireless - Yellow/Orange
    "wireless-ap": "#FCD34D",
    "access-point": "#FCD34D",
    controller: "#F59E0B",
    // Security - Red/Pink
    ids: "#F87171",
    ips: "#FCA5A5",
    "vpn-concentrator": "#EC4899",
    // Storage - Cyan
    nas: "#67E8F9",
    "san-switch": "#67E8F9",
    // Cloud - Purple
    cloud: "#A78BFA",
  };
  return colors[type] || "#6B7280";
};

interface NetworkCanvasProps {
  onDropNode?: (type: DeviceType, position: { x: number; y: number }) => void;
}

export default function NetworkCanvas({ onDropNode }: NetworkCanvasProps) {
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

  // Use a ref to store animation frame ID for cleanup
  const animationRef = useRef<number | null>(null);
  // Use a ref to store the animation function for recursive calls
  const animatePacketRef = useRef<
    ((path: string[], index: number) => void) | null
  >(null);

  // Listen for cable drag events from sidebar
  useEffect(() => {
    const handleDragStart = (event: DragEvent) => {
      const itemType = event.dataTransfer?.getData("item-type");
      const cableType = event.dataTransfer?.getData("cable-type");

      if (itemType === "cable" && cableType) {
        setConnectionMode(cableType as CableType);
        document.body.style.cursor = "crosshair";
      }
    };

    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("dragstart", handleDragStart);
      document.body.style.cursor = "default";
    };
  }, []);

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
    },
    [setEdges, connectionMode],
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
    ],
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragOver(false);

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

      // Handle device drop
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
          const newNode: Node<NetworkNodeData> = {
            id: crypto.randomUUID(),
            type: "custom",
            position,
            data: {
              type: typedDeviceType,
              label: getDeviceLabel(typedDeviceType),
              icon: getDeviceIcon(typedDeviceType),
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
      }
      // Handle cable drop
      else if (itemType === "cable" && cableType) {
        console.log(`🔌 Enabling cable mode: ${cableType}`);
        setConnectionMode(cableType as CableType);
        document.body.style.cursor = "crosshair";
      }
    },
    [reactFlowInstance, setNodes, onDropNode],
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

  // Handle delete key
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
        }
      } else if (event.key === "Escape" && connectionMode) {
        resetConnectionMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNodeId, setNodes, setEdges, connectionMode, resetConnectionMode]);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  // Define the animation function using useCallback with proper dependencies
  const animatePacket = useCallback(
    (path: string[], index: number) => {
      // Cancel any existing animation
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
        // Use easeInOut for smoother animation
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
          // Use setTimeout to avoid stack overflow and allow state updates
          setTimeout(() => {
            // Use the ref to call the function recursively
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

  // Set the ref to point to the animatePacket function
  useEffect(() => {
    animatePacketRef.current = animatePacket;
  }, [animatePacket]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []);

  const sendPacket = useCallback(() => {
    if (nodes.length < 2) return;

    const source = nodes[0].id;
    const target = nodes[nodes.length - 1].id;

    const path = findEdgePath(edges, source, target);

    if (!path || path.length < 2) {
      console.log("No valid path found");
      return;
    }

    setPacket({
      path,
      index: 0,
    });

    animatePacket(path, 0);
  }, [nodes, edges, animatePacket]);

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
      <div className="absolute top-4 right-4 z-50 flex gap-2">
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
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition shadow-lg text-sm"
          >
            Delete Selected
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

      {/* PACKET UI */}
      {packet && (
        <div className="absolute top-16 left-4 z-50 bg-black/80 px-3 py-1 rounded-lg">
          <span className="text-yellow-400 text-sm">
            📦 Packet moving... ({packet.index + 1}/{packet.path.length})
          </span>
        </div>
      )}

      {/* CANVAS */}
      <div ref={reactFlowWrapper} className="w-full h-full">
        {packetPosition && (
          <div
            className="absolute w-3 h-3 bg-yellow-400 rounded-full z-50 shadow-lg"
            style={{
              left: packetPosition.x,
              top: packetPosition.y,
              transform: "translate(-50%, -50%)",
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

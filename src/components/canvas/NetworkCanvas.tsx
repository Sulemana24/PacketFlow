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
} from "reactflow";
import "reactflow/dist/style.css";
import type { Packet, NetworkNodeData } from "@/types/network";
import type { Node } from "reactflow";
import TextNode from "./TextNode";

import CustomNode from "./CustomNode";

export type DeviceType =
  | "pc"
  | "router"
  | "switch"
  | "firewall"
  | "server"
  | "laptop"
  | "printer"
  | "wireless-ap"
  | "cloud"
  | "modem"
  | "hub"
  | "bridge"
  | "load-balancer"
  | "nas"
  | "ip-phone"
  | "tablet"
  | "smartphone"
  | "access-point"
  | "controller"
  | "multilayer-switch"
  | "repeater"
  | "gateway"
  | "ids"
  | "ips"
  | "vpn-concentrator";
export type CableType =
  | "ethernet"
  | "fiber"
  | "coaxial"
  | "serial"
  | "usb"
  | "hdmi"
  | "vga"
  | "dvi"
  | "thunderbolt"
  | "sata"
  | "power";

const nodeTypes = {
  custom: CustomNode,
  text: TextNode,
};

const getCableStyle = (type: string) => {};

const getDeviceLabel = (type: DeviceType): string => {
  const labels: Record<string, string> = {
    text: "Text",
  };
  return labels[type] || type.toUpperCase();
};

const getDeviceIcon = (type: DeviceType): any => {
  if (type === "text") return null;

  const icons: Record<string, any> = {};
  return icons[type] || Monitor;
};

interface NetworkCanvasProps {
  onDropNode?: (type: DeviceType, position: { x: number; y: number }) => void;
}

export default function NetworkCanvas({ onDropNode }: NetworkCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [packet, setPacket] = useState<Packet | null>(null);
  const [connectionMode, setConnectionMode] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [sourceNodeId, setSourceNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  // Listen for cable drag events from sidebar
  useEffect(() => {
    const handleDragStart = (event: DragEvent) => {
      const itemType = event.dataTransfer?.getData("item-type");
      const cableType = event.dataTransfer?.getData("cable-type");

      if (itemType === "cable" && cableType) {
        setConnectionMode(cableType);
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
      const cableType = connection.data?.cableType || "ethernet";
      const newEdge: Edge = {
        ...connection,
        id: `edge-${connection.source}-${connection.target}-${crypto.randomUUID()}`,
        type: "smoothstep",
        markerEnd: { type: MarkerType.ArrowClosed, color: "#00A5E0" },
        style: getCableStyle(cableType),
        label: cableType.toUpperCase(),
        labelStyle: { fill: "#9CA3AF", fontSize: 10 },
        labelBgStyle: { fill: "#1F2937" },
        data: { cableType },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges],
  );

  // Handle node click for connection mode
  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.stopPropagation();

      if (connectionMode) {
        if (!isConnecting) {
          // First node selected
          setSourceNodeId(node.id);
          setIsConnecting(true);
          setSelectedNodeId(node.id);
          // Visual feedback - highlight node
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
          // Second node selected - create connection
          if (sourceNodeId && sourceNodeId !== node.id) {
            const newEdge: Edge = {
              id: `edge-${sourceNodeId}-${node.id}-${crypto.randomUUID()}`,
              source: sourceNodeId,
              target: node.id,
              type: "smoothstep",
              markerEnd: { type: MarkerType.ArrowClosed, color: "#00A5E0" },
              style: getCableStyle(connectionMode),
              label: connectionMode.toUpperCase(),
              labelStyle: { fill: "#9CA3AF", fontSize: 10 },
              labelBgStyle: { fill: "#1F2937" },
              data: { cableType: connectionMode },
            };
            setEdges((eds) => eds.concat(newEdge));
          }
          // Reset connection mode
          resetConnectionMode();
        }
      } else {
        // Regular selection for deletion
        setSelectedNodeId(node.id);
      }
    },
    [connectionMode, isConnecting, sourceNodeId, setNodes, setEdges],
  );

  const resetConnectionMode = useCallback(() => {
    setConnectionMode(null);
    setIsConnecting(false);
    setSourceNodeId(null);
    setSelectedNodeId(null);
    document.body.style.cursor = "default";
    // Remove highlight from all nodes
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        style: { ...n.style, border: "2px solid #00A5E0", boxShadow: "none" },
      })),
    );
  }, [setNodes]);

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
          // Create a text node
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
          // Create a regular device node
          const newNode: Node<NetworkNodeData> = {
            id: crypto.randomUUID(),
            type: "custom",
            position,
            data: {
              type: deviceType as DeviceType,
              label: getDeviceLabel(deviceType as DeviceType),
              icon: getDeviceIcon(deviceType as DeviceType),
            },
            style: {
              background: "#1F2937",
              color: "#fff",
              border: "2px solid #00A5E0",
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
        setConnectionMode(cableType);
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
    console.log("Drag over canvas");
  }, []);

  const onDragLeave = useCallback((event: React.DragEvent) => {
    setIsDragOver(false);
    console.log("Drag left canvas");
  }, []);

  // Handle delete key for removing selected items
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        if (selectedNodeId) {
          // Remove selected node and its connected edges
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
        // Cancel connection mode with Escape key
        resetConnectionMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNodeId, setNodes, setEdges, connectionMode, resetConnectionMode]);

  // Handle canvas click to deselect
  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const sendPacket = useCallback(() => {
    if (nodes.length < 2) return;

    const path = [nodes[0].id, nodes[1].id];

    setPacket({ path, index: 0 });

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setPacket({
        path,
        index: i,
      });
      if (i >= path.length - 1) {
        clearInterval(interval);
      }
    }, 800);
  }, [nodes]);

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
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition shadow-lg"
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
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition shadow-lg"
          >
            Delete Selected
          </button>
        )}
      </div>

      {/* Connection Mode Indicator */}
      {connectionMode && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#1F2937] border border-[#00A5E0] rounded-lg px-4 py-2 z-50 shadow-lg">
          <span className="text-sm">
            🔌 Connecting with {connectionMode.toUpperCase()} cable - Click on
            two devices
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

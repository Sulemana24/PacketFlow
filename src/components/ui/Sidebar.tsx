// Sidebar.tsx - Fixed drag-and-drop
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
  EthernetPort,
  Plug,
  Cable as CableIcon,
  ArrowRightLeft,
  Waves,
  Usb,
  Share2,
} from "lucide-react";
import { useState } from "react";

type DeviceType =
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

type CableType =
  | "ethernet"
  | "fiber"
  | "coaxial"
  | "serial"
  | "usb"
  | "console"
  | "hdmi"
  | "power"
  | "wireless"
  | "wifi6"
  | "cellular5g"
  | "bluetooth"
  | "zigbee"
  | "lorawan";

interface Device {
  type: DeviceType;
  label: string;
  icon: any;
  category: string;
}

interface Cable {
  type: CableType;
  label: string;
  icon: any;
  category: string;
  speed?: string;
}

const devices: Device[] = [
  // End Devices
  { type: "pc", label: "PC", icon: Monitor, category: "End Devices" },
  { type: "laptop", label: "Laptop", icon: Monitor, category: "End Devices" },
  {
    type: "smartphone",
    label: "Smartphone",
    icon: Smartphone,
    category: "End Devices",
  },
  { type: "tablet", label: "Tablet", icon: Tablet, category: "End Devices" },
  { type: "printer", label: "Printer", icon: Printer, category: "End Devices" },
  { type: "ip-phone", label: "IP Phone", icon: Radio, category: "End Devices" },

  // Network Infrastructure
  { type: "router", label: "Router", icon: Router, category: "Infrastructure" },
  { type: "switch", label: "Switch", icon: Server, category: "Infrastructure" },
  {
    type: "multilayer-switch",
    label: "Multilayer Switch",
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
    type: "access-point",
    label: "Access Point",
    icon: Wifi,
    category: "Infrastructure",
  },
  {
    type: "wireless-ap",
    label: "Wireless AP",
    icon: Wifi,
    category: "Infrastructure",
  },
  { type: "modem", label: "Modem", icon: Settings, category: "Infrastructure" },
  {
    type: "gateway",
    label: "Gateway",
    icon: Globe,
    category: "Infrastructure",
  },

  // Security
  { type: "firewall", label: "Firewall", icon: Shield, category: "Security" },
  { type: "ids", label: "IDS", icon: Activity, category: "Security" },
  { type: "ips", label: "IPS", icon: Activity, category: "Security" },
  {
    type: "vpn-concentrator",
    label: "VPN Concentrator",
    icon: Shield,
    category: "Security",
  },

  // Servers & Storage
  { type: "server", label: "Server", icon: Server, category: "Servers" },
  { type: "nas", label: "NAS Storage", icon: HardDrive, category: "Servers" },
  { type: "database", label: "Database", icon: Database, category: "Servers" },
  { type: "cloud", label: "Cloud", icon: Cloud, category: "Servers" },

  // Specialized Equipment
  {
    type: "load-balancer",
    label: "Load Balancer",
    icon: Activity,
    category: "Specialized",
  },
  {
    type: "controller",
    label: "Controller",
    icon: Settings,
    category: "Specialized",
  },

  { type: "text" as DeviceType, label: "Text", icon: Type, category: "Tools" },
];

const cables: Cable[] = [
  // Wired Connections
  {
    type: "ethernet",
    label: "Ethernet (CAT6)",
    icon: EthernetPort,
    category: "Wired",
    speed: "1 Gbps",
  },
  {
    type: "fiber",
    label: "Fiber Optic",
    icon: Waves,
    category: "Wired",
    speed: "10-100 Gbps",
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
    label: "USB-C",
    icon: Usb,
    category: "Wired",
    speed: "5-40 Gbps",
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
    type: "power",
    label: "Power Cable",
    icon: Plug,
    category: "Wired",
    speed: "N/A",
  },

  // Wireless Connections
  {
    type: "wifi6",
    label: "WiFi 6",
    icon: Wifi,
    category: "Wireless",
    speed: "9.6 Gbps",
  },
  {
    type: "cellular5g",
    label: "5G Cellular",
    icon: Radio,
    category: "Wireless",
    speed: "10 Gbps",
  },
  {
    type: "bluetooth",
    label: "Bluetooth",
    icon: Waves,
    category: "Wireless",
    speed: "2 Mbps",
  },
  {
    type: "zigbee",
    label: "Zigbee",
    icon: Wifi,
    category: "Wireless",
    speed: "250 kbps",
  },
  {
    type: "lorawan",
    label: "LoRaWAN",
    icon: Wifi,
    category: "Wireless",
    speed: "50 kbps",
  },
];

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

    // For debugging
    console.log(`Dragging ${itemType}: ${type}`);
  };

  // Toggle category collapse
  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Filter items based on search
  const filterItems = (items: any[], search: string) => {
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()),
    );
  };

  const filteredDevices = filterItems(devices, searchTerm);
  const filteredCables = filterItems(cables, searchTerm);

  // Group items by category
  const groupItems = (items: any[]) => {
    return items.reduce(
      (acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      },
      {} as Record<string, any[]>,
    );
  };

  const groupedDevices = groupItems(filteredDevices);
  const groupedCables = groupItems(filteredCables);

  const currentItems =
    activeTab === "devices" ? filteredDevices : filteredCables;
  const currentGrouped =
    activeTab === "devices" ? groupedDevices : groupedCables;

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
        {currentItems.length === 0 ? (
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
                  <span>
                    {category} ({categoryItems.length})
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
                    {categoryItems.map((item: any) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.type + item.label}
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
                            className={`flex-shrink-0 ${activeTab === "cables" ? "text-green-500" : "text-[#00A5E0]"}`}
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-sm truncate block">
                              {item.label}
                            </span>
                            {item.speed && (
                              <span className="text-[10px] text-gray-500">
                                {item.speed}
                              </span>
                            )}
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
            className={`font-semibold ${activeTab === "cables" ? "text-green-500" : "text-[#00A5E0]"}`}
          >
            {currentItems.length}
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

"use client";

import { useState, useEffect } from "react";
import { Wifi, Server, Activity } from "lucide-react";
import toast from "react-hot-toast";

export interface NetworkStatsData {
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

interface NetworkStatsProps {
  stats: NetworkStatsData;
  onRefresh?: () => void;
  onSpeedTest?: () => void;
  isMeasuringSpeed?: boolean;
}

export function NetworkStats({
  stats,
  onRefresh,
  onSpeedTest,
  isMeasuringSpeed = false,
}: NetworkStatsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      if (onRefresh) {
        await onRefresh();
        toast.success("Network stats refreshed");
      }
    } catch (error) {
      toast.error("Failed to refresh network stats");
      console.error("Refresh error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeedTest = async () => {
    if (isMeasuringSpeed) {
      // Fix: Use toast() with icon option instead of toast.info()
      toast("Speed test already in progress", {
        icon: "ℹ️",
        duration: 3000,
      });
      return;
    }
    try {
      if (onSpeedTest) {
        await onSpeedTest();
      }
    } catch (error) {
      toast.error("Speed test failed");
      console.error("Speed test error:", error);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-[#1F2937]/50">
        <div
          className={`w-2 h-2 rounded-full ${
            stats.isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"
          }`}
        />
        <span className="text-xs text-gray-300">
          {stats.isOnline ? "Online" : "Offline"}
        </span>
        {stats.downloadSpeed > 0 && (
          <span className="text-xs text-gray-400">
            {stats.downloadSpeed.toFixed(1)} Mbps
          </span>
        )}
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="ml-2 text-gray-400 hover:text-white transition-colors"
        >
          <Activity size={14} className={isLoading ? "animate-spin" : ""} />
        </button>
        <button
          onClick={handleSpeedTest}
          disabled={isMeasuringSpeed}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Wifi size={14} className={isMeasuringSpeed ? "animate-pulse" : ""} />
        </button>
      </div>
    </div>
  );
}

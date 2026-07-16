"use client";

import { Layout, Terminal } from "lucide-react";
import { NetworkStats } from "./NetworkStats";
import { UserProfile } from "./UserProfile";
import { User as FirebaseUser } from "firebase/auth";
import { NetworkStatsData } from "./NetworkStats";

interface TopBarProps {
  user: FirebaseUser | null;
  networkStats: NetworkStatsData;
  isConsoleOpen: boolean;
  onConsoleToggle: () => void;
  onRefreshStats: () => Promise<void>;
  onSpeedTest: () => Promise<void>;
  isMeasuringSpeed: boolean;
  onLogout: () => Promise<void>;
}

export function TopBar({
  user,
  networkStats,
  isConsoleOpen,
  onConsoleToggle,
  onRefreshStats,
  onSpeedTest,
  isMeasuringSpeed,
  onLogout,
}: TopBarProps) {
  return (
    <div className="sticky top-0 z-30 bg-[#0B0F19]/95 backdrop-blur-sm border-b border-[#1F2937] px-4 py-3 overflow-visible">
      <div className="flex items-center justify-between overflow-visible">
        <div></div>
        <div className="hidden lg:flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#00A5E0] to-[#0085C0] rounded-lg flex items-center justify-center">
            <Layout size={18} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              PacketFlow Dashboard
            </h1>
            <p className="text-xs text-gray-500">Network Simulation Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3 overflow-visible">
          <NetworkStats
            stats={networkStats}
            onRefresh={onRefreshStats}
            onSpeedTest={onSpeedTest}
            isMeasuringSpeed={isMeasuringSpeed}
          />

          <button
            onClick={onConsoleToggle}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#1F2937] transition-all"
            title="Toggle Console (Ctrl+Shift+C)"
          >
            <Terminal size={18} className="text-[#00A5E0]" />
            <span className="hidden md:inline text-sm">Console</span>
            <div
              className={`w-2 h-2 rounded-full ${
                isConsoleOpen ? "bg-green-500" : "bg-gray-500"
              }`}
            />
          </button>

          <UserProfile
            user={user}
            isOnline={networkStats.isOnline}
            onLogout={onLogout}
          />
        </div>
      </div>
    </div>
  );
}

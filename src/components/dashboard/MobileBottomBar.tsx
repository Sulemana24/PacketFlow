"use client";

import { Menu, Minus, Maximize2, Plus, Terminal } from "lucide-react";

interface MobileBottomBarProps {
  onMenuToggle: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomFit: () => void;
  onConsoleToggle: () => void;
  isOnline: boolean;
}

export function MobileBottomBar({
  onMenuToggle,
  onZoomIn,
  onZoomOut,
  onZoomFit,
  onConsoleToggle,
  isOnline,
}: MobileBottomBarProps) {
  return (
    <div className="sticky bottom-0 z-30 bg-[#0B0F19]/95 backdrop-blur-sm border-t border-[#1F2937] py-2 px-4 flex justify-around">
      <button
        onClick={onMenuToggle}
        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1F2937] transition"
        aria-label="Toggle menu"
      >
        <Menu size={20} className="text-[#00A5E0]" />
        <span className="text-xs">Tools</span>
      </button>

      <button
        onClick={onZoomOut}
        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1F2937] transition"
        aria-label="Zoom out"
      >
        <Minus size={20} className="text-[#00A5E0]" />
        <span className="text-xs">Zoom Out</span>
      </button>

      <button
        onClick={onZoomFit}
        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1F2937] transition"
        aria-label="Fit view"
      >
        <Maximize2 size={20} className="text-[#00A5E0]" />
        <span className="text-xs">Fit View</span>
      </button>

      <button
        onClick={onZoomIn}
        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1F2937] transition"
        aria-label="Zoom in"
      >
        <Plus size={20} className="text-[#00A5E0]" />
        <span className="text-xs">Zoom In</span>
      </button>

      <button
        onClick={onConsoleToggle}
        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1F2937] transition"
        aria-label="Toggle console"
      >
        <Terminal size={20} className="text-[#00A5E0]" />
        <span className="text-xs">Console</span>
      </button>

      <div className="text-xs text-gray-500 flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"
          }`}
        />
        <span>{isOnline ? "Online" : "Offline"}</span>
      </div>
    </div>
  );
}

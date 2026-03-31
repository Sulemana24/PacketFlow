"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, Maximize2, Plus, Minus } from "lucide-react";
import Sidebar from "@/components/ui/Sidebar";
import NetworkCanvas, { DeviceType } from "@/components/canvas/NetworkCanvas";
import { ReactFlowProvider } from "reactflow";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobile && isSidebarOpen) {
        const sidebar = document.getElementById("sidebar");
        const menuButton = document.getElementById("menu-button");
        if (
          sidebar &&
          !sidebar.contains(e.target as Node) &&
          menuButton &&
          !menuButton.contains(e.target as Node)
        ) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobile, isSidebarOpen]);

  // Handle zoom to fit
  const handleZoomToFit = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.querySelector("canvas");
      if (canvas) {
        canvas.dispatchEvent(new CustomEvent("zoomToFit"));
      }
    }
  }, []);

  // Handle zoom controls
  const handleZoomIn = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.querySelector("canvas");
      if (canvas) {
        canvas.dispatchEvent(new CustomEvent("zoomIn"));
      }
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.querySelector("canvas");
      if (canvas) {
        canvas.dispatchEvent(new CustomEvent("zoomOut"));
      }
    }
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Toggle sidebar with 'b' key
      if (e.key === "b" || e.key === "B") {
        setIsSidebarOpen((prev) => !prev);
      }
      // Zoom to fit with 'f' key
      if (e.key === "f" || e.key === "F") {
        handleZoomToFit();
      }
      // Close sidebar with Escape key
      if (e.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isSidebarOpen, handleZoomToFit]);

  return (
    <div className="flex h-screen w-full bg-[#0B0F19] text-white overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        id="menu-button"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-[#1F2937] p-2 rounded-lg hover:bg-[#374151] transition-all shadow-lg"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar with responsive behavior */}
      <div
        id="sidebar"
        className={`
          fixed md:relative z-50 h-full transition-transform duration-300 ease-in-out shadow-xl
          ${isMobile ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
          md:translate-x-0
        `}
      >
        <Sidebar />
      </div>

      {/* Main Canvas Area */}
      <div
        className={`
        flex-1 flex flex-col transition-all duration-300
        ${isMobile ? "w-full" : "w-auto"}
      `}
      >
        {/* Mobile Header - Shows when sidebar is closed */}
        {isMobile && !isSidebarOpen && (
          <div className="sticky top-0 z-30 bg-[#0B0F19]/95 backdrop-blur-sm border-b border-[#1F2937] px-16 py-3">
            <h1 className="text-lg font-semibold text-center">
              Network Canvas
            </h1>
          </div>
        )}

        {/* Canvas Container */}
        <div ref={canvasRef} className="flex-1 min-h-0 relative">
          <ReactFlowProvider>
            <NetworkCanvas />
          </ReactFlowProvider>
        </div>

        {/* Mobile Bottom Bar - Quick Actions */}
        {isMobile && (
          <div className="sticky bottom-0 z-30 bg-[#0B0F19]/95 backdrop-blur-sm border-t border-[#1F2937] py-2 px-4 flex justify-around">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1F2937] transition"
              aria-label="Open tools"
            >
              <Menu size={20} className="text-[#00A5E0]" />
              <span className="text-xs">Tools</span>
            </button>

            <button
              onClick={handleZoomOut}
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1F2937] transition"
              aria-label="Zoom out"
            >
              <Minus size={20} className="text-[#00A5E0]" />
              <span className="text-xs">Zoom Out</span>
            </button>

            <button
              onClick={handleZoomToFit}
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1F2937] transition"
              aria-label="Zoom to fit"
            >
              <Maximize2 size={20} className="text-[#00A5E0]" />
              <span className="text-xs">Fit View</span>
            </button>

            <button
              onClick={handleZoomIn}
              className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#1F2937] transition"
              aria-label="Zoom in"
            >
              <Plus size={20} className="text-[#00A5E0]" />
              <span className="text-xs">Zoom In</span>
            </button>

            <div className="text-xs text-gray-500 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Ready</span>
            </div>
          </div>
        )}

        {/* Desktop Status Bar */}
        {!isMobile && (
          <div className="absolute bottom-4 left-4 z-40 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-lg text-xs text-gray-400">
            <span>
              💡 Tip: Press &apos;B&apos; to toggle sidebar | &apos;F&apos; to
              fit view
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

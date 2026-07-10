"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { ReactFlowProvider } from "reactflow";
import { Toaster } from "react-hot-toast";

import Sidebar from "@/components/ui/Sidebar";
import NetworkCanvas from "@/components/canvas/NetworkCanvas";
import { useAuth } from "../context/AuthContext";
import { useNetworkStats } from "../../../hooks/useNetworkStats";
import { useConsoleCommands } from "../../../hooks/useConsoleCommands";
import { TopBar } from "@/components/dashboard/TopBar";
import { ConsoleTerminal } from "@/components/dashboard/ConsoleTerminal";
import { MobileBottomBar } from "@/components/dashboard/MobileBottomBar";
import { LoadingSpinner } from "@/components/dashboard/LoadingSpinner";
import { DashboardErrorBoundary } from "@/components/dashboard/ErrorBoundary";
import { MobileMenuButton } from "@/components/dashboard/MobileMenuButton";
import { SidebarOverlay } from "@/components/dashboard/SidebarOverlay";
import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  // UI State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);
  const [isConsoleMinimized, setIsConsoleMinimized] = useState(false);
  const [consoleHeight, setConsoleHeight] = useState(320);
  const [isResizing, setIsResizing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Refs
  const canvasRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Custom Hooks
  const {
    networkStats,
    isMeasuringSpeed,
    getLocalNetworkInfo,
    getPublicIPInfo,
    getDNSServers,
    measureInternetSpeed,
    refreshStats,
  } = useNetworkStats();

  const { consoleMessages, handleConsoleCommand, clearConsole } =
    useConsoleCommands(networkStats);

  // Zoom handlers
  const handleZoomToFit = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.querySelector("canvas");
      if (canvas) {
        try {
          canvas.dispatchEvent(new CustomEvent("zoomToFit"));
          toast.success("Zoomed to fit");
        } catch (error) {
          console.error("Zoom to fit error:", error);
          toast.error("Failed to zoom to fit");
        }
      }
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.querySelector("canvas");
      if (canvas) {
        try {
          canvas.dispatchEvent(new CustomEvent("zoomIn"));
        } catch (error) {
          console.error("Zoom in error:", error);
          toast.error("Failed to zoom in");
        }
      }
    }
  }, []);

  const handleZoomOut = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current.querySelector("canvas");
      if (canvas) {
        try {
          canvas.dispatchEvent(new CustomEvent("zoomOut"));
        } catch (error) {
          console.error("Zoom out error:", error);
          toast.error("Failed to zoom out");
        }
      }
    }
  }, []);

  // Toggle sidebar
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  // Close sidebar
  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  // Initialize dashboard
  useEffect(() => {
    const initializeDashboard = async () => {
      if (!isMounted && user) {
        setIsMounted(true);
        try {
          await Promise.all([
            getLocalNetworkInfo(),
            getPublicIPInfo(),
            getDNSServers(),
          ]);
          toast.success("Dashboard initialized successfully");
        } catch (error) {
          console.error("Dashboard initialization error:", error);
          toast.error("Failed to initialize dashboard");
        }
      }
    };

    initializeDashboard();
  }, [isMounted, user, getLocalNetworkInfo, getPublicIPInfo, getDNSServers]);

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

  // Close sidebar when clicking outside (mobile)
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

  // Close sidebar on escape
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "C") {
        e.preventDefault();
        setIsConsoleOpen(!isConsoleOpen);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isSidebarOpen, isConsoleOpen]);

  // Handle console resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        const newHeight = window.innerHeight - e.clientY;
        if (newHeight > 150 && newHeight < window.innerHeight - 100) {
          setConsoleHeight(newHeight);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  // Keyboard shortcuts for zoom
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.key === "b" || e.key === "B") && !e.ctrlKey && !e.metaKey) {
        setIsSidebarOpen((prev) => !prev);
      }
      if ((e.key === "f" || e.key === "F") && !e.ctrlKey && !e.metaKey) {
        handleZoomToFit();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleZoomToFit]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  // FIX: Speed test for UI - returns void
  const handleSpeedTest = useCallback(async () => {
    try {
      await measureInternetSpeed();
      toast.success("Speed test completed!");
    } catch (error) {
      console.error("Speed test error:", error);
      toast.error("Speed test failed");
      throw error;
    }
  }, [measureInternetSpeed]);

  // FIX: Speed test for console - returns results
  const handleSpeedTestForConsole = useCallback(async () => {
    try {
      const results = await measureInternetSpeed();
      return results;
    } catch (error) {
      console.error("Speed test error:", error);
      toast.error("Speed test failed");
      throw error;
    }
  }, [measureInternetSpeed]);

  // Wrap command handler with speed test
  const handleCommandWithSpeedTest = useCallback(
    (command: string) => {
      handleConsoleCommand(command, handleSpeedTestForConsole);
    },
    [handleConsoleCommand, handleSpeedTestForConsole],
  );

  // Show loading state
  if (loading || !isMounted) {
    return <LoadingSpinner />;
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  return (
    <DashboardErrorBoundary>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1F2937",
            color: "#fff",
            border: "1px solid #374151",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <div className="flex h-screen w-full bg-[#0B0F19] text-white overflow-hidden">
        {/* Mobile Menu Button */}
        <MobileMenuButton isOpen={isSidebarOpen} onToggle={toggleSidebar} />

        {/* Sidebar Overlay for Mobile */}
        <SidebarOverlay
          isOpen={isMobile && isSidebarOpen}
          onClose={closeSidebar}
        />

        {/* Sidebar */}
        <div
          id="sidebar"
          ref={sidebarRef}
          className={`
            fixed md:relative z-50 h-full transition-transform duration-300 ease-in-out shadow-xl
            ${
              isMobile
                ? isSidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full"
                : "translate-x-0"
            }
            md:translate-x-0
          `}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <TopBar
            user={user}
            networkStats={networkStats}
            isConsoleOpen={isConsoleOpen}
            onConsoleToggle={() => setIsConsoleOpen(!isConsoleOpen)}
            onRefreshStats={refreshStats}
            onSpeedTest={handleSpeedTest} // ✅ Now returns void
            isMeasuringSpeed={isMeasuringSpeed}
            onLogout={handleLogout}
          />

          {/* Canvas */}
          <div ref={canvasRef} className="flex-1 min-h-0 relative">
            <ReactFlowProvider>
              <NetworkCanvas />
            </ReactFlowProvider>
          </div>

          {/* Console Terminal */}
          <ConsoleTerminal
            isOpen={isConsoleOpen}
            onToggle={() => setIsConsoleOpen(!isConsoleOpen)}
            onCommand={handleCommandWithSpeedTest}
            messages={consoleMessages}
            onClear={clearConsole}
            isMinimized={isConsoleMinimized}
            onMinimizeToggle={() => setIsConsoleMinimized(!isConsoleMinimized)}
            height={consoleHeight}
            onResizeStart={() => setIsResizing(true)}
          />

          {/* Mobile Bottom Bar */}
          {isMobile && (
            <MobileBottomBar
              onMenuToggle={toggleSidebar}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onZoomFit={handleZoomToFit}
              onConsoleToggle={() => setIsConsoleOpen(!isConsoleOpen)}
              isOnline={networkStats.isOnline}
            />
          )}
        </div>
      </div>
    </DashboardErrorBoundary>
  );
}

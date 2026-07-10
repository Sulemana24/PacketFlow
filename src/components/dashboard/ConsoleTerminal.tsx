"use client";

import { useState, useEffect, useRef } from "react";
import {
  Terminal,
  Minus,
  Maximize2,
  Trash2,
  Copy,
  Play,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Activity,
  Wifi,
  Server,
} from "lucide-react";
import toast from "react-hot-toast";

interface ConsoleMessage {
  id: number;
  timestamp: Date;
  type: "info" | "success" | "error" | "warning" | "command";
  message: string;
  command?: string;
}

interface ConsoleTerminalProps {
  isOpen: boolean;
  onToggle: () => void;
  onCommand?: (command: string) => void;
  messages: ConsoleMessage[];
  onClear: () => void;
  isMinimized: boolean;
  onMinimizeToggle: () => void;
  height: number;
  onResizeStart: () => void;
}

export function ConsoleTerminal({
  isOpen,
  onToggle,
  onCommand,
  messages,
  onClear,
  isMinimized,
  onMinimizeToggle,
  height,
  onResizeStart,
}: ConsoleTerminalProps) {
  const [consoleInput, setConsoleInput] = useState("");
  const consoleInputRef = useRef<HTMLInputElement>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  // Auto-scroll console to bottom
  useEffect(() => {
    if (consoleEndRef.current && isOpen && !isMinimized) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  // Focus console input on Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen && !isMinimized) {
          consoleInputRef.current?.focus();
        } else {
          onToggle();
          setTimeout(() => consoleInputRef.current?.focus(), 100);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isOpen, isMinimized, onToggle]);

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (consoleInput.trim() && onCommand) {
      onCommand(consoleInput);
      setConsoleInput("");
    }
  };

  const copyConsole = () => {
    const consoleText = messages
      .map((msg) => `[${formatTime(msg.timestamp)}] ${msg.message}`)
      .join("\n");
    navigator.clipboard.writeText(consoleText);
    toast.success("Console output copied to clipboard");
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle size={14} className="text-green-400 shrink-0" />;
      case "error":
        return <AlertCircle size={14} className="text-red-400 shrink-0" />;
      case "warning":
        return <AlertCircle size={14} className="text-yellow-400 shrink-0" />;
      case "command":
        return <ChevronRight size={14} className="text-blue-400 shrink-0" />;
      default:
        return <Terminal size={14} className="text-gray-400 shrink-0" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="flex-shrink-0 border-t border-[#1F2937] bg-[#0B0F19]/95 backdrop-blur-sm flex flex-col"
      style={{
        height: isMinimized ? "48px" : `${height}px`,
      }}
    >
      {/* Resize Handle */}
      {!isMinimized && (
        <div
          onMouseDown={onResizeStart}
          className="h-1 cursor-ns-resize hover:bg-[#00A5E0]/50 transition-colors"
          style={{ cursor: "row-resize" }}
        />
      )}

      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1F2937]/50 border-b border-[#374151] flex-shrink-0">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-[#00A5E0]" />
          <span className="text-sm font-mono font-semibold">Terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyConsole}
            className="p-1 hover:bg-[#374151] rounded transition"
            title="Copy console output"
          >
            <Copy size={14} className="text-gray-400" />
          </button>
          <button
            onClick={onClear}
            className="p-1 hover:bg-[#374151] rounded transition"
            title="Clear console"
          >
            <Trash2 size={14} className="text-gray-400" />
          </button>
          <button
            onClick={onMinimizeToggle}
            className="p-1 hover:bg-[#374151] rounded transition"
            title={isMinimized ? "Expand" : "Minimize"}
          >
            {isMinimized ? (
              <Maximize2 size={14} className="text-gray-400" />
            ) : (
              <Minus size={14} className="text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Console Content */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-3 font-mono text-xs">
            {messages.map((msg) => (
              <div key={msg.id} className="mb-1 flex items-start gap-2">
                <span className="text-gray-500 shrink-0">
                  [{formatTime(msg.timestamp)}]
                </span>
                <div className="flex items-start gap-1 flex-1 min-w-0">
                  {getMessageIcon(msg.type)}
                  <span
                    className={`whitespace-pre-wrap break-all ${
                      msg.type === "error"
                        ? "text-red-400"
                        : msg.type === "success"
                          ? "text-green-400"
                          : msg.type === "warning"
                            ? "text-yellow-400"
                            : "text-gray-300"
                    }`}
                  >
                    {msg.message}
                  </span>
                </div>
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>

          {/* Console Input */}
          <form
            onSubmit={handleConsoleSubmit}
            className="border-t border-[#374151] p-2 flex-shrink-0"
          >
            <div className="flex items-center gap-2">
              <span className="text-[#00A5E0] font-mono text-sm">$</span>
              <input
                ref={consoleInputRef}
                type="text"
                value={consoleInput}
                onChange={(e) => setConsoleInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-sm font-mono text-white placeholder-gray-500"
                placeholder="Type a command... (Ctrl+K to focus)"
                spellCheck={false}
              />
              <button
                type="submit"
                className="px-2 py-1 bg-[#00A5E0]/20 hover:bg-[#00A5E0]/30 rounded transition"
              >
                <Play size={14} className="text-[#00A5E0]" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

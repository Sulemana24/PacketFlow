import { Handle, Position } from "reactflow";
import { Type, Check, X } from "lucide-react";
import { useState } from "react";

interface TextNodeProps {
  data: {
    text: string;
    fontSize?: number;
    color?: string;
  };
  selected?: boolean;
}

export default function TextNode({ data, selected }: TextNodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(data.text || "Double-click to edit");

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditText(data.text || "Double-click to edit");
  };

  const handleSave = () => {
    data.text = editText;
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(data.text || "Double-click to edit");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div
      className={`
        px-4 py-3 rounded-lg shadow-lg transition-all cursor-pointer min-w-[150px]
        ${selected ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#1F2937]" : ""}
      `}
      style={{
        background: "#1F2937",
        border: selected ? "2px solid #3B82F6" : "2px solid #00A5E0",
      }}
      onDoubleClick={handleDoubleClick}
    >
      {/* 4 Connection Points */}
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="target" position={Position.Left} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
      <Handle type="source" position={Position.Right} className="w-2 h-2" />

      <div className="flex items-start gap-2">
        <Type size={16} className="text-[#00A5E0] mt-1 flex-shrink-0" />

        {isEditing ? (
          <div className="flex-1">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-[#374151] text-white text-sm rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#00A5E0] resize-vertical"
              style={{
                fontSize: data.fontSize || 14,
                color: data.color || "#ffffff",
                minHeight: "60px",
              }}
              autoFocus
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs transition"
              >
                <Check size={12} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs transition"
              >
                <X size={12} />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            className="text-sm break-words flex-1 cursor-text"
            style={{
              fontSize: data.fontSize || 14,
              color: data.color || "#ffffff",
            }}
          >
            {data.text || "Double-click to edit"}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
  return (
    <button
      id="menu-button"
      onClick={onToggle}
      className="fixed top-4 left-4 z-50 md:hidden bg-[#1F2937] p-2 rounded-lg hover:bg-[#374151] transition-all shadow-lg"
      aria-label="Toggle menu"
    >
      {isOpen ? <X size={20} /> : <Menu size={20} />}
    </button>
  );
}

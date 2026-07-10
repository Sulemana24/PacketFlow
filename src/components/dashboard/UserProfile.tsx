"use client";

import { useState, useEffect, useRef } from "react";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";
import { User as FirebaseUser } from "firebase/auth";
import toast from "react-hot-toast";

interface UserProfileProps {
  user: FirebaseUser | null;
  isOnline?: boolean;
  onLogout: () => Promise<void>;
}

export function UserProfile({
  user,
  isOnline = true,
  onLogout,
}: UserProfileProps) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getUserDisplayName = (user: FirebaseUser | null) => {
    if (!user) return "Guest";
    if (user.displayName) return user.displayName;
    if (user.email) return user.email.split("@")[0];
    if (user.isAnonymous) return "Guest User";
    return "User";
  };

  const getUserInitials = (user: FirebaseUser | null) => {
    if (!user) return "G";
    const name = getUserDisplayName(user);
    return name.charAt(0).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await onLogout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="relative" ref={profileMenuRef}>
      <button
        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1F2937] transition-all group"
      >
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00A5E0] to-[#0085C0] flex items-center justify-center shadow-lg">
            <span className="text-white font-semibold text-sm">
              {getUserInitials(user)}
            </span>
          </div>
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0B0F19] ${
              isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"
            }`}
          />
        </div>

        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-white">
            {getUserDisplayName(user)}
          </p>
          <p className="text-xs text-gray-400">
            {user?.email || (user?.isAnonymous ? "Guest Account" : "No email")}
          </p>
        </div>

        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 hidden md:block ${
            isProfileMenuOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isProfileMenuOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#1F2937] rounded-lg shadow-xl border border-[#374151] overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-[#374151]">
            <p className="text-sm font-medium text-white">
              {getUserDisplayName(user)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {user?.email ||
                (user?.isAnonymous ? "Guest Account" : "No email")}
            </p>
            {user?.isAnonymous && (
              <p className="text-xs text-[#00A5E0] mt-1">
                ℹ️ Guest account - temporary
              </p>
            )}
          </div>

          <div className="py-2">
            <button
              onClick={() => setIsProfileMenuOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[#374151] transition-colors"
            >
              <User size={16} className="text-[#00A5E0]" />
              <span>Profile Settings</span>
            </button>

            <button
              onClick={() => setIsProfileMenuOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[#374151] transition-colors"
            >
              <Settings size={16} className="text-[#00A5E0]" />
              <span>Preferences</span>
            </button>

            <div className="border-t border-[#374151] my-1"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-[#374151] transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

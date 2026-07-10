"use client";

export function LoadingSpinner() {
  return (
    <div className="flex h-screen w-full bg-[#0B0F19] items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#00A5E0] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-400 mt-4">Loading Dashboard...</p>
      </div>
    </div>
  );
}

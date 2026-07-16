"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa6";
import Logo from "../../public/images/favicon.jpg";

export default function Footer() {
  return (
    <footer className="relative z-10 px-6 py-12 border-t border-[#1F2937] bg-[#0B0F19]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* Cisco-style Logo Badge */}
              <div className="relative w-12 h-12 flex-shrink-0">
                <div className="w-8 h-8">
                  <Image
                    src={Logo}
                    alt="PacketFlow Logo"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </div>

              {/* Brand Text with Subtitle */}
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white leading-none">
                  PacketFlow
                </span>
                <span className="text-xs text-[#00A5E0] font-mono tracking-widest uppercase mt-1">
                  Network Simulation
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Network simulation{" "}
              <span className="text-[#00A5E0]">reimagined</span>
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link
                  href="/features"
                  className="hover:text-[#00A5E0] transition"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-[#00A5E0] transition"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-[#00A5E0] transition">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-[#00A5E0] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#00A5E0] transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#00A5E0] transition">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[#00A5E0] transition"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#00A5E0] transition">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 text-center text-sm text-gray-500 border-t border-[#1F2937]">
          <p>
            PacketFlow © {new Date().getFullYear()} - Cisco-inspired network
            simulation platform
          </p>
          <p className="mt-2 text-xs">
            Not affiliated with Cisco Systems, Inc. All trademarks are property
            of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}

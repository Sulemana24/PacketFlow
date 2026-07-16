"use client";

import { motion } from "framer-motion";

import {
  Users,
  Target,
  Rocket,
  Award,
  Code,
  Shield,
  Network,
  Heart,
  ArrowRight,
  LogIn,
} from "lucide-react";

import AuthModal from "@/components/AuthModal";
import { useState, useRef, useEffect } from "react";

import Footer from "@/components/Footer";

export default function AboutPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const modalRef = useRef<HTMLDivElement>(null);

  const handleAuthClick = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        authModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setAuthModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [authModalOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAuthModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (authModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [authModalOpen]);

  const team = [
    {
      name: "Coming Soon",
      role: "Team Member",
      icon: Users,
      bio: "We're building an incredible team to drive PacketFlow forward.",
    },
    {
      name: "Coming Soon",
      role: "Team Member",
      icon: Code,
      bio: "Passionate developers joining to enhance the platform.",
    },
    {
      name: "Coming Soon",
      role: "Team Member",
      icon: Network,
      bio: "Network experts bringing their expertise to the team.",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Mission",
      description:
        "Democratize network education by making complex concepts visual and interactive.",
    },
    {
      icon: Rocket,
      title: "Innovation",
      description:
        "Pushing the boundaries of what's possible in browser-based network simulation.",
    },
    {
      icon: Shield,
      title: "Security",
      description:
        "Building with security-first principles to protect user data and privacy.",
    },
    {
      icon: Heart,
      title: "Community",
      description:
        "Fostering an inclusive community of network engineers and enthusiasts.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "50K+", label: "Networks Built" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9/5", label: "User Rating" },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Auth Button */}
      <button
        onClick={() => handleAuthClick("signin")}
        className="fixed top-4 right-4 z-50 bg-[#00A5E0] hover:bg-[#00A5E0]/90 px-4 py-2 rounded-lg font-semibold transition shadow-lg flex items-center gap-2 cursor-pointer"
      >
        <LogIn size={18} />
        Login / Sign Up
      </button>

      {/* Auth Modal with click outside ref */}
      <div ref={modalRef}>
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authMode}
        />
      </div>

      {/* Cisco-style Accent Line */}
      <div className="h-1 bg-gradient-to-r from-[#00A5E0] via-[#49B5E8] to-[#00A5E0]" />

      {/* Hero Section */}
      <section className="relative px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00A5E0]/10 border border-[#00A5E0]/30 backdrop-blur-sm mb-6">
              <Award size={16} className="text-[#00A5E0]" />
              <span className="text-sm font-mono tracking-wider text-[#00A5E0]">
                ABOUT PACKETFLOW
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Building the Future of
              <br />
              <span className="bg-gradient-to-r from-[#00A5E0] to-[#49B5E8] bg-clip-text text-transparent">
                Network Education
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              PacketFlow was born from a simple idea: networking shouldn&apos;t
              be hidden behind complex command lines. We make network concepts
              visual, interactive, and accessible to everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 border-t border-[#1F2937]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-[#00A5E0]">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              PacketFlow started in 2023 as a passion project by a group of
              network engineers and developers who wanted to make networking
              education more engaging and accessible.
            </p>
            <p>
              We noticed that traditional network simulators were either too
              expensive, too complex, or lacked the visual feedback needed to
              truly understand how data flows through networks.
            </p>
            <p>
              Today, PacketFlow is used by thousands of students, educators, and
              professionals worldwide to learn, teach, and prototype network
              designs—all from a web browser.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="px-6 py-24 bg-[#111827]/50 border-y border-[#1F2937]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold">Our Values</h2>
            <p className="text-gray-400 mt-4">What drives us every day</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-[#1F2937] border border-[#374151] hover:border-[#00A5E0]/50 transition-all group"
              >
                <value.icon className="w-10 h-10 text-[#00A5E0] mb-4" />
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold">Meet the Team</h2>
          <p className="text-gray-400 mt-4">Coming soon - We&apso;re hiring!</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-xl bg-[#1F2937] border border-[#374151] hover:border-[#00A5E0]/50 transition-all group"
            >
              <div className="w-20 h-20 rounded-full bg-[#00A5E0]/10 mx-auto mb-4 flex items-center justify-center">
                <member.icon className="w-10 h-10 text-[#00A5E0]" />
              </div>
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-[#00A5E0] text-sm">{member.role}</p>
              <p className="text-gray-400 text-sm mt-2">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 bg-gradient-to-b from-[#00A5E0]/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Be part of a community that&apos;s revolutionizing how people
              learn networking.
            </p>
            <button
              onClick={() => handleAuthClick("signup")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#00A5E0] hover:bg-[#00A5E0]/90 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              Get Started Free
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

import {
  Network,
  Radio,
  Layers,
  Zap,
  Shield,
  Cloud,
  Cpu,
  Router,
  Server,
  Wifi,
  GitBranch,
  Eye,
  Lock,
  Globe,
  Users,
  BarChart3,
  Code,
  BookOpen,
  Share2,
  ArrowRight,
  LogIn,
} from "lucide-react";
import AuthModal from "@/components/AuthModal";
import { useState, useRef, useEffect } from "react";

import Footer from "@/components/Footer";

export default function FeaturesPage() {
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

  const features = [
    {
      category: "Core Features",
      items: [
        {
          icon: Network,
          title: "Visual Network Builder",
          description:
            "Drag and drop devices onto a canvas to create complex network topologies with ease.",
        },
        {
          icon: Radio,
          title: "Packet Simulation",
          description:
            "Watch packets travel through your network in real-time with detailed packet inspection.",
        },
        {
          icon: Layers,
          title: "OSI Layer Visualization",
          description:
            "See exactly how data is processed at each layer of the OSI model, from Physical to Application.",
        },
        {
          icon: GitBranch,
          title: "Routing Protocols",
          description:
            "Simulate OSPF, BGP, EIGRP, and other routing protocols in a visual environment.",
        },
      ],
    },
    {
      category: "Device Library",
      items: [
        {
          icon: Router,
          title: "Routers & Switches",
          description:
            "Access a comprehensive library of Cisco-style routers, switches, and network devices.",
        },
        {
          icon: Server,
          title: "Servers & Endpoints",
          description:
            "Add servers, workstations, printers, and IoT devices to your network topologies.",
        },
        {
          icon: Shield,
          title: "Security Devices",
          description:
            "Deploy firewalls, IDS/IPS, VPN concentrators, and other security appliances.",
        },
        {
          icon: Wifi,
          title: "Wireless & IoT",
          description:
            "Simulate wireless networks, access points, IoT devices, and mesh networks.",
        },
      ],
    },
    {
      category: "Advanced Features",
      items: [
        {
          icon: Eye,
          title: "Real-time Monitoring",
          description:
            "Monitor network performance, bandwidth usage, and device status in real-time.",
        },
        {
          icon: BarChart3,
          title: "Performance Analytics",
          description:
            "Generate detailed reports and analytics on network behavior and performance.",
        },
        {
          icon: Cloud,
          title: "Cloud Integration",
          description:
            "Connect your simulations to cloud services and hybrid network architectures.",
        },
        {
          icon: Lock,
          title: "Security Testing",
          description:
            "Test network security by simulating attacks and vulnerability assessments.",
        },
      ],
    },
    {
      category: "Collaboration",
      items: [
        {
          icon: Users,
          title: "Team Workspaces",
          description:
            "Collaborate with team members on network designs and share topologies.",
        },
        {
          icon: Share2,
          title: "Export & Share",
          description:
            "Export network diagrams, share links, and embed simulations in documentation.",
        },
        {
          icon: Code,
          title: "API Access",
          description:
            "Integrate PacketFlow with your tools using our comprehensive REST API.",
        },
        {
          icon: BookOpen,
          title: "Learning Resources",
          description:
            "Access tutorials, guides, and interactive lessons for network education.",
        },
      ],
    },
  ];

  const highlights = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Built with WebGL and optimized for performance, even with 100+ devices.",
    },
    {
      icon: Cpu,
      title: "Resource Efficient",
      description:
        "Minimal resource usage. Run on any device, even low-powered laptops.",
    },
    {
      icon: Globe,
      title: "Browser Based",
      description:
        "No installation required. Access from any device with a modern browser.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "End-to-end encryption and enterprise-grade security controls.",
    },
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
              <Zap size={16} className="text-[#00A5E0]" />
              <span className="text-sm font-mono tracking-wider text-[#00A5E0]">
                FEATURES
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Everything You Need to
              <br />
              <span className="bg-gradient-to-r from-[#00A5E0] to-[#49B5E8] bg-clip-text text-transparent">
                Build Better Networks
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              From visual network design to real-time packet simulation,
              PacketFlow provides the tools you need to learn, teach, and
              prototype network architectures.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="px-6 py-16 border-t border-[#1F2937]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-4 rounded-lg bg-[#1F2937] border border-[#374151]"
              >
                <item.icon className="w-8 h-8 text-[#00A5E0] mx-auto mb-2" />
                <div className="font-semibold text-sm">{item.title}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {item.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      {features.map((section, idx) => (
        <section
          key={idx}
          className={`px-6 py-24 ${idx % 2 === 1 ? "bg-[#111827]/50 border-y border-[#1F2937]" : ""}`}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold">{section.category}</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {section.items.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 rounded-xl bg-[#1F2937] border border-[#374151] hover:border-[#00A5E0]/50 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <feature.icon className="w-8 h-8 text-[#00A5E0] flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="px-6 py-24 bg-gradient-to-b from-[#00A5E0]/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Start building networks with PacketFlow today. No credit card
              required.
            </p>
            <button
              onClick={() => handleAuthClick("signup")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#00A5E0] hover:bg-[#00A5E0]/90 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
            >
              Start Building
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

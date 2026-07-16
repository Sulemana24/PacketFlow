"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Search,
  Network,
  Router,
  Zap,
  HelpCircle,
  ArrowRight,
  Code,
  Users,
  Play,
  Book,
  FileText,
  Video,
  ExternalLink,
} from "lucide-react";
import Footer from "@/components/Footer";

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const sections = [
    {
      title: "Getting Started",
      icon: Play,
      items: [
        {
          title: "Quick Start Guide",
          description: "Get up and running in 5 minutes",
        },
        {
          title: "Installation",
          description: "Setup instructions for all platforms",
        },
        {
          title: "First Network",
          description: "Build your first network topology",
        },
        {
          title: "Interface Overview",
          description: "Learn the user interface",
        },
      ],
    },
    {
      title: "Network Simulation",
      icon: Network,
      items: [
        {
          title: "Adding Devices",
          description: "How to add and configure devices",
        },
        {
          title: "Connecting Devices",
          description: "Create connections between devices",
        },
        {
          title: "Packet Simulation",
          description: "Simulate packet flow in real-time",
        },
        {
          title: "OSI Visualization",
          description: "Understanding the OSI model layers",
        },
      ],
    },
    {
      title: "Device Library",
      icon: Router,
      items: [
        { title: "Routers", description: "Configure and simulate routers" },
        {
          title: "Switches",
          description: "Layer 2 and Layer 3 switch configuration",
        },
        { title: "Firewalls", description: "Security appliance setup" },
        {
          title: "Wireless Devices",
          description: "Access points and wireless controllers",
        },
      ],
    },
    {
      title: "Advanced Features",
      icon: Zap,
      items: [
        {
          title: "Routing Protocols",
          description: "OSPF, BGP, EIGRP configuration",
        },
        { title: "Network Security", description: "Security best practices" },
        {
          title: "Performance Monitoring",
          description: "Monitor network performance",
        },
        {
          title: "Cloud Integration",
          description: "Connect to cloud services",
        },
      ],
    },
    {
      title: "APIs & Integrations",
      icon: Code,
      items: [
        { title: "REST API", description: "Programmatic access to PacketFlow" },
        { title: "Webhooks", description: "Real-time event notifications" },
        {
          title: "Export/Import",
          description: "Share and backup your networks",
        },
        {
          title: "Third-party Integration",
          description: "Connect with other tools",
        },
      ],
    },
    {
      title: "Troubleshooting",
      icon: HelpCircle,
      items: [
        {
          title: "Common Issues",
          description: "Solutions to frequently encountered problems",
        },
        { title: "Performance Tips", description: "Optimize your simulations" },
        {
          title: "Community Support",
          description: "Get help from the community",
        },
        {
          title: "Contact Support",
          description: "Reach out to our support team",
        },
      ],
    },
  ];

  const resources = [
    { icon: Video, title: "Video Tutorials", count: "12 videos" },
    { icon: FileText, title: "API Reference", count: "Complete docs" },
    { icon: Book, title: "Guides", count: "20+ guides" },
    { icon: Code, title: "Code Examples", count: "50+ examples" },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
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
              <BookOpen size={16} className="text-[#00A5E0]" />
              <span className="text-sm font-mono tracking-wider text-[#00A5E0]">
                DOCUMENTATION
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Everything You Need to
              <br />
              <span className="bg-gradient-to-r from-[#00A5E0] to-[#49B5E8] bg-clip-text text-transparent">
                Master PacketFlow
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Comprehensive documentation, guides, and tutorials to help you
              build better networks with PacketFlow.
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00A5E0] transition"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {resources.map((resource, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-lg bg-[#1F2937] border border-[#374151] hover:border-[#00A5E0]/50 transition-all cursor-pointer"
            >
              <resource.icon className="w-6 h-6 text-[#00A5E0] mb-2" />
              <div className="font-semibold">{resource.title}</div>
              <div className="text-xs text-gray-500">{resource.count}</div>
            </motion.div>
          ))}
        </div>

        {/* Documentation Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-xl bg-[#111827] border border-[#1F2937] hover:border-[#00A5E0]/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <section.icon className="w-6 h-6 text-[#00A5E0]" />
                <h2 className="text-xl font-bold">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.items.map((item, j) => (
                  <li key={j}>
                    <Link
                      href={`/docs/${item.title.toLowerCase().replace(/ /g, "-")}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-[#1F2937] transition group"
                    >
                      <div>
                        <div className="font-medium group-hover:text-[#00A5E0] transition">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.description}
                        </div>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-gray-500 group-hover:text-[#00A5E0] transition"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community Section */}
      <section className="px-6 py-24 bg-[#111827]/50 border-y border-[#1F2937]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Users className="w-12 h-12 text-[#00A5E0] mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Get help, share your work, and connect with other PacketFlow
              users.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/community"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F2937] hover:bg-[#374151] rounded-lg font-semibold transition"
              >
                Community Forums
                <ExternalLink size={16} />
              </Link>
              <Link
                href="/discord"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F2937] hover:bg-[#374151] rounded-lg font-semibold transition"
              >
                Discord Server
                <ExternalLink size={16} />
              </Link>
              <Link
                href="/github"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F2937] hover:bg-[#374151] rounded-lg font-semibold transition"
              >
                GitHub
                <ExternalLink size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Our support team is here to help you with any questions or issues.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#00A5E0] hover:bg-[#00A5E0]/90 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
            >
              Contact Support
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

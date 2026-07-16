"use client";

import { motion } from "framer-motion";

import {
  FileText,
  Scale,
  Users,
  Shield,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";
import Footer from "@/components/Footer";

export default function TermsPage() {
  const sections = [
    {
      icon: Scale,
      title: "Acceptance of Terms",
      content: [
        "By using PacketFlow, you agree to these Terms of Service",
        "These terms apply to all users of the platform",
        "If you disagree with any part of the terms, you may not use the service",
        "We reserve the right to update these terms at any time",
      ],
    },
    {
      icon: Users,
      title: "User Accounts",
      content: [
        "You must be 13 years or older to create an account",
        "You are responsible for maintaining account security",
        "You agree to provide accurate and complete information",
        "You may not share your account credentials",
        "We reserve the right to suspend or terminate accounts",
      ],
    },
    {
      icon: Shield,
      title: "Acceptable Use",
      content: [
        "Use the platform for legal and ethical purposes only",
        "Do not attempt to hack or disrupt the service",
        "Do not upload malicious code or content",
        "Respect intellectual property rights",
        "Do not harass or abuse other users",
      ],
    },
    {
      icon: FileText,
      title: "Content Ownership",
      content: [
        "You retain ownership of your network designs",
        "You grant us license to host and display your content",
        "We may use anonymized data for research",
        "You are responsible for your content",
        "We may remove content that violates these terms",
      ],
    },
    {
      icon: Clock,
      title: "Service Availability",
      content: [
        "We strive for 99.9% uptime",
        "Scheduled maintenance will be announced in advance",
        "We are not liable for service interruptions",
        "You may cancel your account at any time",
        "Refunds are handled on a case-by-case basis",
      ],
    },
    {
      icon: AlertCircle,
      title: "Limitation of Liability",
      content: [
        "The service is provided 'as is'",
        "We are not liable for any damages arising from use",
        "Your use of the service is at your own risk",
        "We are not responsible for third-party services",
        "Maximum liability is limited to fees paid",
      ],
    },
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
              <FileText size={16} className="text-[#00A5E0]" />
              <span className="text-sm font-mono tracking-wider text-[#00A5E0]">
                TERMS OF SERVICE
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Terms of Service
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before using PacketFlow. Last
              updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-24 max-w-4xl mx-auto">
        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-xl bg-[#111827] border border-[#1F2937]"
            >
              <div className="flex items-center gap-3 mb-4">
                <section.icon className="w-6 h-6 text-[#00A5E0]" />
                <h2 className="text-xl font-bold">{section.title}</h2>
              </div>
              <ul className="space-y-2">
                {section.content.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-gray-400">
                    <CheckCircle
                      size={16}
                      className="text-[#00A5E0] flex-shrink-0 mt-1"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 p-6 rounded-xl bg-[#1F2937] border border-[#374151]">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-[#00A5E0] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">
                Questions About These Terms?
              </h3>
              <p className="text-sm text-gray-400">
                If you have any questions about these Terms of Service, please
                contact us at: legal@packetflow.com
              </p>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-8 p-6 rounded-xl bg-[#1F2937] border border-[#374151] text-center">
          <p className="text-sm text-gray-500">
            These terms were last updated on {new Date().toLocaleDateString()}.
            We will notify users of any significant changes.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

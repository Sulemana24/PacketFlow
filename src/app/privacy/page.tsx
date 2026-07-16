"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, Users, Mail } from "lucide-react";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content: [
        "Account information (email, name, username)",
        "Usage data (network simulations, device configurations)",
        "Device information (browser type, IP address, operating system)",
        "Cookies and similar tracking technologies",
        "Communication data (support tickets, feedback)",
      ],
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        "Provide and maintain our services",
        "Improve and optimize the platform",
        "Personalize your experience",
        "Send updates, notifications, and marketing communications",
        "Ensure security and prevent fraud",
      ],
    },
    {
      icon: Eye,
      title: "Data Storage and Security",
      content: [
        "Data stored on secure servers with encryption",
        "Industry-standard security measures",
        "Regular security audits and updates",
        "Limited access to personal data",
        "Data retention for as long as necessary",
      ],
    },
    {
      icon: Database,
      title: "Data Sharing",
      content: [
        "We do not sell your personal data",
        "Data shared with service providers (hosting, analytics)",
        "Aggregated, anonymized data for research",
        "Legal compliance when required",
        "With your explicit consent",
      ],
    },
    {
      icon: Users,
      title: "Your Rights",
      content: [
        "Access your personal data",
        "Request data correction or deletion",
        "Opt-out of marketing communications",
        "Data portability",
        "Withdraw consent at any time",
      ],
    },
    {
      icon: Mail,
      title: "Contact Us",
      content: [
        "Questions about this privacy policy",
        "Data privacy concerns",
        "Requests regarding your data",
        "Email: privacy@packetflow.com",
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
              <Shield size={16} className="text-[#00A5E0]" />
              <span className="text-sm font-mono tracking-wider text-[#00A5E0]">
                PRIVACY POLICY
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Your Privacy Matters
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              We are committed to protecting your privacy and handling your data
              with transparency. Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-24 max-w-4xl mx-auto">
        <div className="space-y-12">
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
                    <span className="text-[#00A5E0]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Last Updated */}
        <div className="mt-12 p-6 rounded-xl bg-[#1F2937] border border-[#374151] text-center">
          <p className="text-sm text-gray-500">
            This policy was last updated on {new Date().toLocaleDateString()}.
            We will notify you of any significant changes.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Galaxy Background */}
      <div className="fixed inset-0">
        {/* Deep Space Gradient - Blending with original dark color */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] via-[#0B0F19]/95 to-[#0B0F19]" />

        {/* Stars Layer 1 - Small Stars */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.6), rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 60% 70%, rgba(255,255,255,0.5), rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 85% 15%, rgba(255,255,255,0.5), rgba(0,0,0,0)),
                            radial-gradient(3px 3px at 40% 85%, rgba(255,255,255,0.4), rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 95% 45%, rgba(255,255,255,0.6), rgba(0,0,0,0))`,
            backgroundSize:
              "200px 200px, 180px 180px, 220px 220px, 250px 250px, 190px 190px",
            backgroundRepeat: "repeat",
            backgroundPosition:
              "0 0, 30px 50px, 80px 20px, 120px 90px, 160px 40px",
            opacity: 0.5,
          }}
        />

        {/* Stars Layer 2 - Medium Stars */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 10% 90%, rgba(255,255,255,0.7), rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 75% 25%, rgba(255,255,255,0.8), rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 45% 55%, rgba(255,255,255,0.6), rgba(0,0,0,0)),
                            radial-gradient(3px 3px at 30% 15%, rgba(255,200,100,0.5), rgba(0,0,0,0))`,
            backgroundSize:
              "300px 300px, 280px 280px, 320px 320px, 350px 350px",
            backgroundRepeat: "repeat",
            backgroundPosition:
              "50px 100px, 120px 60px, 200px 150px, 250px 30px",
            opacity: 0.6,
            animation: "twinkle 4s ease-in-out infinite",
          }}
        />

        {/* Stars Layer 3 - Large Stars */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(4px 4px at 15% 45%, rgba(255,215,0,0.6), rgba(0,0,0,0)),
                            radial-gradient(3px 3px at 88% 82%, rgba(255,255,255,0.7), rgba(0,0,0,0)),
                            radial-gradient(5px 5px at 52% 38%, rgba(255,200,100,0.5), rgba(0,0,0,0)),
                            radial-gradient(3px 3px at 92% 12%, rgba(255,255,255,0.6), rgba(0,0,0,0)),
                            radial-gradient(4px 4px at 8% 72%, rgba(255,180,80,0.4), rgba(0,0,0,0))`,
            backgroundSize:
              "400px 400px, 380px 380px, 420px 420px, 390px 390px, 410px 410px",
            backgroundRepeat: "repeat",
            backgroundPosition:
              "100px 200px, 180px 80px, 250px 150px, 300px 250px, 50px 300px",
            opacity: 0.6,
            filter: "blur(0.5px)",
          }}
        />

        {/* Nebula Effect - Subtle to maintain original dark theme */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute top-2/3 left-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] animate-pulse delay-2000" />
        </div>

        {/* Cosmic Dust Effect */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Cisco-style Accent Line */}
      <div className="relative z-10 top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00A5E0] via-[#49B5E8] to-[#00A5E0]" />

      {/* HERO */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Glowing Badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00A5E0]/10 border border-[#00A5E0]/30 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-[#00A5E0] animate-pulse" />
            <span className="text-sm font-mono tracking-wider text-[#00A5E0]">
              CISCO INSPIRED • COSMIC NETWORK
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            Visualize Networking.
            <br />
            <span className="bg-gradient-to-r from-[#00A5E0] to-[#49B5E8] bg-clip-text text-transparent">
              Not Just Learn It.
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-gray-400 max-w-2xl text-lg leading-relaxed backdrop-blur-sm"
        >
          PacketFlow is a lightweight web-based network simulator that lets you
          build topologies, connect devices, and visualize packet flow across
          the OSI model. Experience networking across the cosmos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex gap-4 flex-wrap justify-center"
        >
          <a
            href="/dashboard"
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg overflow-hidden transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
          >
            <span className="relative z-10">Launch Simulator</span>
            <div className="absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <a
            href="#features"
            className="px-8 py-4 border border-gray-700 rounded-lg font-semibold text-lg hover:bg-white/5 transition-all backdrop-blur-sm"
          >
            Learn More
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-[#00A5E0] rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="relative z-10 px-6 py-24 max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight">
            Enterprise-Grade <span className="text-[#00A5E0]">Features</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Built with cosmic precision and the reliability that powers global
            networks
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Drag & Drop Topology",
              desc: "Build complex networks visually using routers, switches, and PCs with Cisco-proven architecture.",
              icon: "🎯",
              gradient: "from-[#00A5E0]/20 to-transparent",
            },
            {
              title: "Packet Simulation",
              desc: "Watch data flow in real time across your network with detailed packet-level analytics.",
              icon: "📡",
              gradient: "from-[#49B5E8]/20 to-transparent",
            },
            {
              title: "OSI Visualization",
              desc: "Understand how each layer processes data step by step, from Physical to Application.",
              icon: "🔬",
              gradient: "from-[#0085C0]/20 to-transparent",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 rounded-xl bg-[#111827]/80 backdrop-blur-sm border border-[#1F2937] hover:border-[#00A5E0]/50 transition-all hover:scale-105"
            >
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
              />
              <div className="relative">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="text-gray-400 mt-2">{f.desc}</p>
                <div className="mt-4 w-12 h-0.5 bg-[#00A5E0] group-hover:w-24 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-4 text-gray-400">
              Follow Cisco&apos;s proven methodology across the galaxy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00A5E0]/30 to-transparent" />

            {[
              {
                step: "01",
                title: "Build",
                desc: "Drag devices onto the canvas to create your network topology. Choose from routers, switches, firewalls, and endpoints.",
              },
              {
                step: "02",
                title: "Connect",
                desc: "Link devices to form network paths. Configure interfaces, assign IP addresses, and establish routing protocols.",
              },
              {
                step: "03",
                title: "Simulate",
                desc: "Generate traffic and watch packets travel across OSI layers. Analyze encapsulation, routing decisions, and packet flow.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative text-center md:text-left"
              >
                <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#111827] border border-[#00A5E0] text-3xl font-bold text-[#00A5E0] mx-auto md:mx-0 backdrop-blur-sm">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400 mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00A5E0]/5 to-[#49B5E8]/5 backdrop-blur-sm" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,165,224,0.03) 20px, rgba(0,165,224,0.03) 40px)`,
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold">
            Ready to explore networking visually?
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            Join thousands of network engineers who trust PacketFlow for their
            training and simulation needs.
          </p>
          <div className="mt-10 flex gap-4 justify-center flex-wrap">
            <a
              href="/dashboard"
              className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all hover:scale-105 inline-flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              Start Building
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            <a
              href="#features"
              className="px-8 py-4 border border-gray-700 rounded-lg font-semibold hover:bg-white/5 transition-all backdrop-blur-sm"
            >
              View Documentation
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 px-6 py-12 border-t border-[#1F2937] bg-[#0B0F19]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00A5E0] to-[#0085C0] rounded-lg" />
                <span className="text-xl font-bold tracking-tight text-white">
                  PacketFlow
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Network simulation reimagined
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-[#00A5E0] transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00A5E0] transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00A5E0] transition">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-[#00A5E0] transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00A5E0] transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00A5E0] transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:text-[#00A5E0] transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#00A5E0] transition">
                    Terms
                  </a>
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
              Not affiliated with Cisco Systems, Inc. All trademarks are
              property of their respective owners.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

"use client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import {
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User,
  XCircle,
  Network,
  Radio,
  Layers,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Generate stable positions for planets
  const planets = useMemo(
    () => [
      { radius: 120, speed: 8, color: "#FF6B6B", size: 12, name: "Mercury" },
      { radius: 180, speed: 12, color: "#FFD93D", size: 14, name: "Venus" },
      { radius: 250, speed: 16, color: "#6BCF7F", size: 16, name: "Earth" },
      { radius: 320, speed: 20, color: "#FF8C42", size: 14, name: "Mars" },
      { radius: 400, speed: 24, color: "#FFD700", size: 20, name: "Jupiter" },
      { radius: 480, speed: 28, color: "#E8B4B8", size: 18, name: "Saturn" },
      { radius: 550, speed: 35, color: "#4A90E2", size: 12, name: "Uranus" },
      { radius: 620, speed: 40, color: "#9B59B6", size: 10, name: "Neptune" },
    ],
    [],
  );

  // Generate stable stars
  const stars = useMemo(() => {
    return [...Array(150)].map((_, i) => ({
      id: i,
      width: ((i * 7) % 3) + 1,
      height: ((i * 7) % 3) + 1,
      left: (i * 13) % 100,
      top: (i * 17) % 100,
      opacity: ((i * 3) % 50) / 100 + 0.2,
      duration: ((i * 11) % 3) + 2,
      delay: (i * 5) % 5,
    }));
  }, []);

  // Generate shooting stars
  const shootingStars = useMemo(() => {
    return [...Array(4)].map((_, i) => ({
      id: i,
      left: (i * 25) % 100,
      top: (i * 33) % 100,
      delay: i * 4,
    }));
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAuthModalOpen) {
        setIsAuthModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isAuthModalOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAuthModalOpen]);

  const validateForm = () => {
    setError("");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    // Confirm password for signup
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Simulate authentication
    const userData = {
      email,
      name: isLogin ? "User" : name,
    };

    // Store in localStorage (fake session)
    localStorage.setItem("packetflow_user", JSON.stringify(userData));

    console.log(isLogin ? "Login:" : "Signup:", userData);

    // Close modal
    setIsAuthModalOpen(false);

    // Reset form
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setError("");
    setShowPassword(false);
    setShowConfirmPassword(false);

    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Solar System Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Deep Space Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19] via-[#0B0F19]/95 to-[#0B0F19]" />

        {/* Twinkling Stars */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: star.width,
              height: star.height,
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [star.opacity, star.opacity + 0.3, star.opacity],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Planets with Orbits */}
        {planets.map((planet, idx) => (
          <motion.div
            key={idx}
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              width: planet.radius * 2,
              height: planet.radius * 2,
              marginLeft: -planet.radius,
              marginTop: -planet.radius,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: planet.speed,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                width: planet.size,
                height: planet.size,
                background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}dd)`,
                left: planet.radius,
                top: 0,
                marginLeft: -planet.size / 2,
                marginTop: -planet.size / 2,
                boxShadow: `0 0 20px ${planet.color}80`,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}

        {/* Shooting Stars */}
        {shootingStars.map((star) => (
          <motion.div
            key={`shooting-${star.id}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
            animate={{
              x: [0, 300],
              y: [0, 200],
              opacity: [0, 1, 0],
              scale: [1, 1.5, 0],
            }}
            transition={{
              duration: 1.5,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: 8,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Nebula Effect */}
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

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0B0F19]" />
      </div>

      {/* Login/Signup Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsAuthModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#111827] rounded-2xl shadow-2xl w-full max-w-md border border-[#00A5E0]/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-[#1F2937]">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(true);
                      setError("");
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold transition cursor-pointer ${
                      isLogin
                        ? "bg-[#00A5E0] text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(false);
                      setError("");
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold transition cursor-pointer ${
                      !isLogin
                        ? "bg-[#00A5E0] text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(false)}
                  className="text-gray-400 hover:text-white transition cursor-pointer"
                >
                  <XCircle size={24} />
                </button>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mx-6 mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg"
                  >
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleAuth} className="p-6 space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 block">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg focus:outline-none focus:border-[#00A5E0] text-white"
                        placeholder="Enter your Fullname"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg focus:outline-none focus:border-[#00A5E0] text-white"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-2 bg-[#1F2937] border border-[#374151] rounded-lg focus:outline-none focus:border-[#00A5E0] text-white"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 block">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-2 bg-[#1F2937] border border-[#374151] rounded-lg focus:outline-none focus:border-[#00A5E0] text-white"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div className="text-right">
                    <button
                      type="button"
                      className="text-xs text-[#00A5E0] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2 bg-[#00A5E0] hover:bg-[#00A5E0]/90 rounded-lg font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLogin ? (
                    <>
                      <LogIn size={18} />
                      Login
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Sign Up
                    </>
                  )}
                </button>

                <div className="text-center text-xs text-gray-500">
                  By continuing, you agree to our Terms of Service and Privacy
                  Policy
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Button */}
      <button
        onClick={() => setIsAuthModalOpen(true)}
        className="fixed top-4 right-4 z-50 bg-[#00A5E0] hover:bg-[#00A5E0]/90 px-4 py-2 rounded-lg font-semibold transition shadow-lg flex items-center gap-2 cursor-pointer"
      >
        <LogIn size={18} />
        Login / Sign Up
      </button>

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

        <div className="mt-10 flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="group px-8 py-4 bg-[#00A5E0] hover:bg-[#00A5E0]/90 rounded-lg font-semibold transition-all hover:scale-105 inline-flex items-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            Launch Simulator
            <ArrowRight size={18} />
          </button>

          <a
            href="#features"
            className="px-8 py-4 border border-gray-700 rounded-lg font-semibold text-lg hover:bg-white/5 transition-all backdrop-blur-sm"
          >
            Learn More
          </a>
        </div>

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
              icon: <Network size={32} />,
              gradient: "from-[#00A5E0]/20 to-transparent",
            },
            {
              title: "Packet Simulation",
              desc: "Watch data flow in real time across your network with detailed packet-level analytics.",
              icon: <Radio size={32} />,
              gradient: "from-[#49B5E8]/20 to-transparent",
            },
            {
              title: "OSI Visualization",
              desc: "Understand how each layer processes data step by step, from Physical to Application.",
              icon: <Layers size={32} />,
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
                <div className="mb-4 text-[#00A5E0]">{f.icon}</div>
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
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="group px-8 py-4 bg-[#00A5E0] hover:bg-[#00A5E0]/90 rounded-lg font-semibold transition-all hover:scale-105 inline-flex items-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              Start Building
              <ArrowRight size={18} />
            </button>
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
        .bg-gradient-radial {
          background: radial-gradient(
            circle at center,
            transparent 0%,
            #0b0f19 100%
          );
        }
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

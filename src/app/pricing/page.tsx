"use client";

import { motion } from "framer-motion";

import { useState, useRef, useEffect } from "react";
import {
  Check,
  X,
  ArrowRight,
  Star,
  Users,
  Zap,
  Crown,
  LogIn,
} from "lucide-react";
import AuthModal from "@/components/AuthModal";

import Footer from "@/components/Footer";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );
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

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for getting started and learning the basics.",
      features: [
        "Up to 5 devices per network",
        "Basic network simulation",
        "Pre-built topologies",
        "Community support",
        "Public workspace",
      ],
      notIncluded: [
        "Advanced security features",
        "Custom device libraries",
        "Team collaboration",
        "Priority support",
      ],
      cta: "Get Started",
      popular: false,
      icon: Users,
    },
    {
      name: "Pro",
      price: { monthly: 19, yearly: 190 },
      description: "For professionals and serious network learners.",
      features: [
        "Unlimited devices per network",
        "Advanced packet simulation",
        "Custom device creation",
        "Team collaboration (up to 5)",
        "Priority support",
        "Export network diagrams",
        "API access",
        "Private workspace",
      ],
      notIncluded: [
        "Enterprise security features",
        "Dedicated support manager",
      ],
      cta: "Start Pro",
      popular: true,
      icon: Zap,
    },
    {
      name: "Enterprise",
      price: { monthly: 49, yearly: 490 },
      description: "For teams and organizations requiring advanced features.",
      features: [
        "Everything in Pro, plus:",
        "Unlimited team members",
        "Enterprise security",
        "Dedicated support manager",
        "Custom integrations",
        "SLA guarantee",
        "Audit logs",
        "Compliance reporting",
        "On-premise deployment",
      ],
      notIncluded: [],
      cta: "Contact Sales",
      popular: false,
      icon: Crown,
    },
  ];

  const faqs = [
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards, PayPal, and corporate invoicing for Enterprise plans.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes, we offer a 14-day free trial of our Pro plan. No credit card required.",
    },
    {
      q: "Can I upgrade or downgrade my plan?",
      a: "Yes, you can change your plan at any time. Upgrades take effect immediately, downgrades take effect at the end of your billing cycle.",
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
              <Star size={16} className="text-[#00A5E0]" />
              <span className="text-sm font-mono tracking-wider text-[#00A5E0]">
                PRICING
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Choose Your Plan
              <br />
              <span className="bg-gradient-to-r from-[#00A5E0] to-[#49B5E8] bg-clip-text text-transparent">
                Start Free, Scale as You Grow
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Simple, transparent pricing for individuals, teams, and
              enterprises.
            </p>

            {/* Billing Toggle */}
            <div className="mt-8 inline-flex items-center gap-4 p-1 bg-[#1F2937] rounded-lg">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  billingCycle === "monthly"
                    ? "bg-[#00A5E0] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  billingCycle === "yearly"
                    ? "bg-[#00A5E0] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Yearly (Save 20%)
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-xl bg-[#111827] border ${
                plan.popular
                  ? "border-[#00A5E0] shadow-lg shadow-[#00A5E0]/10"
                  : "border-[#1F2937]"
              } hover:border-[#00A5E0]/50 transition-all hover:scale-[1.02]`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-[#00A5E0] rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <plan.icon className="w-6 h-6 text-[#00A5E0]" />
                <h2 className="text-2xl font-bold">{plan.name}</h2>
              </div>

              <div className="mb-4">
                <span className="text-4xl font-bold">
                  $
                  {billingCycle === "monthly"
                    ? plan.price.monthly
                    : plan.price.yearly}
                </span>
                <span className="text-gray-400 ml-2">
                  /{billingCycle === "monthly" ? "mo" : "yr"}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-gray-500"
                  >
                    <X className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  if (plan.name === "Enterprise") {
                    handleAuthClick("signin");
                  } else {
                    handleAuthClick("signup");
                  }
                }}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? "bg-[#00A5E0] hover:bg-[#00A5E0]/90 shadow-lg shadow-blue-600/20 hover:scale-105"
                    : "bg-[#1F2937] hover:bg-[#374151] hover:scale-105"
                }`}
              >
                {plan.cta}
                <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24 bg-[#111827]/50 border-y border-[#1F2937]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-lg bg-[#1F2937] border border-[#374151]"
              >
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-3xl font-bold mb-4">
              Start Building Your Network Today
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust PacketFlow for their network
              education and prototyping.
            </p>
            <button
              onClick={() => handleAuthClick("signup")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#00A5E0] hover:bg-[#00A5E0]/90 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-600/20"
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

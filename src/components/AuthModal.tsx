"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Loader2,
  UserIcon,
} from "lucide-react";
import { useAuth } from "../app/context/AuthContext";
import { FaChrome, FaGithub } from "react-icons/fa";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
}

// Helper function to extract error message
const getErrorMessage = (err: unknown): string => {
  if (err instanceof Error) {
    return err.message;
  }
  if (typeof err === "string") {
    return err;
  }
  if (err && typeof err === "object" && "message" in err) {
    return String(err.message);
  }
  return "An unexpected error occurred";
};

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "signin",
}: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formError, setFormError] = useState("");

  const {
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithGithub,
    signInAsGuest,
    resetPassword,
    error: authError,
  } = useAuth();

  // Reset form state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormError("");
      setSuccessMessage("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setResetEmail("");
      setDisplayName("");
      setShowForgotPassword(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      if (mode === "signup") {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }
        await signUpWithEmail(email, password, displayName || undefined);
        onClose();
      } else {
        await signInWithEmail(email, password);
        onClose();
      }
    } catch (err) {
      setFormError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      await resetPassword(resetEmail);
      setSuccessMessage("Password reset email sent! Check your inbox.");
      setTimeout(() => {
        setShowForgotPassword(false);
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      setFormError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setFormError("");
    setIsLoading(true);

    try {
      if (provider === "google") {
        await signInWithGoogle();
      } else {
        await signInWithGithub();
      }
      onClose();
    } catch (err) {
      setFormError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setFormError("");
    setIsLoading(true);

    try {
      await signInAsGuest();
      onClose();
    } catch (err) {
      setFormError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-md bg-[#111827] rounded-2xl border border-[#1F2937] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Cisco-style Accent Line */}
              <div className="h-1 bg-gradient-to-r from-[#00A5E0] via-[#49B5E8] to-[#00A5E0]" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 cursor-pointer"
                disabled={isLoading}
              >
                <X size={20} />
              </button>

              <div className="p-6 pt-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A5E0]/10 border border-[#00A5E0]/30 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00A5E0] animate-pulse" />
                    <span className="text-xs font-mono tracking-wider text-[#00A5E0]">
                      PACKETFLOW
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {mode === "signin" ? "Welcome Back" : "Create Account"}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {mode === "signin"
                      ? "Sign in to continue your cosmic journey"
                      : "Join the PacketFlow community"}
                  </p>
                </div>

                {/* Error/Success Messages */}
                {(formError || authError) && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2">
                    <AlertCircle
                      className="text-red-500 flex-shrink-0 mt-0.5"
                      size={18}
                    />
                    <p className="text-red-400 text-sm">
                      {formError || authError}
                    </p>
                  </div>
                )}

                {successMessage && (
                  <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-2">
                    <CheckCircle
                      className="text-green-500 flex-shrink-0 mt-0.5"
                      size={18}
                    />
                    <p className="text-green-400 text-sm">{successMessage}</p>
                  </div>
                )}

                {/* Tabs */}
                <div className="flex gap-1 p-1 bg-[#1F2937] rounded-xl mb-6">
                  <button
                    onClick={() => {
                      setMode("signin");
                      setShowForgotPassword(false);
                      setFormError("");
                    }}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      mode === "signin"
                        ? "bg-[#00A5E0] text-white shadow-lg shadow-blue-600/20"
                        : "text-gray-400 hover:text-white"
                    }`}
                    disabled={isLoading}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setMode("signup");
                      setShowForgotPassword(false);
                      setFormError("");
                    }}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      mode === "signup"
                        ? "bg-[#00A5E0] text-white shadow-lg shadow-blue-600/20"
                        : "text-gray-400 hover:text-white"
                    }`}
                    disabled={isLoading}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Social Login */}
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => handleSocialLogin("google")}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-[#2a3346] rounded-xl text-gray-300 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <FaChrome size={18} className="text-[#ea4335]" />
                    )}
                    <span className="text-sm font-medium">Google</span>
                  </button>
                  <button
                    onClick={() => handleSocialLogin("github")}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-[#2a3346] rounded-xl text-gray-300 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <FaGithub size={18} />
                    )}
                    <span className="text-sm font-medium">GitHub</span>
                  </button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#1F2937]"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-[#111827] text-gray-500">
                      or continue with email
                    </span>
                  </div>
                </div>

                {/* Forms */}
                <form onSubmit={handleSubmit}>
                  {!showForgotPassword ? (
                    <>
                      <div className="space-y-4">
                        {mode === "signup" && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">
                              Full Name (Optional)
                            </label>
                            <div className="relative">
                              <User
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                size={18}
                              />
                              <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Enter Full Name"
                                className="w-full pl-10 pr-4 py-2.5 bg-[#1F2937] border border-[#2a3346] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00A5E0] focus:ring-1 focus:ring-[#00A5E0] transition"
                                disabled={isLoading}
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                              size={18}
                            />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter Email Address"
                              className="w-full pl-10 pr-4 py-2.5 bg-[#1F2937] border border-[#2a3346] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00A5E0] focus:ring-1 focus:ring-[#00A5E0] transition"
                              required
                              disabled={isLoading}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1.5">
                            Password
                          </label>
                          <div className="relative">
                            <Lock
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                              size={18}
                            />
                            <input
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full pl-10 pr-12 py-2.5 bg-[#1F2937] border border-[#2a3346] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00A5E0] focus:ring-1 focus:ring-[#00A5E0] transition"
                              required
                              disabled={isLoading}
                              minLength={6}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer"
                              disabled={isLoading}
                            >
                              {showPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                          {mode === "signup" && (
                            <p className="text-xs text-gray-500 mt-1.5">
                              Must be at least 6 characters
                            </p>
                          )}
                        </div>

                        {mode === "signup" && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">
                              Confirm Password
                            </label>
                            <div className="relative">
                              <Lock
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                size={18}
                              />
                              <input
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2.5 bg-[#1F2937] border border-[#2a3346] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00A5E0] focus:ring-1 focus:ring-[#00A5E0] transition"
                                required
                                disabled={isLoading}
                              />
                            </div>
                          </div>
                        )}

                        {mode === "signin" && (
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => setShowForgotPassword(true)}
                              className="text-sm text-[#00A5E0] hover:text-[#49B5E8] transition"
                              disabled={isLoading}
                            >
                              Forgot password?
                            </button>
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-6 py-3 bg-[#00A5E0] hover:bg-[#00A5E0]/90 rounded-xl font-semibold text-white transition-all hover:scale-[1.02] shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />
                            {mode === "signin"
                              ? "Signing In..."
                              : "Creating Account..."}
                          </>
                        ) : (
                          <>
                            {mode === "signin" ? "Sign In" : "Create Account"}
                            <ArrowRight size={18} />
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    /* Forgot Password Form */
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            size={18}
                          />
                          <input
                            type="email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-4 py-2.5 bg-[#1F2937] border border-[#2a3346] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00A5E0] focus:ring-1 focus:ring-[#00A5E0] transition"
                            required
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setShowForgotPassword(false)}
                          className="flex-1 py-3 bg-[#1F2937] hover:bg-[#2a3346] rounded-xl font-medium text-gray-300 transition"
                          disabled={isLoading}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          onClick={handleForgotPassword}
                          disabled={isLoading}
                          className="flex-1 py-3 bg-[#00A5E0] hover:bg-[#00A5E0]/90 rounded-xl font-semibold text-white transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          {isLoading ? (
                            <Loader2 className="animate-spin" size={18} />
                          ) : (
                            "Send Reset Link"
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>

                {/* Guest Login/Signup */}
                <div className="mt-4">
                  <button
                    onClick={handleGuestLogin}
                    disabled={isLoading}
                    className="w-full py-2.5 border border-dashed border-[#3a455a] hover:border-[#00A5E0] rounded-xl text-gray-400 hover:text-white transition-all text-sm font-medium group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isLoading ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <>
                          <UserIcon className="w-4 h-4" />
                          {mode === "signin"
                            ? "Continue as Guest"
                            : "Guest Sign Up"}
                        </>
                      )}
                    </span>
                  </button>
                </div>

                {/* Switch Mode */}
                <div className="mt-4 text-center text-sm text-gray-400">
                  {mode === "signin" ? (
                    <>
                      Don&apos;t have an account?{" "}
                      <button
                        onClick={() => {
                          setMode("signup");
                          setShowForgotPassword(false);
                          setFormError("");
                        }}
                        className="text-[#00A5E0] hover:text-[#49B5E8] font-medium transition cursor-pointer"
                        disabled={isLoading}
                      >
                        Sign Up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        onClick={() => {
                          setMode("signin");
                          setShowForgotPassword(false);
                          setFormError("");
                        }}
                        className="text-[#00A5E0] hover:text-[#49B5E8] font-medium transition cursor-pointer"
                        disabled={isLoading}
                      >
                        Sign In
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

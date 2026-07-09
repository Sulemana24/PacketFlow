"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { onAuthStateChange } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    displayName?: string,
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInAsGuest: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Helper function to handle errors consistently
  const handleError = (err: unknown): string => {
    if (err instanceof Error) {
      return err.message;
    }
    if (typeof err === "string") {
      return err;
    }
    return "An unknown error occurred";
  };

  const signInWithEmail = async (email: string, password: string) => {
    setError(null);
    try {
      const { user, error } = await import("@/lib/firebase/auth").then((mod) =>
        mod.signInWithEmail(email, password),
      );
      if (error) {
        setError(error);
        throw new Error(error);
      }
      router.push("/dashboard");
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);
      throw err;
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    displayName?: string,
  ) => {
    setError(null);
    try {
      const { user, error } = await import("@/lib/firebase/auth").then((mod) =>
        mod.signUpWithEmail(email, password, displayName),
      );
      if (error) {
        setError(error);
        throw new Error(error);
      }
      router.push("/dashboard");
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    setError(null);
    try {
      const { user, error } = await import("@/lib/firebase/auth").then((mod) =>
        mod.signInWithGoogle(),
      );
      if (error) {
        setError(error);
        throw new Error(error);
      }
      router.push("/dashboard");
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);
      throw err;
    }
  };

  const signInWithGithub = async () => {
    setError(null);
    try {
      const { user, error } = await import("@/lib/firebase/auth").then((mod) =>
        mod.signInWithGithub(),
      );
      if (error) {
        setError(error);
        throw new Error(error);
      }
      router.push("/dashboard");
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);
      throw err;
    }
  };

  const signInAsGuest = async () => {
    setError(null);
    try {
      const { user, error } = await import("@/lib/firebase/auth").then((mod) =>
        mod.signInAsGuest(),
      );
      if (error) {
        setError(error);
        throw new Error(error);
      }
      router.push("/dashboard");
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);
      throw err;
    }
  };

  const resetPassword = async (email: string) => {
    setError(null);
    try {
      const { error } = await import("@/lib/firebase/auth").then((mod) =>
        mod.resetPassword(email),
      );
      if (error) {
        setError(error);
        throw new Error(error);
      }
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);
      throw err;
    }
  };

  const signOut = async () => {
    setError(null);
    try {
      const { error } = await import("@/lib/firebase/auth").then((mod) =>
        mod.signOut(),
      );
      if (error) {
        setError(error);
        throw new Error(error);
      }
      router.push("/");
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithGithub,
    signInAsGuest,
    resetPassword,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

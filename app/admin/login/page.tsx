"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setCheckingSession(false);
        return;
      }

      try {
        const res = await fetch("/api/auth/validate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          router.replace("/admin");
          return;
        }
      } catch (sessionError) {
        console.error("Session validation failed:", sessionError);
      }

      localStorage.removeItem("adminToken");
      setCheckingSession(false);
    };

    checkSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        router.replace("/admin");
      } else {
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center p-6">
        <p className="text-text-secondary text-sm font-medium">Checking session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo and Welcome */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-text-primary flex items-center justify-center gap-2">
            <span className="text-accent-primary">Shakya</span> Consultants
          </h1>
          <p className="text-text-secondary mt-3">Admin Authentication Panel</p>
        </div>

        <Card className="p-8 shadow-2xl bg-white border border-border-default rounded-card">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-100 text-red-700 text-sm rounded-lg flex items-center gap-2">
                 <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                 </svg>
                 {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Email Address</label>
              <input
                type="email"
                required
                placeholder="admin@shakya.com"
                className="w-full px-4 py-3 rounded-lg border border-border-default focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none transition-all placeholder:text-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-border-default focus:ring-2 focus:ring-accent-primary focus:border-accent-primary outline-none transition-all placeholder:text-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              className="w-full py-4 text-sm font-bold tracking-widest uppercase transition-all transform hover:scale-[1.02] shadow-glow-primary hover:shadow-glow-primary-soft active:scale-[0.98]"
              disabled={loading}
              type="submit"
            >
              {loading ? "Verifying..." : "Login to Admin"}
            </Button>
          </form>
        </Card>

        {/* Home Link */}
        <div className="mt-8 text-center">
            <Link href="/" className="text-text-secondary hover:text-accent-primary transition-colors text-sm font-medium inline-flex items-center gap-2 underline underline-offset-4 decoration-gray-300 hover:decoration-accent-primary">
                Back to Site
            </Link>
        </div>
      </div>
    </div>
  );
}

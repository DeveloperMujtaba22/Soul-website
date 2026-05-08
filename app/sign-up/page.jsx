"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import signup from "../../public/signup.jpg";

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResendEmail = async () => {
    if (!signUp) return;
    try {
      setLoading(true);
      setError("");
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setSuccess("Code resent! Check your inbox (and spam folder).");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err.errors?.[0]?.message || "Failed to resend. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    if (!signUp || !verificationCode) return;
    try {
      setLoading(true);
      setError("");
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode.trim(),
      });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setSuccess("Email verified! Redirecting...");
        setTimeout(() => router.push("/"), 800);
      } else {
        setError("Verification incomplete. Please try again.");
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!isLoaded) {
      setError("Authentication is loading, please try again.");
      return;
    }

    setLoading(true);
    try {
      const result = await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        // Need email verification
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        setUserEmail(formData.email);
        setVerificationSent(true);
        setSuccess("Verification code sent! Check your email inbox.");
      }
    } catch (err) {
      const clerkError = err.errors?.[0];
      if (
        clerkError?.code === "form_identifier_exists" ||
        clerkError?.message?.toLowerCase().includes("taken") ||
        clerkError?.message?.toLowerCase().includes("already")
      ) {
        setError(
          <>
            That email is already registered.{" "}
            <a href="/sign-in" className="underline font-bold text-red-700 hover:text-red-800">
              Sign in instead?
            </a>
          </>
        );
      } else {
        setError(clerkError?.message || "An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Verification screen ──────────────────────────────────────────
  if (verificationSent) {
    return (
      <div className="min-h-screen flex items-center justify-center relative py-12 px-4">
        <div className="absolute inset-0 z-0">
          <Image src={signup} alt="Background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 w-full max-w-md p-8 space-y-5 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
            <p className="text-sm text-gray-600">
              We sent a 6-digit code to <span className="font-semibold">{userEmail || formData.email}</span>
            </p>
          </div>

          {/* Dev-mode hint */}
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
            <strong>Note:</strong> In development mode, the code appears in your{" "}
            <a
              href="https://dashboard.clerk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              Clerk Dashboard → Logs → Email
            </a>{" "}
            — not in a real inbox.
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
          )}
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{success}</div>
          )}

          <form onSubmit={handleVerifyEmail} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-gray-700 font-medium text-sm">
                Verification Code
              </Label>
              <Input
                id="code"
                type="text"
                inputMode="numeric"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                maxLength={6}
                className="h-11 text-center text-lg tracking-widest"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white"
              disabled={loading || verificationCode.trim().length < 6}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">Didn't receive the code?</p>
            <Button
              type="button"
              variant="outline"
              onClick={handleResendEmail}
              disabled={loading}
              className="w-full h-10 text-sm"
            >
              Resend Code
            </Button>
          </div>

          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => {
                setVerificationSent(false);
                setVerificationCode("");
                setError("");
                setSuccess("");
              }}
              className="text-red-500 hover:text-red-600 font-semibold"
            >
              ← Back to Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main sign-up form ────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center relative py-12 px-4">
      <div className="absolute inset-0 z-0">
        <Image src={signup} alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Image src="/logo.png" alt="SoulChamp Logo" width={80} height={80} className="object-contain" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
        )}
        {success && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium text-sm">Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-red-500" />
                </div>
                <Input
                  id="email" name="email" type="email"
                  placeholder="name@email.com"
                  value={formData.email} onChange={handleChange}
                  required className="pl-10 h-11 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium text-sm">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-red-500" />
                </div>
                <Input
                  id="password" name="password" type="password"
                  placeholder="At least 8 characters"
                  value={formData.password} onChange={handleChange}
                  required className="pl-10 h-11 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium text-sm">Confirm Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-red-500" />
                </div>
                <Input
                  id="confirmPassword" name="confirmPassword" type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword} onChange={handleChange}
                  required className="pl-10 h-11 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked)}
              />
              <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer font-normal">
                Remember me
              </Label>
            </div>
          </div>

          <div id="clerk-captcha" />

          <Button
            type="submit"
            className="w-full h-11 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white"
            disabled={loading || !isLoaded}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating account...
              </span>
            ) : "Sign Up"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <Link href="/sign-in" className="font-semibold text-red-500 hover:text-red-600">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
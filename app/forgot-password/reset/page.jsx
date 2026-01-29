"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import Image from "next/image";
import forgot from "../../public/forgot.jpg";

export default function ResetPasswordPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    code: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation
    if (!formData.code) {
      setError("Please enter the verification code from your email");
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError("Please enter a new password");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!isLoaded) {
      setError("Authentication service is loading, please try again");
      setLoading(false);
      return;
    }

    try {
      console.log("Attempting password reset...");
      
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: formData.code,
        password: formData.password,
      });

      console.log("Reset result:", result);

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setSuccess("Password reset successful! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setError("Password reset failed. Please try again.");
      }
    } catch (err) {
      console.error("Password reset error:", err);
      setError(
        err.errors?.[0]?.message || 
        "Invalid or expired code. Please request a new password reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={forgot} 
          alt="Background" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Image 
              src="/logo.png" 
              alt="SoulChamp Logo" 
              width={60} 
              height={60}
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-sm text-gray-600">Enter the code from your email and your new password</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-gray-700 font-medium text-sm">
                Verification Code
              </Label>
              <Input
                id="code"
                name="code"
                type="text"
                placeholder="Enter code from email"
                value={formData.code}
                onChange={handleChange}
                required
                className="h-11 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium text-sm">
                New Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-red-500" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 h-11 text-sm"
                />
              </div>
              <p className="text-xs text-gray-500">Must be at least 8 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium text-sm">
                Confirm New Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-red-500" />
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="pl-10 h-11 text-sm"
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Resetting...
              </span>
            ) : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
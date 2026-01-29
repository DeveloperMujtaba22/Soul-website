"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import Image from "next/image";
import forgot from "../../public/forgot.jpg";

export default function ForgotPasswordPage() {
  const { isLoaded, signIn } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    if (!isLoaded) {
      setError("Authentication service is loading, please try again");
      setLoading(false);
      return;
    }

    try {
      console.log("Requesting password reset for:", email);
      
      // Create a password reset request
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      // Store email in sessionStorage to show on check-email page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('resetEmail', email);
      }

      // Redirect to check email page
      router.push("/forgot-password/check-email");
    } catch (err) {
      console.error("Password reset error:", err);
      setError(
        err.errors?.[0]?.message || 
        "Unable to send reset email. Please check your email address and try again."
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
          <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium text-sm">
              Email
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-red-500" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 h-11 text-sm"
              />
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
                Sending...
              </span>
            ) : "Reset Password"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">Do you know password? </span>
          <Link href="/sign-in" className="font-semibold text-red-500 hover:text-red-600">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
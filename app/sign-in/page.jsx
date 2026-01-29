"use client";

import { useState, useEffect } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock } from "lucide-react";
import banner from "../../public/banner.png";
import Image from "next/image";

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Load CAPTCHA script
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://js.clerk.com/v1/captcha.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

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
    if (!formData.email) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError("Please enter your password");
      setLoading(false);
      return;
    }

    if (!isLoaded) {
      setError("Authentication service is loading, please try again");
      setLoading(false);
      return;
    }

    try {
      console.log("Attempting sign in...");
      
      const result = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      console.log("Sign in result:", result);

      if (result.status === "complete") {
        console.log("Sign in complete, setting active session...");
        await setActive({ session: result.createdSessionId });
        setSuccess("Login successful!");
        
        // Redirect to home page
        setTimeout(() => {
          router.push("/");
        }, 800);
      } else {
        console.log("Sign in incomplete:", result);
        setError("Login failed. Please check your credentials and try again.");
      }
    } catch (err) {
      console.error("Sign in error:", err);
      setError(err.errors?.[0]?.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={banner} 
          alt="Background" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Image 
              src="/logo.png" 
              alt="SoulChamp Logo" 
              width={80} 
              height={80}
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10 h-11 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium text-sm">
                Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-red-500" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 h-11 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
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
              <Link 
                href="/forgot-password" 
                className="text-sm text-red-500 hover:text-red-600 font-semibold"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* CAPTCHA placeholder - hidden by default */}
          <div id="clerk-captcha" style={{ display: 'none' }}></div>

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
                Signing in...
              </span>
            ) : "Log In"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <Link href="/sign-up" className="font-semibold text-red-500 hover:text-red-600">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
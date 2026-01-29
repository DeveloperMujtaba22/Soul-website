"use client";

import { useState, useEffect } from "react";
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
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

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

  const handleResendEmail = async () => {
    if (!signUp) return;
    
    try {
      setLoading(true);
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setSuccess("Verification email resent! Please check your inbox.");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Resend error:", err);
      setError("Failed to resend email. Please try again.");
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

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setSuccess("Email verified!");
        
        // Redirect to home page
        setTimeout(() => {
          router.push("/");
        }, 800);
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError(err.errors?.[0]?.message || "Invalid verification code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!formData.email) {
      setError("Please enter your email address");
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError("Please enter a password");
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
      console.log("Attempting sign up...");
      
      const result = await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });

      console.log("Sign up result:", result);

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setSuccess("Account created successfully!");
        
        // Redirect to home page
        setTimeout(() => {
          router.push("/");
        }, 800);
      } else if (result.status === "missing_requirements") {
        // Email verification required
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        setVerificationSent(true);
        setSuccess("Please check your email for the verification code!");
      }
    } catch (err) {
      console.error("Sign up error:", err);
      setError(err.errors?.[0]?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // If verification email was sent, show verification form
  if (verificationSent) {
    return (
      <div className="min-h-screen flex items-center justify-center relative py-12 px-4 sm:px-6 lg:px-8">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={signup} 
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
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Verify Your Email</h2>
            <p className="text-sm text-gray-600">
              We've sent a verification code to<br />
              <span className="font-semibold">{formData.email}</span>
            </p>
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

          <form onSubmit={handleVerifyEmail} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-gray-700 font-medium text-sm">
                Verification Code
              </Label>
              <Input
                id="code"
                name="code"
                type="text"
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
              disabled={loading || verificationCode.length !== 6}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Didn't receive the email?
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={handleResendEmail}
              disabled={loading}
              className="w-full h-10 text-sm"
            >
              Resend Verification Email
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

  return (
    <div className="min-h-screen flex items-center justify-center relative py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={signup} 
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
              width={80} 
              height={80}
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium text-sm">
                Confirm Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-red-500" />
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="pl-10 h-11 text-sm"
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
                Creating account...
              </span>
            ) : "Sign Up"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <Link href="/sign-in" className="font-semibold text-red-500 hover:text-red-600">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
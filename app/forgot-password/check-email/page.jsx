"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import checkemail from "../../../public/checkemail.jpg";

export default function CheckEmailPage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Get email from sessionStorage
    if (typeof window !== 'undefined') {
      const storedEmail = sessionStorage.getItem('resetEmail');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={checkemail} 
          alt="Background" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Image 
              src="/logo.png" 
              alt="SoulChamp Logo" 
              width={60} 
              height={60}
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Check Your Email</h2>
        </div>

        <div className="flex justify-center py-6">
          <div className="relative w-48 h-48">
            {/* Email illustration placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center">
                <svg 
                  className="w-16 h-16 text-red-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
              </div>
            </div>
            {/* Person illustration - simplified */}
            <div className="absolute bottom-0 right-0">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
                <svg 
                  className="w-12 h-12 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {email && (
          <div className="text-center text-sm text-gray-600">
            <p>We've sent a password reset link to</p>
            <p className="font-semibold text-gray-900 mt-1">{email}</p>
          </div>
        )}

        <div className="space-y-3">
          <Link href="/sign-in">
            <Button 
              className="w-full h-11 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white"
            >
              Go Back
            </Button>
          </Link>

          <div className="text-center text-sm text-gray-600">
            <p>Didn't receive the email?</p>
            <Link 
              href="/forgot-password" 
              className="font-semibold text-red-500 hover:text-red-600"
            >
              Try again
            </Link>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            Check your spam folder if you don't see the email in your inbox.
            The link will expire in 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
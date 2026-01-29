'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Navbar from "./_components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function LayoutContent({ children }) {
  const pathname = usePathname();
  const showNavbar = !pathname.includes('/sign-in') && !pathname.includes('/sign-up');
  
  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClerkProvider>
          <Provider>
            <LayoutContent>{children}</LayoutContent>
          </Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}
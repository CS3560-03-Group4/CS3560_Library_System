"use client";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "@/components/header/headbar"; // Import Header component
import Footer from "@/components/footer/footer"; // Import Footer component
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideHeaderAndFooter =
    pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AppRouterCacheProvider>
          {/* Conditionally render Header and Footer */}
          {!hideHeaderAndFooter && <Header />}
          {children}
          {!hideHeaderAndFooter && <Footer />}
        </AppRouterCacheProvider>
        <ToastContainer />
      </body>
    </html>
  );
}

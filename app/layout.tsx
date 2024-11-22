"use client";

import Footer from "@/components/footer/footer"; // Import Footer component
import Header from "@/components/header/headbar"; // Import Header component
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";
import { CartProvider } from "@/contexts/CartContext";

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
      <head>
        <title>Home</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <CartProvider>
          <UserProvider>
            <AppRouterCacheProvider>
              {/* Conditionally render Header and Footer */}
              {!hideHeaderAndFooter && <Header />}
              {children}
              {!hideHeaderAndFooter && <Footer />}
            </AppRouterCacheProvider>
            <ToastContainer />
          </UserProvider>
        </CartProvider>
      </body>
    </html>
  );
}

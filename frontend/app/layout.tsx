import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./assets/vendors/ti-icons/css/themify-icons.css";
import "./assets/vendors/feather/feather.css";

import "./assets/css/style-dark.css";
import "./globals.css";
import { ToastProvider } from "./components/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skymail",
  description: "SkyMail is a developer-friendly Mailtrap alternative that lets you safely test, capture, and debug emails in a secure environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body>
        <ToastProvider />
        <div className="container-scroller">{children}</div>
      </body>
    </html>
  );
}

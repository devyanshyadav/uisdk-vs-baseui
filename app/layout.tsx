import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AgentBridge } from "../lib/agent/agent-bridge";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UI SDK vs Base UI — emoji picker",
  description:
    "Side-by-side emoji pickers built with UI SDK and Base UI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AgentBridge />
        {children}
      </body>
    </html>
  );
}
import "./globals.css";

import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "AM Global Hub",
  description: "Premium Corporate Gifting Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.variable}
          bg-[#FAF8F5]
          text-[#111111]
          antialiased
        `}
      >
        {/* GLOBAL NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="pt-20">
          {children}
        </main>

      </body>
    </html>
  );
}
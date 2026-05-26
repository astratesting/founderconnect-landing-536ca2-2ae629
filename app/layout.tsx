import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FounderConnect — AI-Powered Co-Founder Matching",
  description:
    "FounderConnect uses advanced AI matching to connect entrepreneurs with verified, compatible co-founders. Stop searching. Start building.",
  keywords: [
    "co-founder matching",
    "find co-founder",
    "startup co-founder",
    "AI matching",
    "entrepreneur network",
    "FounderConnect",
  ],
  openGraph: {
    title: "FounderConnect — Find Your Perfect Co-Founder",
    description:
      "AI-powered co-founder matching for serious entrepreneurs. Verified profiles, intelligent compatibility scoring, and built-in communication tools.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}

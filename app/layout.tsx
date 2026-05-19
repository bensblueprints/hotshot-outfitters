import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { site } from "@/lib/site";

const bebas = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Michigan hunting",
    "guided hunts Michigan",
    "Michigan hunting outfitter",
    "Lake Huron charter fishing",
    "Huron County hunting",
    "Michigan's Thumb hunting",
    "Port Hope Michigan",
    "whitetail deer hunting Michigan",
    "wild turkey hunting Michigan",
    "Michigan waterfowl hunting",
    "Michigan goose hunting",
    "Michigan duck hunting",
    "Michigan coyote hunting",
    "Michigan rabbit hunting",
    "Michigan crow hunting",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [{ url: "/images/michigan-guided-hunting-hero-tile.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ["/images/michigan-guided-hunting-hero-tile.webp"],
  },
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-pine-deep text-bone">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}

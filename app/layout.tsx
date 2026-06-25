import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import { shop } from "@/data/shop";
import "./globals.css";

// Display face — characteristic, used for big type.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Utility/mono face — used for catalog metadata, labels, "price-sticker" text.
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${shop.name} — ${shop.tagline}`,
  description:
    "A vinyl record shop and coffee bar in Atlanta. Dig the crate, grab a coffee, spin something good.",
  openGraph: {
    title: `${shop.name} — ${shop.tagline}`,
    description: "Vinyl + coffee in Atlanta. Dig the crate.",
    type: "website",
    images: [{ url: "/png3.png" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/png3.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#16100c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        {children}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}

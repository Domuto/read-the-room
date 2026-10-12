import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Space_Mono } from "next/font/google";
import { shop } from "@/data/shop";
// Klaviyo disabled for now — re-enable by uncommenting the import and <KlaviyoScript /> below.
// import KlaviyoScript from "@/components/KlaviyoScript";
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
  metadataBase: new URL(shop.url),
  title: `${shop.name} — ${shop.tagline}`,
  description: shop.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${shop.name} — Vinyl and cocktails`,
    description: "Vinyl and cocktails on the BeltLine in Atlanta. Dig the crate.",
    type: "website",
    url: "/",
    siteName: shop.name,
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarOrPub",
  name: shop.name,
  description: shop.description,
  url: shop.url,
  image: `${shop.url}/png3.png`,
  telephone: shop.phone,
  servesCuisine: "Cocktails, coffee",
  hasMap: shop.maps,
  sameAs: [shop.instagram],
  address: {
    "@type": "PostalAddress",
    streetAddress: shop.street,
    addressLocality: shop.city,
    addressRegion: shop.region,
    postalCode: shop.postalCode,
    addressCountry: "US",
  },
  ...(shop.hours.length > 0 && {
    openingHoursSpecification: shop.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.schemaDays,
      opens: h.opens,
      closes: h.closes,
    })),
  }),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="grain-overlay" aria-hidden="true" />
        {/* <KlaviyoScript /> */}
      </body>
    </html>
  );
}

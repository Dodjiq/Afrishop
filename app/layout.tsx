import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CursorEffect } from "@/components/ui/cursor-effect";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AfriShop - Générateur de Boutiques Shopify pour l'Afrique",
    template: "%s | AfriShop",
  },
  description:
    "Créez votre boutique Shopify en 5 minutes. Importez des produits depuis AliExpress, Amazon, Alibaba. Plateforme de dropshipping pour entrepreneurs africains.",
  keywords: [
    "shopify",
    "dropshipping",
    "afrique",
    "e-commerce",
    "boutique en ligne",
    "aliexpress",
    "côte d'ivoire",
    "togo",
    "sénégal",
  ],
  authors: [{ name: "AfriShop Team" }],
  creator: "AfriShop",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://afrishop.com",
    title: "AfriShop - Générateur de Boutiques Shopify",
    description:
      "Créez votre boutique e-commerce en 5 minutes. Solution de dropshipping adaptée au marché africain.",
    siteName: "AfriShop",
  },
  twitter: {
    card: "summary_large_image",
    title: "AfriShop - Générateur de Boutiques Shopify",
    description: "Créez votre boutique e-commerce en 5 minutes",
    creator: "@afrishop",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CursorEffect />
        {children}
      </body>
    </html>
  );
}

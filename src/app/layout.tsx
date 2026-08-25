import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/commerce/CartDrawer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: {
    default: "VERNYQ — Premium Cold Plunge Systems | Home Recovery Equipment",
    template: "%s | VERNYQ",
  },
  description:
    "Premium all-in-one cold plunge systems engineered for home recovery. Integrated cooling, filtration, and insulation. Designed to perform. Built to last.",
  keywords: [
    "cold plunge",
    "cold plunge tub",
    "cold water immersion",
    "home recovery",
    "cold plunge with chiller",
    "all-in-one cold plunge",
    "recovery equipment",
    "cold plunge system",
    "cold therapy",
    "athletic recovery",
  ],
  authors: [{ name: "VERNYQ" }],
  creator: "VERNYQ",
  publisher: "VERNYQ",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vernyq.com",
    siteName: "VERNYQ",
    title: "VERNYQ — Premium Cold Plunge Systems",
    description:
      "Premium all-in-one cold plunge systems engineered for home recovery.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VERNYQ Premium Cold Plunge System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VERNYQ — Premium Cold Plunge Systems",
    description:
      "Premium all-in-one cold plunge systems engineered for home recovery.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#faf9f7]">
        <Providers>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}

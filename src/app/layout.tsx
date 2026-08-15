import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hubvest — Platform Rantai Pasok Pertanian",
  description:
    "Hubvest menghubungkan petani lokal dengan tengkulak melalui data harga real-time, Price Fairness Index, dan grading komoditas berbasis Computer Vision.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Hubvest",
  },
  openGraph: {
    title: "Hubvest — Platform Rantai Pasok Pertanian",
    description:
      "Kolaborasi rantai pasok pertanian yang transparan dan adil.",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1B4332",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}

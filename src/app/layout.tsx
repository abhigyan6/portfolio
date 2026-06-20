import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Abhigyan Dwivedi — Designer & Developer",
  description: "Elite Design Engineer bridging the gap between aesthetics and WebGL.",
  openGraph: {
    title: "Abhigyan Dwivedi — Designer & Developer",
    description: "Elite Design Engineer bridging the gap between aesthetics and WebGL.",
    url: "https://abhigyan.design",
    siteName: "Abhigyan Dwivedi Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhigyan Dwivedi — Designer & Developer",
    description: "Elite Design Engineer bridging the gap between aesthetics and WebGL.",
  },
  verification: {
    google: "qDEsjLciZdZVndgpmNunOxDlv7JWPJpnc1AhVbmo5RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <Script id="console-interceptor" strategy="beforeInteractive">
          {`
            if (typeof window !== 'undefined') {
              const originalInfo = console.info;
              console.info = function(...args) {
                if (typeof args[0] === 'string' && args[0].includes('React DevTools')) return;
                originalInfo.apply(console, args);
              };
              const originalLog = console.log;
              console.log = function(...args) {
                if (typeof args[0] === 'string' && args[0].includes('React DevTools')) return;
                originalLog.apply(console, args);
              };
              const originalWarn = console.warn;
              console.warn = function(...args) {
                if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return;
                originalWarn.apply(console, args);
              };
            }
          `}
        </Script>
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}

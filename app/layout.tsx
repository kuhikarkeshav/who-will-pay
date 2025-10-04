import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Who Will Pay the Bill? 🍕💸",
  description: "A fun app to randomly decide who pays the bill among friends! Spin the wheel and see who gets lucky (or unlucky) 😂",
  keywords: "bill splitter, who pays, random picker, fun app, friends, restaurant bill",
  authors: [{ name: "Who Will Pay" }],
  metadataBase: new URL("https://whowillpaybill.netlify.app"),
  openGraph: {
    title: "Who Will Pay the Bill? 🍕💸",
    description: "Spin the wheel and see who pays! Better luck next time 😂",
    url: "https://whowillpaybill.netlify.app",
    type: "website",
    locale: "en_US",
    siteName: "Who Will Pay the Bill",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Who Will Pay the Bill - Fun Bill Splitter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Who Will Pay the Bill? 🍕💸",
    description: "Spin the wheel and see who pays! Better luck next time 😂",
    images: ["https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=630&fit=crop"],
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍕</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}


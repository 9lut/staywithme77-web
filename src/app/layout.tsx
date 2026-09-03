import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Thai, Sarabun } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/app/lib/siteConfig";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-plex-sans-thai",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: siteConfig.brand.displayName,
  description: siteConfig.brand.tagline.th,
  keywords: [...siteConfig.seo.keywords],
  openGraph: {
    title: siteConfig.brand.displayName,
    description: siteConfig.brand.tagline.th,
    images: [
      {
        url: siteConfig.seo.socialImage.path,
        width: siteConfig.seo.socialImage.width,
        height: siteConfig.seo.socialImage.height,
        alt: siteConfig.seo.socialImage.alt,
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
    <html
      lang="th"
      className={`${ibmPlexMono.variable} ${ibmPlexSansThai.variable} ${sarabun.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

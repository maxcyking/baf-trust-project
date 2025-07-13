import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BAF Trust - Bharat Agro Foundation | Agricultural Training & Development",
  description: "BAF Trust is a leading agricultural foundation providing comprehensive training programs in goat farming, poultry, sheep farming, and more. Empowering farmers across India with modern agricultural techniques and sustainable farming practices.",
  keywords: "agriculture, farming, goat farming, poultry, sheep farming, agricultural training, farmer education, sustainable farming, BAF Trust, Bharat Agro Foundation",
  authors: [{ name: "BAF Trust" }],
  creator: "BAF Trust - Bharat Agro Foundation",
  publisher: "BAF Trust",
  openGraph: {
    title: "BAF Trust - Bharat Agro Foundation",
    description: "Empowering farmers with modern agricultural training and sustainable farming practices",
    type: "website",
    locale: "en_IN",
    siteName: "BAF Trust",
  },
  twitter: {
    card: "summary_large_image",
    title: "BAF Trust - Bharat Agro Foundation",
    description: "Agricultural training and development foundation",
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
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

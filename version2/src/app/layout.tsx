import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Brainrot LinkedIn Post Generator",
  description:
    "Generate Unhinged LinkedIn posts with varying levels of formality.",
  openGraph: {
    title: "Brainrot LinkedIn Post Generator",
    description:
      "Generate Unhinged LinkedIn posts with varying levels of formality.",
    url: "https://brainrot-linkedin-post-generator.vercel.app/",
    siteName: "Brainrot LinkedIn Post Generator",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Ayo Jajan App",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

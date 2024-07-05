import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import Script from "next/script";
import { Footer } from "./components/Footer";
import { twJoin } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pixel Art Builder",
  description: "Easily create pixel/beads art with this free online tool. Upload an image, adjust pixel size, and start painting!",
  icons: [
    {
      url: "/favicon.png",
      rel: "icon",
      sizes: "any",
    },
  ],
  twitter: {
    card: "summary_large_image",
    title: "Pixel Art Builder",
    description:
      "Easily create pixel/beads art with this free online tool. Upload an image, adjust pixel size, and start painting!",
    images: "https://buildpixelart.com/og.png",
  },
  openGraph: {
    type: "website",
    url: "https://buildpixelart.com",
    title: "Pixel Art Builder",
    description:
      "Easily create pixel/beads art with this free online tool. Upload an image, adjust pixel size, and start painting!",
    images: "https://buildpixelart.com/og.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={twJoin(inter.className, 'min-h-screen flex flex-col')}>
        <Header />
        {children}
        <Footer />
      </body>
      <Script
        src="https://scripts.simpleanalyticscdn.com/latest.js"
        strategy="afterInteractive"
      />
    </html>
  );
}

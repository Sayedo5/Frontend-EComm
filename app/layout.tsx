import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const urdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urdu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Four Years & Forever ❤️",
  description: "A small place on the internet, made for one person.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#190A12",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${urdu.variable}`}>
      <body className="bg-maroon-deepest text-warmwhite font-serif antialiased">{children}</body>
    </html>
  );
}

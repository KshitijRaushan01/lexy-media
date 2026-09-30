import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroller from "@/components/SmoothScroller";
import Navigation from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LEXy MEDIA | Social Media & Creative Agency",
  description:
    "LEXy MEDIA creates strategic social media, content and creative campaigns that help brands get seen, remembered and talked about.",
  keywords: ["social media agency", "content creation", "creative direction", "brand strategy", "LEXy MEDIA"],
  openGraph: {
    title: "LEXy MEDIA | Social Media & Creative Agency",
    description:
      "LEXy MEDIA creates strategic social media, content and creative campaigns that help brands get seen, remembered and talked about.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LEXy MEDIA | Social Media & Creative Agency",
    description:
      "LEXy MEDIA creates strategic social media, content and creative campaigns that help brands get seen, remembered and talked about.",
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
        className={`${inter.variable} ${instrument.variable} antialiased bg-[#080808] text-[#f0ede6] font-sans selection:bg-[#ff3b00] selection:text-white`}
      >
        <SmoothScroller>
          <CustomCursor />
          <Navigation />
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}

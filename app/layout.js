import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NutriNest AI - Your Family's Smart Kitchen Companion",
  description:
    "An AI-powered kitchen assistant that helps families create recipes, plan meals, manage pantry ingredients, and make smarter nutrition decisions.",
  icons: {
    icon: "images/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative text-black">
        <Providers>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </Providers>
        <Script src="https://cdn.lordicon.com/lordicon.js" />
      </body>
    </html>
  );
}

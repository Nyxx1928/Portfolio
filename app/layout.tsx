import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { PageTransition } from "@/components/layout/PageTransition";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manga Portfolio",
  description: "A manga-inspired personal portfolio website showcasing creative work",
  keywords: ["portfolio", "manga", "web development", "design"],
  authors: [{ name: "Manga Portfolio" }],
  creator: "Manga Portfolio",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Manga Portfolio",
    description: "A manga-inspired personal portfolio website showcasing creative work",
    siteName: "Manga Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="antialiased font-body bg-manga-white text-manga-black">
        <SmoothScrollProvider>
          <Navigation />
          <main className="pt-16 min-h-screen">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

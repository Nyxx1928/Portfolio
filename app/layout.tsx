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
        {/* Skip-to-content link for keyboard / screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-manga-black focus:text-manga-white focus:font-heading focus:uppercase focus:tracking-wider focus:border-manga focus:border-manga-white focus:shadow-manga"
        >
          Skip to content
        </a>

        <SmoothScrollProvider>
          <Navigation />
          <main id="main-content" className="pt-16 min-h-screen" role="main">
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

import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { HorizontalAppShell } from "@/components/horizontal-scroll/HorizontalAppShell";
import { HorizontalScrollProvider } from "@/components/horizontal-scroll/HorizontalScrollContext";
import { Navigation } from "@/components/layout/Navigation";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Toaster } from "@/components/retroui/Sonner";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const bebasNeue = localFont({
  src: [{ path: "../public/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" }],
  variable: "--font-heading",
  display: "swap",
});

const inter = localFont({
  src: [{ path: "../public/fonts/Inter-Variable.woff2", weight: "100 900", style: "normal" }],
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
    <html lang="en" suppressHydrationWarning className={`${bebasNeue.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="antialiased font-body bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {/* Skip-to-content link for keyboard / screen-reader users */}
          <a
            href="#active-panel-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-manga-black focus:text-manga-white focus:font-heading focus:uppercase focus:tracking-wider focus:border-manga focus:border-manga-white focus:shadow-manga"
          >
            Skip to content
          </a>

          <HorizontalScrollProvider>
            <SmoothScrollProvider>
              <Navigation />
              <HorizontalAppShell>{children}</HorizontalAppShell>
              <Toaster />
            </SmoothScrollProvider>
          </HorizontalScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

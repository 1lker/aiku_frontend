import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { KBarProvider } from "@/components/kbar-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIKU - AI Travel Planner",
  description: "Plan your perfect trip with AI assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <KBarProvider>
          <header className="sticky top-0 z-50 h-16 flex items-center justify-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="text-xl font-bold tracking-[0.08em] md:text-4xl md:tracking-[0.14em]">
              AIKU
            </div>
          </header>
          <main className="w-full max-w-3xl mx-auto px-4 py-8 md:px-8 md:pt-28">{children}</main>
        </KBarProvider>
      </body>
    </html>
  );
}

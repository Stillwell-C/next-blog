import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";
import { Providers } from "./providers";

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
  title: {
    default: "Next Blog",
    template: "%s | Next Blog",
  },
  description: "Next.JS Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} `}>
          <Providers>
            <div className='flex justify-center flex-1 dark:bg-gray-900 dark:text-white'>
              <div className='min-h-screen max-w-7xl flex flex-col items-center flex-1'>
                <Navbar />
                <main className='flex-1 w-full'>{children}</main>
                <Footer />
              </div>
            </div>
          </Providers>
        </body>
      </html>
    </SessionProvider>
  );
}

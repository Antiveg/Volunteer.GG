import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from '../components/Navbar'
import "./globals.css";
import SessionProviderWrapper from './nextauth_provider'
import ReactQueryProvider from './tanstack_provider'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Volunteer GG",
  description: "Still in development...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} relative antialiased pt-20 min-h-screen flex flex-col`}
      >
        <SessionProviderWrapper>
          <ReactQueryProvider>
            <Navbar/>
            {children}
          </ReactQueryProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}

// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Kiwi_Maru } from "next/font/google"; // ★ 追加
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kiwiMaru = Kiwi_Maru({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kiwi-maru", // ★ 可変フォントとして
});

export const metadata: Metadata = {
  title: "Oku Cafe",
  description: "昼と夜のメニューアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kiwiMaru.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}

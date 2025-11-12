import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import "virtualized/style.css";
export const metadata: Metadata = {
  title: "List Virtualization Example",
  description: "Example app for list virtualization library",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.variable} suppressHydrationWarning={true}>
        <header style={{ display: "flex", gap: "1rem" }}>
          <Link href="/no-virtualization">No virtualization</Link>
          <Link href="/fixed">
            Fixed height item List Virtualization Example
          </Link>
          <Link href="/dynamic">
            Dynamic height item List Virtualization Example
          </Link>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

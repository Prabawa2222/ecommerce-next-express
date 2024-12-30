import type { Metadata } from "next";
import { fontsora } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontsora.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}

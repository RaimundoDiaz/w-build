import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "W-Build",
  description: "W-Build investments platform",
  generator:   "Next.js"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

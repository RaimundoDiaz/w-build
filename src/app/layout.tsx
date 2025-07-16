import AuthContextProvider from "@/presentation/context/AuthContext";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
// eslint-disable-next-line camelcase
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets:  ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets:  ["latin"]
});

export const metadata: Metadata = {
  title:       "wbuild.io",
  description: "Inversiones inmobiliarias"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthContextProvider session={session}>{children}</AuthContextProvider>
      </body>
    </html>
  );
}

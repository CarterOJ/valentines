import { MessageProvider  } from "./messageContext";
import type { Metadata } from "next";
import { Playfair_Display, Work_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-title",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Be My Valentine",
  description: "A small love note for a very special person.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${workSans.variable} antialiased`}>
        <MessageProvider>
          {children}
        </MessageProvider>
      </body>
    </html>
  );
}

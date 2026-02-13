import { MessageProvider  } from "@/components/messageContext";
import { SwitchPageProvider } from "@/components/switchPageContext";
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
  title: "Chesney's Valentine's",
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
        <SwitchPageProvider>
          <MessageProvider>
            {children}
          </MessageProvider>
        </SwitchPageProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Barlow } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "./context/modalContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const barlow = Barlow({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "Trello: Style Task Management App",
  description: "Trello: Style Task Management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The `className` prop is used to apply the font styles to the HTML element.
    <html lang="en" className={barlow.variable + " " + inter.className}>
      <body>
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}

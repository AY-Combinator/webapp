import type { Metadata } from "next";
import {
  Inter,
  Archivo,
  Archivo_Black,
  Source_Serif_4,
} from "next/font/google";
import "./globals.scss";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  weight: "400",
  variable: "--font-archivo-black",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AY Combinator",
  description:
    "AY Combinator is an AI-powered Web3 startup incubator operating as a DAO. AI agents guide founders through the program, evaluate projects, and allocate funding through on-chain governance and investment smart contracts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${archivo.variable} ${archivoBlack.variable} ${inter.className} ${sourceSerif.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

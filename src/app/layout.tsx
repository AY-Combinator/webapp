import type { Metadata } from "next";
import { Inter, Archivo, Archivo_Black } from "next/font/google";
import "./globals.scss";
import { Toaster } from "@/components/ui/sonner";

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

export const metadata: Metadata = {
  title: "AY Combinator",
  description:
    "Lorem ipsum odor amet, consectetuer adipiscing elit. Sollicitudin congue ut nostra eleifend hac in elementum cras!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${archivo.variable} ${archivoBlack.variable} ${inter.className} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

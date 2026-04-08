import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PERFORMAKON — Assessoria de Marketplace | Mercado Livre, Shopee, Amazon",
  description:
    "Assessoria especializada em marketplace. Estruturamos sua operação no Mercado Livre com foco em lucro real: catálogo, precificação, publicidade e logística. Conheça o método.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Cormorant_Garamond, Unbounded, Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/context/cart-context";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const unbounded = Unbounded({
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: "--font-unbounded",
});

const geist = Geist({
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "L'essence - Decants de Perfumes de Diseñador",
  description: "Descubre tu fragancia perfecta con nuestra selección de decants de perfumes de diseñador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${unbounded.variable} ${geist.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

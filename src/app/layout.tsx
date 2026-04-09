import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { AppShell } from "@/components/app-shell";
import { getSiteUrl } from "@/libs/site-url";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "E-commerce — Demo",
    template: "%s | E-commerce",
  },
  description:
    "Loja de demonstração em Next.js: catálogo fictício, carrinho no navegador e checkout simulado.",
  applicationName: "E-commerce Demo",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "E-commerce Demo",
    title: "E-commerce — Loja de demonstração",
    description:
      "Catálogo local, tema claro/escuro e fluxo de compra sem backend.",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-commerce — Demo",
    description: "Loja de demonstração em Next.js",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e17" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.className} ${inter.variable} antialiased`}>
        <a
          href="#conteudo-principal"
          className="fixed left-4 top-4 z-[100] -translate-y-[200%] rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 dark:focus:ring-cyan-400 dark:focus:ring-offset-[#0a0e17]"
        >
          Ir para o conteúdo
        </a>
        <Script id="theme-class" strategy="beforeInteractive">
          {`(function(){try{var k=localStorage.getItem('ecommerce-theme');document.documentElement.classList.toggle('dark',k==='dark')}catch(e){}})()`}
        </Script>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}

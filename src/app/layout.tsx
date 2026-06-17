import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import CartModal from '@/components/CartModal';
import { ModoOrcamentoProvider } from '@/context/ModoOrcamentoContext';

const inter = Inter({ subsets: ['latin'] });
const GOOGLE_ADS_ID = 'AW-18106872843';

export const metadata: Metadata = {
  title: 'EcoClean - Fidelidade Vendas',
  description: 'Aplicação de fidelidade para vendas',
  icons: {
    icon: [
      { url: '/logocon.png', type: 'image/png' },
      { url: '/logocon.png', sizes: '32x32', type: 'image/png' },
      { url: '/logocon.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/logocon.png',
    apple: '/logocon.png',
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/logocon.png',
      },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <ModoOrcamentoProvider>
            <CartProvider>
              {children}
              <CartModal />
            </CartProvider>
          </ModoOrcamentoProvider>
        </AuthProvider>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}

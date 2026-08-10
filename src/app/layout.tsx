import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import CartModal from '@/components/CartModal';
import { ModoOrcamentoProvider } from '@/context/ModoOrcamentoContext';

const inter = Inter({ subsets: ['latin'] });
const GOOGLE_ADS_ID = 'AW-18342488748';

export const metadata: Metadata = {
  title: 'EcoClean - Fidelidade Vendas',
  description: 'Aplicação de fidelidade para vendas',
  icons: {
    icon: [
      { url: '/logoicon.jpg', type: 'image/jpeg', sizes: '32x32' },
    ],
    shortcut: '/logoicon.jpg',
    apple: '/logoicon.jpg',
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
        <Analytics />
      </body>
    </html>
  );
}

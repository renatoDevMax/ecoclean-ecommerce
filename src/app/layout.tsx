import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import CartModal from '@/components/CartModal';
import { ModoOrcamentoProvider } from '@/context/ModoOrcamentoContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Projeto Fidelidade Vendas',
  description: 'Aplicação de fidelidade para vendas',
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
      </body>
    </html>
  );
}

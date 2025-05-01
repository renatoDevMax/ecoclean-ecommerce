'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinalizandoPedido from '@/components/FinalizandoPedido';

export default function FinalizarPedidoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8f9fa] to-[#e9f3ff]">
      <Header />
      <main className="flex-grow pt-24">
        <FinalizandoPedido />
      </main>
      <Footer />
    </div>
  );
}

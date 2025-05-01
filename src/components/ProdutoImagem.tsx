'use client';

import Image from 'next/image';
import { useState } from 'react';
import ModalProduto from './ModalProduto';
import { useCart } from '@/context/CartContext';

interface ProdutoImagemProps {
  src: string;
  alt: string;
  className?: string;
  categoria?: string;
  produto?: {
    id: string;
    nome: string;
    valor: number;
    descricao: string;
    imagem: string;
    categoria: string;
    cod?: string;
  };
}

export default function ProdutoImagem({ src, alt, className = '', produto }: ProdutoImagemProps) {
  const [modalAberto, setModalAberto] = useState(false);
  const { cartItems } = useCart();

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  return (
    <>
      <div
        id={produto ? `produto-imagem-${produto.id}` : undefined}
        className="relative w-full h-full cursor-pointer group"
        onClick={produto ? abrirModal : undefined}
      >
        <div className="absolute inset-0 bg-[#173363]/0 group-hover:bg-[#173363]/5 transition-all duration-300 z-10"></div>

        <Image
          src={src || '/produto-default.jpg'}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-contain ${className} transition-transform duration-500 group-hover:scale-105`}
          priority
        />

        {produto && (
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-2.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <svg
                className="w-5 h-5 text-[#173363]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      {modalAberto && produto && <ModalProduto product={produto} onClose={fecharModal} />}
    </>
  );
}

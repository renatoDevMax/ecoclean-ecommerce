'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface CartButtonProps {
  className?: string;
}

export default function CartButton({ className = '' }: CartButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const { totalItems, openCart } = useCart();

  // Função para animar o botão quando um item é adicionado
  const animateCart = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <button
      className={`relative group ${className}`}
      onClick={() => {
        animateCart();
        openCart();
      }}
      aria-label="Abrir carrinho"
    >
      <div
        className={`
        p-2.5 rounded-full bg-white/10 backdrop-blur-sm
        hover:bg-white/20 transition-all duration-300
        flex items-center justify-center
        border border-[#173363]/10 shadow-sm
        transform ${isAnimating ? 'scale-110' : 'scale-100'}
        group-hover:shadow-md group-hover:border-[#6EC747]/30
      `}
      >
        <svg
          className="w-5 h-5 text-[#173363] group-hover:text-[#6EC747] transition-colors duration-300"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#6EC747] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md transform transition-all duration-300 group-hover:scale-110 animate-fadeIn">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
}

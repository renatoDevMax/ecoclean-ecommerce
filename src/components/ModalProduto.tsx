'use client';

import React, { useState, useEffect, CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useCart, CartProduct } from '@/context/CartContext';
import { useModoOrcamento } from '@/context/ModoOrcamentoContext';

// Usando o mesmo tipo do CartContext
type Produto = Omit<CartProduct, 'quantidade'>;

interface ModalProdutoProps {
  product: Produto;
  onClose: () => void;
  onAddToCart?: (product: Produto) => void;
}

export default function ModalProduto({ product, onClose, onAddToCart }: ModalProdutoProps) {
  const [animate, setAnimate] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
  const { isOrcamentoAtivo } = useModoOrcamento();
  const [mounted, setMounted] = useState(false);
  const [imgStyle, setImgStyle] = useState<CSSProperties>({
    transition: 'transform 0.3s ease',
    transform: 'scale(1)',
    transformOrigin: 'center center',
  });

  // Verifica se o produto está no carrinho
  const produtoNoCarrinho = cartItems.find(item => item.id === product.id);

  useEffect(() => {
    // Garantir que o componente está montado (para o portal)
    setMounted(true);

    // Impedir a rolagem do body quando o modal estiver aberto
    document.body.style.overflow = 'hidden';

    // Delay para disparar animação de entrada
    setTimeout(() => setAnimate(true), 10);
    // Aprovar conteúdo após modal abrir
    const contentTimer = setTimeout(() => setContentVisible(true), 350);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(contentTimer);
    };
  }, []);

  // Fecha o modal com animação inversa
  const handleClose = () => {
    setAnimate(false);
    setContentVisible(false);
    setTimeout(onClose, 300);
  };

  // Função para adicionar produto ao carrinho
  const handleAddToCart = () => {
    addToCart(product);
    // Chamar a função original se existir
    onAddToCart && onAddToCart(product);
  };

  // Função para atualizar quantidade
  const handleUpdateQuantity = (quantidade: number) => {
    if (quantidade <= 0) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, quantidade);
    }
  };

  const precoFormatado = product.valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  // Conteúdo do modal
  const modalContent = (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${animate ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
      style={{ isolation: 'isolate' }}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden transition-transform duration-300 ${animate ? 'scale-100' : 'scale-95'}`}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="relative w-full h-64 overflow-hidden"
          onMouseMove={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setImgStyle({
              transition: 'transform 0.3s ease',
              transform: 'scale(1.5)',
              transformOrigin: `${x}% ${y}%`,
            });
          }}
          onMouseLeave={() => {
            setImgStyle({
              transition: 'transform 0.3s ease',
              transform: 'scale(1)',
              transformOrigin: 'center center',
            });
          }}
        >
          <Image
            src={product.imagem}
            alt={product.nome}
            fill
            style={imgStyle}
            className="object-contain"
          />
        </div>
        <div className="p-6">
          {/* Conteúdo entra deslizando da esquerda */}
          <div
            className={`transform transition-all duration-300 ${contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-semibold text-[#173363]">{product.nome}</h3>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-4">{product.descricao}</p>
            <div className="mb-6">
              {isOrcamentoAtivo ? (
                <span className="text-sm font-light text-gray-600">
                  Faça seu login para visualizar o preço.
                </span>
              ) : (
                <span className="text-xl font-medium text-[#173363]">{precoFormatado}</span>
              )}
            </div>

            {produtoNoCarrinho ? (
              // Controle de quantidade quando produto está no carrinho
              <div className="w-full flex items-center justify-between bg-white border border-[#173363] rounded-lg py-3 px-4 transition-all duration-500 animate-fade-in">
                <span className="text-[#173363] font-medium">Quantidade:</span>
                <div className="flex items-center border border-gray-200 rounded-md">
                  <button
                    type="button"
                    onClick={() => handleUpdateQuantity(produtoNoCarrinho.quantidade - 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 focus:outline-none"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={produtoNoCarrinho.quantidade}
                    onChange={e => handleUpdateQuantity(parseInt(e.target.value) || 1)}
                    className="w-14 text-center border-0 focus:outline-none text-[#173363]"
                  />
                  <button
                    type="button"
                    onClick={() => handleUpdateQuantity(produtoNoCarrinho.quantidade + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 focus:outline-none"
                  >
                    +
                  </button>
                </div>
              </div>
            ) : (
              // Botão de adicionar ao carrinho
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#173363] hover:bg-[#0f2042] text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Adicionar ao Carrinho
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Renderizar o modal no body usando um portal
  return mounted ? createPortal(modalContent, document.body) : null;
}

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart, CartProduct } from '@/context/CartContext';
import { useModoOrcamento } from '@/context/ModoOrcamentoContext';
import ModalSolicitacaoOrcamento from './ModalSolicitacaoOrcamento';
import { enviarMensagemWhatsApp, formatarItensParaOrcamentoWhatsApp } from '@/lib/api';

export default function CartModal() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalValue,
    totalItems,
    clearCart,
  } = useCart();
  const { isOrcamentoAtivo } = useModoOrcamento();
  const router = useRouter();
  const [animate, setAnimate] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [showOrcamentoModal, setShowOrcamentoModal] = useState(false);
  const [isLoadingOrcamento, setIsLoadingOrcamento] = useState(false);
  const [orcamentoSuccessMessage, setOrcamentoSuccessMessage] = useState<string | null>(null);
  const [orcamentoErrorMessage, setOrcamentoErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isCartOpen) {
      setTimeout(() => setAnimate(true), 10);
      setTimeout(() => setContentVisible(true), 350);
    } else {
      setAnimate(false);
      setContentVisible(false);
    }
  }, [isCartOpen]);

  const formatarPreco = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleClose = () => {
    setAnimate(false);
    setContentVisible(false);
    setTimeout(() => {
      closeCart();
      setShowOrcamentoModal(false);
      setOrcamentoSuccessMessage(null);
      setOrcamentoErrorMessage(null);
    }, 300);
  };

  const handleFinalizarCompra = () => {
    handleClose();
    setTimeout(() => {
      router.push('/finalizar-pedido');
    }, 300);
  };

  const handleSolicitarOrcamentoClick = () => {
    setOrcamentoErrorMessage(null);
    setOrcamentoSuccessMessage(null);
    setShowOrcamentoModal(true);
  };

  const handleOrcamentoSubmit = async (dadosUsuario: {
    nome: string;
    telefone: string;
    endereco: string;
    cpfcnpj: string;
  }) => {
    setIsLoadingOrcamento(true);
    setOrcamentoErrorMessage(null);
    setOrcamentoSuccessMessage(null);

    const itensFormatados = formatarItensParaOrcamentoWhatsApp(cartItems);
    const numeroTelefoneLimpo = dadosUsuario.telefone.replace(/\D/g, '');

    const mensagemWhatsApp = `
Temos um novo orçamento para ${dadosUsuario.nome}

Documento: ${dadosUsuario.cpfcnpj}

Itens solicitados no orçamento:
${itensFormatados}

Enviar o orçamento para:
${dadosUsuario.telefone}

Endereço para entrega:
${dadosUsuario.endereco}

Link para conversa:
https://wa.me/55${numeroTelefoneLimpo}
    `;

    try {
      const response = await enviarMensagemWhatsApp({
        contato: '41987280741',
        mensagem: mensagemWhatsApp,
      });

      if (response.success) {
        setOrcamentoSuccessMessage(
          'Solicitação de orçamento enviada com sucesso! Entraremos em contato em breve.'
        );
        setTimeout(() => {
          handleClose();
          clearCart();
          router.push('/');
        }, 5000);
      } else {
        throw new Error(response.error || 'Falha ao enviar solicitação. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar orçamento:', error);
      setOrcamentoErrorMessage(
        error instanceof Error ? error.message : 'Ocorreu um erro desconhecido. Tente mais tarde.'
      );
    } finally {
      setIsLoadingOrcamento(false);
    }
  };

  if (!isCartOpen && !showOrcamentoModal) return null;

  return (
    <>
      {isCartOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-start justify-end bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
            animate ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={!showOrcamentoModal ? handleClose : undefined}
        >
          <div
            className={`bg-white h-full max-w-md w-full overflow-hidden transition-transform duration-300 ${
              animate ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Cabeçalho */}
              <div className="p-4 bg-[#173363] text-white flex justify-between items-center">
                <h2 className="text-xl font-medium flex items-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Seu Carrinho
                </h2>
                <button
                  onClick={handleClose}
                  className="text-white hover:text-gray-200 transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Corpo do carrinho */}
              <div
                className={`flex-grow overflow-y-auto p-4 transition-all duration-300 ${
                  contentVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-4 text-gray-300">
                      <svg
                        className="w-full h-full"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                      Seu carrinho está vazio
                    </h3>
                    <p className="text-gray-500">
                      Explore nossos produtos e adicione alguns itens ao seu carrinho!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
                      >
                        <div className="flex p-3">
                          <div className="w-20 h-20 relative flex-shrink-0">
                            <Image
                              src={item.imagem}
                              alt={item.nome}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="ml-4 flex-grow">
                            <div className="flex justify-between">
                              <h3 className="text-md font-medium text-[#173363] line-clamp-1">
                                {item.nome}
                              </h3>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-1 mb-2">
                              {item.categoria}
                            </p>
                            <div className="flex justify-between items-center">
                              {isOrcamentoAtivo ? (
                                <span className="text-sm text-gray-500">
                                  Orçamento a ser solicitado
                                </span>
                              ) : (
                                <div className="text-[#173363] font-medium">
                                  {formatarPreco(item.valor * item.quantidade)}
                                </div>
                              )}
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                                >
                                  -
                                </button>
                                <span className="w-8 text-center">{item.quantidade}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Rodapé com resumo e botão de finalizar */}
              <div
                className={`p-4 border-t border-gray-200 bg-gray-50 transition-all duration-300 ${
                  contentVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {!isOrcamentoAtivo && (
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Total</span>
                    <span className="font-medium text-[#173363]">{formatarPreco(totalValue)}</span>
                  </div>
                )}

                <div className="space-y-2">
                  {isOrcamentoAtivo ? (
                    <button
                      onClick={handleSolicitarOrcamentoClick}
                      className="w-full bg-[#6EC747] hover:bg-[#58a83a] text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center"
                      disabled={cartItems.length === 0 || isLoadingOrcamento}
                    >
                      Solicitar Orçamento
                    </button>
                  ) : (
                    <button
                      onClick={handleFinalizarCompra}
                      className="w-full bg-[#173363] hover:bg-[#0f2042] text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center"
                      disabled={cartItems.length === 0}
                    >
                      Finalizar Compra
                    </button>
                  )}

                  {cartItems.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="w-full bg-white hover:bg-gray-100 text-gray-600 py-2 border border-gray-300 rounded-lg transition-all duration-300 text-sm disabled:opacity-50"
                      disabled={isLoadingOrcamento}
                    >
                      Limpar Carrinho
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ModalSolicitacaoOrcamento
        isOpen={showOrcamentoModal}
        onClose={() => {
          if (!isLoadingOrcamento) {
            setShowOrcamentoModal(false);
            setOrcamentoSuccessMessage(null);
            setOrcamentoErrorMessage(null);
          }
        }}
        onSubmit={handleOrcamentoSubmit}
        totalItensCarrinho={totalItems}
        isLoading={isLoadingOrcamento}
        successMessage={orcamentoSuccessMessage}
        errorMessage={orcamentoErrorMessage}
      />
    </>
  );
}

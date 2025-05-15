'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { createPortal } from 'react-dom';

interface ModalSolicitacaoOrcamentoProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dados: { nome: string; telefone: string; endereco: string; cpfcnpj: string }) => void;
  totalItensCarrinho: number;
  isLoading?: boolean;
  successMessage?: string | null;
  errorMessage?: string | null;
}

export default function ModalSolicitacaoOrcamento({
  isOpen,
  onClose,
  onSubmit,
  totalItensCarrinho,
  isLoading = false,
  successMessage,
  errorMessage,
}: ModalSolicitacaoOrcamentoProps) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cpfcnpj, setCpfcnpj] = useState('');
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setAnimate(true), 10);
    } else {
      document.body.style.overflow = '';
      setAnimate(false);
      if (!successMessage) {
        setNome('');
        setTelefone('');
        setEndereco('');
        setCpfcnpj('');
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, successMessage]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    onSubmit({ nome, telefone, endereco, cpfcnpj });
  };

  const handleClose = () => {
    if (isLoading) return;
    setAnimate(false);
    setTimeout(onClose, 300);
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${
        animate ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="fixed inset-0 bg-[#173363]/50 backdrop-blur-sm" onClick={handleClose}></div>
      <div
        className={`bg-white rounded-xl shadow-2xl w-full max-w-lg relative z-10 transition-all duration-300 ease-in-out ${
          animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-[#173363] to-[#6EC747] p-5 rounded-t-xl">
          <h3 className="text-xl font-light text-white text-center">Solicitar Orçamento</h3>
        </div>

        {successMessage ? (
          <div className="p-6 text-center">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-[#6EC747]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg text-gray-700">{successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {errorMessage && (
              <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                placeholder="Seu nome completo"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="cpfcnpj" className="block text-sm font-medium text-gray-700 mb-1">
                CPF/CNPJ
              </label>
              <input
                type="text"
                id="cpfcnpj"
                value={cpfcnpj}
                onChange={e => setCpfcnpj(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                placeholder="Seu CPF ou CNPJ"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone WhatsApp
              </label>
              <input
                type="tel"
                id="telefone"
                value={telefone}
                onChange={e => setTelefone(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                placeholder="(XX) XXXXX-XXXX"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-1">
                Endereço para Entrega
              </label>
              <textarea
                id="endereco"
                value={endereco}
                onChange={e => setEndereco(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                placeholder="Rua, Número, Bairro, Cidade/UF, CEP"
                required
                disabled={isLoading}
              ></textarea>
            </div>

            <div className="pt-2 pb-1 text-center">
              <p className="text-gray-700">
                Você está solicitando um orçamento para{' '}
                <span className="font-semibold text-[#173363]">{totalItensCarrinho}</span>
                {totalItensCarrinho === 1 ? ' item' : ' itens'}.
              </p>
            </div>

            <div className="flex justify-end items-center space-x-4 pt-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 bg-gradient-to-r from-[#173363] to-[#6EC747] text-white rounded-lg hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6EC747]/50 focus:ring-offset-2 transform hover:scale-[1.03] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                {isLoading ? 'Enviando...' : 'Enviar Solicitação'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { user } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);

  // Formatar data para exibição
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Detectar clique fora do modal para fechar
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      // Prevenir rolagem do body quando o modal está aberto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Se o usuário não existe, não renderiza nada
  if (!user) return null;

  // Verificar se é um cliente matriz ou filiado
  const isFiliadoClient = 'matriz' in user;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header do Modal */}
            <div className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#173363] flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-[#6EC747]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Meu Perfil
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
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

            {/* Conteúdo do Modal */}
            <div className="p-6">
              {/* Informações pessoais */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#173363] mb-4 pb-2 border-b border-gray-100">
                  Informações Pessoais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Nome</p>
                    <p className="font-medium">{user.nome}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">CPF/CNPJ</p>
                    <p className="font-medium">{user.cpfcnpj}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Contato</p>
                    <p className="font-medium">{user.contato}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Endereço</p>
                    <p className="font-medium">{user.endereco}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Tipo de Cliente</p>
                    <p className="font-medium">{user.tipoCliente}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Data de Cadastro</p>
                    <p className="font-medium">{formatDate(user.dataCadastro)}</p>
                  </div>
                </div>
              </div>

              {/* Informações específicas para cliente filiado */}
              {isFiliadoClient && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-[#173363] mb-4 pb-2 border-b border-gray-100">
                    Informações de Filiação
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Matriz</p>
                      <p className="font-medium">{(user as any).matriz}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefícios */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#173363] mb-4 pb-2 border-b border-gray-100">
                  Meus Benefícios
                </h3>
                {user.beneficios && user.beneficios.length > 0 ? (
                  <ul className="space-y-2">
                    {user.beneficios.map((beneficio, index) => (
                      <li key={index} className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">Nenhum benefício disponível.</p>
                )}
              </div>

              {/* Benefícios da matriz (apenas para clientes filiados) */}
              {isFiliadoClient &&
                (user as any).beneficioMatriz &&
                (user as any).beneficioMatriz.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-[#173363] mb-4 pb-2 border-b border-gray-100">
                      Benefícios da Matriz
                    </h3>
                    <ul className="space-y-2">
                      {(user as any).beneficioMatriz.map((beneficio: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <svg
                            className="w-5 h-5 text-blue-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{beneficio}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* ID do Cliente */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-500 mb-1">ID do Cliente</p>
                <p className="font-mono text-xs bg-white p-2 rounded border border-gray-200 inline-block">
                  {user._id}
                </p>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="p-6 border-t border-gray-100">
              <button
                onClick={onClose}
                className="w-full md:w-auto bg-[#173363] hover:bg-[#0e2144] text-white py-2 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Fechar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

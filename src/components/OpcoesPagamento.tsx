'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import {
  salvarCompra,
  salvarCompraFidelidade,
  enviarMensagemWhatsApp,
  formatarProdutosParaMensagem,
  CompraCliente,
  CompraFidelidade,
} from '@/lib/api';

interface OpcoesPagamentoProps {
  onVoltar: () => void;
  onFinalizar: () => void;
  dadosEntrega: {
    nome: string;
    contato: string;
    endereco: string;
    alterouEndereco?: boolean;
  };
}

type MetodoPagamento = 'cartao-credito' | 'cartao-debito' | 'pix' | 'dinheiro' | 'boleto' | null;

type StatusProcessamento = 'inicial' | 'processando' | 'sucesso' | 'erro';

// Interface para os métodos de pagamento
interface MetodoPagamentoItem {
  id: string;
  titulo: string;
  descricao: string;
  icone: React.ReactNode;
  exclusivo?: boolean;
}

// Interface para as compras de fidelidade com crédito
interface CompraFidelidadeCredito {
  _id: string;
  nome: string;
  credito: number;
  statusCred: string;
  dataCompra: Date;
}

export default function OpcoesPagamento({
  onVoltar,
  onFinalizar,
  dadosEntrega,
}: OpcoesPagamentoProps) {
  const [metodoPagamento, setMetodoPagamento] = useState<MetodoPagamento>(null);
  const [valorTroco, setValorTroco] = useState('');
  const [usarCredito, setUsarCredito] = useState(false);
  const [creditoDisponivel, setCreditoDisponivel] = useState(0);
  const [carregandoCredito, setCarregandoCredito] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { cartItems, totalValue, clearCart } = useCart();
  const [metodos, setMetodos] = useState<MetodoPagamentoItem[]>([]);
  const [statusProcessamento, setStatusProcessamento] = useState<StatusProcessamento>('inicial');
  const [mensagemErro, setMensagemErro] = useState<string>('');
  const router = useRouter();

  // Verificar se a taxa de entrega deve ser aplicada (para compras abaixo de R$ 150,00)
  const aplicarTaxaEntrega = totalValue < 150;
  const valorTaxaEntrega = aplicarTaxaEntrega ? 7 : 0;

  // Calcular valor total com taxa de entrega
  const valorTotalComTaxa = totalValue + valorTaxaEntrega;

  // Verificar se o crédito disponível é maior que o subtotal
  const creditoMaiorQueSubtotal = creditoDisponivel > totalValue;

  // Buscar créditos disponíveis do usuário
  useEffect(() => {
    if (isAuthenticated && user) {
      buscarCreditosDisponiveis();
    }
  }, [isAuthenticated, user]);

  // Função para buscar os créditos disponíveis do usuário
  const buscarCreditosDisponiveis = async () => {
    if (!isAuthenticated || !user) return;

    try {
      setCarregandoCredito(true);

      console.log('Buscando créditos do usuário:', user.nome);

      // Fazer requisição à API para buscar os créditos reais no banco de dados
      const response = await fetch(
        `/api/creditos/disponivel?nome=${encodeURIComponent(user.nome)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        }
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar créditos disponíveis');
      }

      const data = await response.json();
      console.log('Créditos retornados pela API:', data);
      setCreditoDisponivel(data.creditoDisponivel || 0);
    } catch (error) {
      console.error('Erro ao buscar créditos:', error);
      setCreditoDisponivel(0);
    } finally {
      setCarregandoCredito(false);
    }
  };

  // Formatar o valor monetário
  const formatarValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Verificar se o usuário tem o benefício de flexibilidade de pagamento
  const temFlexibilidadePagamento =
    isAuthenticated &&
    user?.beneficios &&
    Array.isArray(user.beneficios) &&
    user.beneficios.includes('Flexibilidade no pagamento');

  // Configurar os métodos de pagamento com base nos benefícios do usuário
  useEffect(() => {
    // Métodos padrão disponíveis para todos
    const metodosDisponiveis: MetodoPagamentoItem[] = [
      {
        id: 'cartao-credito',
        titulo: 'Cartão de Crédito',
        descricao: 'Pagamento na entrega',
        icone: (
          <svg
            className="w-8 h-8 text-[#173363]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3 10h18M7 15h.01M11 15h2M7 15a1 1 0 011-1h8a1 1 0 011 1v3a1 1 0 01-1 1H8a1 1 0 01-1-1v-3zm12-7a2 2 0 00-2-2H7a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V8z"
            />
          </svg>
        ),
      },
      {
        id: 'cartao-debito',
        titulo: 'Cartão de Débito',
        descricao: 'Pagamento na entrega',
        icone: (
          <svg
            className="w-8 h-8 text-[#173363]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3 10h18M7 15h.01M11 15h2M7 15a1 1 0 011-1h8a1 1 0 011 1v3a1 1 0 01-1 1H8a1 1 0 01-1-1v-3zm12-7a2 2 0 00-2-2H7a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V8z"
            />
          </svg>
        ),
      },
      {
        id: 'pix',
        titulo: 'Pix',
        descricao: 'Pagamento na entrega',
        icone: (
          <div className="flex items-center justify-center w-8 h-8 text-[#173363]">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.3,12.04l1.42-1.42c0.78-0.78,0.78-2.05,0-2.83l-3.54-3.53c-0.78-0.78-2.05-0.78-2.83,0L3.51,16.07 c-0.39,0.39-0.39,1.02,0,1.41l3.54,3.54c0.39,0.39,1.02,0.39,1.41,0l2.12-2.12c-0.99-0.64-1.84-1.46-2.49-2.46L6.34,18.2 l-2.83-2.83L15.31,3.54l2.83,2.83l-1.42,1.42c1.77,0.75,3.17,2.15,3.92,3.92L20.3,12.04z" />
              <path d="M14.7,14.7L14.7,14.7c-0.28,0.28-0.28,0.74,0,1.02l3.54,3.54c0.28,0.28,0.74,0.28,1.02,0l0.71-0.71 c0.28-0.28,0.28-0.74,0-1.02l-3.54-3.54c-0.28-0.28-0.74-0.28-1.02,0L14.7,14.7z" />
              <path d="M13.39,17.02c-2.56-0.98-4.57-3-5.56-5.56l-0.72,0.72c1.09,2.94,3.4,5.24,6.34,6.34l0.71-0.72 C13.89,17.58,13.58,17.26,13.39,17.02z" />
            </svg>
          </div>
        ),
      },
      {
        id: 'dinheiro',
        titulo: 'Dinheiro',
        descricao: 'Pagamento na entrega',
        icone: (
          <svg
            className="w-8 h-8 text-[#173363]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        ),
      },
    ];

    // Adicionar opção de boleto se o usuário tiver o benefício
    if (temFlexibilidadePagamento) {
      metodosDisponiveis.push({
        id: 'boleto',
        titulo: 'Boleto',
        descricao: 'Pagamento à prazo',
        icone: (
          <svg
            className="w-8 h-8 text-[#173363]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9 12h6m-6 4h6m-6-8h6M7 20h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        ),
        exclusivo: true,
      });
    }

    setMetodos(metodosDisponiveis);
  }, [isAuthenticated, temFlexibilidadePagamento]);

  // Renderiza apenas o conteúdo adicional para a opção dinheiro
  const renderConteudoAdicional = () => {
    if (metodoPagamento !== 'dinheiro') return null;

    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200"
      >
        <div className="flex items-start">
          <div className="bg-yellow-100 p-3 rounded-full mr-4">
            <svg
              className="w-6 h-6 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Informações Importantes</h4>
            <p className="text-gray-600 mt-1">
              O pagamento será realizado no momento da entrega. Por favor, certifique-se de ter o
              valor exato, pois nossos entregadores podem não ter troco disponível.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precisa de troco para quanto?
          </label>
          <div className="flex">
            <input
              type="text"
              value={valorTroco}
              onChange={e => setValorTroco(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all"
              placeholder="Deixe em branco se não precisar de troco"
            />
          </div>
        </div>
      </motion.div>
    );
  };

  // Calcular crédito da compra
  const calcularCredito = () => {
    if (!isAuthenticated) return 0;

    // Verificar se o usuário tem o benefício "Crédito personalizado de X%"
    if (user?.beneficios && Array.isArray(user.beneficios)) {
      // Procurar por um benefício que comece com "Crédito personalizado de"
      const creditoPersonalizado = user.beneficios.find(beneficio =>
        beneficio.startsWith('Crédito personalizado de')
      );

      if (creditoPersonalizado) {
        // Extrair a porcentagem do texto "Crédito personalizado de X%"
        const percentualMatch = creditoPersonalizado.match(/(\d+)%/);
        if (percentualMatch && percentualMatch[1]) {
          const percentual = parseInt(percentualMatch[1], 10);
          return totalValue * (percentual / 100);
        }
      }

      // Cliente matriz com benefício
      if (user.beneficios.includes('Sistema de economia com crédito')) {
        return totalValue * 0.05; // 5% de crédito
      }
    }

    // Cliente filiado com benefício
    if (
      user?.tipoCliente === 'Filiado' &&
      'beneficioMatriz' in user &&
      Array.isArray(user.beneficioMatriz) &&
      user.beneficioMatriz.includes('Sistema de economia com crédito')
    ) {
      return totalValue * 0.1; // 10% de crédito
    }

    return 0;
  };

  // Obter o endereço formatado
  const getEnderecoFormatado = () => {
    // Se o usuário não alterou o endereço e está logado, usamos o endereço cadastrado
    if (!dadosEntrega?.alterouEndereco && user?.endereco) {
      return user.endereco;
    }
    // Se alterou ou é cliente novo, usamos o endereço fornecido
    return dadosEntrega?.endereco || '';
  };

  // Processar o pedido
  const processarPedido = async () => {
    if (!metodoPagamento) return;

    try {
      setStatusProcessamento('processando');
      setMensagemErro('');

      // 1. Preparar os dados da compra
      const dataAtual = new Date();
      const nomeCliente = dadosEntrega?.nome || user?.nome || '';
      const contatoCliente = dadosEntrega?.contato || user?.contato || '';
      const enderecoCliente = getEnderecoFormatado();
      const enderecoUsuario = user?.endereco || '';
      const alterouEndereco = dadosEntrega?.alterouEndereco || false;

      // Valores para cálculos
      const subtotal = totalValue; // Valor dos produtos sem taxa
      const valorTaxaEntregaFinal = valorTaxaEntrega;

      // Variáveis para controle de fluxo com crédito
      let valorComDesconto = subtotal;
      let creditoResgatado = 0;
      let creditoGerado = 0;

      // Verificar se vai usar crédito
      if (usarCredito && isAuthenticated && creditoDisponivel > 0) {
        // Usar o crédito disponível
        creditoResgatado = creditoDisponivel;

        // Se o crédito for maior que o subtotal, limitamos ao valor do subtotal
        if (creditoResgatado > subtotal) {
          creditoResgatado = subtotal;
        }

        // Calcular o novo valor após desconto do crédito
        valorComDesconto = subtotal - creditoResgatado;

        // Recalcular o crédito que será gerado com base no valor após desconto
        // Nota: A taxa de entrega não entra no cálculo do crédito
        if (isAuthenticated && user) {
          // Verificar se o usuário tem o benefício "Crédito personalizado de X%"
          if (user.beneficios && Array.isArray(user.beneficios)) {
            // Procurar por um benefício que comece com "Crédito personalizado de"
            const creditoPersonalizado = user.beneficios.find(beneficio =>
              beneficio.startsWith('Crédito personalizado de')
            );

            if (creditoPersonalizado) {
              // Extrair a porcentagem do texto "Crédito personalizado de X%"
              const percentualMatch = creditoPersonalizado.match(/(\d+)%/);
              if (percentualMatch && percentualMatch[1]) {
                const percentual = parseInt(percentualMatch[1], 10);
                creditoGerado = valorComDesconto * (percentual / 100);
              }
            } else if (user.beneficios.includes('Sistema de economia com crédito')) {
              creditoGerado = valorComDesconto * 0.05; // 5% de crédito
            }
          } else if (
            user.tipoCliente === 'Filiado' &&
            'beneficioMatriz' in user &&
            Array.isArray(user.beneficioMatriz) &&
            user.beneficioMatriz.includes('Sistema de economia com crédito')
          ) {
            creditoGerado = valorComDesconto * 0.1; // 10% de crédito
          }
        }
      } else {
        // Fluxo normal sem usar crédito
        creditoGerado = calcularCredito();
      }

      // Calcular valor total (com ou sem crédito) + taxa de entrega
      const valorTotalFinal = valorComDesconto + valorTaxaEntregaFinal;

      // 2. Criar objeto de compra para enviar à API
      const compra = {
        nome: nomeCliente,
        contato: contatoCliente,
        endereco: enderecoCliente,
        enderecoUsuario: enderecoUsuario,
        alterarEndereco: alterouEndereco,
        pagamento: metodos.find(m => m.id === metodoPagamento)?.titulo || metodoPagamento,
        produtos: cartItems,
        dataCompra: dataAtual,
        valorTotal: valorTotalFinal,
        valorTroco: metodoPagamento === 'dinheiro' ? valorTroco : undefined,
        clienteId: isAuthenticated && user?._id ? user._id : undefined,
        creditoCalculado: creditoGerado,
        usouCredito: usarCredito && creditoResgatado > 0,
        creditoResgatado: creditoResgatado,
        taxaEntrega: valorTaxaEntregaFinal,
        subtotalProdutos: subtotal,
      };

      // 3. Enviar para a API
      const response = await fetch('/api/processar-pedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(compra),
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(resultado.error || 'Erro ao processar pedido');
      }

      // 4. Se usou crédito, atualizar o status dos créditos usados para "resgatado"
      if (usarCredito && creditoResgatado > 0 && isAuthenticated && user) {
        try {
          // Atualizar os créditos usados
          const atualizacaoResponse = await fetch('/api/creditos/resgatar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nome: user.nome,
              valorResgatado: creditoResgatado,
            }),
          });

          if (!atualizacaoResponse.ok) {
            console.error('Erro ao atualizar status dos créditos, mas o pedido foi processado');
          }
        } catch (erroCred) {
          console.error('Erro ao atualizar créditos:', erroCred);
        }
      }

      // 5. Finalizar pedido com sucesso
      setStatusProcessamento('sucesso');

      // 6. Limpar carrinho e redirecionar após 6 segundos
      setTimeout(() => {
        clearCart();
        onFinalizar();
        router.push('/');
      }, 6000);
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      setStatusProcessamento('erro');
      setMensagemErro(
        error instanceof Error ? error.message : 'Ocorreu um erro ao processar seu pedido'
      );
    }
  };

  // Renderizar overlay de processamento ou sucesso
  const renderOverlay = () => {
    if (statusProcessamento === 'inicial') return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl"
        >
          {statusProcessamento === 'processando' && (
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#6EC747] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-xl font-semibold text-[#173363] mb-3">Processando seu pedido</h2>
              <p className="text-gray-600">Estamos registrando sua compra, aguarde um momento...</p>
            </div>
          )}

          {statusProcessamento === 'sucesso' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-[#6EC747]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-[#6EC747]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#173363] mb-3">
                Pedido realizado com sucesso!
              </h2>
              <p className="text-gray-600 mb-2">
                Sua compra foi registrada e em breve entraremos em contato.
              </p>
              <p className="text-sm text-gray-500">Redirecionando para a página inicial...</p>
            </div>
          )}

          {statusProcessamento === 'erro' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#173363] mb-3">Ops! Algo deu errado</h2>
              <p className="text-gray-600 mb-4">
                {mensagemErro || 'Não foi possível processar seu pedido'}
              </p>
              <button
                onClick={() => setStatusProcessamento('inicial')}
                className="py-2 px-4 bg-[#6EC747] text-white rounded-lg hover:bg-[#5BB636] transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          )}
        </motion.div>
      </div>
    );
  };

  return (
    <>
      {renderOverlay()}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-[#173363] flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-[#6EC747]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 10h18M7 15h.01M11 15h2M7 15a1 1 0 011-1h8a1 1 0 011 1v3a1 1 0 01-1 1H8a1 1 0 01-1-1v-3zm12-7a2 2 0 00-2-2H7a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V8z"
              />
            </svg>
            Escolha a forma de pagamento
          </h2>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metodos.map(metodo => (
              <motion.div
                key={metodo.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMetodoPagamento(metodo.id as MetodoPagamento)}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                  metodoPagamento === metodo.id
                    ? 'border-[#6EC747] bg-[#6EC747]/5'
                    : 'border-gray-200 hover:border-gray-300'
                } ${metodo.exclusivo ? 'relative overflow-hidden' : ''}`}
              >
                {metodo.exclusivo && (
                  <div className="absolute -right-10 top-3 bg-[#6EC747] text-white text-xs py-1 px-10 transform rotate-45 shadow-sm">
                    <span className="font-semibold">Exclusivo</span>
                  </div>
                )}
                <div className="flex flex-col items-center text-center p-4">
                  <div className={`mb-3 ${metodoPagamento === metodo.id ? 'text-[#6EC747]' : ''}`}>
                    {metodo.icone}
                  </div>
                  <h3
                    className={`font-medium mb-1 ${metodoPagamento === metodo.id ? 'text-[#173363]' : 'text-gray-700'}`}
                  >
                    {metodo.titulo}
                  </h3>
                  <p className="text-sm text-gray-500">{metodo.descricao}</p>

                  {metodoPagamento === metodo.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-3 bg-[#6EC747] text-white w-6 h-6 rounded-full flex items-center justify-center"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>{renderConteudoAdicional()}</AnimatePresence>

          {/* Texto explicativo sobre o processo do pedido */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 p-6 bg-[#F8FCFA] rounded-xl border border-[#E6F3E3] shadow-sm"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-[#6EC747]/10 p-3 rounded-full">
                <svg
                  className="w-7 h-7 text-[#6EC747]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-[#173363] mb-2">Como funciona?</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Ao finalizar seu pedido, nossa equipe especializada receberá a lista de produtos
                  solicitados e iniciará o processo de preparação e separação dos itens.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-[#173363]/10 rounded-full flex items-center justify-center mr-2">
                        <span className="text-[#173363] font-semibold">1</span>
                      </div>
                      <h4 className="font-medium text-[#173363]">Verificação</h4>
                    </div>
                    <p className="text-sm text-gray-500">
                      Verificamos a disponibilidade de todos os produtos solicitados em nosso
                      estoque.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-[#173363]/10 rounded-full flex items-center justify-center mr-2">
                        <span className="text-[#173363] font-semibold">2</span>
                      </div>
                      <h4 className="font-medium text-[#173363]">Confirmação</h4>
                    </div>
                    <p className="text-sm text-gray-500">
                      Um responsável entrará em contato via WhatsApp para confirmar os detalhes do
                      seu pedido.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-[#173363]/10 rounded-full flex items-center justify-center mr-2">
                        <span className="text-[#173363] font-semibold">3</span>
                      </div>
                      <h4 className="font-medium text-[#173363]">Entrega</h4>
                    </div>
                    <p className="text-sm text-gray-500">
                      Você receberá uma notificação quando seu pedido estiver a caminho.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Opção para usar crédito disponível */}
          {isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-[#173363]/10 p-3 rounded-full">
                  <svg
                    className="w-7 h-7 text-[#173363]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-[#173363]">Crédito Disponível</h3>
                    {carregandoCredito ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-[#173363]/20 border-t-[#173363] rounded-full animate-spin mr-2"></div>
                        <span className="text-gray-500">Calculando...</span>
                      </div>
                    ) : (
                      <span
                        className={`text-lg font-semibold ${creditoDisponivel > 0 ? 'text-green-600' : 'text-gray-500'}`}
                      >
                        {formatarValor(creditoDisponivel)}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-4">
                    {creditoDisponivel > 0
                      ? 'Você possui crédito de compras anteriores que pode ser utilizado para abater no valor deste pedido.'
                      : 'No momento você não possui créditos disponíveis para utilizar em seu pedido.'}
                  </p>

                  {creditoDisponivel > 0 && (
                    <div className="mt-2 flex items-center">
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={usarCredito}
                            onChange={() => setUsarCredito(!usarCredito)}
                            disabled={creditoDisponivel <= 0}
                          />
                          <div
                            className={`block w-14 h-7 rounded-full transition-colors duration-300 ${usarCredito && creditoDisponivel > 0 ? 'bg-[#6EC747]' : 'bg-gray-300'}`}
                          ></div>
                          <div
                            className={`dot absolute top-1 bg-white w-5 h-5 rounded-full shadow-md transition-transform duration-300 transform ${usarCredito && creditoDisponivel > 0 ? 'translate-x-8' : 'translate-x-1'}`}
                          ></div>
                        </div>
                        <div className="ml-3 text-gray-700 font-medium">
                          Usar meu crédito disponível
                        </div>
                      </label>
                    </div>
                  )}

                  {usarCredito && creditoMaiorQueSubtotal && (
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-amber-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-amber-800">Atenção</h4>
                          <p className="mt-1 text-sm text-amber-700">
                            Seu crédito disponível ({formatarValor(creditoDisponivel)}) é maior que
                            o valor dos produtos ({formatarValor(totalValue)}). Adicione mais
                            produtos ao seu pedido para utilizar todo o seu crédito, pois não é
                            permitido que sobre crédito após a compra.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-2">
                    Este valor corresponde aos créditos de compras realizadas nos últimos 30 dias
                    que já foram entregues.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-between">
            <button
              onClick={onVoltar}
              className="py-3 px-6 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Voltar para Entrega
            </button>

            <button
              onClick={processarPedido}
              disabled={
                !metodoPagamento ||
                statusProcessamento === 'processando' ||
                (usarCredito && creditoMaiorQueSubtotal)
              }
              className={`py-3 px-6 text-white rounded-lg shadow-md transition-all duration-300 font-medium transform hover:scale-[1.02] flex items-center justify-center ${
                metodoPagamento &&
                statusProcessamento !== 'processando' &&
                !(usarCredito && creditoMaiorQueSubtotal)
                  ? 'bg-[#6EC747] hover:bg-[#5BB636]'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {statusProcessamento === 'processando' ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Processando...
                </>
              ) : (
                <>
                  Finalizar Pedido
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

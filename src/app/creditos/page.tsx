'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface Credito {
  _id: string;
  data: string;
  nome: string;
  valor: number;
  credito: number;
  statusCred: string;
  status: string;
}

interface CreditoResponse {
  creditos: Credito[];
  totalDisponivel: number;
}

export default function MeusCreditos() {
  const [creditoData, setCreditoData] = useState<CreditoResponse | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Verificar se o usuário está autenticado
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const buscarCreditos = async () => {
      try {
        setCarregando(true);
        setErro(null);

        // Buscar créditos reais da API
        const response = await fetch(`/api/creditos?nome=${encodeURIComponent(user?.nome || '')}`);

        if (!response.ok) {
          throw new Error('Falha ao buscar os créditos');
        }

        const data = await response.json();
        setCreditoData(data);
      } catch (error) {
        console.error('Erro ao buscar créditos:', error);
        setErro('Não foi possível carregar seus créditos');
      } finally {
        setCarregando(false);
      }
    };

    buscarCreditos();
  }, [isAuthenticated, router, user]);

  // Formatar valor para exibição
  const formatarValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Formatar data para exibição
  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Calcular a porcentagem de crédito personalizado se o usuário tiver esse benefício
  const calcularPorcentagemCredito = () => {
    if (!user || !user.beneficios) return 5;

    // Procurar por um benefício que comece com "Crédito personalizado de"
    const creditoPersonalizado = user.beneficios.find(beneficio =>
      beneficio.startsWith('Crédito personalizado de')
    );

    if (creditoPersonalizado) {
      // Extrair a porcentagem do texto "Crédito personalizado de X%"
      const percentualMatch = creditoPersonalizado.match(/(\d+)%/);
      if (percentualMatch && percentualMatch[1]) {
        return parseInt(percentualMatch[1], 10);
      }
    }

    // Verificar o tipo de cliente para determinar a porcentagem padrão
    if (user.beneficios.includes('Sistema de economia com crédito')) {
      return 5;
    }

    // Cliente filiado com benefício
    if (
      user.tipoCliente === 'Filiado' &&
      'beneficioMatriz' in user &&
      Array.isArray(user.beneficioMatriz) &&
      user.beneficioMatriz.includes('Sistema de economia com crédito')
    ) {
      return 10;
    }

    return 0;
  };

  // Obter cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponível':
        return 'bg-green-100 text-green-800';
      case 'Inativa':
        return 'bg-yellow-100 text-yellow-800';
      case 'Resgatada':
        return 'bg-blue-100 text-blue-800';
      case 'Expirada':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const porcentagemCredito = calcularPorcentagemCredito();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#173363]">Meus Créditos</h1>
              <p className="text-gray-600 mt-2">
                Acompanhe seus créditos acumulados e aproveite em suas próximas compras
              </p>
            </div>

            {carregando ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-16 h-16 border-4 border-[#173363]/10 border-t-[#173363] rounded-full animate-spin"></div>
              </div>
            ) : erro ? (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
                <p className="font-medium">Ocorreu um erro</p>
                <p>{erro}</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Card de crédito disponível */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="bg-gradient-to-br from-[#173363] to-[#2a4a8d] rounded-2xl shadow-lg p-8 text-white relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mt-20 -mr-20"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#6EC747]/10 rounded-full -mb-10 -ml-10"></div>

                  <div className="relative z-10">
                    <div className="flex items-center mb-2">
                      <svg
                        className="w-8 h-8 mr-2 text-[#6EC747]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h2 className="text-xl font-medium">Crédito Disponível</h2>
                    </div>

                    <div className="flex items-end gap-2 mt-6 mb-4">
                      <span className="text-4xl font-bold">
                        {formatarValor(creditoData?.totalDisponivel || 0)}
                      </span>
                      <span className="text-white/70 mb-1">disponível para uso</span>
                    </div>

                    <p className="text-white/80 text-sm">
                      Olá, {user?.nome}! Você pode usar estes créditos nas suas próximas compras.
                    </p>
                  </div>
                </motion.div>

                {/* Histórico de Créditos */}
                {creditoData?.creditos && creditoData.creditos.length > 0 && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                  >
                    <div className="p-6 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-[#173363] flex items-center">
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
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        Histórico de Créditos
                      </h3>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Data
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Valor da Compra
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Crédito
                            </th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {creditoData.creditos.map(credito => (
                            <tr key={credito._id} className="hover:bg-gray-50 transition-colors">
                              <td className="py-3 px-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {formatarData(credito.data)}
                                </div>
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-[#173363]">
                                  {formatarValor(credito.valor)}
                                </div>
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-[#6EC747]">
                                  {formatarValor(credito.credito)}
                                </div>
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap">
                                <span
                                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(credito.status)}`}
                                >
                                  {credito.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {/* Card de informações */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                >
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-[#173363] flex items-center">
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
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Como Funcionam os Créditos
                    </h3>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-8 h-8 rounded-full bg-[#6EC747]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#6EC747] font-medium">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#173363] mb-1">Acumule Créditos</h4>
                        <p className="text-gray-600 text-sm">
                          Você recebe {porcentagemCredito}% de volta em créditos para cada compra
                          realizada na EcoClean.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-8 h-8 rounded-full bg-[#6EC747]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#6EC747] font-medium">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#173363] mb-1">Disponibilidade</h4>
                        <p className="text-gray-600 text-sm">
                          Os créditos ficam disponíveis 24 horas após a confirmação da entrega do
                          seu pedido e são válidos por 30 dias.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-[#6EC747]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#6EC747] font-medium">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#173363] mb-1">Utilize seus Créditos</h4>
                        <p className="text-gray-600 text-sm">
                          Na finalização do pedido, você pode selecionar a opção de usar seus
                          créditos acumulados como forma de pagamento. Lembre-se que seus créditos
                          expiram em 30 dias após serem disponibilizados, portanto utilize-os dentro
                          deste prazo.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Botão para fazer compras */}
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => router.push('/produtos')}
                    className="px-8 py-3 bg-[#6EC747] hover:bg-[#5BB636] text-white rounded-lg shadow-md transition-all duration-300 flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Comprar Agora
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

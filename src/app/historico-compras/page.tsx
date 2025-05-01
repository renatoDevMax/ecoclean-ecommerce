'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface Produto {
  id: string;
  nome: string;
  valor: number;
  descricao: string;
  imagem: string;
  categoria: string;
  quantidade: number;
  cod?: string;
}

interface Compra {
  _id: string;
  nome: string;
  contato: string;
  endereco: string;
  pagamento: string;
  produtos: Produto[];
  dataCompra: string;
  valorTotal: number;
  clienteId: string;
}

export default function HistoricoCompras() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [compraExpandida, setCompraExpandida] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const { addToCartWithQuantity, clearCart, openCart, removeFromCart } = useCart();
  const router = useRouter();
  const [importandoCarrinho, setImportandoCarrinho] = useState<string | null>(null);

  useEffect(() => {
    // Verificar se o usuário está autenticado
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const buscarHistoricoCompras = async () => {
      try {
        setCarregando(true);
        setErro(null);

        // Buscar as compras do usuário atual
        const response = await fetch('/api/compras?nome=' + encodeURIComponent(user?.nome || ''));

        if (!response.ok) {
          throw new Error('Falha ao buscar o histórico de compras');
        }

        const data = await response.json();
        setCompras(data);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
        setErro('Não foi possível carregar seu histórico de compras');
      } finally {
        setCarregando(false);
      }
    };

    buscarHistoricoCompras();
  }, [isAuthenticated, router, user]);

  // Formatar data para exibição
  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Formatar valor para exibição
  const formatarValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Lidar com expansão/contração do card
  const toggleExpansao = (id: string) => {
    if (compraExpandida === id) {
      setCompraExpandida(null);
    } else {
      setCompraExpandida(id);
    }
  };

  // Função para importar produtos para o carrinho
  const importarParaCarrinho = (compra: Compra) => {
    setImportandoCarrinho(compra._id);
    try {
      // Para cada produto da compra histórica
      compra.produtos.forEach(produto => {
        // Primeiro remover o produto se já existir no carrinho
        // para evitar somar quantidades
        removeFromCart(produto.id);

        // Agora adicionar o produto com a quantidade original da compra
        addToCartWithQuantity(
          {
            id: produto.id,
            nome: produto.nome,
            valor: produto.valor,
            descricao: produto.descricao,
            imagem: produto.imagem,
            categoria: produto.categoria,
            cod: produto.cod,
          },
          produto.quantidade
        );
      });

      // Abrir o carrinho após adicionar os produtos
      openCart();

      // Mostrar mensagem de sucesso
      setTimeout(() => {
        setImportandoCarrinho(null);
      }, 1500);
    } catch (error) {
      console.error('Erro ao importar para o carrinho:', error);
      setImportandoCarrinho(null);
    }
  };

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
              <h1 className="text-3xl font-bold text-[#173363]">
                Histórico de compras: {user?.nome}
              </h1>
              <p className="text-gray-600 mt-2">
                Consulte todas as suas compras realizadas na EcoClean
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
            ) : compras.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
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
                <h2 className="text-xl font-medium text-[#173363] mb-2">
                  Você ainda não realizou nenhuma compra
                </h2>
                <p className="text-gray-600 mb-6">
                  Explore nossos produtos e aproveite as ofertas exclusivas para clientes
                  fidelidade.
                </p>
                <button
                  onClick={() => router.push('/produtos')}
                  className="px-6 py-2 bg-[#6EC747] hover:bg-[#5BB636] text-white rounded-lg transition-all duration-300"
                >
                  Ver Produtos
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {compras.map(compra => (
                  <motion.div
                    key={compra._id}
                    layout
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-6 cursor-pointer" onClick={() => toggleExpansao(compra._id)}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <p className="text-sm text-[#6EC747] font-medium mb-1">
                            {formatarData(compra.dataCompra)}
                          </p>
                          <h3 className="text-xl font-semibold text-[#173363] mb-2">
                            Pedido #{compra._id.substring(compra._id.length - 6)}
                          </h3>
                          <p className="text-gray-600">
                            <span className="font-medium">Pagamento:</span> {compra.pagamento}
                          </p>
                        </div>

                        <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                          <p className="text-2xl font-bold text-[#173363]">
                            {formatarValor(compra.valorTotal)}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {compra.produtos.length}{' '}
                            {compra.produtos.length === 1 ? 'item' : 'itens'}
                          </p>
                          <div className="flex items-center mt-2 text-[#6EC747]">
                            <span className="text-sm mr-1">
                              {compraExpandida === compra._id ? 'Ocultar detalhes' : 'Ver detalhes'}
                            </span>
                            <svg
                              className={`w-4 h-4 transition-transform duration-300 ${
                                compraExpandida === compra._id ? 'transform rotate-180' : ''
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {compraExpandida === compra._id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6 border-t border-gray-100 pt-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">
                              Dados do Cliente
                            </h4>
                            <p className="text-[#173363] font-medium">{compra.nome}</p>
                            <p className="text-gray-600">{compra.contato}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">
                              Endereço de Entrega
                            </h4>
                            <p className="text-gray-600">{compra.endereco}</p>
                          </div>
                        </div>

                        <h4 className="text-sm font-medium text-gray-500 mb-3">Produtos</h4>
                        <div className="space-y-3">
                          {compra.produtos.map(produto => (
                            <div
                              key={`${compra._id}-${produto.id}`}
                              className="flex justify-between items-center border-b border-gray-100 pb-2"
                            >
                              <div className="flex-1">
                                <p className="text-[#173363] font-medium">{produto.nome}</p>
                                <p className="text-gray-500 text-sm">{produto.categoria}</p>
                              </div>
                              <div className="flex items-center">
                                <span className="text-gray-600 mr-4">{produto.quantidade}x</span>
                                <span className="font-medium text-[#173363]">
                                  {formatarValor(produto.valor * produto.quantidade)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Botão para importar produtos para o carrinho */}
                        <div className="mt-6 flex justify-end">
                          <button
                            onClick={() => importarParaCarrinho(compra)}
                            disabled={importandoCarrinho === compra._id}
                            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-white transition-all duration-300 ${
                              importandoCarrinho === compra._id
                                ? 'bg-[#173363]/70 cursor-not-allowed'
                                : 'bg-[#173363] hover:bg-[#173363]/90'
                            }`}
                          >
                            {importandoCarrinho === compra._id ? (
                              <>
                                <svg
                                  className="animate-spin h-5 w-5 text-white"
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
                                <span>Importando...</span>
                              </>
                            ) : (
                              <>
                                <svg
                                  className="h-5 w-5"
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
                                <span>Importar para o carrinho</span>
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import CarrinhoLoadingModal from '@/components/CarrinhoLoadingModal';

interface ProdutoCarrinho {
  cod: string;
  quantidade: number;
}

interface CarrinhoData {
  produtosCarrinho: ProdutoCarrinho[];
}

interface ProdutoEncontrado {
  cod: string;
  quantidade: number;
  encontrado: boolean;
  produto?: {
    _id: string;
    nome: string;
    preco: number;
    descricao: string;
    categoria: string;
    imagem: string;
    cod: string;
  };
}

export default function ReceberCarrinho() {
  const router = useRouter();
  const { addToCartWithQuantity, clearCart } = useCart();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'warning'>('loading');
  const [message, setMessage] = useState('Carregando dados do carrinho...');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [dadosRecebidos, setDadosRecebidos] = useState<CarrinhoData | null>(null);
  const [produtosEncontrados, setProdutosEncontrados] = useState<ProdutoEncontrado[]>([]);

  useEffect(() => {
    const carregarDadosCarrinho = async () => {
      try {
        // Obter dados da URL
        const params = new URLSearchParams(window.location.search);
        const dataParam = params.get('data');

        if (!dataParam) {
          throw new Error('Dados do carrinho não encontrados na URL');
        }

        let dados: CarrinhoData;
        try {
          // Tentar decodificar os dados
          const decodedData = atob(dataParam);
          dados = JSON.parse(decodedData);
          setDadosRecebidos(dados);
        } catch (decodeError) {
          console.error('Erro ao decodificar dados:', decodeError);
          throw new Error('Formato de dados inválido');
        }

        // Validar estrutura dos dados
        if (!dados.produtosCarrinho || !Array.isArray(dados.produtosCarrinho)) {
          throw new Error('Estrutura de dados do carrinho inválida');
        }

        // Buscar produtos através da API
        const cods = dados.produtosCarrinho.map(item => item.cod);
        const response = await fetch('/api/produtos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cods }),
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }

        const produtos = await response.json();

        // Mapear produtos encontrados com suas quantidades
        const produtosMapeados = dados.produtosCarrinho.map(item => {
          const produtoEncontrado = produtos.find((p: any) => p.cod === item.cod);
          return {
            cod: item.cod,
            quantidade: item.quantidade,
            encontrado: !!produtoEncontrado,
            produto: produtoEncontrado
              ? {
                  _id: produtoEncontrado._id,
                  nome: produtoEncontrado.nome,
                  preco: produtoEncontrado.preco,
                  descricao: produtoEncontrado.descricao,
                  categoria: produtoEncontrado.categoria,
                  imagem: produtoEncontrado.imagem,
                  cod: produtoEncontrado.cod,
                }
              : undefined,
          };
        });

        setProdutosEncontrados(produtosMapeados);

        // Limpar carrinho atual
        clearCart();

        // Adicionar produtos encontrados ao carrinho
        produtosMapeados.forEach(item => {
          if (item.encontrado && item.produto) {
            const produtoParaCarrinho = {
              id: item.produto._id,
              nome: item.produto.nome,
              valor: item.produto.preco,
              descricao: item.produto.descricao,
              imagem: item.produto.imagem,
              categoria: item.produto.categoria,
              cod: item.produto.cod,
            };
            addToCartWithQuantity(produtoParaCarrinho, item.quantidade);
          }
        });

        // Exibir os dados no modal
        setStatus('success');
        setMessage(
          `Carrinho atualizado com sucesso! Total de produtos: ${dados.produtosCarrinho.length}`
        );
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setStatus('error');
        setMessage(
          error instanceof Error ? error.message : 'Erro ao processar dados. Tente novamente.'
        );
      }
    };

    carregarDadosCarrinho();
  }, [clearCart, addToCartWithQuantity]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleIrParaInicio = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#EDF3F9] p-4">
      <CarrinhoLoadingModal
        isOpen={isModalOpen}
        status={status}
        message={message}
        onClose={handleCloseModal}
      />

      {dadosRecebidos && (
        <div className="mt-8 max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-[#183263] mb-4">Dados Recebidos:</h2>
          <div className="bg-[#EDF3F9] p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-[#183263] mb-2">Produtos no Carrinho:</h3>
            <div className="space-y-2">
              {produtosEncontrados.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-3 rounded-md"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Código: {item.cod}</span>
                    {item.encontrado ? (
                      <svg
                        className="w-5 h-5 text-[#7EC13D]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-600">Quantidade: {item.quantidade}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lista detalhada dos produtos */}
          <div className="mt-6 bg-[#EDF3F9] p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-[#183263] mb-4">
              Produtos que serão adicionados ao carrinho:
            </h3>
            <div className="space-y-3">
              {produtosEncontrados
                .filter(item => item.encontrado && item.produto)
                .map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-md shadow-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-[#183263]">{item.produto?.nome}</h4>
                        <p className="text-sm text-gray-500">Código: {item.cod}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-[#7EC13D] font-medium">
                          {item.quantidade} unidade(s)
                        </span>
                        <span className="text-[#183263] font-medium">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format((item.produto?.preco || 0) * item.quantidade)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Botão para ir à página inicial */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleIrParaInicio}
              className="px-6 py-3 bg-[#183263] text-white rounded-lg hover:bg-[#142a52] transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Ir para a Página Inicial</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

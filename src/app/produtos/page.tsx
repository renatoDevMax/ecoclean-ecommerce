'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useModoOrcamento } from '@/context/ModoOrcamentoContext';
import ProdutoImagem from '@/components/ProdutoImagem';
import Link from 'next/link';
import {
  FaSprayCan,
  FaToilet,
  FaPumpSoap,
  FaWind,
  FaVial,
  FaSeedling,
  FaTshirt,
  FaWindowMaximize,
  FaBroom,
  FaCouch,
  FaHandsWash,
  FaSprayCan as FaMultiuso,
  FaSwimmingPool,
  FaHardHat,
  FaShieldAlt,
  FaBrush,
  FaStar,
  FaTools,
  FaRegLightbulb,
} from 'react-icons/fa';
import { FaBucket, FaBugSlash, FaCarOn, FaSoap } from 'react-icons/fa6';
import {
  GiMetalPlate,
  GiRolledCloth,
  GiSoap,
  GiSoapExperiment,
  GiStoneTablet,
  GiVacuumCleaner,
  GiWoodPile,
} from 'react-icons/gi';
import { SiAdroll, SiAnydesk } from 'react-icons/si';
import { TbSquareHalf } from 'react-icons/tb';
import { RiDeleteBinLine, RiFilePaperLine } from 'react-icons/ri';
import { PiGearFineBold, PiPaintBrushFill, PiShovelFill, PiTeaBagBold } from 'react-icons/pi';
import { LuSquareStack, LuUtilityPole } from 'react-icons/lu';
import { BsRulers } from 'react-icons/bs';
import { MdSoap } from 'react-icons/md';
import { IoWaterSharp } from 'react-icons/io5';
import { BiLogoSquarespace } from 'react-icons/bi';
import CategoriasCarrossel from '@/components/CategoriasCarrossel';

// Interface para o tipo Produto
interface Produto {
  _id: string;
  nome: string;
  valor: number;
  descricao: string;
  imagem: string;
  categoria: string;
  isPromocao?: boolean;
  valorOriginal?: number;
  destaque?: boolean;
  cod: string; // Campo obrigatório conforme schema
}

// Interface para as categorias
interface Categoria {
  id: number;
  nome: string;
  icone: React.ReactNode;
}

export default function Produtos() {
  // Estado para armazenar os produtos carregados do banco
  const [produtos, setProdutos] = useState<Produto[]>([]);
  // Estado para armazenar a categoria selecionada (filtragem)
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>('Destaques');
  // Estado para indicar o carregamento dos dados
  const [carregando, setCarregando] = useState(true);
  // Estado para armazenar possíveis erros
  const [erro, setErro] = useState<string | null>(null);
  // Estado para controlar se mostra apenas produtos em destaque ou todos
  const [mostrarDestaque, setMostrarDestaque] = useState(true);
  // Adicionar estado para o termo de pesquisa
  const [termoPesquisa, setTermoPesquisa] = useState('');

  // Acessar o contexto do carrinho
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const { isOrcamentoAtivo } = useModoOrcamento();

  // Adicionar um useRef para a seção de produtos
  const produtosSectionRef = useRef<HTMLDivElement>(null);

  // Função para buscar os produtos da API
  const buscarProdutos = async (categoria?: string, apenasDestaque: boolean = true) => {
    try {
      setCarregando(true);

      // Ajuste para a categoria "Piscinas" -> "piscina"
      let categoriaAjustada = categoria;
      if (categoria === 'Piscina') {
        categoriaAjustada = 'piscina';
      }

      // Endpoint da API - padrão ou com filtro de categoria
      let endpoint = '/api/produtos';

      // Adicionar parâmetros para filtrar
      const params = new URLSearchParams();

      if (categoriaAjustada) {
        params.append('categoria', categoriaAjustada);
      }

      if (apenasDestaque) {
        params.append('destaque', 'true');
      }

      if (params.toString()) {
        endpoint += `?${params.toString()}`;
      }

      const resposta = await fetch(endpoint);
      const dados = await resposta.json();

      if (dados.success) {
        setProdutos(dados.data);
        setErro(null);
      } else {
        throw new Error(dados.error || 'Erro ao carregar os produtos');
      }
    } catch (error) {
      console.error('Falha ao buscar produtos:', error);
      setErro('Não foi possível carregar os produtos. Por favor, tente novamente mais tarde.');
    } finally {
      setCarregando(false);
    }
  };

  // Efeito para carregar os produtos quando a página for montada
  useEffect(() => {
    buscarProdutos(undefined, true); // Por padrão, mostrar apenas produtos em destaque
  }, []);

  // Atualizar a função handleCategoriaClick para incluir rolagem suave com 100px adicionais
  const handleCategoriaClick = (categoria: string | null) => {
    if (categoriaSelecionada === categoria) {
      setCategoriaSelecionada(null);
      buscarProdutos(undefined, true); // Busca produtos em destaque
    } else {
      setCategoriaSelecionada(categoria);

      if (categoria === 'Destaques') {
        // Para destaques, buscar produtos com destaque=true
        buscarProdutos(undefined, true);
        setMostrarDestaque(true);
      } else if (categoria === 'Todos') {
        // Para "Todos", buscar todos os produtos ativos sem filtro de categoria
        buscarProdutos(undefined, false);
        setMostrarDestaque(false);
      } else if (categoria) {
        // Para categorias normais, buscar produtos daquela categoria
        buscarProdutos(categoria, false);
        setMostrarDestaque(false);
      }
    }

    // Adicionar um pequeno timeout para garantir que a rolagem aconteça após a atualização do estado
    setTimeout(() => {
      // Rolar suavemente até a seção de produtos
      if (produtosSectionRef.current) {
        // Obter a posição do elemento
        const rect = produtosSectionRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = scrollTop + rect.top + 100; // Adicionar 100px para rolar um pouco mais para baixo

        // Rolar suavemente até a posição calculada
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  // Função para alternar entre mostrar todos os produtos ou apenas destaques
  const toggleMostrarDestaque = () => {
    const novoValor = !mostrarDestaque;
    setMostrarDestaque(novoValor);
    buscarProdutos(categoriaSelecionada || undefined, novoValor);
  };

  // Função para adicionar produto ao carrinho
  const adicionarAoCarrinho = (produto: Produto) => {
    addToCart({
      id: produto._id,
      nome: produto.nome,
      valor: produto.valor,
      descricao: produto.descricao,
      imagem: produto.imagem,
      categoria: produto.categoria,
      cod: produto.cod,
    });
  };

  // Função para atualizar quantidade do produto no carrinho
  const atualizarQuantidade = (produtoId: string, quantidade: number) => {
    console.log(`Atualizando produto ${produtoId} para quantidade ${quantidade}`);

    if (quantidade <= 0) {
      // Remover do carrinho se quantidade for zero ou menor
      console.log(`Removendo produto ${produtoId} do carrinho`);
      removeFromCart(produtoId);
    } else {
      console.log(`Atualizando produto ${produtoId} para quantidade ${quantidade}`);
      updateQuantity(produtoId, quantidade);
    }
  };

  // Função para verificar se um produto está no carrinho e retornar sua quantidade
  const getQuantidadeNoCarrinho = (produtoId: string): number => {
    const produtoNoCarrinho = cartItems.find(item => item.id === produtoId);
    return produtoNoCarrinho ? produtoNoCarrinho.quantidade : 0;
  };

  // Lista de categorias com seus ícones
  const categorias: Categoria[] = [
    { id: 0, nome: 'Destaques', icone: <FaStar className="text-amber-400" /> },
    {
      id: 999,
      nome: 'Todos',
      icone: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ),
    },
    { id: 1, nome: 'Álcool', icone: <GiSoapExperiment /> },
    { id: 2, nome: 'Aromatizante', icone: <FaSprayCan /> },
    { id: 3, nome: 'Automotivo', icone: <FaCarOn /> },
    { id: 4, nome: 'Balde', icone: <FaBucket /> },
    { id: 5, nome: 'Banheiro', icone: <FaToilet /> },
    { id: 6, nome: 'Cera', icone: <GiWoodPile /> },
    { id: 7, nome: 'Desengordurante', icone: <FaPumpSoap /> },
    { id: 8, nome: 'Desinfetante', icone: <FaVial /> },
    { id: 9, nome: 'Detergente', icone: <FaPumpSoap /> },
    { id: 10, nome: 'Dispenser', icone: <FaSoap /> },
    { id: 11, nome: 'Diversos', icone: <SiAnydesk /> },
    { id: 12, nome: 'Esponja', icone: <TbSquareHalf /> },
    { id: 13, nome: 'Ferramentas', icone: <FaTools /> },
    { id: 14, nome: 'Inseticida', icone: <FaBugSlash /> },
    { id: 15, nome: 'Jardinagem', icone: <FaSeedling /> },
    { id: 16, nome: 'Lavanderia', icone: <FaTshirt /> },
    { id: 17, nome: 'Limpa Alumínio', icone: <GiMetalPlate /> },
    { id: 18, nome: 'Limpa Pedras', icone: <GiStoneTablet /> },
    { id: 19, nome: 'Limpa Vidros', icone: <FaWindowMaximize /> },
    { id: 20, nome: 'Limpeza em Geral', icone: <FaBroom /> },
    { id: 21, nome: 'Lixeira', icone: <RiDeleteBinLine /> },
    { id: 22, nome: 'Lustra Móveis', icone: <FaCouch /> },
    { id: 23, nome: 'Luva', icone: <FaHandsWash /> },
    { id: 24, nome: 'Lâmpada', icone: <FaRegLightbulb /> },
    { id: 25, nome: 'Mop', icone: <PiPaintBrushFill /> },
    { id: 26, nome: 'Multiuso', icone: <FaMultiuso /> },
    { id: 27, nome: 'Organizador', icone: <LuSquareStack /> },
    { id: 28, nome: 'Panos', icone: <GiRolledCloth /> },
    { id: 29, nome: 'Papel Higiênico', icone: <SiAdroll /> },
    { id: 30, nome: 'Papel Toalha', icone: <RiFilePaperLine /> },
    { id: 31, nome: 'Piscina', icone: <FaSwimmingPool /> },
    { id: 32, nome: 'Pulverizador', icone: <FaSprayCan /> },
    { id: 33, nome: 'Pá', icone: <PiShovelFill /> },
    { id: 34, nome: 'Pós Obra', icone: <FaHardHat /> },
    { id: 35, nome: 'Rodo', icone: <BsRulers /> },
    { id: 36, nome: 'Sabonete', icone: <MdSoap /> },
    { id: 37, nome: 'Sabão', icone: <GiSoap /> },
    { id: 38, nome: 'Saco Aspirador', icone: <GiVacuumCleaner /> },
    { id: 39, nome: 'Saco de Lixo', icone: <PiTeaBagBold /> },
    { id: 40, nome: 'Segurança', icone: <FaShieldAlt /> },
    { id: 41, nome: 'Silicone', icone: <IoWaterSharp /> },
    { id: 42, nome: 'Tapetes', icone: <BiLogoSquarespace /> },
    { id: 43, nome: 'Utilidades', icone: <PiGearFineBold /> },
    { id: 44, nome: 'Varal', icone: <LuUtilityPole /> },
    { id: 45, nome: 'Vassoura', icone: <FaBrush /> },
  ];

  // Formatar o valor para o formato de moeda brasileira
  const formatarValor = (valor?: number) => {
    if (valor === undefined || valor === null) {
      return 'R$ 0,00';
    }
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Função para lidar com a mudança no input de pesquisa
  const handlePesquisaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoTermo = e.target.value;
    setTermoPesquisa(novoTermo);

    // Se houver texto no input e a categoria não for "Todos", trocar para "Todos"
    if (novoTermo && categoriaSelecionada !== 'Todos') {
      handleCategoriaClick('Todos');
    }
    // Se o texto for apagado e a categoria for "Todos", voltar para "Destaques"
    else if (!novoTermo && categoriaSelecionada === 'Todos') {
      handleCategoriaClick('Destaques');
    }
  };

  // Atualizar a função para filtrar produtos com base na categoria e no termo de pesquisa
  const produtosFiltrados = (() => {
    let itensFiltrados = [...produtos];

    // Filtrar por categoria (se não for "Todos" ou "Destaques")
    if (
      categoriaSelecionada &&
      categoriaSelecionada !== 'Todos' &&
      categoriaSelecionada !== 'Destaques'
    ) {
      itensFiltrados = itensFiltrados.filter(
        produto => produto.categoria.toLowerCase() === categoriaSelecionada.toLowerCase()
      );
    }

    // Filtrar por termo de pesquisa (se houver)
    if (termoPesquisa) {
      itensFiltrados = itensFiltrados.filter(produto =>
        produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
      );
    }

    return itensFiltrados;
  })();

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section com fundo de imagem e altura calculada */}
      <section
        className="relative flex items-center justify-center bg-cover bg-center py-24"
        style={{
          backgroundPosition: '50% 30%',
          backgroundImage:
            'linear-gradient(to bottom, rgba(23, 51, 99, 0.7), rgba(110, 199, 71, 0.4)), url("/fundosec1.jpeg")',
        }}
      >
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-white drop-shadow-lg animate-fade-in">
              <span className="font-normal">Nossos</span> Produtos
            </h1>

            <p className="text-xl text-white/90 drop-shadow-md mb-8">
              Encontre a solução perfeita para suas necessidades de limpeza e organização
            </p>

            <div className="h-1 w-24 bg-gradient-to-r from-[#173363] to-[#6EC747] mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Seção de Categorias com Cards Menores */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="text-center mb-10 max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              <span className="text-[#173363]">Categorias de</span>{' '}
              <span className="text-[#6EC747] font-normal">Produtos</span>
            </h2>
            <p className="text-gray-600">Selecione uma categoria para filtrar os produtos</p>
          </div>

          {/* Novo componente de carrossel de categorias */}
          <CategoriasCarrossel
            categorias={categorias}
            categoriaSelecionada={categoriaSelecionada}
            onCategoriaClick={handleCategoriaClick}
          />
        </div>
      </section>

      {/* Seção de Produtos do Banco de Dados */}
      <section className="py-20 bg-gray-50" ref={produtosSectionRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#173363]/40"></div>
              <span className="mx-4 text-[#173363] text-sm font-light tracking-[0.2em] uppercase">
                Produtos Disponíveis
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#173363]/40"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-light mb-2">
              <span className="text-[#173363]">Nossos</span>{' '}
              <span className="text-[#6EC747] font-normal">Produtos</span>
              {categoriaSelecionada && (
                <span className="block text-xl mt-2">Categoria: {categoriaSelecionada}</span>
              )}
            </h2>

            <div className="flex items-center justify-center mb-6">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  value={termoPesquisa}
                  onChange={handlePesquisaChange}
                  placeholder="Pesquisar produtos..."
                  className="w-full py-2 px-4 pl-10 pr-10 rounded-full border border-[#173363]/20 focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#173363]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                {termoPesquisa && (
                  <button
                    onClick={() => {
                      setTermoPesquisa('');
                      // Se a categoria atual for "Todos" e não houver mais texto, voltar para "Destaques"
                      if (categoriaSelecionada === 'Todos') {
                        handleCategoriaClick('Destaques');
                      }
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#173363] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Conheça nossa linha de produtos de alta qualidade para atender todas as suas
              necessidades
            </p>
          </div>

          {/* Estado de carregamento */}
          {carregando && (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-[#173363]/10 border-t-[#173363] rounded-full animate-spin"></div>
            </div>
          )}

          {/* Mensagem de erro */}
          {erro && !carregando && (
            <div className="bg-red-50 text-red-700 p-6 rounded-lg text-center max-w-2xl mx-auto">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-lg font-medium">{erro}</p>
              <button
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                onClick={() => buscarProdutos(categoriaSelecionada || undefined, mostrarDestaque)}
              >
                Tentar novamente
              </button>
            </div>
          )}

          {/* Grid de produtos */}
          {!carregando && !erro && (
            <>
              {produtosFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {produtosFiltrados.map((produto, index) => (
                    <div
                      key={produto._id || index}
                      className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 flex flex-col h-full"
                      data-aos="fade-up"
                      data-aos-delay={100 + (index % 4) * 100}
                    >
                      {/* Fundo decorativo */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#173363]/5 to-[#6EC747]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Imagem do produto */}
                      <div className="relative h-72 overflow-hidden bg-white flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

                        <ProdutoImagem
                          src={produto.imagem}
                          alt={produto.nome}
                          className="transform group-hover:scale-110 transition-transform duration-700 h-full w-full"
                          produto={{
                            id: produto._id,
                            nome: produto.nome,
                            valor: produto.valor,
                            descricao: produto.descricao,
                            imagem: produto.imagem,
                            categoria: produto.categoria,
                            cod: produto.cod,
                          }}
                        />

                        {/* Etiquetas */}
                        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
                          <span className="bg-[#173363] text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                            {produto.categoria}
                          </span>
                        </div>

                        {produto.isPromocao && (
                          <div className="absolute top-3 left-3 z-20">
                            <span className="bg-[#e63946] text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm font-semibold">
                              Promoção
                            </span>
                          </div>
                        )}

                        {produto.destaque && (
                          <div className="absolute bottom-3 left-3 z-20">
                            <span className="bg-amber-400 text-[#173363] text-xs px-3 py-1 rounded-full backdrop-blur-sm font-semibold flex items-center gap-1">
                              <FaStar size={12} /> Destaque
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Informações do produto - Layout reestruturado */}
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3
                            className="text-xl font-semibold text-[#173363] group-hover:text-[#6EC747] transition-colors duration-300 cursor-pointer relative z-30 flex-grow pr-2"
                            onClick={() => {
                              const produtoImagemElement = document.querySelector(
                                `#produto-imagem-${produto._id}`
                              );
                              if (produtoImagemElement) {
                                (produtoImagemElement as HTMLElement).click();
                              }
                            }}
                          >
                            {produto.nome}
                          </h3>
                          {!isOrcamentoAtivo && (
                            <div className="ml-2 flex-shrink-0">
                              <div className="flex items-baseline">
                                <span className="text-2xl font-bold text-primary mr-2">
                                  {formatarValor(produto.valor)}
                                </span>
                                {produto.isPromocao && produto.valorOriginal && (
                                  <span className="text-sm text-gray-500 line-through">
                                    {formatarValor(produto.valorOriginal)}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="h-0.5 w-12 bg-gradient-to-r from-[#173363] to-[#6EC747] mb-3 group-hover:w-20 transition-all duration-300"></div>

                        <p
                          className="text-gray-600 mb-4 line-clamp-3 text-sm cursor-pointer relative z-30 flex-grow"
                          onClick={() => {
                            const produtoImagemElement = document.querySelector(
                              `#produto-imagem-${produto._id}`
                            );
                            if (produtoImagemElement) {
                              (produtoImagemElement as HTMLElement).click();
                            }
                          }}
                        >
                          {produto.descricao}
                        </p>

                        {isOrcamentoAtivo && (
                          <div className="mb-4 mt-auto">
                            <span className="text-sm font-light text-gray-600">
                              Faça seu login para visualizar o preço.
                            </span>
                          </div>
                        )}

                        {/* Botões de Ação - mt-auto aqui para empurrar para o final do card */}
                        <div className="mt-auto flex justify-center">
                          {getQuantidadeNoCarrinho(produto._id) > 0 ? (
                            // Controle de quantidade quando produto está no carrinho
                            <div className="w-full flex items-center justify-between bg-white border border-[#173363] rounded-lg py-2 px-3 transition-all duration-500 animate-fade-in relative z-20">
                              <span className="text-[#173363] text-sm font-medium">
                                Quantidade:
                              </span>
                              <div className="flex items-center border border-gray-200 rounded-md">
                                <button
                                  type="button"
                                  onClick={() =>
                                    atualizarQuantidade(
                                      produto._id,
                                      getQuantidadeNoCarrinho(produto._id) - 1
                                    )
                                  }
                                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 focus:outline-none cursor-pointer relative z-30"
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  min="1"
                                  value={getQuantidadeNoCarrinho(produto._id)}
                                  onChange={e =>
                                    atualizarQuantidade(produto._id, parseInt(e.target.value) || 1)
                                  }
                                  className="w-12 text-center border-0 focus:outline-none text-[#173363] relative z-30"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    atualizarQuantidade(
                                      produto._id,
                                      getQuantidadeNoCarrinho(produto._id) + 1
                                    )
                                  }
                                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 focus:outline-none cursor-pointer relative z-30"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          ) : (
                            // Botão de adicionar ao carrinho com efeito gradiente elegante
                            <button
                              type="button"
                              onClick={() => adicionarAoCarrinho(produto)}
                              className="group w-full relative bg-white border border-[#173363] text-[#173363] rounded-lg py-2.5 transition-all duration-500 flex items-center justify-center gap-2 hover:shadow-md overflow-hidden cursor-pointer z-20"
                            >
                              {/* Fundo com gradiente */}
                              <div className="absolute inset-0 bg-gradient-to-r from-[#173363] to-[#6EC747] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                              {/* Conteúdo do botão */}
                              <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-500">
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
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                  />
                                </svg>
                                Adicionar ao Carrinho
                              </span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Efeito de brilho na borda ao passar o mouse */}
                      <div className="absolute inset-0 border border-transparent group-hover:border-[#6EC747]/30 rounded-xl transition-all duration-500"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-md">
                  <div className="text-6xl mb-4">😕</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Nenhum produto encontrado
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {mostrarDestaque
                      ? 'Não há produtos em destaque nesta categoria'
                      : 'Tente ajustar seus filtros ou escolher outra categoria'}
                  </p>
                  {mostrarDestaque && (
                    <button
                      onClick={toggleMostrarDestaque}
                      className="px-6 py-2 bg-[#173363] text-white rounded-lg hover:bg-[#0f2042] transition-colors duration-300"
                    >
                      Ver todos os produtos
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#173363] to-[#1A3C7A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl text-white font-light mb-6">Não encontrou o que procura?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Nossa equipe está pronta para ajudar você a encontrar a solução perfeita para suas
            necessidades específicas.
          </p>
          <Link
            href="/contato"
            className="transition-all duration-300 px-10 py-4 bg-white hover:bg-[#6EC747] text-[#173363] hover:text-white text-lg font-medium rounded-full 
                           hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1 border-2 border-white inline-block"
          >
            Fale Conosco
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

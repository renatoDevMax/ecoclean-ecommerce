'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProdutoImagem from '@/components/ProdutoImagem';

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
}

export default function Produtos() {
  // Estado para armazenar os produtos carregados do banco
  const [produtos, setProdutos] = useState<Produto[]>([]);
  // Estado para armazenar a categoria selecionada (filtragem)
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
  // Estado para indicar o carregamento dos dados
  const [carregando, setCarregando] = useState(true);
  // Estado para armazenar possíveis erros
  const [erro, setErro] = useState<string | null>(null);

  // Função para buscar os produtos da API
  const buscarProdutos = async (categoria?: string) => {
    try {
      setCarregando(true);
      
      // Ajuste para a categoria "Piscinas" -> "piscina"
      let categoriaAjustada = categoria;
      if (categoria === "Piscinas") {
        categoriaAjustada = "piscina";
      }
      
      // Endpoint da API - padrão ou com filtro de categoria
      const endpoint = categoriaAjustada 
        ? `/api/produtos/${encodeURIComponent(categoriaAjustada)}` 
        : '/api/produtos';
      
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
    buscarProdutos();
  }, []);

  // Função para lidar com a seleção de categoria
  const handleCategoriaClick = (categoria: string | null) => {
    if (categoriaSelecionada === categoria) {
      setCategoriaSelecionada(null);
      buscarProdutos(); // Busca todos os produtos sem filtro
    } else {
      setCategoriaSelecionada(categoria);
      if (categoria) {
        buscarProdutos(categoria); // Busca produtos filtrados por categoria
      }
    }
  };

  // Obter todas as categorias únicas dos produtos
  const categorias = [
    {
      id: 1,
      nome: "Cozinha",
      descricao: "Produtos para limpeza e higienização de cozinhas profissionais e domésticas.",
      icone: (
        <svg className="w-10 h-10 text-[#173363]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 19H20M4 5H20M4 5V19M20 5V19M8 9V15M12 9V15M16 9V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 2,
      nome: "Banheiro",
      descricao: "Soluções completas para limpeza e desinfecção de banheiros e sanitários.",
      icone: (
        <svg className="w-10 h-10 text-[#173363]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 14V17M17 21V17M21 17H17M17 17H13M3 5L3 9M3 9C8.5 9 8.5 15 3 15M3 9C5 9 7 7 7 5C7 3 5 1 3 1C1 1 1 5 3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 21V19C7 17.9394 7 17.9394 7 17C7 16.0606 7 16.0606 7 15M7 11V15M11 11V15M11 15V18C11 19.0609 11 19.0609 11 20C11 20.9391 11 20.9391 11 22M11 15C14 15 15 13.5 15 11M3 15V17C3 18.5 3 20 4.5 21C6 22 11 22 11 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 3,
      nome: "Estofados e Tecidos",
      descricao: "Produtos especializados para limpeza de estofados, tecidos e tapeçarias.",
      icone: (
        <svg className="w-10 h-10 text-[#173363]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 8L22 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6 16L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M13 16H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 4,
      nome: "Automotivo",
      descricao: "Produtos de limpeza e conservação para todos os tipos de veículos.",
      icone: (
        <svg className="w-10 h-10 text-[#173363]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 15H15M7 15H9M18.5708 5.53209L19.5708 8.53209C19.7211 9.07013 19.418 9.63577 18.88 9.786M18.88 9.786L16 10.5L8 10.5L5.12 9.786M18.88 9.786C18.4989 9.89284 18.0879 9.71793 17.9199 9.382C17.9199 9.382 17.9199 9.382 17.9199 9.382C17.6387 8.82023 17.0968 8.42361 16.4374 8.40135L12.5 8.3L7.03613 8.41396C6.37405 8.43692 5.80302 8.82476 5.49992 9.382C5.33267 9.71741 4.92286 9.89259 4.54237 9.786M5.12 9.786C4.58172 9.63664 4.2781 9.07159 4.42773 8.53396L5.45706 5.465M5.12 9.786C4.54237 9.786 4.54237 9.786 4.54237 9.786M3 17L3.26341 10.5H20.7559L21 17.5C21 18.6046 20.1046 19.5 19 19.5H5C3.89543 19.5 3 18.6046 3 17.5V17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 5,
      nome: "Piscinas",
      descricao: "Soluções para tratamento, limpeza e manutenção de piscinas.",
      icone: (
        <svg className="w-10 h-10 text-[#173363]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 15C5.10863 15 6.43969 13.7843 7.56348 12.7043C8.12671 12.1572 8.4083 11.8839 8.60825 11.7375C9.27508 11.2613 10.1048 11.0394 10.923 11.1296C11.1067 11.1496 11.2894 11.1892 11.6549 11.2687L11.9758 11.3393C12.3423 11.4189 12.5251 11.4586 12.7089 11.4786C13.527 11.5687 14.3571 11.3465 15.0244 10.8697C15.2244 10.7235 15.506 10.45 16.0693 9.90293C17.1931 8.82298 18.524 7.60718 20.6329 7.60718" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M3 18.6932C5.10863 18.6932 6.43969 17.4776 7.56348 16.3979C8.12671 15.8507 8.4083 15.5775 8.60825 15.4311C9.27508 14.9549 10.1048 14.7329 10.923 14.8232C11.1067 14.8431 11.2894 14.8828 11.6549 14.9622L11.9758 15.0329C12.3423 15.1124 12.5251 15.1522 12.7089 15.1721C13.527 15.2622 14.3571 15.04 15.0244 14.5633C15.2244 14.417 15.506 14.1436 16.0693 13.5965C17.1931 12.5165 18.524 11.3008 20.6329 11.3008" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M3 11.3068C5.10863 11.3068 6.43969 10.0908 7.56348 9.01068C8.12671 8.46341 8.4083 8.18986 8.60825 8.04347C9.27508 7.56733 10.1048 7.34539 10.923 7.43553C11.1067 7.45544 11.2894 7.49516 11.6549 7.57465L11.9758 7.64529C12.3423 7.72484 12.5251 7.76462 12.7089 7.78447C13.527 7.87461 14.3571 7.65251 15.0244 7.17577C15.2244 7.02953 15.506 6.75579 16.0693 6.20834C17.1931 5.12836 18.524 3.91235 20.6329 3.91235" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M3 22.0867C5.10863 22.0867 6.43969 20.8707 7.56348 19.7907C8.12671 19.2433 8.4083 18.9697 8.60825 18.8235C9.27508 18.3472 10.1048 18.1252 10.923 18.2154C11.1067 18.2352 11.2894 18.2749 11.6549 18.3545L11.9758 18.4251C12.3423 18.5046 12.5251 18.5443 12.7089 18.5644C13.527 18.6544 14.3571 18.4323 15.0244 17.9556C15.2244 17.8092 15.506 17.5357 16.0693 16.9884C17.1931 15.9084 18.524 14.6929 20.6329 14.6929" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      id: 6,
      nome: "Organizadores",
      descricao: "Produtos para organização e armazenamento de itens domésticos e empresariais.",
      icone: (
        <svg className="w-10 h-10 text-[#173363]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="2" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="3" y="14" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 6L17 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M7 18L17 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    }
  ];

  // Formatar o valor para o formato de moeda brasileira
  const formatarValor = (valor?: number) => {
    if (valor === undefined || valor === null) {
      return 'R$ 0,00';
    }
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // Filtrar produtos com base na categoria selecionada
  const produtosFiltrados = categoriaSelecionada ? produtos.filter(produto => produto.categoria === categoriaSelecionada) : produtos;

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section com fundo de imagem e altura calculada */}
      <section 
        className="relative flex items-center justify-center bg-cover bg-center py-24"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(23, 51, 99, 0.7), rgba(110, 199, 71, 0.4)), url("/produtos-bg.jpg")',
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

      {/* Seção de Categorias com Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 overflow-hidden">
          <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#173363]/40"></div>
              <span className="mx-4 text-[#173363] text-sm font-light tracking-[0.2em] uppercase">Descubra Nosso Catálogo</span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#173363]/40"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              <span className="text-[#173363]">Categorias de</span> <span className="text-[#6EC747] font-normal">Produtos</span>
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Oferecemos uma ampla variedade de produtos de alta qualidade para atender às suas necessidades específicas de limpeza e organização.
            </p>
          </div>
          
          {/* Grid de Cards com animações */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorias.map((categoria, index) => (
              <div 
                key={categoria.id}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 flex flex-col items-center text-center transform hover:-translate-y-1 animate-fade-in-up cursor-pointer ${categoriaSelecionada === categoria.nome ? 'ring-2 ring-[#6EC747] ring-offset-2' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleCategoriaClick(categoriaSelecionada === categoria.nome ? null : categoria.nome)}
              >
                {/* Círculo decorativo para o ícone */}
                <div className="w-20 h-20 rounded-full bg-[#F8F9FC] flex items-center justify-center mb-6 group-hover:bg-[#173363]/5 transition-all duration-500">
                  {categoria.icone}
                </div>
                
                <h3 className="text-xl font-medium text-[#173363] mb-2">{categoria.nome}</h3>
                
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#173363] to-[#6EC747] mb-4 transition-all duration-300 group-hover:w-16"></div>
                
                <p className="text-gray-600 mb-6 flex-grow">{categoria.descricao}</p>
                
                <span className="flex items-center text-[#173363] hover:text-[#6EC747] transition-all duration-300 group">
                  <span className="font-light border-b border-[#173363]/30 group-hover:border-[#6EC747]">
                    {categoriaSelecionada === categoria.nome ? 'Remover filtro' : 'Ver produtos'}
                  </span>
                  {categoriaSelecionada !== categoria.nome && (
                    <svg className="w-4 h-4 ml-2 transition-all duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                  {categoriaSelecionada === categoria.nome && (
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </span>
                
                {/* Decoração de fundo */}
                <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-r from-[#173363]/5 to-[#6EC747]/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Produtos do Banco de Dados */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#173363]/40"></div>
              <span className="mx-4 text-[#173363] text-sm font-light tracking-[0.2em] uppercase">Produtos Disponíveis</span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#173363]/40"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              <span className="text-[#173363]">Nossos</span> <span className="text-[#6EC747] font-normal">Produtos</span>
              {categoriaSelecionada && <span className="block text-xl mt-2">Categoria: {categoriaSelecionada}</span>}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Conheça nossa linha de produtos de alta qualidade para atender todas as suas necessidades
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
              <svg className="w-12 h-12 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-lg font-medium">{erro}</p>
              <button 
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                onClick={() => buscarProdutos(categoriaSelecionada || undefined)}
              >
                Tentar novamente
              </button>
            </div>
          )}

          {/* Grid de produtos */}
          {!carregando && !erro && (
            <>
              {produtosFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {produtosFiltrados.map((produto, index) => (
                    <div 
                      key={produto._id || index} 
                      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                      data-aos="fade-up"
                      data-aos-delay={100 + (index % 4) * 100}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <ProdutoImagem 
                          src={produto.imagem} 
                          alt={produto.nome} 
                          categoria={produto.categoria}
                          className="transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="bg-[#173363]/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                            {produto.categoria}
                          </span>
                        </div>
                        {produto.isPromocao && (
                          <div className="absolute top-3 left-3">
                            <span className="bg-[#e63946]/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm font-bold">
                              Promoção
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">{produto.nome}</h3>
                        <p className="text-gray-600 mb-4 h-20 overflow-hidden line-clamp-3">{produto.descricao}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            {produto.isPromocao ? (
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-500 line-through">
                                  {formatarValor(produto.valorOriginal || produto.valor * 1.2)}
                                </span>
                                <span className="text-2xl font-bold text-[#e63946]">
                                  {formatarValor(produto.valor)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-2xl font-bold text-[#173363]">
                                {formatarValor(produto.valor)}
                              </span>
                            )}
                          </div>
                          <button className="bg-[#173363] hover:bg-[#0f2042] text-white px-4 py-2 rounded-md transition-colors duration-300 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Comprar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-6xl mb-4">😕</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhum produto encontrado</h3>
                  <p className="text-gray-600">Tente ajustar seus filtros ou escolher outra categoria</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#173363] to-[#1A3C7A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl text-white font-light mb-6">
            Não encontrou o que procura?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Nossa equipe está pronta para ajudar você a encontrar a solução perfeita para suas necessidades específicas.
          </p>
          <button className="transition-default px-10 py-4 bg-white hover:bg-[#6EC747] text-[#173363] hover:text-white text-lg font-medium rounded-full 
                           hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1 border-2 border-white">
            Fale Conosco
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
} 
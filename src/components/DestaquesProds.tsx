'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import ModalProduto from './ModalProduto';
import { useCart, CartProduct } from '@/context/CartContext';
import { useModoOrcamento } from '@/context/ModoOrcamentoContext';
import useEmblaCarousel from 'embla-carousel-react';

// Interface para o produto do MongoDB
interface Produto {
  _id: string;
  nome: string;
  preco: number;
  descricao: string;
  categoria: string;
  imagem: string;
  destaque: boolean;
  cod: string;
  ativado: boolean;
}

export default function DestaquesProds() {
  // Estado para armazenar os produtos em destaque
  const [produtosDestaque, setProdutosDestaque] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sectionVisible, setSectionVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  // Inicializar o carrossel Embla
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  // Estado para controlar elementos visíveis com Intersection Observer
  const [visibleProducts, setVisibleProducts] = useState<string[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
  const { addToCart } = useCart();
  const { isOrcamentoAtivo } = useModoOrcamento();

  // Estados para controles do carrossel
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Buscar produtos em destaque
  useEffect(() => {
    const fetchProdutosDestaque = async () => {
      try {
        const response = await fetch('/api/produtos/destaque');
        if (!response.ok) {
          throw new Error('Falha ao buscar produtos em destaque');
        }
        const data = await response.json();
        setProdutosDestaque(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setError('Não foi possível carregar os produtos em destaque');
        setLoading(false);
      }
    };

    fetchProdutosDestaque();
  }, []);

  // Formatar preço em reais
  const formatarPreco = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Converter produto do MongoDB para o formato usado pelo carrinho
  const convertToCartProduct = (produto: Produto): Omit<CartProduct, 'quantidade'> => {
    return {
      id: produto._id,
      nome: produto.nome,
      valor: produto.preco,
      descricao: produto.descricao,
      imagem: produto.imagem,
      categoria: produto.categoria,
      cod: produto.cod,
    };
  };

  // Callbacks para controlar o carrossel
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Atualizar estado dos botões de navegação
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Atualizar a barra de progresso
  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = emblaApi.scrollProgress();
    setScrollProgress(progress);
  }, [emblaApi]);

  // Configurar o carrossel quando carregado
  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    onScroll();
    emblaApi.on('select', onSelect);
    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('scroll', onScroll);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect, onScroll]);

  // Efeito para adicionar classe de animação quando a seção estiver no viewport
  useEffect(() => {
    // Função para detectar quando elementos entram e saem da viewport
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'active');
            console.log('Elemento animado:', entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    // Observar seção e elementos de destaque
    if (sectionRef.current) {
      observer.observe(sectionRef.current);

      // Observar todos os elementos animáveis dentro da seção
      const animElements = sectionRef.current.querySelectorAll('.animate-on-scroll');
      animElements.forEach(el => {
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, [produtosDestaque]);

  useEffect(() => {
    // Configurar Intersection Observer para animações na entrada dos elementos
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('data-id');
          if (entry.isIntersecting && id) {
            setVisibleProducts(prev => [...prev, id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observar todos os elementos de produtos
    document.querySelectorAll('.product-item').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [produtosDestaque]);

  if (loading) {
    return (
      <section className="py-24 relative overflow-hidden bg-[#FAFBFD] flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-40 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 w-96 bg-gray-200 rounded"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 relative overflow-hidden bg-[#FAFBFD] flex justify-center items-center">
        <div className="text-center">
          <p className="text-xl text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-[#173363] text-white px-6 py-2 rounded-lg"
          >
            Tentar novamente
          </button>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-[#FAFBFD] reveal">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent"></div>

      {/* Círculos decorativos */}
      <div className="absolute -top-20 right-20 w-96 h-96 rounded-full bg-[#173363]/3 blur-[100px] animate-on-scroll reveal-scale"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 rounded-full bg-[#6EC747]/5 blur-[80px] animate-on-scroll reveal-scale reveal-delay-1"></div>

      {/* Círculos decorativos adicionais para mais elegância */}
      <div
        className="absolute top-60 right-1/4 w-32 h-32 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(110, 199, 71, 0.08) 0%, rgba(110, 199, 71, 0.01) 70%)',
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1s ease-out, transform 1s ease-out',
          transitionDelay: '0.3s',
        }}
      ></div>
      <div
        className="absolute bottom-80 left-1/3 w-48 h-48 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(23, 51, 99, 0.06) 0%, rgba(23, 51, 99, 0.01) 70%)',
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1s ease-out, transform 1s ease-out',
          transitionDelay: '0.5s',
        }}
      ></div>

      {/* Padrão sutil de linhas no fundo */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage:
            'linear-gradient(to right, #173363 1px, transparent 1px), linear-gradient(to bottom, #6EC747 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: sectionVisible ? 0.05 : 0,
          transition: 'opacity 1.2s ease-in-out, transform 1.2s ease-in-out',
          transform: sectionVisible ? 'scale(1)' : 'scale(1.1)',
        }}
      ></div>

      {/* Linhas diagonais decorativas sutis */}
      <div
        className="absolute inset-0 transition-opacity duration-1500"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(23, 51, 99, 0.02) 0px, rgba(23, 51, 99, 0.02) 1px, transparent 1px, transparent 12px)',
          opacity: sectionVisible ? 0.5 : 0,
          transition: 'opacity 1.5s ease-in-out',
          transitionDelay: '0.4s',
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-16 max-w-3xl mx-auto animate-on-scroll reveal-scale">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#173363]/30"></div>
              <span className="mx-4 text-[#173363] text-sm font-light tracking-[0.2em] uppercase">
                Seleção Especial
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#173363]/30"></div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="text-[#173363]">Produtos em </span>
            <span className="text-[#6EC747] font-normal">Destaque</span>
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Uma curadoria requintada dos produtos mais refinados para proporcionar um cuidado
            excepcional ao seu lar, selecionados com excelência pela nossa equipe.
          </p>
        </div>

        {/* Controles do carrossel e contêiner */}
        <div className="relative animate-on-scroll reveal reveal-delay-1">
          {/* Botões de navegação */}
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
            <button
              className={`w-12 h-12 rounded-full flex items-center justify-center 
                          bg-white/80 backdrop-blur-sm shadow-lg hover:bg-[#173363] hover:text-white
                          transition-all duration-300 ${
                            prevBtnEnabled ? 'opacity-100' : 'opacity-0 pointer-events-none'
                          }`}
              onClick={scrollPrev}
              aria-label="Anterior"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>

          <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
            <button
              className={`w-12 h-12 rounded-full flex items-center justify-center 
                          bg-white/80 backdrop-blur-sm shadow-lg hover:bg-[#173363] hover:text-white
                          transition-all duration-300 ${
                            nextBtnEnabled ? 'opacity-100' : 'opacity-0 pointer-events-none'
                          }`}
              onClick={scrollNext}
              aria-label="Próximo"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Contêiner do carrossel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {produtosDestaque.map((produto, index) => (
                <div
                  key={produto._id}
                  className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%]"
                >
                  <div
                    onClick={() => setSelectedProduct(produto)}
                    data-id={produto._id}
                    className={`product-item group relative transition-all duration-700 h-full animate-on-scroll ${
                      visibleProducts.includes(produto._id)
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-16'
                    }`}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                    }}
                    onMouseEnter={() => setHoveredProduct(produto._id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* Card do produto com estilo premium */}
                    <div className="h-full flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                      {/* Área da imagem */}
                      <div className="relative overflow-hidden h-64">
                        {/* Badge de categoria no canto superior */}
                        <div className="absolute top-4 left-4 z-20">
                          <span className="bg-white/90 backdrop-blur-sm text-[#173363] text-xs font-medium py-1 px-3 rounded-full">
                            {produto.categoria}
                          </span>
                        </div>

                        {/* Imagem do produto com efeito de zoom suave */}
                        <div className="relative w-full h-full">
                          <Image
                            src={produto.imagem}
                            alt={produto.nome}
                            fill
                            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                          />

                          {/* Overlay gradiente que aparece no hover */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-t from-[#173363]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                          ></div>
                        </div>

                        {/* Botão que aparece no hover */}
                        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex justify-center p-4">
                          <button className="bg-white hover:bg-[#6EC747] text-[#173363] hover:text-white px-6 py-2 rounded-full shadow-lg transform group-hover:scale-105 transition-all duration-300 flex items-center">
                            <span>Ver Detalhes</span>
                            <svg
                              className="w-4 h-4 ml-2 transition-all duration-300 group-hover:translate-x-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Conteúdo do produto */}
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-medium text-[#173363] mb-2 line-clamp-1">
                          {produto.nome}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                          {produto.descricao}
                        </p>

                        <div className="mt-auto">
                          {/* Preço e condições */}
                          <div className="flex items-end justify-between mb-4">
                            {isOrcamentoAtivo ? (
                              <div className="text-sm font-light text-gray-600">
                                Faça seu login para visualizar
                              </div>
                            ) : (
                              <>
                                <div className="text-2xl font-light text-[#173363]">
                                  {formatarPreco(produto.preco)}
                                </div>
                                <div className="text-xs text-gray-500">
                                  ou 3x de {formatarPreco(produto.preco / 3)}
                                </div>
                              </>
                            )}
                          </div>

                          {/* Botão de adicionar ao carrinho */}
                          <button
                            onClick={e => {
                              e.stopPropagation(); // Evitar abrir o modal ao clicar no botão
                              addToCart(convertToCartProduct(produto));
                            }}
                            className="w-full bg-[#173363]/5 hover:bg-[#173363] text-[#173363] hover:text-white py-3 rounded-lg transition-colors duration-300 flex items-center justify-center group/btn"
                          >
                            <svg
                              className="w-5 h-5 mr-2"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3 6H5H21"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M12 11V17"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M9 14H15"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            Adicionar ao Carrinho
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Efeito de brilho no card quando hover */}
                    <div
                      className={`absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 
                                 bg-gradient-to-r from-[#173363]/10 via-[#6EC747]/10 to-[#173363]/10 blur-xl`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="mt-8 mx-auto w-full max-w-xs h-1 bg-gray-200 rounded-full overflow-hidden animate-on-scroll reveal-scale reveal-delay-2">
            <div
              className="h-full bg-gradient-to-r from-[#173363] to-[#6EC747] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

        {/* CTA estiloso para ver todos os produtos */}
        <div className="mt-16 text-center animate-on-scroll reveal-scale reveal-delay-3">
          <div className="inline-block">
            <a
              href="/produtos"
              className="group relative inline-flex items-center py-3 px-8 overflow-hidden"
            >
              {/* Fundo do botão com efeito de transição */}
              <span className="absolute inset-0 border border-[#173363]/20 rounded-full"></span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#173363] to-[#6EC747] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

              {/* Texto e ícone */}
              <span className="relative z-10 font-light text-[#173363] group-hover:text-white transition-colors duration-500">
                Explorar Catálogo Completo
              </span>
              <svg
                className="relative z-10 w-5 h-5 ml-2 text-[#173363] group-hover:text-white transition-all duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4 max-w-xs mx-auto">
            Cadastre-se para receber notificações sobre novos produtos e ofertas exclusivas
          </p>
        </div>
      </div>
      {/* Renderizar modal ao selecionar produto */}
      {selectedProduct && (
        <ModalProduto
          product={convertToCartProduct(selectedProduct)}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => {
            setSelectedProduct(null);
          }}
        />
      )}
    </section>
  );
}

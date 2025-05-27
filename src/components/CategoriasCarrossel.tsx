'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface Categoria {
  id: number;
  nome: string;
  icone: React.ReactNode;
}

interface CategoriasCarrosselProps {
  categorias: Categoria[];
  categoriaSelecionada: string | null;
  onCategoriaClick: (categoria: string | null) => void;
}

export default function CategoriasCarrossel({
  categorias,
  categoriaSelecionada,
  onCategoriaClick,
}: CategoriasCarrosselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: true,
    containScroll: 'trimSnaps',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 4 },
    },
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [termoBusca, setTermoBusca] = useState('');

  // Agrupar categorias em grupos de 3
  const categoriasAgrupadas = categorias.reduce((acc, curr, i) => {
    const grupoIndex = Math.floor(i / 3);
    if (!acc[grupoIndex]) acc[grupoIndex] = [];
    acc[grupoIndex].push(curr);
    return acc;
  }, [] as Categoria[][]);

  // Função para encontrar o índice do slide que contém a categoria buscada
  const encontrarSlideDaCategoria = (termo: string) => {
    if (!termo) return null;

    const termoLower = termo.toLowerCase();
    for (let i = 0; i < categoriasAgrupadas.length; i++) {
      const grupo = categoriasAgrupadas[i];
      const encontrou = grupo.some(cat => cat.nome.toLowerCase().includes(termoLower));
      if (encontrou) return i;
    }
    return null;
  };

  // Função para rolar até a categoria buscada
  const rolarParaCategoria = (termo: string) => {
    if (!emblaApi) return;

    const slideIndex = encontrarSlideDaCategoria(termo);
    if (slideIndex !== null) {
      emblaApi.scrollTo(slideIndex);
    }
  };

  // Efeito para rolar quando o termo de busca mudar
  useEffect(() => {
    if (termoBusca) {
      rolarParaCategoria(termoBusca);
    }
  }, [termoBusca]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = emblaApi.scrollProgress();
    setScrollProgress(progress);
  }, [emblaApi]);

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

  return (
    <div className="relative">
      {/* Input de busca */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={termoBusca}
            onChange={e => setTermoBusca(e.target.value)}
            placeholder="Buscar categoria..."
            className="w-full py-3 px-4 pl-12 pr-4 rounded-full border border-[#173363]/20 
                     focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent 
                     transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#173363]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {termoBusca && (
            <button
              onClick={() => setTermoBusca('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#173363] transition-colors"
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Carrossel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {categoriasAgrupadas.map((grupo, index) => (
            <div key={index} className="flex-[0_0_100%] md:flex-[0_0_25%] min-w-0 pl-4">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-500 h-full">
                <div className="flex flex-col gap-4">
                  {grupo.map(categoria => (
                    <button
                      key={categoria.id}
                      className={`flex items-center p-4 rounded-lg transition-all duration-300
                                ${
                                  categoriaSelecionada === categoria.nome
                                    ? 'bg-[#173363] text-white'
                                    : 'bg-gray-50 hover:bg-[#173363]/5 text-[#173363]'
                                }`}
                      onClick={() => onCategoriaClick(categoria.nome)}
                    >
                      <span className="text-2xl mr-3">{categoria.icone}</span>
                      <span className="text-sm font-medium">{categoria.nome}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="mt-8 mx-auto w-full max-w-xs h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#173363] to-[#6EC747] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </div>
  );
}

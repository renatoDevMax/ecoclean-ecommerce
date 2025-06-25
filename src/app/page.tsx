'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Partners from '@/components/Partners';
import Footer from '@/components/Footer';
import DestaquesProds from '@/components/DestaquesProds';
import Fidelidade from '@/components/Fidelidade';
import LicaResponde from '@/components/LicaResponde';

// Dados dos produtos em destaque

export default function Home() {
  // Função para detectar quando elementos entram e saem da viewport e ativar/desativar animações
  useEffect(() => {
    const scrollReveal = () => {
      const reveals = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale, .animate-element'
      );

      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementBottom = reveals[i].getBoundingClientRect().bottom;
        const elementVisible = 150;

        // Elemento está entrando na viewport por baixo
        if (elementTop < windowHeight - elementVisible && elementBottom > 0) {
          reveals[i].classList.add('active');
        }
        // Elemento está saindo da viewport (por cima ou por baixo)
        else if (elementBottom < 0 || elementTop > windowHeight) {
          reveals[i].classList.remove('active');
        }
      }
    };

    // Função para aplicar efeito de paralaxe
    const applyParallax = () => {
      const parallaxBg = document.querySelector('.parallax-bg') as HTMLElement;
      if (parallaxBg) {
        const scrollPosition = window.scrollY;
        parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', scrollReveal);
    window.addEventListener('scroll', applyParallax);
    scrollReveal(); // Verificar elementos visíveis no carregamento inicial

    return () => {
      window.removeEventListener('scroll', scrollReveal);
      window.removeEventListener('scroll', applyParallax);
    };
  }, []);

  // Formatar preço em reais
  const formatarPreco = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section com efeito paralaxe melhorado */}
      <section className="relative flex items-center justify-center h-screen overflow-hidden">
        {/* Imagem de fundo com efeito paralaxe via JavaScript */}
        <div
          className="parallax-bg absolute w-full h-150 top-0 left-0"
          style={{
            backgroundImage: 'url("/sec1.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '150%', // Tamanho extra para permitir movimento
            willChange: 'transform',
          }}
        ></div>

        {/* Overlay para melhorar a legibilidade do texto */}
        <div className="absolute inset-0 bg-[#173363]/60 backdrop-blur-[2px]"></div>

        {/* Conteúdo centralizado */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              <span className="block mb-2 animate-element animate-fade-in-left animate-delay-100">
                Compromisso com a
              </span>
              <span className="block text-[#8ED96A] mb-2 animate-element animate-shimmer">
                excelência e qualidade
              </span>
              <span className="block animate-element animate-fade-in-right animate-delay-200">
                para o seu lar
              </span>
            </h1>

            <p className="text-xl text-white/90 drop-shadow-md animate-element animate-fade-in-up animate-delay-400">
              Produtos de alta qualidade com ofertas exclusivas para clientes do nosso programa de
              fidelidade.
            </p>

            <button
              onClick={() => (window.location.href = '/produtos')}
              className="transition-default px-10 py-4 bg-[#6EC747] hover:bg-[#5AB636] text-white text-lg font-medium rounded-full 
                             hover:shadow-lg hover:shadow-[#173363]/20 hover:-translate-y-1
                             border-2 border-[#8ED96A] hover:border-[#6EC747]
                             animate-element animate-scale-in animate-delay-500"
            >
              Comprar Agora
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-10 animate-fade-in animate-delay-700">
          <div className="w-8 h-14 border-2 border-white rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-pulse-slow"></div>
          </div>
        </div>
      </section>

      {/* Seção de Programa de Fidelidade */}
      <Fidelidade />

      {/* Seção da Lica Responde */}
      <LicaResponde />

      {/* Seção de Produtos em Destaque */}
      <DestaquesProds />

      {/* Seção de Marcas Parceiras */}
      <Partners />

      {/* Footer */}
      <Footer />
    </main>
  );
}

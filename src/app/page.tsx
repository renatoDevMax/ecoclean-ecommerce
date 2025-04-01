'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Partners from '@/components/Partners';
import Footer from '@/components/Footer';
import DestaquesProds from '@/components/DestaquesProds';
import Fidelidade from '@/components/Fidelidade';

// Dados dos produtos em destaque
const produtosDestaque = [
  {
    id: 1,
    nome: "EcoFresh Multiuso",
    valor: 42.90,
    descricao: "Limpador multiuso concentrado com extrato de aloe vera e óleos essenciais. Limpa profundamente sem agredir superfícies ou o meio ambiente.",
    imagem: "https://scontent-gru1-2.xx.fbcdn.net/v/t39.30808-6/299997946_452092000264496_1934741127448520363_n.png?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=Bwazmt6dy9sQ7kNvgEOjTUW&_nc_oc=AdmGQa128xHmjsd8_bw2ocyC9OdgIxz2-aHtR1sTI9zdiy03_E7QOs2Y_9IlMo0enV8&_nc_zt=23&_nc_ht=scontent-gru1-2.xx&_nc_gid=rHlictEwBwAHIH37mLmElQ&oh=00_AYGN7DDGYpLJ5F6TJk-GTGj6J1wXBsdFVjSlBFlvcF5xJg&oe=67EDE99C",
    categoria: "Limpadores"
  },
  {
    id: 2,
    nome: "NaturalWash Louças",
    valor: 35.50,
    descricao: "Detergente biodegradável para louças com ingredientes naturais que removem gorduras sem ressecar as mãos.",
    imagem: "data:image/jpeg;base64,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",
    categoria: "Cozinha"
  },
  {
    id: 3,
    nome: "OxyPure Tecidos",
    valor: 54.90,
    descricao: "Alvejante ecológico sem cloro que remove manchas difíceis preservando as cores e a integridade dos tecidos.",
    imagem: "https://images.unsplash.com/photo-1566846128021-b940b0eec910?q=80&w=600&auto=format",
    categoria: "Lavanderia"
  },
  {
    id: 4,
    nome: "VitreGlow Vidros",
    valor: 38.70,
    descricao: "Limpador de vidros e espelhos que proporciona brilho intenso sem deixar resíduos ou marcas, com fórmula antirressecamento.",
    imagem: "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=600&auto=format",
    categoria: "Especialidades"
  }
];

export default function Home() {
  // Função para detectar quando elementos entram e saem da viewport e ativar/desativar animações
  useEffect(() => {
    const scrollReveal = () => {
      const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .animate-element');
      
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
              <span className="block mb-2 animate-element animate-fade-in-left animate-delay-100">Compromisso com a</span>
              <span className="block text-[#8ED96A] mb-2 animate-element animate-shimmer">
                excelência e qualidade
              </span>
              <span className="block animate-element animate-fade-in-right animate-delay-200">para o seu lar</span>
            </h1>
            
            <p className="text-xl text-white/90 drop-shadow-md animate-element animate-fade-in-up animate-delay-400">
              Produtos de alta qualidade com ofertas exclusivas para clientes do nosso programa de fidelidade.
            </p>
            
            <button className="transition-default px-10 py-4 bg-[#6EC747] hover:bg-[#5AB636] text-white text-lg font-medium rounded-full 
                             hover:shadow-lg hover:shadow-[#173363]/20 hover:-translate-y-1
                             border-2 border-[#8ED96A] hover:border-[#6EC747]
                             animate-element animate-scale-in animate-delay-500">
              Comprar Agora
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in animate-delay-700">
          <div className="w-8 h-14 border-2 border-white rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-pulse-slow"></div>
          </div>
        </div>
      </section>

      {/* Seção de Programa de Fidelidade */}
      <Fidelidade />

      {/* Seção de Produtos em Destaque */}
      <DestaquesProds />
      
      {/* Seção de Marcas Parceiras */}
      <Partners />

      {/* Footer */}
      <Footer />
    </main>
  );
}

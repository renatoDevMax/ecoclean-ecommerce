'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Dados dos produtos em destaque
const produtosDestaque = [
  {
    id: 1,
    nome: "Desinfetantes Clarilimp",
    valor: 13.60,
    descricao: "Limpador multiuso concentrado com extrato de aloe vera e óleos essenciais. Limpa profundamente sem agredir superfícies ou o meio ambiente.",
    imagem: "https://cdn.awsli.com.br/600x450/1750/1750843/produto/238514896/desinf-clari-8bv71qladx.png",
    categoria: "Limpadores"
  },
  {
    id: 2,
    nome: "GENCO Cloro 3 em 1 10kg",
    valor: 268.00,
    descricao: "Detergente biodegradável para louças com ingredientes naturais que removem gorduras sem ressecar as mãos.",
    imagem: "https://genco.com.br/imagens/produtos/produto11-2.jpg",
    categoria: "Cozinha"
  },
  {
    id: 3,
    nome: "Limpadores Perfumados Coala - 120 ml",
    valor: 15.60,
    descricao: "Alvejante ecológico sem cloro que remove manchas difíceis preservando as cores e a integridade dos tecidos.",
    imagem: "https://http2.mlstatic.com/D_NQ_NP_978246-MLA80961206875_112024-O.webp",
    categoria: "Lavanderia"
  },
  {
    id: 4,
    nome: "Blend 500ml - Vonix",
    valor: 58.70,
    descricao: "Limpador de vidros e espelhos que proporciona brilho intenso sem deixar resíduos ou marcas, com fórmula antirressecamento.",
    imagem: "https://http2.mlstatic.com/D_NQ_NP_621450-MLB82346259088_022025-O-vonixx-spray-wax-blend-cera-liquida-carnauba-silica-500-ml.webp",
    categoria: "Especialidades"
  }
];

export default function DestaquesProds() {
  // Estado para controlar elementos visíveis com Intersection Observer
  const [visibleProducts, setVisibleProducts] = useState<number[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Formatar preço em reais
  const formatarPreco = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  useEffect(() => {
    // Configurar Intersection Observer para animações na entrada dos elementos
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute('data-id'));
          if (entry.isIntersecting) {
            setVisibleProducts((prev) => [...prev, id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observar todos os elementos de produtos
    document.querySelectorAll('.product-item').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-[#FAFBFD]">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent"></div>
      <div className="absolute -top-20 right-20 w-96 h-96 rounded-full bg-[#173363]/3 blur-[100px]"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 rounded-full bg-[#6EC747]/5 blur-[80px]"></div>
      
      {/* Padrão sutil de linhas no fundo */}
      <div className="absolute inset-0 opacity-5" 
           style={{
             backgroundImage: 'linear-gradient(to right, #173363 1px, transparent 1px), linear-gradient(to bottom, #6EC747 1px, transparent 1px)',
             backgroundSize: '60px 60px'
           }}>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#173363]/30"></div>
              <span className="mx-4 text-[#173363] text-sm font-light tracking-[0.2em] uppercase">Seleção Especial</span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#173363]/30"></div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="text-[#173363]">Produtos em </span> 
            <span className="text-[#6EC747] font-normal">Destaque</span>
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Uma curadoria requintada dos produtos mais refinados para proporcionar um cuidado excepcional ao seu lar, selecionados com excelência pela nossa equipe.
          </p>
        </div>

        {/* Layout Elegante de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {produtosDestaque.map((produto, index) => (
            <div 
              key={produto.id}
              data-id={produto.id}
              className={`product-item group relative transition-all duration-700 ${
                visibleProducts.includes(produto.id) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`
              }}
              onMouseEnter={() => setHoveredProduct(produto.id)}
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
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#173363]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  </div>
                  
                  {/* Botão que aparece no hover */}
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex justify-center p-4">
                    <button className="bg-white hover:bg-[#6EC747] text-[#173363] hover:text-white px-6 py-2 rounded-full shadow-lg transform group-hover:scale-105 transition-all duration-300 flex items-center">
                      <span>Ver Detalhes</span>
                      <svg className="w-4 h-4 ml-2 transition-all duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Conteúdo do produto */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-medium text-[#173363] mb-2 line-clamp-1">{produto.nome}</h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{produto.descricao}</p>
                  
                  <div className="mt-auto">
                    {/* Preço e condições */}
                    <div className="flex items-end justify-between mb-4">
                      <div className="text-2xl font-light text-[#173363]">
                        {formatarPreco(produto.valor)}
                      </div>
                      <div className="text-xs text-gray-500">
                        ou 3x de {formatarPreco(produto.valor / 3)}
                      </div>
                    </div>
                    
                    {/* Botão de adicionar ao carrinho */}
                    <button className="w-full bg-[#173363]/5 hover:bg-[#173363] text-[#173363] hover:text-white py-3 rounded-lg transition-colors duration-300 flex items-center justify-center group/btn">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 11V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 14H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
          ))}
        </div>
        
        {/* CTA estiloso para ver todos os produtos */}
        <div className="mt-16 text-center">
          <div className="inline-block">
            <a href="#" className="group relative inline-flex items-center py-3 px-8 overflow-hidden">
              {/* Fundo do botão com efeito de transição */}
              <span className="absolute inset-0 border border-[#173363]/20 rounded-full"></span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#173363] to-[#6EC747] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              
              {/* Texto e ícone */}
              <span className="relative z-10 font-light text-[#173363] group-hover:text-white transition-colors duration-500">
                Explorar Catálogo Completo
              </span>
              <svg className="relative z-10 w-5 h-5 ml-2 text-[#173363] group-hover:text-white transition-all duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4 max-w-xs mx-auto">
            Cadastre-se para receber notificações sobre novos produtos e ofertas exclusivas
          </p>
        </div>
      </div>
    </section>
  );
}

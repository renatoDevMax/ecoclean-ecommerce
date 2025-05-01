'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Dados fictícios de 20 marcas parceiras
const partnersData = [
  {
    id: 1,
    nome: 'Veja',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Veja_limpeza.png',
  },
  {
    id: 2,
    nome: 'Mon Bijou',
    imagem: 'https://bemol.vtexassets.com/arquivos/ids/175623/215606_b.jpg?v=638536989692770000',
  },
  {
    id: 3,
    nome: 'Bombril',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Logo_Bombril.jpg',
  },
  {
    id: 4,
    nome: 'Perfect Pro',
    imagem:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYOjunM3XUP0E_x9drU-kp9d3brnhoxEWlSg&s',
  },
  {
    id: 5,
    nome: 'Condor',
    imagem:
      'https://media.licdn.com/dms/image/v2/C4D0BAQEA_Uv9G07fFg/company-logo_200_200/company-logo_200_200/0/1630531379029/condor_s_a__logo?e=2147483647&v=beta&t=7cEL6ZIhhsRx9mdGhhWeMta4hcr_DoC66zSgn8W4rAo',
  },
  {
    id: 6,
    nome: 'Clarilimp',
    imagem:
      'https://www.atomosquimica.com.br/wp-content/uploads/2021/01/cropped-LOG-CLARILIMP-SEM-FUNDO-1-1.png',
  },
  {
    id: 7,
    nome: 'Renko',
    imagem:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV2Vkonrb_35DkP2RrCTf7wEGpMMTGex3T3g&s',
  },
  {
    id: 8,
    nome: 'Cif',
    imagem:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsy1c4iAfaRphSpTjQCzWnZWHfiGhKtiJ7EA&s',
  },
  {
    id: 9,
    nome: 'Mr Músculo',
    imagem:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGc4nudkR__TUKVV-0pfOSmUyW-lOfS4YNWw&s',
  },
  {
    id: 10,
    nome: '<Ou>',
    imagem:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk2ZYt1Fm1XJaUExTW5n4sidBoGsN691aPRg&s',
  },
  { id: 11, nome: 'Bompack', imagem: 'https://officemaisdistribuidora.com.br/marcas/Bompack.png' },
  {
    id: 12,
    nome: 'Dona Tulipa',
    imagem:
      'https://cdn.iset.io/assets/74343/imagens/instagram-post-black-november-minimalista-preto-e-azul-neon--documento--a4----14-.png',
  },
  {
    id: 13,
    nome: 'Girando Sol',
    imagem:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ148vKwoQuQXGV8uEAuvXOwVTfJaKlmi7u8g&s',
  },
  {
    id: 14,
    nome: 'Omo',
    imagem:
      'https://www.unilever.com.br/content-images/92ui5egz/production/8f97eed24ec57b901a66af9725cc5ddc2fde7a51-1080x1080.png?w=375&h=375&fit=crop&auto=format',
  },
  {
    id: 15,
    nome: 'Vonixx',
    imagem:
      'https://bordipecas.com.br/wp-content/uploads/2023/02/IMAGEM-INTERNA-LOGOTIPO-VONIXX-MONOCROMATICO-BRANCO-300x194-1.jpg',
  },
  {
    id: 16,
    nome: 'Genco',
    imagem:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkrQvZ4azHF8FbdPtczqiyUIa7-yM43Z_Ccg&s',
  },
  {
    id: 17,
    nome: 'Glade',
    imagem:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzZ50VYPawxwhiuNlGVJyQKiOyB9v33DREQw&s',
  },
  {
    id: 18,
    nome: 'Cadillac',
    imagem:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShAxWHWoNiP0jh60fWEgs_C_WIdm4-z0zX9g&s',
  },
  {
    id: 19,
    nome: 'Netuno',
    imagem: 'https://www.netunopiscinas.com.br/wp-content/uploads/2022/05/LOGO2.svg',
  },
  {
    id: 20,
    nome: 'HidroAll',
    imagem:
      'https://64.media.tumblr.com/01af74d08b46d5eb0a9cdb2806106410/02c73dc040b70bb0-04/s250x400/9e64222d3f3b2f7323addb2f9de9cb2c28c57ec2.jpg',
  },
];

export default function Partners() {
  // Estado para controlar elementos visíveis com Intersection Observer
  const [visiblePartners, setVisiblePartners] = useState<number[]>([]);

  useEffect(() => {
    // Configurar Intersection Observer para animações na entrada dos elementos
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = Number(entry.target.getAttribute('data-id'));
          if (entry.isIntersecting) {
            setVisiblePartners(prev => [...prev, id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observar todos os elementos de parceiros
    document.querySelectorAll('.partner-item').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-20 relative overflow-hidden bg-white">
      {/* Elementos decorativos de fundo */}
      <div className="absolute -top-40 left-1/4 w-80 h-80 rounded-full bg-[#173363]/3 blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-[#6EC747]/3 blur-3xl"></div>

      {/* Padrão de pontos no fundo */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(#173363 1px, transparent 1px), radial-gradient(#6EC747 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 15px 15px',
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-4 reveal">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#173363]/40"></div>
            <span className="mx-4 text-[#173363] text-sm font-light tracking-[0.2em] uppercase">
              Parceria de Confiança
            </span>
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#173363]/40"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light mb-6 reveal-scale">
            <span className="text-[#173363]">Marcas </span>
            <span className="text-[#6EC747] font-normal">Parceiras</span>
          </h2>
          <p className="text-gray-600 leading-relaxed reveal max-w-2xl mx-auto">
            Trabalhamos com as melhores marcas do mercado para oferecer a você produtos de alta
            qualidade, sustentáveis e eficientes para o cuidado do seu lar.
          </p>
        </div>

        {/* Grade de parceiros com elementos circulares */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
          {partnersData.map((partner, index) => (
            <div
              key={partner.id}
              data-id={partner.id}
              className={`partner-item group relative transition-all duration-500 ${
                visiblePartners.includes(partner.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${(index % 5) * 100}ms`,
              }}
            >
              {/* Container do parceiro que expande */}
              <div className="overflow-hidden h-20 flex items-center bg-white border border-gray-100 rounded-full shadow-sm hover:shadow-md transition-all duration-500 transform group-hover:scale-105 group-hover:border-[#173363]/10">
                {/* Área de imagem sempre visível */}
                <div className="flex-shrink-0 w-20 h-20 p-3 relative rounded-full overflow-hidden bg-white">
                  <div className="w-full h-full relative">
                    <Image
                      src={partner.imagem}
                      alt={`Logo ${partner.nome}`}
                      width={60}
                      height={60}
                      className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Nome que aparece quando expande */}
                <div className="pl-2 pr-6 opacity-0 max-w-0 group-hover:max-w-[150px] group-hover:opacity-100 transition-all duration-500 overflow-hidden whitespace-nowrap">
                  <span className="text-[#173363] font-medium">{partner.nome}</span>
                </div>
              </div>

              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-[#173363]/10 via-[#6EC747]/10 to-[#173363]/10 blur-xl"></div>
            </div>
          ))}
        </div>

        {/* CTA final da seção */}
        <div className="text-center mt-16">
          <div className="inline-block reveal-scale reveal-delay-5">
            <Link
              href="/contato"
              className="group inline-flex items-center py-3 px-6 border border-[#173363]/20 rounded-full text-[#173363] hover:text-white bg-transparent hover:bg-[#173363] transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            >
              <span className="relative z-10 font-light">Torne-se um Parceiro</span>
              <svg
                className="w-4 h-4 ml-2 transition-all duration-300 group-hover:translate-x-1 relative z-10"
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
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

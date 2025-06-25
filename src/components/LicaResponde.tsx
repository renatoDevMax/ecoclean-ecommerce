'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LicaResponde = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const licaImages = ['/licaRespondendo.png', '/licaFeliz.png', '/licaPensando.png'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('lica-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Efeito para alternar as imagens a cada 3 segundos com fade
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % licaImages.length);
        setIsTransitioning(false);
      }, 250); // Metade da duração da transição
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="lica-section"
      className="py-24 relative overflow-hidden bg-gradient-to-br from-[#FAFBFD] to-white"
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#173363]/5"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#6EC747]/5"></div>
      <div className="absolute top-1/4 left-1/3 w-4 h-4 rounded-full bg-[#173363]/20 animate-pulse-slow"></div>
      <div
        className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-[#6EC747]/20 animate-pulse-slow"
        style={{ animationDelay: '1s' }}
      ></div>

      {/* Padrão de bolhas decorativas */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-3 h-3 bg-[#173363]/10 rounded-full animate-bounce"
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className="absolute top-40 right-20 w-2 h-2 bg-[#6EC747]/15 rounded-full animate-bounce"
          style={{ animationDelay: '0.5s' }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-4 h-4 bg-[#173363]/8 rounded-full animate-bounce"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute bottom-20 right-1/3 w-2 h-2 bg-[#6EC747]/12 rounded-full animate-bounce"
          style={{ animationDelay: '1.5s' }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-4 reveal">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#173363]/40"></div>
            <span className="mx-4 text-[#173363] text-sm font-light tracking-[0.2em] uppercase">
              Nova Funcionalidade
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#173363]/40"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light mb-6 reveal-scale reveal-delay-1">
            <span className="text-[#173363]">Conheça a </span>
            <span className="text-[#6EC747] font-normal">Lica Responde</span>
          </h2>
          <p className="text-gray-600 leading-relaxed reveal reveal-delay-2">
            Sua assistente virtual especializada em produtos de limpeza. Uma inteligência artificial
            simpática e experiente que ajuda você a escolher os melhores produtos para cada
            necessidade da sua casa.
          </p>
        </div>

        {/* Conteúdo principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Coluna da imagem */}
          <div className="relative reveal-left reveal-delay-3 lg:mr-8">
            <div className="relative max-w-xs lg:max-w-md mx-auto lg:mx-0 lg:ml-auto">
              {/* Container da imagem com fade */}
              <div className="relative z-10">
                <div className="relative w-80 h-80 lg:w-96 lg:h-[500px] rounded-full lg:rounded-2xl shadow-2xl border-4 lg:border-0 border-white overflow-hidden">
                  {/* Imagem da Lica com fade */}
                  <Image
                    src={licaImages[currentImageIndex]}
                    alt="Lica Responde - Assistente Virtual"
                    width={300}
                    height={360}
                    className={`w-full h-full object-contain object-top lg:object-center transition-opacity duration-500 ease-in-out ${
                      isTransitioning ? 'opacity-0' : 'opacity-100'
                    }`}
                    style={{
                      transform: isVisible
                        ? 'translateY(0) scale(1)'
                        : 'translateY(50px) scale(0.95)',
                      transition: 'all 1s ease-out',
                    }}
                  />
                </div>
              </div>

              {/* Efeito de brilho atrás da imagem */}
              <div
                className="absolute -inset-6 lg:-inset-4 bg-gradient-to-r from-[#173363]/20 via-[#6EC747]/20 to-[#173363]/20 rounded-full lg:rounded-3xl blur-xl opacity-0"
                style={{
                  opacity: isVisible ? 0.6 : 0,
                  transform: isVisible ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 1.5s ease-out',
                  transitionDelay: '0.5s',
                }}
              ></div>

              {/* Elementos decorativos flutuantes */}
              <div
                className="absolute -top-2 -right-2 lg:-top-6 lg:-right-6 w-12 h-12 lg:w-16 lg:h-16 bg-[#6EC747]/10 rounded-full flex items-center justify-center"
                style={{
                  transform: isVisible ? 'rotate(360deg) scale(1)' : 'rotate(0deg) scale(0)',
                  transition: 'all 1s ease-out',
                  transitionDelay: '0.8s',
                }}
              >
                <svg
                  className="w-6 h-6 lg:w-8 lg:h-8 text-[#6EC747]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 6V22M12 22L15 19M12 22L9 19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div
                className="absolute -bottom-2 -left-2 lg:-bottom-4 lg:-left-4 w-10 h-10 lg:w-12 lg:h-12 bg-[#173363]/10 rounded-full flex items-center justify-center"
                style={{
                  transform: isVisible ? 'rotate(-360deg) scale(1)' : 'rotate(0deg) scale(0)',
                  transition: 'all 1s ease-out',
                  transitionDelay: '1s',
                }}
              >
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6 text-[#173363]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Indicadores de imagem */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {licaImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? 'bg-[#6EC747] w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Coluna do conteúdo */}
          <div className="space-y-8 reveal-right reveal-delay-4">
            {/* Chat da Lica */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#6EC747] to-[#173363] rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold text-sm">L</span>
                </div>
                <div>
                  <h4 className="font-medium text-[#173363]">Lica Responde</h4>
                  <p className="text-xs text-gray-500">Assistente Virtual</p>
                </div>
                <div className="ml-auto flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>

              {/* Mensagem da Lica */}
              <div className="bg-[#173363]/5 rounded-lg p-4 border-l-4 border-[#6EC747]">
                <p className="text-gray-700 leading-relaxed">
                  Olá! Sou a Lica, sua assistente especializada em produtos de limpeza! 🧽✨ Posso
                  ajudar você a montar uma lista personalizada de produtos para sua casa! 🏠 Me
                  conte suas necessidades e eu indico os melhores produtos da EcoClean! 💚
                </p>
              </div>
            </div>

            {/* Benefícios da Lica */}
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-[#173363]">Como a Lica pode ajudar você?</h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#6EC747]/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#6EC747]" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#173363] mb-1">Lista Personalizada</h4>
                    <p className="text-gray-600 text-sm">
                      Cria uma lista de produtos específica para as necessidades da sua casa
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#6EC747]/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#6EC747]" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 8V13L15 16M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#173363] mb-1">Atendimento 24/7</h4>
                    <p className="text-gray-600 text-sm">
                      Disponível a qualquer momento para tirar suas dúvidas sobre produtos
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#6EC747]/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#6EC747]" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#173363] mb-1">Experiência Especializada</h4>
                    <p className="text-gray-600 text-sm">
                      Conhecimento profundo sobre todos os produtos da EcoClean
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#6EC747]/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#6EC747]" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#173363] mb-1">Simplicidade</h4>
                    <p className="text-gray-600 text-sm">
                      Interface amigável e conversa natural, como falar com uma amiga
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <button
                onClick={() => (window.location.href = 'https://responde-lica.vercel.app/')}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#173363] to-[#6EC747] text-white font-medium rounded-full 
                          hover:shadow-lg hover:shadow-[#6EC747]/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Conversar com a Lica</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#6EC747] to-[#173363] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Experimente agora e descubra como a Lica pode facilitar suas compras! ✨
              </p>
            </div>
          </div>
        </div>

        {/* Seção de estatísticas */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 reveal reveal-delay-5">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#173363] mb-2">100%</div>
            <p className="text-gray-600">Disponível 24/7</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#6EC747] mb-2">500+</div>
            <p className="text-gray-600">Produtos conhecidos</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#173363] mb-2">AI</div>
            <p className="text-gray-600">Inteligência especializada</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LicaResponde;

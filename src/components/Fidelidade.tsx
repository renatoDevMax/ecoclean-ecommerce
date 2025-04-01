'use client';

import React, { useState, useEffect } from 'react';

const Fidelidade = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [successNotification, setSuccessNotification] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSuccessNotification(false);
    setCountdown(5);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessNotification(true);
  };

  // Efeito para controlar o countdown quando a notificação estiver visível
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (successNotification && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prevCount => prevCount - 1);
      }, 1000);
    } else if (successNotification && countdown === 0) {
      setSuccessNotification(false);
      setModalOpen(false);
      setCountdown(5); // Reseta o contador para futuras notificações
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [successNotification, countdown]);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#173363]/5"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#6EC747]/5"></div>
      <div className="absolute top-1/4 left-1/3 w-4 h-4 rounded-full bg-[#173363]/20 animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-[#6EC747]/20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho da seção com design minimalista e elegante */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-4 reveal">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#173363]/40"></div>
            <span className="mx-4 text-[#173363] text-sm font-light tracking-[0.2em] uppercase">Benefícios Exclusivos</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#173363]/40"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light mb-6 reveal-scale reveal-delay-1">
            <span className="text-[#173363]">Programa de</span> <span className="text-[#6EC747] font-normal">Fidelidade</span>
          </h2>
          <p className="text-gray-600 leading-relaxed reveal reveal-delay-2">
            Um novo conceito em relacionamento com nossos clientes. Transforme sua experiência de compra 
            com benefícios exclusivos desenhados para tornar sua jornada mais conveniente e econômica.
          </p>
        </div>

        {/* Área de benefícios com layout moderno e elegante */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 relative">
          {/* Linha decorativa conectando os cartões - apenas visível em telas grandes */}
          <div className="hidden lg:block absolute top-28 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-[#173363]/10 via-[#6EC747]/30 to-[#173363]/10"></div>
          
          {/* Benefício 1 - Economia */}
          <div className="relative reveal-left reveal-delay-2 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center mb-10 relative z-10">
              <svg className="w-8 h-8 text-[#173363]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8L15 13.5M12 8L9 13.5M12 8V20M12 8C14.2091 8 16 6.20914 16 4C16 1.79086 14.2091 0 12 0C9.79086 0 8 1.79086 8 4C8 6.20914 9.79086 8 12 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.5 13.5L9 13M15.5 13.5L15 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 18C21.6569 18 23 16.6569 23 15C23 13.3431 21.6569 12 20 12C18.3431 12 17 13.3431 17 15C17 16.6569 18.3431 18 20 18Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M4 18C5.65685 18 7 16.6569 7 15C7 13.3431 5.65685 12 4 12C2.34315 12 1 13.3431 1 15C1 16.6569 2.34315 18 4 18Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M20 22C20 19.7909 17.3137 18 14 18H10C6.68629 18 4 19.7909 4 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-[#173363] mb-2 text-center">Economia Premium</h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#173363] to-[#6EC747] mb-4"></div>
            <p className="text-gray-600 text-center leading-relaxed">
              Acesse ofertas exclusivas em produtos selecionados que são atualizados semanalmente apenas para clientes fiéis. Quanto mais tempo você permanece conosco, mais vantagens exclusivas.
            </p>
            <a href="#" className="mt-6 flex items-center text-[#173363] hover:text-[#6EC747] transition-all duration-300 group">
              <span className="font-light border-b border-[#173363]/30 group-hover:border-[#6EC747]">Ver ofertas da semana</span>
              <svg className="w-4 h-4 ml-2 transition-all duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          
          {/* Benefício 2 - Conveniência */}
          <div className="relative reveal reveal-delay-3 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center mb-10 relative z-10">
              <svg className="w-8 h-8 text-[#173363]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 14L12 22M12 22L15 19M12 22L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 17.6073C21.4937 17.0221 23 15.6889 23 13C23 9 19.6667 8 18 8C18 6 18 2 12 2C6 2 6 6 6 8C4.33333 8 1 9 1 13C1 15.6889 2.50628 17.0221 4 17.6073" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-[#173363] mb-2 text-center">Entrega Prioritária</h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#6EC747] to-[#173363] mb-4"></div>
            <p className="text-gray-600 text-center leading-relaxed">
              Frete gratuito e entregas prioritárias para membros do programa. Receba seus produtos com agilidade e sem custos adicionais.
            </p>
            <a href="#" className="mt-6 flex items-center text-[#173363] hover:text-[#6EC747] transition-all duration-300 group">
              <span className="font-light border-b border-[#173363]/30 group-hover:border-[#6EC747]">Verificar cobertura</span>
              <svg className="w-4 h-4 ml-2 transition-all duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          
          {/* Benefício 3 - Flexibilidade */}
          <div className="relative reveal-right reveal-delay-2 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center mb-10 relative z-10">
              <svg className="w-8 h-8 text-[#173363]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 9.5V12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.6477 2 13.2503 2.07954 13.8281 2.22873M22 5H18.5H15M15 5L17.5 2.5M15 5L17.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7V13H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-[#173363] mb-2 text-center">Flexibilidade Financeira</h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#173363] to-[#6EC747] mb-4"></div>
            <p className="text-gray-600 text-center leading-relaxed">
              Opções exclusivas de parcelamento sem juros, adaptadas ao seu orçamento. Planeje suas compras com tranquilidade e sem preocupações.
            </p>
            <a href="#" className="mt-6 flex items-center text-[#173363] hover:text-[#6EC747] transition-all duration-300 group">
              <span className="font-light border-b border-[#173363]/30 group-hover:border-[#6EC747]">Explorar condições</span>
              <svg className="w-4 h-4 ml-2 transition-all duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* CTA mais elegante e refinado */}
        <div className="mt-20 text-center">
          <div className="inline-block relative group reveal-scale reveal-delay-5">
            <button
              onClick={handleOpenModal}
              className="relative px-10 py-4 bg-white text-[#173363] group-hover:text-white text-lg font-medium rounded-full 
                        hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1 border-2 border-transparent
                        transition-all duration-500 z-10 overflow-hidden"
            >
              <span className="relative z-10">Torne-se Membro Premium</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#173363] to-[#6EC747] opacity-0 group-hover:opacity-100 
                            transition-opacity duration-500 -z-0"></div>
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4 reveal reveal-delay-6 font-light">
            Já é cliente? <a href="#" className="text-[#173363] hover:text-[#6EC747] transition-colors duration-300 border-b border-[#173363]/20 hover:border-[#6EC747]">Acesse sua conta para ver seus benefícios</a>
          </p>
        </div>
      </div>

      {/* Modal de Cadastro */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay com efeito de desfoque */}
          <div 
            className="absolute inset-0 bg-[#173363]/30 backdrop-blur-sm"
            onClick={handleCloseModal}
          ></div>
          
          {/* Modal Container */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[700px] relative z-10 animate-scale-in flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 flex-shrink-0">
              <h3 className="text-2xl font-light text-[#173363]">
                Cadastro <span className="text-[#6EC747] font-normal">Programa de Fidelidade</span>
              </h3>
              <p className="text-gray-500 mt-1 text-sm">Preencha seus dados para participar do nosso programa exclusivo</p>
            </div>
            
            {/* Modal Body - Formulário com scroll */}
            <div className="overflow-y-auto flex-grow">
              <form className="p-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1">
                    <label htmlFor="nome" className="block text-sm font-light text-gray-600 mb-1">Nome completo</label>
                    <input 
                      type="text" 
                      id="nome" 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <label htmlFor="telefone" className="block text-sm font-light text-gray-600 mb-1">Telefone</label>
                    <input 
                      type="tel" 
                      id="telefone" 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <label htmlFor="documento" className="block text-sm font-light text-gray-600 mb-1">CPF/CNPJ</label>
                    <input 
                      type="text" 
                      id="documento" 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                      placeholder="000.000.000-00"
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <label htmlFor="cidade" className="block text-sm font-light text-gray-600 mb-1">Cidade</label>
                    <input 
                      type="text" 
                      id="cidade" 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                      placeholder="Sua cidade"
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <label htmlFor="bairro" className="block text-sm font-light text-gray-600 mb-1">Bairro</label>
                    <input 
                      type="text" 
                      id="bairro" 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                      placeholder="Seu bairro"
                    />
                  </div>
                  
                  <div className="col-span-1 md:col-span-1.5">
                    <label htmlFor="rua" className="block text-sm font-light text-gray-600 mb-1">Rua</label>
                    <input 
                      type="text" 
                      id="rua" 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                      placeholder="Nome da rua"
                    />
                  </div>
                  
                  <div className="col-span-1 md:col-span-0.5">
                    <label htmlFor="numero" className="block text-sm font-light text-gray-600 mb-1">Número</label>
                    <input 
                      type="text" 
                      id="numero" 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                      placeholder="Nº"
                    />
                  </div>
                </div>
              
                {/* Botões de ação - dentro do formulário */}
                <div className="mt-8 space-y-4">
                  <button 
                    type="submit" 
                    className="w-full py-3 bg-gradient-to-r from-[#173363] to-[#6EC747] text-white font-light rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#6EC747]/20 hover:-translate-y-0.5"
                  >
                    Solicitar participação no Programa de Fidelidade EcoClean
                  </button>
                  
                  <button 
                    type="button" 
                    className="w-full py-3 bg-white text-[#173363] font-light border border-gray-200 rounded-lg transition-all duration-300 hover:border-[#173363]/30"
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Notificação de sucesso */}
          {successNotification && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md animate-scale-in pointer-events-auto">
                <div className="flex flex-col items-center text-center">
                  {/* Ícone de sucesso animado */}
                  <div className="w-20 h-20 rounded-full bg-[#6EC747]/10 flex items-center justify-center mb-6 animate-pulse">
                    <svg className="w-12 h-12 text-[#6EC747]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  
                  <h4 className="text-2xl font-light text-[#173363] mb-2">
                    Sua solicitação foi enviada com sucesso!
                  </h4>
                  
                  <p className="text-gray-600 mb-6">
                    Em breve um de nossos atendentes entrará em contato.<br />
                    Obrigado pela preferência <span className="text-2xl">😊</span>
                  </p>
                  
                  {/* Contador elegante */}
                  <div className="relative h-14 w-14">
                    <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#eee" strokeWidth="2" />
                      <circle 
                        cx="18" 
                        cy="18" 
                        r="16" 
                        fill="none" 
                        stroke="url(#gradient)" 
                        strokeWidth="2" 
                        strokeDasharray={`${(countdown / 5) * 100} 100`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#173363" />
                          <stop offset="100%" stopColor="#6EC747" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[#173363] font-light text-xl">
                      {countdown}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Fidelidade; 
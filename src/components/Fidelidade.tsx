'use client';

import React, { useState, useEffect } from 'react';

const Fidelidade = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rewardsModalOpen, setRewardsModalOpen] = useState(false);
  const [coverageModalOpen, setCoverageModalOpen] = useState(false);
  const [financialModalOpen, setFinancialModalOpen] = useState(false);
  const [successNotification, setSuccessNotification] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [erroNotification, setErroNotification] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    documento: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
  });

  const handleOpenModal = () => {
    setModalOpen(true);
    setErroNotification(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSuccessNotification(false);
    setErroNotification(false);
    setCountdown(5);
    setFormData({
      nome: '',
      telefone: '',
      documento: '',
      cidade: '',
      bairro: '',
      rua: '',
      numero: '',
    });
  };

  const handleOpenRewardsModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setRewardsModalOpen(true);
  };

  const handleCloseRewardsModal = () => {
    setRewardsModalOpen(false);
  };

  const handleOpenCoverageModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setCoverageModalOpen(true);
  };

  const handleCloseCoverageModal = () => {
    setCoverageModalOpen(false);
  };

  const handleOpenFinancialModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setFinancialModalOpen(true);
  };

  const handleCloseFinancialModal = () => {
    setFinancialModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);
    setErro('');

    try {
      // Montar o objeto de mensagem conforme especificado
      const mensagemFormatada = `
Temos uma solicitação para o *Programa de Fidelidade*.
Nome: ${formData.nome}
Telefone: ${formData.telefone}
CPF/CNPJ: ${formData.documento}
Cidade: ${formData.cidade}
Bairro: ${formData.bairro}
Rua: ${formData.rua}
Número: ${formData.numero}
`;

      const dadosEnvio = {
        contato: '4187280741', // Número fixo para onde enviar a mensagem
        mensagem: mensagemFormatada,
      };

      // Enviar para a API
      const resposta = await fetch(
        'https://web-production-42b00.up.railway.app/whatsapp/mensagem',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dadosEnvio),
        }
      );

      const resultado = await resposta.json();

      // Verificar se a mensagem foi enviada com sucesso
      if (resultado.mensagemEnviada) {
        // Sucesso
        setSuccessNotification(true);

        // Limpar formulário
        setFormData({
          nome: '',
          telefone: '',
          documento: '',
          cidade: '',
          bairro: '',
          rua: '',
          numero: '',
        });
      } else {
        // Erro
        setErro(
          'Não foi possível enviar sua solicitação. Por favor, tenha um pouco de paciência, logo a solicitação estará disponível novamente.'
        );
        setErroNotification(true);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setErro('Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente mais tarde.');
      setErroNotification(true);
    } finally {
      setEnviando(false);
    }
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

  // Efeito para fechar a notificação de erro após 5 segundos
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (erroNotification) {
      timer = setTimeout(() => {
        setErroNotification(false);
      }, 5000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [erroNotification]);

  return (
    <section id="fidelidade" className="py-24 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#173363]/5"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#6EC747]/5"></div>
      <div className="absolute top-1/4 left-1/3 w-4 h-4 rounded-full bg-[#173363]/20 animate-pulse-slow"></div>
      <div
        className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-[#6EC747]/20 animate-pulse-slow"
        style={{ animationDelay: '1s' }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Cabeçalho da seção com design minimalista e elegante */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-4 reveal">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#173363]/40"></div>
            <span className="mx-4 text-[#173363] text-sm font-light tracking-[0.2em] uppercase">
              Benefícios Exclusivos
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#173363]/40"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-light mb-6 reveal-scale reveal-delay-1">
            <span className="text-[#173363]">Programa de</span>{' '}
            <span className="text-[#6EC747] font-normal">Fidelidade</span>
          </h2>
          <p className="text-gray-600 leading-relaxed reveal reveal-delay-2">
            Um novo conceito em relacionamento com nossos clientes. Transforme sua experiência de
            compra com benefícios exclusivos desenhados para tornar sua jornada mais conveniente e
            econômica.
          </p>
        </div>

        {/* Área de benefícios com layout moderno e elegante */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 relative">
          {/* Linha decorativa conectando os cartões - apenas visível em telas grandes */}
          <div className="hidden lg:block absolute top-28 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-[#173363]/10 via-[#6EC747]/30 to-[#173363]/10"></div>

          {/* Benefício 1 - Economia */}
          <div className="relative reveal-left reveal-delay-2 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center mb-10 relative z-10">
              <svg
                className="w-8 h-8 text-[#173363]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8L15 13.5M12 8L9 13.5M12 8V20M12 8C14.2091 8 16 6.20914 16 4C16 1.79086 14.2091 0 12 0C9.79086 0 8 1.79086 8 4C8 6.20914 9.79086 8 12 8Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 13.5L9 13M15.5 13.5L15 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 18C21.6569 18 23 16.6569 23 15C23 13.3431 21.6569 12 20 12C18.3431 12 17 13.3431 17 15C17 16.6569 18.3431 18 20 18Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M4 18C5.65685 18 7 16.6569 7 15C7 13.3431 5.65685 12 4 12C2.34315 12 1 13.3431 1 15C1 16.6569 2.34315 18 4 18Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M20 22C20 19.7909 17.3137 18 14 18H10C6.68629 18 4 19.7909 4 22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-[#173363] mb-2 text-center">
              Economia Premium
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#173363] to-[#6EC747] mb-4"></div>
            <p className="text-gray-600 text-center leading-relaxed">
              Receba um excelente cashback em todas as suas compras. A cada aquisição, uma
              porcentagem do valor volta para você, gerando uma economia significativa ao longo do
              mês que pode ser resgatada em descontos nas próximas compras.
            </p>
            <a
              href="#"
              onClick={handleOpenRewardsModal}
              className="mt-6 flex items-center text-[#173363] hover:text-[#6EC747] transition-all duration-300 group"
            >
              <span className="font-light border-b border-[#173363]/30 group-hover:border-[#6EC747]">
                Conheça o programa de recompensas
              </span>
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
            </a>
          </div>

          {/* Benefício 2 - Conveniência */}
          <div className="relative reveal reveal-delay-3 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center mb-10 relative z-10">
              <svg
                className="w-8 h-8 text-[#173363]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 14L12 22M12 22L15 19M12 22L9 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 17.6073C21.4937 17.0221 23 15.6889 23 13C23 9 19.6667 8 18 8C18 6 18 2 12 2C6 2 6 6 6 8C4.33333 8 1 9 1 13C1 15.6889 2.50628 17.0221 4 17.6073"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-[#173363] mb-2 text-center">
              Entrega Prioritária
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#6EC747] to-[#173363] mb-4"></div>
            <p className="text-gray-600 text-center leading-relaxed">
              Frete gratuito e entregas prioritárias para membros do programa. Receba seus produtos
              com agilidade e sem custos adicionais.
            </p>
            <a
              href="#"
              onClick={handleOpenCoverageModal}
              className="mt-6 flex items-center text-[#173363] hover:text-[#6EC747] transition-all duration-300 group"
            >
              <span className="font-light border-b border-[#173363]/30 group-hover:border-[#6EC747]">
                Verificar cobertura
              </span>
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
            </a>
          </div>

          {/* Benefício 3 - Flexibilidade */}
          <div className="relative reveal-right reveal-delay-2 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center mb-10 relative z-10">
              <svg
                className="w-8 h-8 text-[#173363]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 9.5V12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.6477 2 13.2503 2.07954 13.8281 2.22873M22 5H18.5H15M15 5L17.5 2.5M15 5L17.5 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 7V13H16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-[#173363] mb-2 text-center">
              Flexibilidade Financeira
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#173363] to-[#6EC747] mb-4"></div>
            <p className="text-gray-600 text-center leading-relaxed">
              Opções exclusivas de parcelamento sem juros, adaptadas ao seu orçamento. Planeje suas
              compras com tranquilidade e sem preocupações.
            </p>
            <a
              href="#"
              onClick={handleOpenFinancialModal}
              className="mt-6 flex items-center text-[#173363] hover:text-[#6EC747] transition-all duration-300 group"
            >
              <span className="font-light border-b border-[#173363]/30 group-hover:border-[#6EC747]">
                Explorar condições
              </span>
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
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#173363] to-[#6EC747] opacity-0 group-hover:opacity-100 
                            transition-opacity duration-500 -z-0"
              ></div>
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4 reveal reveal-delay-6 font-light">
            Já é cliente?{' '}
            <a
              href="/login"
              className="text-[#173363] hover:text-[#6EC747] transition-colors duration-300 border-b border-[#173363]/20 hover:border-[#6EC747]"
            >
              Acesse sua conta para ver seus benefícios
            </a>
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
              <p className="text-gray-500 mt-1 text-sm">
                Preencha seus dados para participar do nosso programa exclusivo
              </p>
            </div>

            {/* Modal Body - Formulário com scroll */}
            <div className="overflow-y-auto flex-grow">
              <form className="p-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1">
                    <label htmlFor="nome" className="block text-sm font-light text-gray-600 mb-1">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="telefone"
                      className="block text-sm font-light text-gray-600 mb-1"
                    >
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label
                      htmlFor="documento"
                      className="block text-sm font-light text-gray-600 mb-1"
                    >
                      CPF/CNPJ
                    </label>
                    <input
                      type="text"
                      id="documento"
                      value={formData.documento}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                      placeholder="000.000.000-00"
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="cidade" className="block text-sm font-light text-gray-600 mb-1">
                      Cidade
                    </label>
                    <input
                      type="text"
                      id="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                      placeholder="Sua cidade"
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label htmlFor="bairro" className="block text-sm font-light text-gray-600 mb-1">
                      Bairro
                    </label>
                    <input
                      type="text"
                      id="bairro"
                      value={formData.bairro}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                      placeholder="Seu bairro"
                      required
                    />
                  </div>

                  <div className="col-span-1 md:col-span-1.5">
                    <label htmlFor="rua" className="block text-sm font-light text-gray-600 mb-1">
                      Rua
                    </label>
                    <input
                      type="text"
                      id="rua"
                      value={formData.rua}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                      placeholder="Nome da rua"
                      required
                    />
                  </div>

                  <div className="col-span-1 md:col-span-0.5">
                    <label htmlFor="numero" className="block text-sm font-light text-gray-600 mb-1">
                      Número
                    </label>
                    <input
                      type="text"
                      id="numero"
                      value={formData.numero}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EC747] focus:border-transparent transition-all duration-300"
                      placeholder="Nº"
                      required
                    />
                  </div>
                </div>

                {/* Mensagem de erro */}
                {erroNotification && (
                  <div className="mt-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                    <p>{erro}</p>
                  </div>
                )}

                {/* Botões de ação - dentro do formulário */}
                <div className="mt-8 space-y-4">
                  <button
                    type="submit"
                    disabled={enviando}
                    className="w-full py-3 bg-gradient-to-r from-[#173363] to-[#6EC747] text-white font-light rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#6EC747]/20 hover:-translate-y-0.5 flex items-center justify-center"
                  >
                    {enviando ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enviando solicitação...
                      </>
                    ) : (
                      'Solicitar participação no Programa de Fidelidade EcoClean'
                    )}
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
                    <svg
                      className="w-12 h-12 text-[#6EC747]"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M8 12L11 15L16 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <h4 className="text-2xl font-light text-[#173363] mb-2">
                    Sua solicitação foi enviada com sucesso!
                  </h4>

                  <p className="text-gray-600 mb-6">
                    Em breve um de nossos atendentes entrará em contato.
                    <br />
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

      {/* Modal de Programa de Recompensas */}
      {rewardsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay com efeito de desfoque */}
          <div
            className="absolute inset-0 bg-[#173363]/30 backdrop-blur-sm"
            onClick={handleCloseRewardsModal}
          ></div>

          {/* Modal Container */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] relative z-10 animate-scale-in overflow-hidden flex flex-col">
            {/* Modal Header com gradiente elegante */}
            <div className="bg-gradient-to-r from-[#173363] to-[#6EC747] p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-light">
                  Programa de <span className="font-semibold">Recompensas</span>
                </h3>
                <button
                  onClick={handleCloseRewardsModal}
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body com scroll */}
            <div className="overflow-y-auto p-6 flex-grow">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-medium text-[#173363] mb-3">
                    Como funciona nosso programa?
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    O programa de cashback da EcoClean foi desenvolvido para recompensar sua
                    fidelidade e proporcionar economia real em todas as suas compras. Quanto mais
                    você utiliza nossos produtos e serviços, maiores são as vantagens!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#173363]/10 flex items-center justify-center mr-3">
                        <svg
                          className="w-5 h-5 text-[#173363]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
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
                      <h5 className="text-lg font-medium text-[#173363]">Clientes Individuais</h5>
                    </div>
                    <ul className="ml-4 space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 text-[#6EC747] mr-2 flex-shrink-0 mt-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 13L9 17L19 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Cadastre-se em nossa plataforma</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 text-[#6EC747] mr-2 flex-shrink-0 mt-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 13L9 17L19 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Receba até 5% de cashback inicial em todas as compras</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 text-[#6EC747] mr-2 flex-shrink-0 mt-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 13L9 17L19 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Percentual evolutivo conforme frequência de compras</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#6EC747]/10 flex items-center justify-center mr-3">
                        <svg
                          className="w-5 h-5 text-[#6EC747]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 21H21M3 18H21M9 18V13M15 18V13M4 10L12 3L20 10M6 10V6H8V10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h5 className="text-lg font-medium text-[#173363]">Condomínios</h5>
                    </div>
                    <ul className="ml-4 space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 text-[#6EC747] mr-2 flex-shrink-0 mt-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 13L9 17L19 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Cadastre seu condomínio em nosso programa</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 text-[#6EC747] mr-2 flex-shrink-0 mt-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 13L9 17L19 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Moradores vinculados recebem até 10% de cashback</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 text-[#6EC747] mr-2 flex-shrink-0 mt-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 13L9 17L19 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Benefícios exclusivos para áreas comuns do condomínio</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-xl font-medium text-[#173363] mb-3">
                    Como utilizar seus créditos
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Os créditos acumulados ficam disponíveis em sua conta e podem ser utilizados das
                    seguintes formas:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 text-center">
                      <div className="w-12 h-12 bg-[#173363]/5 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-[#173363]" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M14.5 9.5L9 15M9 9.5L14.5 15M7 19H17C18.1046 19 19 18.1046 19 17V7C19 5.89543 18.1046 5 17 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h5 className="font-medium text-[#173363] mb-1">Desconto direto</h5>
                      <p className="text-sm text-gray-500">
                        Aplique como desconto em suas próximas compras
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 text-center">
                      <div className="w-12 h-12 bg-[#173363]/5 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-[#173363]" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M16 8V16M12 11V16M8 14V16M4 18H20C21.1046 18 22 17.1046 22 16V8C22 6.89543 21.1046 6 20 6H4C2.89543 6 2 6.89543 2 8V16C2 17.1046 2.89543 18 4 18Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h5 className="font-medium text-[#173363] mb-1">Acúmulo</h5>
                      <p className="text-sm text-gray-500">
                        Acumule para descontos maiores em compras futuras
                      </p>
                    </div>
                    <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 text-center">
                      <div className="w-12 h-12 bg-[#173363]/5 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-[#173363]" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M21 15C21 18.3137 18.3137 21 15 21C14.3627 21 13.7502 20.8849 13.1786 20.673C12.7134 20.5051 12.5808 20.4211 12.5613 20.3947C12.5429 20.3702 12.4379 20.2217 12.4379 19.7739C12.4379 19.2867 12.4379 19.0431 12.5501 18.9266C12.6582 18.8146 12.871 18.7323 13.298 18.5682L14.5421 18.1071C15.0111 17.9227 15.2456 17.8305 15.3683 17.6517C15.4918 17.4716 15.4993 17.2361 15.5143 16.7649C15.5229 16.5096 15.4395 16.2597 15.2789 16.0563C15.0182 15.7179 14.4922 15.7898 14.0137 15.7898C13.3307 15.7898 12.8474 15.3066 12.8474 14.6235C12.8474 14.2965 13.0547 14.0094 13.3505 13.8702C13.4965 13.7976 13.7054 13.7543 14.1231 13.6677L14.2289 13.6434C15.0545 13.4405 15.4673 13.3391 15.7204 13.0302C15.9735 12.7212 15.9735 12.2755 15.9735 11.3841V8.77094C15.9735 7.54968 15.9735 6.93905 15.7201 6.47652C15.4668 6.01399 14.986 5.7186 14.0244 5.12781L13.2235 4.64184C12.9089 4.45396 12.7516 4.36002 12.585 4.33187C12.3699 4.29492 12.1502 4.34427 11.9712 4.46813C11.8345 4.56167 11.7331 4.7191 11.5303 5.03395L10.9796 5.87572C10.4835 6.63861 10.2354 7.02006 9.86262 7.22043C9.48986 7.4208 9.04647 7.41438 8.15969 7.40154C6.80272 7.38273 6.12424 7.37333 5.62258 7.77267C5.12093 8.17201 5 8.84494 4.75815 10.1908L4.66586 10.6839C4.3319 12.4034 4.16492 13.2631 4.41664 13.9884C4.66835 14.7136 5.29116 15.2888 6.53677 16.4393L7.25404 17.101C8.45779 18.2145 9.05967 18.7712 9.80759 18.9557C10.5555 19.1402 11.3395 18.9366 12.9076 18.5295L13.1716 18.4527M21 9C21 5.68629 18.3137 3 15 3C11.6863 3 9 5.68629 9 9C9 12.3137 11.6863 15 15 15C18.3137 15 21 12.3137 21 9Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h5 className="font-medium text-[#173363] mb-1">Produtos exclusivos</h5>
                      <p className="text-sm text-gray-500">
                        Troque por produtos disponíveis apenas para membros
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-[#173363]/5 p-5 rounded-xl border border-[#173363]/10">
                  <h4 className="text-lg font-medium text-[#173363] mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#6EC747]" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Informações Importantes sobre Créditos
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    A cada compra realizada com seu cartão de fidelidade ou através de compras
                    online, você acumula créditos que ficam disponíveis para resgate em até 24 horas
                    após a compra. Estes créditos têm validade de 30 dias a partir da data de
                    disponibilização, então aproveite para utilizá-los antes do vencimento!
                  </p>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-gray-600 text-sm">
                  Quer fazer parte do nosso programa de recompensas?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleCloseRewardsModal}
                    className="px-5 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Fechar
                  </button>
                  <button
                    onClick={() => {
                      handleCloseRewardsModal();
                      handleOpenModal();
                    }}
                    className="px-5 py-2 bg-gradient-to-r from-[#173363] to-[#6EC747] text-white rounded-lg hover:shadow-md transition-all"
                  >
                    Tornar-se membro premium
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cobertura de Entrega */}
      {coverageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay com efeito de desfoque */}
          <div
            className="absolute inset-0 bg-[#173363]/30 backdrop-blur-sm"
            onClick={handleCloseCoverageModal}
          ></div>

          {/* Modal Container */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] relative z-10 animate-scale-in overflow-hidden flex flex-col">
            {/* Modal Header com gradiente elegante */}
            <div className="bg-gradient-to-r from-[#6EC747] to-[#173363] p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-light">
                  Cobertura de <span className="font-semibold">Entrega Prioritária</span>
                </h3>
                <button
                  onClick={handleCloseCoverageModal}
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body com scroll */}
            <div className="overflow-y-auto p-6 flex-grow">
              <div className="space-y-6">
                <div className="bg-[#173363]/5 p-5 rounded-xl border border-[#173363]/10">
                  <h4 className="text-xl font-medium text-[#173363] mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-[#173363]" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M17.6569 16.6569C16.7202 17.5935 14.7616 19.5521 13.4142 20.8995C12.6332 21.6805 11.3668 21.6805 10.5858 20.8995C9.26105 19.5748 7.34692 17.6606 6.34315 16.6569C3.21895 13.5327 3.21895 8.46734 6.34315 5.34315C9.46734 2.21895 14.5327 2.21895 17.6569 5.34315C20.781 8.46734 20.781 13.5327 17.6569 16.6569Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Área de Cobertura
                  </h4>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Nosso serviço de entrega prioritária está disponível para clientes do programa
                    de fidelidade nas seguintes localidades:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h5 className="font-medium text-[#173363] mb-2">Matinhos</h5>
                      <p className="text-sm text-gray-600">
                        Cobertura completa em todos os bairros da cidade de Matinhos.
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h5 className="font-medium text-[#173363] mb-2">Região</h5>
                      <p className="text-sm text-gray-600">
                        Atendemos também às áreas adjacentes, incluindo Caiobá e Praia de Leste.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-medium text-[#173363] mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-[#6EC747]" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Benefícios da Entrega Prioritária
                  </h4>
                  <div className="space-y-4 mt-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#6EC747]/10 flex items-center justify-center mr-4">
                        <svg className="w-5 h-5 text-[#6EC747]" viewBox="0 0 24 24" fill="none">
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
                        <h5 className="font-medium text-[#173363]">Entrega em Primeiro Horário</h5>
                        <p className="text-gray-600 text-sm mt-1">
                          Membros do programa de fidelidade recebem suas encomendas com prioridade
                          no primeiro horário do dia de entrega.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#6EC747]/10 flex items-center justify-center mr-4">
                        <svg className="w-5 h-5 text-[#6EC747]" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M20 12V8H4V12M20 12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V12M20 12H4M8 15H16"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 7V4M18 7V4M6 7V4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium text-[#173363]">Frete Grátis</h5>
                        <p className="text-gray-600 text-sm mt-1">
                          Além da prioridade, você não paga nada pelo frete, independentemente do
                          valor de sua compra.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#6EC747]/10 flex items-center justify-center mr-4">
                        <svg className="w-5 h-5 text-[#6EC747]" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M9 15L15 9M15.5 15.5C15.5 17.7 13.7 19.5 11.5 19.5C9.3 19.5 7.5 17.7 7.5 15.5C7.5 13.3 9.3 11.5 11.5 11.5M4.5 8.5C4.5 10.7 6.3 12.5 8.5 12.5C10.7 12.5 12.5 10.7 12.5 8.5C12.5 6.3 10.7 4.5 8.5 4.5C6.3 4.5 4.5 6.3 4.5 8.5Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium text-[#173363]">Embalagem Especial</h5>
                        <p className="text-gray-600 text-sm mt-1">
                          Seus produtos são cuidadosamente embalados com materiais sustentáveis e
                          identificação especial de cliente prioritário.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-gray-600 text-sm">Deseja ter acesso à entrega prioritária?</p>
                <div className="flex gap-3">
                  <button
                    onClick={handleCloseCoverageModal}
                    className="px-5 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Fechar
                  </button>
                  <button
                    onClick={() => {
                      handleCloseCoverageModal();
                      handleOpenModal();
                    }}
                    className="px-5 py-2 bg-gradient-to-r from-[#6EC747] to-[#173363] text-white rounded-lg hover:shadow-md transition-all"
                  >
                    Tornar-se membro premium
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Flexibilidade Financeira */}
      {financialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay com efeito de desfoque */}
          <div
            className="absolute inset-0 bg-[#173363]/30 backdrop-blur-sm"
            onClick={handleCloseFinancialModal}
          ></div>

          {/* Modal Container */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] relative z-10 animate-scale-in overflow-hidden flex flex-col">
            {/* Modal Header com gradiente elegante */}
            <div className="bg-gradient-to-r from-[#173363] to-[#6EC747] p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-light">
                  Flexibilidade <span className="font-semibold">Financeira</span>
                </h3>
                <button
                  onClick={handleCloseFinancialModal}
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body com scroll */}
            <div className="overflow-y-auto p-6 flex-grow">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-medium text-[#173363] mb-3 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-[#173363]" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.17999 10.16 8.48999 10.96 8.48999H12.84C13.76 8.48999 14.51 9.26999 14.51 10.24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 7.5V16.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 12C22 17.52 17.52 22 12 22C6.47715 22 2 17.52 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 3V7H21"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 2L17 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Programa de Boletos EcoClean
                  </h4>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    O programa de flexibilidade financeira da EcoClean foi desenvolvido
                    especialmente para empresas e condomínios que buscam maior controle sobre seu
                    fluxo de caixa, adaptando-se às suas necessidades específicas de pagamento.
                  </p>
                </div>

                <div className="bg-[#173363]/5 p-5 rounded-xl border border-[#173363]/10">
                  <h5 className="font-medium text-[#173363] mb-3">Como funciona</h5>
                  <p className="text-gray-600 mb-4">
                    Ao tornar-se membro do programa de fidelidade, sua empresa passa por uma
                    avaliação para inclusão no programa de boletos da EcoClean:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#173363]/10 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-[#173363] font-semibold">1</span>
                      </div>
                      <div>
                        <h6 className="font-medium text-[#173363]">Avaliação personalizada</h6>
                        <p className="text-gray-600 text-sm mt-1">
                          Nossa equipe financeira analisa o perfil da sua empresa e as necessidades
                          específicas do seu negócio.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#173363]/10 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-[#173363] font-semibold">2</span>
                      </div>
                      <div>
                        <h6 className="font-medium text-[#173363]">Definição de datas flexíveis</h6>
                        <p className="text-gray-600 text-sm mt-1">
                          Juntos, estabelecemos datas de vencimento que se adequem ao fluxo de caixa
                          do seu negócio, alinhando com seus melhores dias para pagamento.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#173363]/10 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-[#173363] font-semibold">3</span>
                      </div>
                      <div>
                        <h6 className="font-medium text-[#173363]">Emissão automática</h6>
                        <p className="text-gray-600 text-sm mt-1">
                          Boletos emitidos automaticamente com as condições acordadas, sem
                          necessidade de solicitações a cada compra.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="w-12 h-12 bg-[#6EC747]/10 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-[#6EC747]" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 18 20H6C4.89543 20 4 19.1046 4 18V12M20 12H4M8 15H16"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 7V4M18 7V4M6 7V4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h5 className="font-medium text-[#173363] mb-2">Datas ajustáveis</h5>
                    <p className="text-sm text-gray-600">
                      Escolha as melhores datas para pagamento de acordo com o fluxo de caixa e
                      receitas da sua empresa.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="w-12 h-12 bg-[#6EC747]/10 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-[#6EC747]" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M9 12H15M9 16H15M9 8H15M5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h5 className="font-medium text-[#173363] mb-2">Sem juros adicionais</h5>
                    <p className="text-sm text-gray-600">
                      Acesso a condições especiais de parcelamento sem acréscimo de juros para
                      membros do programa.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h5 className="font-medium text-[#173363] mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#6EC747]" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 16V10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.997 7H12.004"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Importante saber
                  </h5>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-[#6EC747] mr-2 mt-0.5 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M8.5 12.5L10.5 14.5L15.5 9.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      O programa é exclusivo para pessoas jurídicas, condomínios e estabelecimentos
                      comerciais.
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-[#6EC747] mr-2 mt-0.5 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M8.5 12.5L10.5 14.5L15.5 9.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      A aprovação depende de análise financeira prévia.
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-4 h-4 text-[#6EC747] mr-2 mt-0.5 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M8.5 12.5L10.5 14.5L15.5 9.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      As condições exatas são personalizadas conforme o perfil da empresa e
                      histórico de relacionamento.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-gray-600 text-sm">
                  Interesse em condições especiais de pagamento?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleCloseFinancialModal}
                    className="px-5 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Fechar
                  </button>
                  <button
                    onClick={() => {
                      handleCloseFinancialModal();
                      handleOpenModal();
                    }}
                    className="px-5 py-2 bg-gradient-to-r from-[#173363] to-[#6EC747] text-white rounded-lg hover:shadow-md transition-all"
                  >
                    Solicitar avaliação
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Fidelidade;

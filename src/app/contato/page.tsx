'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from 'react-icons/fa';

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  });

  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState('');
  const [statusEnvio, setStatusEnvio] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setErro('');
    setStatusEnvio('loading');

    try {
      // Montar o objeto de mensagem conforme especificado
      const mensagemFormatada = `
Olá, sou ${formData.nome}.
Meu email: ${formData.email}
Meu telefone: ${formData.telefone}
E quero abordar o assunto: ${formData.assunto}

Mensagem: ${formData.mensagem}
`;

      const dadosEnvio = {
        contato: '41995762570', // Número fixo para onde enviar a mensagem
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
        setStatusEnvio('success');

        // Limpar formulário
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          assunto: '',
          mensagem: '',
        });
      } else {
        // Erro
        setStatusEnvio('error');
        setErro(
          'Não foi possível enviar sua mensagem. Nossa equipe técnica já está ciente e trabalhando para resolver o problema.'
        );
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setStatusEnvio('error');
      setErro('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
    } finally {
      setEnviando(false);
    }
  };

  // Função para renderizar o conteúdo baseado no status de envio
  const renderFormContent = () => {
    switch (statusEnvio) {
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-[#173363]/20 border-t-[#173363] rounded-full animate-spin mb-6"></div>
            <h3 className="text-lg font-medium text-[#173363] mb-2">Enviando sua mensagem...</h3>
            <p className="text-gray-500">
              Por favor, aguarde enquanto processamos sua solicitação.
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-8 animate-fade-in">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium">Mensagem enviada com sucesso!</h3>
            </div>
            <p className="text-lg mb-4">Agradecemos por entrar em contato conosco.</p>
            <p className="mb-6">
              Nossa equipe analisará sua mensagem e responderá em breve referente ao assunto
              abordado.
            </p>
            <button
              onClick={() => setStatusEnvio('idle')}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 focus:outline-none"
            >
              Enviar nova mensagem
            </button>
          </div>
        );

      case 'error':
        return (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-8 animate-fade-in">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium">Erro ao enviar mensagem</h3>
            </div>
            <p className="text-lg mb-4">Houve um problema ao processar sua solicitação.</p>
            <p className="mb-6">
              {erro ||
                'Estamos cientes do problema e trabalhando para corrigi-lo o mais rápido possível.'}
            </p>
            <button
              onClick={() => setStatusEnvio('idle')}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 focus:outline-none"
            >
              Tentar novamente
            </button>
          </div>
        );

      default: // 'idle'
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6EC747] focus:border-[#6EC747] outline-none transition-all duration-300"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6EC747] focus:border-[#6EC747] outline-none transition-all duration-300"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone / WhatsApp
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6EC747] focus:border-[#6EC747] outline-none transition-all duration-300"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-1">
                  Assunto
                </label>
                <select
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6EC747] focus:border-[#6EC747] outline-none transition-all duration-300"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="Dúvidas sobre produtos">Dúvidas sobre produtos</option>
                  <option value="Pedido de orçamento">Pedido de orçamento</option>
                  <option value="Suporte técnico">Suporte técnico</option>
                  <option value="Reclamação">Reclamação</option>
                  <option value="Programa de fidelidade">Programa de fidelidade</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-1">
                Mensagem
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6EC747] focus:border-[#6EC747] outline-none transition-all duration-300"
                placeholder="Digite sua mensagem..."
              ></textarea>
            </div>

            {erro && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{erro}</div>}

            <button
              type="submit"
              disabled={enviando}
              className="w-full bg-[#173363] hover:bg-[#0f2042] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
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
                  Enviando...
                </>
              ) : (
                'Enviar Mensagem'
              )}
            </button>
          </form>
        );
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section
        className="relative py-28 bg-cover bg-center"
        style={{
          backgroundPosition: '50% 50%',
          backgroundImage:
            'linear-gradient(to bottom, rgba(23, 51, 99, 0.7), rgba(110, 199, 71, 0.4)), url("/fundobgloja.webp")',
        }}
      >
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-6 text-white drop-shadow-lg animate-fade-in">
            <span className="font-normal">Entre em</span> Contato
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md mb-8 max-w-2xl mx-auto">
            Estamos prontos para atender e responder todas as suas dúvidas sobre nossos produtos e
            serviços
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-[#173363] to-[#6EC747] mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Informações de Contato e Formulário */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Coluna de Informações */}
            <div className="bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-500 hover:shadow-xl">
              <h2 className="text-3xl font-light mb-8">
                <span className="text-[#173363]">Nossas</span>{' '}
                <span className="text-[#6EC747] font-normal">Informações</span>
              </h2>

              <div className="space-y-8">
                {/* Endereço */}
                <div className="flex items-start">
                  <div className="bg-[#173363] p-3 rounded-full text-white mr-4">
                    <FaMapMarkerAlt className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#173363] mb-1">Endereço</h3>
                    <p className="text-gray-600">
                      Av. Juscelino Kubitscheck de Oliveira, 3220
                      <br />
                      Matinhos - PR, CEP 83260-000
                    </p>
                  </div>
                </div>

                {/* Telefone */}
                <div className="flex items-start">
                  <div className="bg-[#173363] p-3 rounded-full text-white mr-4">
                    <FaPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#173363] mb-1">Telefone</h3>
                    <p className="text-gray-600">
                      (41) 99794-3219
                      <br />
                      (41) 98728-0741
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="bg-[#173363] p-3 rounded-full text-white mr-4">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#173363] mb-1">Email</h3>
                    <p className="text-gray-600">
                      ecocleanmatinhos@gmail.com
                      <br />
                      renato.devmaximiano@gmail.com
                    </p>
                  </div>
                </div>

                {/* Horário de Funcionamento */}
                <div className="flex items-start">
                  <div className="bg-[#173363] p-3 rounded-full text-white mr-4">
                    <FaClock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#173363] mb-1">
                      Horário de Atendimento
                    </h3>
                    <p className="text-gray-600">
                      Segunda - Sexta: 8:30h às 18h
                      <br />
                      Sábado: 8:30h às 12h
                      <br />
                      Domingo: Fechado
                    </p>
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="mt-12">
                <h3 className="text-lg font-semibold text-[#173363] mb-4">Nossas Redes Sociais</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/ecocleanmatinhos/ "
                    className="bg-[#173363] hover:bg-[#6EC747] text-white p-3 rounded-full transition-colors duration-300"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.facebook.com/EcoCleanmatinhos/?locale=pt_BR"
                    className="bg-[#173363] hover:bg-[#6EC747] text-white p-3 rounded-full transition-colors duration-300"
                  >
                    <FaFacebookF className="w-5 h-5" />
                  </a>
                  <a
                    href="https://wa.me/5541997943219"
                    className="bg-[#173363] hover:bg-[#6EC747] text-white p-3 rounded-full transition-colors duration-300"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Formulário de Contato */}
            <div className="bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-500 hover:shadow-xl">
              <h2 className="text-3xl font-light mb-8">
                <span className="text-[#173363]">Envie sua</span>{' '}
                <span className="text-[#6EC747] font-normal">Mensagem</span>
              </h2>

              {renderFormContent()}
            </div>
          </div>
        </div>
      </section>

      {/* Mapa e Localização */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4">
              <span className="text-[#173363]">Nossa</span>{' '}
              <span className="text-[#6EC747] font-normal">Localização</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visite nossa loja física e conheça toda linha de produtos para limpeza e higienização
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-[#173363] to-[#6EC747] mx-auto rounded-full mt-6"></div>
          </div>

          <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <div className="relative h-[400px] w-full">
              <div className="absolute inset-0 bg-gray-200 animate-pulse">
                {/* Placeholder para o mapa */}
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.6559380121783!2d-48.543375225471654!3d-25.82301917002427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQ5JzIyLjkiUyA0OMKwMzInMjYuMSJX!5e0!3m2!1spt-BR!2sbr!4v1624646293979!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 z-10"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light mb-4">
              <span className="text-[#173363]">Perguntas</span>{' '}
              <span className="text-[#6EC747] font-normal">Frequentes</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Respostas para as dúvidas mais comuns sobre nossos produtos e serviços
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-[#173363] to-[#6EC747] mx-auto rounded-full mt-6"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#173363] mb-2">
                    Quais são os métodos de pagamento aceitos?
                  </h3>
                  <p className="text-gray-600">
                    Aceitamos diversas formas de pagamento: cartões de crédito e débito das
                    principais bandeiras, Pix, transferência bancária e dinheiro para compras na
                    loja física.
                  </p>
                </div>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#173363] mb-2">
                    Qual o prazo de entrega dos produtos?
                  </h3>
                  <p className="text-gray-600">
                    O prazo de entrega varia de acordo com a sua localização. Para a região de
                    Matinhos fazemos entregas no mesmo dia, em casos excepcionáis, pode ser um dia
                    de realinhamento da entrega. Para as demais regiões entregas agendadas.
                  </p>
                </div>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#173363] mb-2">
                    Como funciona o programa de fidelidade?
                  </h3>
                  <p className="text-gray-600">
                    Nosso programa de fidelidade EcoClean premia clientes frequentes. A cada compra,
                    você acumula pontos que podem ser trocados por descontos ou produtos.
                    Cadastre-se em nossa loja ou pelo site para participar.
                  </p>
                </div>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#173363] mb-2">
                    Vocês oferecem produtos para limpeza industrial?
                  </h3>
                  <p className="text-gray-600">
                    Sim, temos uma linha completa de produtos para limpeza industrial e comercial.
                    Para orçamentos personalizados e grandes quantidades, entre em contato direto
                    com nossa equipe de vendas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#173363] to-[#1A3C7A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl text-white font-light mb-6">
            Pronto para transformar sua experiência de limpeza?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Escolha produtos de qualidade que respeitam o meio ambiente e garantem resultados
            superiores
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/produtos"
              className="transition-all duration-300 px-8 py-3 bg-white hover:bg-[#6EC747] text-[#173363] hover:text-white text-lg font-medium rounded-full 
                       hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1 border-2 border-white"
            >
              Ver Produtos
            </a>
            <a
              href="tel:+551144444444"
              className="transition-all duration-300 px-8 py-3 bg-transparent hover:bg-white/10 text-white text-lg font-medium rounded-full 
                       hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1 border-2 border-white"
            >
              Ligar Agora
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

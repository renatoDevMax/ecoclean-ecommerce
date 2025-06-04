'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SobrePage() {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({
    header: false,
    mission: false,
    history: false,
    values: false,
    team: false,
  });

  const refs = {
    header: useRef<HTMLDivElement>(null),
    mission: useRef<HTMLDivElement>(null),
    history: useRef<HTMLDivElement>(null),
    values: useRef<HTMLDivElement>(null),
    team: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.target.id && entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.entries(refs).forEach(([key, ref]) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div
          ref={refs.header}
          id="header"
          className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ${
            isVisible.header ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#173363] leading-tight mb-6">
              Nossa <span className="font-medium text-[#6EC747]">História</span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#173363] to-[#6EC747] mx-auto mb-8 rounded-full"></div>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10">
              Conheça a trajetória da EcoClean, uma empresa fundada com amor e dedicação, que
              transformou o conceito de produtos de limpeza em sua comunidade.
            </p>
          </div>
        </div>

        {/* Efeito de ondas decorativas */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-0 opacity-10">
          <div className="w-full h-40 md:h-60 bg-[#6EC747]/20">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="fill-[#173363]/20"
              ></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="py-16 md:py-24">
        <div
          ref={refs.mission}
          id="mission"
          className={`container mx-auto px-4 max-w-6xl transition-all duration-1000 ${
            isVisible.mission ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-medium text-[#173363] mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-[#6EC747]/20 flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-[#6EC747]"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M14 9L9.8 14L8 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  Nossa Missão
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Nossa missão é levar a solução de higiene, limpeza e organização até você, com
                  praticidade e eficiência! Prezamos pela excelência no atendimento e a satisfação
                  dos nossos clientes.
                </p>
                <div className="w-16 h-0.5 bg-[#6EC747] mb-6"></div>
                <h2 className="text-3xl font-medium text-[#173363] mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-[#6EC747]/20 flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-[#6EC747]"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 16.01L12.01 15.9989"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 9H16C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>
                  Nossa Visão
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Ser reconhecida como referência em produtos de limpeza que combinam qualidade,
                  eficiência e preço justo, construindo relacionamentos duradouros com nossos
                  clientes e contribuindo para um ambiente mais limpo e saudável.
                </p>
              </div>
              <div className="relative min-h-[300px] md:min-h-full">
                <Image
                  src="/fotoFamilia.jpg"
                  fill
                  alt="Prateleira com produtos de limpeza organizados"
                  className="object-cover"
                  style={{ objectPosition: '50% 0%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#173363]/40 to-[#6EC747]/40 mix-blend-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-40 bg-white"
          style={{ clipPath: 'ellipse(70% 100% at 50% 0%)' }}
        ></div>

        <div
          ref={refs.history}
          id="history"
          className={`container mx-auto px-4 max-w-4xl relative z-10 transition-all duration-1000 ${
            isVisible.history ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-[#173363] mb-6">
              Uma história de <span className="font-medium text-[#6EC747]">dedicação</span> e{' '}
              <span className="font-medium text-[#6EC747]">amor</span>
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-[#173363] to-[#6EC747] mx-auto"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 relative mb-10">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-[#173363] text-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-light">2016</span>
            </div>

            <div className="pt-8 text-gray-600 leading-relaxed space-y-6">
              <p>
                A EcoClean nasceu do sonho de duas irmãs, Maiara e Cinara, que há 8 anos decidiram
                transformar sua paixão por soluções eficientes e acessíveis em um negócio que
                pudesse realmente fazer a diferença na vida das pessoas.
              </p>

              <p>
                Em um pequeno espaço alugado, com apenas algumas prateleiras e um punhado de
                produtos cuidadosamente selecionados, as irmãs deram o primeiro passo no que viria a
                se tornar uma das lojas de produtos de limpeza mais queridas da região.
              </p>

              <p>
                &quot;Desde o início, nosso foco nunca foi apenas vender produtos, mas entender as
                necessidades reais de cada cliente que entrava em nossa loja&quot;, conta Maiara,
                com o brilho nos olhos de quem vê um sonho se realizar.
              </p>

              <p>
                Cinara complementa: &quot;Acreditamos que cada casa tem suas próprias necessidades,
                e nos dedicamos a oferecer não apenas produtos, mas soluções personalizadas que
                realmente facilitam o dia a dia das pessoas.&quot;
              </p>

              <div className="py-6">
                <div className="flex justify-center">
                  <div className="relative w-full max-w-2xl h-[300px] rounded-xl overflow-hidden">
                    <Image src="lojabg.jpg" fill alt="Loja EcoClean" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#173363]/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="italic text-sm">
                        Nossa primeira loja, um pequeno espaço cheio de grandes sonhos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Com o passar dos anos, o que começou como uma pequena loja se transformou em um
                negócio sólido, baseado em valores como atendimento personalizado, preços justos e
                produtos de qualidade.
              </p>

              <p>
                Hoje, oito anos depois, a EcoClean se orgulha de ter construído muito mais do que
                uma clientela fiel – construímos uma verdadeira comunidade que confia em nossas
                recomendações e valoriza nossa dedicação em oferecer sempre o melhor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -rotate-90 transform translate-y-40 translate-x-40 opacity-5">
          <svg
            width="600"
            height="600"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="300" cy="300" r="300" fill="#6EC747" />
          </svg>
        </div>

        <div
          ref={refs.values}
          id="values"
          className={`container mx-auto px-4 max-w-6xl relative z-10 transition-all duration-1000 ${
            isVisible.values ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-[#173363] mb-6">
              Nossos <span className="font-medium text-[#6EC747]">Valores</span>
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-[#173363] to-[#6EC747] mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Os pilares que sustentam nossa jornada e orientam todas as nossas decisões
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Valor 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#6EC747]/5 rounded-full -translate-x-20 -translate-y-20 group-hover:scale-150 transition-all duration-700"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#173363]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#173363]/20 transition-all duration-300">
                  <svg
                    className="w-8 h-8 text-[#173363]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 21H15M9 21H7C4.79086 21 3 19.2091 3 17V10C3 8.89543 3.89543 8 5 8H19C20.1046 8 21 8.89543 21 10V17C21 19.2091 19.2091 21 17 21H15M9 21V17C9 15.8954 9.89543 15 11 15H13C14.1046 15 15 15.8954 15 17V21M13 8V6C13 3.79086 11.2091 2 9 2H8.5C8.22386 2 8 2.22386 8 2.5V3.5C8 3.77614 8.22386 4 8.5 4H9C10.1046 4 11 4.89543 11 6V8H13Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-medium text-[#173363] mb-4">
                  Compromisso com o Cliente
                </h3>

                <p className="text-gray-600 mb-4">
                  Entendemos que cada cliente é único, com necessidades específicas. Nosso
                  compromisso é ouvir, entender e oferecer as melhores soluções, construindo uma
                  relação de confiança que vai além da simples venda.
                </p>

                <div className="w-12 h-0.5 bg-[#6EC747] group-hover:w-20 transition-all duration-300"></div>
              </div>
            </div>

            {/* Valor 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#6EC747]/5 rounded-full -translate-x-20 -translate-y-20 group-hover:scale-150 transition-all duration-700"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#173363]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#173363]/20 transition-all duration-300">
                  <svg
                    className="w-8 h-8 text-[#173363]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 9C2 7.89543 2.89543 7 4 7H20C21.1046 7 22 7.89543 22 9V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V9Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 12C12 11.4477 12.4477 11 13 11H17C17.5523 11 18 11.4477 18 12V16C18 16.5523 17.5523 17 17 17H13C12.4477 17 12 16.5523 12 16V12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6 11H9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 14H9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 17H9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-medium text-[#173363] mb-4">Preço Justo</h3>

                <p className="text-gray-600 mb-4">
                  Acreditamos que produtos de qualidade não precisam ser inacessíveis. Trabalhamos
                  incansavelmente para oferecer o melhor custo-benefício, garantindo que nossos
                  clientes recebam valor real em cada compra.
                </p>

                <div className="w-12 h-0.5 bg-[#6EC747] group-hover:w-20 transition-all duration-300"></div>
              </div>
            </div>

            {/* Valor 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#6EC747]/5 rounded-full -translate-x-20 -translate-y-20 group-hover:scale-150 transition-all duration-700"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#173363]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#173363]/20 transition-all duration-300">
                  <svg
                    className="w-8 h-8 text-[#173363]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 16V8M12 8L15.5 11.5M12 8L8.5 11.5"
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
                </div>

                <h3 className="text-2xl font-medium text-[#173363] mb-4">Soluções Ágeis</h3>

                <p className="text-gray-600 mb-4">
                  Valorizamos o tempo dos nossos clientes. Por isso, desenvolvemos um sistema
                  eficiente que permite encontrar rapidamente o produto ideal para cada necessidade,
                  tornando a experiência de compra simples e satisfatória.
                </p>

                <div className="w-12 h-0.5 bg-[#6EC747] group-hover:w-20 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Time - Fundadoras */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div
          ref={refs.team}
          id="team"
          className={`container mx-auto px-4 max-w-6xl transition-all duration-1000 ${
            isVisible.team ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-[#173363] mb-6">
              Nossas <span className="font-medium text-[#6EC747]">Fundadoras</span>
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-[#173363] to-[#6EC747] mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conheça as irmãs que transformaram um sonho em realidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Fundadora 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="relative h-80">
                <Image
                  src="/maiara.jpg"
                  fill
                  alt="Maiara - Fundadora da EcoClean"
                  style={{ objectPosition: '50% 0%' }}
                  className="object-cover object-top group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#173363]/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-medium">Maiara</h3>
                  <p className="text-white/80">Co-Fundadora</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed">
                  &quot;Quando iniciamos a EcoClean, nosso maior desafio era mostrar que produtos de
                  limpeza podem ser eficientes, acessíveis e ainda trazer algo especial para o dia a
                  dia das pessoas. Ver como nossa visão se transformou em uma comunidade de clientes
                  fiéis é a maior recompensa que poderíamos ter.&quot;
                </p>
                <div className="w-12 h-0.5 bg-[#6EC747] mt-6 group-hover:w-20 transition-all duration-300"></div>
              </div>
            </div>

            {/* Fundadora 2 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="relative h-80">
                <Image
                  src="/cinara.jpg"
                  fill
                  alt="Cinara - Fundadora da EcoClean"
                  className="object-cover object-top group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#173363]/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-medium">Cinara</h3>
                  <p className="text-white/80">Co-Fundadora</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed">
                  &quot;O segredo do nosso sucesso está na escuta ativa. Conhecer cada cliente pelo
                  nome, entender suas necessidades específicas e oferecer soluções personalizadas.
                  Não vendemos apenas produtos de limpeza, oferecemos tempo de qualidade para que as
                  pessoas possam se dedicar ao que realmente importa em suas vidas.&quot;
                </p>
                <div className="w-12 h-0.5 bg-[#6EC747] mt-6 group-hover:w-20 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="bg-gradient-to-br from-[#173363] to-[#173363]/90 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Faça parte da nossa <span className="font-medium text-[#6EC747]">história</span>
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
              Junte-se a milhares de clientes satisfeitos que descobriram uma nova maneira de cuidar
              dos seus lares com produtos de qualidade, preço justo e um atendimento que faz toda a
              diferença.
            </p>
            <a
              href="/produtos"
              className="inline-block bg-white text-[#173363] hover:bg-[#6EC747] hover:text-white px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Conheça Nossos Produtos
            </a>

            <div className="mt-10 flex flex-wrap justify-center gap-4 items-center">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-[#6EC747] rounded-full mr-2"></span>
                <span className="text-white/80">Atendimento Personalizado</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-[#6EC747] rounded-full mr-2"></span>
                <span className="text-white/80">Produtos Selecionados</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-[#6EC747] rounded-full mr-2"></span>
                <span className="text-white/80">Preços Justos</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-[#6EC747] rounded-full mr-2"></span>
                <span className="text-white/80">8 Anos de Experiência</span>
              </div>
            </div>
          </div>
        </div>

        {/* Efeito de círculos decorativos */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#6EC747]/5 rounded-full -translate-x-1/2 -translate-y-1/2 z-0"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#173363]/5 rounded-full translate-x-1/3 translate-y-1/3 z-0"></div>
      </section>

      <Footer />
    </main>
  );
}

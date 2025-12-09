'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const redesSociais = [
    {
      nome: 'Instagram',
      url: 'https://www.instagram.com/ecocleanmatinhos/',
      icone: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      nome: 'Facebook',
      url: 'https://www.facebook.com/EcoCleanmatinhos/?locale=pt_BR',
      icone: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
    },
    {
      nome: 'TikTok',
      url: 'https://www.tiktok.com/@ecocleanmatinhos',
      icone: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
    },
    {
      nome: 'WhatsApp',
      url: 'https://wa.me/5541997943219',
      icone: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
    },
  ];

  const cartoes = [
    {
      nome: 'Visa',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png',
    },
    {
      nome: 'Mastercard',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/800px-Mastercard-logo.svg.png',
    },
    {
      nome: 'American Express',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/800px-American_Express_logo_%282018%29.svg.png',
    },
    {
      nome: 'Elo',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Elo_logo.svg/800px-Elo_logo.svg.png',
    },
    {
      nome: 'Hipercard',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Hipercard_logo.svg/800px-Hipercard_logo.svg.png',
    },
    {
      nome: 'PIX',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Pix_logo.svg/800px-Pix_logo.svg.png',
    },
  ];

  return (
    <footer className="bg-[#173363] text-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute -top-80 -right-80 w-[30rem] h-[30rem] rounded-full bg-[#6EC747]/5 blur-[100px]"></div>
      <div className="absolute -bottom-60 -left-20 w-60 h-60 rounded-full bg-[#6EC747]/5 blur-[80px]"></div>

      {/* Padrão de pontos */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      ></div>

      <div className="container mx-auto px-4 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Coluna 1: Logo e informações da empresa */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center space-x-3 group mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden transform transition duration-300 group-hover:scale-110 group-hover:shadow-lg border border-white/20">
                <Image
                  src="/logo.jpg"
                  alt="EcoClean Logo"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold transition-all duration-300">
                  <span className="text-white">Eco</span>
                  <span className="text-[#6EC747]">Clean</span>
                </span>
                <span className="text-xs text-white/70 italic">Soluções para o seu dia a dia.</span>
              </div>
            </div>

            <p className="text-white/80 text-sm leading-relaxed">
              Trabalhamos para oferecer produtos de limpeza eco-friendly com alta eficiência e
              preços acessíveis, respeitando o meio ambiente e cuidando do seu lar.
            </p>

            <div className="flex space-x-3 pt-2">
              {redesSociais.map((rede, index) => (
                <a
                  key={index}
                  href={rede.url}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-[#6EC747] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                  aria-label={rede.nome}
                >
                  {rede.icone}
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 2: Contatos e Endereço */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-lg font-medium relative mb-6 pb-2">
              Contatos
              <span className="absolute -bottom-0 left-0 w-12 h-0.5 bg-[#6EC747]"></span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-[#6EC747] mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <p className="text-white/80 text-sm">
                    Av. Juscelino Kubitscheck de Oliveira, 3220
                    <br />
                    Matinhos - PR, CEP 83260-000
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-[#6EC747] mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div>
                  <p className="text-white/80 text-sm">
                    (41) 99794-3219
                    <br />
                    (41) 98728-0741
                    <br />
                    (41) 99988-0508
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-[#6EC747] mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="text-white/80 text-sm">
                    ecocleanmatinhos@gmail.com
                    <br />
                    renato.devmaximiano@gmail.com (Suporte)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 3: Links Rápidos */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-medium relative mb-6 pb-2">
              Links Rápidos
              <span className="absolute -bottom-0 left-0 w-12 h-0.5 bg-[#6EC747]"></span>
            </h3>

            <ul className="space-y-2">
              {['Home', 'Produtos', 'Sobre', 'Fidelidade', 'Contato', 'WhatsApp'].map(
                (item, index) => (
                  <li key={index}>
                    {item === 'WhatsApp' ? (
                      <a
                        href="https://wa.me/5541997943219"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-[#6EC747] transition-colors duration-300 text-sm flex items-center"
                      >
                        <svg
                          className="w-3 h-3 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        {item}
                      </a>
                    ) : item === 'Fidelidade' ? (
                      <Link
                        href="/#fidelidade"
                        className="text-white/70 hover:text-[#6EC747] transition-colors duration-300 text-sm flex items-center"
                        onClick={e => {
                          // Se estiver na página principal
                          if (window.location.pathname === '/' || window.location.pathname === '') {
                            e.preventDefault();
                            // Encontrar o componente Fidelidade e rolar até ele
                            const fidelidadeSection = document.getElementById('fidelidade');
                            if (fidelidadeSection) {
                              fidelidadeSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }
                        }}
                      >
                        <svg
                          className="w-3 h-3 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        {item}
                      </Link>
                    ) : (
                      <Link
                        href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                        className="text-white/70 hover:text-[#6EC747] transition-colors duration-300 text-sm flex items-center"
                      >
                        <svg
                          className="w-3 h-3 mr-2"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        {item}
                      </Link>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Coluna 4: Newsletter e Pagamentos */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <h3 className="text-lg font-medium relative mb-6 pb-2">
                Newsletter
                <span className="absolute -bottom-0 left-0 w-12 h-0.5 bg-[#6EC747]"></span>
              </h3>

              <p className="text-white/70 text-sm mb-4">
                Assine nossa newsletter e receba novidades e promoções exclusivas.
              </p>

              <div className="flex space-x-0 rounded-full overflow-hidden border border-white/20">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="bg-white/5 text-white placeholder-white/50 px-4 py-2 text-sm flex-grow focus:outline-none"
                />
                <button className="bg-[#6EC747] text-white px-4 text-sm font-medium transition-colors hover:bg-[#5BB636]">
                  Assinar
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium relative mb-6 pb-2">
                Pagamentos
                <span className="absolute -bottom-0 left-0 w-12 h-0.5 bg-[#6EC747]"></span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {cartoes.map((cartao, index) => (
                  <div
                    key={index}
                    className="bg-white/10 rounded-md p-1.5 w-12 h-8 flex items-center justify-center hover:bg-white/20 transition-colors"
                    title={cartao.nome}
                  >
                    <div className="w-full h-full relative bg-white/90 rounded-sm overflow-hidden">
                      <Image
                        src={cartao.url}
                        alt={cartao.nome}
                        width={40}
                        height={25}
                        className="object-contain p-0.5"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="w-full h-px bg-white/10 my-8"></div>

        {/* Copyright e links de política */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} EcoClean. Todos os direitos reservados.
          </div>

          <div className="flex flex-wrap justify-center space-x-4">
            <Link href="/termos" className="hover:text-[#6EC747] transition-colors text-xs">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="hover:text-[#6EC747] transition-colors text-xs">
              Política de Privacidade
            </Link>
            <Link href="/cookies" className="hover:text-[#6EC747] transition-colors text-xs">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

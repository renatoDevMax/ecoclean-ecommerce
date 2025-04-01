'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const redesSociais = [
    { nome: 'Instagram', url: '#', icone: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )},
    { nome: 'Facebook', url: '#', icone: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
      </svg>
    )},
    { nome: 'Twitter', url: '#', icone: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
      </svg>
    )},
    { nome: 'LinkedIn', url: '#', icone: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
      </svg>
    )},
    { nome: 'YouTube', url: '#', icone: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
      </svg>
    )}
  ];

  const cartoes = [
    { nome: 'Visa', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png' },
    { nome: 'Mastercard', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/800px-Mastercard-logo.svg.png' },
    { nome: 'American Express', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/800px-American_Express_logo_%282018%29.svg.png' },
    { nome: 'Elo', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Elo_logo.svg/800px-Elo_logo.svg.png' },
    { nome: 'Hipercard', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Hipercard_logo.svg/800px-Hipercard_logo.svg.png' },
    { nome: 'PIX', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Pix_logo.svg/800px-Pix_logo.svg.png' }
  ];

  return (
    <footer className="bg-[#173363] text-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute -top-80 -right-80 w-[30rem] h-[30rem] rounded-full bg-[#6EC747]/5 blur-[100px]"></div>
      <div className="absolute -bottom-60 -left-20 w-60 h-60 rounded-full bg-[#6EC747]/5 blur-[80px]"></div>
      
      {/* Padrão de pontos */}
      <div className="absolute inset-0 opacity-5" 
           style={{
             backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)',
             backgroundSize: '30px 30px'
           }}>
      </div>
      
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
              Trabalhamos para oferecer produtos de limpeza eco-friendly com alta eficiência e preços acessíveis, respeitando o meio ambiente e cuidando do seu lar.
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
                <svg className="w-5 h-5 text-[#6EC747] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-white/80 text-sm">
                    Av. Paulista, 1578, Bela Vista<br />
                    São Paulo - SP, CEP 01310-200
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#6EC747] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-white/80 text-sm">
                    (11) 3456-7890<br />
                    (11) 98765-4321
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#6EC747] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-white/80 text-sm">
                    contato@ecoclean.com.br<br />
                    suporte@ecoclean.com.br
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
              {['Home', 'Produtos', 'Sobre Nós', 'Fidelidade', 'Contato', 'Blog'].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-white/70 hover:text-[#6EC747] transition-colors duration-300 text-sm flex items-center"
                  >
                    <svg className="w-3 h-3 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    {item}
                  </Link>
                </li>
              ))}
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
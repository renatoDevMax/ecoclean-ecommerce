'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out
        ${scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'}`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo e Nome da Empresa */}
        <div className="flex items-center space-x-3 group">
          <div className="w-12 h-12 rounded-full overflow-hidden transform transition duration-300 group-hover:scale-110 group-hover:shadow-lg border border-[#173363]/20">
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
              <span className="text-white drop-shadow-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                Eco
              </span>
              <span className="text-[#6EC747] drop-shadow-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                Clean
              </span>
            </span>
            <span className="text-xs text-[#173363] italic">Soluções para o seu dia a dia.</span>
          </div>
        </div>

        {/* Navegação Desktop */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {['Home', 'Sobre', 'Produtos', 'Contato'].map((item) => (
              <li key={item}>
                <Link 
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="relative text-[#173363] hover:text-[#6EC747] transition-colors duration-300 group py-2 px-1"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#173363] to-[#6EC747] 
                                 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Menu Mobile Botão */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="text-[#173363] focus:outline-none transition-transform duration-300 ease-in-out"
            aria-label="Menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center relative">
              <span className={`w-6 h-0.5 bg-[#173363] rounded-full transition-all duration-300 
                ${mobileMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
              <span className={`w-6 h-0.5 bg-[#173363] rounded-full transition-all duration-300 
                ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`w-6 h-0.5 bg-[#173363] rounded-full transition-all duration-300 
                ${mobileMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}></span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Menu Mobile Dropdown */}
      <div 
        className={`md:hidden absolute w-full bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out 
          ${mobileMenuOpen ? 'max-h-60 py-4 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'}`}
      >
        <nav className="container mx-auto px-4">
          <ul className="flex flex-col space-y-4">
            {['Home', 'Sobre', 'Produtos', 'Contato'].map((item, index) => (
              <li 
                key={item} 
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
                  transition: 'opacity 300ms ease, transform 300ms ease',
                  transitionDelay: mobileMenuOpen ? `${index * 100}ms` : '0ms'
                }}
              >
                <Link 
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="block text-[#173363] hover:text-[#6EC747] transition-colors duration-300 border-b border-[#173363]/10 pb-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
} 
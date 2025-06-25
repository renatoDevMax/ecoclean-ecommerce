'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CartButton from './CartButton';
import UserProfileModal from './UserProfileModal';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  // Verificar se o usuário tem acesso ao EcoClean Piscinas
  const hasPoolAccess =
    isAuthenticated &&
    user &&
    user.beneficios &&
    user.beneficios.includes('Acesso ao EcoClean Descomplica Piscinas');

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

  // Função para fazer logout
  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
  };

  // Função para abrir o modal de perfil
  const handleOpenProfileModal = () => {
    setProfileMenuOpen(false);
    setShowProfileModal(true);
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out
        ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo e Nome da Empresa */}
          <Link href="/" className="flex items-center space-x-3 group">
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
                <span
                  className={`${scrolled ? 'text-[#173363]' : 'text-white'} drop-shadow-sm transition-colors duration-300`}
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
                >
                  Eco
                </span>
                <span
                  className="text-[#6EC747] drop-shadow-sm"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                >
                  Clean
                </span>
              </span>
              <span className="text-xs text-[#173363] italic">Soluções para o seu dia a dia.</span>
            </div>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {['Home', 'Sobre', 'Produtos', 'Contato'].map(item => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="relative text-[#173363] hover:text-[#6EC747] transition-colors duration-300 group py-2 px-1"
                  >
                    {item}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#173363] to-[#6EC747] 
                                 transition-all duration-300 group-hover:w-full"
                    ></span>
                  </Link>
                </li>
              ))}

              {/* Botão Lica Responde */}
              <li>
                <a
                  href="https://responde-lica.vercel.app/"
                  className="relative inline-flex items-center py-1.5 px-4 overflow-hidden rounded-full bg-gradient-to-r from-[#173363]/10 to-[#6EC747]/10 hover:from-[#173363] hover:to-[#6EC747] group/lica transition-all duration-500"
                >
                  <span className="relative z-10 text-[#173363] group-hover/lica:text-white transition-colors duration-300 text-sm font-medium flex items-center">
                    <svg
                      className="w-4 h-4 mr-1.5 text-[#6EC747] group-hover/lica:text-white transition-colors duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
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
                    Lica Responde
                  </span>
                </a>
              </li>

              {/* Botão EcoClean Piscinas - Só aparece se o usuário tiver o benefício específico */}
              {hasPoolAccess && (
                <li>
                  <a
                    href="https://ecoclean-piscina.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center py-1.5 px-4 overflow-hidden rounded-full bg-gradient-to-r from-[#173363]/10 to-[#6EC747]/10 hover:from-[#173363] hover:to-[#6EC747] group/piscinas transition-all duration-500"
                  >
                    <span className="relative z-10 text-[#173363] group-hover/piscinas:text-white transition-colors duration-300 text-sm font-medium flex items-center">
                      <svg
                        className="w-4 h-4 mr-1.5 text-[#6EC747] group-hover/piscinas:text-white transition-colors duration-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 15C5.10863 15 6.43969 13.7843 7.56348 12.7043C8.12671 12.1572 8.4083 11.8839 8.60825 11.7375C9.27508 11.2613 10.1048 11.0394 10.923 11.1296C11.1067 11.1496 11.2894 11.1892 11.6549 11.2687L11.9758 11.3393C12.3423 11.4189 12.5251 11.4586 12.7089 11.4786C13.527 11.5687 14.3571 11.3465 15.0244 10.8697C15.2244 10.7235 15.506 10.45 16.0693 9.90293C17.1931 8.82298 18.524 7.60718 20.6329 7.60718"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M3 18.6932C5.10863 18.6932 6.43969 17.4776 7.56348 16.3979C8.12671 15.8507 8.4083 15.5775 8.60825 15.4311C9.27508 14.9549 10.1048 14.7329 10.923 14.8232C11.1067 14.8431 11.2894 14.8828 11.6549 14.9622L11.9758 15.0329C12.3423 15.1124 12.5251 15.1522 12.7089 15.1721C13.527 15.2622 14.3571 15.04 15.0244 14.5633C15.2244 14.417 15.506 14.1436 16.0693 13.5965C17.1931 12.5165 18.524 11.3008 20.6329 11.3008"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      EcoClean Piscinas
                    </span>
                  </a>
                </li>
              )}
            </ul>
          </nav>

          {/* Botões de Login e Carrinho */}
          <div className="hidden md:flex items-center">
            {isAuthenticated && user ? (
              <div className="relative mr-4">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-[#173363]/10 hover:border-[#6EC747]/30 shadow-sm transition-all duration-300 hover:shadow group"
                >
                  <svg
                    className="w-4 h-4 mr-1.5 text-[#173363] group-hover:text-[#6EC747] transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-[#173363] group-hover:text-[#6EC747] transition-all duration-300 max-w-[120px] truncate">
                    {user.nome}
                  </span>
                  <svg
                    className={`w-4 h-4 ml-1 text-[#173363] transition-transform duration-300 ${
                      profileMenuOpen ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Menu dropdown do perfil */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50 transform origin-top transition-all duration-200 animate-fade-in">
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-[#173363]">Olá, {user.nome}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={handleOpenProfileModal}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#173363] hover:text-white transition-colors duration-200"
                      >
                        Meu Perfil
                      </button>
                      <Link
                        href="/historico-compras"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#173363] hover:text-white transition-colors duration-200"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Histórico de Compras
                      </Link>
                      <Link
                        href="/creditos"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#173363] hover:text-white transition-colors duration-200"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Meus Créditos
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="mr-4 flex items-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-[#173363]/10 hover:border-[#6EC747]/30 shadow-sm transition-all duration-300 hover:shadow group"
              >
                <svg
                  className="w-4 h-4 mr-1.5 text-[#173363] group-hover:text-[#6EC747] transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-sm font-medium text-[#173363] group-hover:text-[#6EC747] transition-all duration-300">
                  Login
                </span>
              </Link>
            )}
            <CartButton className="transform hover:scale-105 transition-transform duration-300" />
          </div>

          {/* Menu Mobile Botão */}
          <div className="md:hidden flex items-center">
            {isAuthenticated && user ? (
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="mr-2 flex items-center justify-center w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full border border-[#173363]/10 hover:border-[#6EC747]/30 shadow-sm transition-all duration-300 hover:shadow"
              >
                <svg
                  className="w-4 h-4 text-[#173363]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            ) : (
              <Link
                href="/login"
                className="mr-2 flex items-center justify-center w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full border border-[#173363]/10 hover:border-[#6EC747]/30 shadow-sm transition-all duration-300 hover:shadow"
              >
                <svg
                  className="w-4 h-4 text-[#173363]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
            )}
            <CartButton className="mr-4" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#173363] focus:outline-none transition-transform duration-300 ease-in-out"
              aria-label="Menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center relative">
                <span
                  className={`w-6 h-0.5 bg-[#173363] rounded-full transition-all duration-300 
                ${mobileMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}
                ></span>
                <span
                  className={`w-6 h-0.5 bg-[#173363] rounded-full transition-all duration-300 
                ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                ></span>
                <span
                  className={`w-6 h-0.5 bg-[#173363] rounded-full transition-all duration-300 
                ${mobileMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}
                ></span>
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
                    transitionDelay: mobileMenuOpen ? `${index * 100}ms` : '0ms',
                  }}
                >
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="block text-[#173363] hover:text-[#6EC747] transition-colors duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}

              {/* Link Lica Responde no mobile */}
              <li
                style={{
                  animationDelay: `${['Home', 'Sobre', 'Produtos', 'Contato'].length * 100}ms`,
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
                  transition: 'opacity 300ms ease, transform 300ms ease',
                  transitionDelay: mobileMenuOpen
                    ? `${['Home', 'Sobre', 'Produtos', 'Contato'].length * 100}ms`
                    : '0ms',
                }}
              >
                <a
                  href="https://responde-lica.vercel.app/"
                  className="block text-[#173363] hover:text-[#6EC747] transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1.5 text-[#6EC747]"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
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
                    Lica Responde
                  </div>
                </a>
              </li>

              {/* Link EcoClean Piscinas no mobile - só aparece para usuários com o benefício */}
              {hasPoolAccess && (
                <li
                  style={{
                    animationDelay: `${['Home', 'Sobre', 'Produtos', 'Contato'].length * 100 + 100}ms`,
                    opacity: mobileMenuOpen ? 1 : 0,
                    transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
                    transition: 'opacity 300ms ease, transform 300ms ease',
                    transitionDelay: mobileMenuOpen
                      ? `${['Home', 'Sobre', 'Produtos', 'Contato'].length * 100 + 100}ms`
                      : '0ms',
                  }}
                >
                  <a
                    href="https://ecoclean-piscina.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#173363] hover:text-[#6EC747] transition-colors duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1.5 text-[#6EC747]"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 15C5.10863 15 6.43969 13.7843 7.56348 12.7043C8.12671 12.1572 8.4083 11.8839 8.60825 11.7375C9.27508 11.2613 10.1048 11.0394 10.923 11.1296C11.1067 11.1496 11.2894 11.1892 11.6549 11.2687L11.9758 11.3393C12.3423 11.4189 12.5251 11.4586 12.7089 11.4786C13.527 11.5687 14.3571 11.3465 15.0244 10.8697C15.2244 10.7235 15.506 10.45 16.0693 9.90293C17.1931 8.82298 18.524 7.60718 20.6329 7.60718"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M3 18.6932C5.10863 18.6932 6.43969 17.4776 7.56348 16.3979C8.12671 15.8507 8.4083 15.5775 8.60825 15.4311C9.27508 14.9549 10.1048 14.7329 10.923 14.8232C11.1067 14.8431 11.2894 14.8828 11.6549 14.9622L11.9758 15.0329C12.3423 15.1124 12.5251 15.1522 12.7089 15.1721C13.527 15.2622 14.3571 15.04 15.0244 14.5633C15.2244 14.417 15.506 14.1436 16.0693 13.5965C17.1931 12.5165 18.524 11.3008 20.6329 11.3008"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      EcoClean Piscinas
                    </div>
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* Menu Perfil Mobile Dropdown */}
        {isAuthenticated && user && profileMenuOpen && (
          <div className="md:hidden absolute right-4 top-16 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50 animate-fade-in">
            <div className="p-3 border-b border-gray-100">
              <p className="text-sm font-medium text-[#173363]">Olá, {user.nome}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            <div className="py-1">
              <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  setShowProfileModal(true);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#173363] hover:text-white transition-colors duration-200"
              >
                Meu Perfil
              </button>
              <Link
                href="/historico-compras"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#173363] hover:text-white transition-colors duration-200"
                onClick={() => setProfileMenuOpen(false)}
              >
                Histórico de Compras
              </Link>
              <Link
                href="/creditos"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#173363] hover:text-white transition-colors duration-200"
                onClick={() => setProfileMenuOpen(false)}
              >
                Meus Créditos
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                Sair
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Modal de Perfil do Usuário */}
      <UserProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
    </>
  );
}

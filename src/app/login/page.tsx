'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  // Efeito para aplicar animações quando a página carrega
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-element');

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f8f9fa] to-[#e9f3ff] relative overflow-hidden p-4">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-3xl animate-float"></div>
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* Container principal */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden z-10">
        {/* Lado esquerdo (imagem e mensagem de boas-vindas) */}
        <div className="hidden md:flex md:w-1/2 bg-primary items-center justify-center p-10 relative">
          <div className="absolute inset-0 opacity-90">
            <Image
              src="/fundologinteste.png"
              alt="Padrão de limpeza"
              fill
              style={{ objectFit: 'cover' }}
              priority
              className="mix-blend-overlay"
            />
          </div>

          <div className="relative z-10 text-white text-center">
            <div className="animate-element animate-fade-in-up">
              <Image
                src="/logo.jpg"
                alt="EcoClean Logo"
                width={180}
                height={60}
                className="mx-auto mb-8 rounded-md"
              />
            </div>

            <h2
              className="text-3xl font-bold mb-4 animate-element animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              Bem-vindo ao Programa de Fidelidade
            </h2>

            <p
              className="text-lg opacity-90 mb-6 animate-element animate-fade-in-up"
              style={{ animationDelay: '400ms' }}
            >
              Faça login para acessar seu saldo de pontos, resgatar recompensas e aproveitar ofertas
              exclusivas.
            </p>

            <div
              className="flex justify-center space-x-6 animate-element animate-fade-in-up"
              style={{ animationDelay: '600ms' }}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm">Acumule Pontos</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <p className="text-sm">Resgatar Produtos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lado direito (formulário) */}
        <div className="w-full md:w-1/2 py-12 px-8 md:px-12">
          <div className="md:hidden mb-8 flex justify-center">
            <Image
              src="/logo.jpg"
              alt="EcoClean Logo"
              width={150}
              height={50}
              className="animate-fade-in rounded-md"
            />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2 animate-element animate-fade-in-up">
            Acesse sua conta
          </h1>

          <p
            className="text-gray-600 mb-8 animate-element animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            Entre com suas credenciais para aproveitar os benefícios do nosso programa
          </p>

          <div className="animate-element animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Link para voltar para a home */}
      <div
        className="mt-6 text-gray-600 animate-element animate-fade-in-up"
        style={{ animationDelay: '600ms' }}
      >
        <Link
          href="/"
          className="flex items-center space-x-1 hover:text-primary transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Voltar para a página inicial</span>
        </Link>
      </div>
    </div>
  );
}

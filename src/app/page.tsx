'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Fidelidade = dynamic(() => import('@/components/Fidelidade'), {
  loading: () => <div className="min-h-[40vh] bg-[#FAFBFD]" />,
});
const LicaResponde = dynamic(() => import('@/components/LicaResponde'), {
  loading: () => <div className="min-h-[40vh] bg-white" />,
});
const DestaquesProds = dynamic(() => import('@/components/DestaquesProds'), {
  loading: () => (
    <section className="py-24 bg-[#FAFBFD] flex justify-center items-center">
      <div className="animate-pulse h-10 w-40 bg-gray-200 rounded" />
    </section>
  ),
});
const Partners = dynamic(() => import('@/components/Partners'), {
  loading: () => <div className="min-h-[20vh] bg-white" />,
});

export default function Home() {
  useEffect(() => {
    const revealSelector =
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, .animate-element';
    const observed = new WeakSet<Element>();

    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    const observeNewElements = () => {
      document.querySelectorAll(revealSelector).forEach(el => {
        if (observed.has(el) || el.classList.contains('active')) return;
        observed.add(el);
        revealObserver.observe(el);
      });
    };

    observeNewElements();

    // Captura elementos das seções carregadas com dynamic()
    const mutationObserver = new MutationObserver(observeNewElements);
    const main = document.querySelector('main');
    if (main) {
      mutationObserver.observe(main, { childList: true, subtree: true });
    }

    const parallaxBg = document.querySelector('.parallax-bg') as HTMLElement | null;
    let ticking = false;

    const onScroll = () => {
      if (!parallaxBg || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        parallaxBg.style.transform = `translate3d(0, ${window.scrollY * 0.35}px, 0)`;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen overflow-hidden">
        <div
          className="parallax-bg absolute w-full top-0 left-0"
          style={{
            backgroundImage: 'url("/sec1.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '130%',
          }}
        />

        {/* Overlay sem backdrop-blur (mais leve no GPU) */}
        <div className="absolute inset-0 bg-[#173363]/65" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              <span className="block mb-2 animate-element animate-fade-in-left animate-delay-100">
                Compromisso com a
              </span>
              <span className="block text-[#8ED96A] mb-2 animate-element animate-fade-in-up animate-delay-200">
                excelência e qualidade
              </span>
              <span className="block animate-element animate-fade-in-right animate-delay-300">
                para o seu lar
              </span>
            </h1>

            <p className="text-xl text-white/90 drop-shadow-md animate-element animate-fade-in-up animate-delay-400">
              Produtos de alta qualidade com ofertas exclusivas para clientes do nosso programa de
              fidelidade.
            </p>

            <button
              onClick={() => (window.location.href = '/produtos')}
              className="transition-default px-10 py-4 bg-[#6EC747] hover:bg-[#5AB636] text-white text-lg font-medium rounded-full 
                             hover:shadow-lg hover:shadow-[#173363]/20 hover:-translate-y-1
                             border-2 border-[#8ED96A] hover:border-[#6EC747]
                             animate-element animate-scale-in animate-delay-500"
            >
              Comprar Agora
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-10 animate-fade-in animate-delay-700">
          <div className="w-8 h-14 border-2 border-white rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-pulse-slow" />
          </div>
        </div>
      </section>

      <Fidelidade />
      <LicaResponde />
      <DestaquesProds />
      <Partners />
      <Footer />
    </main>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EmpresasWhatsAppCta from './EmpresasWhatsAppCta';

export default function EmpresasLandingHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out motion-reduce:transition-none ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center space-x-3 group min-w-0">
          <div className="w-11 h-11 rounded-full overflow-hidden border border-[#173363]/20 shrink-0">
            <Image
              src="/logo.jpg"
              alt="EcoClean"
              width={44}
              height={44}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-lg sm:text-xl font-semibold leading-tight">
              <span className={scrolled ? 'text-[#173363]' : 'text-white'}>Eco</span>
              <span className="text-[#6EC747]">Clean</span>
            </span>
            <span
              className={`text-[10px] sm:text-xs truncate ${
                scrolled ? 'text-gray-500' : 'text-white/80'
              }`}
            >
              Soluções para empresas
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/"
            className={`hidden sm:inline-flex text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6EC747] ${
              scrolled ? 'text-[#173363] hover:text-[#6EC747]' : 'text-white/90 hover:text-white'
            }`}
          >
            Ir ao site
          </Link>
          <EmpresasWhatsAppCta
            id="header-whatsapp"
            label="Orçamento"
            className="!min-h-[44px] !px-4 !py-2 !text-sm sm:!px-6 sm:!text-base"
          />
        </div>
      </div>
    </header>
  );
}

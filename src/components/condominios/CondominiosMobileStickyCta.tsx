'use client';

import type { MouseEvent } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { getCondominiosWhatsAppUrl } from '@/lib/condominiosWhatsApp';
import { gtagReportWhatsAppConversion } from '@/utils/gtag';

export default function CondominiosMobileStickyCta() {
  const href = getCondominiosWhatsAppUrl();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    gtagReportWhatsAppConversion(href);
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 md:hidden pointer-events-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="pointer-events-auto bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 shadow-[0_-4px_20px_rgba(23,51,99,0.08)]">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          data-conversion="click_whatsapp"
          data-location="mobile-sticky"
          aria-label="Solicitar orçamento pelo WhatsApp"
          className="flex items-center justify-center gap-2 w-full min-h-[48px] px-6 py-3 rounded-full bg-[#6EC747] hover:bg-[#5AB636] text-white font-medium text-base shadow-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173363]"
        >
          <FaWhatsapp className="w-5 h-5 shrink-0" aria-hidden />
          Solicitar orçamento
        </a>
      </div>
    </div>
  );
}

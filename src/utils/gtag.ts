const GOOGLE_ADS_CONVERSION_ID = 'AW-18342488748/N7DNCPb208AcEIvog7pD';

/** Conversão Google Ads — clique WhatsApp nas landings /empresas e /condominios */
export const LANDING_WHATSAPP_CONVERSION_ID = 'AW-18342488748/k802CPy83-IcEKzVsKpE';

/** @deprecated Use LANDING_WHATSAPP_CONVERSION_ID */
export const EMPRESAS_WHATSAPP_CONVERSION_ID = LANDING_WHATSAPP_CONVERSION_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function gtagReportConversion(url?: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  const callback = () => {
    if (typeof url !== 'undefined') {
      window.location.href = url;
    }
  };

  window.gtag('event', 'conversion', {
    send_to: GOOGLE_ADS_CONVERSION_ID,
    value: 1.0,
    currency: 'BRL',
    event_callback: callback,
  });
}

/**
 * Dispara conversão do Google Ads no clique WhatsApp das landings
 * (/empresas e /condominios) e abre o link em nova aba após o callback
 * (ou fallback se gtag falhar). Seguro para Client Components; no-op no SSR.
 */
export function gtagReportWhatsAppConversion(url: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  let navigated = false;
  const openWhatsApp = () => {
    if (navigated) return;
    navigated = true;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (typeof window.gtag !== 'function') {
    openWhatsApp();
    return false;
  }

  window.gtag('event', 'conversion', {
    send_to: LANDING_WHATSAPP_CONVERSION_ID,
    event_callback: openWhatsApp,
    event_timeout: 2000,
  });

  // Fallback extra caso o callback do gtag não rode
  window.setTimeout(openWhatsApp, 2100);

  return false;
}

/** @deprecated Use gtagReportWhatsAppConversion */
export const gtagReportEmpresasWhatsAppConversion = gtagReportWhatsAppConversion;

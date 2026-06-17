const GOOGLE_ADS_CONVERSION_ID = 'AW-18106872843/N7DNCPb208AcEIvog7pD';

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

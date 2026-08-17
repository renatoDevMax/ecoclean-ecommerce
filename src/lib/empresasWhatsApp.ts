// WhatsApp da landing /empresas (campanha Ads): (41) 98728-0741
export const EMPRESAS_WHATSAPP_NUMBER = '5541987280741';

export const EMPRESAS_WHATSAPP_MESSAGE =
  'Olá! Vim pelo site da EcoClean e gostaria de solicitar um orçamento de produtos de limpeza para minha empresa em Guaratuba.';

export function getEmpresasWhatsAppUrl(customMessage?: string): string {
  const message = customMessage ?? EMPRESAS_WHATSAPP_MESSAGE;
  return `https://wa.me/${EMPRESAS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

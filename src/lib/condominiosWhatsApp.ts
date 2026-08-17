// WhatsApp exclusivo da landing /condominios: (41) 98728-0741
export const ECOCLEAN_WHATSAPP_NUMBER = '5541987280741';

export const CONDOMINIOS_WHATSAPP_MESSAGE =
  'Olá! Vim pelo site e gostaria de solicitar um orçamento para produtos de limpeza para meu condomínio em Guaratuba.';

export function getCondominiosWhatsAppUrl(customMessage?: string): string {
  const message = customMessage ?? CONDOMINIOS_WHATSAPP_MESSAGE;
  return `https://wa.me/${ECOCLEAN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

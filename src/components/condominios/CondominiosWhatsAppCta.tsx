import { FaWhatsapp } from 'react-icons/fa';
import { getCondominiosWhatsAppUrl } from '@/lib/condominiosWhatsApp';

type Variant = 'primary' | 'secondary' | 'outline' | 'light';

interface CondominiosWhatsAppCtaProps {
  label?: string;
  variant?: Variant;
  className?: string;
  fullWidth?: boolean;
  showIcon?: boolean;
  message?: string;
  id?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[#6EC747] hover:bg-[#5AB636] text-white border-2 border-[#8ED96A] hover:border-[#6EC747] shadow-md hover:shadow-lg hover:shadow-[#6EC747]/20',
  secondary:
    'bg-[#173363] hover:bg-[#12284f] text-white border-2 border-[#173363] shadow-md hover:shadow-lg hover:shadow-[#173363]/20',
  outline:
    'bg-transparent text-white border-2 border-white/80 hover:bg-white/10 hover:border-white',
  light:
    'bg-white text-[#173363] border-2 border-white hover:bg-[#FAFBFD] shadow-md',
};

export default function CondominiosWhatsAppCta({
  label = 'Solicitar orçamento pelo WhatsApp',
  variant = 'primary',
  className = '',
  fullWidth = false,
  showIcon = true,
  message,
  id,
}: CondominiosWhatsAppCtaProps) {
  return (
    <a
      id={id}
      href={getCondominiosWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-conversion="click_whatsapp"
      data-location={id ?? 'whatsapp-cta'}
      aria-label={label}
      className={[
        'inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3.5 rounded-full',
        'text-base font-medium transition-all duration-300',
        'hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6EC747]',
        'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        variantClasses[variant],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {showIcon && <FaWhatsapp className="w-5 h-5 shrink-0" aria-hidden />}
      <span>{label}</span>
    </a>
  );
}
